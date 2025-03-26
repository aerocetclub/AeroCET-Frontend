import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Allows network access
    port: 3000, // You can specify any available port
    proxy: {
      '/api': {
        target: 'http://14.139.171.170:3001', // Your backend URL
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Adjust path if needed
      },
    },
  },
  plugins: [react()],
  define: {
    'process.env': process.env, // Ensures environment variables are available
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Useful for debugging
  },
  resolve: {
    alias: {
      '@': '/src', // Allows importing with `@/` instead of relative paths
    },
  },
});
