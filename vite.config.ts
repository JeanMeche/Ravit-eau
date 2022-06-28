import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'Ravit-eau',
  plugins: [
    react(),
    pluginRewriteAll(), // Because of https://github.com/vitejs/vite/issues/2190
  ],
});
