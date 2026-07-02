import { useMemo, useState } from 'react';
import {
  displayChars,
  displayParts,
  getItem,
  hasItem,
  primaryLabel,
  secondaryLabel,
  spokenText,
  type StudyItem,
} from '../data';
import type { ItemId } from '../data/types';
import type { ProgressMap } from '../storage/db';
import { isMastered } from '../srs/sm2';
import { speakJapanese, ttsAvailable } from '../audio/tts';
import StrokeAnimation from '../components/StrokeAnimation';

interface Props {
  progress: ProgressMap;
  strokeChars: Set<string>;
  ttsEnabled: boolean;
  onPractice: (itemIds: ItemId[]) => void;
  onBack: () => void;
}

const GROUPS: { title: string; match: (item: StudyItem) => boolean }[] = [
  { title: 'Hiragana', match: (i) => i.type === 'kana' && i.script === 'hiragana' },
  { title: 'Katakana', match: (i) => i.type === 'kana' && i.script === 'katakana' },
  { title: 'Kanji', match: (i) => i.type === 'kanji' },
  { title: 'Vocabulaire', match: (i) => i.type === 'vocab' },
];

/** Dictionnaire des caractères appris : consultation, SRS, entraînement libre. */
export default function DictionaryScreen({
  progress,
  strokeChars,
  ttsEnabled,
  onPractice,
  onBack,
}: Props) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<ItemId | null>(null);

  const learned = useMemo(
    () =>
      Object.keys(progress)
        .filter(hasItem)
        .map((id) => getItem(id)),
    [progress],
  );

  const difficult = useMemo(
    () =>
      Object.values(progress)
        .filter((p) => hasItem(p.itemId) && p.lapses >= 2)
        .sort((a, b) => b.lapses - a.lapses)
        .slice(0, 10)
        .map((p) => p.itemId),
    [progress],
  );

  const normalizedQuery = query.trim().toLowerCase();
  const matches = (item: StudyItem) => {
    if (!normalizedQuery) return true;
    const haystack = [
      displayChars(item),
      item.type === 'vocab' ? (item.kanji ?? '') : '',
      item.type !== 'kanji' ? item.romaji : '',
      primaryLabel(item),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  };

  const selected = selectedId && hasItem(selectedId) ? getItem(selectedId) : null;
  const selectedProgress = selectedId ? progress[selectedId] : undefined;

  return (
    <div className="screen">
      <div className="screen-header">
        <button className="quit-btn" aria-label="Retour" onClick={onBack}>
          ←
        </button>
        <h1 className="screen-title">Dictionnaire</h1>
      </div>

      {learned.length === 0 && (
        <p style={{ color: 'var(--muted)', fontWeight: 700 }}>
          Termine ta première leçon pour voir tes caractères ici.
        </p>
      )}

      {difficult.length > 0 && (
        <div className="review-banner" style={{ borderColor: 'var(--red)' }}>
          <span>
            😖 {difficult.length} caractère{difficult.length > 1 ? 's' : ''} difficile
            {difficult.length > 1 ? 's' : ''} : {difficult.slice(0, 5).map((id) => displayChars(getItem(id))).join(' ')}
            {difficult.length > 5 ? '…' : ''}
          </span>
          <button className="btn btn-blue" onClick={() => onPractice(difficult)}>
            Retravailler
          </button>
        </div>
      )}

      {learned.length > 0 && (
        <input
          className="type-input dict-search"
          type="text"
          placeholder="Rechercher (かな, romaji, sens…)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
        />
      )}

      {selected && (
        <div className="card dict-detail">
          <div className="dict-detail-top">
            {[...displayChars(selected)].length === 1 && strokeChars.has(displayChars(selected)) ? (
              <StrokeAnimation char={displayChars(selected)} size={140} />
            ) : (
              <div className="big-char word">{displayParts(selected).main}</div>
            )}
            <div>
              <div className="intro-label">{primaryLabel(selected)}</div>
              {secondaryLabel(selected) && <div className="intro-sub">{secondaryLabel(selected)}</div>}
              {selected.type === 'vocab' && selected.kanji && (
                <div className="intro-sub">graphie : {selected.kanji}</div>
              )}
              {selectedProgress && (
                <div className="intro-sub">
                  intervalle : {selectedProgress.intervalDays} j — oublis : {selectedProgress.lapses}
                  {isMastered(selectedProgress) ? ' — acquis ✓' : ''}
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {ttsEnabled && ttsAvailable() && (
              <button
                className="btn btn-ghost"
                style={{ width: 'auto', padding: '8px 14px' }}
                onClick={() => speakJapanese(spokenText(selected))}
              >
                🔊
              </button>
            )}
            <button className="btn btn-blue" onClick={() => onPractice([selected.id])}>
              M'entraîner
            </button>
          </div>
        </div>
      )}

      {GROUPS.map((group) => {
        const items = learned.filter((i) => group.match(i) && matches(i));
        if (items.length === 0) return null;
        return (
          <section key={group.title} style={{ marginBottom: 16 }}>
            <h2 className="dict-group-title">
              {group.title} ({items.length})
            </h2>
            <div className="dict-grid">
              {items.map((item) => (
                <button
                  key={item.id}
                  className={`dict-cell${item.id === selectedId ? ' active' : ''}`}
                  onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
                >
                  {displayParts(item).main}
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
