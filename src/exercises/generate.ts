// Génération des files d'exercices pour les leçons et les révisions.

import type { ItemId, Lesson } from '../data/types';
import {
  allItems,
  displayChars,
  getItem,
  hasItem,
  primaryLabel,
  similarChars,
  type StudyItem,
} from '../data';
import type { ItemProgress } from '../srs/sm2';
import type { Exercise } from './types';

function shuffle<T>(array: T[]): T[] {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Un item est traçable s'il tient en un seul caractère avec données de traits. */
export function isTraceable(item: StudyItem, strokeChars: Set<string>): boolean {
  const chars = [...displayChars(item)];
  return chars.length === 1 && strokeChars.has(chars[0]);
}

/** La saisie en rōmaji n'a de sens que pour les kana et le vocabulaire
 * (un kanji seul a plusieurs lectures). */
export function isTypable(item: StudyItem): boolean {
  return item.type !== 'kanji';
}

// Les macrons (ō, ū…) ne se tapent pas sur un clavier normal : on accepte
// les équivalents usuels (kōhī → kohi, koohii, kouhii…).
const MACRON_VARIANTS: Record<string, string[]> = {
  ā: ['a', 'aa'],
  ē: ['e', 'ee', 'ei'],
  ī: ['i', 'ii'],
  ō: ['o', 'oo', 'ou'],
  ū: ['u', 'uu'],
};

/** Réponses rōmaji acceptées pour un item (en minuscules). */
export function romajiAnswers(item: StudyItem): Set<string> {
  const base = item.type === 'kanji' ? '' : item.romaji.toLowerCase();
  let forms = [''];
  for (const ch of base) {
    const variants = MACRON_VARIANTS[ch] ?? [ch];
    forms = forms.flatMap((prefix) => variants.map((v) => prefix + v));
  }
  const out = new Set(forms);
  if (item.type === 'kana' && item.char === 'を') out.add('o');
  if (item.type === 'kana' && item.char === 'ん') out.add('nn');
  return out;
}

/**
 * Choisit 3 distracteurs pour un QCM : d'abord les caractères visuellement
 * proches (similarity.ts), puis des items du même type/syllabaire. Exclut
 * tout item dont l'étiquette est identique à la réponse (ex : じ et ぢ = 'ji').
 */
function pickDistractors(target: StudyItem): ItemId[] {
  const targetLabel = primaryLabel(target);
  const targetChars = displayChars(target);

  const samePool = allItems().filter((candidate) => {
    if (candidate.id === target.id) return false;
    if (candidate.type !== target.type) return false;
    if (candidate.type === 'kana' && target.type === 'kana' && candidate.script !== target.script)
      return false;
    if (candidate.type === 'vocab' && target.type === 'vocab' && candidate.script !== target.script)
      return false;
    // Deux kanji partageant un sens (天/空 « ciel ») rendraient le QCM ambigu.
    if (
      candidate.type === 'kanji' &&
      target.type === 'kanji' &&
      candidate.meaningsFr.some((m) => target.meaningsFr.includes(m))
    )
      return false;
    if (primaryLabel(candidate) === targetLabel) return false;
    if (displayChars(candidate) === targetChars) return false;
    return true;
  });

  const similar = similarChars(targetChars);
  const confusable = samePool.filter((c) => similar.has(displayChars(c)));
  const rest = shuffle(samePool.filter((c) => !similar.has(displayChars(c))));

  const picked: StudyItem[] = [];
  const seenLabels = new Set([targetLabel]);
  const seenChars = new Set([targetChars]);
  for (const candidate of [...shuffle(confusable), ...rest]) {
    if (picked.length === 3) break;
    const label = primaryLabel(candidate);
    const chars = displayChars(candidate);
    if (seenLabels.has(label) || seenChars.has(chars)) continue;
    seenLabels.add(label);
    seenChars.add(chars);
    picked.push(candidate);
  }
  return picked.map((c) => c.id);
}

export function makeMcq(itemId: ItemId, direction: 'toLabel' | 'toChar'): Exercise {
  const target = getItem(itemId);
  return {
    kind: 'mcq',
    itemId,
    direction,
    choiceIds: shuffle([itemId, ...pickDistractors(target)]),
  };
}

/**
 * File d'exercices d'une leçon : découverte de chaque item, deux passes de
 * QCM (reconnaissance puis production), saisie de la lecture en rōmaji,
 * puis tracé des items traçables.
 */
export function generateLesson(lesson: Lesson, strokeChars: Set<string>): Exercise[] {
  const queue: Exercise[] = [];
  for (const itemId of lesson.newItemIds) {
    queue.push({ kind: 'intro', itemId });
  }
  for (const itemId of shuffle(lesson.newItemIds)) {
    queue.push(makeMcq(itemId, 'toLabel'));
  }
  for (const itemId of shuffle(lesson.newItemIds)) {
    queue.push(makeMcq(itemId, 'toChar'));
  }
  for (const itemId of shuffle(lesson.newItemIds)) {
    if (isTypable(getItem(itemId))) {
      queue.push({ kind: 'typeRomaji', itemId });
    }
  }
  for (const itemId of lesson.newItemIds) {
    if (isTraceable(getItem(itemId), strokeChars)) {
      queue.push({ kind: 'trace', itemId, showOutline: true });
    }
  }
  return queue;
}

/**
 * File de révision : pour chaque item dû, un exercice de reconnaissance
 * (QCM ou saisie rōmaji) ; les items mûrs (intervalle > 7 j) traçables sont
 * tracés SANS silhouette, et les mots mûrs se tapent au clavier japonais.
 */
export function generateReview(
  dueIds: ItemId[],
  progress: Record<ItemId, ItemProgress>,
  strokeChars: Set<string>,
): Exercise[] {
  const queue: Exercise[] = [];
  for (const itemId of dueIds) {
    const item = getItem(itemId);
    const mature = (progress[itemId]?.intervalDays ?? 0) > 7;
    if (isTraceable(item, strokeChars) && mature) {
      queue.push({ kind: 'trace', itemId, showOutline: false });
    } else {
      if (isTypable(item) && Math.random() < 0.5) {
        queue.push({ kind: 'typeRomaji', itemId });
      } else {
        queue.push(makeMcq(itemId, Math.random() < 0.5 ? 'toLabel' : 'toChar'));
      }
      if (isTraceable(item, strokeChars)) {
        queue.push({ kind: 'trace', itemId, showOutline: true });
      }
    }
    if (item.type === 'vocab' && mature) {
      queue.push({ kind: 'typeKana', itemId });
    }
  }
  return shuffle(queue);
}

/**
 * Leçon récap : `count` items tirés au hasard parmi ceux déjà appris, avec
 * pour chacun un exercice de reconnaissance et, si possible, un exercice de
 * production (tracé, ou frappe au clavier japonais pour les mots mûrs).
 */
export function generateRecap(
  progress: Record<ItemId, ItemProgress>,
  strokeChars: Set<string>,
  count = 10,
): Exercise[] {
  const learnedIds = Object.keys(progress).filter(hasItem);
  const picked = shuffle(learnedIds).slice(0, count);
  const queue: Exercise[] = [];
  for (const itemId of picked) {
    const item = getItem(itemId);
    const mature = (progress[itemId]?.intervalDays ?? 0) > 7;
    if (isTypable(item) && Math.random() < 0.5) {
      queue.push({ kind: 'typeRomaji', itemId });
    } else {
      queue.push(makeMcq(itemId, Math.random() < 0.5 ? 'toLabel' : 'toChar'));
    }
    if (item.type === 'vocab' && mature) {
      queue.push({ kind: 'typeKana', itemId });
    } else if (isTraceable(item, strokeChars)) {
      queue.push({ kind: 'trace', itemId, showOutline: !mature });
    }
  }
  return shuffle(queue);
}
