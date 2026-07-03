import type { Unit } from './types';

/**
 * Parcours d'apprentissage complet de NanoLingo.
 * Chaque item des fichiers hiragana.ts, katakana.ts, kanji-n5.ts et vocab.ts
 * apparaît dans exactement une leçon (4 à 6 items par leçon).
 */
export const UNITS: Unit[] = [
  // ═══════════════════════ HIRAGANA I ═══════════════════════
  {
    id: 'u-hira-1',
    title: 'Hiragana I',
    icon: '🌸',
    lessons: [
      { id: 'l-hira-1-1', title: 'あ・い・う・え・お', newItemIds: ['h-a', 'h-i', 'h-u', 'h-e', 'h-o'] },
      { id: 'l-hira-1-2', title: 'か・き・く・け・こ', newItemIds: ['h-ka', 'h-ki', 'h-ku', 'h-ke', 'h-ko'] },
      { id: 'l-hira-1-3', title: 'さ・し・す・せ・そ', newItemIds: ['h-sa', 'h-shi', 'h-su', 'h-se', 'h-so'] },
      { id: 'l-hira-1-4', title: 'た・ち・つ・て・と', newItemIds: ['h-ta', 'h-chi', 'h-tsu', 'h-te', 'h-to'] },
      { id: 'l-hira-1-5', title: 'な・に・ぬ・ね・の', newItemIds: ['h-na', 'h-ni', 'h-nu', 'h-ne', 'h-no'] },
    ],
  },

  // ═══════════════════════ HIRAGANA II ═══════════════════════
  {
    id: 'u-hira-2',
    title: 'Hiragana II',
    icon: '🎋',
    lessons: [
      { id: 'l-hira-2-1', title: 'は・ひ・ふ・へ・ほ', newItemIds: ['h-ha', 'h-hi', 'h-fu', 'h-he', 'h-ho'] },
      { id: 'l-hira-2-2', title: 'ま・み・む・め・も', newItemIds: ['h-ma', 'h-mi', 'h-mu', 'h-me', 'h-mo'] },
      { id: 'l-hira-2-3', title: 'ら・り・る・れ・ろ', newItemIds: ['h-ra', 'h-ri', 'h-ru', 'h-re', 'h-ro'] },
      { id: 'l-hira-2-4', title: 'や・ゆ・よ・わ・を・ん', newItemIds: ['h-ya', 'h-yu', 'h-yo', 'h-wa', 'h-wo', 'h-n'] },
    ],
  },

  // ═══════════════════════ VOCABULAIRE I ═══════════════════════
  {
    id: 'u-vocab-1',
    title: 'Vocabulaire I',
    icon: '🐱',
    lessons: [
      { id: 'l-vocab-1-1', title: 'Nature et animaux', newItemIds: ['v-ねこ', 'v-いぬ', 'v-やま', 'v-かわ', 'v-うみ', 'v-そら'] },
      { id: 'l-vocab-1-2', title: 'Ciel et jardin', newItemIds: ['v-あめ', 'v-ゆき', 'v-つき', 'v-ほし', 'v-はな', 'v-とり'] },
      { id: 'l-vocab-1-3', title: 'Maison et corps', newItemIds: ['v-いえ', 'v-ほん', 'v-みみ', 'v-くち', 'v-ひと', 'v-あさ'] },
      { id: 'l-vocab-1-4', title: 'Vie quotidienne', newItemIds: ['v-よる', 'v-いま', 'v-えき', 'v-にく', 'v-はし', 'v-くつ'] },
    ],
  },

  // ═══════════════════ HIRAGANA — SONS VOISÉS ═══════════════════
  {
    id: 'u-hira-dakuten',
    title: 'Hiragana — sons voisés',
    icon: '🔊',
    lessons: [
      { id: 'l-hira-dk-1', title: 'が・ぎ・ぐ・げ・ご', newItemIds: ['h-ga', 'h-gi', 'h-gu', 'h-ge', 'h-go'] },
      { id: 'l-hira-dk-2', title: 'ざ・じ・ず・ぜ・ぞ', newItemIds: ['h-za', 'h-ji', 'h-zu', 'h-ze', 'h-zo'] },
      { id: 'l-hira-dk-3', title: 'だ・ぢ・づ・で・ど', newItemIds: ['h-da', 'h-dji', 'h-dzu', 'h-de', 'h-do'] },
      { id: 'l-hira-dk-4', title: 'ば・び・ぶ・べ・ぼ', newItemIds: ['h-ba', 'h-bi', 'h-bu', 'h-be', 'h-bo'] },
      { id: 'l-hira-dk-5', title: 'ぱ・ぴ・ぷ・ぺ・ぽ', newItemIds: ['h-pa', 'h-pi', 'h-pu', 'h-pe', 'h-po'] },
    ],
  },

  // ═══════════════════ HIRAGANA — COMBINAISONS ═══════════════════
  {
    id: 'u-hira-yoon',
    title: 'Hiragana — combinaisons',
    icon: '🔗',
    lessons: [
      { id: 'l-hira-yo-1', title: 'きゃ・きゅ・きょ／しゃ・しゅ・しょ', newItemIds: ['h-kya', 'h-kyu', 'h-kyo', 'h-sha', 'h-shu', 'h-sho'] },
      { id: 'l-hira-yo-2', title: 'ちゃ・ちゅ・ちょ／にゃ・にゅ・にょ', newItemIds: ['h-cha', 'h-chu', 'h-cho', 'h-nya', 'h-nyu', 'h-nyo'] },
      { id: 'l-hira-yo-3', title: 'ひゃ・ひゅ・ひょ／みゃ・みゅ・みょ', newItemIds: ['h-hya', 'h-hyu', 'h-hyo', 'h-mya', 'h-myu', 'h-myo'] },
      { id: 'l-hira-yo-4', title: 'りゃ・りゅ・りょ／ぎゃ・ぎゅ・ぎょ', newItemIds: ['h-rya', 'h-ryu', 'h-ryo', 'h-gya', 'h-gyu', 'h-gyo'] },
      { id: 'l-hira-yo-5', title: 'じゃ・じゅ・じょ／びゃ・びゅ', newItemIds: ['h-ja', 'h-ju', 'h-jo', 'h-bya', 'h-byu'] },
      { id: 'l-hira-yo-6', title: 'びょ／ぴゃ・ぴゅ・ぴょ', newItemIds: ['h-byo', 'h-pya', 'h-pyu', 'h-pyo'] },
    ],
  },

  // ═══════════════════════ VOCABULAIRE II ═══════════════════════
  {
    id: 'u-vocab-2',
    title: 'Vocabulaire II',
    icon: '🍙',
    lessons: [
      { id: 'l-vocab-2-1', title: 'Saisons et météo', newItemIds: ['v-かさ', 'v-はる', 'v-なつ', 'v-あき', 'v-ふゆ', 'v-くも'] },
      { id: 'l-vocab-2-2', title: 'Gens et objets', newItemIds: ['v-さかな', 'v-くるま', 'v-おとこ', 'v-おんな', 'v-なまえ', 'v-あした'] },
      { id: 'l-vocab-2-3', title: 'La vie de tous les jours', newItemIds: ['v-きのう', 'v-わたし', 'v-やさい', 'v-おかね', 'v-つくえ', 'v-せんせい'] },
      { id: 'l-vocab-2-4', title: 'Premiers sons voisés', newItemIds: ['v-ひこうき', 'v-みず', 'v-かぜ', 'v-まど', 'v-たまご', 'v-かばん'] },
      { id: 'l-vocab-2-5', title: 'À la maison', newItemIds: ['v-めがね', 'v-ごはん', 'v-でんわ', 'v-てがみ', 'v-こども', 'v-ともだち'] },
      { id: 'l-vocab-2-6', title: 'Famille et ville', newItemIds: ['v-かぞく', 'v-しんぶん', 'v-えんぴつ', 'v-ぎんこう'] },
      { id: 'l-vocab-2-7', title: 'Mots avec combinaisons', newItemIds: ['v-おちゃ', 'v-きょう', 'v-じしょ', 'v-しゃしん', 'v-でんしゃ', 'v-かいしゃ'] },
      { id: 'l-vocab-2-8', title: 'Voyage et école', newItemIds: ['v-りょこう', 'v-べんきょう', 'v-きって', 'v-きっぷ', 'v-ざっし', 'v-がっこう'] },
    ],
  },

  // ═══════════════════════ KATAKANA I ═══════════════════════
  {
    id: 'u-kata-1',
    title: 'Katakana I',
    icon: '⚡',
    lessons: [
      { id: 'l-kata-1-1', title: 'ア・イ・ウ・エ・オ', newItemIds: ['k-a', 'k-i', 'k-u', 'k-e', 'k-o'] },
      { id: 'l-kata-1-2', title: 'カ・キ・ク・ケ・コ', newItemIds: ['k-ka', 'k-ki', 'k-ku', 'k-ke', 'k-ko'] },
      { id: 'l-kata-1-3', title: 'サ・シ・ス・セ・ソ', newItemIds: ['k-sa', 'k-shi', 'k-su', 'k-se', 'k-so'] },
      { id: 'l-kata-1-4', title: 'タ・チ・ツ・テ・ト', newItemIds: ['k-ta', 'k-chi', 'k-tsu', 'k-te', 'k-to'] },
      { id: 'l-kata-1-5', title: 'ナ・ニ・ヌ・ネ・ノ', newItemIds: ['k-na', 'k-ni', 'k-nu', 'k-ne', 'k-no'] },
    ],
  },

  // ═══════════════════════ KATAKANA II ═══════════════════════
  {
    id: 'u-kata-2',
    title: 'Katakana II',
    icon: '🤖',
    lessons: [
      { id: 'l-kata-2-1', title: 'ハ・ヒ・フ・ヘ・ホ', newItemIds: ['k-ha', 'k-hi', 'k-fu', 'k-he', 'k-ho'] },
      { id: 'l-kata-2-2', title: 'マ・ミ・ム・メ・モ', newItemIds: ['k-ma', 'k-mi', 'k-mu', 'k-me', 'k-mo'] },
      { id: 'l-kata-2-3', title: 'ラ・リ・ル・レ・ロ', newItemIds: ['k-ra', 'k-ri', 'k-ru', 'k-re', 'k-ro'] },
      { id: 'l-kata-2-4', title: 'ヤ・ユ・ヨ・ワ・ヲ・ン', newItemIds: ['k-ya', 'k-yu', 'k-yo', 'k-wa', 'k-wo', 'k-n'] },
    ],
  },

  // ═══════════════════ KATAKANA — SONS VOISÉS ═══════════════════
  {
    id: 'u-kata-dakuten',
    title: 'Katakana — sons voisés',
    icon: '📢',
    lessons: [
      { id: 'l-kata-dk-1', title: 'ガ・ギ・グ・ゲ・ゴ', newItemIds: ['k-ga', 'k-gi', 'k-gu', 'k-ge', 'k-go'] },
      { id: 'l-kata-dk-2', title: 'ザ・ジ・ズ・ゼ・ゾ', newItemIds: ['k-za', 'k-ji', 'k-zu', 'k-ze', 'k-zo'] },
      { id: 'l-kata-dk-3', title: 'ダ・ヂ・ヅ・デ・ド', newItemIds: ['k-da', 'k-dji', 'k-dzu', 'k-de', 'k-do'] },
      { id: 'l-kata-dk-4', title: 'バ・ビ・ブ・ベ・ボ', newItemIds: ['k-ba', 'k-bi', 'k-bu', 'k-be', 'k-bo'] },
      { id: 'l-kata-dk-5', title: 'パ・ピ・プ・ペ・ポ', newItemIds: ['k-pa', 'k-pi', 'k-pu', 'k-pe', 'k-po'] },
    ],
  },

  // ═══════════════════ KATAKANA — COMBINAISONS ═══════════════════
  {
    id: 'u-kata-yoon',
    title: 'Katakana — combinaisons',
    icon: '🧩',
    lessons: [
      { id: 'l-kata-yo-1', title: 'キャ・キュ・キョ／シャ・シュ・ショ', newItemIds: ['k-kya', 'k-kyu', 'k-kyo', 'k-sha', 'k-shu', 'k-sho'] },
      { id: 'l-kata-yo-2', title: 'チャ・チュ・チョ／ニャ・ニュ・ニョ', newItemIds: ['k-cha', 'k-chu', 'k-cho', 'k-nya', 'k-nyu', 'k-nyo'] },
      { id: 'l-kata-yo-3', title: 'ヒャ・ヒュ・ヒョ／ミャ・ミュ・ミョ', newItemIds: ['k-hya', 'k-hyu', 'k-hyo', 'k-mya', 'k-myu', 'k-myo'] },
      { id: 'l-kata-yo-4', title: 'リャ・リュ・リョ／ギャ・ギュ・ギョ', newItemIds: ['k-rya', 'k-ryu', 'k-ryo', 'k-gya', 'k-gyu', 'k-gyo'] },
      { id: 'l-kata-yo-5', title: 'ジャ・ジュ・ジョ／ビャ・ビュ', newItemIds: ['k-ja', 'k-ju', 'k-jo', 'k-bya', 'k-byu'] },
      { id: 'l-kata-yo-6', title: 'ビョ／ピャ・ピュ・ピョ', newItemIds: ['k-byo', 'k-pya', 'k-pyu', 'k-pyo'] },
    ],
  },

  // ═══════════════════ VOCABULAIRE KATAKANA ═══════════════════
  {
    id: 'u-vocab-kata',
    title: 'Vocabulaire katakana',
    icon: '☕',
    lessons: [
      { id: 'l-vocab-k-1', title: 'Premiers emprunts', newItemIds: ['v-トマト', 'v-ホテル', 'v-カメラ', 'v-トイレ', 'v-ミルク'] },
      { id: 'l-vocab-k-2', title: 'Au restaurant', newItemIds: ['v-ワイン', 'v-アメリカ', 'v-レストラン', 'v-パン', 'v-ペン'] },
      { id: 'l-vocab-k-3', title: 'À la maison', newItemIds: ['v-バス', 'v-ドア', 'v-テレビ', 'v-バナナ', 'v-ズボン'] },
      { id: 'l-vocab-k-4', title: 'Boissons et douceurs', newItemIds: ['v-コンビニ', 'v-コーヒー', 'v-ジュース', 'v-ケーキ', 'v-ノート'] },
      { id: 'l-vocab-k-5', title: 'En ville', newItemIds: ['v-スーパー', 'v-タクシー', 'v-シャツ', 'v-ベッド', 'v-サッカー'] },
    ],
  },

  // ═══════════════════════ NOMS ET PRÉNOMS ═══════════════════════
  {
    id: 'u-names',
    title: 'Noms et prénoms',
    icon: '📛',
    lessons: [
      { id: 'l-names-1', title: 'Prénoms en katakana I', newItemIds: ['n-エタン', 'n-マリー', 'n-トマ', 'n-ルイ', 'n-エマ', 'n-レア'] },
      { id: 'l-names-2', title: 'Prénoms en katakana II', newItemIds: ['n-ポール', 'n-ニコラ', 'n-ソフィー', 'n-ピエール', 'n-カミーユ', 'n-ジュリー'] },
      { id: 'l-names-3', title: 'Noms de famille japonais I', newItemIds: ['n-やまもと', 'n-おがわ', 'n-なかがわ', 'n-やまぐち', 'n-やました'] },
      { id: 'l-names-4', title: 'Noms de famille japonais II', newItemIds: ['n-おおにし', 'n-かねこ', 'n-きのした', 'n-かわぐち', 'n-ふるかわ'] },
    ],
  },

  // ═══════════════════ KANJI — LES NOMBRES ═══════════════════
  {
    id: 'u-kanji-nombres',
    title: 'Kanji — les nombres',
    icon: '🔢',
    lessons: [
      { id: 'l-kanji-nb-1', title: 'De un à cinq', newItemIds: ['kj-一', 'kj-二', 'kj-三', 'kj-四', 'kj-五'] },
      { id: 'l-kanji-nb-2', title: 'De six à dix', newItemIds: ['kj-六', 'kj-七', 'kj-八', 'kj-九', 'kj-十'] },
      { id: 'l-kanji-nb-3', title: 'Grands nombres et yen', newItemIds: ['kj-百', 'kj-千', 'kj-万', 'kj-円'] },
    ],
  },

  // ═══════════════════ KANJI — LE TEMPS ═══════════════════
  {
    id: 'u-kanji-temps',
    title: 'Kanji — le temps',
    icon: '🕐',
    lessons: [
      { id: 'l-kanji-tp-1', title: 'Les jours de la semaine I', newItemIds: ['kj-日', 'kj-月', 'kj-火', 'kj-水', 'kj-木'] },
      { id: 'l-kanji-tp-2', title: 'Les jours de la semaine II', newItemIds: ['kj-金', 'kj-土', 'kj-年', 'kj-時', 'kj-分'] },
      { id: 'l-kanji-tp-3', title: 'Semaines et durées', newItemIds: ['kj-間', 'kj-週', 'kj-今', 'kj-毎'] },
      { id: 'l-kanji-tp-4', title: 'Matin et après-midi', newItemIds: ['kj-半', 'kj-午', 'kj-前', 'kj-後'] },
    ],
  },

  // ═══════════════ KANJI — LES GENS ET LE CORPS ═══════════════
  {
    id: 'u-kanji-gens',
    title: 'Kanji — les gens et le corps',
    icon: '👪',
    lessons: [
      { id: 'l-kanji-gc-1', title: 'La famille I', newItemIds: ['kj-人', 'kj-男', 'kj-女', 'kj-子', 'kj-父'] },
      { id: 'l-kanji-gc-2', title: 'La famille II', newItemIds: ['kj-母', 'kj-友', 'kj-先', 'kj-生', 'kj-名'] },
      { id: 'l-kanji-gc-3', title: 'Le corps', newItemIds: ['kj-口', 'kj-目', 'kj-耳', 'kj-手', 'kj-足'] },
    ],
  },

  // ═══════════════════ KANJI — LES VERBES ═══════════════════
  {
    id: 'u-kanji-verbes',
    title: 'Kanji — les verbes',
    icon: '🏃',
    lessons: [
      { id: 'l-kanji-vb-1', title: 'Aller, venir, voir', newItemIds: ['kj-行', 'kj-来', 'kj-見', 'kj-聞', 'kj-読'] },
      { id: 'l-kanji-vb-2', title: 'Écrire, parler, manger', newItemIds: ['kj-書', 'kj-話', 'kj-言', 'kj-食', 'kj-飲'] },
      { id: 'l-kanji-vb-3', title: 'Actions du quotidien', newItemIds: ['kj-買', 'kj-立', 'kj-休', 'kj-出', 'kj-入', 'kj-会'] },
    ],
  },

  // ═══════════════ KANJI — ADJECTIFS ET NATURE ═══════════════
  {
    id: 'u-kanji-nature',
    title: 'Kanji — adjectifs et nature',
    icon: '🗻',
    lessons: [
      { id: 'l-kanji-nt-1', title: 'Grand ou petit', newItemIds: ['kj-大', 'kj-小', 'kj-高', 'kj-安', 'kj-新'] },
      { id: 'l-kanji-nt-2', title: 'Vieux, long, nombreux', newItemIds: ['kj-古', 'kj-長', 'kj-多', 'kj-少', 'kj-白'] },
      { id: 'l-kanji-nt-3', title: 'La nature', newItemIds: ['kj-山', 'kj-川', 'kj-天', 'kj-空', 'kj-雨'] },
      { id: 'l-kanji-nt-4', title: 'Éléments et vivant', newItemIds: ['kj-電', 'kj-気', 'kj-花', 'kj-魚'] },
    ],
  },

  // ═══════════ KANJI — LA VILLE ET LES ÉTUDES ═══════════
  {
    id: 'u-kanji-ville',
    title: 'Kanji — la ville et les études',
    icon: '🏙️',
    lessons: [
      { id: 'l-kanji-vl-1', title: 'Positions', newItemIds: ['kj-上', 'kj-下', 'kj-中', 'kj-外'] },
      { id: 'l-kanji-vl-2', title: 'Les directions', newItemIds: ['kj-右', 'kj-左', 'kj-北', 'kj-南', 'kj-東', 'kj-西'] },
      { id: 'l-kanji-vl-3', title: 'Les lieux', newItemIds: ['kj-駅', 'kj-店', 'kj-道', 'kj-国', 'kj-校', 'kj-社'] },
      { id: 'l-kanji-vl-4', title: 'Les études', newItemIds: ['kj-学', 'kj-語', 'kj-本', 'kj-何', 'kj-車'] },
    ],
  },
];
