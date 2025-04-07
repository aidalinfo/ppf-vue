# Getting Started

After [installing Vue Proximity Prefetch](/v-proximity-prefetch/documentation/installation), you can integrate it into your Vue application in two different ways. Choose the one that best suits your needs.

## Method 1: Using the Vue Component and Plugin

This method gives you precise control over which parts of your application use proximity prefetching.

### 1. Register the plugin in your Vue application:

```js
// main.ts or main.js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { ProximityPrefetchPlugin } from 'v-proximity-prefetch'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // your routes...
  ]
})

app.use(router)
app.use(ProximityPrefetchPlugin) // register the plugin

app.mount('#app')
```

### 2. Use the component in your template:

```vue
<!-- App.vue or any layout component -->
<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
  </header>

  <main>
    <!-- Wrap your router-view with ProximityPrefetch -->
    <ProximityPrefetch 
      :threshold="200" 
      :prediction-interval="0"
      :mobile-support="true"
      :viewport-margin="300">
      <router-view />
    </ProximityPrefetch>
  </main>
</template>

<script setup>
import { ProximityPrefetch } from 'v-proximity-prefetch'
</script>
```

## Method 2: Using Only the Vite Plugin

This method is simpler and doesn't require adding components to your application. Perfect for quick implementation.

```js
// vite.config.js or vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteProximityPrefetch } from 'v-proximity-prefetch'

export default defineConfig({
  plugins: [
    vue(),
    viteProximityPrefetch({
      threshold: 200,
      predictionInterval: 0,
      maxPrefetch: 3,
      automaticPrefetch: true, // Enable automatic prefetching!
      mobileSupport: true,     // Enable mobile device support
      viewportMargin: 300      // Links within 300px of viewport will be prefetched on mobile
    })
  ]
})
```

## Mobile Device Support

Vue Proximity Prefetch automatically detects mobile devices and adapts its prefetching strategy. On mobile devices, the plugin switches from tracking mouse movements to detecting which links are within or near the viewport:

```js
viteProximityPrefetch({
  automaticPrefetch: true,
  mobileSupport: true,       // Enable mobile support (default is true)
  viewportMargin: 500        // Prefetch links within 500px of the visible viewport
})
```

With the Vue component:

```vue
<ProximityPrefetch 
  :mobile-support="true"
  :viewport-margin="500">
  <router-view />
</ProximityPrefetch>
```

## Prefetching All Links

For smaller applications or important landing pages, you might want to prefetch all internal links at once:

```js
viteProximityPrefetch({
  automaticPrefetch: true,
  prefetchAllLinks: true,         // Enable prefetching all links
  prefetchAllLinksDelay: 2000     // Wait 2 seconds after page load before prefetching
})
```

With the Vue component:

```vue
<ProximityPrefetch 
  :prefetch-all-links="true"
  :prefetch-all-links-delay="2000">
  <router-view />
</ProximityPrefetch>
```

## Configuring Options

Vue Proximity Prefetch offers several configuration options to adapt it to your needs. See the [Configuration](/v-proximity-prefetch/configuration/) section for more details on the different options available.

## Debug Mode

You can enable debug mode to see prefetching logs in the console:

```bash
# Via environment variable
PPF_DEBUG=true npm run build
```

Or in the browser console:

```js
window.PPF_DEBUG = true
```

## Github

Explore the [source code on GitHub](https://github.com/aidalinfo/v-proximity-prefetch).