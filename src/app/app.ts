import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/language.service';
import { Sidebar } from './layout/sidebar/sidebar';
import { TopLinks } from './layout/top-links/top-links';
import { MobileHeader } from './layout/mobile-header/mobile-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, TopLinks, MobileHeader],
  template: `
    <app-sidebar />
    <app-top-links />
    <app-mobile-header />
    <router-outlet />
  `,
})
export class App {
  constructor() {
    inject(LanguageService).init();
  }
}
