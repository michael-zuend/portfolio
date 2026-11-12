import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NextArrow } from '../../shared/next-arrow/next-arrow';

/** Landing section: photo, name, role. Takes 100 % of the screen height. */
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
