import {
  displayChars,
  displayParts,
  primaryLabel,
  secondaryLabel,
  spokenText,
  type StudyItem,
} from '../data';
import { speakJapanese, ttsAvailable } from '../audio/tts';
import StrokeAnimation from './StrokeAnimation';

interface Props {
  item: StudyItem;
  traceable: boolean;
  ttsEnabled: boolean;
  onContinue: () => void;
}

/** Flashcard de découverte d'un nouvel item, avec animation du tracé. */
export default function Flashcard({ item, traceable, ttsEnabled, onContinue }: Props) {
  const chars = displayChars(item);
  const showTts = ttsEnabled && ttsAvailable();

  return (
    <div className="exercise">
      <p className="exercise-prompt">Nouveau caractère</p>
      <div className="card intro-card">
        {traceable ? (
          <StrokeAnimation char={chars} size={200} />
        ) : (
          (() => {
            const parts = displayParts(item);
            return (
              <div className={`big-char${parts.main.length > 1 ? ' word' : ''}`}>
                {parts.furigana ? (
                  <ruby>
                    {parts.main}
                    <rt>{parts.furigana}</rt>
                  </ruby>
                ) : (
                  parts.main
                )}
              </div>
            );
          })()
        )}
        <div className="intro-label">{primaryLabel(item)}</div>
        {secondaryLabel(item) && <div className="intro-sub">{secondaryLabel(item)}</div>}
        {showTts && (
          <button
            className="tts-btn"
            aria-label="Écouter la prononciation"
            onClick={() => speakJapanese(spokenText(item))}
          >
            🔊
          </button>
        )}
      </div>
      <div className="session-footer" style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={onContinue}>
          Continuer
        </button>
      </div>
    </div>
  );
}
