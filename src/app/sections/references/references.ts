import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/language.service';
import { REFERENCES } from '../../data/references';
import { NextArrow } from '../../shared/next-arrow/next-arrow';

/** Desktop: drei Karten untereinander. Mobile: Slider mit Punkten. */
@Component({
  selector: 'app-references',
  imports: [TranslatePipe, NextArrow],
  templateUrl: './references.html',
  styleUrl: './references.scss',
  host: { id: 'references' },
})
export class References {
  protected readonly lang = inject(LanguageService);
  protected readonly references = REFERENCES;
  protected readonly active = signal(0);
  private readonly list = viewChild.required<ElementRef<HTMLUListElement>>('list');

  protected quote(i: number): string {
    return this.lang.current() === 'de' ? this.references[i].quote.de : this.references[i].quote.en;
  }

  protected goTo(i: number): void {
    const el = this.list().nativeElement;
    const card = el.children[i] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 20, behavior: 'smooth' });
    this.active.set(i);
  }

  /** Aktiven Punkt beim Wischen mitführen */
  protected onScroll(): void {
    const el = this.list().nativeElement;
    const first = el.children[0] as HTMLElement | undefined;
    if (!first) return;
    const step = first.offsetWidth + 20;
    this.active.set(Math.min(this.references.length - 1, Math.round(el.scrollLeft / step)));
  }
}
