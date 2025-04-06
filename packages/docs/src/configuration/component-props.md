# Component Props

The `ProximityPrefetch` component accepts several props to customize its behavior. This page details all available options.

## Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `threshold` | `number` | `200` | Distance in pixels at which prefetching triggers |
| `predictionInterval` | `number` | `0` | Interval in ms to check link proximity (0 = reactive) |
| `debug` | `boolean` | `false` | Enable debug logs |

## Prop Details

### threshold

The `threshold` option defines the distance in pixels at which prefetching will trigger when the user's cursor approaches a navigation link.

```vue
<ProximityPrefetch :threshold="300">
  <router-view />
</ProximityPrefetch>
```

### predictionInterval

The `predictionInterval` option defines the interval in milliseconds between link proximity checks. A value of `0` (default) means the check only happens when the mouse moves (reactive to mouse movement events).

```vue
<ProximityPrefetch :prediction-interval="100">
  <router-view />
</ProximityPrefetch>
```

### debug

The `debug` option enables or disables debug logs in the console. Useful during development to understand when and how prefetches are triggered.

```vue
<ProximityPrefetch :debug="true">
  <router-view />
</ProximityPrefetch>
```

## Complete Example

Here's an example of using the component with all props configured:

```vue
<template>
  <ProximityPrefetch 
    :threshold="250" 
    :prediction-interval="50"
    :debug="process.env.NODE_ENV === 'development'"
  >
    <router-view />
  </ProximityPrefetch>
</template>

<script setup>
import { ProximityPrefetch } from 'v-proximity-prefetch'
</script>
```

## Using with TypeScript

If you're using TypeScript, you can import the `ProximityPrefetchProps` type for better development assistance:

```vue
<script setup lang="ts">
import { ProximityPrefetch, type ProximityPrefetchProps } from 'v-proximity-prefetch'

// Using the type
const prefetchOptions: ProximityPrefetchProps = {
  threshold: 250,
  predictionInterval: 50,
  debug: true
}
</script>

<template>
  <ProximityPrefetch v-bind="prefetchOptions">
    <router-view />
  </ProximityPrefetch>
</template>
```

## Reactivity

All props of the `ProximityPrefetch` component are reactive, meaning you can modify them dynamically during your application's runtime:

```vue
<template>
  <div>
    <label>
      Detection threshold (pixels):
      <input type="range" v-model="threshold" min="50" max="500" step="10" />
      {{ threshold }}px
    </label>
    
    <ProximityPrefetch :threshold="threshold">
      <router-view />
    </ProximityPrefetch>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ProximityPrefetch } from 'v-proximity-prefetch'

const threshold = ref(200)
</script>