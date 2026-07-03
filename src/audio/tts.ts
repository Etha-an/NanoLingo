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

/** Une voix japonaise est réellement disponible (requis pour les exercices d'écoute). */
export function hasJapaneseVoice(): boolean {
  if (!ttsAvailable()) return false;
  if (!jaVoice) pickVoice();
  return jaVoice !== null;
}

/** Prononce un texte japonais. À appeler depuis un geste utilisateur. */
export function speakJapanese(text: string): void {
  if (!ttsAvailable()) return;
  try {
    if (!jaVoice) pickVoice();
    window.speechSynthesis.cancel();
    // Bug iOS connu : la synthèse peut rester en pause après un cancel.
    window.speechSynthesis.resume();
    // iOS tronque souvent le tout début de la synthèse : sur un kana isolé
    // (あ, い…) il ne reste presque rien d'audible. Une virgule japonaise en
    // tête crée une pause muette qui absorbe la troncature, et un débit plus
    // lent allonge le son lui-même.
    const isShort = [...text].length <= 2;
    const utterance = new SpeechSynthesisUtterance(isShort ? `、${text}` : text);
    utterance.lang = 'ja-JP';
    if (jaVoice) utterance.voice = jaVoice;
    utterance.rate = isShort ? 0.55 : 0.85;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  } catch {
    // silencieux : le TTS est un bonus
  }
}

/** Diagnostic pour l'écran de réglages. */
export function ttsDiagnostic(): { supported: boolean; voiceName: string | null } {
  if (!ttsAvailable()) return { supported: false, voiceName: null };
  pickVoice();
  return { supported: true, voiceName: jaVoice ? `${jaVoice.name} (${jaVoice.lang})` : null };
}
