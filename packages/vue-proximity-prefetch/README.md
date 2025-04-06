# Vue Proximity Prefetch

Un plugin Vue.js qui précharge automatiquement les routes lorsque l'utilisateur approche sa souris des liens, offrant une expérience de navigation plus rapide et fluide.

## Fonctionnalités

- Détecte lorsque la souris de l'utilisateur s'approche des liens de navigation
- Précharge automatiquement les composants des routes correspondantes sans naviguer
- Optimise l'expérience utilisateur en réduisant les temps de chargement perçus
- Fonctionne avec Vue Router
- S'intègre facilement avec Vite
- Peut être utilisé comme simple plugin Vite sans avoir à ajouter le composant Vue

## Installation

```bash
npm install vue-proximity-prefetch
# ou
yarn add vue-proximity-prefetch
# ou
pnpm add vue-proximity-prefetch
```

## Utilisation

Vous pouvez utiliser Vue Proximity Prefetch de deux façons :

1. **Avec le composant Vue** : Utilisation traditionnelle avec le composant Vue et le plugin Vue
2. **Plugin Vite seulement** : Utilisation simplifiée qui ne nécessite pas d'ajouter de composant à votre application

### Option 1: Intégrer le plugin Vue et le composant

#### 1. Intégrer le plugin dans votre application Vue

```ts
// main.ts
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { ProximityPrefetchPlugin } from 'vue-proximity-prefetch'

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

#### 2. Utiliser le composant ProximityPrefetch

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

### Option 2: Utiliser uniquement le plugin Vite (nouveauté)

Cette méthode est plus simple car elle ne nécessite pas d'ajouter le composant Vue ni d'utiliser le plugin Vue. Le plugin Vite injecte automatiquement le code nécessaire pour le préchargement basé sur la proximité.

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
      maxPrefetch: 3,
      debug: true,
      automaticPrefetch: true // Active le préchargement automatique sans composant Vue
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
| `automaticPrefetch` | `boolean` | `false` | Active le préchargement automatique sans avoir besoin du composant Vue |

## Quand utiliser le plugin Vite ou le composant Vue ?

- **Plugin Vite uniquement** (`automaticPrefetch: true`) :
  - Avantage : Configuration minimale, pas besoin de modifier votre application
  - Utilisation : Projets simples ou prototypes où vous voulez rapidement ajouter le préchargement
  - Fonctionnement : Utilise l'API Prefetch standard du navigateur

- **Composant Vue** :
  - Avantage : Préchargement plus avancé qui fonctionne avec Vue Router et charge les composants
  - Utilisation : Applications complexes où vous voulez un contrôle précis sur le préchargement
  - Fonctionnement : Précharge les composants Vue Router en plus des routes

## Licence

MIT