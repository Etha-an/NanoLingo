// Filet de sécurité : export/import manuel de la progression en JSON.

import type { AppState, ProgressMap } from './db';
import { loadAppState, loadProgress, saveAppState, saveProgress } from './db';

interface Backup {
  nanolingo: 1;
  exportedAt: string;
  progress: ProgressMap;
  app: AppState;
}

export async function exportBackup(): Promise<void> {
  const backup: Backup = {
    nanolingo: 1,
    exportedAt: new Date().toISOString(),
    progress: await loadProgress(),
    app: await loadAppState(),
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nanolingo-sauvegarde-${backup.exportedAt.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importBackup(file: File): Promise<void> {
  const parsed = JSON.parse(await file.text()) as Partial<Backup>;
  if (parsed.nanolingo !== 1 || !parsed.progress || !parsed.app) {
    throw new Error('Fichier de sauvegarde invalide.');
  }
  await saveProgress(parsed.progress);
  await saveAppState(parsed.app);
}
