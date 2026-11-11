import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export type SectionId = 'hero' | 'why-me' | 'skills' | 'my-work' | 'references' | 'contact';

/** Reihenfolge der Abschnitte, für die Pfeile "weiter". */
export const SECTION_ORDER: SectionId[] = ['hero', 'why-me', 'skills', 'my-work', 'references', 'contact'];

/**
 * Navigation zwischen den Abschnitten.
 * Desktop: die Seite scrollt horizontal im "Track".
 * Mobile: normales vertikales Scrollen.
 * Laut Figma-Notiz soll nach jedem Sprung zuerst die Überschrift
 * des Abschnitts sichtbar sein. Deshalb ist das Ziel immer das
 * Element mit [data-anchor] (die Überschrift), nicht der Abschnitt.
 */
@Injectable({ providedIn: 'root' })
export class NavService {
  private readonly router = inject(Router);
  private track: HTMLElement | null = null;

  /** Mobile-Menü offen? */
  readonly menuOpen = signal(false);

  registerTrack(el: HTMLElement | null): void {
    this.track = el;
  }

  isDesktop(): boolean {
    return window.matchMedia('(min-width: 1024px) and (orientation: landscape)').matches;
  }

  /** 1 Figma-Pixel in echten Pixeln (wie --u im CSS). */
  unit(): number {
    return Math.min(window.innerHeight / 900, 1);
  }

  /** Von überall aufrufbar, auch von den Rechtsseiten aus. */
  go(id: SectionId): void {
    this.menuOpen.set(false);
    if (this.router.url.split('#')[0] !== '/' || !this.track) {
      this.router.navigate(['/'], { fragment: id });
      return;
    }
    this.scrollTo(id);
  }

  next(current: SectionId): void {
    const i = SECTION_ORDER.indexOf(current);
    this.scrollTo(SECTION_ORDER[Math.min(i + 1, SECTION_ORDER.length - 1)]);
  }

  scrollTo(id: SectionId, smooth = true): void {
    const section = document.getElementById(id);
    if (!section) return;
    const anchor = section.querySelector<HTMLElement>('[data-anchor]') ?? section;
    const behavior: ScrollBehavior = smooth ? 'smooth' : 'instant';

    if (this.isDesktop() && this.track) {
      // Überschrift landet 60 Figma-px rechts neben der Sidebar (172 px)
      const offset = 232 * this.unit();
      const left =
        anchor.getBoundingClientRect().left - this.track.getBoundingClientRect().left + this.track.scrollLeft;
      this.track.scrollTo({ left: id === 'hero' ? 0 : left - offset, behavior });
    } else {
      const header = 72;
      const top = anchor.getBoundingClientRect().top + window.scrollY - header - 16;
      window.scrollTo({ top: id === 'hero' ? 0 : top, behavior });
    }
  }
}
