# Portfolio – Michael Zünd

Persönliches Portfolio, gebaut mit Angular 22 nach dem Figma-Design „Version 3“ der Developer Akademie.

- **Desktop (ab 1024 px, Querformat):** horizontal scrollende Seite mit fester Sidebar. Mausrad, Pfeile und Menü springen zu den Abschnitten. Nach jedem Sprung ist zuerst die Überschrift sichtbar.
- **Mobile/Tablet:** normal vertikal, Burger-Menü, aufklappbare Projektkarten, Referenzen als Slider.
- **Widescreen (ab 2400 px):** Sidebar-Menü skaliert mit der Bildschirmhöhe, Social-Links ganz rechts.
- **Sprachen:** Deutsch und Englisch (`public/i18n/de.json`, `en.json`), Umschalter oben rechts bzw. im Menü.

## Starten

```bash
npm install
npm start          # http://localhost:4200
npm run build      # Ergebnis in dist/portfolio/browser
```

## Aufbau

```
src/app/
  core/        Sprache, Navigation (horizontales Scrollen), Kontakt-Service
  data/        Projekte, Skills, Referenzen, Social-Links  ← Inhalte hier pflegen
  layout/      Sidebar, Top-Links, Mobile-Header/-Footer, Rahmen der Rechtsseiten
  sections/    Hero, Why me, Skills, My Work, References, Contact
  pages/       Startseite, Impressum, Datenschutz
  shared/      Logo, Social-Icons, Weiter-Pfeil
src/styles/_tokens.scss   Farben, Breakpoints, u()-Funktion
public/                   Bilder, Icons, Übersetzungen, sendMail.php, .htaccess
```

`u(18)` in den SCSS-Dateien bedeutet „18 Figma-Pixel“. Bei 900 px Bildschirmhöhe ist das genau 18 px, auf niedrigeren Bildschirmen wird alles proportional kleiner.

## Neues Projekt hinzufügen

1. Eintrag in `src/app/data/projects.ts` ergänzen.
2. Texte unter `work.<key>` in `de.json` und `en.json` eintragen.
3. Vorschaubild (WebP, unter 500 KB) nach `public/img/projects/`.

## Deployment

1. `npm run build`
2. Inhalt von `dist/portfolio/browser/` (inklusive `.htaccess` und `sendMail.php`) per FTP in das Web-Root der Domain laden.
3. SSL-Zertifikat beim Hoster aktivieren. `.htaccess` leitet dann alles auf HTTPS um.
