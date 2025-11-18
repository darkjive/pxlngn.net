/**
 * Skills-Daten
 *
 * Strukturierte Daten für Fähigkeiten und Tätigkeiten
 */

import type { Item } from '~/types';

export const skillItems: Item[] = [
  {
    title: 'Frontend-Entwicklung',
    description: `Seit 2000: Von HTML-Tabellen zu modernem JavaScript. Responsive Design seit den frühen Bootstrap-Tagen. Accessibility und Performance immer im Fokus.`,
    icon: 'tabler:code',
  },
  {
    title: 'Projektleitung',
    description: `Von kleinen WordPress-Sites zu großen Enterprise-Projekten. Budgets, Timelines, Stakeholder-Management gelernt und verfeinert.`,
    icon: 'tabler:cap-projecting',
  },
  {
    title: 'Teamleitung & Scrum',
    description: `Teams aufgebaut und geführt. Scrum Master-Rolle übernommen. Sprint-Planning, Retrospektiven, Daily Standups etabliert.`,
    icon: 'tabler:users-group',
  },
  {
    title: 'Legacy-Systeme',
    description: `Alte Codebases übernommen, analysiert, aufgeräumt. Schritt für Schritt modernisiert. Continuous Improvement statt Big Bang Rewrite.`,
    icon: 'tabler:timeline-event',
  },
  {
    title: 'Quality Assurance',
    description: `Manuelle Tests, später automatisiert. Bug-Tracking-Systeme eingeführt. Testprozesse aufgebaut und verbessert.`,
    icon: 'tabler:bug',
  },
  {
    title: 'CI/CD & Monitoring',
    description: `Jenkins-Pipelines gebaut. Deployments automatisiert. Monitoring-Tools integriert. Performance-Metriken etabliert.`,
    icon: 'tabler:settings-automation',
  },
  {
    title: 'Dokumentation',
    description: `Wikis gepflegt, Confluence-Spaces strukturiert. Wissenstransfer organisiert. Onboarding-Prozesse dokumentiert.`,
    icon: 'tabler:file-text',
  },
  {
    title: 'Prozessverbesserung',
    description: `Workflows optimiert, Bottlenecks identifiziert. Kommunikation im Team verbessert. Continuous Improvement gelebt.`,
    icon: 'tabler:chart-line',
  },
  {
    title: 'AI & Prompt Engineering',
    description: `Früh mit LLMs experimentiert. Produktive Workflows mit KI-Tools entwickelt. Automatisierung vorangetrieben.`,
    icon: 'tabler:brain',
  },
];
