# Vite Integration

This section provides detailed documentation of the Vue Proximity Prefetch Vite integration, covering the Vite plugin, the Vue component, and the Vue plugin.

## Overview

Vue Proximity Prefetch includes the following elements:

1. **Vue Component** - `ProximityPrefetch`
   - Component to wrap parts of your application that will benefit from proximity prefetching

2. **Vue Plugin** - `ProximityPrefetchPlugin` 
   - Vue plugin that registers the component globally

3. **Vite Plugin** - `viteProximityPrefetch`
   - Vite plugin that automatically injects the functionality

## Importing

You can import the different parts of the library as follows:

```js
// Import everything
import { ProximityPrefetch, ProximityPrefetchPlugin, viteProximityPrefetch } from 'v-proximity-prefetch'

// Import only what you need
import { ProximityPrefetch } from 'v-proximity-prefetch'
import { ProximityPrefetchPlugin } from 'v-proximity-prefetch'
import { viteProximityPrefetch } from 'v-proximity-prefetch'
```

## TypeScript Types

Vue Proximity Prefetch is fully typed and exports the following types:

```ts
interface ProximityPrefetchOptions {
  threshold?: number;
  predictionInterval?: number;
  maxPrefetch?: number;
  automaticPrefetch?: boolean;
  debug?: boolean;
  mobileSupport?: boolean;
  viewportMargin?: number;
  prefetchAllLinks?: boolean;
  prefetchAllLinksDelay?: number;
}

interface ProximityPrefetchProps {
  threshold?: number;
  predictionInterval?: number;
  debug?: boolean;
  mobileSupport?: boolean;
  viewportMargin?: number;
  prefetchAllLinks?: boolean;
  prefetchAllLinksDelay?: number;
}
```

## Global API

In debug mode, Vue Proximity Prefetch exposes certain global methods for debugging:

```js
// Enable debug mode
window.PPF_DEBUG = true

// Access the prefetch handler instance (when available)
window.__PPF_INSTANCE
```

## Cross-Platform Support

Vue Proximity Prefetch automatically detects the user's device type and adapts its prefetching strategy:

- **Desktop devices**: Uses mouse movement tracking and cursor proximity
- **Mobile devices**: Uses viewport-based detection and reacts to scroll and touch events

## Bulk Prefetching

For smaller applications or landing pages, you can enable the prefetchAllLinks option to load all internal navigation links at once:

```js
// In Vite plugin
viteProximityPrefetch({
  prefetchAllLinks: true,
  prefetchAllLinksDelay: 2000 // Wait 2 seconds before prefetching
})

// With Vue component
<ProximityPrefetch :prefetch-all-links="true" :prefetch-all-links-delay="2000">
  <router-view />
</ProximityPrefetch>
```

Check out the following pages for specific details on each part of the API.