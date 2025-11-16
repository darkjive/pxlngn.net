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
  description: `Code seit den 90ern. Webdesign, später Full-Stack mit modernem JavaScript-Stack.
    12 Jahre professionell - von Front-End über Scrum Master bis Projektleitung. Bin Generalist aus Überzeugung:
    Design verstehen, Code schreiben, Teams koordinieren. Kein Bullshit, kein Marketing-Sprech. Einfach Projekte
    die funktionieren.`,
};
