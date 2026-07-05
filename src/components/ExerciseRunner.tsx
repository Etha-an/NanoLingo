import { useMemo, useState } from 'react';
import type { Exercise, ExerciseOutcome } from '../exercises/types';
import { makeMcq, normalizeRomaji, romajiAnswers } from '../exercises/generate';
import { getItem, primaryLabel, displayChars, displayParts, spokenText } from '../data';
import Flashcard from './Flashcard';
import Listen from './Listen';
import Mcq from './Mcq';
import StrokeQuiz from './StrokeQuiz';
import TypeAnswer from './TypeAnswer';
import { playCorrect } from '../audio/sfx';

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

  const recordAndAdvance = (
    correct: boolean,
    extra?: Partial<ExerciseOutcome>,
    allowRequeue = true,
  ) => {
    if (!current || current.kind === 'info') return;
    let nextOutcomes = outcomes;
    if (!current.isRetry) {
      nextOutcomes = [...outcomes, { itemId: current.itemId, correct, ...extra }];
      setOutcomes(nextOutcomes);
    }
    // Une erreur ré-empile l'exercice en fin de file (même s'il était déjà
    // une reprise) : la session ne se termine que sur un succès. Exception :
    // le tracé (le quiz a déjà montré la correction, inutile de le refaire).
    let nextQueue = queue;
    if (!correct && allowRequeue) {
      nextQueue = [...queue, { ...current, isRetry: true }];
      setQueue(nextQueue);
    }
    advance(nextQueue, nextOutcomes);
  };

  // File frappée par exercice : figée par useMemo pour qu'une rotation ne
  // recrée pas le quiz de tracé en plein exercice.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const traceSize = useMemo(() => Math.min(320, window.innerWidth - 64), [idx]);

  if (!current) {
    // File vide (ex : progression orpheline) : garder une porte de sortie.
    return (
      <div className="screen">
        <div className="session-top">
          <button className="quit-btn" aria-label="Quitter" onClick={onQuit}>
            ✕
          </button>
          <div className="progress-track">
            <div className="progress-fill" />
          </div>
        </div>
        <div className="loading">Rien à réviser ici pour le moment.</div>
      </div>
    );
  }

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

      {current.kind === 'info' && (
        <div className="exercise" key={`${idx}`}>
          <p className="exercise-prompt">{current.title}</p>
          <div className="card" style={{ fontSize: 16, lineHeight: 1.6, fontWeight: 600 }}>
            {current.body}
          </div>
          <div className="session-footer" style={{ marginTop: 'auto' }}>
            <button className="btn btn-primary" onClick={() => advance(queue, outcomes)}>
              Continuer
            </button>
          </div>
        </div>
      )}

      {current.kind === 'typeKanaCopy' &&
        (() => {
          const item = getItem(current.itemId);
          if (item.type !== 'vocab') return null;
          return (
            <TypeAnswer
              key={`${idx}`}
              title="Recopie ce mot avec le clavier japonais"
              hint="Passe au clavier 🇯🇵 avec la touche 🌐"
              display={item.kana}
              displaySmall
              sub={item.romaji}
              placeholder="かな…"
              lang="ja"
              accept={(input) => input === item.kana || (!!item.kanji && input === item.kanji)}
              correctAnswer={item.kana}
              ttsText={item.kana}
              ttsEnabled={ttsEnabled}
              onDone={(correct) => recordAndAdvance(correct)}
            />
          );
        })()}

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

      {current.kind === 'typeRomaji' &&
        (() => {
          const item = getItem(current.itemId);
          const accepted = romajiAnswers(item);
          // Le furigana révélerait la réponse : graphie kanji seule pour les
          // mots mûrs, sinon graphie kana.
          const parts = displayParts(item);
          const display = parts.furigana === null ? parts.main : displayChars(item);
          return (
            <TypeAnswer
              key={`${idx}`}
              title="Écris la lecture en rōmaji"
              display={display}
              displaySmall={display.length > 1}
              placeholder="romaji…"
              accept={(input) => accepted.has(normalizeRomaji(input))}
              correctAnswer={item.type === 'kanji' ? primaryLabel(item) : item.romaji}
              ttsText={spokenText(item)}
              ttsEnabled={ttsEnabled}
              onDone={(correct) => recordAndAdvance(correct)}
            />
          );
        })()}

      {current.kind === 'typeKana' &&
        (() => {
          const item = getItem(current.itemId);
          if (item.type !== 'vocab') return null;
          return (
            <TypeAnswer
              key={`${idx}`}
              title="Écris ce mot en japonais"
              hint="Utilise le clavier japonais 🇯🇵 (à activer dans Réglages ▸ Général ▸ Clavier)"
              display={item.meaningFr}
              displaySmall
              placeholder="かな…"
              lang="ja"
              accept={(input) => input === item.kana || (!!item.kanji && input === item.kanji)}
              correctAnswer={item.kana}
              ttsText={item.kana}
              ttsEnabled={ttsEnabled}
              onDone={(correct) => recordAndAdvance(correct)}
            />
          );
        })()}

      {current.kind === 'listen' && (
        <Listen
          key={`${idx}`}
          itemId={current.itemId}
          choiceIds={current.choiceIds}
          onDone={(correct) => recordAndAdvance(correct)}
          onFallback={() => {
            // Pas de son (mode silencieux, voix indisponible…) : remplace par
            // un QCM visuel équivalent, sans pénaliser l'utilisateur.
            const replacement = { ...makeMcq(current.itemId, 'toLabel'), isRetry: current.isRetry };
            setQueue((q) => q.map((e, i) => (i === idx ? replacement : e)));
          }}
        />
      )}

      {current.kind === 'trace' && (
        <div className="exercise" key={`${idx}`}>
          <p className="exercise-prompt">Trace : {primaryLabel(getItem(current.itemId))}</p>
          <div className="trace-wrap">
            <StrokeQuiz
              char={displayChars(getItem(current.itemId))}
              size={traceSize}
              showOutline={current.showOutline}
              onComplete={(r) => {
                playCorrect();
                setTraceDone({ mistakes: r.totalMistakes, usedHint: r.usedHint });
              }}
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
                onClick={() => {
                  // Un tracé de mémoire (sans modèle) terminé à coups d'indices
                  // = oubli : compte comme raté pour la répétition espacée,
                  // sans refaire l'exercice (la correction a déjà été montrée).
                  const failed = !current.showOutline && traceDone.usedHint;
                  recordAndAdvance(
                    !failed,
                    { mistakes: traceDone.mistakes, usedHint: traceDone.usedHint },
                    false,
                  );
                }}
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
