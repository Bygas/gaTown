import type { RingDef } from '@/types'

/** Tüm yüzük tanımları */
export const RINGS: RingDef[] = [
  // ===== Seviye 1: Bakır / Kuvars (erken oyun, 1-20. katlar) =====
  {
    id: 'jade_guard_ring',
    name: 'Yeşim Koruma Yüzüğü',
    description: 'Yeşimle süslenmiş bakır bir yüzük, alınan hasarı azaltır.',
    effects: [{ type: 'defense_bonus', value: 0.08 }],
    recipe: [
      { itemId: 'copper_bar', quantity: 2 },
      { itemId: 'jade', quantity: 1 }
    ],
    recipeMoney: 200,
    obtainSource: 'Üretim',
    sellPrice: 150
  },
  {
    id: 'quartz_ring',
    name: 'Parlak Kuvars Yüzüğü',
    description: 'Parıldayan kuvars yüzük, saldırı gücünü artırır.',
    effects: [{ type: 'attack_bonus', value: 3 }],
    recipe: [
      { itemId: 'copper_bar', quantity: 2 },
      { itemId: 'quartz', quantity: 2 }
    ],
    recipeMoney: 200,
    obtainSource: 'Üretim',
    sellPrice: 120
  },
  {
    id: 'farmers_ring',
    name: 'Çiftçi Yeşil Yüzüğü',
    description: 'Çiftçilik yaparken harcanan dayanıklılığı azaltır.',
    effects: [{ type: 'farming_stamina', value: 0.1 }],
    recipe: [
      { itemId: 'copper_bar', quantity: 3 },
      { itemId: 'quartz', quantity: 1 }
    ],
    recipeMoney: 250,
    obtainSource: 'Üretim',
    sellPrice: 180
  },

  // ===== Seviye 2: Demir / Yeşim (erken-orta oyun, 21-40. katlar) =====
  {
    id: 'jade_spirit_ring',
    name: 'Yeşim Ruh Yüzüğü',
    description: 'Yeşim, ruhani enerji barındırır ve kritik vuruş oranını artırır.',
    effects: [{ type: 'crit_rate_bonus', value: 0.06 }],
    recipe: [
      { itemId: 'iron_bar', quantity: 2 },
      { itemId: 'jade', quantity: 2 }
    ],
    recipeMoney: 500,
    obtainSource: 'Üretim',
    sellPrice: 300
  },
  {
    id: 'anglers_ring',
    name: 'Balıkçı Yeşim Yüzüğü',
    description: 'Balıklar daha uysal olur, balık tutarken dayanıklılık tüketimi azalır.',
    effects: [
      { type: 'fishing_calm', value: 0.08 },
      { type: 'fishing_stamina', value: 0.1 }
    ],
    recipe: [
      { itemId: 'iron_bar', quantity: 2 },
      { itemId: 'jade', quantity: 1 },
      { itemId: 'quartz', quantity: 1 }
    ],
    recipeMoney: 400,
    obtainSource: 'Üretim',
    sellPrice: 280
  },
  {
    id: 'friendship_ring',
    name: 'İyi Niyet Yüzüğü',
    description: 'Takıldığında verilen hediyeler insanları daha çok etkiler.',
    effects: [{ type: 'gift_friendship', value: 0.15 }],
    recipe: [
      { itemId: 'iron_bar', quantity: 2 },
      { itemId: 'jade', quantity: 2 }
    ],
    recipeMoney: 600,
    obtainSource: 'Üretim',
    sellPrice: 350
  },

  // ===== Seviye 3: Altın / Yakut (orta oyun, 41-60. katlar) =====
  {
    id: 'ruby_flame_ring',
    name: 'Kızıl Alev Yüzüğü',
    description: 'Yakutun yakıcı gücü büyük miktarda saldırı artışı sağlar.',
    effects: [{ type: 'attack_bonus', value: 6 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'ruby', quantity: 2 }
    ],
    recipeMoney: 1000,
    obtainSource: 'Üretim',
    sellPrice: 600
  },
  {
    id: 'miners_ring',
    name: 'Madenci Altın Yüzüğü',
    description: 'Madende keşif sırasında dayanıklılık tüketimini büyük ölçüde azaltır ve ekstra maden toplatır.',
    effects: [
      { type: 'mining_stamina', value: 0.15 },
      { type: 'ore_bonus', value: 1 }
    ],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'ruby', quantity: 1 },
      { itemId: 'quartz', quantity: 2 }
    ],
    recipeMoney: 800,
    obtainSource: 'Üretim',
    sellPrice: 500
  },
  {
    id: 'merchants_ring',
    name: 'Tüccar Altın Yüzüğü',
    description: 'Satılan eşyaların fiyatını artırır, mağaza fiyatlarını düşürür.',
    effects: [
      { type: 'sell_price_bonus', value: 0.05 },
      { type: 'shop_discount', value: 0.05 }
    ],
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'ruby', quantity: 1 }
    ],
    recipeMoney: 1200,
    obtainSource: 'Üretim',
    sellPrice: 700
  },

  // ===== Seviye 4: Aytaşı (61-80. katlar) =====
  {
    id: 'moonlight_ring',
    name: 'Ay Işığı Yüzüğü',
    description: 'Aytaşının yumuşak parıltısı yaşamı korur, maksimum HP artırır.',
    effects: [{ type: 'max_hp_bonus', value: 25 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'moonstone', quantity: 2 }
    ],
    recipeMoney: 1500,
    obtainSource: 'Üretim',
    sellPrice: 800
  },
  {
    id: 'harvest_moon_ring',
    name: 'Hasat Ayı Yüzüğü',
    description: 'Ay ışığı ürünleri besler; kaliteyi ve büyüme hızını artırır.',
    effects: [
      { type: 'crop_quality_bonus', value: 0.08 },
      { type: 'crop_growth_bonus', value: 0.08 }
    ],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'moonstone', quantity: 2 },
      { itemId: 'jade', quantity: 1 }
    ],
    recipeMoney: 1500,
    obtainSource: 'Üretim',
    sellPrice: 900
  },
  {
    id: 'exp_ring',
    name: 'Aydınlanma Yüzüğü',
    description: 'Kazanılan tüm deneyim puanlarını artırır.',
    effects: [{ type: 'exp_bonus', value: 0.1 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'moonstone', quantity: 1 },
      { itemId: 'ruby', quantity: 1 }
    ],
    recipeMoney: 1200,
    obtainSource: 'Üretim',
    sellPrice: 750
  },

  // ===== Seviye 5: Obsidyen (81-100. katlar) =====
  {
    id: 'shadow_ring',
    name: 'Gölge Yüzüğü',
    description: 'Gölge gücü can emer, saldırılar sağlık yeniler.',
    effects: [{ type: 'vampiric', value: 0.1 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'obsidian', quantity: 2 }
    ],
    recipeMoney: 2000,
    obtainSource: 'Üretim',
    sellPrice: 1200
  },
  {
    id: 'treasure_hunter_ring',
    name: 'Hazine Avcısı Yüzüğü',
    description: 'Madende sandıkların daha sık görünmesini sağlar, balıkçılık sandığı ihtimalini artırır.',
    effects: [{ type: 'treasure_find', value: 0.1 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'obsidian', quantity: 1 },
      { itemId: 'moonstone', quantity: 1 }
    ],
    recipeMoney: 1800,
    obtainSource: 'Üretim',
    sellPrice: 1000
  },
  {
    id: 'stalwart_ring',
    name: 'Kaya Gibi Sağlam Yüzük',
    description: 'Obsidyenin sertliği koruma sağlar; hasarı azaltır ve maksimum HP artırır.',
    effects: [
      { type: 'defense_bonus', value: 0.12 },
      { type: 'max_hp_bonus', value: 15 }
    ],
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'obsidian', quantity: 2 }
    ],
    recipeMoney: 2500,
    obtainSource: 'Üretim',
    sellPrice: 1400
  },

  // ===== Seviye 6: Ejder Yeşimi / İridyum (101-120. katlar, oyun sonu) =====
  {
    id: 'dragon_ring',
    name: 'Ejder Damarı Yüzüğü',
    description: 'Ejder yeşimi kadim güç taşır, dayanıklılık verimliliğini genel olarak artırır.',
    effects: [{ type: 'stamina_reduction', value: 0.12 }],
    recipe: [
      { itemId: 'iridium_bar', quantity: 2 },
      { itemId: 'dragon_jade', quantity: 2 }
    ],
    recipeMoney: 5000,
    obtainSource: 'Üretim',
    sellPrice: 2500
  },
  {
    id: 'fortune_ring',
    name: 'Talih Yüzüğü',
    description: 'Ejder yeşimi, gök ve yerin ruhani enerjisini taşır; genel şansı artırır.',
    effects: [{ type: 'luck', value: 0.08 }],
    recipe: [
      { itemId: 'iridium_bar', quantity: 2 },
      { itemId: 'dragon_jade', quantity: 1 },
      { itemId: 'moonstone', quantity: 1 }
    ],
    recipeMoney: 4000,
    obtainSource: 'Üretim',
    sellPrice: 2200
  },
  {
    id: 'warlord_ring',
    name: 'Savaş Efendisi Yüzüğü',
    description: 'İridyum ve ejder yeşiminin mükemmel birleşimi; saldırıyı ve kritik oranını büyük ölçüde artırır.',
    effects: [
      { type: 'attack_bonus', value: 8 },
      { type: 'crit_rate_bonus', value: 0.08 }
    ],
    recipe: [
      { itemId: 'iridium_bar', quantity: 3 },
      { itemId: 'dragon_jade', quantity: 2 }
    ],
    recipeMoney: 6000,
    obtainSource: 'Üretim',
    sellPrice: 3000
  },
  {
    id: 'prismatic_ring',
    name: 'Prizmatik Gökyüzü Yüzüğü',
    description: 'Prizmatik parçadan dövülmüş üstün yüzük; her alanda şans getirir.',
    effects: [
      { type: 'luck', value: 0.12 },
      { type: 'exp_bonus', value: 0.08 },
      { type: 'sell_price_bonus', value: 0.05 }
    ],
    recipe: [
      { itemId: 'iridium_bar', quantity: 2 },
      { itemId: 'prismatic_shard', quantity: 1 }
    ],
    recipeMoney: 10000,
    obtainSource: 'Üretim (Prizmatik Parça gerekli)',
    sellPrice: 5000
  },

  // ===== BOSS düşürmesi (üretilemez) =====
  {
    id: 'mud_golem_band',
    name: 'Çamur Kaya Bandı',
    description: 'Çamur kaya devinden düşen koruyucu bant, genel dayanıklılık tüketimini azaltır.',
    effects: [{ type: 'stamina_reduction', value: 0.06 }],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS düşürmesi: Çamur Kaya Devi (20. kat)',
    sellPrice: 300
  },
  {
    id: 'frost_queen_circlet',
    name: 'Buz Kraliçesi Yüzüğü',
    description: 'Buz kraliçesinden kalan buz yüzük, canavar düşürme oranını artırır.',
    effects: [{ type: 'monster_drop_bonus', value: 0.15 }],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS düşürmesi: Buz Kraliçesi (40. kat)',
    sellPrice: 600
  },
  {
    id: 'lava_lord_seal',
    name: 'Lav Hükümdarı Mührü',
    description: 'Lav hükümdarının mühür yüzüğü, saldırılara yanma ve can emme etkisi ekler.',
    effects: [
      { type: 'attack_bonus', value: 5 },
      { type: 'vampiric', value: 0.08 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS düşürmesi: Lav Hükümdarı (60. kat)',
    sellPrice: 1200
  },

  // ===== Yeni üretilebilir yüzükler =====
  {
    id: 'endurance_ring',
    name: 'Dayanıklılık Yüzüğü',
    description: 'Bakır halka üzerine kuvars işlenmiştir, dayanıklılığı artırır.',
    effects: [{ type: 'stamina_reduction', value: 0.05 }],
    recipe: [
      { itemId: 'copper_bar', quantity: 3 },
      { itemId: 'quartz', quantity: 1 }
    ],
    recipeMoney: 200,
    obtainSource: 'Üretim',
    sellPrice: 120
  },
  {
    id: 'fish_jade_ring',
    name: 'Balıkçı Yeşim Yüzüğü',
    description: 'Yeşim su ruhunu taşır, yakalanan balıkların kalitesini artırır.',
    effects: [
      { type: 'fish_quality_bonus', value: 0.08 },
      { type: 'fishing_calm', value: 0.05 }
    ],
    recipe: [
      { itemId: 'iron_bar', quantity: 2 },
      { itemId: 'jade', quantity: 2 }
    ],
    recipeMoney: 500,
    obtainSource: 'Üretim',
    sellPrice: 350
  },
  {
    id: 'growth_ring',
    name: 'Büyüme Yüzüğü',
    description: 'Ay ışığı ve otların gücü yaşamı teşvik eder, ürünler daha hızlı olgunlaşır.',
    effects: [{ type: 'crop_growth_bonus', value: 0.12 }],
    recipe: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'herb', quantity: 5 },
      { itemId: 'moonstone', quantity: 1 }
    ],
    recipeMoney: 1200,
    obtainSource: 'Üretim',
    sellPrice: 750
  },
  {
    id: 'travel_ring',
    name: 'Seyahat Yüzüğü',
    description: 'Tavşan ayağı ve altının birleşimi hafif adımlar kazandırır, yolculuğu hızlandırır.',
    effects: [
      { type: 'travel_speed', value: 0.15 },
      { type: 'stamina_reduction', value: 0.05 }
    ],
    recipe: [
      { itemId: 'gold_bar', quantity: 3 },
      { itemId: 'rabbit_foot', quantity: 1 }
    ],
    recipeMoney: 2000,
    obtainSource: 'Üretim',
    sellPrice: 1100
  },

  // ===== Yeni BOSS düşürmeleri =====
  {
    id: 'crystal_king_seal',
    name: 'Kristal Kralın Mührü',
    description: 'Kristal kral parçalandıktan sonra kalan mühür yüzüğü, aydınlanma gücü taşır.',
    effects: [
      { type: 'exp_bonus', value: 0.12 },
      { type: 'luck', value: 0.06 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS düşürmesi: Kristal Kral (80. kat)',
    sellPrice: 1800
  },
  {
    id: 'shadow_sovereign_ring',
    name: 'Gölge Hükümdarı Yüzüğü',
    description: 'Gölge hükümdarının ruhundan oluşan yüzük, ölümcül kritik vuruşlar ve can emme sağlar.',
    effects: [
      { type: 'crit_rate_bonus', value: 0.1 },
      { type: 'vampiric', value: 0.06 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS düşürmesi: Gölge Hükümdarı (100. kat)',
    sellPrice: 2500
  },
  {
    id: 'abyss_dragon_ring',
    name: 'Ejder Kral Yüzüğü',
    description: 'Uçurum ejder kralının ters pulundan oluşan üstün yüzük; saldırı ve savunmayı bir arada güçlendirir.',
    effects: [
      { type: 'attack_bonus', value: 10 },
      { type: 'defense_bonus', value: 0.1 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'BOSS düşürmesi: Uçurum Ejder Kralı (120. kat)',
    sellPrice: 4000
  },

  // ===== Yeni canavar düşürmeleri =====
  {
    id: 'shallow_guard',
    name: 'Sığ Maden Koruma Yüzüğü',
    description: 'Sığ maden katmanındaki taş yengeç kabuklarından yapılmış basit bir koruma yüzüğü.',
    effects: [{ type: 'defense_bonus', value: 0.05 }],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Sığ maden canavar düşürmesi',
    sellPrice: 80
  },
  {
    id: 'crystal_prism_band',
    name: 'Prizma Kristal Bandı',
    description: 'Kristal katmanı canavarlarında oluşan prizmatik bant, şans taşır.',
    effects: [
      { type: 'luck', value: 0.05 },
      { type: 'ore_bonus', value: 1 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Kristal katmanı canavar düşürmesi',
    sellPrice: 900
  },

  // ===== Yeni sandık düşürmeleri =====
  {
    id: 'ancient_jade_ring',
    name: 'Kadim Yeşim Yüzüğü',
    description: 'Sandıkta uyuyan kadim yeşim yüzük, zenginlik getirir.',
    effects: [
      { type: 'sell_price_bonus', value: 0.06 },
      { type: 'shop_discount', value: 0.04 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Maden sandığı',
    sellPrice: 600
  },

  // === Lonca özel ===
  {
    id: 'guild_war_ring',
    name: 'Lonca Savaş Yüzüğü',
    description: 'Maceracı Loncası seçkin üyelerinin savaş yüzüğü, loncanın gücünü taşır.',
    effects: [
      { type: 'attack_bonus', value: 4 },
      { type: 'defense_bonus', value: 0.06 }
    ],
    recipe: null,
    recipeMoney: 0,
    obtainSource: 'Lonca dükkânı',
    sellPrice: 800
  }
]

/** ID’ye göre yüzük tanımını getir */
export const getRingById = (id: string): RingDef | undefined => {
  return RINGS.find(r => r.id === id)
}

/** Üretilebilen tüm yüzükler */
export const CRAFTABLE_RINGS: RingDef[] = RINGS.filter(r => r.recipe !== null)

/** Bölgelere göre canavarların düşürebileceği yüzükler */
export const MONSTER_DROP_RINGS: Record<string, { ringId: string; chance: number }[]> = {
  shallow: [{ ringId: 'shallow_guard', chance: 0.02 }],
  frost: [{ ringId: 'jade_guard_ring', chance: 0.02 }],
  lava: [{ ringId: 'jade_spirit_ring', chance: 0.02 }],
  crystal: [
    { ringId: 'moonlight_ring', chance: 0.02 },
    { ringId: 'crystal_prism_band', chance: 0.015 }
  ],
  shadow: [{ ringId: 'shadow_ring', chance: 0.02 }],
  abyss: [{ ringId: 'dragon_ring', chance: 0.015 }]
}

/** İlk BOSS zaferinde düşen yüzükler */
export const BOSS_DROP_RINGS: Record<number, string> = {
  20: 'mud_golem_band',
  40: 'frost_queen_circlet',
  60: 'lava_lord_seal',
  80: 'crystal_king_seal',
  100: 'shadow_sovereign_ring',
  120: 'abyss_dragon_ring'
}

/** Bölgelere göre sandık katmanlarında düşebilecek yüzükler */
export const TREASURE_DROP_RINGS: Record<string, { ringId: string; chance: number }[]> = {
  shallow: [{ ringId: 'quartz_ring', chance: 0.08 }],
  frost: [{ ringId: 'farmers_ring', chance: 0.08 }],
  lava: [
    { ringId: 'anglers_ring', chance: 0.08 },
    { ringId: 'ancient_jade_ring', chance: 0.04 }
  ],
  crystal: [
    { ringId: 'exp_ring', chance: 0.06 },
    { ringId: 'ancient_jade_ring', chance: 0.035 }
  ],
  shadow: [{ ringId: 'treasure_hunter_ring', chance: 0.06 }],
  abyss: [{ ringId: 'fortune_ring', chance: 0.05 }]
}
