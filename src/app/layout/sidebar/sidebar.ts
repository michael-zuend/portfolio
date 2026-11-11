import { Logo } from '../../shared/logo';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService, SectionId } from '../../core/nav.service';

/** Desktop: grüne Leiste links mit Logo und senkrechtem Menü. */
@Component({
  selector: 'app-sidebar',
  imports: [Logo, TranslatePipe],
  template: `
    <button type="button" class="logo" (click)="nav.go('hero')" [attr.aria-label]="'nav.home' | translate">
      <app-logo />
    </button>
    <nav [attr.aria-label]="'nav.label' | translate">
      @for (item of items; track item.id) {
        <button type="button" (click)="nav.go(item.id)">{{ item.label | translate }}</button>
      }
    </nav>
  `,
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly nav = inject(NavService);
  protected readonly items: { id: SectionId; label: string }[] = [
    { id: 'why-me', label: 'nav.whyMe' },
    { id: 'skills', label: 'nav.skills' },
    { id: 'my-work', label: 'nav.myWork' },
    { id: 'contact', label: 'nav.contact' },
  ];
}
