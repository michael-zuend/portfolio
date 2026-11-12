import { Component, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService, SectionId } from '../../core/nav.service';

/** Green arrow that jumps to the next section (desktop only). */
@Component({
  selector: 'app-next-arrow',
  imports: [TranslatePipe],
  template: `
    <button type="button" (click)="go()" [attr.aria-label]="(back() ? 'nav.backToStart' : 'nav.next') | translate">
      <img [src]="back() ? 'assets/icons/arrow-left.svg' : 'assets/icons/arrow-right.svg'" alt="" />
    </button>
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { position: absolute; @include mobile { display: none; } }
    button { display: block; width: u(122); height: u(48); }
    img { width: 100%; height: 100%; transition: transform 0.25s; }
    button:hover img { transform: translateX(u(10)); }
    :host(.back) button:hover img { transform: translateX(u(-10)); }
  `,
  host: { '[class.back]': 'back()' },
})
export class NextArrow {
  private readonly nav = inject(NavService);
  readonly from = input.required<SectionId>();
  readonly back = input(false);

  go(): void {
    if (this.back()) this.nav.scrollTo('hero');
    else this.nav.next(this.from());
  }
}
