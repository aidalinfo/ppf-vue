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
| `mobileSupport` | `boolean` | `true` | Enable mobile support with viewport-based prefetching |
| `viewportMargin` | `number` | `300` | Viewport margin in pixels for mobile prefetching |
| `prefetchAllLinks` | `boolean` | `false` | Enable prefetching of all links on the page at once |
| `prefetchAllLinksDelay` | `number` | `1500` | Delay in ms before prefetching all links |

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
  debug: true,
  mobileSupport: true,
  viewportMargin: 400,
  prefetchAllLinks: false,
  prefetchAllLinksDelay: 2000
}
```

## Internal Operations

The `ProximityPrefetch` component uses the following hooks to manage prefetching:

### Lifecycle

1. **Mounting**: Detects device type and adds appropriate event listeners (mouse movements for desktop, scroll and touch for mobile)
2. **Updating**: Updates prefetching parameters based on props
3. **Unmounting**: Removes event listeners and cleans up resources

### Device Detection

The component automatically detects if the user is on a touch device and adapts its prefetching strategy:

1. **Desktop Devices**: Uses mouse movement tracking and cursor proximity
2. **Touch Devices**: Uses viewport-based detection and reacts to scroll and touch events

### Prefetching Algorithm

For desktop devices:
1. On mouse movement, calculates distance between cursor and all visible navigation links
2. If a link is at a distance less than or equal to `threshold`, prefetches the corresponding route

For mobile devices:
1. Detects links that are in the viewport or nearby (based on `viewportMargin` value)
2. Prefetches routes for these links, prioritizing those closer to the top of the page

For prefetching all links:
1. If `prefetchAllLinks` is enabled, waits `prefetchAllLinksDelay` ms after page load
2. Collects all unique internal links on the page
3. Prefetches these links in batches to avoid overwhelming the network

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
      :mobile-support="true"
      :viewport-margin="500"
      :prefetch-all-links="false"
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