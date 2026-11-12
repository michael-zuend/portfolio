import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'de' | 'en';
const STORAGE_KEY = 'portfolio-lang';

/**
 * Page language (DE/EN).
 * Remembers the choice in localStorage. If storage is blocked
 * (e.g. private mode), the page still works.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  readonly current = this.translate.currentLang;

  init(): void {
    // German is the default unless the visitor has already chosen EN
    this.use(this.readStored() ?? 'de');
  }

  use(lang: Lang): void {
    this.translate.use(lang);
    this.document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage not available */
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
