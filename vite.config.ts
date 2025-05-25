import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// @ts-expect-error 123
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  // base: '/react-design-patterns/',
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      // @ts-expect-error 123
      '@': path.resolve(__dirname, './src'),
      // @ts-expect-error 123
      '@assets': path.resolve(__dirname, './src/assets'),
      // @ts-expect-error 123
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});

