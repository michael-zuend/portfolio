import { Component, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Project } from '../../../data/projects';

/**
 * Project card. Desktop: everything is visible.
 * Mobile: shows only "About the project" at first, the rest expands with
 * "Show more" (like in Figma).
 */
@Component({
  selector: 'app-project-card',
  imports: [TranslatePipe],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  host: { '[class.open]': 'open()' },
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly number = input.required<number>();
  protected readonly open = signal(false);

  protected bodyId(): string {
    return 'project-body-' + this.project().key;
  }
}
