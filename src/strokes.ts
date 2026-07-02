// Chargement des données de traits (format Make Me a Hanzi) générées par
// scripts/build-strokes.mjs dans public/strokes/.

const cache = new Map<string, Promise<StrokeData>>();

export interface StrokeData {
  character: string;
  strokes: string[];
  medians: number[][][];
}

let manifest: Promise<Set<string>> | null = null;

/** Ensemble des caractères pour lesquels des données de traits existent. */
export function loadStrokeManifest(): Promise<Set<string>> {
  manifest ??= fetch(`${import.meta.env.BASE_URL}strokes-manifest.json`)
    .then((r) => {
      if (!r.ok) throw new Error(`manifest HTTP ${r.status}`);
      return r.json() as Promise<{ chars: string[] }>;
    })
    .then((m) => new Set(m.chars))
    .catch(() => {
      // Échec transitoire : ne pas mémoriser un manifest vide pour toujours.
      manifest = null;
      return new Set<string>();
    });
  return manifest;
}

export function loadStrokeData(char: string): Promise<StrokeData> {
  let entry = cache.get(char);
  if (!entry) {
    const codepoint = char.codePointAt(0)!.toString(16);
    entry = fetch(`${import.meta.env.BASE_URL}strokes/u${codepoint}.json`).then((r) => {
      if (!r.ok) throw new Error(`pas de données de traits pour ${char}`);
      return r.json() as Promise<StrokeData>;
    });
    entry.catch(() => cache.delete(char));
    cache.set(char, entry);
  }
  return entry;
}
