// Persistance locale : IndexedDB via idb-keyval. Deux clés :
//   'progress' : Record<ItemId, ItemProgress> (état SRS par item)
//   'app'      : AppState (leçons finies, XP, streak, réglages)

import { get, set } from 'idb-keyval';
import type { ItemId } from '../data/types';
import type { ItemProgress } from '../srs/sm2';

export interface AppState {
  completedLessonIds: string[];
  xp: number;
  streak: {
    current: number;
    best: number;
    /** Jour local 'YYYY-MM-DD' de la dernière activité. */
    lastActiveDay: string;
  };
  settings: {
    ttsEnabled: boolean;
  };
}

export type ProgressMap = Record<ItemId, ItemProgress>;

export const DEFAULT_APP_STATE: AppState = {
  completedLessonIds: [],
  xp: 0,
  streak: { current: 0, best: 0, lastActiveDay: '' },
  settings: { ttsEnabled: true },
};

export function localDay(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Met à jour la flamme après une session d'étude réussie. */
export function bumpStreak(streak: AppState['streak'], today = localDay()): AppState['streak'] {
  if (streak.lastActiveDay === today) return streak;
  const yesterday = localDay(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const current = streak.lastActiveDay === yesterday ? streak.current + 1 : 1;
  return { current, best: Math.max(streak.best, current), lastActiveDay: today };
}

export async function loadProgress(): Promise<ProgressMap> {
  return (await get<ProgressMap>('progress')) ?? {};
}

export async function loadAppState(): Promise<AppState> {
  const stored = await get<AppState>('app');
  if (!stored) return DEFAULT_APP_STATE;
  // Tolère les états d'anciennes versions (champs manquants).
  return {
    ...DEFAULT_APP_STATE,
    ...stored,
    streak: { ...DEFAULT_APP_STATE.streak, ...stored.streak },
    settings: { ...DEFAULT_APP_STATE.settings, ...stored.settings },
  };
}

export function saveProgress(progress: ProgressMap): Promise<void> {
  return set('progress', progress);
}

export function saveAppState(app: AppState): Promise<void> {
  return set('app', app);
}

/**
 * Demande au navigateur de protéger le stockage de l'éviction
 * (Safari iOS 17+). Sans effet si non supporté.
 */
export function requestPersistence(): void {
  navigator.storage?.persist?.().catch(() => undefined);
}
