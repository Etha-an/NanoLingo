import type { KanjiItem } from './types';

/**
 * Les 103 kanji du JLPT N5 (liste de facto : Jisho / anciennes listes 4級).
 * Ordre du tableau = ordre d'apprentissage, groupé par thèmes pédagogiques.
 */
export const KANJI_N5: KanjiItem[] = [
  // ─── Nombres et monnaie ───
  { id: 'kj-一', char: '一', meaningsFr: ['un'], onyomi: ['イチ'], kunyomi: ['ひとつ'] },
  { id: 'kj-二', char: '二', meaningsFr: ['deux'], onyomi: ['ニ'], kunyomi: ['ふたつ'] },
  { id: 'kj-三', char: '三', meaningsFr: ['trois'], onyomi: ['サン'], kunyomi: ['みっつ'] },
  { id: 'kj-四', char: '四', meaningsFr: ['quatre'], onyomi: ['シ'], kunyomi: ['よん', 'よっつ'] },
  { id: 'kj-五', char: '五', meaningsFr: ['cinq'], onyomi: ['ゴ'], kunyomi: ['いつつ'] },
  { id: 'kj-六', char: '六', meaningsFr: ['six'], onyomi: ['ロク'], kunyomi: ['むっつ'] },
  { id: 'kj-七', char: '七', meaningsFr: ['sept'], onyomi: ['シチ'], kunyomi: ['なな', 'ななつ'] },
  { id: 'kj-八', char: '八', meaningsFr: ['huit'], onyomi: ['ハチ'], kunyomi: ['やっつ'] },
  { id: 'kj-九', char: '九', meaningsFr: ['neuf'], onyomi: ['キュウ', 'ク'], kunyomi: ['ここのつ'] },
  { id: 'kj-十', char: '十', meaningsFr: ['dix'], onyomi: ['ジュウ'], kunyomi: ['とお'] },
  { id: 'kj-百', char: '百', meaningsFr: ['cent'], onyomi: ['ヒャク'], kunyomi: [] },
  { id: 'kj-千', char: '千', meaningsFr: ['mille'], onyomi: ['セン'], kunyomi: [] },
  { id: 'kj-万', char: '万', meaningsFr: ['dix mille'], onyomi: ['マン'], kunyomi: [] },
  { id: 'kj-円', char: '円', meaningsFr: ['yen', 'cercle'], onyomi: ['エン'], kunyomi: [] },

  // ─── Temps et calendrier ───
  { id: 'kj-日', char: '日', meaningsFr: ['jour', 'soleil'], onyomi: ['ニチ', 'ジツ'], kunyomi: ['ひ', 'か'] },
  { id: 'kj-月', char: '月', meaningsFr: ['mois', 'lune'], onyomi: ['ゲツ', 'ガツ'], kunyomi: ['つき'] },
  { id: 'kj-火', char: '火', meaningsFr: ['feu'], onyomi: ['カ'], kunyomi: ['ひ'] },
  { id: 'kj-水', char: '水', meaningsFr: ['eau'], onyomi: ['スイ'], kunyomi: ['みず'] },
  { id: 'kj-木', char: '木', meaningsFr: ['arbre', 'bois'], onyomi: ['モク', 'ボク'], kunyomi: ['き'] },
  { id: 'kj-金', char: '金', meaningsFr: ['or', 'argent'], onyomi: ['キン'], kunyomi: ['かね'] },
  { id: 'kj-土', char: '土', meaningsFr: ['terre', 'sol'], onyomi: ['ド', 'ト'], kunyomi: ['つち'] },
  { id: 'kj-年', char: '年', meaningsFr: ['année', 'an'], onyomi: ['ネン'], kunyomi: ['とし'] },
  { id: 'kj-時', char: '時', meaningsFr: ['heure', 'temps'], onyomi: ['ジ'], kunyomi: ['とき'] },
  { id: 'kj-分', char: '分', meaningsFr: ['minute', 'partie', 'comprendre'], onyomi: ['フン', 'ブン'], kunyomi: ['わかる', 'わける'] },
  { id: 'kj-間', char: '間', meaningsFr: ['intervalle', 'durée'], onyomi: ['カン'], kunyomi: ['あいだ', 'ま'] },
  { id: 'kj-週', char: '週', meaningsFr: ['semaine'], onyomi: ['シュウ'], kunyomi: [] },
  { id: 'kj-今', char: '今', meaningsFr: ['maintenant'], onyomi: ['コン'], kunyomi: ['いま'] },
  { id: 'kj-毎', char: '毎', meaningsFr: ['chaque'], onyomi: ['マイ'], kunyomi: [] },
  { id: 'kj-半', char: '半', meaningsFr: ['moitié', 'demi'], onyomi: ['ハン'], kunyomi: [] },
  { id: 'kj-午', char: '午', meaningsFr: ['midi'], onyomi: ['ゴ'], kunyomi: [] },
  { id: 'kj-前', char: '前', meaningsFr: ['avant', 'devant'], onyomi: ['ゼン'], kunyomi: ['まえ'] },
  { id: 'kj-後', char: '後', meaningsFr: ['après', 'derrière'], onyomi: ['ゴ', 'コウ'], kunyomi: ['あと', 'うしろ', 'のち'] },

  // ─── Personnes et famille ───
  { id: 'kj-人', char: '人', meaningsFr: ['personne', 'humain'], onyomi: ['ジン', 'ニン'], kunyomi: ['ひと'] },
  { id: 'kj-男', char: '男', meaningsFr: ['homme', 'masculin'], onyomi: ['ダン', 'ナン'], kunyomi: ['おとこ'] },
  { id: 'kj-女', char: '女', meaningsFr: ['femme', 'féminin'], onyomi: ['ジョ'], kunyomi: ['おんな'] },
  { id: 'kj-子', char: '子', meaningsFr: ['enfant'], onyomi: ['シ'], kunyomi: ['こ'] },
  { id: 'kj-父', char: '父', meaningsFr: ['père'], onyomi: ['フ'], kunyomi: ['ちち'] },
  { id: 'kj-母', char: '母', meaningsFr: ['mère'], onyomi: ['ボ'], kunyomi: ['はは'] },
  { id: 'kj-友', char: '友', meaningsFr: ['ami'], onyomi: ['ユウ'], kunyomi: ['とも'] },
  { id: 'kj-先', char: '先', meaningsFr: ['avant', 'précédent', 'pointe'], onyomi: ['セン'], kunyomi: ['さき'] },
  { id: 'kj-生', char: '生', meaningsFr: ['vie', 'naître', 'cru'], onyomi: ['セイ', 'ショウ'], kunyomi: ['いきる', 'うまれる', 'なま'] },
  { id: 'kj-名', char: '名', meaningsFr: ['nom'], onyomi: ['メイ', 'ミョウ'], kunyomi: ['な'] },

  // ─── Corps ───
  { id: 'kj-口', char: '口', meaningsFr: ['bouche'], onyomi: ['コウ'], kunyomi: ['くち'] },
  { id: 'kj-目', char: '目', meaningsFr: ['œil'], onyomi: ['モク'], kunyomi: ['め'] },
  { id: 'kj-耳', char: '耳', meaningsFr: ['oreille'], onyomi: ['ジ'], kunyomi: ['みみ'] },
  { id: 'kj-手', char: '手', meaningsFr: ['main'], onyomi: ['シュ'], kunyomi: ['て'] },
  { id: 'kj-足', char: '足', meaningsFr: ['pied', 'jambe', 'suffire'], onyomi: ['ソク'], kunyomi: ['あし', 'たりる'] },

  // ─── Verbes courants ───
  { id: 'kj-行', char: '行', meaningsFr: ['aller'], onyomi: ['コウ', 'ギョウ'], kunyomi: ['いく', 'おこなう'] },
  { id: 'kj-来', char: '来', meaningsFr: ['venir'], onyomi: ['ライ'], kunyomi: ['くる'] },
  { id: 'kj-見', char: '見', meaningsFr: ['voir', 'regarder'], onyomi: ['ケン'], kunyomi: ['みる', 'みえる', 'みせる'] },
  { id: 'kj-聞', char: '聞', meaningsFr: ['écouter', 'entendre', 'demander'], onyomi: ['ブン'], kunyomi: ['きく', 'きこえる'] },
  { id: 'kj-読', char: '読', meaningsFr: ['lire'], onyomi: ['ドク'], kunyomi: ['よむ'] },
  { id: 'kj-書', char: '書', meaningsFr: ['écrire'], onyomi: ['ショ'], kunyomi: ['かく'] },
  { id: 'kj-話', char: '話', meaningsFr: ['parler', 'histoire'], onyomi: ['ワ'], kunyomi: ['はなす', 'はなし'] },
  { id: 'kj-言', char: '言', meaningsFr: ['dire', 'mot'], onyomi: ['ゲン', 'ゴン'], kunyomi: ['いう', 'こと'] },
  { id: 'kj-食', char: '食', meaningsFr: ['manger', 'nourriture'], onyomi: ['ショク'], kunyomi: ['たべる'] },
  { id: 'kj-飲', char: '飲', meaningsFr: ['boire'], onyomi: ['イン'], kunyomi: ['のむ'] },
  { id: 'kj-買', char: '買', meaningsFr: ['acheter'], onyomi: ['バイ'], kunyomi: ['かう'] },
  { id: 'kj-立', char: '立', meaningsFr: ['se lever', 'debout'], onyomi: ['リツ'], kunyomi: ['たつ', 'たてる'] },
  { id: 'kj-休', char: '休', meaningsFr: ['se reposer', 'congé'], onyomi: ['キュウ'], kunyomi: ['やすむ'] },
  { id: 'kj-出', char: '出', meaningsFr: ['sortir', 'sortie'], onyomi: ['シュツ'], kunyomi: ['でる', 'だす'] },
  { id: 'kj-入', char: '入', meaningsFr: ['entrer', 'entrée'], onyomi: ['ニュウ'], kunyomi: ['はいる', 'いれる'] },
  { id: 'kj-会', char: '会', meaningsFr: ['rencontrer', 'réunion'], onyomi: ['カイ'], kunyomi: ['あう'] },

  // ─── Adjectifs et dimensions ───
  { id: 'kj-大', char: '大', meaningsFr: ['grand'], onyomi: ['ダイ', 'タイ'], kunyomi: ['おおきい'] },
  { id: 'kj-小', char: '小', meaningsFr: ['petit'], onyomi: ['ショウ'], kunyomi: ['ちいさい', 'こ'] },
  { id: 'kj-高', char: '高', meaningsFr: ['haut', 'cher'], onyomi: ['コウ'], kunyomi: ['たかい'] },
  { id: 'kj-安', char: '安', meaningsFr: ['bon marché', 'tranquille'], onyomi: ['アン'], kunyomi: ['やすい'] },
  { id: 'kj-新', char: '新', meaningsFr: ['nouveau'], onyomi: ['シン'], kunyomi: ['あたらしい'] },
  { id: 'kj-古', char: '古', meaningsFr: ['vieux', 'ancien'], onyomi: ['コ'], kunyomi: ['ふるい'] },
  { id: 'kj-長', char: '長', meaningsFr: ['long', 'chef'], onyomi: ['チョウ'], kunyomi: ['ながい'] },
  { id: 'kj-多', char: '多', meaningsFr: ['nombreux', 'beaucoup'], onyomi: ['タ'], kunyomi: ['おおい'] },
  { id: 'kj-少', char: '少', meaningsFr: ['peu', 'un peu'], onyomi: ['ショウ'], kunyomi: ['すくない', 'すこし'] },
  { id: 'kj-白', char: '白', meaningsFr: ['blanc'], onyomi: ['ハク'], kunyomi: ['しろ', 'しろい'] },

  // ─── Nature et éléments ───
  { id: 'kj-山', char: '山', meaningsFr: ['montagne'], onyomi: ['サン'], kunyomi: ['やま'] },
  { id: 'kj-川', char: '川', meaningsFr: ['rivière'], onyomi: ['セン'], kunyomi: ['かわ'] },
  { id: 'kj-天', char: '天', meaningsFr: ['ciel', 'paradis'], onyomi: ['テン'], kunyomi: [] },
  { id: 'kj-空', char: '空', meaningsFr: ['ciel', 'vide'], onyomi: ['クウ'], kunyomi: ['そら', 'あく', 'から'] },
  { id: 'kj-雨', char: '雨', meaningsFr: ['pluie'], onyomi: ['ウ'], kunyomi: ['あめ'] },
  { id: 'kj-電', char: '電', meaningsFr: ['électricité'], onyomi: ['デン'], kunyomi: [] },
  { id: 'kj-気', char: '気', meaningsFr: ['esprit', 'énergie', 'humeur'], onyomi: ['キ', 'ケ'], kunyomi: [] },
  { id: 'kj-花', char: '花', meaningsFr: ['fleur'], onyomi: ['カ'], kunyomi: ['はな'] },
  { id: 'kj-魚', char: '魚', meaningsFr: ['poisson'], onyomi: ['ギョ'], kunyomi: ['さかな'] },

  // ─── Lieux et directions ───
  { id: 'kj-上', char: '上', meaningsFr: ['dessus', 'haut', 'monter'], onyomi: ['ジョウ'], kunyomi: ['うえ', 'あがる', 'のぼる'] },
  { id: 'kj-下', char: '下', meaningsFr: ['dessous', 'bas', 'descendre'], onyomi: ['カ', 'ゲ'], kunyomi: ['した', 'さがる', 'くだる'] },
  { id: 'kj-中', char: '中', meaningsFr: ['milieu', 'intérieur', 'dans'], onyomi: ['チュウ'], kunyomi: ['なか'] },
  { id: 'kj-外', char: '外', meaningsFr: ['extérieur', 'dehors'], onyomi: ['ガイ', 'ゲ'], kunyomi: ['そと'] },
  { id: 'kj-右', char: '右', meaningsFr: ['droite'], onyomi: ['ウ', 'ユウ'], kunyomi: ['みぎ'] },
  { id: 'kj-左', char: '左', meaningsFr: ['gauche'], onyomi: ['サ'], kunyomi: ['ひだり'] },
  { id: 'kj-北', char: '北', meaningsFr: ['nord'], onyomi: ['ホク'], kunyomi: ['きた'] },
  { id: 'kj-南', char: '南', meaningsFr: ['sud'], onyomi: ['ナン'], kunyomi: ['みなみ'] },
  { id: 'kj-東', char: '東', meaningsFr: ['est'], onyomi: ['トウ'], kunyomi: ['ひがし'] },
  { id: 'kj-西', char: '西', meaningsFr: ['ouest'], onyomi: ['セイ', 'サイ'], kunyomi: ['にし'] },
  { id: 'kj-駅', char: '駅', meaningsFr: ['gare'], onyomi: ['エキ'], kunyomi: [] },
  { id: 'kj-店', char: '店', meaningsFr: ['magasin', 'boutique'], onyomi: ['テン'], kunyomi: ['みせ'] },
  { id: 'kj-道', char: '道', meaningsFr: ['route', 'chemin', 'voie'], onyomi: ['ドウ'], kunyomi: ['みち'] },
  { id: 'kj-国', char: '国', meaningsFr: ['pays'], onyomi: ['コク'], kunyomi: ['くに'] },
  { id: 'kj-校', char: '校', meaningsFr: ['école'], onyomi: ['コウ'], kunyomi: [] },
  { id: 'kj-社', char: '社', meaningsFr: ['entreprise', 'société', 'sanctuaire'], onyomi: ['シャ'], kunyomi: [] },

  // ─── Études et divers ───
  { id: 'kj-学', char: '学', meaningsFr: ['étude', 'apprendre'], onyomi: ['ガク'], kunyomi: ['まなぶ'] },
  { id: 'kj-語', char: '語', meaningsFr: ['langue', 'mot'], onyomi: ['ゴ'], kunyomi: ['かたる'] },
  { id: 'kj-本', char: '本', meaningsFr: ['livre', 'origine'], onyomi: ['ホン'], kunyomi: ['もと'] },
  { id: 'kj-何', char: '何', meaningsFr: ['quoi', 'combien'], onyomi: ['カ'], kunyomi: ['なに', 'なん'] },
  { id: 'kj-車', char: '車', meaningsFr: ['voiture', 'véhicule'], onyomi: ['シャ'], kunyomi: ['くるま'] },
];
