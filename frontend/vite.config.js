import { defineConfig } from 'vite'
const mode = process.env.APP_ENV

export default defineConfig(({ command, mode, ssrBuild }) => ({
    server: {
        host: command === "serve" ? '127.0.0.1' : ""
    },

    base: mode === "production" ? "/apsc103/" : "",
    
    preview: {
        https: false
    }
  }))