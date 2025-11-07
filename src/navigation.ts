// import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    // {
    //   text: 'Intro',
    //   href: getPermalink(),
    //   icon: '',
    //   links: [],
    // },
    // {
    //   text: 'Profil',
    //   href: getPermalink('/profile'),
    //   icon: '',
    //   links: [],
    // },
    //{
    //text: 'Gallerie',
    // href: getPermalink('/gallery'),
    //  icon: '',
    //  links: [],
    //  },
    // {
    //   text: 'Blog',
    //   href: getBlogPermalink(),
    //   icon: '',
    //   links: [],
    // },
  ],
  actions: [{ href: 'https://github.com/darkjive/pxlngn.net' }, { href: 'mailto:hi@pxlngn.net' }],
};
export const footerData = {
  links: [
    // {
    //   title: 'Intro',
    //   href: getPermalink(),
    //   icon: '',
    //   links: [],
    // },
    // {
    //   title: 'Profil',
    //   href: getPermalink('/profile'),
    //   icon: '',
    //   links: [],
    // },

    //   {
    //    title: 'Gallery',
    //   href: getPermalink('/gallery'),
    //   icon: '',
    //    links: [],
    //   },
    // {
    //   title: 'Blog',
    //   href: getBlogPermalink(),
    //   icon: '',
    //   links: [],
    // },
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
