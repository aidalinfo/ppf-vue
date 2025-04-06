# Documentation de Vue Proximity Prefetch

Ce dossier contient la documentation de Vue Proximity Prefetch générée avec [VuePress v2](https://v2.vuepress.vuejs.org/).

## Structure

```
docs/
├── src/               # Source de la documentation
│   ├── .vuepress/     # Configuration VuePress
│   ├── README.md      # Page d'accueil
│   ├── guide/         # Guide d'utilisation
│   ├── configuration/ # Options de configuration
│   ├── api/           # Référence API
│   └── public/        # Ressources statiques
└── package.json       # Dépendances et scripts
```

## Développement local

Pour démarrer le serveur de développement VuePress :

```bash
# À partir de la racine du monorepo
pnpm docs:dev

# Ou dans le dossier packages/docs
pnpm docs:dev
```

Le site de documentation sera accessible à l'adresse [http://localhost:8080/](http://localhost:8080/).

## Construction

Pour construire la version statique de la documentation :

```bash
# À partir de la racine du monorepo
pnpm docs:build

# Ou dans le dossier packages/docs
pnpm docs:build
```

Les fichiers générés seront disponibles dans le dossier `src/.vuepress/dist/`.

## Enrichir la documentation

### Ajouter une nouvelle page

1. Créez un nouveau fichier Markdown dans le dossier approprié (guide, configuration ou api)
2. Mettez à jour le fichier `.vuepress/config.ts` pour inclure la nouvelle page dans la barre latérale

### Ajouter des images

Placez les images dans le dossier `src/public/images/` et référencez-les dans vos fichiers Markdown comme suit :

```markdown
![Description de l'image](/images/nom-image.png)
```

### Syntaxe VuePress spécifique

VuePress offre des fonctionnalités markdown étendues comme :

```markdown
::: tip
Ceci est un bloc de conseil
:::

::: warning
Ceci est un avertissement
:::

::: danger
Ceci est un danger
:::

::: details
Ceci est un bloc dépliable
:::
```