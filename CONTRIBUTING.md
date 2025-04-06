# Contributing to Vue Proximity Prefetch

Thank you for your interest in contributing to Vue Proximity Prefetch! This guide will help you get started with the development process.

## Project Overview

Vue Proximity Prefetch is a performance optimization plugin for Vue applications that prefetches routes when the mouse approaches links, improving perceived navigation speed and user experience.

The project consists of:

- A Vue component (`ProximityPrefetch.vue`) that handles the mouse tracking and prefetching logic
- A Vue plugin that registers the component globally
- A Vite plugin that enhances the build process for optimal prefetching

## Development Setup

### Prerequisites

- Node.js (v20 or higher)
- pnpm (v10 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aidalinfo/v-proximity-prefetch.git
   cd vue-proximity-prefetch
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the plugin:
   ```bash
   pnpm run build
   ```

## Development Workflow

### Building the Plugin

```bash
# Build the plugin
pnpm run build

# Watch mode for development
pnpm run dev
```

### Testing with the Example App

The repository includes an example app in `packages/app-example` that you can use to test your changes:

```bash
# Start the example app
pnpm --filter ppf-vue run dev
```

## Code Style Guidelines

### General Guidelines

- Use clear, descriptive variable and function names
- Add JSDoc comments for functions and components
- Keep functions focused on a single responsibility
- Use TypeScript types for better code safety
- Maintain a consistent code style

### Naming Conventions

- Use PascalCase for component names (e.g., `ProximityPrefetch`)
- Use camelCase for variables and function names
- Use UPPER_CASE for constants

### Documentation

- Document all public APIs and components
- Keep comments up-to-date with code changes
- Use JSDoc tags (`@param`, `@returns`, etc.) for function documentation

## Pull Request Process

1. Fork the repository and create your branch from `main`
2. Make your changes following the code style guidelines
3. Ensure the build passes with `pnpm run build`
4. Update documentation if necessary
5. Submit a pull request with a clear title and description
6. Wait for code review and address any feedback

## Commit Message Format

Use clear, descriptive commit messages:

```
feat: Add support for custom prefetch strategies
fix: Correct distance calculation for nested elements
refactor: Improve throttling logic
docs: Update README with advanced usage examples
```

## License

By contributing to Vue Proximity Prefetch, you agree that your contributions will be licensed under the project's MIT license.