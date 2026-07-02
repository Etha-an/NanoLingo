import { useState } from 'react';
import { displayChars, getItem, primaryLabel, spokenText } from '../data';
import type { ItemId } from '../data/types';
import { speakJapanese, ttsAvailable } from '../audio/tts';

interface Props {
  itemId: ItemId;
  direction: 'toLabel' | 'toChar';
  choiceIds: ItemId[];
  ttsEnabled: boolean;
  onDone: (correct: boolean) => void;
}

/**
 * QCM à 4 choix. 'toLabel' : grand caractère → choisir le romaji/sens.
 * 'toChar' : romaji/sens → choisir le caractère.
 */
export default function Mcq({ itemId, direction, choiceIds, ttsEnabled, onDone }: Props) {
  const [chosen, setChosen] = useState<ItemId | null>(null);
  const target = getItem(itemId);
  const answered = chosen !== null;
  const correct = chosen === itemId;

  const choiceText = (id: ItemId) =>
    direction === 'toLabel' ? primaryLabel(getItem(id)) : displayChars(getItem(id));

  const select = (id: ItemId) => {
    if (answered) return;
    setChosen(id);
    if (ttsEnabled && ttsAvailable()) speakJapanese(spokenText(target));
  };

  return (
    <div className="exercise">
      <p className="exercise-prompt">
        {direction === 'toLabel'
          ? target.type === 'kana'
            ? 'Comment se lit ce caractère ?'
            : 'Que signifie… ?'
          : `Trouve : ${primaryLabel(target)}`}
      </p>
      {direction === 'toLabel' && (
        <div className={`big-char${displayChars(target).length > 1 ? ' word' : ''}`}>
          {displayChars(target)}
        </div>
      )}
      <div className="choices">
        {choiceIds.map((id) => {
          let className = 'choice';
          if (direction === 'toChar') className += ' char';
          if (answered && id === itemId) className += ' correct';
          if (answered && id === chosen && !correct) className += ' wrong';
          return (
            <button key={id} className={className} disabled={answered} onClick={() => select(id)}>
              {choiceText(id)}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`feedback ${correct ? 'good' : 'bad'}`}>
          {correct ? 'Correct !' : 'Raté…'}
          {!correct && (
            <small>
              {displayChars(target)} = {primaryLabel(target)}
            </small>
          )}
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
