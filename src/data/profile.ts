/**
 * Profil-Daten
 *
 * Kontakt-Links und Profil-Text
 */

import type { Item } from '~/types';

export const contactItems: Item[] = [
  {
    icon: 'tabler:brand-linkedin',
    callToAction: {
      target: '_blank',
      text: 'Linkedin',
      href: 'https://www.linkedin.com/in/alain-ritter-b49ba8233/',
    },
  },
  {
    icon: 'tabler:mail',
    callToAction: {
      target: '_blank',
      text: 'E-Mail',
      href: 'mailto:hi@pxlngn.net',
    },
  },
];

export const profileText = {
  description: `"beep, boop" seit dem ich 14 bin. Screendesign, UI-Design, später Full-Stack im Web mit modernem Software-Stack.
    12 Jahre professionell, von Front-End über Scrum Master bis Projektleitung. Design verstehen, Code schreiben, Teams koordinieren, Menschen helfen und zu begeistern, ist was ich liebe.`,
};
