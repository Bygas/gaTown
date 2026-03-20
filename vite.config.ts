import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'

const webdavProxy = (): Plugin => ({
  name: 'webdav-proxy',
  apply: 'serve',

  configureServer(server) {
    server.middlewares.use('/__webdav', async (req, res) => {
      const targetUrl = req.headers['x-webdav-url'] as string | undefined

      if (!targetUrl) {
        res.statusCode = 400
        res.end('x-webdav-url başlığı eksik')
        return
      }

      try {
        const url = new URL(targetUrl)

        const mod =
          url.protocol === 'https:'
            ? await import('node:https')
            : await import('node:http')

        const fwdHeaders: Record<string, string> = {}

        for (const [key, value] of Object.entries(req.headers)) {
          if (['x-webdav-url', 'host', 'origin', 'referer', 'connection'].includes(key)) continue
          if (typeof value === 'string') fwdHeaders[key] = value
        }

        fwdHeaders.host = url.host

        const proxyReq = mod.request(
          url,
          { method: req.method, headers: fwdHeaders },
          (proxyRes) => {
            const respHeaders = { ...proxyRes.headers }
            delete respHeaders['www-authenticate']

            res.writeHead(proxyRes.statusCode || 502, respHeaders)
            proxyRes.pipe(res)
          }
        )

        proxyReq.on('error', () => {
          res.statusCode = 502
          res.end('Proxy hatası')
        })

        req.pipe(proxyReq)
      } catch {
        res.statusCode = 500
        res.end('Sunucu içi proxy hatası')
      }
    })
  }
})

export default defineConfig({
  base: './',

  build: {
    outDir: 'docs'
  },

  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none'
  },

  plugins: [
    vue({
      template: {
        compilerOptions: {
          comments: false
        }
      }
    }),

    legacy({
      targets: ['Chrome >= 51', 'Android >= 7'],
      modernPolyfills: true
    }),

    webdavProxy()
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
