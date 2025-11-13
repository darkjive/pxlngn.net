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
  description: `Mir macht es Spaß, digitale Erlebnisse zu schaffen, die gut aussehen und einfach funktionieren. Egal, ob Design
    oder Code. Meine Stärke liegt in meiner hohen Anpassungsfähigkeit. Ich passe mich schnell an neue Anforderungen,
    Technologien oder Herausforderungen an und finde Lösungen, die genau zum Projekt und den Nutzern passen. Neben
    meiner Arbeit als Entwickler bringe ich Erfahrung in Scrum und QA mit, weil Projekte für mich nicht nur kreativ,
    sondern auch gut strukturiert sein müssen.`,
};
