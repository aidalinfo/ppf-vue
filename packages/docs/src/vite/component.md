# Component API

This page details the API of the `ProximityPrefetch` component, including its props, events, and slots.

## Basic Usage

```vue
<template>
  <ProximityPrefetch>
    <router-view />
  </ProximityPrefetch>
</template>

<script setup>
import { ProximityPrefetch } from 'v-proximity-prefetch'
</script>
```

## Props

| Name | Type | Default | Description |
|-----|------|--------|-------------|
| `threshold` | `number` | `200` | Distance in pixels at which prefetching triggers |
| `predictionInterval` | `number` | `0` | Interval in ms to check link proximity (0 = reactive) |
| `debug` | `boolean` | `false` | Enable debug logs |

## Slots

| Name | Description |
|-----|-------------|
| `default` | Content to wrap with proximity prefetching functionality |

## Events

The component doesn't emit events directly, but exposes debug logs when the `debug` option is enabled.

## Using with TypeScript

The component is fully typed and you can import its types:

```ts
import { ProximityPrefetch, type ProximityPrefetchProps } from 'v-proximity-prefetch'

// Use the type for your props
const prefetchProps: ProximityPrefetchProps = {
  threshold: 250,
  predictionInterval: 50,
  debug: true
}
```

## Internal Operations

The `ProximityPrefetch` component uses the following hooks to manage prefetching:

### Lifecycle

1. **Mounting**: Adds mouse movement event listeners
2. **Updating**: Updates prefetching parameters based on props
3. **Unmounting**: Removes event listeners and cleans up resources

### Prefetching Algorithm

1. On mouse movement, calculates distance between cursor and all visible navigation links
2. If a link is at a distance less than or equal to `threshold`, prefetches the corresponding route
3. Limits the number of simultaneous prefetches to avoid overload

## Advanced Example

```vue
<template>
  <header>
    <!-- This navigation won't be affected by proximity prefetching -->
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>

  <main>
    <!-- Only the main content benefits from proximity prefetching -->
    <ProximityPrefetch 
      :threshold="250" 
      :prediction-interval="50"
      :debug="process.env.NODE_ENV === 'development'"
    >
      <router-view />
      
      <!-- Links here will also benefit from prefetching -->
      <nav class="footer-nav">
        <router-link to="/contact">Contact</router-link>
        <router-link to="/legal">Legal</router-link>
      </nav>
    </ProximityPrefetch>
  </main>
</template>
```