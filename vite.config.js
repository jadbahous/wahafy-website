import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The shipped bundle names no tooling. The lazy-import helper fires an event
// whose name carries the build tool's; nothing on the site listens for it, so
// it is renamed to something neutral as the chunks are written.
const neutralNames = {
  name: 'neutral-names',
  renderChunk(code) {
    return code.includes('vite:preloadError') ? code.split('vite:preloadError').join('app:preloadError') : null;
  },
};

export default defineConfig({
  plugins: [react(), neutralNames],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    // The lazy pages carry no CSS of their own, so there is nothing to
    // preload ahead of them; this also keeps the build tool's helper out of
    // the shipped bundle.
    modulePreload: false,
  },
});
