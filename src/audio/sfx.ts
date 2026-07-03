// Sons de feedback synthétisés en WebAudio : aucun fichier audio, fonctionne
// hors-ligne. Synthèse « marimba » : attaque percussive, décroissance
// exponentielle, harmonique douce et filtre passe-bas pour un timbre chaud.
// Le contexte est créé paresseusement lors du premier son — toujours
// déclenché par un geste utilisateur, ce qui satisfait iOS.

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

interface Tone {
  freq: number;
  /** Décalage du début, en secondes. */
  at: number;
  duration: number;
  /** Glissando : la fréquence dérive vers cette valeur (son « womp »). */
  slideTo?: number;
  gain?: number;
  type?: OscillatorType;
  /** Ajoute une octave discrète au-dessus (timbre plus riche). */
  sparkle?: boolean;
}

function play(tones: Tone[], cutoff: number, volume: number): void {
  if (!enabled) return;
  try {
    const audio = getContext();
    if (!audio) return;
    const now = audio.currentTime + 0.01;

    const master = audio.createGain();
    master.gain.value = volume;
    const filter = audio.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = cutoff;
    filter.Q.value = 0.5;
    master.connect(filter).connect(audio.destination);

    const pluck = (freq: number, at: number, duration: number, gain: number, type: OscillatorType, slideTo?: number) => {
      const osc = audio.createOscillator();
      const env = audio.createGain();
      osc.type = type;
      const start = now + at;
      osc.frequency.setValueAtTime(freq, start);
      if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, start + duration);
      env.gain.setValueAtTime(0, start);
      env.gain.linearRampToValueAtTime(gain, start + 0.006);
      env.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.connect(env).connect(master);
      osc.start(start);
      osc.stop(start + duration + 0.03);
    };

    for (const t of tones) {
      const type = t.type ?? 'triangle';
      const gain = t.gain ?? 1;
      pluck(t.freq, t.at, t.duration, gain, type, t.slideTo);
      if (t.sparkle ?? true) {
        pluck(t.freq * 2, t.at, t.duration * 0.6, gain * 0.25, 'sine', t.slideTo ? t.slideTo * 2 : undefined);
      }
    }
  } catch {
    // le son est un bonus
  }
}

/** Bonne réponse : deux notes de marimba montantes (si → mi). */
export function playCorrect(): void {
  play(
    [
      { freq: 987.8, at: 0, duration: 0.16 },
      { freq: 1318.5, at: 0.085, duration: 0.32 },
    ],
    5200,
    0.22,
  );
}

/** Mauvaise réponse : « womp » doux et descendant, sans agressivité. */
export function playWrong(): void {
  play(
    [
      { freq: 220, at: 0, duration: 0.22, slideTo: 165, type: 'sawtooth', sparkle: false },
      { freq: 165, at: 0.18, duration: 0.3, slideTo: 116, type: 'sawtooth', sparkle: false },
    ],
    520,
    0.34,
  );
}

/** Fin de session : arpège de marimba do–mi–sol–do + accord final. */
export function playFinish(): void {
  play(
    [
      { freq: 523.3, at: 0, duration: 0.28 },
      { freq: 659.3, at: 0.09, duration: 0.28 },
      { freq: 784, at: 0.18, duration: 0.3 },
      { freq: 1046.5, at: 0.27, duration: 0.55 },
      { freq: 1318.5, at: 0.27, duration: 0.5, gain: 0.4 },
      { freq: 1568, at: 0.27, duration: 0.45, gain: 0.25 },
    ],
    5600,
    0.2,
  );
}
