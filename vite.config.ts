import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative paths allow this app to work at a GitHub Pages repository URL.
  base: './',
  plugins: [react()],
});
