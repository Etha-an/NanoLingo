import { useEffect, useState } from 'react';
import { displayParts, getItem, primaryLabel, spokenText } from '../data';
import type { ItemId } from '../data/types';
import { speakJapanese } from '../audio/tts';
import { playCorrect, playWrong } from '../audio/sfx';

interface Props {
  itemId: ItemId;
  choiceIds: ItemId[];
  onDone: (correct: boolean) => void;
  /** Aucun son audible (mode silencieux, voix indisponible) : remplacer l'exercice. */
  onFallback: () => void;
}

/**
 * Exercice d'écoute : la synthèse vocale prononce le caractère/mot, on
 * choisit ce qu'on a entendu. Généré uniquement quand une voix japonaise
 * est disponible.
 */
export default function Listen({ itemId, choiceIds, onDone, onFallback }: Props) {
  const [chosen, setChosen] = useState<ItemId | null>(null);
  const target = getItem(itemId);
  const answered = chosen !== null;
  const correct = chosen === itemId;

  useEffect(() => {
    // Tentative de lecture automatique — sur iOS le premier son peut exiger
    // un geste : le gros bouton 🔊 reste le déclencheur principal.
    speakJapanese(spokenText(target));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return (
    <div className="exercise">
      <p className="exercise-prompt">Qu'entends-tu ?</p>
      <div className="listen-wrap">
        <button
          className="listen-btn"
          aria-label="Écouter"
          onClick={() => speakJapanese(spokenText(target))}
        >
          🔊
        </button>
      </div>
      {!answered && (
        <button className="listen-fallback" onClick={onFallback}>
          Je n'entends rien
        </button>
      )}
      <div className="choices">
        {choiceIds.map((id) => {
          const text = displayParts(getItem(id)).main;
          let className = text.length <= 3 ? 'choice char' : 'choice';
          if (answered && id === itemId) className += ' correct';
          if (answered && id === chosen && !correct) className += ' wrong';
          return (
            <button
              key={id}
              className={className}
              disabled={answered}
              onClick={() => {
                setChosen(id);
                if (id === itemId) playCorrect();
                else playWrong();
              }}
            >
              {text}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`feedback ${correct ? 'good' : 'bad'}`}>
          {correct ? 'Correct !' : 'Raté…'}
          <small>
            {displayParts(target).main} = {primaryLabel(target)}
          </small>
        </div>
      )}
      {answered && (
        <div className="session-footer" style={{ marginTop: 'auto' }}>
          <button className="btn btn-primary" onClick={() => onDone(correct)}>
            Continuer
          </button>
        </div>
      )}
    </div>
  );
}
