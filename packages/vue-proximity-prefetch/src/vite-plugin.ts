/**
 * Vue Proximity Prefetch - Vite Plugin
 * 
 * This plugin enhances Vue Router applications by adding proximity-based prefetching
 * capabilities, improving user experience through faster route transitions.
 */

import type { Plugin } from 'vite';

/**
 * Configuration options for the Vue Proximity Prefetch plugin
 */
export interface VueProximityPrefetchOptions {
  /**
   * Distance threshold in pixels that triggers prefetching when the cursor
   * approaches a link element
   * @default 200
   */
  threshold?: number;
  
  /**
   * Interval for periodic prediction checks (in milliseconds)
   * When set to 0, checks are triggered by mouse movements
   * @default 0
   */
  predictionInterval?: number;
  
  /**
   * Maximum number of routes to prefetch simultaneously
   * Limits resource usage while still enhancing perceived performance
   * @default 3
   */
  maxPrefetch?: number;
  
  /**
   * Enable debug logging in the console
   * Useful for development and troubleshooting
   * @default false
   */
  debug?: boolean;
}

/**
 * Default configuration values
 */
const DEFAULT_OPTIONS: Required<VueProximityPrefetchOptions> = {
  threshold: 200,
  predictionInterval: 0,
  maxPrefetch: 3,
  debug: false
};

/**
 * Creates a Vite plugin that enhances Vue Router with proximity-based prefetching
 * 
 * @param options - Configuration options for the prefetching behavior
 * @returns Vite plugin instance
 */
export function viteProximityPrefetch(options: VueProximityPrefetchOptions = {}): Plugin {
  // Merge provided options with defaults
  const resolvedOptions: Required<VueProximityPrefetchOptions> = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  return {
    name: 'vite-plugin-vue-proximity-prefetch',
    
    configResolved() {
      console.log('Vue Proximity Prefetch Plugin enabled');
      
      if (resolvedOptions.debug) {
        console.log('Options:', {
          threshold: resolvedOptions.threshold,
          predictionInterval: resolvedOptions.predictionInterval,
          maxPrefetch: resolvedOptions.maxPrefetch
        });
      }
    },
    
    /**
     * Transform HTML to add prefetch attributes to preloaded modules
     * This enhances browser's resource loading for prefetched routes
     */
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="modulepreload"/g,
        '<link rel="modulepreload" data-prefetch="true"'
      );
    }
  };
}

export default viteProximityPrefetch;