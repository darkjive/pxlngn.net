import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'START',
      href: getPermalink(),
      links: [
        {
          text: 'FAQ´s',
          href: getPermalink('/#faq'),
        },
      ],
    },
    {
      text: 'PROFIL',
      href: getPermalink('/about'),
      links: [
        {
          text: 'Über mich',
          href: getPermalink('/about#about'),
        },
        {
          text: 'Ausbildung',
          href: getPermalink('/about#resume'),
        },
        {
          text: 'Skills',
          href: getPermalink('/about#skills'),
        },
        {
          text: 'Technik',
          href: getPermalink('/about#techniken'),
        },
      ],
    },
    {
      text: 'BLOG',
      href: getBlogPermalink(),
      links: [
        {
          text: 'Nach Kategorie',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: 'Nach Tags',
          href: getPermalink('ai', 'tag'),
        },
      ],
    },
  ],
  actions: [{ text: 'KONTAKT', icon: 'tabler:mail', href: 'mailto:alain-ritter@protonmail.com' }],
};
export const footerData = {
  links: [
    {
      title: 'Start',
      href: getPermalink(),
      links: [
        { text: 'Portfolio', href: getPermalink('/#portfolio') },
        { text: 'FAQ´s', href: getPermalink('/#faq') },
      ],
    },
    {
      title: 'Profil',
      href: getPermalink('/about'),

      links: [
        {
          text: 'Über mich',
          href: getPermalink('/about#about'),
        },
        {
          text: 'Ausbildung',
          href: getPermalink('/about#resume'),
        },
        {
          text: 'Skills',
          href: getPermalink('/about#skills'),
        },
        {
          text: 'Technik',
          href: getPermalink('/about#techniken'),
        },
      ],
    },
    {
      title: 'Blog',
      links: [
        {
          text: 'Nach Kategorie',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: 'Nach Tags',
          href: getPermalink('ai', 'tag'),
        },
      ],
    },
    {
      title: 'Kontakt',
      href: getPermalink('/contact'),
      links: []
    },
    {
      title: 'Impressum',
      href: getPermalink('/terms'),
      links: []
  },
    {
      title: 'Datenschutz',
      href: getPermalink('/privacy'),
      links: []
  },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
};
