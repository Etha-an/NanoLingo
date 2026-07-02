interface Props {
  xpGained: number;
  mistakes: number;
  onContinue: () => void;
}

export default function SummaryScreen({ xpGained, mistakes, onContinue }: Props) {
  return (
    <div className="screen">
      <div className="summary">
        <div style={{ fontSize: 64 }}>{mistakes === 0 ? '🎉' : '💪'}</div>
        <h1 className="screen-title">
          {mistakes === 0 ? 'Sans faute !' : 'Session terminée'}
        </h1>
        <div className="summary-xp">+{xpGained} XP</div>
        {mistakes > 0 && (
          <p style={{ color: 'var(--muted)', fontWeight: 700 }}>
            {mistakes} erreur{mistakes > 1 ? 's' : ''} — ces caractères reviendront plus vite en
            révision.
          </p>
        )}
      </div>
      <div className="session-footer">
        <button className="btn btn-primary" onClick={onContinue}>
          Continuer
        </button>
      </div>
    </div>
  );
}
