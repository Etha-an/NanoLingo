import type { VocabItem } from './types';

// Lecture des nombres, prix et heures en kanji (niveau N5).
// Le cœur pédagogique : les lectures irrégulières (三百 さんびゃく, 六百 ろっぴゃく,
// 八百 はっぴゃく, 三千 さんぜん, 八千 はっせん, 四時 よじ, 七時 しちじ, 九時 くじ).
// meaningFr : valeur en chiffres, espace fine (U+202F) pour les milliers.
export const NUMBERS: VocabItem[] = [
  // ---- Nombres et prix ----
  { id: 'nb-百', kana: 'ひゃく', romaji: 'hyaku', meaningFr: '100', script: 'hiragana', kanji: '百', tag: 'nombre' },
  { id: 'nb-二百', kana: 'にひゃく', romaji: 'nihyaku', meaningFr: '200', script: 'hiragana', kanji: '二百', tag: 'nombre' },
  { id: 'nb-三百', kana: 'さんびゃく', romaji: 'sanbyaku', meaningFr: '300', script: 'hiragana', kanji: '三百', tag: 'nombre' },
  { id: 'nb-五百', kana: 'ごひゃく', romaji: 'gohyaku', meaningFr: '500', script: 'hiragana', kanji: '五百', tag: 'nombre' },
  { id: 'nb-六百', kana: 'ろっぴゃく', romaji: 'roppyaku', meaningFr: '600', script: 'hiragana', kanji: '六百', tag: 'nombre' },
  { id: 'nb-八百', kana: 'はっぴゃく', romaji: 'happyaku', meaningFr: '800', script: 'hiragana', kanji: '八百', tag: 'nombre' },
  { id: 'nb-千', kana: 'せん', romaji: 'sen', meaningFr: '1 000', script: 'hiragana', kanji: '千', tag: 'nombre' },
  { id: 'nb-三千', kana: 'さんぜん', romaji: 'sanzen', meaningFr: '3 000', script: 'hiragana', kanji: '三千', tag: 'nombre' },
  { id: 'nb-八千', kana: 'はっせん', romaji: 'hassen', meaningFr: '8 000', script: 'hiragana', kanji: '八千', tag: 'nombre' },
  { id: 'nb-一万', kana: 'いちまん', romaji: 'ichiman', meaningFr: '10 000', script: 'hiragana', kanji: '一万', tag: 'nombre' },
  { id: 'nb-五百円', kana: 'ごひゃくえん', romaji: 'gohyakuen', meaningFr: '500 yens', script: 'hiragana', kanji: '五百円', tag: 'nombre' },
  { id: 'nb-千円', kana: 'せんえん', romaji: "sen'en", meaningFr: '1 000 yens', script: 'hiragana', kanji: '千円', tag: 'nombre' },
  // ---- Heures ----
  { id: 'nb-一時', kana: 'いちじ', romaji: 'ichiji', meaningFr: '1 h', script: 'hiragana', kanji: '一時', tag: 'heure' },
  { id: 'nb-二時', kana: 'にじ', romaji: 'niji', meaningFr: '2 h', script: 'hiragana', kanji: '二時', tag: 'heure' },
  { id: 'nb-二時半', kana: 'にじはん', romaji: 'nijihan', meaningFr: '2 h 30', script: 'hiragana', kanji: '二時半', tag: 'heure' },
  { id: 'nb-四時', kana: 'よじ', romaji: 'yoji', meaningFr: '4 h', script: 'hiragana', kanji: '四時', tag: 'heure' },
  { id: 'nb-六時半', kana: 'ろくじはん', romaji: 'rokujihan', meaningFr: '6 h 30', script: 'hiragana', kanji: '六時半', tag: 'heure' },
  { id: 'nb-七時', kana: 'しちじ', romaji: 'shichiji', meaningFr: '7 h', script: 'hiragana', kanji: '七時', tag: 'heure' },
  { id: 'nb-九時', kana: 'くじ', romaji: 'kuji', meaningFr: '9 h', script: 'hiragana', kanji: '九時', tag: 'heure' },
  { id: 'nb-十時', kana: 'じゅうじ', romaji: 'jūji', meaningFr: '10 h', script: 'hiragana', kanji: '十時', tag: 'heure' },
  { id: 'nb-午前十時', kana: 'ごぜんじゅうじ', romaji: 'gozen jūji', meaningFr: '10 h du matin', script: 'hiragana', kanji: '午前十時', tag: 'heure' },
  { id: 'nb-午後三時', kana: 'ごごさんじ', romaji: 'gogo sanji', meaningFr: "3 h de l'après-midi", script: 'hiragana', kanji: '午後三時', tag: 'heure' },
];
