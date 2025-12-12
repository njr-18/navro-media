import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 🚨 THE FIX: Force Vite to handle specific file types correctly 🚨
  build: {
    assetsInlineLimit: 0, // Prevent assets (like fonts, small images) from being converted to base64 which can cause issues
  },
  css: {
    postcss: {
      // Ensure PostCSS loads correctly, this often solves module load conflicts
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
});