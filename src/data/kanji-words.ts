import type { VocabItem } from './types';

/**
 * Mots composés en kanji (niveau N5). Tous les kanji utilisés figurent dans
 * la liste KANJI_N5 (kanji-n5.ts). Ordre du tableau = ordre d'apprentissage,
 * en 4 groupes thématiques de 6 mots.
 */
export const KANJI_WORDS: VocabItem[] = [
  // ─── Pays et gens ───
  { id: 'kw-日本', kana: 'にほん', romaji: 'nihon', meaningFr: 'Japon', script: 'hiragana', kanji: '日本' },
  { id: 'kw-日本語', kana: 'にほんご', romaji: 'nihongo', meaningFr: 'japonais (langue)', script: 'hiragana', kanji: '日本語' },
  { id: 'kw-中国', kana: 'ちゅうごく', romaji: 'chūgoku', meaningFr: 'Chine', script: 'hiragana', kanji: '中国' },
  { id: 'kw-外国', kana: 'がいこく', romaji: 'gaikoku', meaningFr: 'pays étranger', script: 'hiragana', kanji: '外国' },
  { id: 'kw-外国人', kana: 'がいこくじん', romaji: 'gaikokujin', meaningFr: 'étranger (personne)', script: 'hiragana', kanji: '外国人' },
  { id: 'kw-大人', kana: 'おとな', romaji: 'otona', meaningFr: 'adulte', script: 'hiragana', kanji: '大人' },

  // ─── École ───
  { id: 'kw-大学', kana: 'だいがく', romaji: 'daigaku', meaningFr: 'université', script: 'hiragana', kanji: '大学' },
  { id: 'kw-学生', kana: 'がくせい', romaji: 'gakusei', meaningFr: 'étudiant', script: 'hiragana', kanji: '学生' },
  { id: 'kw-大学生', kana: 'だいがくせい', romaji: 'daigakusei', meaningFr: 'étudiant universitaire', script: 'hiragana', kanji: '大学生' },
  { id: 'kw-小学校', kana: 'しょうがっこう', romaji: 'shōgakkō', meaningFr: 'école primaire', script: 'hiragana', kanji: '小学校' },
  { id: 'kw-中学校', kana: 'ちゅうがっこう', romaji: 'chūgakkō', meaningFr: 'collège', script: 'hiragana', kanji: '中学校' },
  { id: 'kw-高校', kana: 'こうこう', romaji: 'kōkō', meaningFr: 'lycée', script: 'hiragana', kanji: '高校' },

  // ─── Temps et météo ───
  { id: 'kw-毎日', kana: 'まいにち', romaji: 'mainichi', meaningFr: 'chaque jour', script: 'hiragana', kanji: '毎日' },
  { id: 'kw-毎週', kana: 'まいしゅう', romaji: 'maishū', meaningFr: 'chaque semaine', script: 'hiragana', kanji: '毎週' },
  { id: 'kw-今週', kana: 'こんしゅう', romaji: 'konshū', meaningFr: 'cette semaine', script: 'hiragana', kanji: '今週' },
  { id: 'kw-来週', kana: 'らいしゅう', romaji: 'raishū', meaningFr: 'la semaine prochaine', script: 'hiragana', kanji: '来週' },
  { id: 'kw-今年', kana: 'ことし', romaji: 'kotoshi', meaningFr: 'cette année', script: 'hiragana', kanji: '今年' },
  { id: 'kw-天気', kana: 'てんき', romaji: 'tenki', meaningFr: 'météo, temps', script: 'hiragana', kanji: '天気' },

  // ─── Quotidien ───
  { id: 'kw-時間', kana: 'じかん', romaji: 'jikan', meaningFr: 'temps, durée', script: 'hiragana', kanji: '時間' },
  { id: 'kw-半分', kana: 'はんぶん', romaji: 'hanbun', meaningFr: 'moitié', script: 'hiragana', kanji: '半分' },
  { id: 'kw-入口', kana: 'いりぐち', romaji: 'iriguchi', meaningFr: 'entrée', script: 'hiragana', kanji: '入口' },
  { id: 'kw-出口', kana: 'でぐち', romaji: 'deguchi', meaningFr: 'sortie', script: 'hiragana', kanji: '出口' },
  { id: 'kw-電気', kana: 'でんき', romaji: 'denki', meaningFr: 'électricité, lumière', script: 'hiragana', kanji: '電気' },
  { id: 'kw-人気', kana: 'にんき', romaji: 'ninki', meaningFr: 'popularité', script: 'hiragana', kanji: '人気' },
];
