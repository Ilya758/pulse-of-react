import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    target: 'esnext',

    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          router: ['react-router-dom'],
          'mantine-core': ['@mantine/core'],
          'mantine-hooks': ['@mantine/hooks'],
          'mantine-components': ['@mantine/notifications', '@mantine/code-highlight'],
          icons: ['@tabler/icons-react'],
          'framer-motion-core': ['framer-motion'],
          highlight: ['highlight.js'],
          'mantine-styles': ['@mantine/core/styles.css', '@mantine/code-highlight/styles.css'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
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
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],

  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
    },
  },

  optimizeDeps: {
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
    exclude: [],
    force: true,
  },
});

