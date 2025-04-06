# Quasar Framework Integration

Vue Proximity Prefetch can be easily integrated with [Quasar Framework](https://quasar.dev/) v2, which is powered by Vue 3 and Vite.

## Installation

First, install the Vue Proximity Prefetch package:

```bash
# npm
npm install v-proximity-prefetch

# yarn
yarn add v-proximity-prefetch

# pnpm
pnpm add v-proximity-prefetch
```

## Integration Methods

There are two main ways to integrate Vue Proximity Prefetch with Quasar v2:

### Method 1: Using Vite Plugin in Quasar

This method is simpler and doesn't require adding components to your app.

```js
// quasar.config.js
import { configure } from 'quasar/wrappers'
import { viteProximityPrefetch } from 'v-proximity-prefetch'

export default configure(function (/* ctx */) {
  return {
    // ...other Quasar config
    
    vite: {
      plugins: [
        viteProximityPrefetch({
          threshold: 200,
          predictionInterval: 0,
          maxPrefetch: 3,
          automaticPrefetch: true // This enables automatic prefetching!
        })
      ]
    }
  }
})
```

### Method 2: Using the Component with Quasar

This method gives you more control over which parts of your app use proximity prefetching.

#### 1. Register the plugin in your Quasar app:

Create a boot file to register the plugin:

```js
// src/boot/proximity-prefetch.js
import { ProximityPrefetchPlugin } from 'v-proximity-prefetch'

export default ({ app }) => {
  app.use(ProximityPrefetchPlugin)
}
```

#### 2. Add the boot file to your Quasar config:

```js
// quasar.config.js
export default configure(function (/* ctx */) {
  return {
    // ...other config
    boot: [
      // ...other boot files
      'proximity-prefetch'
    ]
  }
})
```

#### 3. Use the component in your layout:

```vue
<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <!-- Your header with navigation links -->
      <q-toolbar>
        <q-btn to="/" flat label="Home" />
        <q-btn to="/about" flat label="About" />
        <q-btn to="/contact" flat label="Contact" />
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <ProximityPrefetch :threshold="200" :prediction-interval="0">
        <router-view />
      </ProximityPrefetch>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { ProximityPrefetch } from 'v-proximity-prefetch'

export default defineComponent({
  name: 'MainLayout',
  components: {
    ProximityPrefetch
  }
})
</script>
```

## Configuration Options

You can customize the behavior of Vue Proximity Prefetch in your Quasar app:

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `threshold` | `number` | `200` | Distance in pixels at which prefetching triggers |
| `predictionInterval` | `number` | `0` | Interval in ms for checking link proximity (0 means checks only happen when the mouse moves) |
| `debug` | `boolean` | `false` | Enable debug logging |

### Vite Plugin Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | `number` | `200` | Distance in pixels at which prefetching triggers |
| `predictionInterval` | `number` | `0` | Interval in ms for checking link proximity (0 means checks only happen when the mouse moves) |
| `maxPrefetch` | `number` | `3` | Maximum number of routes to prefetch at once |
| `debug` | `boolean` | `false` | Enable debug logging |
| `automaticPrefetch` | `boolean` | `false` | Enable automatic prefetching without the Vue component |

## Performance Considerations

When using Vue Proximity Prefetch with Quasar, consider the following:

1. For SPA applications, the Vite Plugin method provides good performance without adding complexity
2. For more control over prefetching logic, the Component method allows you to target specific areas of your app
3. In SSR mode (Quasar SSR), the client-side prefetching will activate after hydration

## Example

Here's a complete example showing how to implement Vue Proximity Prefetch in a Quasar application:

```js
// quasar.config.js
import { configure } from 'quasar/wrappers'
import { viteProximityPrefetch } from 'v-proximity-prefetch'

export default configure(function (/* ctx */) {
  return {
    // Quasar config
    
    boot: [
      'proximity-prefetch'
    ],
    
    vite: {
      plugins: [
        viteProximityPrefetch({
          threshold: 200,
          predictionInterval: 0,
          maxPrefetch: 3,
          automaticPrefetch: true
        })
      ]
    }
  }
})
```

With this configuration, your Quasar app will prefetch routes when users hover near navigation links, significantly improving perceived performance during navigation.