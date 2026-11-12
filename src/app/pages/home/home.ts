import { AfterViewInit, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService, SectionId } from '../../core/nav.service';
import { Hero } from '../../sections/hero/hero';
import { WhyMe } from '../../sections/why-me/why-me';
import { Skills } from '../../sections/skills/skills';
import { MyWork } from '../../sections/my-work/my-work';
import { Contact } from '../../sections/contact/contact';
import { MobileFooter } from '../../layout/mobile-footer/mobile-footer';

/**
 * Home page. Desktop: all sections side by side in one
 * horizontally scrolling "track". The mouse wheel scrolls sideways.
 */
@Component({
  selector: 'app-home',
  imports: [Hero, WhyMe, Skills, MyWork, Contact, MobileFooter],
  template: `
    <main class="track" #track>
      <app-hero />
      <app-why-me />
      <app-skills />
      <app-my-work />
      <app-contact />
      <app-mobile-footer />
    </main>
  `,
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  private readonly nav = inject(NavService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  ngAfterViewInit(): void {
    const el = this.track().nativeElement;
    this.nav.registerTrack(el);
    this.destroyRef.onDestroy(() => this.nav.registerTrack(null));

    el.addEventListener('wheel', this.onWheel, { passive: false });
    this.destroyRef.onDestroy(() => el.removeEventListener('wheel', this.onWheel));

    // Jump from the legal pages, e.g. /#contact
    const fragment = this.route.snapshot.fragment as SectionId | null;
    if (fragment) setTimeout(() => this.nav.scrollTo(fragment, false), 50);
  }

  /** Time of the last jump and of the last wheel event. */
  private lastJump = 0;
  private lastWheel = 0;

  /**
   * Desktop: one turn of the mouse wheel jumps to the next section.
   * If a section is wider than the screen (projects), it is
   * scrolled through first and then snaps to the next one.
   */
  private readonly onWheel = (e: WheelEvent): void => {
    if (!this.nav.isDesktop() || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    // Scroll normally inside the form textarea if it can scroll itself
    const area = (e.target as HTMLElement).closest('textarea');
    if (area && area.scrollHeight > area.clientHeight) return;
    e.preventDefault();

    // Touchpads keep sending events after a gesture.
    // Only jump again after a short pause.
    const now = performance.now();
    const pause = now - this.lastWheel > 150;
    this.lastWheel = now;
    if (now - this.lastJump < 600 || (!pause && now - this.lastJump < 1200)) return;

    const track = this.track().nativeElement;
    const pos = track.scrollLeft;
    const view = track.clientWidth;
    const stops = this.nav.stops();
    let target: number | undefined;

    if (e.deltaY > 0) {
      const next = stops.find((s) => s > pos + 2);
      if (next === undefined) return;
      target = next - pos > view ? pos + view * 0.8 : next;
    } else {
      const prev = [...stops].reverse().find((s) => s < pos - 2);
      if (prev === undefined) return;
      target = pos - prev > view ? pos - view * 0.8 : prev;
    }

    this.lastJump = now;
    track.scrollTo({ left: target, behavior: 'smooth' });
  };
}
