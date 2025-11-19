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
    icon: 'tabler:code-filled',
  },
  {
    title: 'Projektleitung',
    description: `Von kleinen WordPress-Sites zu großen Enterprise-Projekten. Budgets, Timelines, Stakeholder-Management gelernt und verfeinert.`,
    icon: 'tabler:cap-projecting-filled',
  },
  {
    title: 'Teamleitung & Scrum',
    description: `Teams aufgebaut und geführt. Scrum Master-Rolle übernommen. Sprint-Planning, Retrospektiven, Daily Standups etabliert.`,
    icon: 'tabler:users-group-filled',
  },
  {
    title: 'Legacy-Systeme',
    description: `Alte Codebases übernommen, analysiert, aufgeräumt. Schritt für Schritt modernisiert. Continuous Improvement statt Big Bang Rewrite.`,
    icon: 'tabler:timeline-event-filled',
  },
  {
    title: 'Quality Assurance',
    description: `Manuelle Tests, später automatisiert. Bug-Tracking-Systeme eingeführt. Testprozesse aufgebaut und verbessert.`,
    icon: 'tabler:bug-filled',
  },
  {
    title: 'CI/CD & Monitoring',
    description: `Jenkins-Pipelines gebaut. Deployments automatisiert. Monitoring-Tools integriert. Performance-Metriken etabliert.`,
    icon: 'tabler:settings-automation-filled',
  },
  {
    title: 'Dokumentation',
    description: `Wikis gepflegt, Confluence-Spaces strukturiert. Wissenstransfer organisiert. Onboarding-Prozesse dokumentiert.`,
    icon: 'tabler:file-text-filled',
  },
  {
    title: 'Prozessverbesserung',
    description: `Workflows optimiert, Bottlenecks identifiziert. Kommunikation im Team verbessert. Continuous Improvement gelebt.`,
    icon: 'tabler:chart-line-filled',
  },
  {
    title: 'AI & Prompt Engineering',
    description: `Früh mit LLMs experimentiert. Produktive Workflows mit KI-Tools entwickelt. Automatisierung vorangetrieben.`,
    icon: 'tabler:brain-filled',
  },
];
