# API Reference

Cette section fournit une documentation détaillée de l'API de Vue Proximity Prefetch, couvrant le composant Vue, le plugin Vue et le plugin Vite.

## Vue d'ensemble

Vue Proximity Prefetch comprend les éléments suivants :

1. **Composant Vue** - `ProximityPrefetch`
   - Composant pour envelopper les parties de votre application qui bénéficieront du préchargement par proximité

2. **Plugin Vue** - `ProximityPrefetchPlugin` 
   - Plugin Vue qui enregistre le composant globalement

3. **Plugin Vite** - `viteProximityPrefetch`
   - Plugin Vite qui injecte automatiquement la fonctionnalité

## Importation

Vous pouvez importer les différentes parties de la bibliothèque comme suit :

```js
// Tout importer
import { ProximityPrefetch, ProximityPrefetchPlugin, viteProximityPrefetch } from 'v-proximity-prefetch'

// Importer uniquement ce dont vous avez besoin
import { ProximityPrefetch } from 'v-proximity-prefetch'
import { ProximityPrefetchPlugin } from 'v-proximity-prefetch'
import { viteProximityPrefetch } from 'v-proximity-prefetch'
```

## Types TypeScript

Vue Proximity Prefetch est entièrement typé et exporte les types suivants :

```ts
interface ProximityPrefetchOptions {
  threshold?: number;
  predictionInterval?: number;
  maxPrefetch?: number;
  automaticPrefetch?: boolean;
  debug?: boolean;
}

interface ProximityPrefetchProps {
  threshold?: number;
  predictionInterval?: number;
  debug?: boolean;
}
```

## API globale

En mode debug, Vue Proximity Prefetch expose certaines méthodes globales pour le débogage :

```js
// Activer le mode debug
window.PPF_DEBUG = true

// Accéder à l'instance du gestionnaire de préchargement (quand disponible)
window.__PPF_INSTANCE
```

Consultez les pages suivantes pour des détails spécifiques sur chaque partie de l'API.