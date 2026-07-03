// Petits sons de feedback synthétisés en WebAudio : aucun fichier audio,
// fonctionne hors-ligne. Le contexte est créé paresseusement lors du premier
// son — toujours déclenché par un geste utilisateur, ce qui satisfait iOS.

let enabled = true;
let ctx: AudioContext | null = null;

export function setSfxEnabled(value: boolean): void {
  enabled = value;
}

function getContext(): AudioContext | null {
  if (typeof window === 'undefined' || !('AudioContext' in window)) return null;
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

interface Note {
  freq: number;
  /** Décalage du début, en secondes. */
  at: number;
  duration: number;
}

function play(notes: Note[], type: OscillatorType, volume: number): void {
  if (!enabled) return;
  try {
    const audio = getContext();
    if (!audio) return;
    const now = audio.currentTime;
    for (const note of notes) {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type;
      osc.frequency.value = note.freq;
      const start = now + note.at;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(volume, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + note.duration);
      osc.connect(gain).connect(audio.destination);
      osc.start(start);
      osc.stop(start + note.duration + 0.02);
    }
  } catch {
    // le son est un bonus
  }
}

/** Bonne réponse : deux notes montantes. */
export function playCorrect(): void {
  play(
    [
      { freq: 660, at: 0, duration: 0.12 },
      { freq: 880, at: 0.1, duration: 0.18 },
    ],
    'sine',
    0.18,
  );
}

/** Mauvaise réponse : buzz grave descendant. */
export function playWrong(): void {
  play(
    [
      { freq: 220, at: 0, duration: 0.15 },
      { freq: 174, at: 0.13, duration: 0.22 },
    ],
    'triangle',
    0.16,
  );
}

/** Fin de session : petit arpège. */
export function playFinish(): void {
  play(
    [
      { freq: 523, at: 0, duration: 0.15 },
      { freq: 659, at: 0.12, duration: 0.15 },
      { freq: 784, at: 0.24, duration: 0.15 },
      { freq: 1047, at: 0.36, duration: 0.3 },
    ],
    'sine',
    0.16,
  );
}
