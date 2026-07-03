import type { VocabItem } from './types';

// Mini-phrases N5 pour la compréhension écrite et orale (tag 'phrase').
// Progression en 3 groupes de 6 : désignation (…です), verbes en ます, existence et lieu.
// Le champ kanji n'est présent que si tous ses kanji figurent dans kanji-n5.ts.
export const SENTENCES: VocabItem[] = [
  // ---- Groupe 1 : désignation (これ / それ / あれ + です・ですか) ----
  { id: 'ph-01', kana: 'これはねこです。', romaji: 'kore wa neko desu', meaningFr: "C'est un chat.", script: 'hiragana', tag: 'phrase' },
  { id: 'ph-02', kana: 'それはほんです。', romaji: 'sore wa hon desu', meaningFr: "C'est un livre.", script: 'hiragana', kanji: 'それは本です。', tag: 'phrase' },
  { id: 'ph-03', kana: 'あれはやまです。', romaji: 'are wa yama desu', meaningFr: "C'est une montagne, là-bas.", script: 'hiragana', kanji: 'あれは山です。', tag: 'phrase' },
  { id: 'ph-04', kana: 'これはみずです。', romaji: 'kore wa mizu desu', meaningFr: "C'est de l'eau.", script: 'hiragana', kanji: 'これは水です。', tag: 'phrase' },
  { id: 'ph-05', kana: 'これはなんですか。', romaji: 'kore wa nan desu ka', meaningFr: "Qu'est-ce que c'est ?", script: 'hiragana', kanji: 'これは何ですか。', tag: 'phrase' },
  { id: 'ph-06', kana: 'それはいぬですか。', romaji: 'sore wa inu desu ka', meaningFr: "Est-ce que c'est un chien ?", script: 'hiragana', tag: 'phrase' },
  // ---- Groupe 2 : verbes en ます (…を + verbe) ----
  { id: 'ph-07', kana: 'ほんをよみます。', romaji: 'hon o yomimasu', meaningFr: 'Je lis un livre.', script: 'hiragana', kanji: '本を読みます。', tag: 'phrase' },
  { id: 'ph-08', kana: 'みずをのみます。', romaji: 'mizu o nomimasu', meaningFr: "Je bois de l'eau.", script: 'hiragana', kanji: '水を飲みます。', tag: 'phrase' },
  { id: 'ph-09', kana: 'パンをたべます。', romaji: 'pan o tabemasu', meaningFr: 'Je mange du pain.', script: 'hiragana', kanji: 'パンを食べます。', tag: 'phrase' },
  { id: 'ph-10', kana: 'テレビをみます。', romaji: 'terebi o mimasu', meaningFr: 'Je regarde la télévision.', script: 'hiragana', kanji: 'テレビを見ます。', tag: 'phrase' },
  { id: 'ph-11', kana: 'くつをかいます。', romaji: 'kutsu o kaimasu', meaningFr: "J'achète des chaussures.", script: 'hiragana', kanji: 'くつを買います。', tag: 'phrase' },
  { id: 'ph-12', kana: 'えきにいきます。', romaji: 'eki ni ikimasu', meaningFr: 'Je vais à la gare.', script: 'hiragana', kanji: '駅に行きます。', tag: 'phrase' },
  // ---- Groupe 3 : existence et lieu (います / あります / どこ / ここ) ----
  { id: 'ph-13', kana: 'ねこがいます。', romaji: 'neko ga imasu', meaningFr: 'Il y a un chat.', script: 'hiragana', tag: 'phrase' },
  { id: 'ph-14', kana: 'ほんがあります。', romaji: 'hon ga arimasu', meaningFr: 'Il y a un livre.', script: 'hiragana', kanji: '本があります。', tag: 'phrase' },
  { id: 'ph-15', kana: 'トイレはどこですか。', romaji: 'toire wa doko desu ka', meaningFr: 'Où sont les toilettes ?', script: 'hiragana', tag: 'phrase' },
  { id: 'ph-16', kana: 'ペンはどこですか。', romaji: 'pen wa doko desu ka', meaningFr: 'Où est le stylo ?', script: 'hiragana', tag: 'phrase' },
  { id: 'ph-17', kana: 'ぎんこうはここです。', romaji: 'ginkō wa koko desu', meaningFr: 'La banque est ici.', script: 'hiragana', tag: 'phrase' },
  { id: 'ph-18', kana: 'バスはあそこです。', romaji: 'basu wa asoko desu', meaningFr: 'Le bus est là-bas.', script: 'hiragana', tag: 'phrase' },
];
