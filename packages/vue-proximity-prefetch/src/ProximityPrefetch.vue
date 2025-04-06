<script setup lang="ts">
/**
 * ProximityPrefetch Component
 * 
 * This component tracks mouse movements and prefetches routes when the cursor
 * approaches links, improving perceived navigation speed.
 */
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Component props interface
 */
interface Props {
  /** Distance threshold in pixels to trigger prefetching */
  threshold?: number;
  /** Interval for periodic checks in milliseconds (0 means reactive to mouse movements) */
  predictionInterval?: number;
  /** Enable debug logging */
  debug?: boolean;
}

// Default prop values
const props = withDefaults(defineProps<Props>(), {
  threshold: 200,
  predictionInterval: 0,
  debug: false // Debug disabled by default in production
});

// Router access for prefetching
const router = useRouter();

// Track mouse position
const mousePosition = ref({ x: 0, y: 0 });

// Store already prefetched routes to avoid duplication
const prefetchedRoutes = ref<Set<string>>(new Set());

// Store link elements with their position data
const links = ref<Array<{ el: HTMLAnchorElement; href: string; rect: DOMRect }>>([]);

// Track if mouse is near any link
const isMouseNearLink = ref(false);

// Last time proximity was checked (for throttling)
const lastProximityCheck = ref(Date.now());

// Minimum interval between proximity checks (ms)
const THROTTLE_INTERVAL = 100;

/**
 * Scan the DOM and update the list of tracked links
 */
const updateLinks = () => {
  // Get all anchor elements
  const anchors = Array.from(
    document.querySelectorAll('a')
  ) as HTMLAnchorElement[];
  
  if (props.debug) {
    console.debug(`[ProximityPrefetch] Found ${anchors.length} links in the page`);
  }
  
  // Filter and process valid internal links
  links.value = anchors
    .map((el) => {
      const href = el.getAttribute('href');
      
      // Only include internal links (starting with / or without ://) and not anchor links
      if (href && (href.startsWith('/') || !href.includes('://')) && !href.startsWith('#')) {
        const rect = el.getBoundingClientRect();
        
        if (props.debug) {
          console.debug(`[ProximityPrefetch] Link found: ${href}, rect:`, rect);
        }
        
        return {
          el,
          href,
          rect
        };
      }
      return null;
    })
    .filter((link): link is { el: HTMLAnchorElement; href: string; rect: DOMRect } => link !== null);
};

/**
 * Calculate Euclidean distance between two points
 */
const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

/**
 * Calculate the center point of a DOMRect
 */
const calculateCenterPoint = (rect: DOMRect): { x: number, y: number } => {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
};

/**
 * Check if mouse is within threshold distance of any link
 * @returns boolean indicating if mouse is near any link
 */
const checkProximity = (): boolean => {
  if (!links.value.length) {
    return false;
  }
  
  // Update link rectangles to account for layout changes
  links.value.forEach(link => {
    link.rect = link.el.getBoundingClientRect();
  });
  
  // Calculate distance between mouse and each link
  const linksWithDistance = links.value.map((link) => {
    const center = calculateCenterPoint(link.rect);
    const distance = calculateDistance(
      mousePosition.value.x,
      mousePosition.value.y,
      center.x,
      center.y
    );
    return { ...link, distance };
  });
  
  // Find links within threshold distance
  const closestLinks = linksWithDistance.filter(
    (link) => link.distance < props.threshold
  );
  
  if (props.debug && closestLinks.length > 0) {
    console.debug(`[ProximityPrefetch] ${closestLinks.length} links within threshold ${props.threshold}px`);
    closestLinks.forEach(link => {
      console.debug(`[ProximityPrefetch] Link: ${link.href}, Distance: ${link.distance.toFixed(2)}px`);
    });
  }
  
  return closestLinks.length > 0;
};

/**
 * Prefetch routes for nearby links
 */
const prefetchNearbyRoutes = (): void => {
  // Apply throttling to limit frequency of checks
  const now = Date.now();
  if (now - lastProximityCheck.value < THROTTLE_INTERVAL) {
    return;
  }
  lastProximityCheck.value = now;
  
  // First check if mouse is near any link
  const hasNearbyLinks = checkProximity();
  isMouseNearLink.value = hasNearbyLinks;
  
  // Exit early if no links are nearby
  if (!hasNearbyLinks || !links.value.length) {
    return;
  }
  
  // Calculate distances to find closest links
  const linksWithDistance = links.value.map((link) => {
    const center = calculateCenterPoint(link.rect);
    const distance = calculateDistance(
      mousePosition.value.x,
      mousePosition.value.y,
      center.x,
      center.y
    );
    return { ...link, distance };
  });

  // Sort by distance (closest first)
  linksWithDistance.sort((a, b) => a.distance - b.distance);

  // Filter for links within threshold
  const closestLinks = linksWithDistance.filter(
    (link) => link.distance < props.threshold
  );

  // Get routes to prefetch
  const routesToPrefetch = closestLinks.map((link) => link.href);

  // Limit to 3 routes at a time to avoid excessive prefetching
  const MAX_PREFETCH = 3;
  for (const route of routesToPrefetch.slice(0, MAX_PREFETCH)) {
    // Skip already prefetched routes
    if (prefetchedRoutes.value.has(route)) {
      continue;
    }
    
    if (props.debug) {
      console.log('[ProximityPrefetch] Prefetching:', route);
    }
    
    try {
      // Resolve the route to get corresponding route records
      const resolved = router.resolve(route);
      
      // Trigger navigation to prefetch route components without actually navigating
      router.getRoutes().forEach(routeRecord => {
        if (routeRecord.path === resolved.path && routeRecord.components) {
          // Load components without navigating
          const comps = routeRecord.components;
          Object.values(comps).forEach(comp => {
            // Use a safer approach with explicit type casting
            const asyncComp = comp as any;
            if (typeof asyncComp === 'function') {
              try {
                // Call component to trigger loading
                asyncComp();
              } catch (e) {
                if (props.debug) {
                  console.error('[ProximityPrefetch] Error loading component:', e);
                }
              }
            }
          });
        }
      });
      
      // Mark as prefetched to avoid duplicate prefetching
      prefetchedRoutes.value.add(route);
    } catch (err) {
      console.error('[ProximityPrefetch] Error prefetching route:', route, err);
    }
  }
};

onMounted(() => {
  if (props.debug) {
    console.log('[ProximityPrefetch] Component mounted with options:', {
      threshold: props.threshold,
      predictionInterval: props.predictionInterval,
      debug: props.debug
    });
  }

  /**
   * Handle mouse movement events
   */
  const handleMouseMove = (e: MouseEvent): void => {
    mousePosition.value = { x: e.clientX, y: e.clientY };
  };

  // Register mouse movement listener
  window.addEventListener('mousemove', handleMouseMove);
  
  // Scan for links after a short delay to ensure DOM is fully loaded
  setTimeout(() => {
    updateLinks();
    if (props.debug) {
      console.log(`[ProximityPrefetch] Initial links detection: ${links.value.length} links found`);
    }
  }, 500);

  // Set up MutationObserver to detect new links or changes to existing ones
  const observer = new MutationObserver(() => {
    updateLinks();
  });

  // Start observing DOM changes
  observer.observe(document.body, {
    childList: true,  // Watch for added/removed nodes
    subtree: true,    // Include descendants
    attributes: true, // Watch for attribute changes
    attributeFilter: ['href'] // Only care about href changes
  });

  /**
   * Configure prefetching system based on parameters
   */
  let intervalId: number | undefined;

  // Two prefetching modes:
  if (props.predictionInterval > 0) {
    // 1. Interval mode: periodic checking
    intervalId = window.setInterval(() => {
      // Only check if mouse has moved (avoid unnecessary checks)
      if (mousePosition.value.x !== 0 || mousePosition.value.y !== 0) {
        prefetchNearbyRoutes();
      }
    }, props.predictionInterval);
  } else {
    // 2. Reactive mode: check on mouse movements with throttling
    const throttledPrefetch = (): void => {
      const now = Date.now();
      if (now - lastProximityCheck.value >= THROTTLE_INTERVAL) {
        prefetchNearbyRoutes();
      }
    };
    
    // Watch for mouse position changes
    watch(mousePosition, () => {
      throttledPrefetch();
    });
  }

  // Clean up event listeners and observers on component unmount
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    observer.disconnect();
    if (intervalId) {
      window.clearInterval(intervalId);
    }
  });
});
</script>

<template>
  <!-- This component doesn't render anything visually -->
  <!-- It acts as a functionality wrapper that can be placed anywhere in your app -->
  <slot></slot>
</template>