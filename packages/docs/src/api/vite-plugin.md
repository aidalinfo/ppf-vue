# API du Plugin Vite

Cette page détaille l'API du plugin Vite `viteProximityPrefetch`, y compris ses options et son fonctionnement interne.

## Importation et installation du plugin

```js
// vite.config.js ou vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteProximityPrefetch } from 'v-proximity-prefetch'

export default defineConfig({
  plugins: [
    vue(),
    viteProximityPrefetch()
  ]
})
```

## Options

| Nom | Type | Défaut | Description |
|-----|------|--------|-------------|
| `threshold` | `number` | `200` | Distance en pixels à laquelle le préchargement se déclenche |
| `predictionInterval` | `number` | `0` | Intervalle en ms pour vérifier la proximité des liens |
| `maxPrefetch` | `number` | `3` | Nombre maximum de routes à précharger simultanément |
| `automaticPrefetch` | `boolean` | `true` | Activer le préchargement automatique des routes |
| `debug` | `boolean` | `false` | Activer les logs de débogage |

## Utilisation avec TypeScript

Le plugin est entièrement typé et vous pouvez importer ses types :

```ts
import { viteProximityPrefetch, type ProximityPrefetchOptions } from 'v-proximity-prefetch'

// Utiliser le type pour vos options
const pluginOptions: ProximityPrefetchOptions = {
  threshold: 250,
  predictionInterval: 50,
  maxPrefetch: 4,
  automaticPrefetch: true,
  debug: true
}

// Utiliser les options typées
export default defineConfig({
  plugins: [
    vue(),
    viteProximityPrefetch(pluginOptions)
  ]
})
```

## Fonctionnement interne

Le plugin Vite `viteProximityPrefetch` fonctionne différemment du composant Vue. Au lieu d'ajouter un composant à votre arbre de composants, il injecte directement le code nécessaire dans votre application.

### Processus d'injection

1. Le plugin analyse votre code pour détecter l'utilisation de Vue Router
2. Il injecte le code de préchargement par proximité dans votre bundle de production
3. Le code injecté s'initialise automatiquement au chargement de la page

### Avantages du plugin Vite

- **Simplicité** : Pas besoin de modifier votre code Vue
- **Performance** : Le code est automatiquement optimisé et tree-shakable
- **Configuration centralisée** : Toute la configuration est dans le fichier Vite

## Désactivation sélective

Si vous utilisez le plugin Vite avec `automaticPrefetch: true` (par défaut), mais que vous souhaitez désactiver le préchargement par proximité pour certaines parties spécifiques de votre application, vous pouvez ajouter l'attribut `data-no-prefetch` aux éléments concernés :

```vue
<template>
  <!-- Cette navigation ne sera pas affectée par le préchargement par proximité -->
  <nav data-no-prefetch>
    <router-link to="/">Accueil</router-link>
    <router-link to="/about">À propos</router-link>
  </nav>
  
  <!-- Le reste de l'application utilisera le préchargement par proximité -->
</template>
```

## Considérations de performance

Le plugin Vite est conçu pour avoir un impact minimal sur les performances de votre application. Il utilise plusieurs techniques pour optimiser le préchargement :

- **Détection des interactions utilisateur** : Le préchargement ne s'active que lorsque l'utilisateur interagit avec la page
- **Limitation des requêtes** : Le nombre de préchargements simultanés est limité par l'option `maxPrefetch`
- **Optimisation des ressources** : Seuls les composants de route sont préchargés, pas les assets ou les données

## Exemple d'utilisation conditionnelle

```js
// vite.config.js ou vite.config.ts
export default defineConfig(({ mode, command }) => {
  const isDev = mode === 'development'
  const isProd = command === 'build'
  
  return {
    plugins: [
      vue(),
      // Uniquement activer le plugin en production
      isProd && viteProximityPrefetch({
        threshold: 250,
        predictionInterval: 50,
        maxPrefetch: 4,
        automaticPrefetch: true,
        debug: false
      })
    ].filter(Boolean) // Filtrer les plugins false/null/undefined
  }
})