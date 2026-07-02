import { useState } from 'react';
import type { Exercise, ExerciseOutcome } from '../exercises/types';
import { makeMcq } from '../exercises/generate';
import { getItem, primaryLabel, displayChars } from '../data';
import Flashcard from './Flashcard';
import Mcq from './Mcq';
import StrokeQuiz from './StrokeQuiz';

interface Props {
  exercises: Exercise[];
  strokeChars: Set<string>;
  ttsEnabled: boolean;
  /** Résultats de PREMIÈRE tentative, un par exercice (hors intros). */
  onFinish: (outcomes: ExerciseOutcome[]) => void;
  onQuit: () => void;
}

type QueueEntry = Exercise & { isRetry?: boolean };

interface TraceDone {
  mistakes: number;
  usedHint: boolean;
}

/**
 * Déroule une file d'exercices : les erreurs de QCM sont ré-empilées en fin
 * de file (l'utilisateur doit finir sur un succès), mais seul le résultat de
 * la première tentative compte pour la répétition espacée.
 */
export default function ExerciseRunner({
  exercises,
  strokeChars,
  ttsEnabled,
  onFinish,
  onQuit,
}: Props) {
  const [queue, setQueue] = useState<QueueEntry[]>(exercises);
  const [idx, setIdx] = useState(0);
  const [outcomes, setOutcomes] = useState<ExerciseOutcome[]>([]);
  const [traceDone, setTraceDone] = useState<TraceDone | null>(null);

  const current = queue[idx];
  const progressPct = Math.round((idx / queue.length) * 100);

  const advance = (nextQueue: QueueEntry[], nextOutcomes: ExerciseOutcome[]) => {
    setTraceDone(null);
    if (idx + 1 >= nextQueue.length) {
      onFinish(nextOutcomes);
    } else {
      setIdx(idx + 1);
    }
  };

  const recordAndAdvance = (correct: boolean, extra?: Partial<ExerciseOutcome>) => {
    if (!current) return;
    let nextOutcomes = outcomes;
    if (!current.isRetry) {
      nextOutcomes = [...outcomes, { itemId: current.itemId, correct, ...extra }];
      setOutcomes(nextOutcomes);
    }
    // Une erreur ré-empile l'exercice en fin de file (même s'il était déjà
    // une reprise) : la session ne se termine que sur un succès.
    let nextQueue = queue;
    if (!correct) {
      nextQueue = [...queue, { ...current, isRetry: true }];
      setQueue(nextQueue);
    }
    advance(nextQueue, nextOutcomes);
  };

  if (!current) return null;

  return (
    <div className="screen">
      <div className="session-top">
        <button className="quit-btn" aria-label="Quitter" onClick={onQuit}>
          ✕
        </button>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {current.kind === 'intro' && (
        <Flashcard
          key={`${idx}`}
          item={getItem(current.itemId)}
          traceable={strokeChars.has(displayChars(getItem(current.itemId)))}
          ttsEnabled={ttsEnabled}
          onContinue={() => advance(queue, outcomes)}
        />
      )}

      {current.kind === 'mcq' && (
        <Mcq
          key={`${idx}`}
          itemId={current.itemId}
          direction={current.direction}
          choiceIds={current.choiceIds}
          ttsEnabled={ttsEnabled}
          onDone={(correct) => recordAndAdvance(correct)}
        />
      )}

      {current.kind === 'trace' && (
        <div className="exercise" key={`${idx}`}>
          <p className="exercise-prompt">Trace : {primaryLabel(getItem(current.itemId))}</p>
          <div className="trace-wrap">
            <StrokeQuiz
              char={displayChars(getItem(current.itemId))}
              size={Math.min(320, window.innerWidth - 64)}
              showOutline={current.showOutline}
              onComplete={(r) => setTraceDone({ mistakes: r.totalMistakes, usedHint: r.usedHint })}
              onFallback={() => {
                // Données de traits manquantes : remplace par un QCM équivalent.
                const replacement = { ...makeMcq(current.itemId, 'toChar'), isRetry: current.isRetry };
                setQueue((q) => q.map((e, i) => (i === idx ? replacement : e)));
              }}
            />
          </div>
          {traceDone && (
            <div className={`feedback ${traceDone.mistakes === 0 ? 'good' : 'bad'}`}>
              {traceDone.mistakes === 0
                ? 'Parfait !'
                : `Terminé, ${traceDone.mistakes} erreur${traceDone.mistakes > 1 ? 's' : ''}`}
            </div>
          )}
          {traceDone && (
            <div className="session-footer" style={{ marginTop: 'auto' }}>
              <button
                className="btn btn-primary"
                onClick={() =>
                  recordAndAdvance(true, {
                    mistakes: traceDone.mistakes,
                    usedHint: traceDone.usedHint,
                  })
                }
              >
                Continuer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
