import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Intro',
      href: getPermalink('/#hero'),
      icon: '',
      links: [],
      dataNav: 'intro',
    },
    {
      text: 'Profil',
      href: getPermalink('/#profile'),
      icon: '',
      links: [],
      dataNav: 'profile',
    },
    {
      text: 'Skills',
      href: getPermalink('/#skills'),
      icon: '',
      links: [],
      dataNav: 'skills',
    },
    {
      text: 'Projekte',
      href: getPermalink('/#projects'),
      icon: '',
      links: [],
      dataNav: 'projects',
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
      dataNav: 'intro',
    },
    {
      title: 'Profil',
      href: getPermalink('/#profile'),
      icon: '',
      links: [],
      dataNav: 'profile',
    },
    {
      title: 'Skills',
      href: getPermalink('/#skills'),
      icon: '',
      links: [],
      dataNav: 'skills',
    },
    {
      title: 'Projekte',
      href: getPermalink('/#projects'),
      icon: '',
      links: [],
      dataNav: 'projects',
    },
    {
      title: 'Datenschutz',
      href: getPermalink('/privacy'),
      icon: '',
      links: [],
      dataFooter: 'privacy',
    },
    {
      title: 'Impressum',
      href: getPermalink('/terms'),
      icon: '',
      links: [],
      dataFooter: 'imprint',
    },
  ],
  socialLinks: [
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/darkjive/pxlngn.net' },
    { ariaLabel: 'E-Mail', icon: 'tabler:mail', href: 'mailto:hi@pxlngn.net' },
  ],
};
