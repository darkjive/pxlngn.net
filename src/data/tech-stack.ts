/**
 * Tech-Stack Daten
 *
 * Strukturierte Daten für Technologien, Tools und Methoden
 */

interface TechImage {
  src: string;
  alt: string;
  title: string;
  href?: string;
}

export const primaryTechStack: TechImage[] = [
  {
    src: '~/assets/images/icons/html-5--v1.png',
    alt: 'HTML5',
    title: 'HTML5',
    href: 'https://html.spec.whatwg.org/',
  },
  {
    src: '~/assets/images/icons/css3.png',
    alt: 'CSS3',
    title: 'CSS3',
    href: 'https://www.w3.org/Style/CSS/',
  },
  {
    src: '~/assets/images/icons/javascript.png',
    alt: 'JavaScript',
    title: 'JavaScript',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    src: '~/assets/images/icons/astro.png',
    alt: 'Astro - Modern Static Site Generator',
    title: 'Astro',
    href: 'https://astro.build/',
  },

  {
    src: '~/assets/images/icons/tailwind_css.png',
    alt: 'Tailwind CSS - Utility-First Framework',
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
  },
  {
    src: '~/assets/images/icons/nodejs.png',
    alt: 'Node.js - JavaScript Runtime',
    title: 'Node.js',
    href: 'https://nodejs.org/',
  },
  {
    src: '~/assets/images/icons/npm.png',
    alt: 'npm - Package Manager',
    title: 'npm',
    href: 'https://www.npmjs.com/',
  },
  {
    src: '~/assets/images/icons/logo@2x.png',
    alt: 'Git - Version Control',
    title: 'Git',
    href: 'https://git-scm.com/',
  },
];

export const secondaryTechStack: TechImage[] = [
  {
    src: '~/assets/images/icons/react-native.png',
    alt: 'React - UI Library',
    title: 'React',
    href: 'https://react.dev/',
  },
  {
    src: '~/assets/images/icons/vue-js.png',
    alt: 'Vue.js - Progressive Framework',
    title: 'Vue.js',
    href: 'https://vuejs.org/',
  },
  {
    src: '~/assets/images/icons/external-typescript-an-open-source-programming-language-developed-and-maintained-by-microsoft-logo-bold-tal-revivo.png',
    alt: 'TypeScript - JavaScript mit Types',
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org/',
  },

  {
    src: '~/assets/images/icons/python--v1.png',
    alt: 'Python',
    title: 'Python',
    href: 'https://www.python.org/',
  },
  {
    src: '~/assets/images/icons/playwright-seeklogo.png',
    alt: 'Playwright - E2E Testing',
    title: 'Playwright',
    href: 'https://playwright.dev/',
  },
  {
    src: '~/assets/images/icons/docker.png',
    alt: 'Docker - Containerization',
    title: 'Docker',
    href: 'https://www.docker.com/',
  },
  {
    src: '~/assets/images/icons/linux--v1.png',
    alt: 'Linux',
    title: 'Linux',
    href: 'https://www.kernel.org/',
  },
  {
    src: '~/assets/images/icons/php.svg',
    alt: 'PHP',
    title: 'PHP',
    href: 'https://www.php.net/',
  },
  {
    src: '~/assets/images/icons/handlebars.svg',
    alt: 'Handlebars - Template Engine',
    title: 'Handlebars',
    href: 'https://handlebarsjs.com/',
  },
  {
    src: '~/assets/images/icons/bem-css-logo.png',
    alt: 'BEM CSS - Strukturierte CSS-Namenskonvention',
    title: 'BEM CSS',
    href: 'https://getbem.com/',
  },
];

export const projectManagementMethods: TechImage[] = [
  {
    src: '~/assets/images/icons/sprint-iteration.png',
    alt: 'Scrum: Ein agiles Framework für iteratives Projektmanagement und Produktentwicklung.',
    title: 'Scrum',
    href: 'https://www.scrum.org/',
  },
  {
    src: '~/assets/images/icons/external-kanban-project-management-kmg-design-flat-kmg-design.png',
    alt: 'Kanban: Eine visuelle Methode zur Steuerung und Optimierung von Arbeitsprozessen.',
    title: 'Kanban',
    href: 'https://kanban.university/',
  },
  {
    src: '~/assets/images/icons/waterfall.png',
    alt: 'Waterfall: Ein sequenzieller Projektmanagement-Ansatz mit klar definierten Phasen.',
    title: 'Waterfall',
    href: 'https://en.wikipedia.org/wiki/Waterfall_model',
  },
];

export const toolStack: TechImage[] = [
  {
    src: '~/assets/images/icons/vscode-logo.png',
    alt: 'Visual Studio Code: Ein beliebter Code-Editor mit umfassenden Erweiterungen.',
    title: 'Visual Studio Code',
    href: 'https://code.visualstudio.com/',
  },
  {
    src: '~/assets/images/icons/intellij-idea.png',
    alt: 'IntelliJ IDEA: Ein beliebter Code-Editor mit umfassenden Erweiterungen.',
    title: 'IntelliJ IDEA',
    href: 'https://www.jetbrains.com/idea/',
  },
  {
    src: '~/assets/images/icons/figma--v1.png',
    alt: 'Figma: Ein kollaboratives Design-Tool für UX/UI-Projekte.',
    title: 'Figma',
    href: 'https://www.figma.com/',
  },
  {
    src: '~/assets/images/icons/inkscape--v1.png',
    alt: 'Inkscape: Eine Open-Source-Software für Vektorgrafiken und Illustration.',
    title: 'Inkscape',
    href: 'https://inkscape.org/',
  },
  {
    src: '~/assets/images/icons/adobe-illustrator--v1.png',
    alt: 'Adobe Illustrator: Ein Tool für Vektorgrafikdesign und Illustrationen.',
    title: 'Adobe Illustrator',
    href: 'https://www.adobe.com/products/illustrator.html',
  },
  {
    src: '~/assets/images/icons/gimp.png',
    alt: 'GIMP: Ein Open-Source-Bildbearbeitungsprogramm für grafische Projekte.',
    title: 'GIMP',
    href: 'https://www.gimp.org/',
  },
  {
    src: '~/assets/images/icons/adobe-photoshop--v1.png',
    alt: 'Adobe Photoshop: Eine führende Software für professionelle Bildbearbeitung.',
    title: 'Adobe Photoshop',
    href: 'https://www.adobe.com/products/photoshop.html',
  },
  {
    src: '~/assets/images/icons/github-logo.png',
    alt: 'GitHub: Eine Plattform für die Versionskontrolle und Zusammenarbeit an Projekten.',
    title: 'GitHub',
    href: 'https://github.com/',
  },
  {
    src: '~/assets/images/icons/gitlab-logo.png',
    alt: 'GitLab: Eine Plattform für die Versionskontrolle, Continuous Integration und Zusammenarbeit an Projekten.',
    title: 'GitLab',
    href: 'https://gitlab.com/',
  },
  {
    src: '~/assets/images/icons/external-bitbucket-is-a-web-based-version-control-repository-hosting-service-logo-shadow-tal-revivo.png',
    alt: 'Bitbucket: Ein webbasierter Hosting-Dienst für Versionskontrolle und Zusammenarbeit mit Git und Mercurial.',
    title: 'Atlassian Bitbucket',
    href: 'https://bitbucket.org/',
  },
  {
    src: '~/assets/images/icons/jira.png',
    alt: 'Jira: Eine Plattform für Projektmanagement und Issue-Tracking.',
    title: 'Jira',
    href: 'https://www.atlassian.com/software/jira',
  },
  {
    src: '~/assets/images/icons/confluence.png',
    alt: 'Confluence: Eine Kollaborationssoftware zur Dokumentation und Teamorganisation.',
    title: 'Confluence',
    href: 'https://www.atlassian.com/software/confluence',
  },
  {
    src: '~/assets/images/icons/jenkins.png',
    alt: 'Jenkins: Ein Open-Source-Tool für die Automatisierung von Softwareentwicklungsprozessen.',
    title: 'Jenkins',
    href: 'https://www.jenkins.io/',
  },
  {
    src: '~/assets/images/icons/vercel.svg',
    alt: 'Vercel: Eine Plattform für die Entwicklung und Bereitstellung von Webprojekten.',
    title: 'Vercel',
    href: 'https://vercel.com/',
  },
  {
    src: '~/assets/images/icons/cloudflare-color.svg',
    alt: 'Cloudflare: Eine Plattform für sichere und schnelle Websites, APIs und Anwendungen.',
    title: 'Cloudflare',
    href: 'https://www.cloudflare.com/',
  },
];

export const cmsStack: TechImage[] = [
  {
    src: '~/assets/images/icons/wordpress.png',
    alt: 'WordPress: Ein weit verbreitetes Content Management System für Webseiten.',
    title: 'WordPress',
    href: 'https://wordpress.org/',
  },
  {
    src: '~/assets/images/icons/external-elementor-the-wordpress-page-builder-a-simple-intuitive-drag-and-drop-interface-logo-color-tal-revivo.png',
    alt: 'Elementor: Ein Drag-and-Drop-Editor für WordPress-Webseiten.',
    title: 'Elementor',
    href: 'https://elementor.com/',
  },
  {
    src: '~/assets/images/icons/typo3-logo.png',
    alt: 'TYPO3: Ein flexibles Content Management System für große Webseiten.',
    title: 'TYPO3',
    href: 'https://typo3.org/',
  },
  {
    src: '~/assets/images/icons/redaxo-logo.png',
    alt: 'Redaxo: Ein modulares und anpassbares CMS für Webprojekte.',
    title: 'Redaxo',
    href: 'https://www.redaxo.org/',
  },
];

export const abstractItems = [
  {
    title: 'Frontend-Entwicklung',
    description: 'HTML, CSS, JavaScript. Sauberer Code, wartbar, modular.',
    icon: 'tabler:code',
  },
  {
    title: 'Projektleitung',
    description: 'Planung, Steuerung, Umsetzung. Klare Prozesse, messbare Ergebnisse.',
    icon: 'tabler:briefcase',
  },
  {
    title: 'Teamleitung & Scrum',
    description: 'Teams führen und unterstützen. Scrum-Prozesse strukturiert aufsetzen.',
    icon: 'tabler:users',
  },
  {
    title: 'Legacy-Systeme',
    description: 'Alte Codebases analysieren, refactoren, modernisieren.',
    icon: 'tabler:layers-linked',
  },
  {
    title: 'Quality Assurance',
    description: 'Manuell und automatisiert testen. Bugs tracken, reproduzieren, fixen.',
    icon: 'tabler:checkup-list',
  },
  {
    title: 'CI/CD & Monitoring',
    description: 'Jenkins-Deployments. Performance und Stabilität überwachen.',
    icon: 'tabler:rocket',
  },
  {
    title: 'Dokumentation',
    description: 'Projektdocs und Wissensmanagement in Confluence.',
    icon: 'tabler:book',
  },
  {
    title: 'Prozessverbesserung',
    description: 'Workflows optimieren. Kommunikation im Team verbessern.',
    icon: 'tabler:settings',
  },
];
