import { Component } from '@angular/core';
import { LangSwitch } from '../lang-switch/lang-switch';
import { SocialLinks } from '../../shared/social-links/social-links';

/** Desktop: Social-Icons und Sprachwahl oben rechts (fixiert). */
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
