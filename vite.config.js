import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      
      manifest: {
        name: 'Gestor de Tareas Personal',
        short_name: 'TaskPWA',
        description: 'Gestiona tu tiempo y tareas eficientemente',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', 

        start_url: '/',
        scope: '/',

        icons: [
          {
            src: 'pwa-192x192.png', 
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        navigateFallback: '/index.html'
      }

    })
  ]
})