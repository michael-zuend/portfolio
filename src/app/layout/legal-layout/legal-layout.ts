import { Component, ViewEncapsulation, DestroyRef, ElementRef, inject, input, viewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService } from '../../core/nav.service';
import { SOCIAL } from '../../data/social';
import { MobileFooter } from '../mobile-footer/mobile-footer';

/**
 * Frame for the legal notice and the privacy policy.
 * Desktop: horizontal like the home page, the text flows in columns.
 * Mobile: regular vertical layout.
 */
@Component({
  selector: 'app-legal-layout',
  imports: [RouterLink, TranslatePipe, MobileFooter],
  templateUrl: './legal-layout.html',
  styleUrl: './legal-layout.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LegalLayout implements AfterViewInit {
  readonly title = input.required<string>();
  protected readonly social = SOCIAL;
  protected readonly year = new Date().getFullYear();
  private readonly nav = inject(NavService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  private lastJump = 0;
  private lastWheel = 0;

  /**
   * Desktop: the page has two positions, the text and the end with the
   * contact links. One turn of the mouse wheel jumps between them.
   */
  ngAfterViewInit(): void {
    const el = this.track().nativeElement;
    const onWheel = (e: WheelEvent) => {
      if (!this.nav.isDesktop() || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      // Touchpads keep sending events after a gesture. Only jump again after a short pause.
      const now = performance.now();
      const pause = now - this.lastWheel > 150;
      this.lastWheel = now;
      if (now - this.lastJump < 600 || (!pause && now - this.lastJump < 1200)) return;
      this.lastJump = now;
      const end = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: e.deltaY > 0 ? end : 0, behavior: 'smooth' });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    this.destroyRef.onDestroy(() => el.removeEventListener('wheel', onWheel));
  }
}
