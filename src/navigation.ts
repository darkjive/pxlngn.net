import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'INTRO',
      href: getPermalink(),
      links: [
        {
          text: 'Portfolio',
          href: getPermalink('portfolio', 'category'),
        },
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
          text: 'Skills',
          href: getPermalink('/about#skills'),
        },
        {
          text: 'Technik',
          href: getPermalink('/about#tech'),
        },
      ],
    },
    {
      text: 'BLOG',
      href: getBlogPermalink(),
    },
  ],
  actions: [{ text: 'KONTAKT', icon: 'tabler:mail', href: 'mailto:alain-ritter@protonmail.com' }],
};
export const footerData = {
  links: [
    {
      title: 'INTRO',
      href: getPermalink(),
      links: [
        {
          text: 'Portfolio',
          href: getPermalink('portfolio', 'category'),
        },
        {
          text: 'FAQ´s',
          href: getPermalink('/#faq'),
        },
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
          text: 'Skills',
          href: getPermalink('/about#skills'),
        },
        {
          text: 'Technik',
          href: getPermalink('/about#tech'),
        },
      ],
    },
    {
      title: 'Blog',
      href: getBlogPermalink(),
      links: [],
    },
    {
      title: 'Kontakt',
      href: 'mailto:alain-ritter@protonmail.com',
      links: [],
    },
    {
      title: 'Impressum',
      href: getPermalink('/terms'),
      links: [],
    },
    {
      title: 'Datenschutz',
      href: getPermalink('/privacy'),
      links: [],
    },
  ],
  socialLinks: [
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/darkjive' },
  ],
};
