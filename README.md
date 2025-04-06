# Vue Proximity Prefetch

[![npm version](https://img.shields.io/npm/v/@aidalinfo/vue-proximity-prefetch.svg?style=flat-square)](https://www.npmjs.com/package/@aidalinfo/vue-proximity-prefetch)
[![GitHub license](https://img.shields.io/github/license/aidalinfo/ppf-vue?style=flat-square)](https://github.com/aidalinfo/ppf-vue/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@aidalinfo/vue-proximity-prefetch.svg?style=flat-square)](https://www.npmjs.com/package/@aidalinfo/vue-proximity-prefetch)
[![GitHub stars](https://img.shields.io/github/stars/aidalinfo/ppf-vue.svg?style=flat-square&label=★)](https://github.com/aidalinfo/ppf-vue)

<div align="center">
  <img src="https://raw.githubusercontent.com/aidalinfo/ppf-vue/main/packages/app-example/public/ppf-vue-logo.png" alt="Vue Proximity Prefetch Logo" width="180">

  <p><strong>Boost your Vue app's perceived performance by prefetching routes when the mouse approaches links</strong></p>
</div>

## Features

- 🔍 **Smart Detection**: Detects when the user's mouse approaches navigation links
- ⚡ **Automatic Prefetching**: Preloads route components before the user clicks
- 📈 **Enhanced UX**: Reduces perceived loading times for smoother navigation
- 🔌 **Simple Integration**: Two easy ways to integrate - Vue component or Vite plugin
- 🔧 **Highly Configurable**: Customize threshold distance, prediction intervals, and more
- 🪶 **Lightweight**: Minimal overhead with intelligent throttling

## Installation

```bash
# npm
npm install @aidalinfo/vue-proximity-prefetch

# yarn
yarn add @aidalinfo/vue-proximity-prefetch

# pnpm
pnpm add @aidalinfo/vue-proximity-prefetch
```

## Getting Started

There are two ways to use Vue Proximity Prefetch:

### Method 1: Using the Vue Component and Plugin

This method gives you fine-grained control over which parts of your app use proximity prefetching.

#### 1. Register the Plugin in your Vue app:

```js
// main.ts or main.js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { ProximityPrefetchPlugin } from '@aidalinfo/vue-proximity-prefetch'

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

#### 2. Use the Component in your template:

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
import { ProximityPrefetch } from '@aidalinfo/vue-proximity-prefetch'
</script>
```

### Method 2: Using the Vite Plugin Only

This method is simpler and doesn't require adding components to your app. Perfect for quick implementation.

```js
// vite.config.js or vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteProximityPrefetch } from '@aidalinfo/vue-proximity-prefetch'

export default defineConfig({
  plugins: [
    vue(),
    viteProximityPrefetch({
      threshold: 200,
      predictionInterval: 0,
      maxPrefetch: 3,
      automaticPrefetch: true // This enables automatic prefetching!
    })
  ]
})
```

## Configuration Options

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `threshold` | `number` | `200` | Distance in pixels at which prefetching triggers |
| `predictionInterval` | `number` | `0` | Interval in ms for checking link proximity (0 means reactive to mouse movements) |
| `debug` | `boolean` | `false` | Enable debug logging |

### Vite Plugin Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | `number` | `200` | Distance in pixels at which prefetching triggers |
| `predictionInterval` | `number` | `0` | Interval in ms for checking link proximity |
| `maxPrefetch` | `number` | `3` | Maximum number of routes to prefetch at once |
| `debug` | `boolean` | `false` | Enable debug logging |
| `automaticPrefetch` | `boolean` | `false` | Enable automatic prefetching without the Vue component |

### Debug Mode

You can enable debug mode by setting the `PPF_DEBUG` environment variable:

```bash
PPF_DEBUG=true npm run build
```

Or in the browser console:

```js
window.PPF_DEBUG = true
```

## When to Use Each Method

- **Component Method**: More control, prefetches both Vue Router components and routes
- **Vite Plugin Method**: Simpler implementation, uses browser's standard prefetching

## Demo

Check out the [live demo](https://vue-proximity-prefetch-demo.netlify.app/) to see the performance difference!

## Browser Support

Vue Proximity Prefetch works in all modern browsers that support `<link rel="prefetch">`.

## Contributing

Contributions are welcome! Please see our [Contributing Guide](https://github.com/aidalinfo/ppf-vue/blob/main/packages/vue-proximity-prefetch/CONTRIBUTING.md) for details.

## License

[MIT](https://github.com/aidalinfo/ppf-vue/blob/main/LICENSE)

---

If you find this plugin useful, please ⭐ the [GitHub repository](https://github.com/aidalinfo/ppf-vue) and share it with other Vue developers!