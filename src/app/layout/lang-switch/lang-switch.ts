import { Component, inject, input } from '@angular/core';
import { Lang, LanguageService } from '../../core/language.service';

/** Umschalter DE | EN. Die aktive Sprache ist hervorgehoben. */
@Component({
  selector: 'app-lang-switch',
  template: `
    <div class="lang" [class.lang--dark]="dark()" role="group" aria-label="Language">
      @for (l of langs; track l; let last = $last) {
        <button
          type="button"
          [class.active]="lang.current() === l"
          [attr.aria-pressed]="lang.current() === l"
          (click)="lang.use(l)"
        >
          {{ l.toUpperCase() }}
        </button>
        @if (!last) {
          <span aria-hidden="true">|</span>
        }
      }
    </div>
  `,
  styleUrl: './lang-switch.scss',
})
export class LangSwitch {
  protected readonly lang = inject(LanguageService);
  protected readonly langs: Lang[] = ['de', 'en'];
  /** Dunkle Schrift auf grünem Grund (Mobile-Menü) */
  readonly dark = input(false);
}
