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
 * Vue plugin for proximity-based route prefetching
 * Usage: app.use(ProximityPrefetchPlugin)
 */
export const ProximityPrefetchPlugin: Plugin = {
  install(app: App) {
    // Register the component globally
    app.component('ProximityPrefetch', ProximityPrefetch);
  }
};