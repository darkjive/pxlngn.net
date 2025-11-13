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
      <li>Leitung von TYPO3-basierten Enterprise-Projekten (u.a. OXG Glasfaser, Baukultur Baden-Württemberg, TKS Cable) mit hybriden Projektmanagement-Ansätzen</li>
      <li>Betreuung und Coaching von Scrum Teams sowie Implementierung agiler Prozesse mit JIRA und Confluence</li>
      <li>Servant Leadership: Förderung selbstorganisierter Teams und kontinuierlicher Verbesserungsprozesse</li>
      <li>Incident- und Release-Management sowie Stakeholder-Kommunikation</li>
      <li>QA-Softwaretesting manuell und mit Playwright und systematischer Fehlerdokumentation</li>
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
      <li>Entwicklung moderner Web-Interfaces mit AngularJS, SCSS, Node.js und npm</li>
      <li>Migration und Transformation von Legacy-Software zu modernen Static Site Generators: Betreuung der technischen Migration von Kabel Deutschland zu Vodafone Zuhause Plus mit Fokus auf Performance-Optimierung und moderne Frontend-Architektur</li>
      <li>Performance-Optimierung, Responsive Design und Verbesserung der Benutzerfreundlichkeit für TYPO3-basierte Enterprise-Lösungen</li>
      <li>Code Reviews und CI/CD-Integration mit Jenkins</li>
      <li>Cross-funktionale Zusammenarbeit zwischen Design, Front-End und Back-End</li>
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
      <li>Full-Stack Web-Development mit HTML, CSS, JavaScript, PHP sowie Adobe Photoshop und Illustrator für Web- und Printgestaltung</li>
      <li>Administration von Apache-Webservern und Hosting-Infrastruktur</li>
      <li>CMS-Administration und technische Betreuung von Content-Management-Systemen</li>
      <li>Technische und gestalterische Umsetzung digitaler Marketingkampagnen</li>
      <li>Beratung zur Optimierung von User Experience und Performance</li>
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
      <li>Webdesign und Programmierung</li>
      <li>Gestaltung und Druckvorbereitung von Printmedien</li>
      <li>Entwicklung kreativer Konzepte für Werbematerialien</li>
      <li>Betreuung des gesamten Druckvorstufenprozesses</li>
    </ul>`,
    icon: 'tabler:briefcase',
    logo: {
      src: '~/assets/images/Screenshot-2024-12-05-125602.webp',
      alt: 'PREUSS MEDIENSERVICE Logo',
    },
  },
];
