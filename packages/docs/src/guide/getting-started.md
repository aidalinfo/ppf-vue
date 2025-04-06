# Getting Started

After [installing Vue Proximity Prefetch](/guide/installation), you can integrate it into your Vue application in two different ways. Choose the one that best suits your needs.

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
    <ProximityPrefetch :threshold="200" :prediction-interval="0">
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
      automaticPrefetch: true // Enable automatic prefetching!
    })
  ]
})
```

## Configuring Options

Vue Proximity Prefetch offers several configuration options to adapt it to your needs. See the [Configuration](/configuration/) section for more details on the different options available.

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

## Complete Example

For a complete integration example, you can check out the [example application](https://vue-proximity-prefetch-demo.netlify.app/) or explore the [source code on GitHub](https://github.com/aidalinfo/ppf-vue).