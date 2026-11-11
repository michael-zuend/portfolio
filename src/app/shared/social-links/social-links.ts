import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SOCIAL } from '../../data/social';

/** E-Mail, LinkedIn, GitHub als runde weiße Icons. */
@Component({
  selector: 'app-social-links',
  imports: [TranslatePipe],
  template: `
    <ul [class.mobile]="order() === 'mobile'">
      @for (link of links(); track link.icon) {
        <li>
          <a
            [href]="link.href"
            [attr.target]="link.external ? '_blank' : null"
            [attr.rel]="link.external ? 'noopener noreferrer' : null"
          >
            <img [src]="'assets/icons/' + link.icon + '.svg'" alt="" width="36" height="36" />
            <span class="sr-only">{{ link.label | translate }}</span>
          </a>
        </li>
      }
    </ul>
  `,
  styleUrl: './social-links.scss',
})
export class SocialLinks {
  /** Mobile-Footer hat die Reihenfolge GitHub, Mail, LinkedIn */
  readonly order = input<'desktop' | 'mobile'>('desktop');

  protected links() {
    const mail = { icon: 'mail', href: 'mailto:' + SOCIAL.email, label: 'social.mail', external: false };
    const linkedin = { icon: 'linkedin', href: SOCIAL.linkedin, label: 'social.linkedin', external: true };
    const github = { icon: 'github', href: SOCIAL.github, label: 'social.github', external: true };
    return this.order() === 'mobile' ? [github, mail, linkedin] : [mail, linkedin, github];
  }
}
