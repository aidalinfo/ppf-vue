# Introduction

Vue Proximity Prefetch is an innovative solution to improve the perceived performance of your Vue application. By intelligently prefetching routes when the user moves their mouse near navigation links, the library significantly reduces perceived loading times and provides a smoother user experience.

## How It Works

1. **Proximity Detection**: The library monitors the user's cursor position on the screen.
2. **Intent Prediction**: When the cursor approaches a navigation link, the library predicts that the user might click on it.
3. **Smart Prefetching**: The components of the corresponding route are prefetched before the user even clicks.
4. **Enhanced Experience**: When the user finally clicks on the link, the new page appears almost instantly.

## Why Use It?

- **Improve UX**: Significant reduction in perceived loading times
- **Simple Implementation**: Easy integration into existing Vue applications
- **Granular Control**: Flexible configuration tailored to your specific needs
- **Optimized Performance**: Smart request throttling to avoid network overload

## Feature Overview

Vue Proximity Prefetch offers two main integration methods:

1. **Using the Vue Component**: For precise control over which parts of your application use proximity prefetching.
2. **Using the Vite Plugin**: For simpler and global implementation without modifying your code.

Each method offers different benefits depending on your use case. The following pages will guide you through installing and configuring Vue Proximity Prefetch for your project.