// Types du contenu pédagogique. Les fichiers de données (hiragana.ts, katakana.ts,
// kanji-n5.ts, vocab.ts, units.ts) doivent s'y conformer strictement.

export type ItemId = string;

export type Script = 'hiragana' | 'katakana';

export interface KanaItem {
  /** Unique, ASCII, ex: 'h-a', 'h-kya', 'k-shi'. Exceptions d'unicité : ぢ→'h-dji', づ→'h-dzu'. */
  id: ItemId;
  /** Le(s) caractère(s) : 1 kana, ou 2 pour les yōon (きゃ). */
  char: string;
  /** Romaji Hepburn affiché (し→'shi', ぢ→'ji', を→'wo', ん→'n'). */
  romaji: string;
  kind: 'base' | 'dakuten' | 'yoon';
  script: Script;
}

export interface KanjiItem {
  /** Ex: 'kj-一'. */
  id: ItemId;
  /** Un seul kanji. */
  char: string;
  /** 1 à 3 sens en français, concis, minuscules (ex: ['jour', 'soleil']). */
  meaningsFr: string[];
  /** Lectures on principales en katakana (ex: ['ニチ', 'ジツ']), max 3. */
  onyomi: string[];
  /** Lectures kun principales en hiragana, forme complète avec okurigana (ex: ['ひ', 'か']), max 3. */
  kunyomi: string[];
}

export interface VocabItem {
  /** Ex: 'v-みず'. */
  id: ItemId;
  /** Le mot écrit uniquement en kana (jamais de kanji). */
  kana: string;
  /** Romaji Hepburn (allongements katakana : コーヒー→'kōhī'). */
  romaji: string;
  /** Sens français concis (ex: 'eau'). */
  meaningFr: string;
  /** Syllabaire dominant du mot — place le mot dans le parcours. */
  script: Script;
  /**
   * Graphie usuelle en kanji (ex: 水, 名前, 子ども), uniquement si tous ses
   * kanji font partie de notre liste N5. Affichée (avec furigana) une fois
   * ces kanji appris.
   */
  kanji?: string;
}

export interface Lesson {
  /** Ex: 'hira-1'. */
  id: string;
  /** Titre court affiché, ex: 'あ・い・う・え・お'. */
  title: string;
  /** 4 à 6 nouveaux items par leçon. */
  newItemIds: ItemId[];
}

export interface Unit {
  /** Ex: 'unit-hiragana-1'. */
  id: string;
  /** Ex: 'Hiragana — les bases'. */
  title: string;
  /** Emoji décoratif. */
  icon: string;
  lessons: Lesson[];
}
