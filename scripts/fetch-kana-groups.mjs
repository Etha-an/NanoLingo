// Extrait le regroupement officiel des traits kana depuis les SVG animCJK.
//
// Dans les SVG (svgsJaKana/{codepoint}.svg), chaque forme porte un id
// « z{cp}d{n}{lettre?} » : d2a/d2b/d2c sont les sous-formes du trait logique 2
// (traits auto-intersectants découpés pour le remplissage, animés ensemble).
// Le fichier graphicsJaKana.txt aplatit ces sous-formes en « traits » séparés
// et perd le regroupement — ce script le reconstitue une fois pour toutes dans
// vendor/animcjk/kana-stroke-groups.json (commité).
//
// Usage : node scripts/fetch-kana-groups.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KANA_SRC = join(ROOT, 'vendor', 'animcjk', 'graphicsJaKana.txt');
const OUT = join(ROOT, 'vendor', 'animcjk', 'kana-stroke-groups.json');

const chars = [];
for (const line of readFileSync(KANA_SRC, 'utf8').split('\n')) {
  const trimmed = line.trim();
  if (trimmed) chars.push(JSON.parse(trimmed));
}
console.log(`${chars.length} kana dans la source, récupération des SVG…`);

const groups = {};
const problems = [];
for (const entry of chars) {
  const cp = entry.character.codePointAt(0);
  const url = `https://raw.githubusercontent.com/parsimonhi/animCJK/master/svgsJaKana/${cp}.svg`;
  const res = await fetch(url);
  if (!res.ok) {
    problems.push(`${entry.character}: SVG introuvable (${res.status})`);
    continue;
  }
  const svg = await res.text();
  // Formes dans l'ordre du document : d1, d2a, d2b, …
  const suffixes = [...svg.matchAll(/id="z\d+d(\d+)([a-z]?)"/g)].map((m) => m[1]);
  if (suffixes.length !== entry.strokes.length) {
    problems.push(
      `${entry.character}: ${suffixes.length} formes SVG vs ${entry.strokes.length} traits txt`,
    );
    continue;
  }
  groups[entry.character] = suffixes;
}

writeFileSync(OUT, JSON.stringify(groups, null, 1));
const merged = Object.entries(groups).filter(([, g]) => new Set(g).size < g.length);
console.log(`${Object.keys(groups).length} caractères mappés → ${OUT}`);
console.log(
  `${merged.length} caractères avec sous-formes à fusionner : ${merged.map(([c]) => c).join(' ')}`,
);
if (problems.length) {
  console.error('PROBLÈMES :\n' + problems.join('\n'));
  process.exit(1);
}
