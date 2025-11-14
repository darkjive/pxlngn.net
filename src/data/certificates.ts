/**
 * Zertifikate-Daten
 *
 * Strukturierte Daten für berufliche Zertifizierungen
 */

import type { Item } from '~/types';

export const certificateItems: Item[] = [
  {
    title: `Certified ScrumMaster® <br/> <span class="font-normal">Scrum Alliance</span> <br/> <span class="text-sm font-normal">Ausgestellt: Apr. 2021 · Gültig bis: Apr. 2025</span>`,
    description: `Zertifikats-ID: 001189726`,
    icon: 'tabler:certificate',
    logo: {
      src: '~/assets/images/scrum_alliance_logo.jpg',
      alt: 'Scrum Alliance Logo',
    },
  },
];
