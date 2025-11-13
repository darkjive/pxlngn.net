/**
 * Skills-Daten
 *
 * Strukturierte Daten für Fähigkeiten und Tätigkeiten
 */

import type { Item } from '~/types';

export const skillItems: Item[] = [
  {
    title: 'Web-Entwicklung',
    description: `Kundenanforderungen analysieren, Web-Applikationen erstellen (HTML, CSS, JavaScript) und Codereviews durchführen. Betreuung bestehender Projekte und Deployment über CI/CD (Jenkins) verwalten. Systemleistung durch Monitoring-Tools überwachen.`,
    icon: 'tabler:code',
  },
  {
    title: 'Scrum Master',
    description: `Scrum Teams betreuen und in Scrum-Fragen coachen, Prozessoptimierung und Hindernisbeseitigung. Beratung zu Atlassian Produkten (JIRA, Confluence) und Planung von Scrum-Implementierungen.`,
    icon: 'tabler:progress',
  },
  {
    title: 'Teamleitung',
    description: `Mitarbeitergespräche führen und Perspektiven zur Weiterentwicklung erarbeiten. Kommunikation im Team sicherstellen, Ressourcenplanung sowie Release- und Incident-Management.`,
    icon: 'tabler:users-group',
  },
  {
    title: 'Projektleitung',
    description: `Kundenprojekte planen, Roadmaps und Meilensteine erstellen. Kontrolle von Projektfortschritten und Budgets, Kommunikation und Reporting an Stakeholder. Pflege von Projektboards in Jira und Dokumentation in Confluence.`,
    icon: 'tabler:cap-projecting',
  },
  {
    title: 'QA-Softwaretesting',
    description: `Anforderungen prüfen und Testszenarien durchführen. Fehlerdokumentation in Jira und Fehler-Nachtests. Deployment in Testumgebungen und tägliche Status-Berichte in Daily Stand-Ups.`,
    icon: 'tabler:bug',
  },
  {
    title: 'AI-Entwicklung & Prompt Engineering',
    description: `Einsatz von KI auf Entwickler-Ebene zur Produktivitätssteigerung. Entwicklung von Prompts für Software-Lösungen und Automatisierung. Erfahrung mit gängigen Lösungen (ChatGPT, Claude, GitHub Copilot). Installation und Einrichtung von GitHub-Projekten und AI-Tools.`,
    icon: 'tabler:brain',
  },
  {
    title: 'Engagement',
    description: `Proaktive und leidenschaftliche Herangehensweise an Herausforderungen. Starke Motivation, Ziele zu erreichen und kontinuierlich Neues zu lernen. Bereitschaft, über das Erwartete hinaus einen Mehrwert zu schaffen.`,
    icon: 'tabler:heart',
  },
];
