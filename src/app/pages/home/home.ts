import { AfterViewInit, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService, SectionId } from '../../core/nav.service';
import { Hero } from '../../sections/hero/hero';
import { WhyMe } from '../../sections/why-me/why-me';
import { Skills } from '../../sections/skills/skills';
import { MyWork } from '../../sections/my-work/my-work';
import { References } from '../../sections/references/references';
import { Contact } from '../../sections/contact/contact';
import { MobileFooter } from '../../layout/mobile-footer/mobile-footer';

/**
 * Startseite. Desktop: alle Abschnitte nebeneinander in einem
 * horizontal scrollenden "Track". Das Mausrad scrollt seitwärts.
 */
@Component({
  selector: 'app-home',
  imports: [Hero, WhyMe, Skills, MyWork, References, Contact, MobileFooter],
  template: `
    <main class="track" #track>
      <app-hero />
      <app-why-me />
      <app-skills />
      <app-my-work />
      <app-references />
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

    // Sprung von den Rechtsseiten, z. B. /#contact
    const fragment = this.route.snapshot.fragment as SectionId | null;
    if (fragment) setTimeout(() => this.nav.scrollTo(fragment, false), 50);
  }

  /** Vertikales Mausrad in horizontales Scrollen umwandeln (nur Desktop). */
  private readonly onWheel = (e: WheelEvent): void => {
    if (!this.nav.isDesktop() || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    // Im Textfeld des Formulars normal scrollen lassen
    if ((e.target as HTMLElement).closest('textarea')) return;
    e.preventDefault();
    const factor = e.deltaMode === 1 ? 40 : 1;
    this.track().nativeElement.scrollBy({ left: e.deltaY * factor });
  };
}
