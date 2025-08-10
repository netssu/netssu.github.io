// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  // Carrega variáveis do .env.local e .env.* automaticamente
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/', // raiz, pois é um repo do tipo usuario.github.io
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    // Se quiser acessar no código como __GEMINI_API_KEY__, ela estará disponível
    define: {
      __GEMINI_API_KEY__: JSON.stringify(env.VITE_GEMINI_API_KEY ?? ''),
    },
  }
})
