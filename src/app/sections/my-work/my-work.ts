import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService } from '../../core/nav.service';
import { PROJECTS } from '../../data/projects';
import { NextArrow } from '../../shared/next-arrow/next-arrow';
import { ProjectCard } from './project-card/project-card';

@Component({
  selector: 'app-my-work',
  imports: [TranslatePipe, NextArrow, ProjectCard],
  templateUrl: './my-work.html',
  styleUrl: './my-work.scss',
  host: { id: 'my-work' },
})
export class MyWork {
  protected readonly nav = inject(NavService);
  protected readonly projects = PROJECTS;
}
