# API du Composant

Cette page détaille l'API du composant `ProximityPrefetch`, y compris ses props, événements et slots.

## Utilisation de base

```vue
<template>
  <ProximityPrefetch>
    <router-view />
  </ProximityPrefetch>
</template>

<script setup>
import { ProximityPrefetch } from 'v-proximity-prefetch'
</script>
```

## Props

| Nom | Type | Défaut | Description |
|-----|------|--------|-------------|
| `threshold` | `number` | `200` | Distance en pixels à laquelle le préchargement se déclenche |
| `predictionInterval` | `number` | `0` | Intervalle en ms pour vérifier la proximité (0 = réactif) |
| `debug` | `boolean` | `false` | Activer les logs de débogage |

## Slots

| Nom | Description |
|-----|-------------|
| `default` | Contenu à envelopper avec la fonctionnalité de préchargement par proximité |

## Événements

Le composant n'émet pas d'événements directement, mais expose des logs de débogage lorsque l'option `debug` est activée.

## Utilisation avec TypeScript

Le composant est entièrement typé et vous pouvez importer ses types :

```ts
import { ProximityPrefetch, type ProximityPrefetchProps } from 'v-proximity-prefetch'

// Utiliser le type pour vos props
const prefetchProps: ProximityPrefetchProps = {
  threshold: 250,
  predictionInterval: 50,
  debug: true
}
```

## Fonctionnement interne

Le composant `ProximityPrefetch` utilise les hooks suivants pour gérer le préchargement :

### Cycle de vie

1. **Montage** : Ajoute les écouteurs d'événements de mouvement de souris
2. **Mise à jour** : Met à jour les paramètres de préchargement en fonction des props
3. **Démontage** : Supprime les écouteurs d'événements et nettoie les ressources

### Algorithme de préchargement

1. Lors d'un mouvement de souris, calcule la distance entre le curseur et tous les liens de navigation visibles
2. Si un lien est à une distance inférieure ou égale au `threshold`, précharge la route correspondante
3. Limite le nombre de préchargements simultanés pour éviter la surcharge

## Exemple avancé

```vue
<template>
  <header>
    <!-- Cette navigation ne sera pas affectée par le préchargement par proximité -->
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/about">À propos</router-link>
    </nav>
  </header>

  <main>
    <!-- Uniquement le contenu principal bénéficie du préchargement par proximité -->
    <ProximityPrefetch 
      :threshold="250" 
      :prediction-interval="50"
      :debug="process.env.NODE_ENV === 'development'"
    >
      <router-view />
      
      <!-- Les liens ici bénéficieront aussi du préchargement -->
      <nav class="footer-nav">
        <router-link to="/contact">Contact</router-link>
        <router-link to="/legal">Mentions légales</router-link>
      </nav>
    </ProximityPrefetch>
  </main>
</template>
```