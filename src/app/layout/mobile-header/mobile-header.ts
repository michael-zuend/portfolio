import { Logo } from '../../shared/logo';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService, SectionId } from '../../core/nav.service';
import { LangSwitch } from '../lang-switch/lang-switch';

/** Mobile: green header with logo, burger button and expandable menu. */
@Component({
  selector: 'app-mobile-header',
  imports: [Logo, TranslatePipe, LangSwitch],
  template: `
    <header>
      <button type="button" class="logo" (click)="nav.go('hero')" [attr.aria-label]="'nav.home' | translate">
        <app-logo />
      </button>
      <button
        type="button"
        class="burger"
        [attr.aria-expanded]="nav.menuOpen()"
        aria-controls="mobile-menu"
        [attr.aria-label]="'nav.openMenu' | translate"
        (click)="nav.menuOpen.set(true)"
      >
        <img src="assets/icons/burger.svg" alt="" />
      </button>
    </header>

    @if (nav.menuOpen()) {
      <div class="backdrop" (click)="nav.menuOpen.set(false)"></div>
      <nav id="mobile-menu" class="menu" [attr.aria-label]="'nav.label' | translate">
        <button
          type="button"
          class="close"
          [attr.aria-label]="'nav.closeMenu' | translate"
          (click)="nav.menuOpen.set(false)"
        >
          <img src="assets/icons/close.svg" alt="" />
        </button>
        @for (item of items; track item.id) {
          <button type="button" class="item" (click)="nav.go(item.id)">{{ item.label | translate }}</button>
        }
        <app-lang-switch [dark]="true" />
      </nav>
    }
  `,
  styleUrl: './mobile-header.scss',
  host: { '(document:keydown.escape)': 'nav.menuOpen.set(false)' },
})
export class MobileHeader {
  protected readonly nav = inject(NavService);
  protected readonly items: { id: SectionId; label: string }[] = [
    { id: 'why-me', label: 'nav.whyMe' },
    { id: 'skills', label: 'nav.mySkillSet' },
    { id: 'my-work', label: 'nav.myWork' },
    { id: 'contact', label: 'nav.contactMe' },
  ];
}
