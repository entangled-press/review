import { defineConfig } from 'astro/config';

// GitHub Pages (project site) 用の設定。独自ドメインに移行する際は site を差し替え base を外す
export default defineConfig({
  site: 'https://entangled-press.github.io',
  base: '/review',
});
