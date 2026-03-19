import type { ShoeDef } from '@/types'

/** Tüm ayakkabı tanımları */
export const SHOES: ShoeDef[] = [
  // ===== Seviye 1: Temel modeller (İpek Mağazası’ndan satın alınır) =====
  {
    id: 'straw_sandals',
    name: 'Hasır Sandalet',
    description: 'Sade hasırdan örülmüş ayakkabı, dayanıklılık tüketimini azaltır.',
    effects: [{ type: 'stamina_reduction', value: 0.05 }],
    shopPrice: 200,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'İpek Mağazası',
    sellPrice: 80
  },
  {
    id: 'cloth_shoes',
    name: 'Kumaş Ayakkabı',
    description: 'Rahat kumaş ayakkabı, tarım işlerini daha kolay hale getirir.',
    effects: [{ type: 'farming_stamina', value: 0.08 }],
    shopPrice: 300,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'İpek Mağazası',
    sellPrice: 120
  },

  // ===== Seviye 2: Orta seviye modeller (İpek Mağazası’ndan satın alınır) =====
  {
    id: 'leather_boots',
    name: 'Deri Çizme',
    description: 'Sağlam deri çizme, yürümeyi hızlandırır.',
    effects: [{ type: 'travel_speed', value: 0.15 }],
    shopPrice: 800,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'İpek Mağazası',
    sellPrice: 320
  },
  {
    id: 'miner_boots',
    name: 'Madenci Çizmesi',
    description: 'Kalın tabanlı ve demir uçlu çizme, maden keşfini daha güvenli hale getirir.',
    effects: [
      { type: 'mining_stamina', value: 0.1 },
      { type: 'defense_bonus', value: 0.05 }
    ],
    shopPrice: 1000,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'İpek Mağazası',
    sellPrice: 400
  },

  // ===== Seviye 3: Gelişmiş modeller (Demircide üretilebilir) =====
  {
    id: 'gale_boots',
    name: 'Fırtına Çizmeleri',
    description: 'Rüzgâr kadar hafif deri çizmeler, yolculuk süresini büyük ölçüde kısaltır.',
    effects: [
      { type: 'travel_speed', value: 0.25 },
      { type: 'stamina_reduction', value: 0.08 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'iron_bar', quantity: 5 },
      { itemId: 'rabbit_foot', quantity: 1 }
    ],
    recipeMoney: 2000,
    obtainSource: 'Demircide üretim',
    sellPrice: 1000
  },
  {
    id: 'iron_greaves',
    name: 'Demir Zırh Çizmesi',
    description: 'Ağır demir zırhlı tozluklar, yüksek savunma sağlar.',
    effects: [
      { type: 'defense_bonus', value: 0.12 },
      { type: 'max_hp_bonus', value: 10 }
    ],
    shopPrice: null,
    recipe: [{ itemId: 'iron_bar', quantity: 8 }],
    recipeMoney: 1500,
    obtainSource: 'Demircide üretim',
    sellPrice: 750
  },
  {
    id: 'silk_slippers',
    name: 'İpek İşlemeli Ayakkabı',
    description: 'Zarif ipek işlemeli ayakkabılar, kır yürüyüşü ve bitki toplamayı kolaylaştırır.',
    effects: [
      { type: 'farming_stamina', value: 0.08 },
      { type: 'crop_quality_bonus', value: 0.04 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'silk_cloth', quantity: 3 },
      { itemId: 'herb', quantity: 5 }
    ],
    recipeMoney: 800,
    obtainSource: 'Demircide üretim',
    sellPrice: 400
  },
  {
    id: 'merchant_boots',
    name: 'Tüccar Çizmeleri',
    description: 'Gezgin tüccarların sık giydiği deri çizmeler, hem hızlı yürütür hem alışverişte indirim sağlar.',
    effects: [
      { type: 'travel_speed', value: 0.18 },
      { type: 'shop_discount', value: 0.05 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'silk_cloth', quantity: 1 }
    ],
    recipeMoney: 2500,
    obtainSource: 'Demircide üretim',
    sellPrice: 1200
  },

  // ===== Seviye 4: Üst düzey modeller (Demircide üretilebilir) =====
  {
    id: 'moon_step_boots',
    name: 'Ay Adımı Çizmeleri',
    description: 'Aytaşıyla süslenmiş çevik çizmeler, adımları uçurur.',
    effects: [
      { type: 'travel_speed', value: 0.3 },
      { type: 'luck', value: 0.08 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 5 },
      { itemId: 'moonstone', quantity: 2 }
    ],
    recipeMoney: 4000,
    obtainSource: 'Demircide üretim',
    sellPrice: 2000
  },
  {
    id: 'dragon_scale_boots',
    name: 'Ejder Pulu Çizmeleri',
    description: 'Ejder pullarından yapılmış savaş çizmeleri; saldırı, savunma ve hız sağlar.',
    effects: [
      { type: 'defense_bonus', value: 0.1 },
      { type: 'attack_bonus', value: 3 },
      { type: 'travel_speed', value: 0.2 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'iridium_bar', quantity: 3 },
      { itemId: 'dragon_jade', quantity: 1 }
    ],
    recipeMoney: 8000,
    obtainSource: 'Demircide üretim',
    sellPrice: 4000
  },

  // ===== Canavar düşürür =====
  {
    id: 'frost_treads',
    name: 'Ayaz Çizmeleri',
    description: 'Buz katmanı canavarlarının geride bıraktığı donmuş tozluklar, adımları daha sağlam kılar.',
    effects: [
      { type: 'travel_speed', value: 0.08 },
      { type: 'defense_bonus', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Buz katmanı canavar düşürmesi',
    sellPrice: 150
  },
  {
    id: 'shadow_striders',
    name: 'Gölge Yürüyüşçüleri',
    description: 'Gölge katmanı canavarlarının karanlık enerjisinden oluşur, sessiz ve hızlı hareket sağlar.',
    effects: [
      { type: 'travel_speed', value: 0.18 },
      { type: 'monster_drop_bonus', value: 0.06 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Gölge katmanı canavar düşürmesi',
    sellPrice: 1000
  },
  {
    id: 'void_treads',
    name: 'Boşluk Savaş Çizmeleri',
    description: 'Uçurum kemik ejderinin kemiklerinden dövülmüş, yıkıcı güç barındıran savaş çizmeleri.',
    effects: [
      { type: 'attack_bonus', value: 3 },
      { type: 'defense_bonus', value: 0.08 },
      { type: 'travel_speed', value: 0.15 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Uçurum katmanı canavar düşürmesi',
    sellPrice: 1800
  },

  // ===== BOSS düşürür =====
  {
    id: 'lava_lord_greaves',
    name: 'Lav Zırh Çizmeleri',
    description: 'Lav lordunun kalan sıcaklığından oluşmuş, dayanıklı ve yakıcı zırh çizmeleri.',
    effects: [
      { type: 'defense_bonus', value: 0.1 },
      { type: 'attack_bonus', value: 2 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: '60. kat BOSS ilk zafer',
    sellPrice: 800
  },
  {
    id: 'shadow_sovereign_treads',
    name: 'Karanlık Kralın Çizmeleri',
    description: 'Gölge hükümdarının yadigârı; karanlık enerji bilekleri sarar, adımları rüzgâr gibi yapar.',
    effects: [
      { type: 'travel_speed', value: 0.22 },
      { type: 'defense_bonus', value: 0.08 },
      { type: 'vampiric', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: '100. kat BOSS ilk zafer',
    sellPrice: 1500
  },

  // ===== Hazine sandığı düşürür =====
  {
    id: 'fortune_slippers',
    name: 'Şans Terlikleri',
    description: 'Hazine sandığında bulunan yumuşak terlikler, iyi şans getiriyor gibi görünüyor.',
    effects: [
      { type: 'sell_price_bonus', value: 0.04 },
      { type: 'luck', value: 0.03 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Maden hazine sandığı',
    sellPrice: 300
  },

  // ===== Yeni mağaza ayakkabıları (İpek Mağazası) =====
  {
    id: 'cotton_shoes',
    name: 'Pamuklu Ayakkabı',
    description: 'Yumuşak ve sıcak tutan pamuklu ayakkabılar, günlük dayanıklılık tüketimini azaltır.',
    effects: [
      { type: 'stamina_reduction', value: 0.04 },
      { type: 'farming_stamina', value: 0.04 }
    ],
    shopPrice: 400,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'İpek Mağazası',
    sellPrice: 160
  },
  {
    id: 'fishing_waders',
    name: 'Balıkçı Çizmeleri',
    description: 'Su geçirmez uzun çizmeler, balık tutarken daha rahat olmanı sağlar.',
    effects: [
      { type: 'fishing_stamina', value: 0.1 },
      { type: 'fishing_calm', value: 0.03 }
    ],
    shopPrice: 700,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'İpek Mağazası',
    sellPrice: 280
  },
  {
    id: 'jade_slippers',
    name: 'Yeşim Tabanlı Ayakkabı',
    description: 'Yeşim taşlı işlemeli ayakkabılar, satış fiyatını artırır ve hediye dostluğunu yükseltir.',
    effects: [
      { type: 'sell_price_bonus', value: 0.04 },
      { type: 'gift_friendship', value: 0.06 }
    ],
    shopPrice: 1200,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'İpek Mağazası',
    sellPrice: 480
  },

  // ===== Yeni üretilebilir ayakkabılar (Demirci) =====
  {
    id: 'obsidian_greaves',
    name: 'Obsidyen Zırh Çizmeleri',
    description: 'Obsidyenden dövülmüş ağır zırh çizmeleri, son derece yüksek savunma sağlar.',
    effects: [
      { type: 'defense_bonus', value: 0.15 },
      { type: 'max_hp_bonus', value: 15 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'obsidian', quantity: 2 },
      { itemId: 'iron_bar', quantity: 5 }
    ],
    recipeMoney: 3000,
    obtainSource: 'Demircide üretim',
    sellPrice: 1500
  },
  {
    id: 'wind_walker',
    name: 'Rüzgâr Yürüyüşçüsü',
    description: 'Aytaşının verdiği hafiflik, seyahat hızını büyük ölçüde artırır.',
    effects: [
      { type: 'travel_speed', value: 0.22 },
      { type: 'stamina_reduction', value: 0.06 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'moonstone', quantity: 1 }
    ],
    recipeMoney: 2500,
    obtainSource: 'Demircide üretim',
    sellPrice: 1200
  },
  {
    id: 'phoenix_boots',
    name: 'Anka Çizmeleri',
    description: 'Ejder yeşimi ve altından yapılmış gösterişli çizmeler; şans ve deneyim artışı sağlar.',
    effects: [
      { type: 'luck', value: 0.06 },
      { type: 'exp_bonus', value: 0.08 }
    ],
    shopPrice: null,
    recipe: [
      { itemId: 'gold_bar', quantity: 5 },
      { itemId: 'dragon_jade', quantity: 1 }
    ],
    recipeMoney: 5000,
    obtainSource: 'Demircide üretim',
    sellPrice: 2500
  },

  // ===== Yeni BOSS düşürme ayakkabıları =====
  {
    id: 'frost_queen_slippers',
    name: 'Buz Kraliçesi Dans Ayakkabıları',
    description: 'Buz kraliçesinin yadigârı; giyildiğinde adımlar buz üstünde dans eder gibi hafifleşir.',
    effects: [
      { type: 'travel_speed', value: 0.12 },
      { type: 'fishing_calm', value: 0.06 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: '40. kat BOSS ilk zafer',
    sellPrice: 500
  },
  {
    id: 'abyss_dragon_treads',
    name: 'Ejder Kral Savaş Çizmeleri',
    description: 'Uçurum ejder kralının pullarından dövülmüş üstün savaş çizmeleri; hız, saldırı ve savunmayı birlikte artırır.',
    effects: [
      { type: 'travel_speed', value: 0.25 },
      { type: 'attack_bonus', value: 5 },
      { type: 'defense_bonus', value: 0.1 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: '120. kat BOSS ilk zafer',
    sellPrice: 5000
  },

  // ===== Yeni canavar düşürme ayakkabıları =====
  {
    id: 'crystal_treads',
    name: 'Kristal Maden Çizmeleri',
    description: 'Kristal katmanı canavarlarının parçalarından oluşan madenci çizmeleri, maden verimini artırır.',
    effects: [
      { type: 'ore_bonus', value: 1 },
      { type: 'mining_stamina', value: 0.06 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Kristal katmanı canavar düşürmesi',
    sellPrice: 800
  },

  // ===== Yeni hazine sandığı ayakkabıları =====
  {
    id: 'lucky_boots',
    name: 'Şanslı Çizmeler',
    description: 'Hazine sandığında bulunan tuhaf çizmeler, iyi şans ve ek ganimet sağlar.',
    effects: [
      { type: 'luck', value: 0.05 },
      { type: 'monster_drop_bonus', value: 0.04 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Maden hazine sandığı',
    sellPrice: 450
  },

  // === Lonca özel ===
  {
    id: 'guild_war_boots',
    name: 'Lonca Savaş Çizmeleri',
    description: 'Maceracılar Loncası seçkin üyelerine özel savaş çizmeleri; hafif ama dayanıklıdır.',
    effects: [
      { type: 'attack_bonus', value: 2 },
      { type: 'defense_bonus', value: 0.05 },
      { type: 'travel_speed', value: 0.1 }
    ],
    shopPrice: null,
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Lonca mağazası',
    sellPrice: 800
  }
]

/** ID’ye göre ayakkabı tanımını al */
export const getShoeById = (id: string): ShoeDef | undefined => {
  return SHOES.find(s => s.id === id)
}

/** İpek Mağazası’nda satın alınabilen ayakkabılar */
export const SHOP_SHOES: ShoeDef[] = SHOES.filter(s => s.shopPrice !== null)

/** Demircide üretilebilen ayakkabılar */
export const CRAFTABLE_SHOES: ShoeDef[] = SHOES.filter(s => s.recipe !== null)

/** Canavar düşürme ayakkabıları (maden bölgesine göre) */
export const MONSTER_DROP_SHOES: Record<string, { shoeId: string; chance: number }[]> = {
  shallow: [],
  frost: [{ shoeId: 'frost_treads', chance: 0.015 }],
  lava: [],
  crystal: [{ shoeId: 'crystal_treads', chance: 0.015 }],
  shadow: [{ shoeId: 'shadow_striders', chance: 0.012 }],
  abyss: [{ shoeId: 'void_treads', chance: 0.01 }]
}

/** BOSS ilk zafer ayakkabı düşürmeleri */
export const BOSS_DROP_SHOES: Record<number, string> = {
  40: 'frost_queen_slippers',
  60: 'lava_lord_greaves',
  100: 'shadow_sovereign_treads',
  120: 'abyss_dragon_treads'
}

/** Hazine sandığı ayakkabı düşürmeleri (maden bölgesine göre) */
export const TREASURE_DROP_SHOES: Record<string, { shoeId: string; chance: number }[]> = {
  shallow: [{ shoeId: 'lucky_boots', chance: 0.05 }],
  frost: [{ shoeId: 'lucky_boots', chance: 0.04 }],
  lava: [],
  crystal: [{ shoeId: 'fortune_slippers', chance: 0.05 }],
  shadow: [{ shoeId: 'fortune_slippers', chance: 0.04 }],
  abyss: []
}
