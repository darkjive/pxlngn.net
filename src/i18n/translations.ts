export type Language = 'de' | 'en' | 'fr';

export interface Translations {
  nav: {
    intro: string;
    profile: string;
    skills: string;
    projects: string;
  };
  footer: {
    privacy: string;
    imprint: string;
  };
  meta: {
    description: string;
  };
}

export const translations: Record<Language, Translations> = {
  de: {
    nav: {
      intro: 'Intro',
      profile: 'Profil',
      skills: 'Skills',
      projects: 'Projekte',
    },
    footer: {
      privacy: 'Datenschutz',
      imprint: 'Impressum',
    },
    meta: {
      description: 'Frontend-Entwickler und Designer für Webmedien. Ich kombiniere modernes Design und sauberen Code, um benutzerfreundliche Webanwendungen zu schaffen. Schau dir meine Projekte an oder erfahre mehr über mich!',
    },
  },
  en: {
    nav: {
      intro: 'Intro',
      profile: 'Profile',
      skills: 'Skills',
      projects: 'Projects',
    },
    footer: {
      privacy: 'Privacy',
      imprint: 'Imprint',
    },
    meta: {
      description: 'Frontend developer and designer for web media. I combine modern design and clean code to create user-friendly web applications. Check out my projects or learn more about me!',
    },
  },
  fr: {
    nav: {
      intro: 'Intro',
      profile: 'Profil',
      skills: 'Compétences',
      projects: 'Projets',
    },
    footer: {
      privacy: 'Confidentialité',
      imprint: 'Mentions légales',
    },
    meta: {
      description: 'Développeur frontend et designer pour médias web. Je combine design moderne et code propre pour créer des applications web conviviales. Découvrez mes projets ou apprenez-en plus sur moi !',
    },
  },
};

export const languageNames: Record<Language, string> = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
};

export const languageFlags: Record<Language, string> = {
  de: '🇩🇪',
  en: '🇬🇧',
  fr: '🇫🇷',
};
