// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import smartypants from 'remark-smartypants';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.userhat.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    remarkPlugins: [smartypants],
  },
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
});
