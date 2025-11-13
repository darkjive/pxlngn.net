/**
 * Projekt-Daten
 *
 * Strukturierte Daten für Kundenprojekte
 */

import type { Item } from '~/types';

export const projectItems: Item[] = [
  {
    title: 'OXG Glasfaser GmbH',
    description: `TYPO3-basierte Webseite mit Fokus auf Glasfaser-Internet. Projektmanagement mit Scrum-Methodik für agile Entwicklung und kontinuierliche Verbesserung.`,
    icon: 'tabler:world',
    callToAction: {
      variant: 'link',
      text: 'https://www.oxg.de',
      copyUrl: 'https://www.oxg.de',
    },
  },
  {
    title: 'Baukultur Baden-Württemberg',
    description: `TYPO3-Website für Architektur und Baukultur. Projektmanagement im Hybrid-Ansatz mit Waterfall- und Scrum-Elementen für strukturierte und flexible Umsetzung.`,
    icon: 'tabler:world',
    callToAction: {
      variant: 'link',
      text: 'https://www.baukultur-bw.de',
      copyUrl: 'https://www.baukultur-bw.de',
    },
  },
  {
    title: 'KuK',
    description: `TYPO3-Plattform für Ingenieurwesen. Klassisches Projektmanagement mit Kanban für kontinuierlichen Workflow und optimierte Prozesse.`,
    icon: 'tabler:world',
    callToAction: {
      variant: 'link',
      text: 'https://www.kuk.de',
      copyUrl: 'https://www.kuk.de',
    },
  },
  {
    title: 'TKS Cable',
    description: `TYPO3-Lösung für Kabel- und Netzwerktechnik. Projektmanagement mit Kanban für kontinuierlichen Workflow und optimierte Prozesse.`,
    icon: 'tabler:world',
    callToAction: {
      variant: 'link',
      text: 'https://www.tkscable.com',
      copyUrl: 'https://www.tkscable.com',
    },
  },
  {
    title: 'Vodafone Zuhause Plus',
    description: `Moderne Website mit Static Site Generator. Frontend-Entwicklung und Scrum-basiertes Projektmanagement für schnelle Iteration und hohe Code-Qualität.`,
    icon: 'tabler:world',
    callToAction: {
      variant: 'link',
      text: 'https://zuhauseplus.vodafone.de',
      copyUrl: 'https://zuhauseplus.vodafone.de',
    },
  },
];
