# Integration with Nuxt

::: tip
Vue Proximity Prefetch can be easily integrated into your Nuxt 3 projects to enhance user experience with proximity-based route prefetching.
:::

## Prerequisites

- Nuxt 3.x or higher
- A working Nuxt project

## Installation

As with any Vue project, start by installing the package via your preferred package manager:

```bash
# npm
npm install v-proximity-prefetch

# yarn
yarn add v-proximity-prefetch

# pnpm
pnpm add v-proximity-prefetch
```

## Method 1: Using the Vite Plugin

The simplest method to integrate Vue Proximity Prefetch into Nuxt is by using the Vite plugin, since Nuxt 3 uses Vite as its default bundler.

### Configuration in `nuxt.config.ts`

Add the Vite plugin in your `nuxt.config.ts` file:

```ts
// nuxt.config.ts
import { viteProximityPrefetch } from 'v-proximity-prefetch'

export default defineNuxtConfig({
  vite: {
    plugins: [
      viteProximityPrefetch({
        threshold: 200,
        predictionInterval: 0,
        maxPrefetch: 3,
        automaticPrefetch: true, // Enable automatic prefetching
        debug: process.env.NODE_ENV === 'development'
      })
    ]
  }
})
```

With this configuration, proximity-based prefetching will be automatically enabled for all routes in your Nuxt application. The beauty of this approach is that it requires no additional modifications to your code.

## Method 2: Using the Vue Component

If you prefer more precise control over which parts of your application will benefit from proximity prefetching, you can use the Vue component.

### Creating a Nuxt Plugin

1. Create a plugin file in your Nuxt project:

```ts
// plugins/proximity-prefetch.ts
import { defineNuxtPlugin } from '#app'
import { ProximityPrefetchPlugin } from 'v-proximity-prefetch'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ProximityPrefetchPlugin)
})
```

2. Register this plugin in your `nuxt.config.ts` file:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  plugins: [
    '~/plugins/proximity-prefetch.ts'
  ]
})
```

### Usage in Your Layouts

Now that the component is globally available, you can use it in your Nuxt layouts:

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
    </header>

    <main>
      <!-- Wrap the NuxtPage with ProximityPrefetch -->
      <ProximityPrefetch :threshold="200" :prediction-interval="0">
        <NuxtPage />
      </ProximityPrefetch>
    </main>

    <footer>
      <!-- ... -->
    </footer>
  </div>
</template>
```

This approach allows you to specifically target certain parts of your application for proximity prefetching, rather than applying it globally.

## Optimization for Production

For production environments, it's recommended to disable debug mode and optimize prefetching parameters:

```ts
// nuxt.config.ts
import { viteProximityPrefetch } from 'v-proximity-prefetch'

export default defineNuxtConfig({
  vite: {
    plugins: [
      viteProximityPrefetch({
        threshold: process.env.NODE_ENV === 'development' ? 150 : 250,
        predictionInterval: process.env.NODE_ENV === 'development' ? 0 : 50,
        maxPrefetch: process.env.NODE_ENV === 'development' ? 2 : 4,
        automaticPrefetch: true,
        debug: process.env.NODE_ENV === 'development'
      })
    ]
  }
})
```

This configuration uses more conservative values during development and optimized values for production.

## TypeScript Types

If you use TypeScript in your Nuxt project, you can import Vue Proximity Prefetch types:

```ts
// plugins/proximity-prefetch.ts
import { defineNuxtPlugin } from '#app'
import { ProximityPrefetchPlugin, type ProximityPrefetchOptions } from 'v-proximity-prefetch'

// Typed configuration
const options: ProximityPrefetchOptions = {
  threshold: 250,
  predictionInterval: 50,
  maxPrefetch: 4,
  automaticPrefetch: true,
  debug: process.env.NODE_ENV === 'development'
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ProximityPrefetchPlugin)
})
```

## SSR Considerations

Vue Proximity Prefetch is designed to work in a browser environment and will therefore only activate on the client side. No special configuration is needed for Nuxt's Server-Side Rendering (SSR).

## Complete Example

Here's a complete example of integrating Vue Proximity Prefetch into a Nuxt project:

```ts
// nuxt.config.ts
import { viteProximityPrefetch } from 'v-proximity-prefetch'

export default defineNuxtConfig({
  // Standard Nuxt configuration
  app: {
    head: {
      title: 'My Nuxt application with proximity prefetching',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  
  // Proximity prefetching plugin integration
  vite: {
    plugins: [
      viteProximityPrefetch({
        threshold: 250,
        predictionInterval: 50,
        maxPrefetch: 3,
        automaticPrefetch: true,
        debug: process.env.NODE_ENV === 'development'
      })
    ]
  },
  
  // Other Nuxt configurations
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ]
})
```