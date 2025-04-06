<script setup lang="ts">
/**
 * ProximityPrefetch Component
 * 
 * This component tracks mouse movements and prefetches routes when the cursor
 * approaches links, improving perceived navigation speed.
 */
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

// Étendre l'interface Window pour inclure notre propriété PPF_DEBUG
declare global {
  interface Window {
    PPF_DEBUG?: boolean;
  }
}

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
  /** Enable mobile support with viewport-based prefetching */
  mobileSupport?: boolean;
  /** Viewport margin for mobile prefetching */
  viewportMargin?: number;
}

// Check if PPF_DEBUG environment variable is set
const PPF_DEBUG = typeof window !== 'undefined' && window.PPF_DEBUG === true;

// Default prop values
const props = withDefaults(defineProps<Props>(), {
  threshold: 200,
  predictionInterval: 0,
  debug: false, // Debug disabled by default in production
  mobileSupport: true,
  viewportMargin: 300
});

// Determine if debug mode is enabled (either from props or PPF_DEBUG global)
const isDebugEnabled = computed(() => props.debug || PPF_DEBUG);

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

// Detect if we're on a touch device
const isTouchDevice = ref(false);

/**
 * Detect touch devices
 */
const detectTouchDevice = (): boolean => {
  return (
    typeof window !== 'undefined' && 
    (('ontouchstart' in window) || 
     (navigator.maxTouchPoints > 0) || 
     (navigator.msMaxTouchPoints > 0))
  );
};

/**
 * Scan the DOM and update the list of tracked links
 */
const updateLinks = () => {
  // Get all anchor elements with href attribute
  const anchors = Array.from(
    document.querySelectorAll('a[href]')
  ) as HTMLAnchorElement[];
  
  if (isDebugEnabled.value) {
    console.debug(`[ProximityPrefetch] Found ${anchors.length} links in the page`);
  }
  
  // Filter and process valid internal links
  links.value = anchors
    .map((el) => {
      const href = el.getAttribute('href');
      
      // Only include internal links (starting with / or without ://) and not anchor links
      if (href && (href.startsWith('/') || !href.includes('://')) && !href.startsWith('#')) {
        const rect = el.getBoundingClientRect();
        
        if (isDebugEnabled.value) {
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
 * Check if a link is in or near the viewport
 */
const isLinkInViewport = (rect: DOMRect): boolean => {
  return (
    rect.top >= -props.viewportMargin &&
    rect.left >= -props.viewportMargin &&
    rect.bottom <= window.innerHeight + props.viewportMargin &&
    rect.right <= window.innerWidth + props.viewportMargin
  );
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
  
  if (isDebugEnabled.value && closestLinks.length > 0) {
    console.debug(`[ProximityPrefetch] ${closestLinks.length} links within threshold ${props.threshold}px`);
    closestLinks.forEach(link => {
      console.debug(`[ProximityPrefetch] Link: ${link.href}, Distance: ${link.distance.toFixed(2)}px`);
    });
  }
  
  return closestLinks.length > 0;
};

/**
 * Check which links are in or near the viewport (for mobile)
 * @returns boolean indicating if there are links in the viewport
 */
const checkViewportLinks = (): boolean => {
  if (!links.value.length) {
    return false;
  }
  
  // Update link rectangles to account for layout changes
  links.value.forEach(link => {
    link.rect = link.el.getBoundingClientRect();
  });
  
  // Find links within viewport (plus margin)
  const visibleLinks = links.value.filter(link => isLinkInViewport(link.rect));
  
  if (isDebugEnabled.value && visibleLinks.length > 0) {
    console.debug(`[ProximityPrefetch] ${visibleLinks.length} links in viewport (plus margin ${props.viewportMargin}px)`);
  }
  
  return visibleLinks.length > 0;
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
  
  // Choose detection strategy based on device type
  let hasNearbyLinks;
  
  if (isTouchDevice.value && props.mobileSupport) {
    // Mobile: viewport-based detection
    hasNearbyLinks = checkViewportLinks();
  } else {
    // Desktop: mouse proximity detection
    hasNearbyLinks = checkProximity();
  }
  
  isMouseNearLink.value = hasNearbyLinks;
  
  // Exit early if no links are nearby
  if (!hasNearbyLinks || !links.value.length) {
    return;
  }
  
  // Update link rectangles to account for layout changes
  links.value.forEach(link => {
    link.rect = link.el.getBoundingClientRect();
  });
  
  let linksToProcess;
  
  if (isTouchDevice.value && props.mobileSupport) {
    // For mobile: Get links in viewport
    linksToProcess = links.value.filter(link => isLinkInViewport(link.rect));
    // Sort by vertical position (links at the top first)
    linksToProcess.sort((a, b) => a.rect.top - b.rect.top);
  } else {
    // For desktop: Calculate distances to find closest links
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
    linksToProcess = linksWithDistance
      .filter((link) => link.distance < props.threshold)
      .map(({ el, href, rect }) => ({ el, href, rect })); // Strip the distance property
  }
  
  // Get routes to prefetch
  const routesToPrefetch = linksToProcess.map((link) => link.href);

  // Limit to 3 routes at a time to avoid excessive prefetching
  const MAX_PREFETCH = 3;
  for (const route of routesToPrefetch.slice(0, MAX_PREFETCH)) {
    // Skip already prefetched routes
    if (prefetchedRoutes.value.has(route)) {
      continue;
    }
    
    if (isDebugEnabled.value) {
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
                if (isDebugEnabled.value) {
                  console.error('[ProximityPrefetch] Error loading component:', e);
                }
              }
            }
          });
        }
      });
      
      // Mark as prefetched to avoid duplicate prefetching
      prefetchedRoutes.value.add(route);
      
      // Add visual indicator for prefetched links in debug mode
      if (isDebugEnabled.value) {
        // Find all link elements pointing to this route
        const matchingAnchors = Array.from(
          document.querySelectorAll(`a[href="${route}"]`)
        ) as HTMLAnchorElement[];
        
        matchingAnchors.forEach(anchor => {
          // Add a red border directly to the link element if not already applied
          if (!anchor.hasAttribute('data-ppf-debug-applied')) {
            anchor.setAttribute('data-ppf-debug-applied', 'true');
            anchor.classList.add('ppf-debug-highlight');
            anchor.title = `Prefetched: ${route}`;
          }
        });
      }
    } catch (err) {
      if (isDebugEnabled.value) {
        console.error('[ProximityPrefetch] Error prefetching route:', err);
      }
    }
  }
};

/**
 * Handle mouse movement events
 */
const handleMouseMove = (e: MouseEvent): void => {
  mousePosition.value = { x: e.clientX, y: e.clientY };
};

/**
 * Handle scroll events (for mobile)
 */
const handleScroll = (): void => {
  if (isTouchDevice.value && props.mobileSupport) {
    const now = Date.now();
    if (now - lastProximityCheck.value >= THROTTLE_INTERVAL) {
      prefetchNearbyRoutes();
    }
  }
};

/**
 * Handle touch events (for mobile)
 */
const handleTouch = (): void => {
  if (isTouchDevice.value && props.mobileSupport) {
    prefetchNearbyRoutes();
  }
};

// Register event listeners based on device type
onMounted(() => {
  // Detect device type
  isTouchDevice.value = detectTouchDevice();
  
  if (isDebugEnabled.value) {
    console.log('[ProximityPrefetch] Component mounted with options:', {
      threshold: props.threshold,
      predictionInterval: props.predictionInterval,
      debug: isDebugEnabled.value,
      mobileSupport: props.mobileSupport,
      viewportMargin: props.viewportMargin,
      deviceType: isTouchDevice.value ? 'Touch device' : 'Desktop device'
    });
    
    // Add debug styles for the visual indicators
    const style = document.createElement('style');
    style.textContent = `
      .ppf-debug-highlight {
        border: 2px solid red !important;
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Scan for links after a short delay to ensure DOM is fully loaded
  setTimeout(() => {
    updateLinks();
    if (isDebugEnabled.value) {
      console.log(`[ProximityPrefetch] Initial links detection: ${links.value.length} links found`);
    }

    // Initial prefetch on load (particularly important for mobile)
    prefetchNearbyRoutes();
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

  // Configure event listeners based on device type
  if (isTouchDevice.value && props.mobileSupport) {
    // Mobile: use scroll and touch events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    if (isDebugEnabled.value) {
      console.log('[ProximityPrefetch] Mobile mode initialized with viewport margin:', props.viewportMargin + 'px');
    }
  } else {
    // Desktop: use mouse events
    window.addEventListener('mousemove', handleMouseMove);
    
    if (isDebugEnabled.value) {
      console.log('[ProximityPrefetch] Desktop mode initialized');
    }
  }

  /**
   * Configure prefetching system based on parameters
   */
  let intervalId: number | undefined;

  // Two prefetching modes:
  if (props.predictionInterval > 0) {
    // 1. Interval mode: periodic checking
    intervalId = window.setInterval(() => {
      // Only check if mouse has moved (avoid unnecessary checks) for desktop
      // or always check for mobile
      if (isTouchDevice.value || mousePosition.value.x !== 0 || mousePosition.value.y !== 0) {
        prefetchNearbyRoutes();
      }
    }, props.predictionInterval);
  } else if (!isTouchDevice.value) {
    // 2. Reactive mode: check on mouse movements with throttling (desktop only)
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
    if (isTouchDevice.value && props.mobileSupport) {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('resize', handleScroll);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
    }
    
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