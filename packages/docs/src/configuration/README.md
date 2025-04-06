# Configuration

Vue Proximity Prefetch offers numerous configuration options to adapt its behavior to your specific needs. This section details all available options for both the Vue component and the Vite plugin.

## Overview

The configuration of Vue Proximity Prefetch is divided into two main parts:

1. **Vue Component Options**: These options control the behavior of the `ProximityPrefetch` component when you use it directly in your Vue templates.

2. **Vite Plugin Options**: These options configure the behavior of the `viteProximityPrefetch` Vite plugin when you use it in your Vite configuration.

## Common Options

Some options are common to both integration methods:

- **threshold**: The distance in pixels at which prefetching triggers
- **predictionInterval**: The interval in ms to check link proximity
- **debug**: Enable or disable debug logs

## How to Choose the Right Values

Choosing optimal values for your application depends on several factors:

- The size and complexity of your route components
- The average connection speed of your users
- Typical user behavior on your site

### General Recommendations

- **threshold**: Between 150 and 300 pixels is generally a good balance
- **predictionInterval**: 0 for maximum responsiveness, or a value between 50 and 200ms to reduce load
- **maxPrefetch**: Between 2 and 5 depending on the complexity of your application

Check out the following pages for a detailed description of all available options for each integration method.