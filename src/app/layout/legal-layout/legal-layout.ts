import { Component, ViewEncapsulation, DestroyRef, ElementRef, inject, input, viewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService } from '../../core/nav.service';
import { SOCIAL } from '../../data/social';
import { MobileFooter } from '../mobile-footer/mobile-footer';

/**
 * Rahmen für Impressum und Datenschutz.
 * Desktop: horizontal wie die Startseite, der Text fließt in Spalten.
 * Mobile: normal untereinander.
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

  ngAfterViewInit(): void {
    const el = this.track().nativeElement;
    const onWheel = (e: WheelEvent) => {
      if (!this.nav.isDesktop() || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * (e.deltaMode === 1 ? 40 : 1) });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    this.destroyRef.onDestroy(() => el.removeEventListener('wheel', onWheel));
  }
}
