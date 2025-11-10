import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'components': [
            './src/components/Boutique.jsx',
            './src/components/Collection.jsx',
            './src/components/Display.jsx',
            './src/components/FAQ.jsx',
            './src/components/FeaturedArtifacts.jsx',
            './src/components/LandingPage.jsx',
            './src/components/LifeAtMuseum.jsx',
            './src/components/Palace.jsx',
            './src/components/ThreeDGallery.jsx',
            './src/components/Ticketing.jsx'
          ]
        }
      }
    }
  }
})
