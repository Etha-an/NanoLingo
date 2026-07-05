import { useEffect, useMemo, useState } from 'react';
import { getItem, getLesson, hasItem, setDisplayContext } from './data';
import {
  generateKeyboardLesson,
  generateLesson,
  generatePractice,
  generateRecap,
  generateReview,
} from './exercises/generate';
import type { ExerciseOutcome } from './exercises/types';
import { hasJapaneseVoice } from './audio/tts';
import { setSfxEnabled } from './audio/sfx';
import {
  applyReview,
  dueItemIds,
  initialProgress,
  qualityFromOutcome,
  type Quality,
} from './srs/sm2';
import {
  bumpStreak,
  effectiveStreak,
  loadAppState,
  loadProgress,
  recordActivity,
  requestPersistence,
  saveAppState,
  saveProgress,
  type AppState,
  type ProgressMap,
} from './storage/db';
import { loadStrokeManifest } from './strokes';
import ExerciseRunner from './components/ExerciseRunner';
import DictionaryScreen from './screens/DictionaryScreen';
import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import SummaryScreen from './screens/SummaryScreen';

type Screen =
  | { name: 'home' }
  | { name: 'lesson'; lessonId: string }
  | { name: 'review' }
  | { name: 'recap' }
  | { name: 'practice'; itemIds: string[] }
  | { name: 'keyboard' }
  | { name: 'dictionary' }
  | { name: 'stats' }
  | { name: 'summary'; xpGained: number; mistakes: number };

/** Items dus dont le contenu existe encore (ignore la progression orpheline). */
function knownDueIds(progress: ProgressMap): string[] {
  return dueItemIds(progress, Date.now(), Number.MAX_SAFE_INTEGER).filter(hasItem);
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState<Screen>({ name: 'home' });
  const [progress, setProgress] = useState<ProgressMap>({});
  const [app, setApp] = useState<AppState | null>(null);
  const [strokeChars, setStrokeChars] = useState<Set<string>>(new Set());

  useEffect(() => {
    Promise.all([loadProgress(), loadAppState(), loadStrokeManifest()]).then(
      ([storedProgress, storedApp, manifest]) => {
        setProgress(storedProgress);
        setApp(storedApp);
        setStrokeChars(manifest);
        setReady(true);
        requestPersistence();
      },
    );
  }, []);

  const commit = (nextProgress: ProgressMap, nextApp: AppState) => {
    setProgress(nextProgress);
    setApp(nextApp);
    void saveProgress(nextProgress);
    void saveAppState(nextApp);
  };

  const reloadFromDb = () => {
    // Recharge sans changer d'écran : le message « Sauvegarde restaurée ✓ »
    // de l'écran stats reste visible.
    Promise.all([loadProgress(), loadAppState()]).then(([p, a]) => {
      setProgress(p);
      setApp(a);
    });
  };

  // Contexte d'affichage : graphies kanji débloquées et mots mûrs (furigana).
  useMemo(() => {
    const learnedKanji = new Set<string>();
    const matureVocab = new Set<string>();
    for (const [id, entry] of Object.entries(progress)) {
      if (!hasItem(id)) continue;
      const item = getItem(id);
      if (item.type === 'kanji') learnedKanji.add(item.char);
      if (item.type === 'vocab' && entry.intervalDays > 7) matureVocab.add(id);
    }
    setDisplayContext(learnedKanji, matureVocab);
  }, [progress]);

  const listenOk = (app?.settings.ttsEnabled ?? false) && hasJapaneseVoice();
  setSfxEnabled(app?.settings.sfxEnabled ?? true);

  // File d'exercices de la session en cours (leçon, révision, récap, entraînement).
  const sessionExercises = useMemo(() => {
    if (!ready) return [];
    if (screen.name === 'lesson') {
      return generateLesson(getLesson(screen.lessonId), strokeChars, listenOk);
    }
    if (screen.name === 'review') {
      return generateReview(knownDueIds(progress).slice(0, 20), progress, strokeChars, listenOk);
    }
    if (screen.name === 'recap') {
      return generateRecap(progress, strokeChars, listenOk);
    }
    if (screen.name === 'practice') {
      return generatePractice(screen.itemIds, progress, strokeChars, listenOk);
    }
    if (screen.name === 'keyboard') {
      return generateKeyboardLesson();
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, screen, strokeChars]);

  if (!ready || !app) {
    return <div className="loading">Chargement…</div>;
  }

  const finishLesson = (lessonId: string, outcomes: ExerciseOutcome[]) => {
    const now = Date.now();
    const lesson = getLesson(lessonId);
    const mistakes = outcomes.filter((o) => !o.correct).length;

    const nextProgress = { ...progress };
    for (const itemId of lesson.newItemIds) {
      if (!nextProgress[itemId]) nextProgress[itemId] = initialProgress(itemId, now);
    }

    const alreadyDone = app.completedLessonIds.includes(lessonId);
    const xpGained = (alreadyDone ? 10 : 20) + Math.max(0, 10 - 2 * mistakes);
    const nextApp: AppState = {
      ...app,
      completedLessonIds: alreadyDone
        ? app.completedLessonIds
        : [...app.completedLessonIds, lessonId],
      xp: app.xp + xpGained,
      streak: bumpStreak(app.streak),
      activity: recordActivity(app.activity, xpGained),
    };
    commit(nextProgress, nextApp);
    setScreen({ name: 'summary', xpGained, mistakes });
  };

  // Entraînement libre : XP symbolique, aucun impact sur le planning SRS
  // (sinon s'entraîner « tricherait » la répétition espacée).
  const finishPractice = (outcomes: ExerciseOutcome[]) => {
    const mistakes = outcomes.filter((o) => !o.correct).length;
    const xpGained = Math.max(2, outcomes.filter((o) => o.correct).length);
    const nextApp: AppState = {
      ...app!,
      xp: app!.xp + xpGained,
      streak: bumpStreak(app!.streak),
      activity: recordActivity(app!.activity, xpGained),
    };
    commit(progress, nextApp);
    setScreen({ name: 'summary', xpGained, mistakes });
  };

  const finishReview = (outcomes: ExerciseOutcome[]) => {
    const now = Date.now();
    // Qualité par item = la moins bonne de ses réponses de première tentative.
    const qualityByItem = new Map<string, Quality>();
    for (const outcome of outcomes) {
      const q = qualityFromOutcome(outcome);
      const previous = qualityByItem.get(outcome.itemId);
      if (previous === undefined || q < previous) qualityByItem.set(outcome.itemId, q);
    }
    const nextProgress = { ...progress };
    for (const [itemId, q] of qualityByItem) {
      const entry = nextProgress[itemId];
      // Seuls les items réellement DUS avancent dans le planning : une récap
      // qui ressort un item appris hier ne doit pas gonfler son intervalle
      // (réviser en avance ne prouve pas la rétention espacée).
      if (entry && entry.dueAt <= now) nextProgress[itemId] = applyReview(entry, q, now);
    }
    const mistakes = outcomes.filter((o) => !o.correct).length;
    const xpGained = Math.max(5, qualityByItem.size * 2 - 2 * mistakes);
    const nextApp: AppState = {
      ...app,
      xp: app.xp + xpGained,
      streak: bumpStreak(app.streak),
      activity: recordActivity(app.activity, xpGained),
    };
    commit(nextProgress, nextApp);
    setScreen({ name: 'summary', xpGained, mistakes });
  };

  switch (screen.name) {
    case 'home':
      return (
        <HomeScreen
          completedLessonIds={app.completedLessonIds}
          xp={app.xp}
          streak={effectiveStreak(app.streak)}
          dueCount={knownDueIds(progress).length}
          learnedCount={Object.keys(progress).filter(hasItem).length}
          onOpenLesson={(lessonId) => setScreen({ name: 'lesson', lessonId })}
          onOpenReview={() => setScreen({ name: 'review' })}
          onOpenRecap={() => setScreen({ name: 'recap' })}
          onOpenKeyboard={() => setScreen({ name: 'keyboard' })}
          onOpenDictionary={() => setScreen({ name: 'dictionary' })}
          onOpenStats={() => setScreen({ name: 'stats' })}
        />
      );
    case 'lesson':
    case 'review':
    case 'recap':
    case 'practice':
    case 'keyboard':
      return (
        <ExerciseRunner
          key={screen.name === 'lesson' ? screen.lessonId : screen.name}
          exercises={sessionExercises}
          strokeChars={strokeChars}
          ttsEnabled={app.settings.ttsEnabled}
          onFinish={(outcomes) =>
            screen.name === 'lesson'
              ? finishLesson(screen.lessonId, outcomes)
              : screen.name === 'practice' || screen.name === 'keyboard'
                ? finishPractice(outcomes)
                : finishReview(outcomes)
          }
          onQuit={() => setScreen({ name: 'home' })}
        />
      );
    case 'dictionary':
      return (
        <DictionaryScreen
          progress={progress}
          strokeChars={strokeChars}
          ttsEnabled={app.settings.ttsEnabled}
          onPractice={(itemIds) => setScreen({ name: 'practice', itemIds })}
          onBack={() => setScreen({ name: 'home' })}
        />
      );
    case 'stats':
      return (
        <StatsScreen
          app={app}
          progress={progress}
          onToggleTts={() =>
            commit(progress, {
              ...app,
              settings: { ...app.settings, ttsEnabled: !app.settings.ttsEnabled },
            })
          }
          onToggleSfx={() =>
            commit(progress, {
              ...app,
              settings: { ...app.settings, sfxEnabled: !app.settings.sfxEnabled },
            })
          }
          onImported={reloadFromDb}
          onBack={() => setScreen({ name: 'home' })}
        />
      );
    case 'summary':
      return (
        <SummaryScreen
          xpGained={screen.xpGained}
          mistakes={screen.mistakes}
          onContinue={() => setScreen({ name: 'home' })}
        />
      );
  }
}
