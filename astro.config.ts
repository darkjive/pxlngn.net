import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
// import mdx from '@astrojs/mdx';
// import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
// import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const hasExternalScripts = false;
// const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
//   hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  output: 'static',

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    // mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),
    // ...whenExternalScripts(() =>
    //   partytown({
    //     config: { forward: ['dataLayer.push'] },
    //   })
    // ),
    compress({
      CSS: true,
      HTML: { 'html-minifier-terser': { removeAttributeQuotes: false } },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    astrowind({ config: './src/config.yaml' }),
  ],

  image: {
    domains: ['cdn.pixabay.com', 'img.icons8.com'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
    // Enable AVIF for better compression
    experimentalResponsiveImages: true,
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: { '~': path.resolve(__dirname, './src') },
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (id.includes('animejs')) {
                return 'vendor-anime';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  },
});
