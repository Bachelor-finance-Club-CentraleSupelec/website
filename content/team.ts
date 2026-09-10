// ============================================================================
//  TEAM — edit this file to add the real people of the club.
//  No coding needed beyond filling in the strings below.
//
//  - `role` accepts { en, fr } so titles show in both languages.
//  - `photo` is a path inside /public (e.g. "/team/jane.jpg").
//    Leave it empty ("") to show elegant initials instead.
//  - `linkedin` is optional; leave "" to hide the link.
// ============================================================================

export type Person = {
  name: string;
  role: { en: string; fr: string };
  photo: string;
  linkedin: string;
};

// The board / leadership. Shown first.
export const board: Person[] = [
  {
    name: 'Placeholder Name',
    role: { en: 'President', fr: 'Président·e' },
    photo: '',
    linkedin: '',
  },
  {
    name: 'Placeholder Name',
    role: { en: 'Vice-President', fr: 'Vice-président·e' },
    photo: '',
    linkedin: '',
  },
  {
    name: 'Placeholder Name',
    role: { en: 'Head of Research', fr: 'Responsable Recherche' },
    photo: '',
    linkedin: '',
  },
  {
    name: 'Placeholder Name',
    role: { en: 'Treasurer', fr: 'Trésorier·ère' },
    photo: '',
    linkedin: '',
  },
];

// General members.
export const members: Person[] = [
  {
    name: 'Placeholder Member',
    role: { en: 'Analyst', fr: 'Analyste' },
    photo: '',
    linkedin: '',
  },
  {
    name: 'Placeholder Member',
    role: { en: 'Analyst', fr: 'Analyste' },
    photo: '',
    linkedin: '',
  },
  {
    name: 'Placeholder Member',
    role: { en: 'Analyst', fr: 'Analyste' },
    photo: '',
    linkedin: '',
  },
  {
    name: 'Placeholder Member',
    role: { en: 'Analyst', fr: 'Analyste' },
    photo: '',
    linkedin: '',
  },
];
