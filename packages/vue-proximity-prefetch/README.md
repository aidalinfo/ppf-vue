# Vue Proximity Prefetch

Un plugin Vue.js qui précharge automatiquement les routes lorsque l'utilisateur approche sa souris des liens, offrant une expérience de navigation plus rapide et fluide.

## Fonctionnalités

- Détecte lorsque la souris de l'utilisateur s'approche des liens de navigation
- Précharge automatiquement les composants des routes correspondantes sans naviguer
- Optimise l'expérience utilisateur en réduisant les temps de chargement perçus
- Fonctionne avec Vue Router
- S'intègre facilement avec Vite

## Installation

```bash
npm install vue-proximity-prefetch
# ou
yarn add vue-proximity-prefetch
# ou
pnpm add vue-proximity-prefetch
```

## Utilisation

### 1. Intégrer le plugin dans votre application Vue

```ts
// main.ts
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ProximityPrefetchPlugin from 'vue-proximity-prefetch'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // vos routes...
  ]
})

app.use(router)
app.use(ProximityPrefetchPlugin)

app.mount('#app')
```

### 2. Utiliser le composant ProximityPrefetch

```vue
<!-- App.vue -->
<template>
  <div>
    <header>
      <nav>
        <router-link to="/">Accueil</router-link>
        <router-link to="/about">À propos</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>

    <main>
      <ProximityPrefetch :threshold="200" :prediction-interval="100">
        <router-view />
      </ProximityPrefetch>
    </main>
  </div>
</template>

<script setup>
import { ProximityPrefetch } from 'vue-proximity-prefetch'
</script>
```

### 3. Configurer le plugin Vite (optionnel)

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteProximityPrefetch } from 'vue-proximity-prefetch'

export default defineConfig({
  plugins: [
    vue(),
    viteProximityPrefetch({
      threshold: 200,
      predictionInterval: 100,
      debug: true
    })
  ]
})
```

## Options

### Composant ProximityPrefetch

| Propriété | Type | Par défaut | Description |
|-----------|------|------------|-------------|
| `threshold` | `number` | `200` | Distance en pixels à partir de laquelle le préchargement se déclenche |
| `predictionInterval` | `number` | `0` | Intervalle en ms pour vérifier et prédire les routes à précharger (0 = vérification à chaque mouvement de souris) |
| `debug` | `boolean` | `false` | Active les logs de débogage pour voir quand les routes sont préchargées |

### Plugin Vite

| Option | Type | Par défaut | Description |
|--------|------|------------|-------------|
| `threshold` | `number` | `200` | Distance en pixels à partir de laquelle le préchargement se déclenche |
| `predictionInterval` | `number` | `0` | Intervalle en ms pour vérifier et prédire les routes à précharger |
| `maxPrefetch` | `number` | `3` | Nombre maximum de routes à précharger simultanément |
| `debug` | `boolean` | `false` | Active les logs de débogage |

## Licence

MIT