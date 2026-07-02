import { useState } from 'react';
import StrokeQuiz from './components/StrokeQuiz';
import StrokeAnimation from './components/StrokeAnimation';

// Page de test temporaire (M2) : validation du quiz de tracé avant de
// construire les vrais écrans.
export default function App() {
  const [char, setChar] = useState('あ');
  const [log, setLog] = useState<string[]>([]);

  return (
    <div className="app" style={{ padding: 16 }}>
      <h1>NanoLingo — test du tracé</h1>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <p>Animation (modèle)</p>
          <StrokeAnimation char={char} size={200} />
        </div>
        <div>
          <p>Quiz : trace {char}</p>
          <StrokeQuiz
            char={char}
            size={280}
            showOutline
            onComplete={(r) =>
              setLog((l) => [
                ...l,
                `terminé : ${r.totalMistakes} erreur(s), indice=${r.usedHint}`,
              ])
            }
            onFallback={() => setLog((l) => [...l, `pas de données pour ${char}`])}
          />
        </div>
      </div>
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        {['あ', 'か', 'ぬ', 'シ'].map((c) => (
          <button key={c} onClick={() => setChar(c)} style={{ fontSize: 24, padding: '4px 12px' }}>
            {c}
          </button>
        ))}
      </div>
      <pre data-testid="log">{log.join('\n')}</pre>
    </div>
  );
}
