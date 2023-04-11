import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
const mode = process.env.APP_ENV

export default defineConfig(({ command, mode, ssrBuild }) => ({
    server: {
        host: command === "serve" ? '127.0.0.1' : ""
    },
    assetsInclude: ['**/*.htm'],
    base: mode === "production" ? "/apsc103/" : "",

    build: {
        rollupOptions: {
          input: {
            app: fileURLToPath(new URL('./index.html', import.meta.url)),
            appDashboard: fileURLToPath(new URL('./dashboard.html', import.meta.url)),
            appGraphs: fileURLToPath(new URL('./graphs.html', import.meta.url)),
            appMetrics: fileURLToPath(new URL('./metrics.html', import.meta.url)),
            appSettings: fileURLToPath(new URL('./settings.html', import.meta.url)),
          },
        },
    },

    preview: {
        https: false
    }
  }))