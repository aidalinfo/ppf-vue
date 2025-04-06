/**
 * Vue Proximity Prefetch
 * A Vue plugin that prefetches routes when the mouse approaches links
 * for faster navigation and improved user experience.
 */

import type { Plugin } from 'vue';
import type { App } from '@vue/runtime-core';
import ProximityPrefetch from './ProximityPrefetch.vue';

// Export the Vue component for direct usage
export { ProximityPrefetch };

// Re-export the Vite plugin
export * from './vite-plugin';

/**
 * Component props interface
 */
export interface ProximityPrefetchProps {
  /** Distance threshold in pixels to trigger prefetching */
  threshold?: number;
  /** Interval for periodic checks in milliseconds (0 means reactive to mouse movements) */
  predictionInterval?: number;
  /** Enable debug logging */
  debug?: boolean;
  /** Enable mobile support with viewport-based prefetching */
  mobileSupport?: boolean;
  /** Viewport margin for mobile prefetching */
  viewportMargin?: number;
  /** Enable prefetching of all links on the page at once */
  prefetchAllLinks?: boolean;
  /** Delay before starting to prefetch all links (ms) */
  prefetchAllLinksDelay?: number;
}

/**
 * Plugin configuration options
 */
export interface ProximityPrefetchOptions {
  /** Distance threshold in pixels to trigger prefetching */
  threshold?: number;
  /** Interval for periodic checks in milliseconds */
  predictionInterval?: number;
  /** Maximum number of routes to prefetch simultaneously */
  maxPrefetch?: number;
  /** Enable automatic prefetching without the Vue component */
  automaticPrefetch?: boolean;
  /** Enable debug logging */
  debug?: boolean;
  /** Enable mobile support for touch devices */
  mobileSupport?: boolean;
  /** Viewport margin for mobile prefetching */
  viewportMargin?: number;
  /** Enable prefetching of all links on the page at once */
  prefetchAllLinks?: boolean;
  /** Delay before starting to prefetch all links (ms) */
  prefetchAllLinksDelay?: number;
}

/**
 * Vue plugin for proximity-based route prefetching
 * Usage: app.use(ProximityPrefetchPlugin)
 */
export const ProximityPrefetchPlugin: Plugin = {
  install(app: App) {
    // Register the component globally
    app.component('ProximityPrefetch', ProximityPrefetch);
  }
};