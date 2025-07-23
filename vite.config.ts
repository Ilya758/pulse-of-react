import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// @ts-expect-error - __dirname is not defined
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(() => ({
  base: '/',
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
      // @ts-expect-error - __dirname is not defined
      '@': path.resolve(__dirname, './src'),
      // @ts-expect-error - __dirname is not defined
      '@assets': path.resolve(__dirname, './src/assets'),
      // @ts-expect-error - __dirname is not defined
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
}));

