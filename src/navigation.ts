import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Intro',
      href: getPermalink(),
      icon: '',
      links: [
        // {
        //   text: 'Portfolio',
        //   href: getPermalink('/portfolio'),
        // },
        // {
        //   text: 'Blog',
        //   href: getPermalink('/#blog'),
        // },
        // {
        //   text: 'FAQ´s',
        //   href: getPermalink('/#faq'),
        // },
      ],
    },
    {
      text: 'Profil',
      href: getPermalink('/about'),
      icon: 'tabler:chevron-down',
      links: [
        {
          text: 'Über mich',
          href: getPermalink('/about/#about'),
        },
        {
          text: 'Lebenslauf',
          href: getPermalink('/about/#resume'),
        },
        {
          text: 'Fähigkeiten',
          href: getPermalink('/about/#skills'),
        },
        {
          text: 'Abstrakt',
          href: getPermalink('/about/#abstract'),
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
          text: 'Portfolio',
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
      href: getPermalink('/about'),
      links: [
        {
          text: 'Über mich',
          href: getPermalink('/about/#about'),
        },
        {
          text: 'Lebenslauf',
          href: getPermalink('/about/#skills'),
        },
        {
          text: 'Fähigkeiten',
          href: getPermalink('/about/#skills'),
        },
        {
          text: 'Abstrakt',
          href: getPermalink('/about/#abstract'),
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
