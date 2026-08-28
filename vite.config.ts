import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
// GitHub Pages는 https://<user>.github.io/Test2/ 하위에 서빙하므로 빌드 시에만 base를 붙인다.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Test2/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
