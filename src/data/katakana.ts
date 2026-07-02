import type { KanaItem } from './types';

export const KATAKANA: KanaItem[] = [
  // ── kind 'base' (46) ─────────────────────────────────────────────
  { id: 'k-a', char: 'ア', romaji: 'a', kind: 'base', script: 'katakana' },
  { id: 'k-i', char: 'イ', romaji: 'i', kind: 'base', script: 'katakana' },
  { id: 'k-u', char: 'ウ', romaji: 'u', kind: 'base', script: 'katakana' },
  { id: 'k-e', char: 'エ', romaji: 'e', kind: 'base', script: 'katakana' },
  { id: 'k-o', char: 'オ', romaji: 'o', kind: 'base', script: 'katakana' },

  { id: 'k-ka', char: 'カ', romaji: 'ka', kind: 'base', script: 'katakana' },
  { id: 'k-ki', char: 'キ', romaji: 'ki', kind: 'base', script: 'katakana' },
  { id: 'k-ku', char: 'ク', romaji: 'ku', kind: 'base', script: 'katakana' },
  { id: 'k-ke', char: 'ケ', romaji: 'ke', kind: 'base', script: 'katakana' },
  { id: 'k-ko', char: 'コ', romaji: 'ko', kind: 'base', script: 'katakana' },

  { id: 'k-sa', char: 'サ', romaji: 'sa', kind: 'base', script: 'katakana' },
  { id: 'k-shi', char: 'シ', romaji: 'shi', kind: 'base', script: 'katakana' },
  { id: 'k-su', char: 'ス', romaji: 'su', kind: 'base', script: 'katakana' },
  { id: 'k-se', char: 'セ', romaji: 'se', kind: 'base', script: 'katakana' },
  { id: 'k-so', char: 'ソ', romaji: 'so', kind: 'base', script: 'katakana' },

  { id: 'k-ta', char: 'タ', romaji: 'ta', kind: 'base', script: 'katakana' },
  { id: 'k-chi', char: 'チ', romaji: 'chi', kind: 'base', script: 'katakana' },
  { id: 'k-tsu', char: 'ツ', romaji: 'tsu', kind: 'base', script: 'katakana' },
  { id: 'k-te', char: 'テ', romaji: 'te', kind: 'base', script: 'katakana' },
  { id: 'k-to', char: 'ト', romaji: 'to', kind: 'base', script: 'katakana' },

  { id: 'k-na', char: 'ナ', romaji: 'na', kind: 'base', script: 'katakana' },
  { id: 'k-ni', char: 'ニ', romaji: 'ni', kind: 'base', script: 'katakana' },
  { id: 'k-nu', char: 'ヌ', romaji: 'nu', kind: 'base', script: 'katakana' },
  { id: 'k-ne', char: 'ネ', romaji: 'ne', kind: 'base', script: 'katakana' },
  { id: 'k-no', char: 'ノ', romaji: 'no', kind: 'base', script: 'katakana' },

  { id: 'k-ha', char: 'ハ', romaji: 'ha', kind: 'base', script: 'katakana' },
  { id: 'k-hi', char: 'ヒ', romaji: 'hi', kind: 'base', script: 'katakana' },
  { id: 'k-fu', char: 'フ', romaji: 'fu', kind: 'base', script: 'katakana' },
  { id: 'k-he', char: 'ヘ', romaji: 'he', kind: 'base', script: 'katakana' },
  { id: 'k-ho', char: 'ホ', romaji: 'ho', kind: 'base', script: 'katakana' },

  { id: 'k-ma', char: 'マ', romaji: 'ma', kind: 'base', script: 'katakana' },
  { id: 'k-mi', char: 'ミ', romaji: 'mi', kind: 'base', script: 'katakana' },
  { id: 'k-mu', char: 'ム', romaji: 'mu', kind: 'base', script: 'katakana' },
  { id: 'k-me', char: 'メ', romaji: 'me', kind: 'base', script: 'katakana' },
  { id: 'k-mo', char: 'モ', romaji: 'mo', kind: 'base', script: 'katakana' },

  { id: 'k-ya', char: 'ヤ', romaji: 'ya', kind: 'base', script: 'katakana' },
  { id: 'k-yu', char: 'ユ', romaji: 'yu', kind: 'base', script: 'katakana' },
  { id: 'k-yo', char: 'ヨ', romaji: 'yo', kind: 'base', script: 'katakana' },

  { id: 'k-ra', char: 'ラ', romaji: 'ra', kind: 'base', script: 'katakana' },
  { id: 'k-ri', char: 'リ', romaji: 'ri', kind: 'base', script: 'katakana' },
  { id: 'k-ru', char: 'ル', romaji: 'ru', kind: 'base', script: 'katakana' },
  { id: 'k-re', char: 'レ', romaji: 're', kind: 'base', script: 'katakana' },
  { id: 'k-ro', char: 'ロ', romaji: 'ro', kind: 'base', script: 'katakana' },

  { id: 'k-wa', char: 'ワ', romaji: 'wa', kind: 'base', script: 'katakana' },
  { id: 'k-wo', char: 'ヲ', romaji: 'wo', kind: 'base', script: 'katakana' },
  { id: 'k-n', char: 'ン', romaji: 'n', kind: 'base', script: 'katakana' },

  // ── kind 'dakuten' (25) ──────────────────────────────────────────
  { id: 'k-ga', char: 'ガ', romaji: 'ga', kind: 'dakuten', script: 'katakana' },
  { id: 'k-gi', char: 'ギ', romaji: 'gi', kind: 'dakuten', script: 'katakana' },
  { id: 'k-gu', char: 'グ', romaji: 'gu', kind: 'dakuten', script: 'katakana' },
  { id: 'k-ge', char: 'ゲ', romaji: 'ge', kind: 'dakuten', script: 'katakana' },
  { id: 'k-go', char: 'ゴ', romaji: 'go', kind: 'dakuten', script: 'katakana' },

  { id: 'k-za', char: 'ザ', romaji: 'za', kind: 'dakuten', script: 'katakana' },
  { id: 'k-ji', char: 'ジ', romaji: 'ji', kind: 'dakuten', script: 'katakana' },
  { id: 'k-zu', char: 'ズ', romaji: 'zu', kind: 'dakuten', script: 'katakana' },
  { id: 'k-ze', char: 'ゼ', romaji: 'ze', kind: 'dakuten', script: 'katakana' },
  { id: 'k-zo', char: 'ゾ', romaji: 'zo', kind: 'dakuten', script: 'katakana' },

  { id: 'k-da', char: 'ダ', romaji: 'da', kind: 'dakuten', script: 'katakana' },
  { id: 'k-dji', char: 'ヂ', romaji: 'ji', kind: 'dakuten', script: 'katakana' },
  { id: 'k-dzu', char: 'ヅ', romaji: 'zu', kind: 'dakuten', script: 'katakana' },
  { id: 'k-de', char: 'デ', romaji: 'de', kind: 'dakuten', script: 'katakana' },
  { id: 'k-do', char: 'ド', romaji: 'do', kind: 'dakuten', script: 'katakana' },

  { id: 'k-ba', char: 'バ', romaji: 'ba', kind: 'dakuten', script: 'katakana' },
  { id: 'k-bi', char: 'ビ', romaji: 'bi', kind: 'dakuten', script: 'katakana' },
  { id: 'k-bu', char: 'ブ', romaji: 'bu', kind: 'dakuten', script: 'katakana' },
  { id: 'k-be', char: 'ベ', romaji: 'be', kind: 'dakuten', script: 'katakana' },
  { id: 'k-bo', char: 'ボ', romaji: 'bo', kind: 'dakuten', script: 'katakana' },

  { id: 'k-pa', char: 'パ', romaji: 'pa', kind: 'dakuten', script: 'katakana' },
  { id: 'k-pi', char: 'ピ', romaji: 'pi', kind: 'dakuten', script: 'katakana' },
  { id: 'k-pu', char: 'プ', romaji: 'pu', kind: 'dakuten', script: 'katakana' },
  { id: 'k-pe', char: 'ペ', romaji: 'pe', kind: 'dakuten', script: 'katakana' },
  { id: 'k-po', char: 'ポ', romaji: 'po', kind: 'dakuten', script: 'katakana' },

  // ── kind 'yoon' (33) ─────────────────────────────────────────────
  { id: 'k-kya', char: 'キャ', romaji: 'kya', kind: 'yoon', script: 'katakana' },
  { id: 'k-kyu', char: 'キュ', romaji: 'kyu', kind: 'yoon', script: 'katakana' },
  { id: 'k-kyo', char: 'キョ', romaji: 'kyo', kind: 'yoon', script: 'katakana' },

  { id: 'k-sha', char: 'シャ', romaji: 'sha', kind: 'yoon', script: 'katakana' },
  { id: 'k-shu', char: 'シュ', romaji: 'shu', kind: 'yoon', script: 'katakana' },
  { id: 'k-sho', char: 'ショ', romaji: 'sho', kind: 'yoon', script: 'katakana' },

  { id: 'k-cha', char: 'チャ', romaji: 'cha', kind: 'yoon', script: 'katakana' },
  { id: 'k-chu', char: 'チュ', romaji: 'chu', kind: 'yoon', script: 'katakana' },
  { id: 'k-cho', char: 'チョ', romaji: 'cho', kind: 'yoon', script: 'katakana' },

  { id: 'k-nya', char: 'ニャ', romaji: 'nya', kind: 'yoon', script: 'katakana' },
  { id: 'k-nyu', char: 'ニュ', romaji: 'nyu', kind: 'yoon', script: 'katakana' },
  { id: 'k-nyo', char: 'ニョ', romaji: 'nyo', kind: 'yoon', script: 'katakana' },

  { id: 'k-hya', char: 'ヒャ', romaji: 'hya', kind: 'yoon', script: 'katakana' },
  { id: 'k-hyu', char: 'ヒュ', romaji: 'hyu', kind: 'yoon', script: 'katakana' },
  { id: 'k-hyo', char: 'ヒョ', romaji: 'hyo', kind: 'yoon', script: 'katakana' },

  { id: 'k-mya', char: 'ミャ', romaji: 'mya', kind: 'yoon', script: 'katakana' },
  { id: 'k-myu', char: 'ミュ', romaji: 'myu', kind: 'yoon', script: 'katakana' },
  { id: 'k-myo', char: 'ミョ', romaji: 'myo', kind: 'yoon', script: 'katakana' },

  { id: 'k-rya', char: 'リャ', romaji: 'rya', kind: 'yoon', script: 'katakana' },
  { id: 'k-ryu', char: 'リュ', romaji: 'ryu', kind: 'yoon', script: 'katakana' },
  { id: 'k-ryo', char: 'リョ', romaji: 'ryo', kind: 'yoon', script: 'katakana' },

  { id: 'k-gya', char: 'ギャ', romaji: 'gya', kind: 'yoon', script: 'katakana' },
  { id: 'k-gyu', char: 'ギュ', romaji: 'gyu', kind: 'yoon', script: 'katakana' },
  { id: 'k-gyo', char: 'ギョ', romaji: 'gyo', kind: 'yoon', script: 'katakana' },

  { id: 'k-ja', char: 'ジャ', romaji: 'ja', kind: 'yoon', script: 'katakana' },
  { id: 'k-ju', char: 'ジュ', romaji: 'ju', kind: 'yoon', script: 'katakana' },
  { id: 'k-jo', char: 'ジョ', romaji: 'jo', kind: 'yoon', script: 'katakana' },

  { id: 'k-bya', char: 'ビャ', romaji: 'bya', kind: 'yoon', script: 'katakana' },
  { id: 'k-byu', char: 'ビュ', romaji: 'byu', kind: 'yoon', script: 'katakana' },
  { id: 'k-byo', char: 'ビョ', romaji: 'byo', kind: 'yoon', script: 'katakana' },

  { id: 'k-pya', char: 'ピャ', romaji: 'pya', kind: 'yoon', script: 'katakana' },
  { id: 'k-pyu', char: 'ピュ', romaji: 'pyu', kind: 'yoon', script: 'katakana' },
  { id: 'k-pyo', char: 'ピョ', romaji: 'pyo', kind: 'yoon', script: 'katakana' },
];
