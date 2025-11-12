// import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Intro',
      href: '#hero',
      icon: '',
      links: [],
    },
    {
      text: 'Profil',
      href: '#profile',
      icon: '',
      links: [],
    },
    {
      text: 'Skills',
      href: '#skills',
      icon: '',
      links: [],
    },
    {
      text: 'Projekte',
      href: '#projects',
      icon: '',
      links: [],
    },
  ],
  actions: [{ href: 'https://github.com/darkjive/pxlngn.net' }, { href: 'mailto:hi@pxlngn.net' }],
};
export const footerData = {
  links: [
    {
      title: 'Intro',
      href: '#hero',
      icon: '',
      links: [],
    },
    {
      title: 'Profil',
      href: '#profile',
      icon: '',
      links: [],
    },
    {
      title: 'Skills',
      href: '#skills',
      icon: '',
      links: [],
    },
    {
      title: 'Projekte',
      href: '#projects',
      icon: '',
      links: [],
    },
    // {
    //   title: 'Impressum',
    //   href: getPermalink('/terms'),
    //   links: [],
    // },
    // {
    //   title: 'Datenschutz',
    //   href: getPermalink('/privacy'),
    //   links: [],
    // },
  ],
  socialLinks: [
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/darkjive/pxlngn.net' },
    { ariaLabel: 'E-Mail', icon: 'tabler:mail', href: 'mailto:hi@pxlngn.net' },
  ],
};
