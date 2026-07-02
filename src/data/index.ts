// Registre unifié du contenu pédagogique.

import type { ItemId, KanaItem, KanjiItem, Lesson, Unit, VocabItem } from './types';
import { HIRAGANA } from './hiragana';
import { KATAKANA } from './katakana';
import { KANJI_N5 } from './kanji-n5';
import { VOCAB } from './vocab';
import { UNITS } from './units';
import { SIMILAR_GROUPS } from './similarity';

export type StudyItem =
  | ({ type: 'kana' } & KanaItem)
  | ({ type: 'kanji' } & KanjiItem)
  | ({ type: 'vocab' } & VocabItem);

const registry = new Map<ItemId, StudyItem>();
for (const item of HIRAGANA) registry.set(item.id, { type: 'kana', ...item });
for (const item of KATAKANA) registry.set(item.id, { type: 'kana', ...item });
for (const item of KANJI_N5) registry.set(item.id, { type: 'kanji', ...item });
for (const item of VOCAB) registry.set(item.id, { type: 'vocab', ...item });

/** Un item peut disparaître du contenu (ex : sauvegarde restaurée après une
 * mise à jour) — la progression orpheline doit être ignorée, pas planter. */
export function hasItem(id: ItemId): boolean {
  return registry.has(id);
}

export function getItem(id: ItemId): StudyItem {
  const item = registry.get(id);
  if (!item) throw new Error(`Item inconnu : ${id}`);
  return item;
}

export function allItems(): StudyItem[] {
  return [...registry.values()];
}

/** Le(s) caractère(s) affiché(s) en grand pour cet item. */
export function displayChars(item: StudyItem): string {
  return item.type === 'vocab' ? item.kana : item.char;
}

// ---- Contexte d'affichage : graphies kanji du vocabulaire ----
// Un mot s'affiche en kanji (水, 名前…) une fois tous ses kanji appris,
// avec furigana tant que le mot n'est pas mûr. Le contexte est poussé par
// App à chaque changement de progression.

let learnedKanjiChars = new Set<string>();
let matureVocabIds = new Set<ItemId>();

export function setDisplayContext(learnedKanji: Set<string>, matureVocab: Set<ItemId>): void {
  learnedKanjiChars = learnedKanji;
  matureVocabIds = matureVocab;
}

function isKanjiChar(c: string): boolean {
  const cp = c.codePointAt(0)!;
  return cp >= 0x4e00 && cp <= 0x9fff;
}

export interface DisplayParts {
  main: string;
  /** Lecture en kana à afficher au-dessus (null : pas de furigana). */
  furigana: string | null;
}

export function displayParts(item: StudyItem): DisplayParts {
  if (item.type === 'vocab' && item.kanji) {
    const unlocked = [...item.kanji]
      .filter(isKanjiChar)
      .every((c) => learnedKanjiChars.has(c));
    if (unlocked) {
      return { main: item.kanji, furigana: matureVocabIds.has(item.id) ? null : item.kana };
    }
  }
  return { main: displayChars(item), furigana: null };
}

/** L'étiquette « réponse » : romaji pour les kana, sens pour kanji/vocab. */
export function primaryLabel(item: StudyItem): string {
  switch (item.type) {
    case 'kana':
      return item.romaji;
    case 'kanji':
      return item.meaningsFr.join(', ');
    case 'vocab':
      return item.meaningFr;
  }
}

/** Détail secondaire montré sur la flashcard d'intro. */
export function secondaryLabel(item: StudyItem): string | null {
  switch (item.type) {
    case 'kana':
      return null;
    case 'kanji': {
      const on = item.onyomi.length > 0 ? `on : ${item.onyomi.join('・')}` : null;
      const kun = item.kunyomi.length > 0 ? `kun : ${item.kunyomi.join('・')}` : null;
      return [on, kun].filter(Boolean).join(' — ') || null;
    }
    case 'vocab':
      return item.romaji;
  }
}

/** Texte à prononcer par le TTS. */
export function spokenText(item: StudyItem): string {
  return item.type === 'vocab' ? item.kana : item.char;
}

// Ordre linéaire global des leçons (déverrouillage façon Duolingo).
export const ALL_LESSONS: Lesson[] = UNITS.flatMap((u) => u.lessons);
const lessonById = new Map(ALL_LESSONS.map((l) => [l.id, l]));

export function getLesson(lessonId: string): Lesson {
  const lesson = lessonById.get(lessonId);
  if (!lesson) throw new Error(`Leçon inconnue : ${lessonId}`);
  return lesson;
}

export function getUnits(): Unit[] {
  return UNITS;
}

// Groupes de caractères visuellement proches → index char → voisins.
const similarByChar = new Map<string, Set<string>>();
for (const group of SIMILAR_GROUPS) {
  for (const char of group) {
    let neighbors = similarByChar.get(char);
    if (!neighbors) {
      neighbors = new Set();
      similarByChar.set(char, neighbors);
    }
    for (const other of group) {
      if (other !== char) neighbors.add(other);
    }
  }
}

export function similarChars(char: string): Set<string> {
  return similarByChar.get(char) ?? new Set();
}
