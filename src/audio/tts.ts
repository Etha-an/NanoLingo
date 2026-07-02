// Synthèse vocale japonaise (nice-to-have). Sur Safari iOS : la voix ja-JP
// (Kyoko) existe mais getVoices() peut être vide au premier appel et speak()
// doit être déclenché par un geste utilisateur. Échec silencieux partout.

let jaVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): void {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  jaVoice = voices.find((v) => v.lang.startsWith('ja')) ?? null;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  pickVoice();
  window.speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
}

export function ttsAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Prononce un texte japonais. À appeler depuis un geste utilisateur. */
export function speakJapanese(text: string): void {
  if (!ttsAvailable()) return;
  try {
    if (!jaVoice) pickVoice();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    if (jaVoice) utterance.voice = jaVoice;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  } catch {
    // silencieux : le TTS est un bonus
  }
}
