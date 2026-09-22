// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// 站台網域只在這裡定義一次，頁面裡用 Astro.site 取用，不要再寫死。
export default defineConfig({
  site: 'https://www.myllm.tw',
  output: 'static',
  // 搭配 wrangler.jsonc 的 html_handling: "none"：頁面網址一律帶尾斜線（/about/），
  // 這樣舊的 .html 網址才能原樣保留而不被重導向。
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
