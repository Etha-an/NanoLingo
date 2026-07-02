import { useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';
import { loadStrokeData } from '../strokes';

interface Props {
  char: string;
  size: number;
}

/**
 * Animation du tracé d'un caractère, en boucle douce. Utilisée dans les
 * flashcards d'introduction. S'affiche en caractère statique si l'animation
 * échoue, et ne rend rien si aucune donnée de traits n'existe (le parent
 * affiche alors le caractère en texte).
 */
export default function StrokeAnimation({ char, size }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let loopTimer: ReturnType<typeof setTimeout> | undefined;
    const writer = HanziWriter.create(container, char, {
      width: size,
      height: size,
      padding: Math.round(size * 0.06),
      showCharacter: false,
      showOutline: true,
      strokeColor: '#f1f7fb',
      outlineColor: '#37464f',
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 250,
      charDataLoader: (c, onLoad) => {
        loadStrokeData(c).then(
          (data) => {
            if (!cancelled) onLoad(data);
          },
          () => {
            // Pas de données : afficher le caractère en texte à la place.
            if (!cancelled && container.isConnected) {
              container.replaceChildren();
              container.textContent = c;
              container.style.fontSize = `${Math.round(size * 0.8)}px`;
              container.style.lineHeight = `${size}px`;
              container.style.textAlign = 'center';
            }
          },
        );
      },
    });

    const animate = () => {
      writer.animateCharacter({
        onComplete: () => {
          loopTimer = setTimeout(() => {
            if (!cancelled) animate();
          }, 1800);
        },
      });
    };
    animate();

    return () => {
      cancelled = true;
      if (loopTimer) clearTimeout(loopTimer);
      container.replaceChildren();
    };
  }, [char, size]);

  return <div ref={containerRef} className="stroke-animation" style={{ width: size, height: size }} />;
}
