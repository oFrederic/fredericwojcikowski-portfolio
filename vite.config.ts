import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      brotliSize: true,
      gzipSize: true
    })
    // Image optimization is done manually - see scripts/optimize-images.cjs
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehaviour: 'local'
    },
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          vendor: ['react', 'react-dom'],
          // Component chunks for better caching
          components: [
            './src/components/Hero/Hero.tsx',
            './src/components/Projects/Projects.tsx',
            './src/components/About/About.tsx',
            './src/components/Contact/Contact.tsx'
          ]
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable gzip compression analysis
    reportCompressedSize: true
  },
  server: {
    hmr: true
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: []
  }
})
