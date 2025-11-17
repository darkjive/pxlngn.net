/**
 * Skills-Daten
 *
 * Strukturierte Daten für Fähigkeiten und Tätigkeiten
 */

import type { Item } from '~/types';

export const skillItems: Item[] = [
  {
    title: 'Web-Entwicklung',
    description: `HTML, CSS, JavaScript - das Fundament. Web-Apps bauen, Code reviewen, CI/CD mit Jenkins managen. Performance im Blick behalten, Monitoring aufsetzen.`,
    icon: 'tabler:code',
  },
  {
    title: 'Scrum Master',
    description: `Teams durch Scrum-Prozesse begleiten, Blocker wegräumen, Retrospektiven moderieren. Atlassian-Stack (JIRA, Confluence) setup und pflegen.`,
    icon: 'tabler:progress',
  },
  {
    title: 'Teamleitung',
    description: `1-on-1s führen, Entwicklungsperspektiven erarbeiten, Ressourcen planen. Release- und Incident-Management koordinieren.`,
    icon: 'tabler:users-group',
  },
  {
    title: 'Projektleitung',
    description: `Roadmaps planen, Meilensteine setzen, Budget im Auge behalten. Stakeholder-Kommunikation und Reporting. Jira-Boards strukturieren, Confluence-Dokumentation aktuell halten.`,
    icon: 'tabler:cap-projecting',
  },
  {
    title: 'QA-Softwaretesting',
    description: `Testszenarien durchspielen, Bugs in Jira dokumentieren, Regressions-Tests fahren. Deployments in Testumgebungen koordinieren, Status in Stand-Ups kommunizieren.`,
    icon: 'tabler:bug',
  },
  {
    title: 'AI-Entwicklung & Prompt Engineering',
    description: `KI-Tools wie LLM's produktiv einsetzen. Prompts für Automatisierung entwickeln, GitHub-Projekte und AI-Tools aufsetzen.`,
    icon: 'tabler:brain',
  },
  {
    title: 'Engagement',
    description: `Probleme aktiv angehen, Lösungen finden. Neues lernen, besser werden. Mehr liefern als erwartet.`,
    icon: 'tabler:heart',
  },
];
