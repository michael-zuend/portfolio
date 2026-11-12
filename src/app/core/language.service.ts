import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'de' | 'en';
const STORAGE_KEY = 'portfolio-lang';

/**
 * Sprache der Seite (DE/EN).
 * Standard ist Deutsch. Die Wahl wird im localStorage gemerkt.
 * Ist der Speicher gesperrt (z. B. privater Modus), funktioniert die Seite trotzdem.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  readonly current = this.translate.currentLang;

  init(): void {
    // Standard ist Deutsch, ausser der Besucher hat schon EN gewählt
    this.use(this.readStored() ?? 'de');
  }

  use(lang: Lang): void {
    this.translate.use(lang);
    this.document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* Speicher nicht verfügbar */
    }
  }

  private readStored(): Lang | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'de' || value === 'en' ? value : null;
    } catch {
      return null;
    }
  }
}