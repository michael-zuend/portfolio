import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService } from '../../core/nav.service';
import { SKILLS } from '../../data/skills';
import { NextArrow } from '../../shared/next-arrow/next-arrow';

@Component({
  selector: 'app-skills',
  imports: [TranslatePipe, NextArrow],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  host: { id: 'skills' },
})
export class Skills {
  protected readonly nav = inject(NavService);
  protected readonly skills = SKILLS;
}
