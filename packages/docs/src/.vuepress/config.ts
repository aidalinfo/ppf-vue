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
          debug: false,
          mobileSupport: true,
          prefetchAllLinks: false
        })
      ]
    }
  }),
  base: '/v-proximity-prefetch/', 
  lang: 'en-US',
  title: 'Vue Proximity Prefetch',
  description: 'Boost your Vue app\'s perceived performance by prefetching routes when the mouse approaches links',
  
  theme: defaultTheme({
    logo: '/logo.png',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'GitHub', link: 'https://github.com/aidalinfo/ppf-vue' }
    ],
    
    // Configuration complète de la sidebar pour tous les chemins
    sidebar: [
      {
        text: 'Introduction',
        collapsible: false,
        children: [
          '/documentation/README.md',
          '/documentation/installation.md',
          '/documentation/getting-started.md',
        ],
      },
      {
        text: 'Configuration',
        collapsible: false,
        children: [
          '/configuration/README.md',
          '/configuration/component-props.md',
          '/configuration/vite-plugin.md',
        ],
      },
      {
        text: 'Integrations',
        collapsible: false,
        children: [
          '/integrations/README.md',
          '/integrations/nuxt.md',
          '/integrations/quasar.md',
        ],
      },
      {
        text: 'Vite Integration',
        collapsible: false,
        children: [
          '/vite/README.md',
          '/vite/component.md',
          '/vite/vite-plugin.md',
        ],
      }
    ],
    
    sidebarDepth: 2,
  }),
})