import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/NanoLingo/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NanoLingo — Apprendre le japonais',
        short_name: 'NanoLingo',
        description: 'Apprendre à lire et écrire les kana et kanji, hors-ligne.',
        lang: 'fr',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#131f24',
        background_color: '#131f24',
        icons: [
          { src: 'icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Précache tout, y compris les ~300 JSON de traits (~1,5 Mo) :
        // l'app est 100 % utilisable hors-ligne dès l'installation.
        globPatterns: ['**/*.{js,css,html,png,svg,woff2,json}'],
        navigateFallback: '/NanoLingo/index.html',
      },
    }),
  ],
});
