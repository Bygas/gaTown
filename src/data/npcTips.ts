import type { Weather } from '@/types'

/** Li Balıkçı Dede - Hava durumu replikleri */
export const WEATHER_TIPS: Record<Weather, string> = {
  sunny: 'Yarın hava açık ve güzel olacak, dışarı işleri için uygun.',
  rainy: 'Yarın yağmur var, şemsiyeni unutma... Ama balıklar da iyi vurur.',
  stormy: 'Yarın gök gürültülü sağanak var, en iyisi evde dinlenmek.',
  snowy: 'Yarın kar bekleniyor, sıkı giyin. Nehrin yüzeyi buz tutabilir.',
  windy: 'Yarın rüzgâr çıkacak, dışarı serdiklerini toplamayı unutma.',
  green_rain: 'Bu ihtiyarın içine doğuyor... yarın biraz tuhaf geçecek.'
}

/** Zhou Hoca - Şans replik eşikleri */
export const FORTUNE_TIERS: { min: number; message: string }[] = [
  { min: 0.07, message: 'Talih bugün senden yana, çok uğurlu bir gün! Her iş için elverişli.' },
  { min: 0.03, message: 'Bugünkü kısmetin fena değil, dışarıdaki işleri halletmek için iyi gün.' },
  { min: -0.03, message: 'Bugün ne iyi ne kötü, her şeyi olağan şekilde sürdürebilirsin.' },
  { min: -0.07, message: 'Bugün pek hayırlı görünmüyor, işlerinde dikkatli ol.' },
  { min: -Infinity, message: 'Bugün hiçbir işe bulaşmasan daha iyi, evde dinlenmen hayrına.' }
]

/** dailyLuck değerine göre şans repliği al */
export const getFortuneTip = (luck: number): string => {
  for (const tier of FORTUNE_TIERS) {
    if (luck >= tier.min) return tier.message
  }
  return FORTUNE_TIERS[FORTUNE_TIERS.length - 1]!.message
}

/** Muhtar Liu - Yaşam tüyoları (25 satır, döngülü) */
export const LIVING_TIPS: string[] = [
  'İlkbahar, patates ve lahana ekmek için en güzel zamandır; erken ekersen erken biçersin.',
  'Mahsule gübre verirsen kalite artar, kalite arttıkça satış fiyatı da yükselir.',
  'Yağmurlu havada sulama gerekmez, kalan vakti başka işlere ayırabilirsin.',
  'Bambu ormanında ilkbaharda filiz çok olur, toplamayı unutma.',
  'Balık tutarken vakte dikkat et, her balığın en iyi çıktığı saat farklıdır.',
  'Madenin derinleri daha tehlikelidir, yanında bol yiyecek ve ilaç bulundur.',
  'Hediye vermek köylülerle dostluğu artırır, ama herkesin sevdiği şey farklıdır.',
  'Aletlerini yükseltirsen işlerin hızlanır, demirciye uğramayı ihmal etme.',
  'Yazın şeftali ve karpuz iyi para eder, geniş çaplı ekime değer.',
  'Fıskiye yaparsan sulama işi kendiliğinden olur, sana da epey vakit kalır.',
  'Sonbaharda çok mevsimli ürünler ekebilirsin, gelirin daha dengeli olur.',
  'Kışın tarla işlemez ama madenden daha çok kazanç çıkabilir.',
  'Köylülerle sık sık konuş, belli bir yakınlıktan sonra yeni tarifler öğrenirsin.',
  'Müzeye bağış yaptıkça önemli ödüller kazanırsın, fosil ve antikaları toplamayı unutma.',
  'Loncanın av görevleri bol ödül verir, fırsat buldukça yap.',
  'Yem ve olta aksesuarları, balıkçılığın verimini ve kalitesini artırır.',
  'İşleme makineleri ham malı daha değerli ürünlere dönüştürür.',
  'Festival etkinliklerinde özel ödüller olur, hiçbirini kaçırma.',
  'Bombalarla bir kerede geniş bir cevher alanını açabilirsin, çok işe yarar.',
  'Madene inmeden önce yüzüklerini takmayı unutma, verdikleri özellikler önemlidir.',
  'Kaliteli mahsullerle daha iyi yemekler hazırlanır.',
  'Evcil hayvanını uzun süre besleyip büyütürsen beklenmedik güzellikler görebilirsin.',
  'Şeftali çiçeği korusunun derinliklerinde nadir toplanabilir şeyler saklı derler.',
  'Çiftliğini özenle işlet, herkes seni izliyor haberin olsun.',
  'Gizli notlarda bu diyarın sırları gizlidir, gözünü açık tut.'
]

/** Günün yaşam tüyosunu al */
export const getLivingTip = (day: number, year: number): string => {
  const index = ((year - 1) * 112 + day - 1) % LIVING_TIPS.length
  return LIVING_TIPS[index]!
}

/** Wang Teyze - Tarif önerisi repliği şablonu */
export const getRecipeTipMessage = (recipeName: string, ingredientNames: string[]): string => {
  return `Bugün sana ${recipeName} yapmayı öğreteyim, bunun için ${ingredientNames.join('、')} gerekiyor.`
}

/** Önerilecek tarif yoksa genel replik */
export const NO_RECIPE_TIP = 'Yemek yapmayı güzelce öğren, önünde daha uzun bir hayat var.'

/** Günlük ipucu özelliği olan NPC kimlikleri */
export const TIP_NPC_IDS = ['li_yu', 'zhou_xiucai', 'wang_dashen', 'liu_cunzhang'] as const

/** NPC ipucu tipi */
export type TipNpcId = (typeof TIP_NPC_IDS)[number]

/** NPC ipucu etiketleri */
export const TIP_NPC_LABELS: Record<TipNpcId, string> = {
  li_yu: 'Hava Durumu',
  zhou_xiucai: 'Günün Kısmeti',
  wang_dashen: 'Tarif Önerisi',
  liu_cunzhang: 'Yaşam Tüyosu'
}
