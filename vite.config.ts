import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.BASE_PATH || '/'
  if (!base.startsWith('/') || !base.endsWith('/') || base.includes('..')) {
    throw new Error('BASE_PATH must start and end with /, for example /developer-portfolio/')
  }
  const siteUrl = env.SITE_URL ? new URL(env.SITE_URL) : null
  if (siteUrl && !['https:', 'http:'].includes(siteUrl.protocol)) {
    throw new Error('SITE_URL must use HTTP or HTTPS')
  }
  if (siteUrl && (siteUrl.search || siteUrl.hash)) throw new Error('SITE_URL cannot have a query or hash')
  const canonical = siteUrl ? `${siteUrl.href.replace(/\/$/, '')}/` : ''
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  const seo: Plugin = {
    name: 'portfolio-seo',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => html.replace('<!-- public-url -->', canonical
        ? `<link rel="canonical" href="${escape(canonical)}" /><meta property="og:url" content="${escape(canonical)}" /><meta property="og:image" content="${escape(canonical)}social-card.png" /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta property="og:image:alt" content="Cálamo Andret — Python Backend and AI Integration" />`
        : ''),
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${canonical ? `Sitemap: ${canonical}sitemap.xml\n` : ''}` })
      if (canonical) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(canonical)}</loc></url></urlset>` })
    },
  }
  return {
    base,
    plugins: [react(), tailwindcss(), seo],
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      exclude: [...configDefaults.exclude, '.tools/**', 'artifacts/**'],
      css: false,
    },
  }
})
