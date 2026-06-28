import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        // Isolate heavy third-party libs into their own long-lived chunks so
        // they are cached independently of app code (e.g. editing Footer.jsx
        // no longer busts the large @supabase chunk). Route-level code-splitting
        // (see src/App.jsx) handles per-page app code.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@supabase')) return 'vendor-supabase'
            if (
              id.includes('framer-motion') ||
              id.includes('motion-dom') ||
              id.includes('motion-utils')
            ) return 'vendor-framer-motion'
            if (id.includes('html-to-image')) return 'vendor-html-to-image'
          }
        },
      },
    },
  },
})
