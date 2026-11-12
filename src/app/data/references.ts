/**
 * Referenzen von Teamkollegen.
 * TODO: Nur echte Zitate eintragen. Frag deine Teammitglieder aus
 * Join, Pollo Loco und DA Bubble nach 2-3 Sätzen über die Zusammenarbeit.
 */
export interface Reference {
  name: string;
  project: string;
  quote: { de: string; en: string };
}

export const REFERENCES: Reference[] = [
  {
    name: '[Name]',
    project: 'Project Join',
    quote: { de: '[Zitat von Teamkollege]', en: '[Quote from teammate]' },
  },
  {
    name: '[Name]',
    project: 'Project DA Bubble',
    quote: { de: '[Zitat von Teamkollege]', en: '[Quote from teammate]' },
  },
  {
    name: '[Name]',
    project: 'Project Pollo Loco',
    quote: { de: '[Zitat von Teamkollege]', en: '[Quote from teammate]' },
  },
];
