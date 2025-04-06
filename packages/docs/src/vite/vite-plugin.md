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
| `mobileSupport` | `boolean` | `true` | Enable mobile support with viewport-based prefetching |
| `viewportMargin` | `number` | `300` | Viewport margin in pixels for mobile prefetching |
| `prefetchAllLinks` | `boolean` | `false` | Enable prefetching of all links on the page at once |
| `prefetchAllLinksDelay` | `number` | `1500` | Delay in ms before prefetching all links |

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
  debug: true,
  mobileSupport: true,
  viewportMargin: 400,
  prefetchAllLinks: false,
  prefetchAllLinksDelay: 2000
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

### Mobile Device Support

The plugin automatically detects if the user is on a mobile device and adapts its prefetching strategy:

1. **Desktop Devices**: Uses mouse movement tracking and cursor proximity
2. **Mobile Devices**: Uses viewport-based detection and reacts to scroll and touch events

You can configure this behavior with the following options:

```js
viteProximityPrefetch({
  mobileSupport: true,       // Enable mobile support (default)
  viewportMargin: 500        // Prefetch links within 500px of the visible viewport
})
```

### Prefetching All Links

For smaller applications or important landing pages, you can enable the prefetching of all internal links at once:

```js
viteProximityPrefetch({
  prefetchAllLinks: true,        // Enable prefetching all links
  prefetchAllLinksDelay: 2000    // Wait 2 seconds after page load
})
```

This feature will:

1. Wait for the specified delay after page load
2. Collect all unique internal links on the page
3. Prefetch them in batches to avoid overwhelming the network

### Advantages of the Vite Plugin

- **Simplicity**: No need to modify your Vue code
- **Performance**: The code is automatically optimized and tree-shakable
- **Centralized configuration**: All configuration is in the Vite file
- **Cross-platform support**: Works on both desktop and mobile devices

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
- **Batch processing**: For prefetching all links, requests are processed in batches
- **Device adaptation**: Different strategy based on whether the user is on mobile or desktop

## Conditional Usage Example

```js
// vite.config.js or vite.config.ts
export default defineConfig(({ mode, command }) => {
  const isDev = mode === 'development'
  const isProd = command === 'build'
  
  return {
    plugins: [
      vue(),
      // Only enable the plugin in production with adapted configuration
      isProd && viteProximityPrefetch({
        threshold: 250,
        predictionInterval: 50,
        maxPrefetch: 4,
        automaticPrefetch: true,
        debug: false,
        mobileSupport: true,
        viewportMargin: 400,
        prefetchAllLinks: true,         // Prefetch all links in production
        prefetchAllLinksDelay: 2000     // After 2 seconds
      })
    ].filter(Boolean) // Filter out false/null/undefined plugins
  }
})