import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Intro',
      href: getPermalink(),
      icon: 'tabler:chevron-down',
      links: [
        {
          text: 'Projekte',
          href: getPermalink('/#projects'),
        },
        {
          text: 'Blog',
          href: getPermalink('/#blog'),
        },
        // {
        //   text: 'FAQ´s',
        //   href: getPermalink('/#faq'),
        // },
      ],
    },
    {
      text: 'Profil',
      href: getPermalink('/#profile'),
      icon: 'tabler:chevron-down',
      links: [
        {
          text: 'Über mich',
          href: getPermalink('/#about'),
        },
        {
          text: 'Lebenslauf',
          href: getPermalink('/#resume'),
        },
        {
          text: 'Fähigkeiten',
          href: getPermalink('/#skills'),
        },
        {
          text: 'Abstrakt',
          href: getPermalink('/#abstract'),
        },
      ],
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [{ href: 'https://github.com/darkjive/pxlngn.net' }, { href: 'mailto:hi@pxlngn.net' }],
};
export const footerData = {
  links: [
    {
      title: 'Intro',
      href: getPermalink(),
      links: [
        {
          text: 'Projekte',
          href: getPermalink('/#projects'),
        },
        {
          text: 'Blog',
          href: getPermalink('/#blog'),
        },
        // {
        //   text: 'FAQ´s',
        //   href: getPermalink('/#faq'),
        // },
      ],
    },
    {
      title: 'Profil',
      href: getPermalink('/#profile'),
      links: [
        {
          text: 'Über mich',
          href: getPermalink('/#about'),
        },
        {
          text: 'Lebenslauf',
          href: getPermalink('/#resume'),
        },
        {
          text: 'Fähigkeiten',
          href: getPermalink('/#skills'),
        },
        {
          text: 'Abstrakt',
          href: getPermalink('/#abstract'),
        },
      ],
    },
    {
      title: 'Blog',
      href: getBlogPermalink(),
      links: [
        {
          text: 'Nach Kategorie',
          href: getPermalink('entwicklung', 'category'),
        },
        {
          text: 'Nach Tag´s',
          href: getPermalink('front-end', 'tag'),
        },
      ],
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
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/darkjive/pxlngn.net' },
    { ariaLabel: 'E-Mail', icon: 'tabler:mail', href: 'mailto:hi@pxlngn.net' },
  ],
};
