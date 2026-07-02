// Génère public/strokes/u{codepoint}.json (format Make Me a Hanzi, consommé par
// hanzi-writer) + public/strokes-manifest.json à partir des sources animCJK :
//   - vendor/animcjk/graphicsJaKana.txt  (kana, commité)
//   - vendor/animcjk/graphicsJa.txt      (kanji, 22 Mo, gitignoré — téléchargé au besoin)
// Les caractères nécessaires sont extraits des fichiers de contenu src/data/*.ts.
// Règle d'échec : tout caractère UNIQUE d'un champ `char:` (item traçable) sans
// données de traits fait échouer le build ; les autres caractères manquants
// (vocabulaire, titres, groupes de similarité) ne produisent qu'un avertissement.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'src', 'data');
const OUT_DIR = join(ROOT, 'public', 'strokes');
const KANA_SRC = join(ROOT, 'vendor', 'animcjk', 'graphicsJaKana.txt');
const KANJI_SRC = join(ROOT, 'vendor', 'animcjk', 'graphicsJa.txt');
const KANJI_URL = 'https://raw.githubusercontent.com/parsimonhi/animCJK/master/graphicsJa.txt';

// Exclut les signes non traçables des plages kana : ゛゜ゝゞ (309b-309e), ・ーヽヾ (30fb-30fe).
const isKana = (cp) =>
  ((cp >= 0x3041 && cp <= 0x309f) || (cp >= 0x30a0 && cp <= 0x30ff)) &&
  !(cp >= 0x309b && cp <= 0x309e) &&
  !(cp >= 0x30fb && cp <= 0x30fe);
const isKanji = (cp) => cp >= 0x4e00 && cp <= 0x9fff;
const isCjk = (cp) => isKana(cp) || isKanji(cp);

// 1. Collecte des caractères nécessaires dans le contenu.
const required = new Set(); // caractères d'items traçables (char: 'X' à 1 caractère)
const wanted = new Set(); // tout caractère CJK apparaissant dans src/data/*.ts
for (const file of readdirSync(DATA_DIR).filter((f) => f.endsWith('.ts'))) {
  const text = readFileSync(join(DATA_DIR, file), 'utf8');
  for (const ch of text) {
    if (isCjk(ch.codePointAt(0))) wanted.add(ch);
  }
  for (const m of text.matchAll(/char:\s*'([^']+)'/g)) {
    const value = [...m[1]];
    if (value.length === 1 && isCjk(value[0].codePointAt(0))) required.add(value[0]);
  }
}
if (wanted.size === 0) {
  console.error('Aucun caractère trouvé dans src/data/*.ts — rien à faire.');
  process.exit(1);
}

// 2. Téléchargement de la source kanji si nécessaire.
const needsKanji = [...wanted].some((ch) => isKanji(ch.codePointAt(0)));
if (needsKanji && !existsSync(KANJI_SRC)) {
  console.log(`Téléchargement de graphicsJa.txt (~22 Mo) depuis ${KANJI_URL}…`);
  const res = await fetch(KANJI_URL);
  if (!res.ok) {
    console.error(`Échec du téléchargement (${res.status}).`);
    process.exit(1);
  }
  writeFileSync(KANJI_SRC, Buffer.from(await res.arrayBuffer()));
}

// 3. Indexation des sources (1 ligne JSON par caractère).
//
// Les traits qui s'auto-intersectent (boucles de あ, ぬ, め…) sont découpés
// par animCJK en plusieurs FORMES (d2a/d2b/d2c dans leurs SVG) animées
// simultanément : c'est UN seul trait logique. Le .txt aplati perd ce
// regroupement — il est reconstitué depuis les SVG officiels dans
// vendor/animcjk/kana-stroke-groups.json (voir scripts/fetch-kana-groups.mjs).
// Fusion : contours concaténés ; médiane de la première sous-forme conservée
// (c'est le vrai chemin du stylo, les suivantes sont des variantes de
// synchronisation d'animation qui partagent la même queue de points).
const KANA_GROUPS = JSON.parse(
  readFileSync(join(ROOT, 'vendor', 'animcjk', 'kana-stroke-groups.json'), 'utf8'),
);

const tailsMatch = (a, b, n = 2) =>
  a.length >= n && b.length >= n && a.slice(-n).flat().join() === b.slice(-n).flat().join();

function mergeSubStrokes(entry) {
  const groups = KANA_GROUPS[entry.character];
  if (!groups || groups.length !== entry.strokes.length) {
    // Pas de regroupement connu (kanji) : signature de sous-forme dupliquée
    // par sécurité — même nombre de points et queue identique au trait
    // précédent (jamais observé dans graphicsJa.txt à ce jour).
    const strokes = [];
    const medians = [];
    for (let i = 0; i < entry.medians.length; i++) {
      const prev = medians[medians.length - 1];
      if (
        prev &&
        prev.length === entry.medians[i].length &&
        tailsMatch(prev, entry.medians[i])
      ) {
        console.warn(`fusion heuristique d'une sous-forme dans ${entry.character}`);
        strokes[strokes.length - 1] += ' ' + entry.strokes[i];
      } else {
        strokes.push(entry.strokes[i]);
        medians.push(entry.medians[i]);
      }
    }
    return { character: entry.character, strokes, medians };
  }

  const strokes = [];
  const medians = [];
  for (let i = 0; i < entry.strokes.length; i++) {
    if (i > 0 && groups[i] === groups[i - 1]) {
      strokes[strokes.length - 1] += ' ' + entry.strokes[i];
      if (!tailsMatch(medians[medians.length - 1], entry.medians[i])) {
        console.warn(
          `⚠ ${entry.character} : la sous-forme ${i + 1} (trait ${groups[i]}) n'a pas la queue attendue — médiane à contrôler`,
        );
      }
    } else {
      strokes.push(entry.strokes[i]);
      medians.push(entry.medians[i]);
    }
  }
  return { character: entry.character, strokes, medians };
}

const index = new Map(); // char -> { character, strokes, medians }
function indexSource(path) {
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const entry = JSON.parse(trimmed);
    if (wanted.has(entry.character)) {
      index.set(entry.character, mergeSubStrokes(entry));
    }
  }
}
indexSource(KANA_SRC);
if (needsKanji) indexSource(KANJI_SRC);

// 4. Écriture des JSON individuels + manifest.
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });
const available = [];
const missing = [];
for (const ch of [...wanted].sort()) {
  const entry = index.get(ch);
  if (!entry) {
    missing.push(ch);
    continue;
  }
  const name = `u${ch.codePointAt(0).toString(16)}.json`;
  writeFileSync(join(OUT_DIR, name), JSON.stringify(entry));
  available.push(ch);
}
writeFileSync(
  join(ROOT, 'public', 'strokes-manifest.json'),
  JSON.stringify({ chars: available }),
);

// 5. Rapport.
const missingRequired = missing.filter((ch) => required.has(ch));
console.log(`${available.length} caractères écrits dans public/strokes/ (manifest inclus).`);
if (missing.length > 0) {
  console.warn(`Sans données de traits (${missing.length}) : ${missing.join(' ')}`);
}
if (missingRequired.length > 0) {
  console.error(
    `ERREUR : items traçables sans données de traits : ${missingRequired.join(' ')}`,
  );
  process.exit(1);
}
