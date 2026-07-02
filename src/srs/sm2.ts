// Répétition espacée : SM-2 simplifié.
// Qualité q d'une réponse : 5 = parfait, 4 = bien (peu d'erreurs),
// 3 = laborieux (indices), 1 = raté. q < 3 remet l'item à zéro.

import type { ItemId } from '../data/types';

export interface ItemProgress {
  itemId: ItemId;
  /** Répétitions réussies consécutives. */
  reps: number;
  /** Facteur de facilité SM-2 (départ 2.5, plancher 1.3). */
  ease: number;
  intervalDays: number;
  /** Timestamp (ms) de la prochaine révision. */
  dueAt: number;
  /** Nombre d'oublis (q < 3). */
  lapses: number;
  lastReviewedAt: number;
}

export type Quality = 1 | 3 | 4 | 5;

const DAY_MS = 24 * 60 * 60 * 1000;
export const START_EASE = 2.5;
export const MIN_EASE = 1.3;

/** Progression initiale d'un item qui vient d'être appris : révision demain. */
export function initialProgress(itemId: ItemId, now: number): ItemProgress {
  return {
    itemId,
    reps: 1,
    ease: START_EASE,
    intervalDays: 1,
    dueAt: now + DAY_MS,
    lapses: 0,
    lastReviewedAt: now,
  };
}

export function applyReview(p: ItemProgress, q: Quality, now: number): ItemProgress {
  if (q < 3) {
    return {
      ...p,
      reps: 0,
      intervalDays: 0,
      dueAt: now, // re-proposé immédiatement à la prochaine session
      lapses: p.lapses + 1,
      ease: Math.max(MIN_EASE, p.ease - 0.2),
      lastReviewedAt: now,
    };
  }
  const ease = Math.max(MIN_EASE, p.ease + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  const reps = p.reps + 1;
  const intervalDays = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(p.intervalDays * ease);
  return {
    ...p,
    reps,
    ease,
    intervalDays,
    dueAt: now + intervalDays * DAY_MS,
    lapses: p.lapses,
    lastReviewedAt: now,
  };
}

/** Items dus, les plus en retard d'abord, plafonnés. */
export function dueItemIds(
  progress: Record<ItemId, ItemProgress>,
  now: number,
  cap = 20,
): ItemId[] {
  return Object.values(progress)
    .filter((p) => p.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt)
    .slice(0, cap)
    .map((p) => p.itemId);
}

/** Nombre d'items dus (pour la pastille de l'écran d'accueil). */
export function dueCount(progress: Record<ItemId, ItemProgress>, now: number): number {
  return Object.values(progress).filter((p) => p.dueAt <= now).length;
}

/** Item considéré « acquis » : intervalle d'au moins 21 jours. */
export function isMastered(p: ItemProgress): boolean {
  return p.intervalDays >= 21;
}

/** Qualité SM-2 d'un résultat d'exercice. */
export function qualityFromOutcome(outcome: {
  correct: boolean;
  mistakes?: number;
  usedHint?: boolean;
}): Quality {
  if (!outcome.correct) return 1;
  if (outcome.usedHint) return 3;
  if ((outcome.mistakes ?? 0) > 2) return 3;
  if ((outcome.mistakes ?? 0) > 0) return 4;
  return 5;
}
