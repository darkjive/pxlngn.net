// import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import { getPermalink, getBlogPermalink } from './utils/permalinks';

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
          text: 'Profil',
          href: getPermalink('/#profile'),
        },
        {
          text: 'Lebenslauf',
          href: getPermalink('/#resume'),
        },
        {
          text: 'Dienstleistungen',
          href: getPermalink('/#abstract'),
        },

        // {
        //   text: 'Blog',
        //   href: getPermalink('/#blog'),
        // },
        // {
        //   text: 'Über mich',
        //   href: getPermalink('/#about'),
        // },
        // {
        //   text: 'Resume',
        //   href: getPermalink('/#abstract'),
        // },
        // {
        //   text: 'FAQ´s',
        //   href: getPermalink('/#faq'),
        // },
      ],
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
      icon: 'tabler:chevron-down',
      links: [],
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
          text: 'Profil',
          href: getPermalink('/#profile'),
        },
        {
          text: 'Lebenslauf',
          href: getPermalink('/#resume'),
        },
        {
          text: 'Dienstleistungen',
          href: getPermalink('/#abstract'),
        },
      ],
    },
    {
      title: 'Blog',
      href: getBlogPermalink(),
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
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/darkjive/pxlngn.net' },
    { ariaLabel: 'E-Mail', icon: 'tabler:mail', href: 'mailto:hi@pxlngn.net' },
  ],
};
