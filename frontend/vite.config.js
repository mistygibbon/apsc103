import { defineConfig } from 'vite'

export default defineConfig(({ command, mode, ssrBuild }) => {
    if (command === 'serve') {
      return {
        // dev specific config
        server: {
            host: '127.0.0.1'
          }
      }
    } else {
      // command === 'build'
      return {
        // build specific config
        server: {
            base: "/apsc103/"
        }
      }
    }
  })