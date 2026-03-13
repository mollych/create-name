import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { loadEnv } from 'vite'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      uni(),
    ],
    define: {
      'process.env': env
    }
  }
})
