import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Intro',
      href: getPermalink('/#hero'),
      icon: '',
      links: [],
    },
    {
      text: 'Profil',
      href: getPermalink('/#profile'),
      icon: '',
      links: [],
    },
    {
      text: 'Skills',
      href: getPermalink('/#chart'),
      icon: '',
      links: [],
    },
    {
      text: 'Projekte',
      href: getPermalink('/#projects'),
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
      href: getPermalink('/#hero'),
      icon: '',
      links: [],
    },
    {
      title: 'Profil',
      href: getPermalink('/#profile'),
      icon: '',
      links: [],
    },
    {
      title: 'Skills',
      href: getPermalink('/#chart'),
      icon: '',
      links: [],
    },
    {
      title: 'Projekte',
      href: getPermalink('/#projects'),
      icon: '',
      links: [],
    },
    {
      title: 'Datenschutz',
      href: getPermalink('/privacy'),
      icon: '',
      links: [],
    },
    {
      title: 'Impressum',
      href: getPermalink('/terms'),
      icon: '',
      links: [],
    },
  ],
  socialLinks: [
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/darkjive/pxlngn.net' },
    { ariaLabel: 'E-Mail', icon: 'tabler:mail', href: 'mailto:hi@pxlngn.net' },
  ],
};
