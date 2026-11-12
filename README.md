# Portfolio – Michael Zünd

Personal developer portfolio built with **Angular 22** and **TypeScript**.

**Live:** [michaelzuend.ch](https://michaelzuend.ch)

The site presents my projects, skills and a contact form. It is based on a Figma design from the Developer Akademie, which I implemented as a fully responsive, bilingual single-page application.

---

## Features

- **Horizontal scrolling on desktop.** The whole page is one horizontal track. One turn of the mouse wheel snaps to the next section, in the projects section to the next project card. The legal pages snap between the text and the end of the page. Arrow buttons and the sidebar menu jump directly. After each jump the section heading is visible first, as required by the design.
- **Vertical layout on mobile and tablet** with burger menu and expandable project cards.
- **Full-width hero** on every screen size, including widescreen monitors.
- **German and English.** All texts live in JSON files and can be switched at runtime. German is the default, the choice is remembered in the browser.
- **Contact form** with validation on blur (not while typing), error messages inside the fields as in the design, strict e-mail check (no double dots or typos like `:` and `;`), a disabled send button until the form is valid, and an animated toast message after sending.
- **Legal notice and privacy policy** as separate routes.

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Angular 22 (standalone components, signals, control flow) |
| Language | TypeScript |
| Styling | SCSS with design tokens |
| i18n | ngx-translate |
| Forms | Angular Reactive Forms |
| Backend for the contact form | PHP (`mail()`) on the web server |
| Hosting | cyon (Switzerland), Apache, Let's Encrypt SSL |

## Design Decisions

**Pixel-accurate layout with a scale unit.**
The Figma design is 900 px high. In SCSS, `u(18)` means "18 Figma pixels". At 900 px screen height this is exactly 18 px, on smaller screens everything scales down proportionally. This keeps the horizontal layout faithful to the design without breaking on laptops with less height.

**Content separated from markup.**
Projects, skills and social links are stored in `src/app/data/`. Adding a project means adding one entry and two text blocks, no HTML changes.

**Signals instead of manual state.**
Menu state, language and form status are Angular signals, so the UI updates without manual change detection.

## Security

Security was considered from the start, not added at the end:

- **HTTPS enforced** via `.htaccess`, plus HSTS, `X-Content-Type-Options`, `X-Frame-Options` and `Referrer-Policy` headers.
- **Contact form hardened on the server:** all input is validated again in PHP (never trust the client), line breaks are stripped from header values to prevent header injection, and a honeypot field filters simple bots.
- **Mail deliverability:** the envelope sender is set to the own domain so messages pass the spam filter.
- **Privacy by default:** no cookies, no tracking, and the font is self-hosted, so no data is sent to third parties such as Google Fonts.

## Project Structure

```
src/app/
  core/       language service, navigation (horizontal scrolling), contact service
  data/       projects, skills, social links  <- edit content here
  layout/     sidebar, top links, mobile header and footer, legal page layout
  sections/   hero, why me, skills, my work, contact
  pages/      home, legal notice, privacy policy
  shared/     logo, social icons, next-section arrow
src/styles/   design tokens, breakpoints, u() scale function
public/       images, icons, translations, sendMail.php, .htaccess
```

## Getting Started

```bash
npm install
npm start        # http://localhost:4200
npm run build    # output in dist/portfolio/browser
```

## Deployment

1. `npm run build`
2. Upload the content of `dist/portfolio/browser/` (including `.htaccess` and `sendMail.php`) to the web root via SFTP.
3. Enable SSL with the hosting provider. The `.htaccess` file then redirects all traffic to HTTPS and routes unknown paths to the Angular app.

## Projects Shown

| Project | Stack | Live |
|---|---|---|
| DA Bubble | Angular, TypeScript, Firebase | [dabubble.michaelzuend.ch](https://dabubble.michaelzuend.ch) |
| Join | JavaScript, Firebase, n8n, Gemini API | [join.michaelzuend.ch](https://join.michaelzuend.ch) |
| El Pollo Loco | JavaScript (OOP), HTML, CSS | [pollo-loco.michaelzuend.ch](https://pollo-loco.michaelzuend.ch) |

## Next Steps

- Replace the PHP mailer with my own backend
- Containerize with Docker and deploy through a CI/CD pipeline with automated tests and dependency checks

## Author

**Michael Zünd**
[LinkedIn](https://www.linkedin.com/in/michaelzuend) · [GitHub](https://github.com/michael-zuend) · [michaelzuend.ch](https://michaelzuend.ch)
