import { ALL_LESSONS, getUnits } from '../data';

interface Props {
  completedLessonIds: string[];
  xp: number;
  streak: number;
  dueCount: number;
  /** Nombre d'items déjà appris (pour proposer la leçon récap). */
  learnedCount: number;
  onOpenLesson: (lessonId: string) => void;
  onOpenReview: () => void;
  onOpenRecap: () => void;
  onOpenKeyboard: () => void;
  onOpenDictionary: () => void;
  onOpenStats: () => void;
}

/** Parcours d'unités façon Duolingo : nœuds de leçons déverrouillés en ligne. */
export default function HomeScreen({
  completedLessonIds,
  xp,
  streak,
  dueCount,
  learnedCount,
  onOpenLesson,
  onOpenReview,
  onOpenRecap,
  onOpenKeyboard,
  onOpenDictionary,
  onOpenStats,
}: Props) {
  const completed = new Set(completedLessonIds);
  // La première leçon non terminée (ordre global) est la leçon « courante ».
  const currentLessonId = ALL_LESSONS.find((l) => !completed.has(l.id))?.id;

  return (
    <div className="screen">
      <div className="home-stats">
        <span className="stat-chip">🔥 {streak}</span>
        <span className="stat-chip">⭐ {xp} XP</span>
        <button className="stat-chip" onClick={onOpenDictionary} aria-label="Dictionnaire">
          📖
        </button>
        <button className="stat-chip" onClick={onOpenStats} aria-label="Statistiques">
          📊
        </button>
      </div>

      {dueCount > 0 && (
        <div className="review-banner">
          <span>
            📚 {dueCount} révision{dueCount > 1 ? 's' : ''} à faire
          </span>
          <button className="btn btn-blue" onClick={onOpenReview}>
            Réviser
          </button>
        </div>
      )}

      {learnedCount >= 5 && (
        <div className="review-banner recap-banner">
          <span>🎲 Leçon récap — {Math.min(10, learnedCount)} caractères au hasard</span>
          <button className="btn btn-gold" onClick={onOpenRecap}>
            Lancer
          </button>
        </div>
      )}

      {learnedCount >= 10 && (
        <div className="review-banner">
          <span>⌨️ Apprendre le clavier japonais</span>
          <button className="btn btn-blue" onClick={onOpenKeyboard}>
            Lancer
          </button>
        </div>
      )}

      {getUnits().map((unit) => (
        <section key={unit.id} className="unit">
          <div className="unit-header">
            <span>{unit.icon}</span>
            <span>{unit.title}</span>
          </div>
          <div className="unit-lessons">
            {unit.lessons.map((lesson) => {
              const isDone = completed.has(lesson.id);
              const isCurrent = lesson.id === currentLessonId;
              const locked = !isDone && !isCurrent;
              return (
                <div key={lesson.id} className="lesson-wrap">
                  <button
                    className={`lesson-node ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''} ${locked ? 'locked' : ''}`}
                    disabled={locked}
                    onClick={() => onOpenLesson(lesson.id)}
                    aria-label={lesson.title}
                  >
                    {isDone ? '✓' : isCurrent ? '★' : '🔒'}
                  </button>
                  <div className="lesson-node-title">{lesson.title}</div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
