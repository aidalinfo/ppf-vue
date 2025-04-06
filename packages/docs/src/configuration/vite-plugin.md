# Vite Plugin Options

The `viteProximityPrefetch` Vite plugin offers a simpler method for integrating proximity prefetching functionality without having to modify your Vue code. This page details all available options to configure the plugin.

## Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | `number` | `200` | Distance in pixels at which prefetching triggers |
| `predictionInterval` | `number` | `0` | Interval in ms to check link proximity |
| `maxPrefetch` | `number` | `3` | Maximum number of routes to prefetch simultaneously |
| `automaticPrefetch` | `boolean` | `true` | Enable automatic route prefetching |
| `debug` | `boolean` | `false` | Enable debug logs |
| `mobileSupport` | `boolean` | `true` | Enable mobile support with viewport-based prefetching |
| `viewportMargin` | `number` | `300` | Viewport margin in pixels for mobile prefetching |
| `prefetchAllLinks` | `boolean` | `false` | Enable prefetching of all links on the page at once |
| `prefetchAllLinksDelay` | `number` | `1500` | Delay in ms before prefetching all links |

## Option Details

### threshold

The `threshold` option defines the distance in pixels at which prefetching will trigger when the user's cursor approaches a navigation link.

```js
viteProximityPrefetch({
  threshold: 300
})
```

### predictionInterval

The `predictionInterval` option defines the interval in milliseconds between link proximity checks. A value of `0` (default) means the check only happens when the mouse moves (reactive to mouse movement events).

```js
viteProximityPrefetch({
  predictionInterval: 100
})
```

### maxPrefetch

The `maxPrefetch` option limits the maximum number of routes that can be prefetched simultaneously. This can help control bandwidth usage and prevent overload.

```js
viteProximityPrefetch({
  maxPrefetch: 5
})
```

### automaticPrefetch

The `automaticPrefetch` option enables or disables automatic route prefetching. If disabled, you'll need to manually use the `ProximityPrefetch` component in your application.

```js
viteProximityPrefetch({
  automaticPrefetch: false
})
```

### debug

The `debug` option enables or disables debug logs in the console. Useful during development to understand when and how prefetches are triggered.

```js
viteProximityPrefetch({
  debug: true
})
```

### mobileSupport

The `mobileSupport` option enables or disables special handling for touch devices. When enabled, the plugin will switch to viewport-based prefetching and respond to touch and scroll events.

```js
viteProximityPrefetch({
  mobileSupport: true
})
```

### viewportMargin

The `viewportMargin` option defines how far outside the visible viewport (in pixels) links should be detected for prefetching on mobile devices. A larger value will prefetch links earlier as the user scrolls.

```js
viteProximityPrefetch({
  viewportMargin: 500
})
```

### prefetchAllLinks

The `prefetchAllLinks` option enables prefetching of all internal links on the page at once. This is useful for small applications where you want to ensure all possible navigation targets are loaded ahead of time.

```js
viteProximityPrefetch({
  prefetchAllLinks: true
})
```

### prefetchAllLinksDelay

The `prefetchAllLinksDelay` option defines the delay in milliseconds before starting to prefetch all links (when `prefetchAllLinks` is enabled). This delay prevents overwhelming the network immediately after page load.

```js
viteProximityPrefetch({
  prefetchAllLinks: true,
  prefetchAllLinksDelay: 2000
})
```

## Complete Example

Here's a complete example of using the Vite plugin with all options configured:

```js
// vite.config.js or vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteProximityPrefetch } from 'v-proximity-prefetch'

export default defineConfig({
  plugins: [
    vue(),
    viteProximityPrefetch({
      threshold: 250,
      predictionInterval: 50,
      maxPrefetch: 4,
      automaticPrefetch: true,
      debug: process.env.NODE_ENV === 'development',
      mobileSupport: true,
      viewportMargin: 400,
      prefetchAllLinks: false,
      prefetchAllLinksDelay: 1500
    })
  ]
})
```

## Production vs. Development Environment

For performance reasons, you might want to adjust the settings based on the environment:

```js
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  
  return {
    plugins: [
      vue(),
      viteProximityPrefetch({
        threshold: isDev ? 150 : 250,
        predictionInterval: isDev ? 0 : 50,
        maxPrefetch: isDev ? 2 : 4,
        automaticPrefetch: true,
        debug: isDev,
        mobileSupport: true,
        viewportMargin: isDev ? 200 : 400,
        prefetchAllLinks: !isDev, // Only prefetch all in production
        prefetchAllLinksDelay: 2000
      })
    ]
  }
})
```

This configuration will use more conservative values in development (lower threshold, no prediction interval, fewer prefetches) to make debugging easier, and more optimized values in production for better performance.