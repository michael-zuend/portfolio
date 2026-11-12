import { Component } from '@angular/core';
import { LangSwitch } from '../lang-switch/lang-switch';
import { SocialLinks } from '../../shared/social-links/social-links';

/** Desktop: social icons and language switch at the top right (fixed). */
@Component({
  selector: 'app-top-links',
  imports: [LangSwitch, SocialLinks],
  template: `
    <app-social-links />
    <app-lang-switch />
  `,
  styleUrl: './top-links.scss',
})
export class TopLinks {}
