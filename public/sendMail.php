<?php
/**
 * Contact form: receives JSON from the Angular form and sends
 * an email. After the build it sits directly in the web root.
 *
 * $sender is an address of the own domain, otherwise the mails
 * often end up in spam. Create both addresses in my.cyon.
 */

$recipient = 'kontakt@michaelzuend.ch';
$sender = 'noreply@michaelzuend.ch';
$allowedOrigin = 'https://michaelzuend.ch';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . $allowedOrigin);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false]);
    exit;
}

// Honeypot filled in: bot. Pretend everything is ok.
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

// Validate again on the server: never trust the browser blindly
if (
    mb_strlen($name) < 2 || mb_strlen($name) > 100 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    !preg_match('/^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/', $email) ||
    mb_strlen($message) < 10 || mb_strlen($message) > 5000
) {
    http_response_code(422);
    echo json_encode(['ok' => false]);
    exit;
}

// Strip line breaks from header values (protection against header injection)
$name = str_replace(["\r", "\n"], ' ', $name);

$subject = '=?UTF-8?B?' . base64_encode('Portfolio: Nachricht von ' . $name) . '?=';
$body = "Name: $name\nE-Mail: $email\n\n$message\n";
$headers = [
    'From' => $sender,
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=utf-8',
    'X-Mailer' => 'Portfolio',
];

$sent = mail($recipient, $subject, $body, $headers);
http_response_code($sent ? 200 : 500);
echo json_encode(['ok' => $sent]);
