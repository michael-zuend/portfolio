import { Logo } from '../../shared/logo';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService } from '../../core/nav.service';
import { SocialLinks } from '../../shared/social-links/social-links';

/** Mobile: arrow to the top, social icons and green footer. */
@Component({
  selector: 'app-mobile-footer',
  imports: [Logo, RouterLink, TranslatePipe, SocialLinks],
  template: `
    <button type="button" class="up" (click)="nav.go('hero')" [attr.aria-label]="'nav.backToStart' | translate">
      <svg width="20" height="50" viewBox="0 0 20 50" aria-hidden="true">
        <path d="M10 49V2M2 10l8-8 8 8" fill="none" stroke="#b5e93b" stroke-width="2" />
      </svg>
    </button>
    <app-social-links order="mobile" />
    <footer>
      <app-logo class="logo" />
      <p>© Michael Zünd {{ year }}</p>
      <nav aria-label="Legal">
        <a routerLink="/legal-notice">{{ 'footer.legal' | translate }}</a>
        <a routerLink="/privacy-policy">{{ 'footer.privacy' | translate }}</a>
      </nav>
    </footer>
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: flex; flex-direction: column; align-items: center; @include desktop { display: none; } }
    .up { margin-top: 50px; padding: 4px; transition: transform 0.2s; }
    .up:hover { transform: translateY(-4px); }
    app-social-links { margin-top: 50px; }
    footer {
      margin-top: 38px; width: 100%; padding: 22px 0 26px;
      display: flex; flex-direction: column; align-items: center;
      background: linear-gradient(180deg, $green 55%, #7fa522 100%); color: $gray;
    }
    .logo { width: 80px; }
    p { margin-top: 12px; font-size: 16px; }
    nav { margin-top: 10px; display: flex; gap: 8px; align-items: baseline; }
    nav a:first-child { font-size: 16px; }
    nav a:last-child { font-size: 14px; }
    nav a:hover { color: $bg; text-decoration: underline; }
  `,
})
export class MobileFooter {
  protected readonly nav = inject(NavService);
  protected readonly year = new Date().getFullYear();
}
