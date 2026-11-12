/**
 * Referenzen von echten Teamkollegen (keine Mentoren, laut DA-Support).
 * Der Abschnitt erscheint erst ab 2 Einträgen, darunter wird er ausgeblendet.
 */
export interface Reference {
  name: string;
  project: string;
  quote: { de: string; en: string };
}

export const REFERENCES: Reference[] = [];