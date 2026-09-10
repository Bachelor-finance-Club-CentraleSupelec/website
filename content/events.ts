// ============================================================================
//  EVENTS — edit this file to manage the club's events.
//
//  - `date` is ISO format "YYYY-MM-DD". Events are sorted automatically and
//    split into "upcoming" vs "past" based on today's date.
//  - `title` and `description` accept { en, fr }.
//  - `location` and `time` are plain strings (same in both languages).
//  - `registerUrl` is optional; leave "" to hide the register button.
// ============================================================================

export type ClubEvent = {
  date: string; // "YYYY-MM-DD"
  time: string; // e.g. "18:30"
  location: string;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  registerUrl: string;
};

export const events: ClubEvent[] = [
  {
    date: '2026-10-15',
    time: '18:30',
    location: 'CentraleSupélec — Amphi Peugeot',
    title: {
      en: 'Kick-off: Markets 101',
      fr: 'Lancement : Les marchés 101',
    },
    description: {
      en: 'Our opening session of the year — an introduction to markets, the club, and how to get involved. Open to all Bachelor students.',
      fr: "Notre première session de l'année — une introduction aux marchés, au club et à la manière de s'impliquer. Ouvert à tous les étudiants Bachelor.",
    },
    registerUrl: '',
  },
  {
    date: '2026-11-06',
    time: '18:30',
    location: 'CentraleSupélec — Salle à confirmer',
    title: {
      en: 'Stock Pitch Competition',
      fr: 'Compétition de Stock Pitch',
    },
    description: {
      en: 'Teams pitch a stock idea to a panel. Prizes for the most compelling thesis. Beginners welcome — we pair you with experienced members.',
      fr: "Des équipes défendent une idée d'investissement devant un jury. Des prix pour la thèse la plus convaincante. Débutants bienvenus — vous êtes accompagnés par des membres expérimentés.",
    },
    registerUrl: '',
  },
  {
    date: '2026-05-20',
    time: '19:00',
    location: 'CentraleSupélec',
    title: {
      en: 'Alumni Panel: Careers in Finance',
      fr: 'Table ronde Alumni : Carrières en finance',
    },
    description: {
      en: 'Former members now working in markets, IB, and asset management share how they broke in and what they wish they had known.',
      fr: "D'anciens membres travaillant en marchés, M&A et gestion d'actifs partagent leur parcours et leurs conseils.",
    },
    registerUrl: '',
  },
];
