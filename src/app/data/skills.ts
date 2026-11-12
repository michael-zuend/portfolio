/** Skill icons in the order from Figma. Files are in public/assets/icons/<icon>.svg */
export interface Skill {
  name: string;
  icon: string;
}

export const SKILLS: Skill[] = [
  { name: 'Angular', icon: 'angular' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'HTML', icon: 'html' },
  { name: 'CSS', icon: 'css' },
  { name: 'REST-API', icon: 'api' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Git', icon: 'git' },
  { name: 'Scrum', icon: 'scrum' },
  { name: 'Material Design', icon: 'material' },
];
