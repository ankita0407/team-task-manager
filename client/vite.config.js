import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['team-task-manager-production-5630.up.railway.app']
  },
  server: {
    allowedHosts: ['team-task-manager-production-5630.up.railway.app']
  }
});