import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export type SectionId = 'hero' | 'why-me' | 'skills' | 'my-work' | 'contact';

/** Order of the sections, used by the "next" arrows. */
export const SECTION_ORDER: SectionId[] = ['hero', 'why-me', 'skills', 'my-work', 'contact'];

/**
 * Navigation between the sections.
 * Desktop: the page scrolls horizontally inside the "track".
 * Mobile: regular vertical scrolling.
 * According to the Figma note, the section heading must be visible
 * first after every jump. That is why the target is always the
 * element with [data-anchor] (the heading), not the section itself.
 */
@Injectable({ providedIn: 'root' })
export class NavService {
  private readonly router = inject(Router);
  private track: HTMLElement | null = null;

  /** Is the mobile menu open? */
  readonly menuOpen = signal(false);

  registerTrack(el: HTMLElement | null): void {
    this.track = el;
  }

  isDesktop(): boolean {
    return window.matchMedia('(min-width: 1024px) and (orientation: landscape)').matches;
  }

  /** 1 Figma pixel in real pixels (same as --u in CSS). */
  unit(): number {
    const u = window.innerHeight / 900;
    return window.innerWidth >= 2400 ? Math.min(u, 1) : u;
  }

  /** Can be called from anywhere, also from the legal pages. */
  go(id: SectionId): void {
    this.menuOpen.set(false);
    if (this.router.url.split('#')[0] !== '/' || !this.track) {
      this.router.navigate(['/'], { fragment: id });
      return;
    }
    this.scrollTo(id);
  }

  /** Next section that exists on the page. */
  next(current: SectionId): void {
    const rest = SECTION_ORDER.slice(SECTION_ORDER.indexOf(current) + 1);
    const target = rest.find((id) => document.getElementById(id));
    if (target) this.scrollTo(target);
  }

  /**
   * Desktop: scroll position where the section heading sits
   * 60 Figma px to the right of the sidebar (172 px), but never so far
   * left that a part of the previous section is still visible.
   */
  private leftFor(id: SectionId): number | null {
    const section = document.getElementById(id);
    if (!section || !this.track) return null;
    if (id === 'hero') return 0;
    const anchor = section.querySelector<HTMLElement>('[data-anchor]') ?? section;
    const trackLeft = this.track.getBoundingClientRect().left - this.track.scrollLeft;
    const byHeading = anchor.getBoundingClientRect().left - trackLeft - 232 * this.unit();
    // Never show the end of the previous section: the section starts at the sidebar at the latest
    const bySection = section.getBoundingClientRect().left - trackLeft - 172 * this.unit();
    return Math.max(byHeading, bySection);
  }

  /**
   * All snap points for the mouse wheel (desktop), in ascending order:
   * every section heading plus every element marked with [data-snap]
   * (each project card). Those are centered in the visible area.
   */
  stops(): number[] {
    if (!this.track) return [];
    const track = this.track;
    const max = track.scrollWidth - track.clientWidth;
    const sidebar = 172 * this.unit();
    const center = sidebar + (track.clientWidth - sidebar) / 2;
    const trackLeft = track.getBoundingClientRect().left - track.scrollLeft;

    const headings = SECTION_ORDER.map((id) => this.leftFor(id)).filter((v): v is number => v !== null);
    const cards = [...track.querySelectorAll<HTMLElement>('[data-snap]')].map((el) => {
      const r = el.getBoundingClientRect();
      return r.left - trackLeft + r.width / 2 - center;
    });

    const clamp = (v: number) => Math.round(Math.min(Math.max(v, 0), max));
    // A card close to a section heading is skipped: the heading position wins,
    // so the start of a section never shows the end of the previous one.
    const minGap = track.clientWidth * 0.15;
    const fixed = [...headings, max].map(clamp);
    const extra = cards.map(clamp).filter((c) => fixed.every((f) => Math.abs(c - f) > minGap));
    const all = [...fixed, ...extra].sort((a, b) => a - b);
    return all.filter((v, i) => i === 0 || v - all[i - 1] > 2);
  }

  scrollTo(id: SectionId, smooth = true): void {
    const section = document.getElementById(id);
    if (!section) return;
    const behavior: ScrollBehavior = smooth ? 'smooth' : 'instant';

    if (this.isDesktop() && this.track) {
      this.track.scrollTo({ left: this.leftFor(id) ?? 0, behavior });
    } else {
      const anchor = section.querySelector<HTMLElement>('[data-anchor]') ?? section;
      const header = 72;
      const top = anchor.getBoundingClientRect().top + window.scrollY - header - 16;
      window.scrollTo({ top: id === 'hero' ? 0 : top, behavior });
    }
  }
}
