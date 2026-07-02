import { displayChars, primaryLabel, secondaryLabel, spokenText, type StudyItem } from '../data';
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
          <div className={`big-char${chars.length > 1 ? ' word' : ''}`}>{chars}</div>
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
