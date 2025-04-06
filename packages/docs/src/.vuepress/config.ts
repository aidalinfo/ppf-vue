import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { viteProximityPrefetch } from 'v-proximity-prefetch'

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      plugins: [
        viteProximityPrefetch({
          threshold: 250,
          predictionInterval: 0,
          maxPrefetch: 3,
          automaticPrefetch: true,
          debug: false
        })
      ]
    }
  }),
  base: '/v-proximity-prefetch/', // Ajout du chemin de base pour GitHub Pages
  lang: 'en-US',
  title: 'Vue Proximity Prefetch',
  description: 'Boost your Vue app\'s perceived performance by prefetching routes when the mouse approaches links',
  
  theme: defaultTheme({
    logo: '/logo.png',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Configuration', link: '/configuration/' },
      { text: 'Integrations', link: '/integrations/' },
      { text: 'Vite', link: '/vite/' },
      { text: 'GitHub', link: 'https://github.com/aidalinfo/ppf-vue' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: [
            '/guide/README.md',
            '/guide/getting-started.md',
            '/guide/installation.md',
          ],
        }
      ],
      '/configuration/': [
        {
          text: 'Configuration',
          children: [
            '/configuration/README.md',
            '/configuration/component-props.md',
            '/configuration/vite-plugin.md',
          ],
        }
      ],
      '/integrations/': [
        {
          text: 'Integrations',
          children: [
            '/integrations/README.md',
            '/integrations/nuxt.md',
          ],
        }
      ],
      '/vite/': [
        {
          text: 'Vite Integration',
          children: [
            '/vite/README.md',
            '/vite/component.md',
            '/vite/vite-plugin.md',
          ],
        }
      ],
    },
  }),
})