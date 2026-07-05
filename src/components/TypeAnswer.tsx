import { useState } from 'react';
import { speakJapanese, ttsAvailable } from '../audio/tts';
import { playCorrect, playWrong } from '../audio/sfx';

interface Props {
  /** Consigne affichée au-dessus. */
  title: string;
  /** Astuce affichée sous la consigne (ex : activer le clavier japonais). */
  hint?: string;
  /** Grand texte montré (caractère, mot, ou sens français). */
  display: string;
  /** Taille réduite pour les textes longs. */
  displaySmall?: boolean;
  /** Sous-texte optionnel (ex : rōmaji d'aide). */
  sub?: string;
  placeholder: string;
  /** 'ja' pour la saisie en kana (indication de langue du champ). */
  lang?: string;
  /** Valide la saisie (déjà trimée). */
  accept: (input: string) => boolean;
  /** Réponse affichée en cas d'erreur. */
  correctAnswer: string;
  /** Texte japonais prononcé après la réponse (si activé). */
  ttsText: string | null;
  ttsEnabled: boolean;
  onDone: (correct: boolean) => void;
}

/** Exercice de saisie libre : rōmaji au clavier normal, ou kana au clavier japonais. */
export default function TypeAnswer({
  title,
  hint,
  display,
  displaySmall,
  sub,
  placeholder,
  lang,
  accept,
  correctAnswer,
  ttsText,
  ttsEnabled,
  onDone,
}: Props) {
  const [value, setValue] = useState('');
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const submit = () => {
    if (answered || value.trim() === '') return;
    const ok = accept(value.trim());
    setAnswered(true);
    setCorrect(ok);
    if (ok) playCorrect();
    else playWrong();
    if (ttsEnabled && ttsAvailable() && ttsText) speakJapanese(ttsText);
  };

  return (
    <div className="exercise">
      <p className="exercise-prompt">{title}</p>
      {hint && <p className="type-hint">{hint}</p>}
      <div className={`big-char${displaySmall ? ' word' : ''}`}>{display}</div>
      {sub && <p className="type-sub">{sub}</p>}
      <input
        className="type-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          // Sur clavier japonais, Entrée sert d'abord à CONFIRMER la
          // composition IME (keyCode 229) : ne pas valider la réponse là.
          if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) submit();
        }}
        placeholder={placeholder}
        lang={lang}
        disabled={answered}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        enterKeyHint="done"
      />
      {!answered && (
        <div className="session-footer" style={{ marginTop: 'auto' }}>
          <button className="btn btn-blue" disabled={value.trim() === ''} onClick={submit}>
            Valider
          </button>
        </div>
      )}
      {answered && (
        <div className={`feedback ${correct ? 'good' : 'bad'}`}>
          {correct ? 'Correct !' : 'Raté…'}
          {!correct && <small>Réponse : {correctAnswer}</small>}
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
