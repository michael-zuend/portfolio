import { Component, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Project } from '../../../data/projects';

/**
 * Projektkarte. Desktop: alles sichtbar.
 * Mobile: zeigt erst nur "About the project", der Rest klappt mit
 * "Show me more" auf (wie in Figma).
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
