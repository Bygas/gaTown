import type { ItemDef, ItemCategory } from '@/types/item'
import { CROPS } from './crops'
import { FISH } from './fish'
import { RECIPES } from './recipes'
import { PROCESSING_MACHINES, SPRINKLERS, FERTILIZERS, BAITS, TACKLES, BOMBS } from './processing'
import { FRUIT_TREE_DEFS } from './fruitTrees'
import { WEAPONS, getWeaponSellPrice } from './weapons'
import { RINGS } from './rings'
import { HATS } from './hats'
import { SHOES } from './shoes'

/** Ekin tanımlarından otomatik tohum eşyaları üretir (elle tanımlanmış tohumlar hariç) */
const SEED_ITEMS: ItemDef[] = CROPS.filter(
  crop => crop.seedId !== 'ancient_seed' && crop.seedId !== 'hanhai_cactus_seed' && crop.seedId !== 'hanhai_date_seed'
).map(crop => ({
  id: crop.seedId,
  name: `${crop.name} Tohumu`,
  category: 'seed',
  description: `${crop.name} tohumu, ${crop.season
    .map(s => {
      const names: Record<string, string> = { spring: 'ilkbahar', summer: 'yaz', autumn: 'sonbahar', winter: 'kış' }
      return names[s]
    })
    .join('/')} mevsiminde ekilebilir.`,
  sellPrice: Math.floor(crop.seedPrice / 2),
  edible: false
}))

/** Ekin tanımlarından otomatik hasat eşyaları üretir */
const CROP_ITEMS: ItemDef[] = CROPS.map(crop => ({
  id: crop.id,
  name: crop.name,
  category: 'crop',
  description: crop.description,
  sellPrice: Math.floor(crop.sellPrice * 1.5),
  edible: true,
  staminaRestore: Math.floor(crop.sellPrice / 5),
  healthRestore: Math.floor(crop.sellPrice / 10)
}))

/** Cevher eşyaları */
const ORE_ITEMS: ItemDef[] = [
  { id: 'copper_ore', name: 'Bakır Cevheri', category: 'ore', description: 'Yaygın bir metal cevheri.', sellPrice: 5, edible: false },
  { id: 'iron_ore', name: 'Demir Cevheri', category: 'ore', description: 'Sert bir demir cevheri.', sellPrice: 10, edible: false },
  { id: 'gold_ore', name: 'Altın Cevheri', category: 'ore', description: 'Değerli bir altın cevheri.', sellPrice: 18, edible: false },
  { id: 'crystal_ore', name: 'Kristal Cevheri', category: 'ore', description: 'Işığı yansıtan kristal cevheri.', sellPrice: 30, edible: false },
  { id: 'shadow_ore', name: 'Gölge Cevheri', category: 'ore', description: 'Ağır, simsiyah ve gizemli bir cevher.', sellPrice: 45, edible: false },
  { id: 'void_ore', name: 'Boşluk Cevheri', category: 'ore', description: 'Uçurumun en dibinden gelen bir cevher.', sellPrice: 60, edible: false },
  { id: 'iridium_ore', name: 'İridyum Cevheri', category: 'ore', description: 'En sert ve en nadir metal cevheri.', sellPrice: 80, edible: false },
  { id: 'quartz', name: 'Kuvars', category: 'gem', description: 'Berrak ve parlak bir kuvars.', sellPrice: 10, edible: false },
  { id: 'jade', name: 'Yeşim', category: 'gem', description: 'Yumuşak dokulu bir yeşim taşı.', sellPrice: 30, edible: false },
  { id: 'ruby', name: 'Yakut', category: 'gem', description: 'Işıl ışıl parlayan bir yakut.', sellPrice: 45, edible: false },
  { id: 'moonstone', name: 'Aytaşı', category: 'gem', description: 'Yumuşak bir parıltı yayan değerli taş.', sellPrice: 65, edible: false },
  { id: 'obsidian', name: 'Obsidyen', category: 'gem', description: 'Uçurum kadar karanlık volkan camı.', sellPrice: 90, edible: false },
  { id: 'dragon_jade', name: 'Ejder Yeşimi', category: 'gem', description: 'Efsaneye göre ejder damarlarından oluşmuş kutsal taş.', sellPrice: 120, edible: false },
  { id: 'prismatic_shard', name: 'Prizmatik Parça', category: 'gem', description: 'Kadim enerji taşıyan bir parça.', sellPrice: 180, edible: false },
  { id: 'battery', name: 'Pil Ünitesi', category: 'material', description: 'Yıldırım çekicinin gök gürültüsünden topladığı enerji.', sellPrice: 100, edible: false }
]

/** Çeşitli eşyalar */
const MISC_ITEMS: ItemDef[] = [
  { id: 'wood', name: 'Odun', category: 'material', description: 'İnşa ve üretimin temel malzemesi.', sellPrice: 5, edible: false },
  { id: 'bamboo', name: 'Bambu', category: 'material', description: 'Bambu ormanından toplanan yemyeşil bambu.', sellPrice: 10, edible: false },
  { id: 'herb', name: 'Şifalı Ot', category: 'material', description: 'Dağlarda yetişen yabani şifalı ot.', sellPrice: 15, edible: false },
  { id: 'firewood', name: 'Yakacak Odun', category: 'material', description: 'Yemek pişirmede kullanılan yakıt.', sellPrice: 5, edible: false },
  {
    id: 'winter_bamboo_shoot',
    name: 'Kış Bambu Filizi',
    category: 'misc',
    description: 'Kışa özgü taze ve körpe bambu filizi.',
    sellPrice: 40,
    edible: true,
    staminaRestore: 8,
    healthRestore: 3
  },
  { id: 'wintersweet', name: 'Kış Yasemini', category: 'gift', description: 'Dondurucu kışta açan kış yasemini, hediye için çok uygundur.', sellPrice: 50, edible: false },
  {
    id: 'wild_mushroom',
    name: 'Yabani Mantar',
    category: 'misc',
    description: 'Sonbahar dağlarında toplanan mantar.',
    sellPrice: 30,
    edible: true,
    staminaRestore: 5,
    healthRestore: 2
  },
  { id: 'ginseng', name: 'Ginseng', category: 'misc', description: 'Son derece değerli yabani ginseng.', sellPrice: 200, edible: false },
  {
    id: 'wild_berry',
    name: 'Yabani Meyve',
    category: 'misc',
    description: 'Yaz dağlarında yetişen tatlı yabani meyve.',
    sellPrice: 20,
    edible: true,
    staminaRestore: 5,
    healthRestore: 2
  },
  { id: 'pine_cone', name: 'Çam Kozalağı', category: 'material', description: 'Çam ağaçlarından düşen kozalak.', sellPrice: 10, edible: false },
  { id: 'jade_ring', name: 'Yeşim Yüzük', category: 'gift', description: 'Özenle işlenmiş bir yeşim yüzük, evlilik teklifi için kullanılabilir.', sellPrice: 500, edible: false },
  {
    id: 'silk_ribbon',
    name: 'İpek Mendil',
    category: 'gift',
    description: 'İnce işçilikle işlenmiş ipek mendil, sevdiğine duygularını anlatmak için verilir.',
    sellPrice: 200,
    edible: false
  },
  {
    id: 'zhiji_jade',
    name: 'Dostluk Yeşim Kolyesi',
    category: 'gift',
    description: 'Özenle oyulmuş bir çift yeşim kolye. Aynı cinsiyetten yakın dosta verilirse can dost olunur.',
    sellPrice: 300,
    edible: false
  },
  { id: 'scarecrow', name: 'Korkuluk', category: 'machine', description: 'Çiftliğe yerleştirilir, ürünleri yiyen kargaları uzak tutar.', sellPrice: 75, edible: false },
  { id: 'rain_totem', name: 'Yağmur Totemi', category: 'misc', description: 'Kullanıldıktan sonra yarın yağmur yağdırır.', sellPrice: 30, edible: false },
  {
    id: 'fish_feed',
    name: 'Balık Yemi',
    category: 'material',
    description: 'Balık havuzu için özel yem, su kalitesini ve balıkların sağlığını korur.',
    sellPrice: 10,
    edible: false
  },
  {
    id: 'water_purifier',
    name: 'Su Arıtıcı Katkı',
    category: 'material',
    description: 'Balık havuzundaki su kalitesini iyileştirir, balıkların hastalanma ihtimalini azaltır.',
    sellPrice: 50,
    edible: false
  }
]

/** Balık tanımlarından otomatik balık eşyaları üretir */
const FISH_ITEMS: ItemDef[] = FISH.map(fish => ({
  id: fish.id,
  name: fish.name,
  category: 'fish' as const,
  description: fish.description,
  sellPrice: Math.floor(fish.sellPrice * 1.5),
  edible: true,
  staminaRestore: Math.floor(fish.sellPrice / 5),
  healthRestore: Math.floor(fish.sellPrice / 8)
}))

/** Tarif tanımlarından otomatik yemek eşyaları üretir */
const _preFoodItems: ItemDef[] = [...SEED_ITEMS, ...CROP_ITEMS, ...ORE_ITEMS, ...MISC_ITEMS, ...FISH_ITEMS]
const FOOD_ITEMS: ItemDef[] = RECIPES.map(recipe => {
  const baseSellPrice = Math.floor(recipe.effect.staminaRestore * 2)
  // Malzeme toplam satış değerini hesapla; alt sınır: yemek satış fiyatı, malzeme toplamının en az 1.2 katı olsun
  const ingredientTotal = recipe.ingredients.reduce((sum, ing) => {
    const def = _preFoodItems.find(i => i.id === ing.itemId)
    return sum + (def?.sellPrice ?? 0) * ing.quantity
  }, 0)
  const sellPrice = Math.max(baseSellPrice, Math.floor(ingredientTotal * 1.2))
  return {
    id: `food_${recipe.id}`,
    name: recipe.name,
    category: 'food' as const,
    description: recipe.description,
    sellPrice,
    edible: true,
    staminaRestore: recipe.effect.staminaRestore,
    healthRestore: recipe.effect.healthRestore ?? Math.floor(recipe.effect.staminaRestore * 0.4)
  }
})

/** İşlenmiş ürün eşyaları */
const PROCESSED_ITEMS: ItemDef[] = [
  {
    id: 'watermelon_wine',
    name: 'Karpuz Şarabı',
    category: 'processed',
    description: 'Tatlı karpuzdan yapılmış nefis bir içki.',
    sellPrice: 390,
    edible: true,
    staminaRestore: 25,
    healthRestore: 15
  },
  {
    id: 'osmanthus_wine',
    name: 'Osmanthus Şarabı',
    category: 'processed',
    description: 'Mis kokulu osmanthus çiçeği şarabı.',
    sellPrice: 600,
    edible: true,
    staminaRestore: 30,
    healthRestore: 18
  },
  { id: 'rice_vinegar', name: 'Pirinç Sirkesi', category: 'processed', description: 'Ev yapımı yıllanmış sirke.', sellPrice: 290, edible: false },
  {
    id: 'pickled_cabbage',
    name: 'Lahana Turşusu',
    category: 'processed',
    description: 'İştah açan lahana turşusu.',
    sellPrice: 155,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  {
    id: 'dried_radish',
    name: 'Kuru Turp',
    category: 'processed',
    description: 'Kıtır kıtır kuru turp.',
    sellPrice: 245,
    edible: true,
    staminaRestore: 12,
    healthRestore: 5
  },
  {
    id: 'pumpkin_preserve',
    name: 'Balkabağı Reçeli',
    category: 'processed',
    description: 'Yoğun aromalı balkabağı reçeli.',
    sellPrice: 410,
    edible: true,
    staminaRestore: 15,
    healthRestore: 8
  },
  {
    id: 'honey',
    name: 'Bal',
    category: 'processed',
    description: 'Altın sarısı, tatlı bal.',
    sellPrice: 100,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  { id: 'sesame_oil', name: 'Susam Yağı', category: 'processed', description: 'Yoğun aromalı taş değirmen susam yağı.', sellPrice: 260, edible: false },
  { id: 'tea_oil', name: 'Çay Yağı', category: 'processed', description: 'Değerli dağ çayı tohumu yağı.', sellPrice: 620, edible: false },
  {
    id: 'peach_wine',
    name: 'Şeftali Şarabı',
    category: 'processed',
    description: 'Hafif tatlı şeftali şarabı.',
    sellPrice: 420,
    edible: true,
    staminaRestore: 25,
    healthRestore: 15
  },
  {
    id: 'jujube_wine',
    name: 'Hünnap Şarabı',
    category: 'processed',
    description: 'Yoğun ve besleyici hünnap şarabı.',
    sellPrice: 300,
    edible: true,
    staminaRestore: 20,
    healthRestore: 12
  },
  {
    id: 'corn_wine',
    name: 'Mısır Şarabı',
    category: 'processed',
    description: 'Hafif kokulu mısır şarabı.',
    sellPrice: 330,
    edible: true,
    staminaRestore: 18,
    healthRestore: 10
  },
  {
    id: 'pickled_chili',
    name: 'Acı Biber Turşusu',
    category: 'processed',
    description: 'Ekşi ve acı, iştah açan turşu biber.',
    sellPrice: 270,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  {
    id: 'pickled_ginger',
    name: 'Zencefil Turşusu',
    category: 'processed',
    description: 'Tatlı-ekşi ve kıtır zencefil turşusu.',
    sellPrice: 315,
    edible: true,
    staminaRestore: 12,
    healthRestore: 5
  },
  { id: 'mayonnaise', name: 'Mayonez', category: 'processed', description: 'Yumurtadan yapılan yoğun mayonez.', sellPrice: 115, edible: false },
  {
    id: 'duck_mayonnaise',
    name: 'Ördek Yumurtası Mayonezi',
    category: 'processed',
    description: 'Ördek yumurtasından yapılan kaliteli mayonez.',
    sellPrice: 215,
    edible: false
  },
  {
    id: 'goose_mayonnaise',
    name: 'Kaz Yumurtası Mayonezi',
    category: 'processed',
    description: 'Kaz yumurtasından yapılan yoğun mayonez.',
    sellPrice: 250,
    edible: false
  },
  {
    id: 'silkie_mayonnaise',
    name: 'İpek Tavuk Yumurtası Mayonezi',
    category: 'processed',
    description: 'İpek tavuk yumurtasından yapılan besleyici mayonez.',
    sellPrice: 295,
    edible: false
  },
  {
    id: 'ostrich_mayonnaise',
    name: 'Devekuşu Yumurtası Mayonezi',
    category: 'processed',
    description: 'Devekuşu yumurtasından yapılan büyük boy mayonez.',
    sellPrice: 450,
    edible: false
  },
  {
    id: 'quail_mayonnaise',
    name: 'Bıldırcın Yumurtası Mayonezi',
    category: 'processed',
    description: 'Bıldırcın yumurtasından yapılan zarif mayonez.',
    sellPrice: 170,
    edible: false
  }
]

/** Tütsülenmiş balık eşyaları */
const SMOKED_ITEMS: ItemDef[] = [
  {
    id: 'smoked_crucian',
    name: 'Tütsülenmiş Havuz Balığı',
    category: 'processed',
    description: 'Tütsülenmiş havuz balığı, kendine has aroması vardır.',
    sellPrice: 30,
    edible: true,
    staminaRestore: 7,
    healthRestore: 3
  },
  {
    id: 'smoked_carp',
    name: 'Tütsülenmiş Sazan',
    category: 'processed',
    description: 'Tütsülenmiş sazan, eti sıkı ve doyurucudur.',
    sellPrice: 50,
    edible: true,
    staminaRestore: 12,
    healthRestore: 6
  },
  {
    id: 'smoked_grass_carp',
    name: 'Tütsülenmiş Ot Sazanı',
    category: 'processed',
    description: 'Tütsülenmiş ot sazanı, leziz ve hoş kokuludur.',
    sellPrice: 80,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  {
    id: 'smoked_bass',
    name: 'Tütsülenmiş Levrek',
    category: 'processed',
    description: 'Tütsülenmiş levrek, dokusu son derece yumuşaktır.',
    sellPrice: 120,
    edible: true,
    staminaRestore: 30,
    healthRestore: 15
  },
  {
    id: 'smoked_catfish',
    name: 'Tütsülenmiş Yayın Balığı',
    category: 'processed',
    description: 'Tütsülenmiş yayın balığı, yoğun lezzetlidir.',
    sellPrice: 90,
    edible: true,
    staminaRestore: 22,
    healthRestore: 11
  },
  {
    id: 'smoked_mandarin_fish',
    name: 'Tütsülenmiş Mandarin Balığı',
    category: 'processed',
    description: 'Tütsülenmiş mandarin balığı, yumuşak ve sulu olur.',
    sellPrice: 140,
    edible: true,
    staminaRestore: 35,
    healthRestore: 17
  },
  {
    id: 'smoked_eel',
    name: 'Tütsülenmiş Yılanbalığı',
    category: 'processed',
    description: 'Tütsülenmiş yılanbalığı, yağlı ve kaygan dokuludur.',
    sellPrice: 170,
    edible: true,
    staminaRestore: 42,
    healthRestore: 21
  },
  {
    id: 'smoked_sturgeon',
    name: 'Tütsülenmiş Mersin Balığı',
    category: 'processed',
    description: 'Tütsülenmiş mersin balığı, değerli ve çok lezzetlidir.',
    sellPrice: 260,
    edible: true,
    staminaRestore: 65,
    healthRestore: 32
  },
  {
    id: 'smoked_loach',
    name: 'Tütsülenmiş Çamur Balığı',
    category: 'processed',
    description: 'Tütsülenmiş çamur balığı, kıtır ve hoş aromalıdır.',
    sellPrice: 44,
    edible: true,
    staminaRestore: 11,
    healthRestore: 5
  },
  {
    id: 'smoked_yellow_eel',
    name: 'Tütsülenmiş Sarı Yılanbalığı',
    category: 'processed',
    description: 'Tütsülenmiş sarı yılanbalığı, besleyici ve çok lezzetlidir.',
    sellPrice: 100,
    edible: true,
    staminaRestore: 25,
    healthRestore: 12
  }
]

/** Kurutulmuş yiyecek eşyaları */
const DRIED_ITEMS: ItemDef[] = [
  {
    id: 'dried_mushroom',
    name: 'Kurutulmuş Mantar',
    category: 'processed',
    description: 'Kurutularak saklanmış mantar, lezzeti iyice yoğunlaşmıştır.',
    sellPrice: 135,
    edible: true,
    staminaRestore: 18,
    healthRestore: 9
  },
  {
    id: 'dried_peach',
    name: 'Kuru Şeftali',
    category: 'processed',
    description: 'Kurutulmuş şeftali, tatlı-ekşi çok hoş gider.',
    sellPrice: 120,
    edible: true,
    staminaRestore: 30,
    healthRestore: 15
  },
  {
    id: 'dried_lychee',
    name: 'Kuru Liçi',
    category: 'processed',
    description: 'Kurutulmuş liçi, yoğun tatlı aromaya sahiptir.',
    sellPrice: 160,
    edible: true,
    staminaRestore: 40,
    healthRestore: 20
  },
  {
    id: 'dried_persimmon_slice',
    name: 'Kuru Trabzon Hurması',
    category: 'processed',
    description: 'Kurutulmuş hurma dilimleri, yumuşak ve tatlıdır.',
    sellPrice: 170,
    edible: true,
    staminaRestore: 42,
    healthRestore: 21
  },
  {
    id: 'dried_hawthorn',
    name: 'Kuru Alıç Dilimi',
    category: 'processed',
    description: 'Kurutulmuş alıç dilimleri, ekşi tatlı ve iştah açıcıdır.',
    sellPrice: 130,
    edible: true,
    staminaRestore: 32,
    healthRestore: 16
  },
  {
    id: 'dried_apricot',
    name: 'Kuru Kayısı',
    category: 'processed',
    description: 'Kurutulmuş kayısı, dengeli ekşi tatlı lezzete sahiptir.',
    sellPrice: 110,
    edible: true,
    staminaRestore: 27,
    healthRestore: 13
  },
  {
    id: 'dried_berry',
    name: 'Meyve Kurusu',
    category: 'processed',
    description: 'Yabani meyvelerden yapılmış meyve kurusu, saklaması kolaydır.',
    sellPrice: 90,
    edible: true,
    staminaRestore: 12,
    healthRestore: 6
  }
]

/** Makine eşyaları */
const MACHINE_ITEMS: ItemDef[] = PROCESSING_MACHINES.map(m => ({
  id: `machine_${m.id}`,
  name: m.name,
  category: 'machine' as const,
  description: m.description,
  sellPrice: Math.floor(m.craftMoney * 0.5),
  edible: false
}))

/** Fıskiye eşyaları */
const SPRINKLER_ITEMS: ItemDef[] = SPRINKLERS.map(s => ({
  id: s.id,
  name: s.name,
  category: 'sprinkler' as const,
  description: s.description,
  sellPrice: Math.floor(s.craftMoney * 0.5),
  edible: false
}))

/** Gübre eşyaları */
const FERTILIZER_ITEMS: ItemDef[] = FERTILIZERS.map(f => ({
  id: f.id,
  name: f.name,
  category: 'fertilizer' as const,
  description: f.description,
  sellPrice: 5,
  edible: false
}))

/** Yem eşyaları */
const BAIT_ITEMS: ItemDef[] = BAITS.map(b => ({
  id: b.id,
  name: b.name,
  category: 'bait' as const,
  description: b.description,
  sellPrice: b.shopPrice ? Math.floor(b.shopPrice * 0.4) : 5,
  edible: false
}))

/** Şamandıra eşyaları */
const TACKLE_ITEMS: ItemDef[] = TACKLES.map(t => ({
  id: t.id,
  name: t.name,
  category: 'tackle' as const,
  description: t.description,
  sellPrice: t.shopPrice ? Math.floor(t.shopPrice * 0.5) : 50,
  edible: false
}))

/** Hayvansal ürünler */
const ANIMAL_PRODUCT_ITEMS: ItemDef[] = [
  {
    id: 'egg',
    name: 'Yumurta',
    category: 'animal_product',
    description: 'Taze yumurta.',
    sellPrice: 75,
    edible: true,
    staminaRestore: 5,
    healthRestore: 3
  },
  {
    id: 'duck_egg',
    name: 'Ördek Yumurtası',
    category: 'animal_product',
    description: 'Büyük ve lezzetli ördek yumurtası.',
    sellPrice: 142,
    edible: true,
    staminaRestore: 8,
    healthRestore: 4
  },
  {
    id: 'milk',
    name: 'Süt',
    category: 'animal_product',
    description: 'Taze süt.',
    sellPrice: 187,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  { id: 'wool', name: 'Yün', category: 'animal_product', description: 'Yumuşak yün.', sellPrice: 510, edible: false },
  { id: 'hay', name: 'Kuru Ot', category: 'material', description: 'Hayvanları beslemek için kuru ot.', sellPrice: 0, edible: false },
  // Yeni hayvansal ürünler
  { id: 'rabbit_fur', name: 'Tavşan Kürkü', category: 'animal_product', description: 'Yumuşak tavşan kürkü.', sellPrice: 225, edible: false },
  {
    id: 'rabbit_foot',
    name: 'Şanslı Tavşan Ayağı',
    category: 'animal_product',
    description: 'Şans getirdiğine inanılan, oldukça nadir tavşan ayağı.',
    sellPrice: 300,
    edible: false
  },
  {
    id: 'goose_egg',
    name: 'Kaz Yumurtası',
    category: 'animal_product',
    description: 'Oldukça iri bir kaz yumurtası.',
    sellPrice: 165,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  {
    id: 'quail_egg',
    name: 'Bıldırcın Yumurtası',
    category: 'animal_product',
    description: 'Küçük bıldırcın yumurtası.',
    sellPrice: 37,
    edible: true,
    staminaRestore: 3,
    healthRestore: 2
  },
  {
    id: 'pigeon_egg',
    name: 'Güvercin Yumurtası',
    category: 'animal_product',
    description: 'Besleyici güvercin yumurtası.',
    sellPrice: 67,
    edible: true,
    staminaRestore: 5,
    healthRestore: 3
  },
  {
    id: 'silkie_egg',
    name: 'İpek Tavuk Yumurtası',
    category: 'animal_product',
    description: 'Besleyici ipek tavuk yumurtası.',
    sellPrice: 195,
    edible: true,
    staminaRestore: 15,
    healthRestore: 8
  },
  { id: 'peacock_feather', name: 'Tavuskuşu Tüyü', category: 'animal_product', description: 'Gösterişli tavuskuşu kuyruğu tüyü.', sellPrice: 525, edible: false },
  {
    id: 'goat_milk',
    name: 'Keçi Sütü',
    category: 'animal_product',
    description: 'Taze keçi sütü.',
    sellPrice: 165,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  {
    id: 'truffle',
    name: 'Trüf',
    category: 'animal_product',
    description: 'Değerli bir yeraltı mantarı.',
    sellPrice: 450,
    edible: true,
    staminaRestore: 5,
    healthRestore: 3
  },
  {
    id: 'buffalo_milk',
    name: 'Manda Sütü',
    category: 'animal_product',
    description: 'Yoğun aromalı manda sütü.',
    sellPrice: 150,
    edible: true,
    staminaRestore: 8,
    healthRestore: 4
  },
  {
    id: 'yak_milk',
    name: 'Yak Sütü',
    category: 'animal_product',
    description: 'Yüksek yaylalardan gelen yoğun yak sütü.',
    sellPrice: 210,
    edible: true,
    staminaRestore: 12,
    healthRestore: 6
  },
  { id: 'alpaca_wool', name: 'Alpaka Yünü', category: 'animal_product', description: 'Son derece yumuşak alpaka yünü.', sellPrice: 375, edible: false },
  {
    id: 'antler_velvet',
    name: 'Geyik Boynuzu Kadifesi',
    category: 'animal_product',
    description: 'Değerli geyik boynuzu kadifesi, doğrudan yenerek kuvvet toparlanabilir.',
    sellPrice: 675,
    edible: true,
    staminaRestore: 30,
    healthRestore: 15
  },
  {
    id: 'donkey_milk',
    name: 'Eşek Sütü',
    category: 'animal_product',
    description: 'Yumuşak içimli eşek sütü.',
    sellPrice: 120,
    edible: true,
    staminaRestore: 6,
    healthRestore: 3
  },
  {
    id: 'camel_milk',
    name: 'Deve Sütü',
    category: 'animal_product',
    description: 'Besleyici deve sütü.',
    sellPrice: 240,
    edible: true,
    staminaRestore: 12,
    healthRestore: 6
  },
  {
    id: 'ostrich_egg',
    name: 'Devekuşu Yumurtası',
    category: 'animal_product',
    description: 'Devasa devekuşu yumurtası.',
    sellPrice: 300,
    edible: true,
    staminaRestore: 15,
    healthRestore: 8
  }
]

/** Meyve ağaçları meyveleri */
const FRUIT_TREE_ITEMS: ItemDef[] = FRUIT_TREE_DEFS.map(t => ({
  id: t.fruitId,
  name: t.fruitName,
  category: 'fruit' as const,
  description: `${t.name} ağacının verdiği ${t.fruitName}.`,
  sellPrice: Math.floor(t.fruitSellPrice * 1.5),
  edible: true,
  staminaRestore: Math.floor(t.fruitSellPrice / 5),
  healthRestore: Math.floor(t.fruitSellPrice / 10)
}))

/** Fidanlar */
const SAPLING_ITEMS: ItemDef[] = FRUIT_TREE_DEFS.map(t => ({
  id: t.saplingId,
  name: `${t.name} Fidanı`,
  category: 'sapling' as const,
  description: `Dikildikten ${t.growthDays} gün sonra olgunlaşır, ${t.fruitSeason === 'spring' ? 'ilkbaharda' : t.fruitSeason === 'summer' ? 'yazın' : t.fruitSeason === 'autumn' ? 'sonbaharda' : 'kışın'} ${t.fruitName} verir.`,
  sellPrice: Math.floor(t.saplingPrice / 2),
  edible: false
}))

/** Yabani ağaç ürünleri ve malzemeleri */
const WILD_TREE_ITEMS: ItemDef[] = [
  {
    id: 'camphor_seed',
    name: 'Kafur Ağacı Tohumu',
    category: 'material',
    description: 'Kafur ağacının tohumu, dikilirse kafur ağacına dönüşür.',
    sellPrice: 15,
    edible: false
  },
  {
    id: 'mulberry',
    name: 'Dut',
    category: 'misc',
    description: 'Morumsu siyah dut, tatlı ekşi çok lezzetlidir.',
    sellPrice: 25,
    edible: true,
    staminaRestore: 5,
    healthRestore: 2
  },
  { id: 'pine_resin', name: 'Çam Reçinesi', category: 'material', description: 'Çam ağacının salgıladığı reçine, üretimde kullanılır.', sellPrice: 30, edible: false },
  { id: 'camphor_oil', name: 'Kafur Yağı', category: 'material', description: 'Kafur ağacından elde edilen hoş kokulu uçucu yağ.', sellPrice: 50, edible: false },
  { id: 'silk', name: 'İpek', category: 'material', description: 'Dut ağacından toplanan ipek, pürüzsüz ve yumuşaktır.', sellPrice: 40, edible: false },
  { id: 'tapper', name: 'Reçine Toplayıcı', category: 'machine', description: 'Olgun yabani ağaca takılır, düzenli olarak reçine verir.', sellPrice: 100, edible: false }
]

/** Bomba eşyaları */
const BOMB_ITEMS: ItemDef[] = BOMBS.map(b => ({
  id: b.id,
  name: b.name,
  category: 'bomb' as const,
  description: b.description,
  sellPrice: 25,
  edible: false
}))

/** Yengeç kapanı ve su ürünü eşyaları */
const CRAB_POT_ITEMS: ItemDef[] = [
  {
    id: 'crab_pot',
    name: 'Yengeç Kapanı',
    category: 'machine',
    description: 'Balık tutulabilen yerlere yerleştirilir, her gün otomatik su ürünü yakalar (yem gerekir).',
    sellPrice: 750,
    edible: false
  },
  {
    id: 'snail',
    name: 'Salyangoz',
    category: 'fish',
    description: 'Küçük bir tatlı su salyangozu.',
    sellPrice: 15,
    edible: true,
    staminaRestore: 3,
    healthRestore: 2
  },
  {
    id: 'freshwater_shrimp',
    name: 'Tatlı Su Karidesi',
    category: 'fish',
    description: 'Temiz sularda yaşayan küçük karides.',
    sellPrice: 20,
    edible: true,
    staminaRestore: 4,
    healthRestore: 2
  },
  {
    id: 'crab',
    name: 'Yengeç',
    category: 'fish',
    description: 'Lezzetli nehir yengeci.',
    sellPrice: 30,
    edible: true,
    staminaRestore: 6,
    healthRestore: 3
  },
  {
    id: 'lobster',
    name: 'Istakoz',
    category: 'fish',
    description: 'Değerli bir tatlı su ıstakozu.',
    sellPrice: 50,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  {
    id: 'cave_shrimp',
    name: 'Mağara Karidesi',
    category: 'fish',
    description: 'Madenin karanlık nehirlerinde yaşayan saydam karides.',
    sellPrice: 40,
    edible: true,
    staminaRestore: 8,
    healthRestore: 4
  },
  {
    id: 'swamp_crab',
    name: 'Bataklık Yengeci',
    category: 'fish',
    description: 'Bataklıkta yaşayan koyu renkli yengeç.',
    sellPrice: 45,
    edible: true,
    staminaRestore: 9,
    healthRestore: 4
  },
  { id: 'trash', name: 'Çöp', category: 'misc', description: 'Pek işe yaramayan hurdalar.', sellPrice: 1, edible: false },
  { id: 'driftwood', name: 'Sürüklenen Odun', category: 'misc', description: 'Sudan çıkarılmış çürük odun parçası.', sellPrice: 2, edible: false },
  { id: 'broken_cd', name: 'Kırık Disk', category: 'misc', description: 'Kim bilir kimin attığı kırık bir disk.', sellPrice: 1, edible: false },
  { id: 'soggy_newspaper', name: 'Islak Gazete', category: 'misc', description: 'Suda erimiş eski gazete.', sellPrice: 1, edible: false }
]

/** Çiçek balı eşyaları */
const FLOWER_HONEY_ITEMS: ItemDef[] = [
  {
    id: 'chrysanthemum_honey',
    name: 'Kasımpatı Balı',
    category: 'processed',
    description: 'Kasımpatı kokusu taşıyan bal.',
    sellPrice: 200,
    edible: true,
    staminaRestore: 25,
    healthRestore: 12
  },
  {
    id: 'osmanthus_honey',
    name: 'Osmanthus Balı',
    category: 'processed',
    description: 'Yoğun ve mis kokulu osmanthus balı.',
    sellPrice: 450,
    edible: true,
    staminaRestore: 30,
    healthRestore: 15
  },
  {
    id: 'rapeseed_honey',
    name: 'Kanola Çiçeği Balı',
    category: 'processed',
    description: 'Hafif tatlı kanola çiçeği balı.',
    sellPrice: 150,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  {
    id: 'snow_lotus_honey',
    name: 'Kar Nilüferi Balı',
    category: 'processed',
    description: 'Nadir ve değerli kar nilüferi balı.',
    sellPrice: 730,
    edible: true,
    staminaRestore: 40,
    healthRestore: 20
  }
]

/** Trüf yağı */
const TRUFFLE_OIL_ITEM: ItemDef[] = [
  { id: 'truffle_oil', name: 'Trüf Yağı', category: 'processed', description: 'Değerli trüf yağı, yemeklerde çok kıymetlidir.', sellPrice: 680, edible: false }
]

/** Peynir eşyaları */
const CHEESE_ITEMS: ItemDef[] = [
  {
    id: 'cheese',
    name: 'Peynir',
    category: 'processed',
    description: 'İnek sütünden yapılan yoğun aromalı peynir.',
    sellPrice: 250,
    edible: true,
    staminaRestore: 50,
    healthRestore: 25
  },
  {
    id: 'goat_cheese',
    name: 'Keçi Peyniri',
    category: 'processed',
    description: 'Keçi sütünden yapılan özel aromalı peynir.',
    sellPrice: 220,
    edible: true,
    staminaRestore: 44,
    healthRestore: 22
  },
  {
    id: 'buffalo_cheese',
    name: 'Manda Peyniri',
    category: 'processed',
    description: 'Manda sütünden yapılan yoğun kıvamlı peynir.',
    sellPrice: 200,
    edible: true,
    staminaRestore: 40,
    healthRestore: 20
  },
  {
    id: 'yak_cheese',
    name: 'Yak Peyniri',
    category: 'processed',
    description: 'Yak sütünden yapılan yayla peyniri.',
    sellPrice: 280,
    edible: true,
    staminaRestore: 56,
    healthRestore: 28
  }
]

/** Kumaş eşyaları */
const CLOTH_ITEMS: ItemDef[] = [
  { id: 'cloth', name: 'Kumaş', category: 'material', description: 'Yünden dokunmuş kumaş.', sellPrice: 660, edible: false },
  { id: 'silk_cloth', name: 'İpek Kumaş', category: 'material', description: 'Gösterişli bir ipek kumaş.', sellPrice: 200, edible: false },
  { id: 'alpaca_cloth', name: 'Alpaka Yünü Kumaşı', category: 'material', description: 'Son derece yumuşak alpaka kumaşı.', sellPrice: 530, edible: false },
  { id: 'felt', name: 'Keçe', category: 'material', description: 'Tavşan tüyünden bastırılarak yapılan keçe.', sellPrice: 340, edible: false }
]

/** Metal külçe eşyaları */
const BAR_ITEMS: ItemDef[] = [
  { id: 'copper_bar', name: 'Bakır Külçesi', category: 'material', description: 'Eritilerek elde edilmiş bakır külçesi.', sellPrice: 40, edible: false },
  { id: 'iron_bar', name: 'Demir Külçesi', category: 'material', description: 'Eritilerek elde edilmiş demir külçesi.', sellPrice: 80, edible: false },
  { id: 'gold_bar', name: 'Altın Külçesi', category: 'material', description: 'Eritilerek elde edilmiş altın külçesi.', sellPrice: 160, edible: false },
  { id: 'iridium_bar', name: 'İridyum Külçesi', category: 'material', description: 'Eritilerek elde edilmiş iridyum külçesi, son derece değerlidir.', sellPrice: 700, edible: false }
]

/** Odun kömürü eşyaları */
const CHARCOAL_ITEMS: ItemDef[] = [
  { id: 'charcoal', name: 'Odun Kömürü', category: 'material', description: 'Yakılarak elde edilen odun kömürü, yakıt ve üretimde kullanılır.', sellPrice: 55, edible: false }
]

/** Un eşyaları */
const FLOUR_ITEMS: ItemDef[] = [
  { id: 'rice_flour', name: 'Pirinç Unu', category: 'material', description: 'Pirincin öğütülmesiyle elde edilen ince pirinç unu.', sellPrice: 160, edible: false },
  { id: 'wheat_flour', name: 'Buğday Unu', category: 'material', description: 'Kış buğdayından öğütülen un.', sellPrice: 130, edible: false },
  { id: 'cornmeal', name: 'Mısır Unu', category: 'material', description: 'Mısırdan öğütülen iri yapılı un.', sellPrice: 180, edible: false }
]

/** Çay içeceği eşyaları */
const TEA_DRINK_ITEMS: ItemDef[] = [
  {
    id: 'green_tea_drink',
    name: 'Yeşil Çay',
    category: 'processed',
    description: 'Hoş kokulu yeşil çay içeceği.',
    sellPrice: 620,
    edible: true,
    staminaRestore: 25,
    healthRestore: 12
  },
  {
    id: 'chrysanthemum_tea',
    name: 'Kasımpatı Çayı',
    category: 'processed',
    description: 'İç serinleten kasımpatı çayı.',
    sellPrice: 470,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  {
    id: 'osmanthus_tea',
    name: 'Osmanthus Çayı',
    category: 'processed',
    description: 'Mis gibi kokan osmanthus çayı.',
    sellPrice: 780,
    edible: true,
    staminaRestore: 30,
    healthRestore: 15
  },
  {
    id: 'ginseng_tea',
    name: 'Ginseng Çayı',
    category: 'processed',
    description: 'Bedeni güçlendiren ginseng çayı.',
    sellPrice: 300,
    edible: true,
    staminaRestore: 40,
    healthRestore: 20
  }
]

/** Tofu eşyaları */
const TOFU_ITEMS: ItemDef[] = [
  {
    id: 'tofu',
    name: 'Tofu',
    category: 'processed',
    description: 'Taze ve yumuşak tofu.',
    sellPrice: 500,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  {
    id: 'peanut_tofu',
    name: 'Fıstıklı Tofu',
    category: 'processed',
    description: 'Yoğun aromalı fıstıklı tofu.',
    sellPrice: 380,
    edible: true,
    staminaRestore: 18,
    healthRestore: 9
  },
  {
    id: 'sesame_paste',
    name: 'Susam Ezmesi',
    category: 'processed',
    description: 'Yoğun susam aromalı ezme.',
    sellPrice: 175,
    edible: true,
    staminaRestore: 15,
    healthRestore: 8
  }
]

/** Şifalı ürün eşyaları */
const HERB_PRODUCT_ITEMS: ItemDef[] = [
  {
    id: 'herbal_paste',
    name: 'Şifalı Ot Macunu',
    category: 'processed',
    description: 'Öğütülerek hazırlanmış şifalı ot macunu.',
    sellPrice: 80,
    edible: true,
    staminaRestore: 15,
    healthRestore: 10
  },
  {
    id: 'ginseng_extract',
    name: 'Ginseng Özü',
    category: 'processed',
    description: 'Yoğunlaştırılmış ginseng özü.',
    sellPrice: 400,
    edible: true,
    staminaRestore: 50,
    healthRestore: 25
  },
  {
    id: 'antler_powder',
    name: 'Boynuz Tozu',
    category: 'processed',
    description: 'Öğütülmüş geyik boynuzu tozu.',
    sellPrice: 950,
    edible: true,
    staminaRestore: 60,
    healthRestore: 30
  },
  {
    id: 'animal_medicine',
    name: 'Hayvan İlacı',
    category: 'misc',
    description: 'Hastalanan çiftlik hayvanını anında iyileştirir.',
    sellPrice: 50,
    edible: false
  },
  {
    id: 'stamina_fruit',
    name: 'Kutsal Şeftali',
    category: 'misc',
    description: 'Kadim ruhani enerji taşıyan meyve, yenince maksimum dayanıklılığı kalıcı artırır. Son derece nadirdir.',
    sellPrice: 5000,
    edible: false
  }
]

/** Özel yem eşyaları */
const FEED_ITEMS: ItemDef[] = [
  {
    id: 'premium_feed',
    name: 'Kaliteli Yem',
    category: 'material',
    description: 'Özenle hazırlanmış üstün kaliteli yem, hayvanların keyfini ve sevgisini belirgin biçimde artırır.',
    sellPrice: 40,
    edible: false
  },
  {
    id: 'nourishing_feed',
    name: 'Besleyici Yem',
    category: 'material',
    description: 'Besleyici katkılar içeren yem, hayvanların üretim döngüsünü hızlandırır.',
    sellPrice: 50,
    edible: false
  },
  {
    id: 'vitality_feed',
    name: 'Canlandırıcı Yem',
    category: 'material',
    description: 'Şifalı bitki özleri içeren yem, yedirildiğinde hastalığı kesin olarak iyileştirir.',
    sellPrice: 60,
    edible: false
  }
]

/** Tütsü eşyaları */
const INCENSE_ITEMS: ItemDef[] = [
  { id: 'pine_incense', name: 'Çam Tütsüsü', category: 'gift', description: 'Taze kokulu çam tütsüsü, güzel bir hediye olur.', sellPrice: 100, edible: false },
  { id: 'camphor_incense', name: 'Kafur Tütsüsü', category: 'gift', description: 'Zihni açan kafur tütsüsü.', sellPrice: 150, edible: false },
  { id: 'osmanthus_incense', name: 'Osmanthus Tütsüsü', category: 'gift', description: 'Yoğun kokulu osmanthus tütsüsü.', sellPrice: 780, edible: false }
]

/** Silah koleksiyonu eşyaları */
const WEAPON_ITEMS: ItemDef[] = Object.values(WEAPONS).map(w => ({
  id: w.id,
  name: w.name,
  category: 'weapon' as const,
  description: w.description,
  sellPrice: getWeaponSellPrice(w.id, null),
  edible: false
}))

/** Yüzük koleksiyonu eşyaları */
const RING_ITEMS: ItemDef[] = RINGS.map(r => ({
  id: r.id,
  name: r.name,
  category: 'ring' as const,
  description: r.description,
  sellPrice: r.sellPrice,
  edible: false
}))

/** Şapka koleksiyonu eşyaları */
const HAT_ITEMS: ItemDef[] = HATS.map(h => ({
  id: h.id,
  name: h.name,
  category: 'hat' as const,
  description: h.description,
  sellPrice: h.sellPrice,
  edible: false
}))

/** Ayakkabı koleksiyonu eşyaları */
const SHOE_ITEMS: ItemDef[] = SHOES.map(s => ({
  id: s.id,
  name: s.name,
  category: 'shoe' as const,
  description: s.description,
  sellPrice: s.sellPrice,
  edible: false
}))

/** Tüm eşya tanımları */
export const ITEMS: ItemDef[] = [
  ...SEED_ITEMS,
  ...CROP_ITEMS,
  ...ORE_ITEMS,
  ...MISC_ITEMS,
  ...FISH_ITEMS,
  ...FOOD_ITEMS,
  ...PROCESSED_ITEMS,
  ...SMOKED_ITEMS,
  ...DRIED_ITEMS,
  ...MACHINE_ITEMS,
  ...SPRINKLER_ITEMS,
  ...FERTILIZER_ITEMS,
  ...BAIT_ITEMS,
  ...TACKLE_ITEMS,
  ...ANIMAL_PRODUCT_ITEMS,
  ...FRUIT_TREE_ITEMS,
  ...SAPLING_ITEMS,
  ...WILD_TREE_ITEMS,
  ...BOMB_ITEMS,
  ...CRAB_POT_ITEMS,
  ...TRUFFLE_OIL_ITEM,
  ...FLOWER_HONEY_ITEMS,
  ...CHEESE_ITEMS,
  ...CLOTH_ITEMS,
  ...BAR_ITEMS,
  ...CHARCOAL_ITEMS,
  ...FLOUR_ITEMS,
  ...TEA_DRINK_ITEMS,
  ...TOFU_ITEMS,
  ...HERB_PRODUCT_ITEMS,
  ...FEED_ITEMS,
  ...INCENSE_ITEMS,

  // Ekipman koleksiyonu
  ...WEAPON_ITEMS,
  ...RING_ITEMS,
  ...HAT_ITEMS,
  ...SHOE_ITEMS,

  // Altın arama ürünleri
  { id: 'gold_nugget', name: 'Altın Kırıntısı', category: 'misc', description: 'Nehirden çıkarılmış, ışıl ışıl parlayan altın tanesi.', sellPrice: 80, edible: false },

  // ===== Fosiller (8) =====
  { id: 'trilobite_fossil', name: 'Trilobit Fosili', category: 'fossil', description: 'Kadim deniz canlısının fosili.', sellPrice: 120, edible: false },
  { id: 'amber', name: 'Kehribar', category: 'fossil', description: 'Binlerce yılda donmuş reçine fosili.', sellPrice: 150, edible: false },
  { id: 'ammonite_fossil', name: 'Ammonit Fosili', category: 'fossil', description: 'Sarmal biçimli kadim deniz fosili.', sellPrice: 180, edible: false },
  { id: 'fern_fossil', name: 'Eğrelti Fosili', category: 'fossil', description: 'İyi korunmuş kadim eğrelti fosili.', sellPrice: 100, edible: false },
  { id: 'shell_fossil', name: 'Kabuk Fosili', category: 'fossil', description: 'Kadim yumuşakça kabuğu fosili.', sellPrice: 90, edible: false },
  { id: 'bone_fragment', name: 'Kemik Parçası', category: 'fossil', description: 'Kim olduğu bilinmeyen kadim bir canlının kemik parçası.', sellPrice: 200, edible: false },
  { id: 'petrified_wood', name: 'Taşlaşmış Odun', category: 'fossil', description: 'Minerallerle yer değiştirmiş kadim odun.', sellPrice: 130, edible: false },
  { id: 'dragon_tooth', name: 'Ejder Dişi Fosili', category: 'fossil', description: 'Efsanelerde geçen ejder soyundan kalma diş fosili.', sellPrice: 350, edible: false },

  // ===== Antik eşyalar (10) =====
  { id: 'ancient_pottery', name: 'Antik Çömlek Parçası', category: 'artifact', description: 'Kadim uygarlıktan kalma çömlek kırığı.', sellPrice: 100, edible: false },
  { id: 'jade_disc', name: 'Yeşim Disk Parçası', category: 'artifact', description: 'İnce işlenmiş kadim yeşim disk kırığı.', sellPrice: 250, edible: false },
  { id: 'bronze_mirror', name: 'Bronz Ayna', category: 'artifact', description: 'İyi işlenmiş kadim bronz ayna.', sellPrice: 200, edible: false },
  { id: 'ancient_coin', name: 'Antik Bakır Para', category: 'artifact', description: 'Hangi hanedana ait olduğu bilinmeyen eski bakır para.', sellPrice: 150, edible: false },
  { id: 'oracle_bone', name: 'Kehanet Kemiği Parçası', category: 'artifact', description: 'Üzerine kehanet yazıları oyulmuş kadim kemik.', sellPrice: 300, edible: false },
  { id: 'jade_pendant', name: 'Yeşim Kolye', category: 'artifact', description: 'Kadim çağlardan kalma yumuşak dokulu yeşim süs eşyası.', sellPrice: 220, edible: false },
  {
    id: 'ancient_seed',
    name: 'Kadim Tohum',
    category: 'artifact',
    description: 'Kadim yaşam gücü taşıyan gizemli tohum, söylentiye göre kadim meyve yetiştirir.',
    sellPrice: 400,
    edible: false
  },
  { id: 'bamboo_scroll', name: 'Bambu Parşömen', category: 'artifact', description: 'Üzerinde eski yazılar bulunan bambu tomar parçası.', sellPrice: 180, edible: false },
  { id: 'stone_axe_head', name: 'Taş Balta Başı', category: 'artifact', description: 'Kadim insanların kullandığı taş balta başı.', sellPrice: 120, edible: false },
  { id: 'painted_pottery', name: 'Boyalı Çömlek Parçası', category: 'artifact', description: 'Üzerinde güzel desenler bulunan boyalı çömlek parçası.', sellPrice: 200, edible: false },

  // ===== Lonca dükkânı eşyaları =====
  {
    id: 'combat_tonic',
    name: 'Savaş İksiri',
    category: 'food',
    description: '30 HP yeniler.',
    sellPrice: 100,
    edible: true,
    staminaRestore: 0,
    healthRestore: 30
  },
  {
    id: 'fortify_brew',
    name: 'Güçlendirme İksiri',
    category: 'food',
    description: '60 HP yeniler.',
    sellPrice: 250,
    edible: true,
    staminaRestore: 0,
    healthRestore: 60
  },
  {
    id: 'ironhide_potion',
    name: 'Demir Deri İksiri',
    category: 'food',
    description: 'Tüm HP’yi yeniler.',
    sellPrice: 400,
    edible: true,
    staminaRestore: 0,
    healthRestore: 999
  },
  { id: 'slayer_charm', name: 'Avcı Tılsımı', category: 'misc', description: 'Canavar eşya düşürme oranı +%20 (yalnızca bu keşifte).', sellPrice: 750, edible: false },
  {
    id: 'warriors_feast',
    name: 'Savaşçı Sofrası',
    category: 'food',
    description: '50 dayanıklılık ve 50 HP yeniler.',
    sellPrice: 500,
    edible: true,
    staminaRestore: 50,
    healthRestore: 50
  },
  { id: 'monster_lure', name: 'Canavar Yemi', category: 'misc', description: 'Bu kattaki canavar sayısını ikiye katlar.', sellPrice: 1000, edible: false },
  { id: 'guild_badge', name: 'Lonca Rozeti', category: 'misc', description: 'Saldırı gücü kalıcı olarak +3.', sellPrice: 0, edible: false },
  { id: 'life_talisman', name: 'Yaşam Tılsımı', category: 'misc', description: 'Maksimum can kalıcı olarak +15.', sellPrice: 0, edible: false },
  { id: 'defense_charm', name: 'Koruma Tılsımı', category: 'misc', description: 'Savunma kalıcı olarak +%3.', sellPrice: 0, edible: false },
  {
    id: 'adventurer_ration',
    name: 'Maceracı Kumanyası',
    category: 'food',
    description: '25 dayanıklılık ve 25 HP yeniler.',
    sellPrice: 175,
    edible: true,
    staminaRestore: 25,
    healthRestore: 25
  },
  {
    id: 'stamina_elixir',
    name: 'Dayanıklılık İksiri',
    category: 'food',
    description: '120 dayanıklılık yeniler.',
    sellPrice: 300,
    edible: true,
    staminaRestore: 120,
    healthRestore: 0
  },
  { id: 'lucky_coin', name: 'Şans Parası', category: 'misc', description: 'Canavar eşya düşürme oranı kalıcı olarak +%5.', sellPrice: 0, edible: false },

  // ===== Hanhai eşyaları =====
  {
    id: 'hanhai_cactus_seed',
    name: 'Kaktüs Tohumu',
    category: 'seed',
    description: 'Batı diyarından gelen ilginç bitki tohumu, yazın ekilebilir.',
    sellPrice: 250,
    edible: false
  },
  {
    id: 'hanhai_date_seed',
    name: 'Hurma Tohumu',
    category: 'seed',
    description: 'İpek Yolu’yla gelen çöl meyvesi tohumu, yaz/sonbahar mevsiminde ekilebilir.',
    sellPrice: 200,
    edible: false
  },
  { id: 'hanhai_spice', name: 'Batı Diyarı Baharatı', category: 'material', description: 'Egzotik kokulu baharat, yemeklerde çok işe yarar.', sellPrice: 150, edible: false },
  { id: 'hanhai_silk', name: 'İpek', category: 'material', description: 'İnce ve pürüzsüz kaliteli ipek.', sellPrice: 400, edible: false },
  { id: 'hanhai_turquoise', name: 'Firuze', category: 'gem', description: 'Batı diyarına özgü değerli taş.', sellPrice: 300, edible: false },
  { id: 'hanhai_map', name: 'Define Haritası', category: 'misc', description: 'Çorak arazide bir yerde gömülü hazineyi işaretleyen harita.', sellPrice: 500, edible: false },
  {
    id: 'mega_bomb_recipe',
    name: 'Dev Bomba Tarifi',
    category: 'misc',
    description: 'Söylentiye göre tüm maden katını patlatabilecek gizli formül.',
    sellPrice: 2500,
    edible: false
  },

  // ==================== Ruhani eşya grubu ====================
  // Keşif ipuçları
  {
    id: 'fox_bead',
    name: 'Tilki İncisi',
    category: 'misc',
    description: 'Madenin derinliklerinde bulunan kızıl renkli inci, sanki canlıymış gibi sıcaktır.',
    sellPrice: 500,
    edible: false
  },

  // Gönül bağı kurma eşyaları
  {
    id: 'dragon_scale_charm',
    name: 'Ejder Pulu Tılsımı',
    category: 'misc',
    description: 'Ejder yeşiminden oyulmuş pul biçimli süs, derinliklerin gücünü taşır.',
    sellPrice: 0,
    edible: false
  },
  { id: 'blossom_crown', name: 'Çiçek Ruhu Tacı', category: 'misc', description: 'Hiç solmayan şeftali çiçeklerinden örülmüş taç.', sellPrice: 0, edible: false },
  { id: 'jade_mortar', name: 'Yeşim Havan Eli', category: 'misc', description: 'Aytaşından oyulmuş ilaç havanı, ay tavşanının havanıyla eş olur.', sellPrice: 0, edible: false },
  { id: 'fox_flame_lantern', name: 'Tilki Ateşi Feneri', category: 'misc', description: 'İçinde tilki ateşi taşıyan, hiç sönmeyen fener.', sellPrice: 0, edible: false },
  {
    id: 'cultivation_jade',
    name: 'Yetişim Yeşim Kolyesi',
    category: 'misc',
    description: 'Ruhani güç taşıyan yeşim kolye, bir müridin simgesidir.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'silver_thread_ring',
    name: 'Gümüş İplik Yüzük',
    category: 'misc',
    description: 'Ay ışığı kadar ince gümüş tellerden örülmüş yüzük, yuvaya dönüş özlemini taşır.',
    sellPrice: 0,
    edible: false
  },

  // Ruh bağı eşyaları
  {
    id: 'dragon_pearl',
    name: 'Ejder İncisi',
    category: 'misc',
    description: 'Ejder yeşimi, aytaşı ve prizmatik parçadan dövülmüş ruhani inci; ejder soyunun en yüce bağ nişanesidir.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'eternal_blossom',
    name: 'Solmayan Çiçek',
    category: 'misc',
    description: 'En özel şeftali, bal ve osmanthus ile yoğrulmuş, asla solmayan ruh çiçeği.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'moon_elixir',
    name: 'Ay Işığı İksiri',
    category: 'misc',
    description: 'Ginseng, kar nilüferi ve aytaşından yapılmış kutsal iksir, yumuşak gümüşî bir parıltı yayar.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'fox_spirit_bead',
    name: 'Ruh Tilkisi İncisi',
    category: 'misc',
    description: 'Yakut, aytaşı ve altından yapılmış inci; tilki ruhunun bir parça kudretini mühürler.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'immortal_gourd',
    name: 'Ölümsüz Kabak Şişesi',
    category: 'misc',
    description: 'Ginseng, geyik boynuzu ve iridyumdan yapılmış kutsal kap; içinde beş yüz yıllık yetişim gücü taşır.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'starlight_loom',
    name: 'Yıldız Işığı Dokuma Tezgâhı',
    category: 'misc',
    description: 'İpek, aytaşı ve prizmatik parçayla örülmüş minik tezgâh; yıldız ışığı gibi iplikler dokuyabilir.',
    sellPrice: 0,
    edible: false
  },

  // Yetenek üretimi eşyaları
  {
    id: 'spirit_peach',
    name: 'Ruh Şeftalisi',
    category: 'misc',
    description: 'Şeftali ruhunun kutsadığı büyülü şeftali, ruhani enerji yayar.',
    sellPrice: 800,
    edible: true,
    staminaRestore: 50,
    healthRestore: 30
  },
  { id: 'moon_herb', name: 'Ay Otu', category: 'material', description: 'Ay ışığıyla büyüyen ruhani ot, ilaç etkisi son derece güçlüdür.', sellPrice: 300, edible: false },
  { id: 'dream_silk', name: 'Rüya İpeği', category: 'material', description: 'Dönüş ruhunun dokuduğu gümüş beyaz iplik, yıldız ışığı gibi parlar.', sellPrice: 500, edible: false }
]

/** ID ile eşya arar */
export const getItemById = (id: string): ItemDef | undefined => {
  return ITEMS.find(i => i.id === id)
}

/** Eşya kategorilerinin varsayılan kaynakları */
const CATEGORY_SOURCE: Record<ItemCategory, string> = {
  seed: 'dükkândan satın alınır',
  crop: 'ekip hasat edilir',
  fish: 'balık tutarak elde edilir',
  ore: 'madenden toplanır',
  gem: 'madenden toplanır',
  material: 'toplama / üretim',
  food: 'yemek yapımı',
  processed: 'işleme üretimi',
  machine: 'üretimle yapılır',
  sprinkler: 'üretimle yapılır',
  fertilizer: 'üretimle yapılır',
  bait: 'dükkândan satın alınır',
  tackle: 'dükkândan satın alınır',
  animal_product: 'hayvancılık ürünü',
  fruit: 'meyve ağacından hasat edilir',
  sapling: 'dükkândan satın alınır',
  bomb: 'üretimle yapılır',
  gift: 'toplama / dükkân',
  fossil: 'madende kazılır',
  artifact: 'madende kazılır',
  weapon: 'dükkân / düşme',
  ring: 'dükkân / üretim',
  hat: 'dükkân / üretim',
  shoe: 'demircide üretilir',
  misc: 'çeşitli yollarla'
}

/** Belirli eşyalar için kaynak açıklaması geçersiz kılmaları */
const ITEM_SOURCE_OVERRIDES: Record<string, string> = {
  // Malzeme türü
  wood: 'ağaç keserek elde edilir',
  bamboo: 'bambu keserek elde edilir',
  herb: 'dağlarda toplanır',
  firewood: 'ağaç keserek elde edilir',
  pine_cone: 'ağaç kesince düşer',
  battery: 'yıldırım çekici (fırtınalı havada)',
  copper_bar: 'ergitme ocağında eritilir',
  iron_bar: 'ergitme ocağında eritilir',
  gold_bar: 'ergitme ocağında eritilir',
  iridium_bar: 'ergitme ocağında eritilir',
  charcoal: 'kömür ocağında yakılır',
  rice_flour: 'taş değirmende işlenir',
  wheat_flour: 'taş değirmende işlenir',
  cornmeal: 'taş değirmende işlenir',
  cloth: 'dokuma tezgâhında işlenir',
  silk_cloth: 'dokuma tezgâhında işlenir',
  alpaca_cloth: 'dokuma tezgâhında işlenir',
  felt: 'dokuma tezgâhında işlenir',
  fish_feed: 'dükkândan satın alınır',
  water_purifier: 'dükkândan satın alınır',
  // Toplama türü
  wild_mushroom: 'maden mantar katı / sonbaharda toplanır',
  winter_bamboo_shoot: 'kışın toplanır',
  ginseng: 'sonbaharda toplanır',
  wild_berry: 'yazın toplanır',
  camphor_seed: 'yabani ağaçlardan düşer',
  mulberry: 'dut ağacından hasat edilir',
  pine_resin: 'reçine toplayıcı ile alınır',
  // Yabani ağaç bağlantılı
  tapper: 'üretimle yapılır',
  lightning_rod: 'üretimle yapılır',
  // Makineler
  scarecrow: 'üretimle yapılır',
  crab_pot: 'üretimle yapılır',
  // Yengeç kapanı yakalamaları
  snail: 'yengeç kapanından çıkar',
  freshwater_shrimp: 'yengeç kapanından çıkar',
  crab: 'yengeç kapanından çıkar',
  lobster: 'yengeç kapanından çıkar',
  cave_shrimp: 'yengeç kapanından çıkar',
  swamp_crab: 'yengeç kapanından çıkar',
  trash: 'yengeç kapanından çıkar',
  driftwood: 'yengeç kapanından çıkar',
  broken_cd: 'yengeç kapanından çıkar',
  soggy_newspaper: 'yengeç kapanından çıkar',
  // Bal
  chrysanthemum_honey: 'arı kovanından elde edilir',
  osmanthus_honey: 'arı kovanından elde edilir',
  rapeseed_honey: 'arı kovanından elde edilir',
  snow_lotus_honey: 'arı kovanından elde edilir',
  // Peynir
  cheese: 'peynir makinesinde işlenir',
  goat_cheese: 'peynir makinesinde işlenir',
  buffalo_cheese: 'peynir makinesinde işlenir',
  yak_cheese: 'peynir makinesinde işlenir',
  // Trüf yağı
  truffle_oil: 'yağ presinde işlenir',
  // Tofu
  tofu: 'taş değirmende işlenir',
  peanut_tofu: 'taş değirmende işlenir',
  sesame_paste: 'taş değirmende işlenir',
  // Çay içecekleri
  green_tea_drink: 'işlenerek üretilir',
  chrysanthemum_tea: 'işlenerek üretilir',
  ginseng_tea: 'işlenerek üretilir',
  // Hediyeler
  jade_ring: 'dükkândan satın alınır',
  silk_ribbon: 'dükkândan satın alınır',
  zhiji_jade: 'dükkândan satın alınır',
  wintersweet: 'kışın toplanır',
  pine_incense: 'üretimle yapılır',
  camphor_incense: 'üretimle yapılır',
  osmanthus_incense: 'üretimle yapılır',
  // Çeşitli
  rain_totem: 'üretimle yapılır',
  gold_nugget: 'nehirde altın arayarak bulunur',
  // Lonca dükkânı
  combat_tonic: 'Maceracılar Loncası',
  fortify_brew: 'Maceracılar Loncası',
  ironhide_potion: 'Maceracılar Loncası',
  warriors_feast: 'Maceracılar Loncası',
  slayer_charm: 'Maceracılar Loncası',
  monster_lure: 'Maceracılar Loncası',
  guild_badge: 'Maceracılar Loncası',
  life_talisman: 'Maceracılar Loncası',
  defense_charm: 'Maceracılar Loncası',
  lucky_coin: 'Maceracılar Loncası',
  adventurer_ration: 'Maceracılar Loncası',
  stamina_elixir: 'Maceracılar Loncası',
  // Hanhai eşyaları
  hanhai_cactus_seed: 'Hanhai çöl tüccarı',
  hanhai_date_seed: 'Hanhai çöl tüccarı',
  hanhai_spice: 'Hanhai çöl tüccarı',
  hanhai_silk: 'Hanhai çöl tüccarı',
  hanhai_turquoise: 'Hanhai çöl tüccarı',
  hanhai_map: 'Hanhai Çölü',
  hanhai_fossil: 'Hanhai Çölü',
  mega_bomb_recipe: 'Hanhai Çölü',
  // Kadim tohum
  ancient_seed: 'madende kazılır (ekilebilir)',
  // Şifalı işlenmiş ürünler
  herbal_paste: 'işlenerek üretilir',
  ginseng_extract: 'işlenerek üretilir',
  antler_powder: 'işlenerek üretilir',
  stamina_fruit: 'uçurum sandığı (çok nadir) / üretim',
  // Ruhani bağlantılı eşyalar
  fox_bead: 'maden derinliği (tilki ruhu keşif ipucu)',
  spirit_peach: 'ruh bağı yeteneği · ruh şeftalisi (Taoyao)',
  moon_herb: 'ruh bağı yeteneği · ay ışığı otu (Ay Tavşanı)',
  dream_silk: 'ruh bağı yeteneği · rüya dokuması (Dönüş Ruhu)',
  dragon_scale_charm: 'üretim (ejder ruhu gönül nişanesi)',
  blossom_crown: 'üretim (Taoyao gönül nişanesi)',
  jade_mortar: 'üretim (Ay Tavşanı gönül nişanesi)',
  fox_flame_lantern: 'üretim (Tilki Ruhu gönül nişanesi)',
  cultivation_jade: 'üretim (Dağ İhtiyarı gönül nişanesi)',
  silver_thread_ring: 'üretim (Dönüş Ruhu gönül nişanesi)',
  dragon_pearl: 'üretim (ejder ruhu bağ nişanesi)',
  eternal_blossom: 'üretim (Taoyao bağ nişanesi)',
  moon_elixir: 'üretim (Ay Tavşanı bağ nişanesi)',
  fox_spirit_bead: 'üretim (Tilki Ruhu bağ nişanesi)',
  immortal_gourd: 'üretim (Dağ İhtiyarı bağ nişanesi)',
  starlight_loom: 'üretim (Dönüş Ruhu bağ nişanesi)'
}

/** Eşyanın kaynak açıklamasını al */
export const getItemSource = (itemId: string): string => {
  const override = ITEM_SOURCE_OVERRIDES[itemId]
  if (override) return override
  const def = getItemById(itemId)
  if (!def) return 'Bilinmiyor'
  return CATEGORY_SOURCE[def.category]
}

/** Sandık kademeleri tanımı */
import type { ChestTier } from '@/types'

export const CHEST_DEFS: Record<
  ChestTier,
  {
    name: string
    capacity: number
    craftCost: { itemId: string; quantity: number }[]
    craftMoney: number
    description: string
  }
> = {
  wood: {
    name: 'Tahta Sandık',
    capacity: 9,
    craftCost: [{ itemId: 'wood', quantity: 50 }],
    craftMoney: 500,
    description: 'Temel depolama sandığı, 9 eşya yuvası vardır.'
  },
  copper: {
    name: 'Bakır Sandık',
    capacity: 18,
    craftCost: [{ itemId: 'copper_bar', quantity: 15 }],
    craftMoney: 2000,
    description: 'Dayanıklı bakır sandık, 18 eşya yuvası vardır.'
  },
  iron: {
    name: 'Demir Sandık',
    capacity: 27,
    craftCost: [
      { itemId: 'iron_bar', quantity: 10 },
      { itemId: 'wood', quantity: 20 }
    ],
    craftMoney: 5000,
    description: 'Sağlam demir sandık, 27 eşya yuvası vardır.'
  },
  gold: {
    name: 'Altın Sandık',
    capacity: 36,
    craftCost: [
      { itemId: 'gold_bar', quantity: 8 },
      { itemId: 'iron_bar', quantity: 5 }
    ],
    craftMoney: 10000,
    description: 'Gösterişli altın sandık, 36 eşya yuvası vardır.'
  },
  void: {
    name: 'Boşluk Sandığı',
    capacity: 27,
    craftCost: [
      { itemId: 'iridium_bar', quantity: 5 },
      { itemId: 'void_ore', quantity: 20 }
    ],
    craftMoney: 25000,
    description: 'Uzaktan erişim sağlar ve atölye için hammadde / ürün sandığı olarak ayarlanabilir. Kapasite 27 yuva.'
  }
}

/** Sandık kademe sırası */
export const CHEST_TIER_ORDER: ChestTier[] = ['wood', 'copper', 'iron', 'gold', 'void']
