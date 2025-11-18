/**
 * Projekt-Daten
 *
 * Strukturierte Daten für Kundenprojekte
 */

import type { Item } from '~/types';

export const projectItems: Item[] = [
  {
    title: 'OXG Glasfaser GmbH',
    description: `TYPO3-Website für Glasfaser-Internet. Scrum-basiert entwickelt.`,
    icon: 'tabler:world',
    callToAction: {
      variant: 'link',
      text: 'https://www.oxg.de',
      copyUrl: 'https://www.oxg.de',
    },
  },
  {
    title: 'Baukultur Baden-Württemberg',
    description: `TYPO3-Plattform für Architektur und Baukultur. Hybrid zwischen Waterfall und Scrum.`,
    icon: 'tabler:world',
    callToAction: {
      variant: 'link',
      text: 'https://www.baukultur-bw.de',
      copyUrl: 'https://www.baukultur-bw.de',
    },
  },
  {
    title: 'KuK',
    description: `TYPO3-Plattform für Ingenieurwesen. Kanban-basierter Workflow.`,
    icon: 'tabler:world',
    callToAction: {
      variant: 'link',
      text: 'https://www.kuk.de',
      copyUrl: 'https://www.kuk.de',
    },
  },
  {
    title: 'TKS Cable',
    description: `TYPO3 für Kabel- und Netzwerktechnik. Kontinuierlicher Kanban-Workflow.`,
    icon: 'tabler:world',
    callToAction: {
      variant: 'link',
      text: 'https://www.tkscable.com',
      copyUrl: 'https://www.tkscable.com',
    },
  },
  {
    title: 'Vodafone Zuhause Plus',
    description: `Static Site Generator statt TYPO3. Frontend-Entwicklung mit Scrum - schnelle Iteration, hohe Code-Qualität.`,
    icon: 'tabler:world',
    callToAction: {
      variant: 'link',
      text: 'https://zuhauseplus.vodafone.de',
      copyUrl: 'https://zuhauseplus.vodafone.de',
    },
  },
];
