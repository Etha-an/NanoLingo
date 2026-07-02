import { useEffect, useMemo, useState } from 'react';
import { getLesson } from './data';
import { generateLesson, generateReview } from './exercises/generate';
import type { ExerciseOutcome } from './exercises/types';
import {
  applyReview,
  dueCount,
  dueItemIds,
  initialProgress,
  qualityFromOutcome,
  type Quality,
} from './srs/sm2';
import {
  bumpStreak,
  loadAppState,
  loadProgress,
  requestPersistence,
  saveAppState,
  saveProgress,
  type AppState,
  type ProgressMap,
} from './storage/db';
import { loadStrokeManifest } from './strokes';
import ExerciseRunner from './components/ExerciseRunner';
import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import SummaryScreen from './screens/SummaryScreen';

type Screen =
  | { name: 'home' }
  | { name: 'lesson'; lessonId: string }
  | { name: 'review' }
  | { name: 'stats' }
  | { name: 'summary'; xpGained: number; mistakes: number };

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
    Promise.all([loadProgress(), loadAppState()]).then(([p, a]) => {
      setProgress(p);
      setApp(a);
      setScreen({ name: 'home' });
    });
  };

  // File d'exercices de la session en cours (leçon ou révision).
  const sessionExercises = useMemo(() => {
    if (!ready) return [];
    if (screen.name === 'lesson') {
      return generateLesson(getLesson(screen.lessonId), strokeChars);
    }
    if (screen.name === 'review') {
      return generateReview(dueItemIds(progress, Date.now()), progress, strokeChars);
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
    };
    commit(nextProgress, nextApp);
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
      if (entry) nextProgress[itemId] = applyReview(entry, q, now);
    }
    const mistakes = outcomes.filter((o) => !o.correct).length;
    const xpGained = Math.max(5, qualityByItem.size * 2 - 2 * mistakes);
    const nextApp: AppState = {
      ...app,
      xp: app.xp + xpGained,
      streak: bumpStreak(app.streak),
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
          streak={app.streak.current}
          dueCount={dueCount(progress, Date.now())}
          onOpenLesson={(lessonId) => setScreen({ name: 'lesson', lessonId })}
          onOpenReview={() => setScreen({ name: 'review' })}
          onOpenStats={() => setScreen({ name: 'stats' })}
        />
      );
    case 'lesson':
    case 'review':
      return (
        <ExerciseRunner
          key={screen.name === 'lesson' ? screen.lessonId : 'review'}
          exercises={sessionExercises}
          strokeChars={strokeChars}
          ttsEnabled={app.settings.ttsEnabled}
          onFinish={(outcomes) =>
            screen.name === 'lesson' ? finishLesson(screen.lessonId, outcomes) : finishReview(outcomes)
          }
          onQuit={() => setScreen({ name: 'home' })}
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
