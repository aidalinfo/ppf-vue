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

  /**
   * Enable automatic prefetching without needing to add the Vue component
   * When true, a global script is injected that handles prefetching for all routes
   * @default false
   */
  automaticPrefetch?: boolean;
}

/**
 * Default configuration values
 */
const DEFAULT_OPTIONS: Required<VueProximityPrefetchOptions> = {
  threshold: 200,
  predictionInterval: 0,
  maxPrefetch: 3,
  debug: false,
  automaticPrefetch: false
};

/**
 * Generate the prefetch script to be injected in the page
 */
function generatePrefetchScript(options: Required<VueProximityPrefetchOptions>): string {
  return `
  <!-- Injected by Vue Proximity Prefetch Plugin -->
  <script>
    (function() {
      // Set global PPF_DEBUG flag for the Vue component to detect
      window.PPF_DEBUG = ${options.debug};
      
      // Configuration from Vite plugin
      const config = {
        threshold: ${options.threshold},
        predictionInterval: ${options.predictionInterval},
        maxPrefetch: ${options.maxPrefetch},
        debug: ${options.debug} || (typeof window !== 'undefined' && window.PPF_DEBUG === true)
      };
      
      // Utils
      const log = config.debug ? console.log.bind(console, '[ProximityPrefetch]') : () => {};
      log('Automatic prefetching enabled with options:', config);
      
      // State variables
      let mousePosition = { x: 0, y: 0 };
      let prefetchedRoutes = new Set();
      let lastCheck = Date.now();
      const THROTTLE_INTERVAL = 100;
      
      // Calculate Euclidean distance between two points
      function calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      }
      
      // Calculate center point of a DOMRect
      function calculateCenterPoint(rect) {
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      }
      
      // Get all valid links on the page
      function getLinks() {
        const anchors = Array.from(document.querySelectorAll('a'));
        return anchors
          .map((el) => {
            const href = el.getAttribute('href');
            // Only include internal links (starting with / or without ://) and not anchor links
            if (href && (href.startsWith('/') || !href.includes('://')) && !href.startsWith('#')) {
              const rect = el.getBoundingClientRect();
              return { el, href, rect };
            }
            return null;
          })
          .filter(link => link !== null);
      }
      
      // Check if mouse is near any links
      function checkProximity() {
        const links = getLinks();
        if (!links.length) return false;
        
        // Calculate distance between mouse and each link
        const linksWithDistance = links.map((link) => {
          const center = calculateCenterPoint(link.rect);
          const distance = calculateDistance(
            mousePosition.x,
            mousePosition.y,
            center.x,
            center.y
          );
          return { ...link, distance };
        });
        
        // Find links within threshold distance
        const closestLinks = linksWithDistance.filter(
          (link) => link.distance < config.threshold
        );
        
        if (config.debug && closestLinks.length > 0) {
          log(\`\${closestLinks.length} links within threshold \${config.threshold}px\`);
        }
        
        return closestLinks;
      }
      
      // Prefetch routes when mouse is near links
      function prefetchNearbyRoutes() {
        const now = Date.now();
        if (now - lastCheck < THROTTLE_INTERVAL) return;
        lastCheck = now;
        
        const closestLinks = checkProximity();
        if (!closestLinks || !closestLinks.length) return;
        
        // Sort by distance
        closestLinks.sort((a, b) => a.distance - b.distance);
        
        // Limit prefetching to maxPrefetch routes
        const routesToPrefetch = closestLinks.slice(0, config.maxPrefetch).map(link => link.href);
        
        // Prefetch routes
        for (const route of routesToPrefetch) {
          if (prefetchedRoutes.has(route)) continue;
          
          log('Prefetching route:', route);
          
          try {
            // Create a prefetch link element
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            link.as = 'document';
            document.head.appendChild(link);
            
            prefetchedRoutes.add(route);
          } catch (err) {
            console.error('[ProximityPrefetch] Error prefetching route:', route, err);
          }
        }
      }
      
      // Initialize
      function init() {
        // Mouse move listener
        window.addEventListener('mousemove', (e) => {
          mousePosition = { x: e.clientX, y: e.clientY };
          
          // Reactive mode
          if (config.predictionInterval === 0) {
            prefetchNearbyRoutes();
          }
        });
        
        // Interval mode
        if (config.predictionInterval > 0) {
          setInterval(() => {
            if (mousePosition.x !== 0 || mousePosition.y !== 0) {
              prefetchNearbyRoutes();
            }
          }, config.predictionInterval);
        }
        
        log('Proximity prefetching initialized');
      }
      
      // Start when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    })();
  </script>
  `;
}

/**
 * Creates a Vite plugin that enhances Vue Router with proximity-based prefetching
 * 
 * @param options - Configuration options for the prefetching behavior
 * @returns Vite plugin instance
 */
export function viteProximityPrefetch(options: VueProximityPrefetchOptions = {}): Plugin {
  // Check if PPF_DEBUG environment variable is set
  const PPF_DEBUG = process.env.PPF_DEBUG === 'true';
  
  // Merge provided options with defaults, respecting PPF_DEBUG
  const resolvedOptions: Required<VueProximityPrefetchOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
    debug: options.debug || PPF_DEBUG
  };

  return {
    name: 'vite-plugin-vue-proximity-prefetch',
    
    configResolved() {
      console.log('Vue Proximity Prefetch Plugin enabled');
      
      if (resolvedOptions.debug) {
        console.log('Options:', {
          threshold: resolvedOptions.threshold,
          predictionInterval: resolvedOptions.predictionInterval,
          maxPrefetch: resolvedOptions.maxPrefetch,
          automaticPrefetch: resolvedOptions.automaticPrefetch,
          debug: resolvedOptions.debug
        });
      }
    },
    
    /**
     * Transform HTML to add prefetch attributes to preloaded modules
     * and inject the automatic prefetching script if enabled
     */
    transformIndexHtml(html) {
      // Add prefetch attribute to module preload links
      const transformedHtml = html.replace(
        /<link rel="modulepreload"/g,
        '<link rel="modulepreload" data-prefetch="true"'
      );
      
      // If automatic prefetching is enabled, inject the script
      if (resolvedOptions.automaticPrefetch) {
        const injectionPoint = '</head>';
        const prefetchScript = generatePrefetchScript(resolvedOptions);
        
        return transformedHtml.replace(
          injectionPoint,
          `${prefetchScript}\n${injectionPoint}`
        );
      }
      
      return transformedHtml;
    }
  };
}

export default viteProximityPrefetch;