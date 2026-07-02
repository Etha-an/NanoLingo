import type { ItemId } from '../data/types';

/**
 * Un exercice d'une session (leçon, révision ou récap).
 * - intro      : flashcard de découverte (pas de notion d'échec)
 * - mcq        : QCM 4 choix — 'toLabel' (caractère → romaji/sens) ou
 *                'toChar' (romaji/sens → caractère)
 * - trace      : dessiner le caractère trait par trait
 * - typeRomaji : taper la lecture en lettres latines (clavier normal)
 * - typeKana   : taper le mot en kana avec le clavier japonais (items mûrs)
 */
export type Exercise =
  | { kind: 'intro'; itemId: ItemId }
  | { kind: 'mcq'; itemId: ItemId; direction: 'toLabel' | 'toChar'; choiceIds: ItemId[] }
  | { kind: 'trace'; itemId: ItemId; showOutline: boolean }
  | { kind: 'typeRomaji'; itemId: ItemId }
  | { kind: 'typeKana'; itemId: ItemId };

/** Résultat d'un exercice terminé (l'intro ne produit pas de résultat). */
export interface ExerciseOutcome {
  itemId: ItemId;
  correct: boolean;
  /** Pour le tracé : erreurs et indices. */
  mistakes?: number;
  usedHint?: boolean;
}
