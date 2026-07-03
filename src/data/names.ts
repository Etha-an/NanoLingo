import type { VocabItem } from './types';

/**
 * Noms et prénoms : prénoms français transcrits en katakana, et noms de
 * famille japonais courants dont tous les kanji font partie de la liste N5
 * (la graphie kanji se débloque automatiquement, avec furigana).
 * Modélisés comme des items de vocabulaire : tous les exercices existants
 * (QCM, écoute, saisie rōmaji, clavier japonais) s'appliquent.
 */
export const NAMES: VocabItem[] = [
  // ---- Prénoms français en katakana ----
  { id: 'n-エタン', kana: 'エタン', romaji: 'etan', meaningFr: 'Ethan (prénom)', script: 'katakana' },
  { id: 'n-マリー', kana: 'マリー', romaji: 'marī', meaningFr: 'Marie (prénom)', script: 'katakana' },
  { id: 'n-トマ', kana: 'トマ', romaji: 'toma', meaningFr: 'Thomas (prénom)', script: 'katakana' },
  { id: 'n-ルイ', kana: 'ルイ', romaji: 'rui', meaningFr: 'Louis (prénom)', script: 'katakana' },
  { id: 'n-エマ', kana: 'エマ', romaji: 'ema', meaningFr: 'Emma (prénom)', script: 'katakana' },
  { id: 'n-レア', kana: 'レア', romaji: 'rea', meaningFr: 'Léa (prénom)', script: 'katakana' },
  { id: 'n-ポール', kana: 'ポール', romaji: 'pōru', meaningFr: 'Paul (prénom)', script: 'katakana' },
  { id: 'n-ニコラ', kana: 'ニコラ', romaji: 'nikora', meaningFr: 'Nicolas (prénom)', script: 'katakana' },
  { id: 'n-ソフィー', kana: 'ソフィー', romaji: 'sofī', meaningFr: 'Sophie (prénom)', script: 'katakana' },
  { id: 'n-ピエール', kana: 'ピエール', romaji: 'piēru', meaningFr: 'Pierre (prénom)', script: 'katakana' },
  { id: 'n-カミーユ', kana: 'カミーユ', romaji: 'kamīyu', meaningFr: 'Camille (prénom)', script: 'katakana' },
  { id: 'n-ジュリー', kana: 'ジュリー', romaji: 'jurī', meaningFr: 'Julie (prénom)', script: 'katakana' },
  // ---- Noms de famille japonais courants (kanji 100 % N5) ----
  { id: 'n-やまもと', kana: 'やまもと', romaji: 'yamamoto', meaningFr: 'Yamamoto (nom de famille)', script: 'hiragana', kanji: '山本' },
  { id: 'n-おがわ', kana: 'おがわ', romaji: 'ogawa', meaningFr: 'Ogawa (nom de famille)', script: 'hiragana', kanji: '小川' },
  { id: 'n-なかがわ', kana: 'なかがわ', romaji: 'nakagawa', meaningFr: 'Nakagawa (nom de famille)', script: 'hiragana', kanji: '中川' },
  { id: 'n-やまぐち', kana: 'やまぐち', romaji: 'yamaguchi', meaningFr: 'Yamaguchi (nom de famille)', script: 'hiragana', kanji: '山口' },
  { id: 'n-やました', kana: 'やました', romaji: 'yamashita', meaningFr: 'Yamashita (nom de famille)', script: 'hiragana', kanji: '山下' },
  { id: 'n-おおにし', kana: 'おおにし', romaji: 'ōnishi', meaningFr: 'Ōnishi (nom de famille)', script: 'hiragana', kanji: '大西' },
  { id: 'n-かねこ', kana: 'かねこ', romaji: 'kaneko', meaningFr: 'Kaneko (nom de famille)', script: 'hiragana', kanji: '金子' },
  { id: 'n-きのした', kana: 'きのした', romaji: 'kinoshita', meaningFr: 'Kinoshita (nom de famille)', script: 'hiragana', kanji: '木下' },
  { id: 'n-かわぐち', kana: 'かわぐち', romaji: 'kawaguchi', meaningFr: 'Kawaguchi (nom de famille)', script: 'hiragana', kanji: '川口' },
  { id: 'n-ふるかわ', kana: 'ふるかわ', romaji: 'furukawa', meaningFr: 'Furukawa (nom de famille)', script: 'hiragana', kanji: '古川' },
];
