import { defineConfig } from 'vite'
import vituum from 'vituum'
import pug from '@vituum/vite-plugin-pug'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pageFilePattern = /\/src\/pages\/.*\.(pug|html)$/

const pagesHotReloadPlugin = () => ({
  name: 'pages-hot-reload',
  apply: 'serve',
  configureServer(server) {
    const triggerReload = (file) => {
      const normalizedFile = file.split(path.sep).join('/')

      if (pageFilePattern.test(normalizedFile)) {
        server.ws.send({ type: 'full-reload' })
      }
    }

    server.watcher.on('add', triggerReload)
    server.watcher.on('unlink', triggerReload)
  }
})

export default defineConfig(({ mode }) => ({
  plugins:
    mode === 'test'
      ? []
      : [
          pagesHotReloadPlugin(),
          vituum(),
          pug({
            root: './src'
          })
        ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['tests/setup.js'],
    include: ['tests/**/*.test.js']
  },
  build: {
    rollupOptions: {
      plugins: [visualizer({ filename: 'stats.html', open: true })]
    }
  }
}))
