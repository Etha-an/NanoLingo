# NanoLingo 🍡

Application web progressive (PWA) pour apprendre à **lire et écrire le japonais** :
hiragana, katakana, ~100 kanji du JLPT N5 et vocabulaire de base — façon Duolingo,
avec **tracé des caractères au doigt** (validation trait par trait et dans l'ordre)
et révisions par répétition espacée (SM-2).

100 % statique, 100 % hors-ligne une fois installée, aucune donnée ne quitte
l'appareil.

## Installation sur iPhone (sans App Store)

1. Ouvrir l'URL de l'app dans **Safari**.
2. Bouton **Partager** → **« Sur l'écran d'accueil »**.
3. L'app s'installe avec son icône et fonctionne ensuite hors-ligne.

## Développement

```bash
npm install
npm run build:strokes   # régénère public/strokes/ depuis les sources animCJK
npm run dev             # serveur local
npm run build           # build de production (tsc + vite)
```

Le contenu pédagogique vit dans `src/data/` (fichiers TypeScript statiques).
Après tout ajout de caractère, relancer `npm run build:strokes` (le script
télécharge `graphicsJa.txt` d'animCJK au besoin et échoue si un caractère
traçable n'a pas de données de traits).

Le déploiement est automatique : chaque push sur `main` publie sur GitHub Pages
via `.github/workflows/deploy.yml`.

## Données et licences

- **Tracés des caractères** : projet [animCJK](https://github.com/parsimonhi/animCJK)
  (format Make Me a Hanzi). Kana sous **LGPL v3+**, kanji dérivés des polices
  Arphic KaitiM sous **Arphic Public License** — textes dans
  [vendor/animcjk/licenses](vendor/animcjk/licenses/).
- **Moteur de tracé** : [hanzi-writer](https://hanziwriter.org) (MIT).
- **Contenu pédagogique** (romaji, sens français, découpage des leçons) : rédigé
  pour ce projet.
