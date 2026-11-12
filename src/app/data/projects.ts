/**
 * Projects. Add new projects here, no HTML changes needed.
 * Texts are in public/i18n/de.json and en.json under work.<key>.
 */
export interface Project {
  key: string; // key for translations
  title: string;
  image: string;
  technologies: string;
  github: string;
  live: string;
  /** Third text block: 'learned' = what I learned, 'group' = team experience */
  third: 'learned' | 'group';
}

export const PROJECTS: Project[] = [
  {
    key: 'join',
    title: 'Join',
    image: 'img/projects/join.webp',
    technologies: 'JavaScript, HTML, CSS, Firebase, n8n, Gemini API',
    github: 'https://github.com/michael-zuend/join-main-ki',
    live: 'https://join.michaelzuend.ch',
    third: 'group',
  },
  {
    key: 'polloLoco',
    title: 'Pollo Loco',
    image: 'img/projects/pollo-loco.webp',
    technologies: 'JavaScript, HTML, CSS',
    github: 'https://github.com/michael-zuend/EL-Pollo-Loco',
    live: 'https://pollo-loco.michaelzuend.ch',
    third: 'learned',
  },
  {
    key: 'dabubble',
    title: 'DA Bubble',
    image: 'img/projects/dabubble.webp',
    technologies: 'Angular, TypeScript, Firebase, SCSS',
    github: 'https://github.com/michael-zuend/DABubble',
    live: 'https://dabubble.michaelzuend.ch',
    third: 'learned',
  },
];
