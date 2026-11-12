<?php
/**
 * Kontaktformular: nimmt JSON vom Angular-Formular entgegen und schickt
 * eine E-Mail. Liegt nach dem Build direkt im Web-Root.
 *
 * $sender ist eine Adresse der eigenen Domain, sonst landen die Mails
 * oft im Spam. Beide Adressen in my.cyon anlegen.
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

// Honeypot ausgefüllt: Bot. So tun, als wäre alles ok.
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

// Serverseitig nochmals prüfen: dem Browser nie blind vertrauen
if (
    mb_strlen($name) < 2 || mb_strlen($name) > 100 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    mb_strlen($message) < 10 || mb_strlen($message) > 5000
) {
    http_response_code(422);
    echo json_encode(['ok' => false]);
    exit;
}

// Zeilenumbrüche aus Header-Werten entfernen (Schutz vor Header-Injection)
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
