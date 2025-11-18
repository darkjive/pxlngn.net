/**
 * Lebenslauf-Daten
 *
 * Strukturierte Daten für berufliche Stationen
 */

import type { Item } from '~/types';

export const resumeItems: Item[] = [
  {
    title:
      'ion2s GmbH <br/> <span class="font-normal">Projektmanager / Scrum Master</span> <br/> <span class="text-sm font-normal">2016 - 2025</span>',
    description: `<ul class="list-disc sm:pr-40 xl:pr-0 list-outside space-y-1 marker:text-primary">
      <li>TYPO3 Enterprise-Projekte leiten: OXG Glasfaser, Baukultur BW, TKS Cable - hybrid zwischen agil und klassisch</li>
      <li>Scrum Teams coachen, agile Prozesse mit JIRA/Confluence aufsetzen und am Laufen halten</li>
      <li>Servant Leadership - selbstorganisierte Teams fördern, kontinuierlich verbessern</li>
      <li>Incident- und Release-Management, Stakeholder auf dem Laufenden halten</li>
      <li>QA mit Playwright automatisieren, manuelle Tests, Bugs systematisch dokumentieren</li>
    </ul>`,
    icon: 'tabler:briefcase',
    logo: {
      src: '~/assets/images/Screenshot-2024-12-05-125828.webp',
      alt: 'ion2s GmbH Logo',
    },
  },
  {
    title:
      'ion2s GmbH <br/> <span class="font-normal">Front-End-Entwickler</span> <br/> <span class="text-sm font-normal">2012 - 2016</span>',
    description: `<ul class="list-disc sm:pr-40 xl:pr-0 list-outside space-y-1 marker:text-primary">
      <li>Web-Interfaces mit AngularJS, SCSS, Node.js und npm bauen</li>
      <li>Legacy-Migration: Kabel Deutschland zu Vodafone Zuhause Plus - Static Site Generators, Performance-Optimierung, moderne Frontend-Architektur</li>
      <li>TYPO3-Enterprise: Performance tunen, Responsive Design umsetzen, UX verbessern</li>
      <li>Code Reviews, CI/CD mit Jenkins integrieren</li>
      <li>Cross-funktional: Design, Front-End, Back-End zusammenbringen</li>
    </ul>`,
    icon: 'tabler:briefcase',
    logo: {
      src: '~/assets/images/Screenshot-2024-12-05-125828.webp',
      alt: 'ion2s GmbH Logo',
    },
  },
  {
    title:
      'Intercontact<br class="sm:hidden" /> Werbegesellschaft mbH <br/> <span class="font-normal">Full-Stack Web-Entwickler</span> <br/> <span class="text-sm font-normal">2010 - 2012</span>',
    description: `<ul class="list-disc sm:pr-40 xl:pr-0 list-outside space-y-1 marker:text-primary">
      <li>Full-Stack: HTML, CSS, JavaScript, PHP - plus Photoshop & Illustrator für Web und Print</li>
      <li>Apache-Webserver und Hosting-Infrastruktur administrieren</li>
      <li>CMS-Systeme betreuen und technisch supporten</li>
      <li>Marketing-Kampagnen technisch und gestalterisch umsetzen</li>
      <li>UX und Performance-Optimierungen beraten</li>
    </ul>`,
    icon: 'tabler:briefcase',
    logo: {
      src: '~/assets/images/werbeagentur_frankfurt.png',
      alt: 'Intercontact Logo',
    },
  },
  {
    title:
      'PREUSS<br class="sm:hidden" /> MEDIENSERVICE e.K. <br/> <span class="font-normal">Mediengestalter</span> <br/> <span class="text-sm font-normal">2003 - 2009</span>',
    description: `<ul class="list-disc sm:pr-40 xl:pr-0 list-outside space-y-1 marker:text-primary">
      <li>Webdesign und Programmierung - die Anfänge</li>
      <li>Printmedien gestalten und druckvorbereiten</li>
      <li>Kreative Konzepte für Werbematerialien entwickeln</li>
      <li>Druckvorstufe komplett betreuen</li>
    </ul>`,
    icon: 'tabler:briefcase',
    logo: {
      src: '~/assets/images/Screenshot-2024-12-05-125602.webp',
      alt: 'PREUSS MEDIENSERVICE Logo',
    },
  },
];
