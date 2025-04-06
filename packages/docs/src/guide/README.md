# Introduction

Vue Proximity Prefetch is an innovative solution to improve the perceived performance of your Vue application. By intelligently prefetching routes when the user moves their mouse near navigation links, the library significantly reduces perceived loading times and provides a smoother user experience.

## How It Works

1. **Proximity Detection**: The library monitors the user's cursor position on the screen (for desktop) or the viewport position (for mobile devices).
2. **Intent Prediction**: When the cursor approaches a navigation link or when a link comes into view on mobile, the library predicts that the user might click on it.
3. **Smart Prefetching**: The components of the corresponding route are prefetched before the user even clicks.
4. **Enhanced Experience**: When the user finally clicks on the link, the new page appears almost instantly.

## Why Use It?

- **Improve UX**: Significant reduction in perceived loading times
- **Simple Implementation**: Easy integration into existing Vue applications
- **Granular Control**: Flexible configuration tailored to your specific needs
- **Optimized Performance**: Smart request throttling to avoid network overload
- **Cross-device Support**: Works on both desktop and mobile devices
- **Full Control**: Options to prefetch links based on proximity, viewport, or preload all at once

## Feature Overview

Vue Proximity Prefetch offers two main integration methods:

1. **Using the Vue Component**: For precise control over which parts of your application use proximity prefetching.
2. **Using the Vite Plugin**: For simpler and global implementation without modifying your code.

Each method offers different benefits depending on your use case. The following pages will guide you through installing and configuring Vue Proximity Prefetch for your project.

## Key Features

### Mobile Device Support

Vue Proximity Prefetch includes dedicated mobile support that automatically detects touch devices and adapts its prefetching strategy:

- **Viewport-based Detection**: Instead of tracking mouse movements (which don't exist on mobile), the plugin tracks which links are within or near the viewport.
- **Touch Events**: Responds to touch interactions to prefetch relevant content.
- **Scroll Detection**: Prefetches links as they come into the viewport while scrolling.
- **Configurable Margin**: Control how far outside the viewport links should be detected with the `viewportMargin` option.

### Prefetch All Links

For smaller applications or critical pages, you can enable the `prefetchAllLinks` option to preload all internal navigation targets at once:

- **Batch Processing**: Links are prefetched in small batches to avoid overwhelming the network.
- **Configurable Delay**: Set how long to wait after page load before starting to prefetch with the `prefetchAllLinksDelay` option.
- **Automatic Deduplication**: Each route is only prefetched once, even if multiple links point to the same destination.

The `prefetchAllLinks` feature is particularly useful for:

- Landing pages where you want to ensure all possible user journeys feel fast
- Small applications with few routes
- Critical user paths where speed is essential