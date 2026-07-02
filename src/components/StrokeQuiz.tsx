import { useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';
import { loadStrokeData } from '../strokes';

export interface StrokeQuizResult {
  /** Nombre total de traits ratés pendant le quiz. */
  totalMistakes: number;
  /** Au moins un indice (tracé du trait attendu) a été montré. */
  usedHint: boolean;
}

interface Props {
  char: string;
  /** Côté du carré de dessin, en px. */
  size: number;
  /** true en apprentissage (silhouette grise visible), false en révision mature. */
  showOutline: boolean;
  onComplete: (result: StrokeQuizResult) => void;
  /** Appelé si les données de traits sont introuvables — remplacer l'exercice. */
  onFallback: () => void;
}

/**
 * Quiz de tracé : l'utilisateur dessine le caractère trait par trait, dans
 * l'ordre, au doigt ou à la souris. Basé sur hanzi-writer + données animCJK.
 */
export default function StrokeQuiz({ char, size, showOutline, onComplete, onFallback }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const onFallbackRef = useRef(onFallback);
  onCompleteRef.current = onComplete;
  onFallbackRef.current = onFallback;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const writer = HanziWriter.create(container, char, {
      width: size,
      height: size,
      padding: Math.round(size * 0.06),
      showCharacter: false,
      showOutline,
      strokeColor: '#f1f7fb',
      outlineColor: '#37464f',
      drawingColor: '#58cc02',
      drawingWidth: Math.max(14, Math.round(size * 0.07)),
      highlightColor: '#1cb0f6',
      charDataLoader: (c, onLoad) => {
        loadStrokeData(c).then(
          (data) => {
            if (!cancelled) onLoad(data);
          },
          () => {
            if (!cancelled) onFallbackRef.current();
          },
        );
      },
    });

    let hintShown = false;
    writer.quiz({
      leniency: 1.3,
      showHintAfterMisses: 2,
      onMistake: (stroke) => {
        if (stroke.mistakesOnStroke >= 2) hintShown = true;
      },
      onComplete: (summary) => {
        if (!cancelled) {
          onCompleteRef.current({ totalMistakes: summary.totalMistakes, usedHint: hintShown });
        }
      },
    });

    return () => {
      cancelled = true;
      writer.cancelQuiz();
      writer.hideCharacter();
      container.replaceChildren();
    };
  }, [char, size, showOutline]);

  return (
    <div
      ref={containerRef}
      className="stroke-quiz"
      style={{ width: size, height: size, touchAction: 'none' }}
    />
  );
}
