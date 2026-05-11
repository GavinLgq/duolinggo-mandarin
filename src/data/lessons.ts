export interface Vocabulary {
  hanzi: string;
  pinyin: string;
  meaning: string;
  example?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
}

export interface Dialogue {
  id: string;
  lines: { speaker: string; hanzi: string; pinyin: string; meaning: string }[];
  situation: string;
}

export interface FillBlankQuestion {
  id: string;
  sentence: string;
  pinyin: string;
  meaning: string;
  blank: string;
  options: string[];
  answer: string;
}

export interface ToneQuestion {
  id: string;
  word: string;
  options: string[];
  answer: string;
  meaning: string;
}

export interface Lesson {
  id: number;
  hanzi: string;
  pinyin: string;
  english: string;
  vocabulary: Vocabulary[];
  keyPhrases: Vocabulary[];
  dialogues: Dialogue[];
  fillBlanks: FillBlankQuestion[];
  toneQuestions: ToneQuestion[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    hanzi: "你好",
    pinyin: "Nǐ hǎo",
    english: "Hello",
    vocabulary: [
      { hanzi: "你", pinyin: "nǐ", meaning: "kamu / you", example: "你好！", examplePinyin: "Nǐ hǎo!", exampleMeaning: "Halo!" },
      { hanzi: "好", pinyin: "hǎo", meaning: "baik / good", example: "你好吗？", examplePinyin: "Nǐ hǎo ma?", exampleMeaning: "Apa kabar?" },
      { hanzi: "您", pinyin: "nín", meaning: "Anda (formal) / you (polite)", example: "您好！", examplePinyin: "Nín hǎo!", exampleMeaning: "Halo (formal)!" },
      { hanzi: "我", pinyin: "wǒ", meaning: "saya / I, me", example: "我很好。", examplePinyin: "Wǒ hěn hǎo.", exampleMeaning: "Saya baik-baik saja." },
      { hanzi: "很", pinyin: "hěn", meaning: "sangat / very", example: "我很好。", examplePinyin: "Wǒ hěn hǎo.", exampleMeaning: "Saya sangat baik." },
      { hanzi: "也", pinyin: "yě", meaning: "juga / also", example: "我也好。", examplePinyin: "Wǒ yě hǎo.", exampleMeaning: "Saya juga baik." },
      { hanzi: "吗", pinyin: "ma", meaning: "partikel tanya / question particle", example: "你好吗？", examplePinyin: "Nǐ hǎo ma?", exampleMeaning: "Apa kabar?" },
      { hanzi: "对不起", pinyin: "duìbuqǐ", meaning: "maaf / sorry", example: "对不起！", examplePinyin: "Duìbuqǐ!", exampleMeaning: "Maaf!" },
      { hanzi: "没关系", pinyin: "méi guānxi", meaning: "tidak apa-apa / no problem", example: "没关系！", examplePinyin: "Méi guānxi!", exampleMeaning: "Tidak apa-apa!" },
      { hanzi: "再见", pinyin: "zàijiàn", meaning: "sampai jumpa / goodbye", example: "再见！", examplePinyin: "Zàijiàn!", exampleMeaning: "Sampai jumpa!" },
    ],
    keyPhrases: [
      { hanzi: "你好！", pinyin: "Nǐ hǎo!", meaning: "Halo!" },
      { hanzi: "您好！", pinyin: "Nín hǎo!", meaning: "Halo (formal)!" },
      { hanzi: "你们好！", pinyin: "Nǐmen hǎo!", meaning: "Halo semua!" },
      { hanzi: "对不起！", pinyin: "Duìbuqǐ!", meaning: "Maaf!" },
      { hanzi: "没关系！", pinyin: "Méi guānxi!", meaning: "Tidak apa-apa!" },
      { hanzi: "再见！", pinyin: "Zàijiàn!", meaning: "Sampai jumpa!" },
    ],
    dialogues: [
      {
        id: "1-1",
        situation: "Dua orang bertemu di jalan",
        lines: [
          { speaker: "A", hanzi: "你好！", pinyin: "Nǐ hǎo!", meaning: "Halo!" },
          { speaker: "B", hanzi: "你好！", pinyin: "Nǐ hǎo!", meaning: "Halo!" },
        ],
      },
      {
        id: "1-2",
        situation: "Seorang murid menyapa guru (formal)",
        lines: [
          { speaker: "Murid", hanzi: "您好！", pinyin: "Nín hǎo!", meaning: "Halo (formal)!" },
          { speaker: "Guru", hanzi: "你好！", pinyin: "Nǐ hǎo!", meaning: "Halo!" },
        ],
      },
      {
        id: "1-3",
        situation: "Meminta maaf dan memaafkan",
        lines: [
          { speaker: "A", hanzi: "对不起！", pinyin: "Duìbuqǐ!", meaning: "Maaf!" },
          { speaker: "B", hanzi: "没关系！", pinyin: "Méi guānxi!", meaning: "Tidak apa-apa!" },
        ],
      },
    ],
    fillBlanks: [
      { id: "1-fb-1", sentence: "A: 你好！ B: ___！", pinyin: "A: Nǐ hǎo! B: ___!", meaning: "A: Halo! B: ___!", blank: "B", options: ["你好", "再见", "对不起", "没关系"], answer: "你好" },
      { id: "1-fb-2", sentence: "A: 对不起！ B: ___！", pinyin: "A: Duìbuqǐ! B: ___!", meaning: "A: Maaf! B: ___!", blank: "B", options: ["你好", "没关系", "再见", "谢谢"], answer: "没关系" },
      { id: "1-fb-3", sentence: "___ 好！(formal greeting)", pinyin: "___ hǎo!", meaning: "___ (kata hormat)!", blank: "___", options: ["你", "您", "我", "他"], answer: "您" },
    ],
    toneQuestions: [
      { id: "1-t-1", word: "nǐ", options: ["nī", "ní", "nǐ", "nì"], answer: "nǐ", meaning: "kamu" },
      { id: "1-t-2", word: "hǎo", options: ["hāo", "háo", "hǎo", "hào"], answer: "hǎo", meaning: "baik" },
      { id: "1-t-3", word: "nín", options: ["nīn", "nín", "nǐn", "nìn"], answer: "nín", meaning: "Anda (formal)" },
      { id: "1-t-4", word: "zàijiàn", options: ["záijiǎn", "zāijiān", "zàijiàn", "zǎijiǎn"], answer: "zàijiàn", meaning: "sampai jumpa" },
    ],
  },
  {
    id: 2,
    hanzi: "谢谢你",
    pinyin: "Xièxie nǐ",
    english: "Thank You",
    vocabulary: [
      { hanzi: "谢谢", pinyin: "xièxie", meaning: "terima kasih / thank you", example: "谢谢你！", examplePinyin: "Xièxie nǐ!", exampleMeaning: "Terima kasih!" },
      { hanzi: "不客气", pinyin: "bú kèqi", meaning: "sama-sama / you're welcome", example: "不客气！", examplePinyin: "Bú kèqi!", exampleMeaning: "Sama-sama!" },
      { hanzi: "是", pinyin: "shì", meaning: "adalah / to be (is/am/are)", example: "我是学生。", examplePinyin: "Wǒ shì xuésheng.", exampleMeaning: "Saya adalah pelajar." },
      { hanzi: "不", pinyin: "bù", meaning: "tidak / not, no", example: "我不是老师。", examplePinyin: "Wǒ bú shì lǎoshī.", exampleMeaning: "Saya bukan guru." },
      { hanzi: "学生", pinyin: "xuésheng", meaning: "pelajar / student", example: "他是学生。", examplePinyin: "Tā shì xuésheng.", exampleMeaning: "Dia adalah pelajar." },
      { hanzi: "老师", pinyin: "lǎoshī", meaning: "guru / teacher", example: "她是老师。", examplePinyin: "Tā shì lǎoshī.", exampleMeaning: "Dia (perempuan) adalah guru." },
      { hanzi: "朋友", pinyin: "péngyou", meaning: "teman / friend", example: "他是我的朋友。", examplePinyin: "Tā shì wǒ de péngyou.", exampleMeaning: "Dia adalah teman saya." },
      { hanzi: "的", pinyin: "de", meaning: "partikel kepemilikan / possessive particle", example: "我的书", examplePinyin: "wǒ de shū", exampleMeaning: "buku saya" },
      { hanzi: "再见", pinyin: "zàijiàn", meaning: "sampai jumpa / goodbye" },
    ],
    keyPhrases: [
      { hanzi: "谢谢！", pinyin: "Xièxie!", meaning: "Terima kasih!" },
      { hanzi: "谢谢你！", pinyin: "Xièxie nǐ!", meaning: "Terima kasih (kepada kamu)!" },
      { hanzi: "谢谢您！", pinyin: "Xièxie nín!", meaning: "Terima kasih (formal)!" },
      { hanzi: "不客气！", pinyin: "Bú kèqi!", meaning: "Sama-sama!" },
      { hanzi: "再见！", pinyin: "Zàijiàn!", meaning: "Sampai jumpa!" },
    ],
    dialogues: [
      {
        id: "2-1",
        situation: "Mengucapkan terima kasih",
        lines: [
          { speaker: "A", hanzi: "谢谢你！", pinyin: "Xièxie nǐ!", meaning: "Terima kasih!" },
          { speaker: "B", hanzi: "不客气！", pinyin: "Bú kèqi!", meaning: "Sama-sama!" },
        ],
      },
      {
        id: "2-2",
        situation: "Berpisah dengan teman",
        lines: [
          { speaker: "A", hanzi: "再见！", pinyin: "Zàijiàn!", meaning: "Sampai jumpa!" },
          { speaker: "B", hanzi: "再见！", pinyin: "Zàijiàn!", meaning: "Sampai jumpa!" },
        ],
      },
    ],
    fillBlanks: [
      { id: "2-fb-1", sentence: "A: 谢谢你！ B: ___！", pinyin: "A: Xièxie nǐ! B: ___!", meaning: "A: Terima kasih! B: ___!", blank: "B", options: ["谢谢", "不客气", "再见", "你好"], answer: "不客气" },
      { id: "2-fb-2", sentence: "他___ 我的学生。", pinyin: "Tā ___ wǒ de xuésheng.", meaning: "Dia ___ murid saya.", blank: "___", options: ["不是", "是", "很", "也"], answer: "是" },
      { id: "2-fb-3", sentence: "我___老师，我是学生。", pinyin: "Wǒ ___ lǎoshī, wǒ shì xuésheng.", meaning: "Saya ___ guru, saya pelajar.", blank: "___", options: ["是", "不是", "很", "也"], answer: "不是" },
    ],
    toneQuestions: [
      { id: "2-t-1", word: "xièxie", options: ["xiēxīe", "xiéxié", "xièxie", "xiěxǐe"], answer: "xièxie", meaning: "terima kasih" },
      { id: "2-t-2", word: "lǎoshī", options: ["láoshī", "lǎoshī", "lāoshí", "làoshì"], answer: "lǎoshī", meaning: "guru" },
      { id: "2-t-3", word: "xuésheng", options: ["xuēshēng", "xuésheng", "xuěshěng", "xuèshèng"], answer: "xuésheng", meaning: "pelajar" },
    ],
  },
  {
    id: 3,
    hanzi: "你叫什么名字",
    pinyin: "Nǐ jiào shénme míngzi",
    english: "What's Your Name",
    vocabulary: [
      { hanzi: "叫", pinyin: "jiào", meaning: "bernama / to be called", example: "你叫什么名字？", examplePinyin: "Nǐ jiào shénme míngzi?", exampleMeaning: "Namamu siapa?" },
      { hanzi: "什么", pinyin: "shénme", meaning: "apa / what", example: "你叫什么？", examplePinyin: "Nǐ jiào shénme?", exampleMeaning: "Kamu namanya apa?" },
      { hanzi: "名字", pinyin: "míngzi", meaning: "nama / name", example: "我的名字是李明。", examplePinyin: "Wǒ de míngzi shì Lǐ Míng.", exampleMeaning: "Nama saya Li Ming." },
      { hanzi: "他", pinyin: "tā", meaning: "dia (laki-laki) / he", example: "他叫大卫。", examplePinyin: "Tā jiào Dàwèi.", exampleMeaning: "Namanya David." },
      { hanzi: "她", pinyin: "tā", meaning: "dia (perempuan) / she", example: "她叫李月。", examplePinyin: "Tā jiào Lǐ Yuè.", exampleMeaning: "Namanya Li Yue." },
      { hanzi: "中国", pinyin: "Zhōngguó", meaning: "China / China", example: "我是中国人。", examplePinyin: "Wǒ shì Zhōngguó rén.", exampleMeaning: "Saya orang China." },
      { hanzi: "人", pinyin: "rén", meaning: "orang / person", example: "你是哪国人？", examplePinyin: "Nǐ shì nǎ guó rén?", exampleMeaning: "Kamu orang negara mana?" },
      { hanzi: "哪", pinyin: "nǎ", meaning: "yang mana / which", example: "你是哪国人？", examplePinyin: "Nǐ shì nǎ guó rén?", exampleMeaning: "Kamu orang negara mana?" },
      { hanzi: "美国", pinyin: "Měiguó", meaning: "Amerika / America", example: "他是美国人。", examplePinyin: "Tā shì Měiguó rén.", exampleMeaning: "Dia orang Amerika." },
    ],
    keyPhrases: [
      { hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", meaning: "Namamu siapa?" },
      { hanzi: "我叫___。", pinyin: "Wǒ jiào ___.", meaning: "Nama saya ___." },
      { hanzi: "你是哪国人？", pinyin: "Nǐ shì nǎ guó rén?", meaning: "Kamu orang negara mana?" },
      { hanzi: "我是中国人。", pinyin: "Wǒ shì Zhōngguó rén.", meaning: "Saya orang China." },
    ],
    dialogues: [
      {
        id: "3-1",
        situation: "Perkenalan pertama",
        lines: [
          { speaker: "A", hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", meaning: "Namamu siapa?" },
          { speaker: "B", hanzi: "我叫李月。你呢？", pinyin: "Wǒ jiào Lǐ Yuè. Nǐ ne?", meaning: "Nama saya Li Yue. Kamu?" },
          { speaker: "A", hanzi: "我叫大卫。", pinyin: "Wǒ jiào Dàwèi.", meaning: "Nama saya David." },
        ],
      },
      {
        id: "3-2",
        situation: "Menanyakan kebangsaan",
        lines: [
          { speaker: "A", hanzi: "你是哪国人？", pinyin: "Nǐ shì nǎ guó rén?", meaning: "Kamu orang negara mana?" },
          { speaker: "B", hanzi: "我是中国人。你呢？", pinyin: "Wǒ shì Zhōngguó rén. Nǐ ne?", meaning: "Saya orang China. Kamu?" },
          { speaker: "A", hanzi: "我是美国人。", pinyin: "Wǒ shì Měiguó rén.", meaning: "Saya orang Amerika." },
        ],
      },
    ],
    fillBlanks: [
      { id: "3-fb-1", sentence: "你叫___名字？", pinyin: "Nǐ jiào ___ míngzi?", meaning: "Kamu nama ___?", blank: "___", options: ["什么", "哪", "是", "好"], answer: "什么" },
      { id: "3-fb-2", sentence: "我___中国人。", pinyin: "Wǒ ___ Zhōngguó rén.", meaning: "Saya ___ orang China.", blank: "___", options: ["叫", "是", "好", "不"], answer: "是" },
      { id: "3-fb-3", sentence: "他叫___？(What is his name)", pinyin: "Tā jiào ___?", meaning: "Namanya ___?", blank: "___", options: ["什么", "哪", "谁", "吗"], answer: "什么" },
    ],
    toneQuestions: [
      { id: "3-t-1", word: "shénme", options: ["shēnmē", "shénme", "shěnmě", "shènmè"], answer: "shénme", meaning: "apa" },
      { id: "3-t-2", word: "míngzi", options: ["mīngzī", "míngzi", "mǐngzǐ", "mìngzì"], answer: "míngzi", meaning: "nama" },
      { id: "3-t-3", word: "jiào", options: ["jiāo", "jiáo", "jiǎo", "jiào"], answer: "jiào", meaning: "bernama" },
    ],
  },
  {
    id: 4,
    hanzi: "她是我的汉语老师",
    pinyin: "Tā shì wǒ de Hànyǔ lǎoshī",
    english: "She Is My Chinese Teacher",
    vocabulary: [
      { hanzi: "汉语", pinyin: "Hànyǔ", meaning: "bahasa China / Chinese language", example: "我学汉语。", examplePinyin: "Wǒ xué Hànyǔ.", exampleMeaning: "Saya belajar bahasa China." },
      { hanzi: "同学", pinyin: "tóngxué", meaning: "teman sekelas / classmate", example: "他是我的同学。", examplePinyin: "Tā shì wǒ de tóngxué.", exampleMeaning: "Dia adalah teman sekelas saya." },
      { hanzi: "认识", pinyin: "rènshi", meaning: "mengenal / to know (a person)", example: "很高兴认识你。", examplePinyin: "Hěn gāoxìng rènshi nǐ.", exampleMeaning: "Senang berkenalan dengan kamu." },
      { hanzi: "高兴", pinyin: "gāoxìng", meaning: "senang / happy, glad", example: "我很高兴。", examplePinyin: "Wǒ hěn gāoxìng.", exampleMeaning: "Saya sangat senang." },
      { hanzi: "这", pinyin: "zhè", meaning: "ini / this", example: "这是我的老师。", examplePinyin: "Zhè shì wǒ de lǎoshī.", exampleMeaning: "Ini adalah guru saya." },
      { hanzi: "那", pinyin: "nà", meaning: "itu / that", example: "那是什么？", examplePinyin: "Nà shì shénme?", exampleMeaning: "Itu apa?" },
      { hanzi: "介绍", pinyin: "jièshào", meaning: "memperkenalkan / to introduce", example: "我来介绍一下。", examplePinyin: "Wǒ lái jièshào yīxià.", exampleMeaning: "Izinkan saya memperkenalkan." },
    ],
    keyPhrases: [
      { hanzi: "她是我的汉语老师。", pinyin: "Tā shì wǒ de Hànyǔ lǎoshī.", meaning: "Dia adalah guru bahasa China saya." },
      { hanzi: "很高兴认识你！", pinyin: "Hěn gāoxìng rènshi nǐ!", meaning: "Senang berkenalan denganmu!" },
      { hanzi: "我来介绍一下。", pinyin: "Wǒ lái jièshào yīxià.", meaning: "Izinkan saya memperkenalkan." },
    ],
    dialogues: [
      {
        id: "4-1",
        situation: "Memperkenalkan teman",
        lines: [
          { speaker: "A", hanzi: "我来介绍一下，这是我的汉语老师，李老师。", pinyin: "Wǒ lái jièshào yīxià, zhè shì wǒ de Hànyǔ lǎoshī, Lǐ lǎoshī.", meaning: "Izinkan saya memperkenalkan, ini adalah guru bahasa China saya, Bu Li." },
          { speaker: "B", hanzi: "您好！", pinyin: "Nín hǎo!", meaning: "Halo (formal)!" },
          { speaker: "Guru", hanzi: "你好！很高兴认识你。", pinyin: "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.", meaning: "Halo! Senang berkenalan denganmu." },
        ],
      },
    ],
    fillBlanks: [
      { id: "4-fb-1", sentence: "她是我的汉语___。", pinyin: "Tā shì wǒ de Hànyǔ ___.", meaning: "Dia adalah ___ bahasa China saya.", blank: "___", options: ["老师", "学生", "朋友", "同学"], answer: "老师" },
      { id: "4-fb-2", sentence: "很高兴___你！", pinyin: "Hěn gāoxìng ___ nǐ!", meaning: "Senang ___ kamu!", blank: "___", options: ["认识", "是", "叫", "有"], answer: "认识" },
      { id: "4-fb-3", sentence: "___是我的同学。", pinyin: "___ shì wǒ de tóngxué.", meaning: "___ adalah teman sekelas saya.", blank: "___", options: ["这", "什么", "哪", "吗"], answer: "这" },
    ],
    toneQuestions: [
      { id: "4-t-1", word: "Hànyǔ", options: ["Hānyū", "Hányú", "Hǎnyǔ", "Hànyǔ"], answer: "Hànyǔ", meaning: "bahasa China" },
      { id: "4-t-2", word: "gāoxìng", options: ["gāoxìng", "gáoxíng", "gǎoxǐng", "gàoxìng"], answer: "gāoxìng", meaning: "senang" },
      { id: "4-t-3", word: "rènshi", options: ["rēnshī", "rénshí", "rěnshǐ", "rènshi"], answer: "rènshi", meaning: "mengenal" },
    ],
  },
  {
    id: 5,
    hanzi: "她女儿今年二十岁",
    pinyin: "Tā nǚ'ér jīnnián èrshí suì",
    english: "Her Daughter Is 20 Years Old",
    vocabulary: [
      { hanzi: "岁", pinyin: "suì", meaning: "tahun (umur) / years old", example: "我二十岁。", examplePinyin: "Wǒ èrshí suì.", exampleMeaning: "Saya 20 tahun." },
      { hanzi: "今年", pinyin: "jīnnián", meaning: "tahun ini / this year", example: "她今年二十岁。", examplePinyin: "Tā jīnnián èrshí suì.", exampleMeaning: "Tahun ini dia 20 tahun." },
      { hanzi: "女儿", pinyin: "nǚ'ér", meaning: "anak perempuan / daughter", example: "她的女儿很可爱。", examplePinyin: "Tā de nǚ'ér hěn kě'ài.", exampleMeaning: "Anak perempuannya sangat lucu." },
      { hanzi: "儿子", pinyin: "érzi", meaning: "anak laki-laki / son", example: "他的儿子是学生。", examplePinyin: "Tā de érzi shì xuésheng.", exampleMeaning: "Anak laki-lakinya adalah pelajar." },
      { hanzi: "几", pinyin: "jǐ", meaning: "berapa / how many (small number)", example: "你今年几岁？", examplePinyin: "Nǐ jīnnián jǐ suì?", exampleMeaning: "Kamu tahun ini berapa tahun?" },
      { hanzi: "多大", pinyin: "duō dà", meaning: "berapa umur / how old", example: "你多大了？", examplePinyin: "Nǐ duō dà le?", exampleMeaning: "Kamu sudah berapa umur?" },
      { hanzi: "零", pinyin: "líng", meaning: "nol / zero", example: "零", examplePinyin: "líng", exampleMeaning: "0" },
      { hanzi: "一", pinyin: "yī", meaning: "satu / one", example: "一个人", examplePinyin: "yī gè rén", exampleMeaning: "satu orang" },
      { hanzi: "二", pinyin: "èr", meaning: "dua / two" },
      { hanzi: "三", pinyin: "sān", meaning: "tiga / three" },
      { hanzi: "四", pinyin: "sì", meaning: "empat / four" },
      { hanzi: "五", pinyin: "wǔ", meaning: "lima / five" },
      { hanzi: "六", pinyin: "liù", meaning: "enam / six" },
      { hanzi: "七", pinyin: "qī", meaning: "tujuh / seven" },
      { hanzi: "八", pinyin: "bā", meaning: "delapan / eight" },
      { hanzi: "九", pinyin: "jiǔ", meaning: "sembilan / nine" },
      { hanzi: "十", pinyin: "shí", meaning: "sepuluh / ten" },
      { hanzi: "百", pinyin: "bǎi", meaning: "ratus / hundred" },
    ],
    keyPhrases: [
      { hanzi: "你多大了？", pinyin: "Nǐ duō dà le?", meaning: "Kamu berapa umur?" },
      { hanzi: "我___岁。", pinyin: "Wǒ ___ suì.", meaning: "Saya ___ tahun." },
      { hanzi: "她今年二十岁。", pinyin: "Tā jīnnián èrshí suì.", meaning: "Tahun ini dia 20 tahun." },
    ],
    dialogues: [
      {
        id: "5-1",
        situation: "Menanyakan umur",
        lines: [
          { speaker: "A", hanzi: "你今年多大了？", pinyin: "Nǐ jīnnián duō dà le?", meaning: "Tahun ini kamu berapa umur?" },
          { speaker: "B", hanzi: "我今年二十岁。你呢？", pinyin: "Wǒ jīnnián èrshí suì. Nǐ ne?", meaning: "Saya tahun ini 20 tahun. Kamu?" },
          { speaker: "A", hanzi: "我二十五岁。", pinyin: "Wǒ èrshíwǔ suì.", meaning: "Saya 25 tahun." },
        ],
      },
    ],
    fillBlanks: [
      { id: "5-fb-1", sentence: "她女儿今年___岁。", pinyin: "Tā nǚ'ér jīnnián ___ suì.", meaning: "Anak perempuannya tahun ini ___ tahun.", blank: "___", options: ["二十", "三十", "十", "四十"], answer: "二十" },
      { id: "5-fb-2", sentence: "你今年___大了？", pinyin: "Nǐ jīnnián ___ dà le?", meaning: "Kamu tahun ini ___ umur?", blank: "___", options: ["多", "什么", "哪", "几"], answer: "多" },
    ],
    toneQuestions: [
      { id: "5-t-1", word: "jīnnián", options: ["jīnnián", "jínnián", "jǐnnián", "jìnnián"], answer: "jīnnián", meaning: "tahun ini" },
      { id: "5-t-2", word: "suì", options: ["suī", "suí", "suǐ", "suì"], answer: "suì", meaning: "tahun (umur)" },
      { id: "5-t-3", word: "nǚ'ér", options: ["nūér", "núér", "nǚ'ér", "nùér"], answer: "nǚ'ér", meaning: "anak perempuan" },
    ],
  },
  {
    id: 6,
    hanzi: "我会说汉语",
    pinyin: "Wǒ huì shuō Hànyǔ",
    english: "I Can Speak Chinese",
    vocabulary: [
      { hanzi: "会", pinyin: "huì", meaning: "bisa / can, be able to", example: "我会说汉语。", examplePinyin: "Wǒ huì shuō Hànyǔ.", exampleMeaning: "Saya bisa berbicara bahasa China." },
      { hanzi: "说", pinyin: "shuō", meaning: "berbicara / to speak", example: "你会说什么语？", examplePinyin: "Nǐ huì shuō shénme yǔ?", exampleMeaning: "Kamu bisa berbicara bahasa apa?" },
      { hanzi: "一点儿", pinyin: "yīdiǎnr", meaning: "sedikit / a little", example: "我会说一点儿汉语。", examplePinyin: "Wǒ huì shuō yīdiǎnr Hànyǔ.", exampleMeaning: "Saya bisa berbicara sedikit bahasa China." },
      { hanzi: "英语", pinyin: "Yīngyǔ", meaning: "bahasa Inggris / English", example: "她会说英语。", examplePinyin: "Tā huì shuō Yīngyǔ.", exampleMeaning: "Dia bisa berbicara bahasa Inggris." },
      { hanzi: "写", pinyin: "xiě", meaning: "menulis / to write", example: "我会写汉字。", examplePinyin: "Wǒ huì xiě Hànzì.", exampleMeaning: "Saya bisa menulis karakter China." },
      { hanzi: "汉字", pinyin: "Hànzì", meaning: "karakter China / Chinese character", example: "汉字很难。", examplePinyin: "Hànzì hěn nán.", exampleMeaning: "Karakter China sangat sulit." },
      { hanzi: "难", pinyin: "nán", meaning: "sulit / difficult", example: "汉语不难。", examplePinyin: "Hànyǔ bù nán.", exampleMeaning: "Bahasa China tidak sulit." },
      { hanzi: "还", pinyin: "hái", meaning: "masih / still, also", example: "我还会说英语。", examplePinyin: "Wǒ hái huì shuō Yīngyǔ.", exampleMeaning: "Saya juga bisa berbicara bahasa Inggris." },
    ],
    keyPhrases: [
      { hanzi: "我会说汉语。", pinyin: "Wǒ huì shuō Hànyǔ.", meaning: "Saya bisa berbicara bahasa China." },
      { hanzi: "我会说一点儿。", pinyin: "Wǒ huì shuō yīdiǎnr.", meaning: "Saya bisa berbicara sedikit." },
      { hanzi: "你会说什么语？", pinyin: "Nǐ huì shuō shénme yǔ?", meaning: "Kamu bisa berbicara bahasa apa?" },
    ],
    dialogues: [
      {
        id: "6-1",
        situation: "Berbicara tentang kemampuan bahasa",
        lines: [
          { speaker: "A", hanzi: "你会说汉语吗？", pinyin: "Nǐ huì shuō Hànyǔ ma?", meaning: "Kamu bisa berbicara bahasa China?" },
          { speaker: "B", hanzi: "会，我会说一点儿。你呢？", pinyin: "Huì, wǒ huì shuō yīdiǎnr. Nǐ ne?", meaning: "Bisa, saya bisa berbicara sedikit. Kamu?" },
          { speaker: "A", hanzi: "我也会！我还会说英语。", pinyin: "Wǒ yě huì! Wǒ hái huì shuō Yīngyǔ.", meaning: "Saya juga bisa! Saya juga bisa berbicara bahasa Inggris." },
        ],
      },
    ],
    fillBlanks: [
      { id: "6-fb-1", sentence: "我___说汉语。", pinyin: "Wǒ ___ shuō Hànyǔ.", meaning: "Saya ___ berbicara bahasa China.", blank: "___", options: ["会", "是", "有", "在"], answer: "会" },
      { id: "6-fb-2", sentence: "汉字很___写。", pinyin: "Hànzì hěn ___ xiě.", meaning: "Karakter China sangat ___ ditulis.", blank: "___", options: ["难", "好", "大", "小"], answer: "难" },
    ],
    toneQuestions: [
      { id: "6-t-1", word: "huì", options: ["huī", "huí", "huǐ", "huì"], answer: "huì", meaning: "bisa" },
      { id: "6-t-2", word: "shuō", options: ["shuō", "shuó", "shuǒ", "shuò"], answer: "shuō", meaning: "berbicara" },
      { id: "6-t-3", word: "yīdiǎnr", options: ["yīdiānr", "yīdiánr", "yīdiǎnr", "yīdiànr"], answer: "yīdiǎnr", meaning: "sedikit" },
    ],
  },
  {
    id: 7,
    hanzi: "今天几号",
    pinyin: "Jīntiān jǐ hào",
    english: "What's the Date Today",
    vocabulary: [
      { hanzi: "今天", pinyin: "jīntiān", meaning: "hari ini / today", example: "今天几号？", examplePinyin: "Jīntiān jǐ hào?", exampleMeaning: "Hari ini tanggal berapa?" },
      { hanzi: "明天", pinyin: "míngtiān", meaning: "besok / tomorrow", example: "明天是几号？", examplePinyin: "Míngtiān shì jǐ hào?", exampleMeaning: "Besok tanggal berapa?" },
      { hanzi: "昨天", pinyin: "zuótiān", meaning: "kemarin / yesterday", example: "昨天是几号？", examplePinyin: "Zuótiān shì jǐ hào?", exampleMeaning: "Kemarin tanggal berapa?" },
      { hanzi: "号", pinyin: "hào", meaning: "tanggal / date (day of month)", example: "今天几号？", examplePinyin: "Jīntiān jǐ hào?", exampleMeaning: "Hari ini tanggal berapa?" },
      { hanzi: "月", pinyin: "yuè", meaning: "bulan / month", example: "几月几号？", examplePinyin: "Jǐ yuè jǐ hào?", exampleMeaning: "Bulan berapa tanggal berapa?" },
      { hanzi: "年", pinyin: "nián", meaning: "tahun / year", example: "今年是哪年？", examplePinyin: "Jīnnián shì nǎ nián?", exampleMeaning: "Tahun ini tahun berapa?" },
      { hanzi: "星期", pinyin: "xīngqī", meaning: "minggu / week", example: "今天星期几？", examplePinyin: "Jīntiān xīngqī jǐ?", exampleMeaning: "Hari ini hari apa?" },
      { hanzi: "日", pinyin: "rì", meaning: "hari / day (formal)", example: "一月一日", examplePinyin: "Yī yuè yī rì", exampleMeaning: "1 Januari" },
    ],
    keyPhrases: [
      { hanzi: "今天几号？", pinyin: "Jīntiān jǐ hào?", meaning: "Hari ini tanggal berapa?" },
      { hanzi: "今天是___月___号。", pinyin: "Jīntiān shì ___ yuè ___ hào.", meaning: "Hari ini tanggal ___ bulan ___." },
      { hanzi: "今天星期几？", pinyin: "Jīntiān xīngqī jǐ?", meaning: "Hari ini hari apa?" },
    ],
    dialogues: [
      {
        id: "7-1",
        situation: "Menanyakan tanggal",
        lines: [
          { speaker: "A", hanzi: "今天几号？", pinyin: "Jīntiān jǐ hào?", meaning: "Hari ini tanggal berapa?" },
          { speaker: "B", hanzi: "今天是五月十号。", pinyin: "Jīntiān shì wǔ yuè shí hào.", meaning: "Hari ini tanggal 10 Mei." },
          { speaker: "A", hanzi: "明天呢？", pinyin: "Míngtiān ne?", meaning: "Besok?" },
          { speaker: "B", hanzi: "明天是十一号。", pinyin: "Míngtiān shì shíyī hào.", meaning: "Besok tanggal 11." },
        ],
      },
    ],
    fillBlanks: [
      { id: "7-fb-1", sentence: "今天___号？", pinyin: "Jīntiān ___ hào?", meaning: "Hari ini tanggal ___?", blank: "___", options: ["几", "什么", "多", "哪"], answer: "几" },
      { id: "7-fb-2", sentence: "今天是五___十号。", pinyin: "Jīntiān shì wǔ ___ shí hào.", meaning: "Hari ini tanggal 10 ___ 5.", blank: "___", options: ["月", "年", "号", "日"], answer: "月" },
    ],
    toneQuestions: [
      { id: "7-t-1", word: "jīntiān", options: ["jīntiān", "jíntiān", "jǐntiǎn", "jìntiàn"], answer: "jīntiān", meaning: "hari ini" },
      { id: "7-t-2", word: "míngtiān", options: ["mīngtiān", "míngtiān", "mǐngtiǎn", "mìngtiàn"], answer: "míngtiān", meaning: "besok" },
      { id: "7-t-3", word: "zuótiān", options: ["zuōtiān", "zuótiān", "zuǒtiǎn", "zuòtiàn"], answer: "zuótiān", meaning: "kemarin" },
    ],
  },
  {
    id: 8,
    hanzi: "我想喝茶",
    pinyin: "Wǒ xiǎng hē chá",
    english: "I'd Like Some Tea",
    vocabulary: [
      { hanzi: "想", pinyin: "xiǎng", meaning: "ingin / want to, would like", example: "我想喝茶。", examplePinyin: "Wǒ xiǎng hē chá.", exampleMeaning: "Saya ingin minum teh." },
      { hanzi: "喝", pinyin: "hē", meaning: "minum / to drink", example: "你喝什么？", examplePinyin: "Nǐ hē shénme?", exampleMeaning: "Kamu minum apa?" },
      { hanzi: "茶", pinyin: "chá", meaning: "teh / tea", example: "我喝茶。", examplePinyin: "Wǒ hē chá.", exampleMeaning: "Saya minum teh." },
      { hanzi: "咖啡", pinyin: "kāfēi", meaning: "kopi / coffee", example: "我不喝咖啡。", examplePinyin: "Wǒ bù hē kāfēi.", exampleMeaning: "Saya tidak minum kopi." },
      { hanzi: "水", pinyin: "shuǐ", meaning: "air / water", example: "我想喝水。", examplePinyin: "Wǒ xiǎng hē shuǐ.", exampleMeaning: "Saya ingin minum air." },
      { hanzi: "吃", pinyin: "chī", meaning: "makan / to eat", example: "你吃什么？", examplePinyin: "Nǐ chī shénme?", exampleMeaning: "Kamu makan apa?" },
      { hanzi: "饭", pinyin: "fàn", meaning: "nasi/makanan / rice, food", example: "我想吃饭。", examplePinyin: "Wǒ xiǎng chī fàn.", exampleMeaning: "Saya ingin makan." },
      { hanzi: "要", pinyin: "yào", meaning: "mau/ingin / want", example: "我要一杯茶。", examplePinyin: "Wǒ yào yī bēi chá.", exampleMeaning: "Saya mau satu gelas teh." },
      { hanzi: "杯", pinyin: "bēi", meaning: "gelas / cup, glass", example: "一杯水", examplePinyin: "yī bēi shuǐ", exampleMeaning: "satu gelas air" },
    ],
    keyPhrases: [
      { hanzi: "我想喝茶。", pinyin: "Wǒ xiǎng hē chá.", meaning: "Saya ingin minum teh." },
      { hanzi: "你想喝什么？", pinyin: "Nǐ xiǎng hē shénme?", meaning: "Kamu ingin minum apa?" },
      { hanzi: "我要一杯咖啡。", pinyin: "Wǒ yào yī bēi kāfēi.", meaning: "Saya mau satu gelas kopi." },
    ],
    dialogues: [
      {
        id: "8-1",
        situation: "Memesan minuman",
        lines: [
          { speaker: "Pelayan", hanzi: "您好！您想喝什么？", pinyin: "Nín hǎo! Nín xiǎng hē shénme?", meaning: "Halo! Anda ingin minum apa?" },
          { speaker: "Tamu", hanzi: "我想喝茶。", pinyin: "Wǒ xiǎng hē chá.", meaning: "Saya ingin minum teh." },
          { speaker: "Pelayan", hanzi: "好的。还要别的吗？", pinyin: "Hǎo de. Hái yào bié de ma?", meaning: "Baik. Masih mau yang lain?" },
          { speaker: "Tamu", hanzi: "不了，谢谢！", pinyin: "Bù le, xièxie!", meaning: "Tidak, terima kasih!" },
        ],
      },
    ],
    fillBlanks: [
      { id: "8-fb-1", sentence: "我想___茶。", pinyin: "Wǒ xiǎng ___ chá.", meaning: "Saya ingin ___ teh.", blank: "___", options: ["喝", "吃", "说", "写"], answer: "喝" },
      { id: "8-fb-2", sentence: "你___喝什么？", pinyin: "Nǐ ___ hē shénme?", meaning: "Kamu ___ minum apa?", blank: "___", options: ["想", "会", "是", "有"], answer: "想" },
    ],
    toneQuestions: [
      { id: "8-t-1", word: "xiǎng", options: ["xiāng", "xiáng", "xiǎng", "xiàng"], answer: "xiǎng", meaning: "ingin" },
      { id: "8-t-2", word: "chá", options: ["chā", "chá", "chǎ", "chà"], answer: "chá", meaning: "teh" },
      { id: "8-t-3", word: "kāfēi", options: ["kāfēi", "káféi", "kǎfěi", "kàfèi"], answer: "kāfēi", meaning: "kopi" },
    ],
  },
  {
    id: 9,
    hanzi: "你儿子在哪儿工作",
    pinyin: "Nǐ érzi zài nǎr gōngzuò",
    english: "Where Does Your Son Work",
    vocabulary: [
      { hanzi: "在", pinyin: "zài", meaning: "di/ada di / at, in, to be at", example: "他在哪儿？", examplePinyin: "Tā zài nǎr?", exampleMeaning: "Dia ada di mana?" },
      { hanzi: "哪儿", pinyin: "nǎr", meaning: "di mana / where", example: "你在哪儿工作？", examplePinyin: "Nǐ zài nǎr gōngzuò?", exampleMeaning: "Kamu bekerja di mana?" },
      { hanzi: "工作", pinyin: "gōngzuò", meaning: "bekerja/pekerjaan / work, to work", example: "她工作很忙。", examplePinyin: "Tā gōngzuò hěn máng.", exampleMeaning: "Pekerjaannya sangat sibuk." },
      { hanzi: "医院", pinyin: "yīyuàn", meaning: "rumah sakit / hospital", example: "他在医院工作。", examplePinyin: "Tā zài yīyuàn gōngzuò.", exampleMeaning: "Dia bekerja di rumah sakit." },
      { hanzi: "学校", pinyin: "xuéxiào", meaning: "sekolah / school", example: "我在学校学习。", examplePinyin: "Wǒ zài xuéxiào xuéxí.", exampleMeaning: "Saya belajar di sekolah." },
      { hanzi: "商店", pinyin: "shāngdiàn", meaning: "toko / store, shop", example: "她在商店工作。", examplePinyin: "Tā zài shāngdiàn gōngzuò.", exampleMeaning: "Dia bekerja di toko." },
      { hanzi: "医生", pinyin: "yīshēng", meaning: "dokter / doctor", example: "他是医生。", examplePinyin: "Tā shì yīshēng.", exampleMeaning: "Dia adalah dokter." },
    ],
    keyPhrases: [
      { hanzi: "你在哪儿工作？", pinyin: "Nǐ zài nǎr gōngzuò?", meaning: "Kamu bekerja di mana?" },
      { hanzi: "我在___工作。", pinyin: "Wǒ zài ___ gōngzuò.", meaning: "Saya bekerja di ___." },
      { hanzi: "他是医生。", pinyin: "Tā shì yīshēng.", meaning: "Dia adalah dokter." },
    ],
    dialogues: [
      {
        id: "9-1",
        situation: "Menanyakan pekerjaan",
        lines: [
          { speaker: "A", hanzi: "你儿子在哪儿工作？", pinyin: "Nǐ érzi zài nǎr gōngzuò?", meaning: "Anak laki-lakimu bekerja di mana?" },
          { speaker: "B", hanzi: "他在医院工作，他是医生。", pinyin: "Tā zài yīyuàn gōngzuò, tā shì yīshēng.", meaning: "Dia bekerja di rumah sakit, dia adalah dokter." },
          { speaker: "A", hanzi: "哦，那很好！", pinyin: "Ó, nà hěn hǎo!", meaning: "Oh, itu bagus sekali!" },
        ],
      },
    ],
    fillBlanks: [
      { id: "9-fb-1", sentence: "你___哪儿工作？", pinyin: "Nǐ ___ nǎr gōngzuò?", meaning: "Kamu ___ mana bekerja?", blank: "___", options: ["在", "是", "有", "去"], answer: "在" },
      { id: "9-fb-2", sentence: "他在___工作。", pinyin: "Tā zài ___ gōngzuò.", meaning: "Dia bekerja di ___.", blank: "___", options: ["医院", "你好", "谢谢", "学习"], answer: "医院" },
    ],
    toneQuestions: [
      { id: "9-t-1", word: "gōngzuò", options: ["gōngzuò", "góngzúo", "gǒngzǔo", "gòngzùo"], answer: "gōngzuò", meaning: "bekerja" },
      { id: "9-t-2", word: "yīyuàn", options: ["yīyuān", "yíyuán", "yǐyuǎn", "yīyuàn"], answer: "yīyuàn", meaning: "rumah sakit" },
      { id: "9-t-3", word: "nǎr", options: ["nār", "nár", "nǎr", "nàr"], answer: "nǎr", meaning: "di mana" },
    ],
  },
  {
    id: 10,
    hanzi: "我能坐这儿吗",
    pinyin: "Wǒ néng zuò zhèr ma",
    english: "Can I Sit Here",
    vocabulary: [
      { hanzi: "能", pinyin: "néng", meaning: "bisa/boleh / can, be able to", example: "我能坐这儿吗？", examplePinyin: "Wǒ néng zuò zhèr ma?", exampleMeaning: "Boleh saya duduk di sini?" },
      { hanzi: "坐", pinyin: "zuò", meaning: "duduk/naik / to sit, to take (transport)", example: "请坐！", examplePinyin: "Qǐng zuò!", exampleMeaning: "Silakan duduk!" },
      { hanzi: "这儿", pinyin: "zhèr", meaning: "di sini / here", example: "我在这儿。", examplePinyin: "Wǒ zài zhèr.", exampleMeaning: "Saya di sini." },
      { hanzi: "那儿", pinyin: "nàr", meaning: "di sana / there", example: "他在那儿。", examplePinyin: "Tā zài nàr.", exampleMeaning: "Dia di sana." },
      { hanzi: "请", pinyin: "qǐng", meaning: "silakan/tolong / please", example: "请进！", examplePinyin: "Qǐng jìn!", exampleMeaning: "Silakan masuk!" },
      { hanzi: "当然", pinyin: "dāngrán", meaning: "tentu saja / of course", example: "当然可以！", examplePinyin: "Dāngrán kěyǐ!", exampleMeaning: "Tentu saja bisa!" },
      { hanzi: "可以", pinyin: "kěyǐ", meaning: "boleh/bisa / may, can", example: "你可以坐这儿。", examplePinyin: "Nǐ kěyǐ zuò zhèr.", exampleMeaning: "Kamu boleh duduk di sini." },
    ],
    keyPhrases: [
      { hanzi: "我能坐这儿吗？", pinyin: "Wǒ néng zuò zhèr ma?", meaning: "Boleh saya duduk di sini?" },
      { hanzi: "当然可以！", pinyin: "Dāngrán kěyǐ!", meaning: "Tentu saja boleh!" },
      { hanzi: "请坐！", pinyin: "Qǐng zuò!", meaning: "Silakan duduk!" },
    ],
    dialogues: [
      {
        id: "10-1",
        situation: "Meminta izin duduk",
        lines: [
          { speaker: "A", hanzi: "请问，我能坐这儿吗？", pinyin: "Qǐngwèn, wǒ néng zuò zhèr ma?", meaning: "Permisi, boleh saya duduk di sini?" },
          { speaker: "B", hanzi: "当然可以！请坐。", pinyin: "Dāngrán kěyǐ! Qǐng zuò.", meaning: "Tentu saja boleh! Silakan duduk." },
          { speaker: "A", hanzi: "谢谢！", pinyin: "Xièxie!", meaning: "Terima kasih!" },
        ],
      },
    ],
    fillBlanks: [
      { id: "10-fb-1", sentence: "我___坐这儿吗？", pinyin: "Wǒ ___ zuò zhèr ma?", meaning: "Boleh saya duduk di sini?", blank: "___", options: ["能", "想", "会", "是"], answer: "能" },
      { id: "10-fb-2", sentence: "___可以！请坐。", pinyin: "___ kěyǐ! Qǐng zuò.", meaning: "___ boleh! Silakan duduk.", blank: "___", options: ["当然", "什么", "哪儿", "这儿"], answer: "当然" },
    ],
    toneQuestions: [
      { id: "10-t-1", word: "néng", options: ["nēng", "néng", "něng", "nèng"], answer: "néng", meaning: "bisa/boleh" },
      { id: "10-t-2", word: "zuò", options: ["zuō", "zuó", "zuǒ", "zuò"], answer: "zuò", meaning: "duduk" },
      { id: "10-t-3", word: "dāngrán", options: ["dāngrán", "dángráng", "dǎngrǎn", "dàngràn"], answer: "dāngrán", meaning: "tentu saja" },
    ],
  },
  {
    id: 11,
    hanzi: "现在几点",
    pinyin: "Xiànzài jǐ diǎn",
    english: "What's the Time Now",
    vocabulary: [
      { hanzi: "现在", pinyin: "xiànzài", meaning: "sekarang / now", example: "现在几点？", examplePinyin: "Xiànzài jǐ diǎn?", exampleMeaning: "Sekarang jam berapa?" },
      { hanzi: "点", pinyin: "diǎn", meaning: "jam (o'clock) / o'clock", example: "现在三点。", examplePinyin: "Xiànzài sān diǎn.", exampleMeaning: "Sekarang jam 3." },
      { hanzi: "分", pinyin: "fēn", meaning: "menit / minute", example: "三点十分", examplePinyin: "sān diǎn shí fēn", exampleMeaning: "jam 3 lebih 10 menit" },
      { hanzi: "半", pinyin: "bàn", meaning: "setengah / half", example: "三点半", examplePinyin: "sān diǎn bàn", exampleMeaning: "jam setengah empat (3:30)" },
      { hanzi: "上午", pinyin: "shàngwǔ", meaning: "pagi / morning (before noon)", example: "上午十点", examplePinyin: "shàngwǔ shí diǎn", exampleMeaning: "jam 10 pagi" },
      { hanzi: "下午", pinyin: "xiàwǔ", meaning: "sore / afternoon", example: "下午三点", examplePinyin: "xiàwǔ sān diǎn", exampleMeaning: "jam 3 sore" },
      { hanzi: "晚上", pinyin: "wǎnshang", meaning: "malam / evening, night", example: "晚上好！", examplePinyin: "Wǎnshang hǎo!", exampleMeaning: "Selamat malam!" },
    ],
    keyPhrases: [
      { hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", meaning: "Sekarang jam berapa?" },
      { hanzi: "现在___点___分。", pinyin: "Xiànzài ___ diǎn ___ fēn.", meaning: "Sekarang jam ___ menit ___." },
      { hanzi: "晚上好！", pinyin: "Wǎnshang hǎo!", meaning: "Selamat malam!" },
    ],
    dialogues: [
      {
        id: "11-1",
        situation: "Menanyakan waktu",
        lines: [
          { speaker: "A", hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", meaning: "Sekarang jam berapa?" },
          { speaker: "B", hanzi: "现在下午三点半。", pinyin: "Xiànzài xiàwǔ sān diǎn bàn.", meaning: "Sekarang jam 3.30 sore." },
          { speaker: "A", hanzi: "谢谢！", pinyin: "Xièxie!", meaning: "Terima kasih!" },
        ],
      },
    ],
    fillBlanks: [
      { id: "11-fb-1", sentence: "现在___点？", pinyin: "Xiànzài ___ diǎn?", meaning: "Sekarang jam ___?", blank: "___", options: ["几", "什么", "多", "哪"], answer: "几" },
      { id: "11-fb-2", sentence: "现在下午三点___。", pinyin: "Xiànzài xiàwǔ sān diǎn ___.", meaning: "Sekarang jam 3.30 sore.", blank: "___", options: ["半", "分", "点", "号"], answer: "半" },
    ],
    toneQuestions: [
      { id: "11-t-1", word: "xiànzài", options: ["xiānzāi", "xiánzái", "xiǎnzǎi", "xiànzài"], answer: "xiànzài", meaning: "sekarang" },
      { id: "11-t-2", word: "diǎn", options: ["diān", "diǎn", "diǎn", "diàn"], answer: "diǎn", meaning: "jam (o'clock)" },
      { id: "11-t-3", word: "wǎnshang", options: ["wānshāng", "wánsháng", "wǎnshang", "wànshàng"], answer: "wǎnshang", meaning: "malam" },
    ],
  },
  {
    id: 12,
    hanzi: "明天天气怎么样",
    pinyin: "Míngtiān tiānqì zěnmeyàng",
    english: "What Will the Weather Be Like Tomorrow",
    vocabulary: [
      { hanzi: "天气", pinyin: "tiānqì", meaning: "cuaca / weather", example: "今天天气怎么样？", examplePinyin: "Jīntiān tiānqì zěnmeyàng?", exampleMeaning: "Cuaca hari ini bagaimana?" },
      { hanzi: "怎么样", pinyin: "zěnmeyàng", meaning: "bagaimana / how, what... like", example: "你怎么样？", examplePinyin: "Nǐ zěnmeyàng?", exampleMeaning: "Kamu bagaimana?" },
      { hanzi: "晴", pinyin: "qíng", meaning: "cerah / sunny, clear", example: "今天天气很晴。", examplePinyin: "Jīntiān tiānqì hěn qíng.", exampleMeaning: "Hari ini cuacanya cerah." },
      { hanzi: "冷", pinyin: "lěng", meaning: "dingin / cold", example: "今天很冷。", examplePinyin: "Jīntiān hěn lěng.", exampleMeaning: "Hari ini sangat dingin." },
      { hanzi: "热", pinyin: "rè", meaning: "panas / hot", example: "夏天很热。", examplePinyin: "Xiàtiān hěn rè.", exampleMeaning: "Musim panas sangat panas." },
      { hanzi: "下雨", pinyin: "xià yǔ", meaning: "hujan / to rain", example: "今天下雨。", examplePinyin: "Jīntiān xià yǔ.", exampleMeaning: "Hari ini hujan." },
      { hanzi: "下雪", pinyin: "xià xuě", meaning: "bersalju / to snow", example: "明天下雪吗？", examplePinyin: "Míngtiān xià xuě ma?", exampleMeaning: "Besok bersalju?" },
      { hanzi: "风", pinyin: "fēng", meaning: "angin / wind", example: "今天风很大。", examplePinyin: "Jīntiān fēng hěn dà.", exampleMeaning: "Hari ini anginnya kencang." },
    ],
    keyPhrases: [
      { hanzi: "明天天气怎么样？", pinyin: "Míngtiān tiānqì zěnmeyàng?", meaning: "Cuaca besok bagaimana?" },
      { hanzi: "今天很热/冷。", pinyin: "Jīntiān hěn rè/lěng.", meaning: "Hari ini sangat panas/dingin." },
      { hanzi: "明天下雨吗？", pinyin: "Míngtiān xià yǔ ma?", meaning: "Besok hujan?" },
    ],
    dialogues: [
      {
        id: "12-1",
        situation: "Berbicara tentang cuaca",
        lines: [
          { speaker: "A", hanzi: "明天天气怎么样？", pinyin: "Míngtiān tiānqì zěnmeyàng?", meaning: "Cuaca besok bagaimana?" },
          { speaker: "B", hanzi: "明天下雨。今天也很冷。", pinyin: "Míngtiān xià yǔ. Jīntiān yě hěn lěng.", meaning: "Besok hujan. Hari ini juga sangat dingin." },
          { speaker: "A", hanzi: "我不喜欢下雨！", pinyin: "Wǒ bù xǐhuan xià yǔ!", meaning: "Saya tidak suka hujan!" },
        ],
      },
    ],
    fillBlanks: [
      { id: "12-fb-1", sentence: "明天天气___？", pinyin: "Míngtiān tiānqì ___?", meaning: "Cuaca besok ___?", blank: "___", options: ["怎么样", "什么", "几点", "多大"], answer: "怎么样" },
      { id: "12-fb-2", sentence: "今天很___，我想喝热茶。", pinyin: "Jīntiān hěn ___, wǒ xiǎng hē rè chá.", meaning: "Hari ini sangat ___, saya ingin minum teh panas.", blank: "___", options: ["冷", "热", "晴", "好"], answer: "冷" },
    ],
    toneQuestions: [
      { id: "12-t-1", word: "tiānqì", options: ["tiānqī", "tiánqí", "tiǎnqǐ", "tiānqì"], answer: "tiānqì", meaning: "cuaca" },
      { id: "12-t-2", word: "lěng", options: ["lēng", "léng", "lěng", "lèng"], answer: "lěng", meaning: "dingin" },
      { id: "12-t-3", word: "zěnmeyàng", options: ["zēnmeyāng", "zénmeyáng", "zěnmeyàng", "zènmeyàng"], answer: "zěnmeyàng", meaning: "bagaimana" },
    ],
  },
  {
    id: 13,
    hanzi: "他在学做中国菜呢",
    pinyin: "Tā zài xué zuò Zhōngguó cài ne",
    english: "He Is Learning to Cook Chinese Food",
    vocabulary: [
      { hanzi: "学", pinyin: "xué", meaning: "belajar / to learn, to study", example: "我在学汉语。", examplePinyin: "Wǒ zài xué Hànyǔ.", exampleMeaning: "Saya sedang belajar bahasa China." },
      { hanzi: "做", pinyin: "zuò", meaning: "membuat/melakukan / to do, to make", example: "她在做饭。", examplePinyin: "Tā zài zuò fàn.", exampleMeaning: "Dia sedang memasak." },
      { hanzi: "菜", pinyin: "cài", meaning: "sayuran/masakan / vegetables, dish", example: "中国菜很好吃。", examplePinyin: "Zhōngguó cài hěn hǎochī.", exampleMeaning: "Masakan China sangat enak." },
      { hanzi: "好吃", pinyin: "hǎochī", meaning: "enak / delicious", example: "这个菜很好吃！", examplePinyin: "Zhège cài hěn hǎochī!", exampleMeaning: "Masakan ini sangat enak!" },
      { hanzi: "正在", pinyin: "zhèngzài", meaning: "sedang / in the middle of (doing)", example: "他正在睡觉。", examplePinyin: "Tā zhèngzài shuìjiào.", exampleMeaning: "Dia sedang tidur." },
      { hanzi: "呢", pinyin: "ne", meaning: "partikel aspek / sentence particle (ongoing)", example: "他在学习呢。", examplePinyin: "Tā zài xuéxí ne.", exampleMeaning: "Dia sedang belajar." },
      { hanzi: "看", pinyin: "kàn", meaning: "melihat/menonton / to look, to watch", example: "我在看书。", examplePinyin: "Wǒ zài kàn shū.", exampleMeaning: "Saya sedang membaca buku." },
      { hanzi: "听", pinyin: "tīng", meaning: "mendengarkan / to listen", example: "我在听音乐。", examplePinyin: "Wǒ zài tīng yīnyuè.", exampleMeaning: "Saya sedang mendengarkan musik." },
    ],
    keyPhrases: [
      { hanzi: "他在学做中国菜呢。", pinyin: "Tā zài xué zuò Zhōngguó cài ne.", meaning: "Dia sedang belajar memasak masakan China." },
      { hanzi: "你在做什么呢？", pinyin: "Nǐ zài zuò shénme ne?", meaning: "Kamu sedang melakukan apa?" },
      { hanzi: "中国菜很好吃！", pinyin: "Zhōngguó cài hěn hǎochī!", meaning: "Masakan China sangat enak!" },
    ],
    dialogues: [
      {
        id: "13-1",
        situation: "Menanyakan kegiatan",
        lines: [
          { speaker: "A", hanzi: "你在做什么呢？", pinyin: "Nǐ zài zuò shénme ne?", meaning: "Kamu sedang melakukan apa?" },
          { speaker: "B", hanzi: "我在学做中国菜呢！", pinyin: "Wǒ zài xué zuò Zhōngguó cài ne!", meaning: "Saya sedang belajar memasak masakan China!" },
          { speaker: "A", hanzi: "哇，中国菜很好吃！", pinyin: "Wā, Zhōngguó cài hěn hǎochī!", meaning: "Wow, masakan China sangat enak!" },
        ],
      },
    ],
    fillBlanks: [
      { id: "13-fb-1", sentence: "他在___中国菜呢。", pinyin: "Tā zài ___ Zhōngguó cài ne.", meaning: "Dia sedang ___ masakan China.", blank: "___", options: ["学做", "喝", "说", "写"], answer: "学做" },
      { id: "13-fb-2", sentence: "中国菜很___！", pinyin: "Zhōngguó cài hěn ___!", meaning: "Masakan China sangat ___!", blank: "___", options: ["好吃", "冷", "热", "难"], answer: "好吃" },
    ],
    toneQuestions: [
      { id: "13-t-1", word: "xué", options: ["xuē", "xué", "xuě", "xuè"], answer: "xué", meaning: "belajar" },
      { id: "13-t-2", word: "hǎochī", options: ["hāochī", "háochí", "hǎochī", "hàochì"], answer: "hǎochī", meaning: "enak" },
      { id: "13-t-3", word: "cài", options: ["cāi", "cái", "cǎi", "cài"], answer: "cài", meaning: "sayuran/masakan" },
    ],
  },
  {
    id: 14,
    hanzi: "她买了不少衣服",
    pinyin: "Tā mǎi le bù shǎo yīfu",
    english: "She Has Bought Quite a Few Clothes",
    vocabulary: [
      { hanzi: "买", pinyin: "mǎi", meaning: "membeli / to buy", example: "我想买一件衣服。", examplePinyin: "Wǒ xiǎng mǎi yī jiàn yīfu.", exampleMeaning: "Saya ingin membeli sepotong baju." },
      { hanzi: "了", pinyin: "le", meaning: "partikel selesai / completed action particle", example: "她买了很多东西。", examplePinyin: "Tā mǎi le hěn duō dōngxi.", exampleMeaning: "Dia sudah membeli banyak barang." },
      { hanzi: "衣服", pinyin: "yīfu", meaning: "pakaian / clothes", example: "这件衣服很漂亮。", examplePinyin: "Zhè jiàn yīfu hěn piàoliang.", exampleMeaning: "Pakaian ini sangat cantik." },
      { hanzi: "不少", pinyin: "bù shǎo", meaning: "cukup banyak / quite a few", example: "她买了不少衣服。", examplePinyin: "Tā mǎi le bù shǎo yīfu.", exampleMeaning: "Dia sudah membeli cukup banyak pakaian." },
      { hanzi: "多少", pinyin: "duōshao", meaning: "berapa banyak / how much, how many", example: "这个多少钱？", examplePinyin: "Zhège duōshao qián?", exampleMeaning: "Ini berapa harganya?" },
      { hanzi: "钱", pinyin: "qián", meaning: "uang / money", example: "这个多少钱？", examplePinyin: "Zhège duōshao qián?", exampleMeaning: "Ini berapa harganya?" },
      { hanzi: "贵", pinyin: "guì", meaning: "mahal / expensive", example: "这件衣服很贵。", examplePinyin: "Zhè jiàn yīfu hěn guì.", exampleMeaning: "Pakaian ini sangat mahal." },
      { hanzi: "便宜", pinyin: "piányí", meaning: "murah / cheap", example: "这个很便宜。", examplePinyin: "Zhège hěn piányí.", exampleMeaning: "Ini sangat murah." },
    ],
    keyPhrases: [
      { hanzi: "她买了不少衣服。", pinyin: "Tā mǎi le bù shǎo yīfu.", meaning: "Dia sudah membeli cukup banyak pakaian." },
      { hanzi: "这个多少钱？", pinyin: "Zhège duōshao qián?", meaning: "Ini berapa harganya?" },
      { hanzi: "太贵了！", pinyin: "Tài guì le!", meaning: "Terlalu mahal!" },
    ],
    dialogues: [
      {
        id: "14-1",
        situation: "Belanja pakaian",
        lines: [
          { speaker: "Pembeli", hanzi: "这件衣服多少钱？", pinyin: "Zhè jiàn yīfu duōshao qián?", meaning: "Pakaian ini berapa harganya?" },
          { speaker: "Penjual", hanzi: "两百块钱。", pinyin: "Liǎng bǎi kuài qián.", meaning: "Dua ratus yuan." },
          { speaker: "Pembeli", hanzi: "太贵了！能便宜一点儿吗？", pinyin: "Tài guì le! Néng piányí yīdiǎnr ma?", meaning: "Terlalu mahal! Bisa lebih murah sedikit?" },
          { speaker: "Penjual", hanzi: "好吧，一百八十块。", pinyin: "Hǎo ba, yī bǎi bāshí kuài.", meaning: "Baiklah, 180 yuan." },
        ],
      },
    ],
    fillBlanks: [
      { id: "14-fb-1", sentence: "她买___不少衣服。", pinyin: "Tā mǎi ___ bù shǎo yīfu.", meaning: "Dia sudah membeli cukup banyak pakaian.", blank: "___", options: ["了", "吗", "呢", "的"], answer: "了" },
      { id: "14-fb-2", sentence: "这个___少钱？", pinyin: "Zhège ___ shao qián?", meaning: "Ini berapa harganya?", blank: "___", options: ["多", "几", "什么", "哪"], answer: "多" },
    ],
    toneQuestions: [
      { id: "14-t-1", word: "mǎi", options: ["māi", "mái", "mǎi", "mài"], answer: "mǎi", meaning: "membeli" },
      { id: "14-t-2", word: "yīfu", options: ["yīfū", "yífu", "yǐfǔ", "yīfu"], answer: "yīfu", meaning: "pakaian" },
      { id: "14-t-3", word: "piányí", options: ["piānyī", "piányí", "piǎnyǐ", "piànyì"], answer: "piányí", meaning: "murah" },
    ],
  },
  {
    id: 15,
    hanzi: "我是坐飞机来的",
    pinyin: "Wǒ shì zuò fēijī lái de",
    english: "I Came Here by Air",
    vocabulary: [
      { hanzi: "飞机", pinyin: "fēijī", meaning: "pesawat / airplane", example: "我坐飞机来的。", examplePinyin: "Wǒ zuò fēijī lái de.", exampleMeaning: "Saya datang naik pesawat." },
      { hanzi: "来", pinyin: "lái", meaning: "datang / to come", example: "你从哪儿来？", examplePinyin: "Nǐ cóng nǎr lái?", exampleMeaning: "Kamu datang dari mana?" },
      { hanzi: "去", pinyin: "qù", meaning: "pergi / to go", example: "你去哪儿？", examplePinyin: "Nǐ qù nǎr?", exampleMeaning: "Kamu pergi ke mana?" },
      { hanzi: "火车", pinyin: "huǒchē", meaning: "kereta api / train", example: "我坐火车去北京。", examplePinyin: "Wǒ zuò huǒchē qù Běijīng.", exampleMeaning: "Saya naik kereta ke Beijing." },
      { hanzi: "出租车", pinyin: "chūzūchē", meaning: "taksi / taxi", example: "我坐出租车来的。", examplePinyin: "Wǒ zuò chūzūchē lái de.", exampleMeaning: "Saya datang naik taksi." },
      { hanzi: "从", pinyin: "cóng", meaning: "dari / from", example: "我从上海来。", examplePinyin: "Wǒ cóng Shànghǎi lái.", exampleMeaning: "Saya dari Shanghai." },
      { hanzi: "北京", pinyin: "Běijīng", meaning: "Beijing / Beijing", example: "我去北京。", examplePinyin: "Wǒ qù Běijīng.", exampleMeaning: "Saya pergi ke Beijing." },
      { hanzi: "上海", pinyin: "Shànghǎi", meaning: "Shanghai / Shanghai", example: "她从上海来。", examplePinyin: "Tā cóng Shànghǎi lái.", exampleMeaning: "Dia dari Shanghai." },
    ],
    keyPhrases: [
      { hanzi: "我是坐飞机来的。", pinyin: "Wǒ shì zuò fēijī lái de.", meaning: "Saya datang naik pesawat." },
      { hanzi: "你从哪儿来？", pinyin: "Nǐ cóng nǎr lái?", meaning: "Kamu dari mana?" },
      { hanzi: "你怎么来的？", pinyin: "Nǐ zěnme lái de?", meaning: "Kamu datang naik apa?" },
    ],
    dialogues: [
      {
        id: "15-1",
        situation: "Menanyakan cara datang",
        lines: [
          { speaker: "A", hanzi: "你怎么来的？", pinyin: "Nǐ zěnme lái de?", meaning: "Kamu datang naik apa?" },
          { speaker: "B", hanzi: "我是坐飞机来的，从上海来。你呢？", pinyin: "Wǒ shì zuò fēijī lái de, cóng Shànghǎi lái. Nǐ ne?", meaning: "Saya datang naik pesawat, dari Shanghai. Kamu?" },
          { speaker: "A", hanzi: "我是坐火车来的。", pinyin: "Wǒ shì zuò huǒchē lái de.", meaning: "Saya datang naik kereta." },
        ],
      },
    ],
    fillBlanks: [
      { id: "15-fb-1", sentence: "我是坐___来的。", pinyin: "Wǒ shì zuò ___ lái de.", meaning: "Saya datang naik ___.", blank: "___", options: ["飞机", "茶", "汉语", "衣服"], answer: "飞机" },
      { id: "15-fb-2", sentence: "你___哪儿来？", pinyin: "Nǐ ___ nǎr lái?", meaning: "Kamu ___ mana datang?", blank: "___", options: ["从", "在", "是", "去"], answer: "从" },
    ],
    toneQuestions: [
      { id: "15-t-1", word: "fēijī", options: ["fēijī", "féijí", "fěijǐ", "fèijì"], answer: "fēijī", meaning: "pesawat" },
      { id: "15-t-2", word: "lái", options: ["lāi", "lái", "lǎi", "lài"], answer: "lái", meaning: "datang" },
      { id: "15-t-3", word: "huǒchē", options: ["huōchē", "huóché", "huǒchē", "huòchè"], answer: "huǒchē", meaning: "kereta api" },
    ],
  },
];
