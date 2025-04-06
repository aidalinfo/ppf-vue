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
      debug: process.env.NODE_ENV === 'development'
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
        debug: isDev
      })
    ]
  }
})
```

This configuration will use more conservative values in development (lower threshold, no prediction interval, fewer prefetches) to make debugging easier, and more optimized values in production for better performance.