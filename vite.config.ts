import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',

    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          'framer-motion-core': ['framer-motion'],
          highlight: ['highlight.js'],
          icons: ['@tabler/icons-react'],
          'mantine-components': ['@mantine/notifications', '@mantine/code-highlight'],
          'mantine-core': ['@mantine/core'],
          'mantine-hooks': ['@mantine/hooks'],
          'mantine-styles': ['@mantine/core/styles.css', '@mantine/code-highlight/styles.css'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    target: 'esnext',
  },

  optimizeDeps: {
    exclude: [],
    force: true,
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/notifications',
      '@mantine/code-highlight',
      '@tabler/icons-react',
      'framer-motion',
      'highlight.js',
    ],
  },

  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      },
    }),
    visualizer({
      brotliSize: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      open: true,
    }),
  ],

  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
    },
  },
});
