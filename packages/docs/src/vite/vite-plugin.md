# Vite Plugin API

This page details the API of the `viteProximityPrefetch` Vite plugin, including its options and internal workings.

## Importing and Installing the Plugin

```js
// vite.config.js or vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteProximityPrefetch } from 'v-proximity-prefetch'

export default defineConfig({
  plugins: [
    vue(),
    viteProximityPrefetch()
  ]
})
```

## Options

| Name | Type | Default | Description |
|-----|------|--------|-------------|
| `threshold` | `number` | `200` | Distance in pixels at which prefetching triggers |
| `predictionInterval` | `number` | `0` | Interval in ms to check link proximity |
| `maxPrefetch` | `number` | `3` | Maximum number of routes to prefetch simultaneously |
| `automaticPrefetch` | `boolean` | `true` | Enable automatic route prefetching |
| `debug` | `boolean` | `false` | Enable debug logs |

## Using with TypeScript

The plugin is fully typed and you can import its types:

```ts
import { viteProximityPrefetch, type ProximityPrefetchOptions } from 'v-proximity-prefetch'

// Use the type for your options
const pluginOptions: ProximityPrefetchOptions = {
  threshold: 250,
  predictionInterval: 50,
  maxPrefetch: 4,
  automaticPrefetch: true,
  debug: true
}

// Use typed options
export default defineConfig({
  plugins: [
    vue(),
    viteProximityPrefetch(pluginOptions)
  ]
})
```

## Internal Operations

The `viteProximityPrefetch` Vite plugin works differently than the Vue component. Instead of adding a component to your component tree, it directly injects the necessary code into your application.

### Injection Process

1. The plugin analyzes your code to detect Vue Router usage
2. It injects the proximity prefetching code into your production bundle
3. The injected code initializes automatically when the page loads

### Advantages of the Vite Plugin

- **Simplicity**: No need to modify your Vue code
- **Performance**: The code is automatically optimized and tree-shakable
- **Centralized configuration**: All configuration is in the Vite file

## Selective Disabling

If you use the Vite plugin with `automaticPrefetch: true` (default), but want to disable proximity prefetching for specific parts of your application, you can add the `data-no-prefetch` attribute to the relevant elements:

```vue
<template>
  <!-- This navigation won't be affected by proximity prefetching -->
  <nav data-no-prefetch>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  
  <!-- The rest of the application will use proximity prefetching -->
</template>
```

## Performance Considerations

The Vite plugin is designed to have minimal impact on your application's performance. It uses several techniques to optimize prefetching:

- **User interaction detection**: Prefetching only activates when the user interacts with the page
- **Request limiting**: The number of simultaneous prefetches is limited by the `maxPrefetch` option
- **Resource optimization**: Only route components are prefetched, not assets or data

## Conditional Usage Example

```js
// vite.config.js or vite.config.ts
export default defineConfig(({ mode, command }) => {
  const isDev = mode === 'development'
  const isProd = command === 'build'
  
  return {
    plugins: [
      vue(),
      // Only enable the plugin in production
      isProd && viteProximityPrefetch({
        threshold: 250,
        predictionInterval: 50,
        maxPrefetch: 4,
        automaticPrefetch: true,
        debug: false
      })
    ].filter(Boolean) // Filter out false/null/undefined plugins
  }
})