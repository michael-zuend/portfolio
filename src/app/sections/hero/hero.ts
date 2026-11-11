import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NextArrow } from '../../shared/next-arrow/next-arrow';

/** Startbereich: Foto, Name, Rolle. Nimmt 100 % der Bildschirmhöhe ein. */
@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, NextArrow],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  host: { id: 'hero' },
})
export class Hero {
  readonly name = 'Michael Zünd';
}
