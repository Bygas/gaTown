import type { RecipeDef } from '@/types'

/** Tüm tarif tanımları */
export const RECIPES: RecipeDef[] = [
  {
    id: 'stir_fried_cabbage',
    name: 'Sote Lahana',
    ingredients: [{ itemId: 'cabbage', quantity: 2 }],
    effect: { staminaRestore: 15, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Basit ve mütevazı bir ev yemeği.'
  },
  {
    id: 'radish_soup',
    name: 'Turp Çorbası',
    ingredients: [
      { itemId: 'radish', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Mustafa Amca yakınlık: “Tanışıklık”',
    description: 'Sıcacık turp çorbası, hem bedeni hem içi ısıtır.'
  },
  {
    id: 'braised_carp',
    name: 'Kızarmış Sazan',
    ingredients: [
      { itemId: 'carp', quantity: 1 },
      { itemId: 'sesame', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'fishing', value: 1, description: 'Balıkçılık becerisi +1 (bugün)' }
    },
    unlockSource: 'Gamze yakınlık: “Tanışıklık”',
    description: 'Lezzetli ve aromatik kızarmış sazan.'
  },
  {
    id: 'herbal_porridge',
    name: 'Şifalı Lapa',
    ingredients: [
      { itemId: 'herb', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 40, healthRestore: 20 },
    unlockSource: 'Demirhan yakınlık: “Tanışıklık”',
    description: 'Vücudu dengeleyen şifalı bir lapa.'
  },
  {
    id: 'osmanthus_cake',
    name: 'Osmanthus Keki',
    ingredients: [
      { itemId: 'osmanthus', quantity: 3 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 20,
      healthRestore: 5,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı ×2 (bugün)' }
    },
    unlockSource: 'Öykü yakınlık: “Tanışıklık”',
    description: 'Zarif osmanthus keki, hediye için harika bir seçim.'
  },
  {
    id: 'miner_lunch',
    name: 'Madenci Kumanyası',
    ingredients: [
      { itemId: 'potato', quantity: 2 },
      { itemId: 'sweet_potato', quantity: 1 }
    ],
    effect: {
      staminaRestore: 25,
      healthRestore: 25,
      buff: { type: 'mining', value: 20, description: 'Madencilik dayanıklılık tüketimi -20% (bugün)' }
    },
    unlockSource: 'Mehmethan yakınlık: “Tanışıklık”',
    description: 'Gerçek bir madenci yemeği.'
  },
  {
    id: 'spicy_hotpot',
    name: 'Acılı Hotpot',
    ingredients: [
      { itemId: 'chili', quantity: 2 },
      { itemId: 'cabbage', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 40,
      buff: { type: 'defense', value: 20, description: 'Alınan hasar -20% (bugün)' }
    },
    unlockSource: 'Yemek pişirme seviye 4',
    requiredSkill: { type: 'farming', level: 4 },
    description: 'Yakıcı derecede acılı hotpot, soğuğu uzaklaştırır.'
  },
  {
    id: 'steamed_bass',
    name: 'Buharda Levrek',
    ingredients: [
      { itemId: 'bass', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'fishing', value: 2, description: 'Balıkçılık becerisi +2 (bugün)' }
    },
    unlockSource: 'Balıkçılık seviye 3',
    requiredSkill: { type: 'fishing', level: 3 },
    description: 'Yumuşacık ve taze buharda levrek.'
  },
  {
    id: 'honey_tea',
    name: 'Bal Çayı',
    ingredients: [
      { itemId: 'honey', quantity: 1 },
      { itemId: 'herb', quantity: 1 }
    ],
    effect: { staminaRestore: 30, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Tatlı ve yumuşak içimli bal çayı.'
  },
  {
    id: 'ginger_soup',
    name: 'Zencefil Çorbası',
    ingredients: [
      { itemId: 'ginger', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 20,
      healthRestore: 10,
      buff: { type: 'speed', value: 15, description: 'Hareket hızı +15% (bugün)' }
    },
    unlockSource: 'Başlangıçta açık',
    description: 'İç ısıtan ve mideyi rahatlatan zencefil çorbası.'
  },
  {
    id: 'jujube_cake',
    name: 'Hünnap Keki',
    ingredients: [
      { itemId: 'jujube', quantity: 3 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 35, healthRestore: 15 },
    unlockSource: 'Yemek pişirme seviye 2',
    requiredSkill: { type: 'farming', level: 2 },
    description: 'Tatlı ve yumuşak hünnap keki.'
  },
  {
    id: 'peach_blossom_cake',
    name: 'Şeftali Çiçeği Çöreği',
    ingredients: [
      { itemId: 'peach', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 25,
      healthRestore: 10,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı ×2 (bugün)' }
    },
    unlockSource: 'Yemek pişirme seviye 3',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'İlkbahara özel şeftali çiçeği çöreği.'
  },
  {
    id: 'fish_noodle',
    name: 'Balık Çorbalı Erişte',
    ingredients: [
      { itemId: 'crucian', quantity: 1 },
      { itemId: 'winter_wheat', quantity: 2 }
    ],
    effect: { staminaRestore: 30, healthRestore: 15 },
    unlockSource: 'Balıkçılık seviye 2',
    requiredSkill: { type: 'fishing', level: 2 },
    description: 'Lezzetli balık çorbalı erişte.'
  },
  {
    id: 'miner_iron_pot',
    name: 'Madenci Demir Tencere Pilavı',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'copper_ore', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 30,
      buff: { type: 'mining', value: 25, description: 'Madencilik dayanıklılık tüketimi -25% (bugün)' }
    },
    unlockSource: 'Madencilik seviye 4',
    requiredSkill: { type: 'mining', level: 4 },
    description: 'Madencilerin demir tencerede karışık yemeği.'
  },
  {
    id: 'bamboo_shoot_stir_fry',
    name: 'Kış Bambusu Kavurması',
    ingredients: [
      { itemId: 'winter_bamboo_shoot', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Aromalı kış bambusu et sotesi.'
  },
  {
    id: 'dried_persimmon',
    name: 'Kurutulmuş Trabzon Hurması',
    ingredients: [{ itemId: 'persimmon', quantity: 3 }],
    effect: { staminaRestore: 20, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Kurutulmuş, yoğun tatlılığa sahip trabzon hurması.'
  },
  {
    id: 'lotus_seed_soup',
    name: 'Nilüfer Tohumu Tatlısı',
    ingredients: [
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'luck', value: 15, description: 'Şans +15% (bugün)' }
    },
    unlockSource: 'Yemek pişirme seviye 5',
    requiredSkill: { type: 'farming', level: 5 },
    description: 'Zihni sakinleştiren nilüfer tohumu tatlısı.'
  },
  {
    id: 'sesame_paste',
    name: 'Susam Ezmesi',
    ingredients: [
      { itemId: 'sesame', quantity: 3 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 30, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Yoğun aromalı ve pürüzsüz susam ezmesi.'
  },
  {
    id: 'ginseng_soup',
    name: 'Ginseng Çorbası',
    ingredients: [
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'farming', value: 20, description: 'Tarım dayanıklılık tüketimi -20% (bugün)' }
    },
    unlockSource: 'Toplayıcılık seviye 5',
    requiredSkill: { type: 'foraging', level: 5 },
    description: 'Canlandırıcı ginseng çorbası.'
  },
  {
    id: 'corn_pancake',
    name: 'Mısır Tavası',
    ingredients: [
      { itemId: 'corn', quantity: 2 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Altın sarısı ve çıtır mısır tavası.'
  },
  {
    id: 'osmanthus_lotus_root',
    name: 'Osmanthus Lotus Kökü Peltesi',
    ingredients: [
      { itemId: 'osmanthus', quantity: 1 },
      { itemId: 'lotus_root', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'luck', value: 10, description: 'Şans +10% (bugün)' }
    },
    unlockSource: 'Yemek pişirme seviye 3',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'Mis gibi kokan osmanthus lotus kökü peltesi.'
  },

  // ==================== Yeni başlangıç tarifleri (8) ====================
  {
    id: 'scrambled_egg_rice',
    name: 'Yumurtalı Kızarmış Pilav',
    ingredients: [
      { itemId: 'egg', quantity: 1 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 20, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Basit ama lezzetli yumurtalı kızarmış pilav.'
  },
  {
    id: 'stir_fried_potato',
    name: 'Patates Kavurması',
    ingredients: [{ itemId: 'potato', quantity: 2 }],
    effect: { staminaRestore: 18, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Ekşi-acı ve çıtır patates kavurması.'
  },
  {
    id: 'boiled_egg',
    name: 'Haşlanmış Yumurta',
    ingredients: [{ itemId: 'egg', quantity: 2 }],
    effect: { staminaRestore: 15, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'En sade besin kaynağı.'
  },
  {
    id: 'congee',
    name: 'Beyaz Lapa',
    ingredients: [{ itemId: 'rice', quantity: 2 }],
    effect: { staminaRestore: 15, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Mideyi rahatlatan hafif beyaz lapa.'
  },
  {
    id: 'rice_ball',
    name: 'Pirinç Topu',
    ingredients: [{ itemId: 'rice', quantity: 1 }],
    effect: { staminaRestore: 12, healthRestore: 3 },
    unlockSource: 'Başlangıçta açık',
    description: 'Kolay taşınabilen basit pirinç topları.'
  },
  {
    id: 'steamed_bun',
    name: 'Mantou',
    ingredients: [{ itemId: 'wheat_flour', quantity: 1 }],
    effect: { staminaRestore: 12, healthRestore: 3 },
    unlockSource: 'Başlangıçta açık',
    description: 'Yumuşak beyaz buğday ekmeği, en sade temel besin.'
  },
  {
    id: 'roasted_sweet_potato',
    name: 'Fırınlanmış Tatlı Patates',
    ingredients: [{ itemId: 'sweet_potato', quantity: 2 }],
    effect: { staminaRestore: 20, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Tatlı ve yumuşacık fırınlanmış tatlı patates.'
  },
  {
    id: 'vegetable_soup',
    name: 'Kır Sebze Çorbası',
    ingredients: [
      { itemId: 'cabbage', quantity: 1 },
      { itemId: 'radish', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Taze sebzelerle kaynatılmış hafif bir çorba.'
  },
  {
    id: 'chive_egg_stir_fry',
    name: 'Frenk Soğanlı Yumurta',
    ingredients: [
      { itemId: 'chives', quantity: 2 },
      { itemId: 'egg', quantity: 1 }
    ],
    effect: { staminaRestore: 22, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Frenk soğanı ve yumurtanın klasik uyumu.'
  },
  {
    id: 'peanut_candy',
    name: 'Fıstık Şekeri',
    ingredients: [
      { itemId: 'peanut', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: { staminaRestore: 18, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Çıtır ve tatlı fıstık şekeri.'
  },

  // ==================== NPC yakınlık tarifleri — Tanışıklık (1 yeni) ====================
  {
    id: 'sweet_osmanthus_tea',
    name: 'Tatlı Osmanthus Çayı',
    ingredients: [
      { itemId: 'osmanthus', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 20,
      healthRestore: 5,
      buff: { type: 'luck', value: 10, description: 'Şans +10% (bugün)' }
    },
    unlockSource: 'Orhan yakınlık: “Tanışıklık”',
    description: 'Mis kokulu ve tatlı osmanthus çayı.'
  },

  // ==================== NPC yakınlık tarifleri — Yakın Dostluk (6) ====================
  {
    id: 'aged_radish_stew',
    name: 'Uzun Pişmiş Turp Yahnisi',
    ingredients: [
      { itemId: 'radish', quantity: 3 },
      { itemId: 'firewood', quantity: 2 }
    ],
    effect: { staminaRestore: 40, healthRestore: 25 },
    unlockSource: 'Mustafa Amca yakınlık: “Yakın Dostluk”',
    description: 'Mustafa Amca’nın gizli turp yahni tarifi, iyice lezzetlenmiş.'
  },
  {
    id: 'maple_grilled_fish',
    name: 'Akçaağaç Aromalı Izgara Balık',
    ingredients: [
      { itemId: 'mandarin_fish', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'fishing', value: 2, description: 'Balıkçılık becerisi +2 (bugün)' }
    },
    unlockSource: 'Gamze yakınlık: “Yakın Dostluk”',
    description: 'Gamze’nin kendi icadı akçaağaç aromalı ızgara balık yöntemi.'
  },
  {
    id: 'herbal_pill',
    name: 'Yüz Ot Hapı',
    ingredients: [
      { itemId: 'herb', quantity: 3 },
      { itemId: 'ginseng', quantity: 1 }
    ],
    effect: { staminaRestore: 60, healthRestore: 30 },
    unlockSource: 'Demirhan yakınlık: “Yakın Dostluk”',
    description: 'Demirhan`ın hazırladığı şifalı bitki ilacı.'
  },
  {
    id: 'embroidered_cake',
    name: 'İşlemeli Kese Keki',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'osmanthus', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı ×2 (bugün)' }
    },
    unlockSource: 'Öykü yakınlık: “Yakın Dostluk”',
    description: 'Öykü`nün özenle yaptığı özel kek.'
  },
  {
    id: 'deep_mine_stew',
    name: 'Derin Maden Güveci',
    ingredients: [
      { itemId: 'potato', quantity: 2 },
      { itemId: 'copper_ore', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 35,
      buff: { type: 'mining', value: 30, description: 'Madencilik dayanıklılık tüketimi -30% (bugün)' }
    },
    unlockSource: 'Mehmethan yakınlık: “Yakın Dostluk”',
    description: 'Mehmethan`ın madenin derinliklerinde icat ettiği yahni.'
  },
  {
    id: 'wild_berry_jam',
    name: 'Yabani Meyve Reçeli',
    ingredients: [
      { itemId: 'wild_berry', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 25,
      healthRestore: 10,
      buff: { type: 'speed', value: 20, description: 'Hareket hızı +20% (bugün)' }
    },
    unlockSource: 'Orhan yakınlık: “Yakın Dostluk”',
    description: 'Orhan`ın orman meyveleriyle yaptığı reçel.'
  },

  // ==================== NPC yakınlık tarifleri — En İyi Dost (6) ====================
  {
    id: 'farmers_feast',
    name: 'Çiftçi Şöleni',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'cabbage', quantity: 2 },
      { itemId: 'egg', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 40,
      buff: { type: 'farming', value: 25, description: 'Tarım dayanıklılık tüketimi -25% (bugün)' }
    },
    unlockSource: 'Mustafa Amca yakınlık: “En İyi Dost”',
    description: 'Mustafa Amca’nın sakladığı büyük çiftçi yemeği.'
  },
  {
    id: 'autumn_moon_feast',
    name: 'Sonbahar Ayı Ziyafeti',
    ingredients: [
      { itemId: 'mandarin_fish', quantity: 1 },
      { itemId: 'river_crab', quantity: 1 },
      { itemId: 'osmanthus', quantity: 2 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'luck', value: 20, description: 'Şans +20% (bugün)' }
    },
    unlockSource: 'Gamze yakınlık: “En İyi Dost”',
    description: 'Gamze’nin yakın dostu için hazırladığı sonbahar gecesi ziyafeti.'
  },
  {
    id: 'longevity_soup',
    name: 'Uzun Ömür Çorbası',
    ingredients: [
      { itemId: 'ginseng', quantity: 2 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: { staminaRestore: 80, healthRestore: 40 },
    unlockSource: 'Demirhan yakınlık: “En İyi Dost”',
    description: 'Demirhan`ın hayat boyu biriktirdiği sağlık reçetesi.'
  },
  {
    id: 'lovers_pastry',
    name: 'Aşıklar Böreği',
    ingredients: [
      { itemId: 'peach', quantity: 2 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'giftBonus', value: 3, description: 'Hediye yakınlığı ×3 (bugün)' }
    },
    unlockSource: 'Öykü yakınlık: “En İyi Dost”',
    description: 'Öykü`nün aşıklar için özel yaptığı tatlı börek.'
  },
  {
    id: 'forgemasters_meal',
    name: 'Dövme Ustası Menüsü',
    ingredients: [
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'potato', quantity: 3 },
      { itemId: 'firewood', quantity: 2 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 50,
      buff: { type: 'defense', value: 25, description: 'Alınan hasar -25% (bugün)' }
    },
    unlockSource: 'Mehmethan yakınlık: “En İyi Dost”',
    description: 'Mehmethan`ın kendi icadı yüksek enerjili demirci yemeği.'
  },
  {
    id: 'spirit_fruit_wine',
    name: 'Ruh Meyvesi Şarabı',
    ingredients: [
      { itemId: 'wild_berry', quantity: 3 },
      { itemId: 'honey', quantity: 2 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'luck', value: 25, description: 'Şans +25% (bugün)' }
    },
    unlockSource: 'Orhan yakınlık: “En İyi Dost”',
    description: 'Orhan`ın ruh meyvelerinden yaptığı şans şarabı.'
  },

  // ==================== NPC evlilik tarifleri (12) ====================
  {
    id: 'phoenix_cake',
    name: 'Anka Keki',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'osmanthus', quantity: 2 },
      { itemId: 'jujube', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'giftBonus', value: 3, description: 'Hediye yakınlığı ×3 (bugün)' }
    },
    unlockSource: 'Öykü ile evlendikten sonra',
    description: 'Öykü`nün evlilik sonrası öğrettiği Anka keki tarifi.'
  },
  {
    id: 'molten_hotpot',
    name: 'Lav Demir Tencere',
    ingredients: [
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'chili', quantity: 2 },
      { itemId: 'potato', quantity: 2 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 50,
      buff: { type: 'mining', value: 35, description: 'Madencilik dayanıklılık tüketimi -35% (bugün)' }
    },
    unlockSource: 'Mehmethan ile evlendikten sonra',
    description: 'Mehmethan`ın evlilik sonrası öğrettiği lav tencere yemeği.'
  },
  {
    id: 'moonlight_sashimi',
    name: 'Ay Işığı Sashimi',
    ingredients: [
      { itemId: 'sturgeon', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 20,
      buff: { type: 'fishing', value: 3, description: 'Balıkçılık becerisi +3 (bugün)' }
    },
    unlockSource: 'Gamze ile evlendikten sonra',
    description: 'Qiuyue’nin evlilik sonrası paylaştığı ay ışığı sashimi.'
  },
  {
    id: 'tea_banquet',
    name: 'Sekiz Hazineli Çay Şöleni',
    ingredients: [
      { itemId: 'tea', quantity: 3 },
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı ×2 (bugün)' }
    },
    unlockSource: 'Chunlan ile evlendikten sonra',
    description: 'Chunlan’ın çayla hazırlanan özel şölen tarifi.'
  },
  {
    id: 'snow_plum_soup',
    name: 'Kar Erik Tatlısı',
    ingredients: [
      { itemId: 'snow_lotus', quantity: 1 },
      { itemId: 'honey', quantity: 2 }
    ],
    effect: {
      staminaRestore: 65,
      healthRestore: 35,
      buff: { type: 'luck', value: 3, description: 'Şans +3 (bugün)' }
    },
    unlockSource: 'Xueqin ile evlendikten sonra',
    description: 'Xueqin’in atölye mutfağından özel tatlı çorba.'
  },
  {
    id: 'silk_dumpling',
    name: 'İpek Bohça Mantısı',
    ingredients: [
      { itemId: 'silk', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'cabbage', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı ×2 (bugün)' }
    },
    unlockSource: 'Susu ile evlendikten sonra',
    description: 'Susu’nun öğrettiği, bohça biçiminde zarif mantılar.'
  },
  {
    id: 'drunken_chicken',
    name: 'Sarhoş Tavuk',
    ingredients: [
      { itemId: 'egg', quantity: 3 },
      { itemId: 'peach_wine', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 40,
      buff: { type: 'farming', value: 30, description: 'Tarım dayanıklılık tüketimi -30% (bugün)' }
    },
    unlockSource: 'Hongdou ile evlendikten sonra',
    description: 'Hongdou’nun öğrettiği şarap aromalı meşhur yemek.'
  },
  {
    id: 'scholars_porridge',
    name: 'Bilgin Lapası',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'tea', quantity: 1 },
      { itemId: 'ginseng', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 30,
      buff: { type: 'speed', value: 2, description: 'Hareket hızı +2 (bugün)' }
    },
    unlockSource: 'Danqing ile evlendikten sonra',
    description: 'Danqing’in eski tariflere göre yaptığı sakinleştirici lapa.'
  },
  {
    id: 'ironforge_stew',
    name: 'Demirci Güveci',
    ingredients: [
      { itemId: 'potato', quantity: 3 },
      { itemId: 'corn', quantity: 2 },
      { itemId: 'iron_ore', quantity: 1 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 50,
      buff: { type: 'mining', value: 40, description: 'Madencilik dayanıklılık tüketimi -40% (bugün)' }
    },
    unlockSource: 'Atie ile evlendikten sonra',
    description: 'Atie’nin doyurucu ve kaba ama güçlü güveci.'
  },
  {
    id: 'hunters_roast',
    name: 'Avcı Kızartması',
    ingredients: [
      { itemId: 'wild_mushroom', quantity: 3 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'pine_cone', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 45,
      buff: { type: 'defense', value: 3, description: 'Savunma +3 (bugün)' }
    },
    unlockSource: 'Yunfei ile evlendikten sonra',
    description: 'Yunfei’nin öğrettiği dağ usulü kızartma.'
  },
  {
    id: 'ranch_milk_soup',
    name: 'Çiftlik Süt Çorbası',
    ingredients: [
      { itemId: 'milk', quantity: 2 },
      { itemId: 'corn', quantity: 2 },
      { itemId: 'sweet_potato', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 35,
      buff: { type: 'farming', value: 25, description: 'Tarım dayanıklılık tüketimi -25% (bugün)' }
    },
    unlockSource: 'Daniu ile evlendikten sonra',
    description: 'Daniu’nun sık yaptığı yoğun süt çorbası.'
  },
  {
    id: 'moonlit_tea_rice',
    name: 'Ay Işığında Çaylı Pilav',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'tea', quantity: 2 },
      { itemId: 'bamboo_shoot', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'luck', value: 2, description: 'Şans +2 (bugün)' }
    },
    unlockSource: 'Mobai ile evlendikten sonra',
    description: 'Mobai’nin ay ışığında sık hazırladığı hafif çaylı pilav.'
  },

  // ==================== Tarım becerisi tarifleri (3 yeni) ====================
  {
    id: 'pumpkin_pie',
    name: 'Balkabağı Tatlısı',
    ingredients: [
      { itemId: 'pumpkin', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'farming', value: 15, description: 'Tarım dayanıklılık tüketimi -15% (bugün)' }
    },
    unlockSource: 'Tarım seviye 6',
    requiredSkill: { type: 'farming', level: 6 },
    description: 'Altın sarısı ve yumuşacık balkabağı tatlısı.'
  },
  {
    id: 'golden_fried_rice',
    name: 'Altın Kızarmış Pilav',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'egg', quantity: 2 },
      { itemId: 'corn', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'farming', value: 20, description: 'Tarım dayanıklılık tüketimi -20% (bugün)' }
    },
    unlockSource: 'Tarım seviye 7',
    requiredSkill: { type: 'farming', level: 7 },
    description: 'Taneleri altın gibi parlayan kızarmış pilav.'
  },
  {
    id: 'supreme_farm_feast',
    name: 'Kırsal Büyük Şölen',
    ingredients: [
      { itemId: 'pumpkin', quantity: 1 },
      { itemId: 'watermelon', quantity: 1 },
      { itemId: 'corn', quantity: 1 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 35,
      buff: { type: 'farming', value: 30, description: 'Tarım dayanıklılık tüketimi -30% (bugün)' }
    },
    unlockSource: 'Tarım seviye 9',
    requiredSkill: { type: 'farming', level: 9 },
    description: 'Dört mevsimin özünü taşıyan kır şöleni.'
  },

  // ==================== Balıkçılık becerisi tarifleri (5 yeni) ====================
  {
    id: 'braised_catfish',
    name: 'Kızarmış Yayın Balığı',
    ingredients: [
      { itemId: 'catfish', quantity: 1 },
      { itemId: 'chili', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'fishing', value: 1, description: 'Balıkçılık becerisi +1 (bugün)' }
    },
    unlockSource: 'Balıkçılık seviye 4',
    requiredSkill: { type: 'fishing', level: 4 },
    description: 'Bol acılı kızarmış yayın balığı.'
  },
  {
    id: 'grilled_eel',
    name: 'Izgara Yılan Balığı',
    ingredients: [
      { itemId: 'eel', quantity: 1 },
      { itemId: 'sesame', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'fishing', value: 2, description: 'Balıkçılık becerisi +2 (bugün)' }
    },
    unlockSource: 'Balıkçılık seviye 5',
    requiredSkill: { type: 'fishing', level: 5 },
    description: 'Dışı çıtır, içi yumuşak ızgara yılan balığı.'
  },
  {
    id: 'crab_soup',
    name: 'Yengeç Yumurtası Çorbası',
    ingredients: [
      { itemId: 'river_crab', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'luck', value: 15, description: 'Şans +15% (bugün)' }
    },
    unlockSource: 'Balıkçılık seviye 6',
    requiredSkill: { type: 'fishing', level: 6 },
    description: 'Yoğun aromalı yengeç yumurtası çorbası.'
  },
  {
    id: 'sturgeon_stew',
    name: 'Mersin Balığı Güveci',
    ingredients: [
      { itemId: 'sturgeon', quantity: 1 },
      { itemId: 'herb', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'fishing', value: 3, description: 'Balıkçılık becerisi +3 (bugün)' }
    },
    unlockSource: 'Balıkçılık seviye 7',
    requiredSkill: { type: 'fishing', level: 7 },
    description: 'Nadir mersin balığından yapılan özel güveç.'
  },
  {
    id: 'dragon_sashimi',
    name: 'Ejder Balığı Sashimi',
    ingredients: [
      { itemId: 'dragonfish', quantity: 1 },
      { itemId: 'ginger', quantity: 2 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 35,
      buff: { type: 'fishing', value: 4, description: 'Balıkçılık becerisi +4 (bugün)' }
    },
    unlockSource: 'Balıkçılık seviye 8',
    requiredSkill: { type: 'fishing', level: 8 },
    description: 'Efsanevi ejder balığından yapılmış üstün sashimi.'
  },

  // ==================== Madencilik becerisi tarifleri (5 yeni) ====================
  {
    id: 'stone_soup',
    name: 'Maden Taşı Çorbası',
    ingredients: [
      { itemId: 'copper_ore', quantity: 2 },
      { itemId: 'radish', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 20 },
    unlockSource: 'Madencilik seviye 3',
    requiredSkill: { type: 'mining', level: 3 },
    description: 'Maden içinde bulunan malzemelerle yapılan çorba.'
  },
  {
    id: 'crystal_jelly',
    name: 'Kristal Jöle',
    ingredients: [
      { itemId: 'crystal_ore', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 25,
      buff: { type: 'mining', value: 25, description: 'Madencilik dayanıklılık tüketimi -25% (bugün)' }
    },
    unlockSource: 'Madencilik seviye 5',
    requiredSkill: { type: 'mining', level: 5 },
    description: 'Kristal gibi berrak ve titreşimli jöle.'
  },
  {
    id: 'iron_tonic',
    name: 'Demir Kemik Çorbası',
    ingredients: [
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 35,
      buff: { type: 'defense', value: 20, description: 'Alınan hasar -20% (bugün)' }
    },
    unlockSource: 'Madencilik seviye 6',
    requiredSkill: { type: 'mining', level: 6 },
    description: 'Kasları ve kemikleri güçlendiren demir çorbası.'
  },
  {
    id: 'gold_dumpling',
    name: 'Altın Maden Mantısı',
    ingredients: [
      { itemId: 'gold_ore', quantity: 1 },
      { itemId: 'winter_wheat', quantity: 2 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'mining', value: 30, description: 'Madencilik dayanıklılık tüketimi -30% (bugün)' }
    },
    unlockSource: 'Madencilik seviye 7',
    requiredSkill: { type: 'mining', level: 7 },
    description: 'Altın tozu dolgulu madenci mantısı.'
  },
  {
    id: 'void_essence_soup',
    name: 'Boşluk Özlü Çorba',
    ingredients: [
      { itemId: 'void_ore', quantity: 1 },
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'herb', quantity: 2 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 40,
      buff: { type: 'mining', value: 35, description: 'Madencilik dayanıklılık tüketimi -35% (bugün)' }
    },
    unlockSource: 'Madencilik seviye 8',
    requiredSkill: { type: 'mining', level: 8 },
    description: 'Boşluk cevherinden hazırlanmış gizemli çorba.'
  },

  // ==================== Toplayıcılık becerisi tarifleri (4 yeni) ====================
  {
    id: 'wild_salad',
    name: 'Yabani Ot Salatası',
    ingredients: [
      { itemId: 'herb', quantity: 2 },
      { itemId: 'wild_berry', quantity: 1 }
    ],
    effect: { staminaRestore: 20, healthRestore: 10 },
    unlockSource: 'Toplayıcılık seviye 3',
    requiredSkill: { type: 'foraging', level: 3 },
    description: 'Dağdan toplanmış taze otlarla yapılan salata.'
  },
  {
    id: 'mushroom_stew',
    name: 'Mantar Güveci',
    ingredients: [
      { itemId: 'wild_mushroom', quantity: 3 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 20,
      buff: { type: 'speed', value: 15, description: 'Hareket hızı +15% (bugün)' }
    },
    unlockSource: 'Toplayıcılık seviye 4',
    requiredSkill: { type: 'foraging', level: 4 },
    description: 'Yavaş pişirilmiş yabani mantar çorbası.'
  },
  {
    id: 'forest_tonic',
    name: 'Orman Güç İlacı',
    ingredients: [
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'wild_mushroom', quantity: 2 },
      { itemId: 'herb', quantity: 2 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'farming', value: 20, description: 'Tarım dayanıklılık tüketimi -20% (bugün)' }
    },
    unlockSource: 'Toplayıcılık seviye 7',
    requiredSkill: { type: 'foraging', level: 7 },
    description: 'Ormanın değerli malzemeleriyle hazırlanan tonik.'
  },
  {
    id: 'spirit_herb_elixir',
    name: 'Ruh Otu İksiri',
    ingredients: [
      { itemId: 'ginseng', quantity: 2 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'luck', value: 25, description: 'Şans +25% (bugün)' }
    },
    unlockSource: 'Toplayıcılık seviye 9',
    requiredSkill: { type: 'foraging', level: 9 },
    description: 'Usta toplayıcıların gizli ruh otu ilacı.'
  },

  // ==================== Savaş becerisi tarifleri (5 yeni) ====================
  {
    id: 'warrior_ration',
    name: 'Savaşçı Kumanyası',
    ingredients: [
      { itemId: 'potato', quantity: 2 },
      { itemId: 'egg', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 25 },
    unlockSource: 'Savaş seviye 3',
    requiredSkill: { type: 'combat', level: 3 },
    description: 'Basit ama kullanışlı bir savaşçı kumanyası.'
  },
  {
    id: 'battle_stew',
    name: 'Savaş Güveci',
    ingredients: [
      { itemId: 'chili', quantity: 1 },
      { itemId: 'potato', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 30,
      buff: { type: 'defense', value: 15, description: 'Alınan hasar -15% (bugün)' }
    },
    unlockSource: 'Savaş seviye 4',
    requiredSkill: { type: 'combat', level: 4 },
    description: 'Savaş gücünü artıran acılı güveç.'
  },
  {
    id: 'iron_fist_soup',
    name: 'Demir Yumruk Çorbası',
    ingredients: [
      { itemId: 'iron_ore', quantity: 1 },
      { itemId: 'chili', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 35,
      buff: { type: 'defense', value: 20, description: 'Alınan hasar -20% (bugün)' }
    },
    unlockSource: 'Savaş seviye 5',
    requiredSkill: { type: 'combat', level: 5 },
    description: 'Dövüşçülere özel demir yumruk çorbası.'
  },
  {
    id: 'shadow_brew',
    name: 'Gölge Demlemesi',
    ingredients: [
      { itemId: 'shadow_ore', quantity: 1 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 40,
      buff: { type: 'defense', value: 25, description: 'Alınan hasar -25% (bugün)' }
    },
    unlockSource: 'Savaş seviye 7',
    requiredSkill: { type: 'combat', level: 7 },
    description: 'Gölge cevherinden hazırlanan gizemli bir içecek.'
  },
  {
    id: 'void_elixir',
    name: 'Boşluk İksiri',
    ingredients: [
      { itemId: 'void_ore', quantity: 1 },
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'shadow_ore', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 50,
      buff: { type: 'defense', value: 30, description: 'Alınan hasar -30% (bugün)' }
    },
    unlockSource: 'Savaş seviye 9',
    requiredSkill: { type: 'combat', level: 9 },
    description: 'Savaş ustalarının hazırladığı nihai iksir.'
  },

  // ==================== Mevsimlik ve festival tarifleri (4) ====================
  {
    id: 'spring_roll',
    name: 'Bahar Böreği',
    ingredients: [
      { itemId: 'cabbage', quantity: 2 },
      { itemId: 'bamboo_shoot', quantity: 1 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'speed', value: 15, description: 'Hareket hızı +15% (bugün)' }
    },
    unlockSource: 'İlkbahar Tarım Festivali ödülü',
    description: 'İlkbahar festivalinin geleneksel böreği.'
  },
  {
    id: 'lotus_lantern_cake',
    name: 'Lotus Feneri Keki',
    ingredients: [
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'luck', value: 15, description: 'Şans +15% (bugün)' }
    },
    unlockSource: 'Lotus Feneri Festivali ödülü',
    description: 'Lotus feneri festivaline özel kek.'
  },
  {
    id: 'harvest_feast',
    name: 'Hasat Şöleni',
    ingredients: [
      { itemId: 'pumpkin', quantity: 1 },
      { itemId: 'sweet_potato', quantity: 1 },
      { itemId: 'corn', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'farming', value: 20, description: 'Tarım dayanıklılık tüketimi -20% (bugün)' }
    },
    unlockSource: 'Hasat Şöleni ödülü',
    description: 'Hasat şenliğinin geleneksel büyük yemeği.'
  },
  {
    id: 'new_year_dumpling',
    name: 'Yılbaşı Mantısı',
    ingredients: [
      { itemId: 'winter_wheat', quantity: 3 },
      { itemId: 'napa_cabbage', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'luck', value: 20, description: 'Şans +20% (bugün)' }
    },
    unlockSource: 'Yılbaşı gecesi ödülü',
    description: 'Yılbaşı gecesi yapılan şans mantısı.'
  },

  // ==================== Yeni festival tarifleri (10) ====================
  {
    id: 'nian_gao',
    name: 'Yıl Keki',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 15,
      buff: { type: 'farming', value: 10, description: 'Tarım dayanıklılık tüketimi -10% (bugün)' }
    },
    unlockSource: 'Yılbaşı ödülü',
    description: '“Her yıl daha yükseğe” anlamı taşıyan uğurlu yıl keki.'
  },
  {
    id: 'hua_gao',
    name: 'Çiçek Keki',
    ingredients: [
      { itemId: 'peach', quantity: 2 },
      { itemId: 'rice', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 10,
      buff: { type: 'luck', value: 10, description: 'Şans +10% (bugün)' }
    },
    unlockSource: 'Çiçek Festivali ödülü',
    description: 'Çiçek dolgulu zarif bir tatlı.'
  },
  {
    id: 'qing_tuan',
    name: 'Yeşil Pirinç Topu',
    ingredients: [
      { itemId: 'herb', quantity: 2 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 10,
      buff: { type: 'farming', value: 15, description: 'Tarım dayanıklılık tüketimi -15% (bugün)' }
    },
    unlockSource: 'İlkbahar gezisi ödülü',
    description: 'Bitkisel aromalı açık hava atıştırmalığı.'
  },
  {
    id: 'yue_bing',
    name: 'Ay Keki',
    ingredients: [
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'sesame_oil', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'luck', value: 15, description: 'Şans +15% (bugün)' }
    },
    unlockSource: 'Orta Sonbahar Ay Seyri ödülü',
    description: 'Dolunay gecesine özel nilüfer dolgulu ay keki.'
  },
  {
    id: 'la_ba_zhou',
    name: 'Laba Lapası',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'peanut', quantity: 1 },
      { itemId: 'wild_berry', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25
    },
    unlockSource: 'Laba Lapası etkinlik ödülü',
    description: 'Soğuğu kıran ve mideyi ısıtan laba lapası.'
  },
  {
    id: 'dragon_boat_zongzi',
    name: 'Zongzi',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'bamboo_shoot', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'speed', value: 10, description: 'Hareket hızı +10% (bugün)' }
    },
    unlockSource: 'Ejderha Kayığı Festivali ödülü',
    description: 'Bambu yaprağı kokulu geleneksel festival zongzisi.'
  },
  {
    id: 'qiao_guo',
    name: 'Qiaoguo',
    ingredients: [
      { itemId: 'winter_wheat', quantity: 2 },
      { itemId: 'honey', quantity: 1 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 10,
      buff: { type: 'fishing', value: 1, description: 'Balıkçılık becerisi +1 (bugün)' }
    },
    unlockSource: 'Qixi bilmece etkinliği ödülü',
    description: 'Qixi festivalinin geleneksel küçük tatlısı.'
  },
  {
    id: 'chrysanthemum_wine',
    name: 'Kasımpatı Şarabı',
    ingredients: [
      { itemId: 'chrysanthemum', quantity: 3 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'luck', value: 12, description: 'Şans +12% (bugün)' }
    },
    unlockSource: 'Çifte Dokuz Festivali ödülü',
    description: 'Çifte Dokuz bayramına özel kasımpatı içkisi.'
  },
  {
    id: 'jiaozi',
    name: 'Kış Gündönümü Mantısı',
    ingredients: [
      { itemId: 'winter_wheat', quantity: 2 },
      { itemId: 'napa_cabbage', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'mining', value: 1, description: 'Madencilik becerisi +1 (bugün)' }
    },
    unlockSource: 'Kış gündönümü mantı etkinliği ödülü',
    description: 'Kış gündönümünde yapılan iç ısıtan mantı.'
  },
  {
    id: 'tangyuan',
    name: 'Tangyuan',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'honey', quantity: 1 },
      { itemId: 'peanut', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'all_skills', value: 1, description: 'Tüm beceriler +1 (bugün)' }
    },
    unlockSource: 'Yıl sonu havai fişek etkinliği ödülü',
    description: 'Birlik ve beraberliği simgeleyen yer fıstıklı tangyuan.'
  },
  {
    id: 'dou_cha_yin',
    name: 'Çay Yarışması İçeceği',
    ingredients: [
      { itemId: 'tea', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'all_skills', value: 1, description: 'Tüm beceriler +1 (bugün)' }
    },
    unlockSource: 'Çay yarışması ödülü',
    description: 'Çay etkinliğinin klasik içeceği, ferah ve hoş kokulu.'
  },
  {
    id: 'zhi_yuan_gao',
    name: 'Uçurtma Keki',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'peach', quantity: 1 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'speed', value: 12, description: 'Hareket hızı +12% (bugün)' }
    },
    unlockSource: 'Sonbahar uçurtma festivali ödülü',
    description: 'Uçurtma şeklini andıran, temaya uygun festival tatlısı.'
  },

  // ==================== Başarım dönüm noktası tarifleri (9) ====================
  {
    id: 'first_catch_soup',
    name: 'İlk Av Çorbası',
    ingredients: [
      { itemId: 'crucian', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: { staminaRestore: 20, healthRestore: 10 },
    unlockSource: 'Başarım: İlk kez balık tut',
    description: 'İlk balık avının anısına yapılan çorba.'
  },
  {
    id: 'bountiful_porridge',
    name: 'Bereket Lapası',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'jujube', quantity: 2 }
    ],
    effect: { staminaRestore: 40, healthRestore: 20 },
    unlockSource: 'Başarım: 100 ürün hasat et',
    description: 'Yüzüncü hasadı kutlamak için yapılan lapa.'
  },
  {
    id: 'miners_glory',
    name: 'Madencinin Zaferi',
    ingredients: [
      { itemId: 'gold_ore', quantity: 1 },
      { itemId: 'egg', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 30,
      buff: { type: 'mining', value: 25, description: 'Madencilik dayanıklılık tüketimi -25% (bugün)' }
    },
    unlockSource: 'Başarım: Madenin 30. katına ulaş',
    description: 'Madencilik onurunun simgesi.'
  },
  {
    id: 'chef_special',
    name: 'Şefin Özel Menüsü',
    ingredients: [
      { itemId: 'egg', quantity: 2 },
      { itemId: 'honey', quantity: 1 },
      { itemId: 'sesame', quantity: 2 }
    ],
    effect: { staminaRestore: 45, healthRestore: 20 },
    unlockSource: 'Başarım: 20 yemek pişir',
    description: 'Sadece usta aşçıların yapabileceği özel yemek.'
  },
  {
    id: 'social_tea',
    name: 'Sosyete Çiçek Çayı',
    ingredients: [
      { itemId: 'osmanthus', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı ×2 (bugün)' }
    },
    unlockSource: 'Başarım: 3 NPC ile yakın dostluk kur',
    description: 'Sosyal ustaların özel karışım çayı.'
  },
  {
    id: 'anglers_platter',
    name: 'Balıkçı Tabağı',
    ingredients: [
      { itemId: 'bass', quantity: 1 },
      { itemId: 'creek_shrimp', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 25,
      buff: { type: 'fishing', value: 2, description: 'Balıkçılık becerisi +2 (bugün)' }
    },
    unlockSource: 'Başarım: 20 balık tut',
    description: 'Usta balıkçıların hazırlayabildiği deniz ürünü tabağı.'
  },
  {
    id: 'legendary_feast',
    name: 'Efsanevi Şölen',
    ingredients: [
      { itemId: 'jade_dragon', quantity: 1 },
      { itemId: 'ginger', quantity: 2 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'fishing', value: 4, description: 'Balıkçılık becerisi +4 (bugün)' }
    },
    unlockSource: 'Başarım: Efsanevi balık yakala',
    description: 'Efsanevi balıktan yapılan üstün şölen.'
  },
  {
    id: 'abyss_stew',
    name: 'Uçurum Güveci',
    ingredients: [
      { itemId: 'shadow_ore', quantity: 1 },
      { itemId: 'crystal_shrimp', quantity: 1 },
      { itemId: 'herb', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 35,
      buff: { type: 'defense', value: 20, description: 'Alınan hasar -20% (bugün)' }
    },
    unlockSource: 'Başarım: Madenin 50. katına ulaş',
    description: 'Derinlik kaşiflerinin gizli yahni tarifi.'
  },
  {
    id: 'collectors_banquet',
    name: 'Koleksiyoncu Ziyafeti',
    ingredients: [
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'sturgeon', quantity: 1 },
      { itemId: 'pumpkin', quantity: 1 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'luck', value: 25, description: 'Şans +25% (bugün)' }
    },
    unlockSource: 'Başarım: 50 eşya keşfet',
    description: 'Nadir malzemelerle hazırlanan koleksiyoncu şöleni.'
  },

  // ===== Yeni: hayvansal ürün tarifleri =====
  {
    id: 'silkie_egg_soup',
    name: 'Siyah Tavuk Yumurtası Kreması',
    ingredients: [
      { itemId: 'silkie_egg', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: { staminaRestore: 50, healthRestore: 30 },
    unlockSource: 'Başlangıçta açık',
    description: 'Besleyici ve şifalı siyah tavuk yumurtası kreması.'
  },
  {
    id: 'goat_milk_soup',
    name: 'Keçi Sütü Çorbası',
    ingredients: [
      { itemId: 'goat_milk', quantity: 2 },
      { itemId: 'herb', quantity: 1 }
    ],
    effect: { staminaRestore: 45, healthRestore: 25 },
    unlockSource: 'Daniu yakınlık: “En İyi Dost”',
    description: 'Sıcak ve yoğun aromalı keçi sütü çorbası.'
  },
  {
    id: 'truffle_fried_rice',
    name: 'Trüflü Kızarmış Pilav',
    ingredients: [
      { itemId: 'truffle', quantity: 1 },
      { itemId: 'rice', quantity: 1 },
      { itemId: 'egg', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'farming', value: 1, description: 'Tarım becerisi +1 (bugün)' }
    },
    unlockSource: 'Daniu yakınlık: “Can Dost”',
    description: 'Lüks ve mis kokulu trüflü pilav.'
  },
  {
    id: 'antler_soup',
    name: 'Geyik Boynuzu Çorbası',
    ingredients: [
      { itemId: 'antler_velvet', quantity: 1 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'ginseng', quantity: 1 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'stamina', value: 100, description: 'Dayanıklılık tamamen yenilenir' }
    },
    unlockSource: 'Yaşlı Lin yakınlık: “Can Dost”',
    description: 'Aşırı besleyici; bir kâse içince insanı baştan ayağa canlandırır.'
  },
  {
    id: 'camel_milk_tea',
    name: 'Deve Sütlü Çay',
    ingredients: [
      { itemId: 'camel_milk', quantity: 1 },
      { itemId: 'tea', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'speed', value: 15, description: 'Hareket hızı +15% (bugün)' }
    },
    unlockSource: 'Chen Amca yakınlık: “En İyi Dost”',
    description: 'İpeksi ve yoğun aromalı deve sütlü çay.'
  },
  {
    id: 'peacock_feast',
    name: 'Tavuskuşu Şöleni',
    ingredients: [
      { itemId: 'peacock_feather', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'osmanthus', quantity: 1 }
    ],
    effect: {
      staminaRestore: 90,
      healthRestore: 50,
      buff: { type: 'all_skills', value: 1, description: 'Tüm beceriler +1 (bugün)' }
    },
    unlockSource: 'Evlilikten sonra açılır',
    description: 'Efsanevi tavuskuşu şöleni, son derece görkemli.'
  },

  // === Hanhai tarifleri ===
  {
    id: 'spiced_lamb',
    name: 'Baharatlı Kuzu Kızartması',
    ingredients: [
      { itemId: 'hanhai_spice', quantity: 1 },
      { itemId: 'goat_milk', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'mining', value: 2, description: 'Madencilik becerisi +2 (bugün)' }
    },
    unlockSource: 'Hanhai durağından baharat satın aldıktan sonra açılır',
    description: 'Batı diyarı usulü baharatlı kuzu, güç verici bir aroma taşır.'
  },
  {
    id: 'silk_dumpling_deluxe',
    name: 'İpek Yolu Mantısı',
    ingredients: [
      { itemId: 'hanhai_silk', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'hanhai_spice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 35,
      buff: { type: 'giftBonus', value: 3, description: 'Hediye yakınlığı ×3 (bugün)' }
    },
    unlockSource: 'Hanhai durağından ipek satın aldıktan sonra açılır',
    description: 'İpekle sarılmış zarif mantılar, batı baharatlarıyla hediye için mükemmel.'
  },
  {
    id: 'desert_cactus_soup',
    name: 'Kaktüs Çorbası',
    ingredients: [
      { itemId: 'hanhai_cactus', quantity: 2 },
      { itemId: 'hanhai_spice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 40,
      buff: { type: 'stamina', value: 30, description: 'Maksimum dayanıklılık +30 (bugün)' }
    },
    unlockSource: 'Kaktüs hasat ettikten sonra açılır',
    description: 'Serinletici kaktüs çorbası, çöl yolcularının can simidi.'
  },
  {
    id: 'date_cake',
    name: 'Hurma Keki',
    ingredients: [
      { itemId: 'hanhai_date', quantity: 3 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'farming', value: 2, description: 'Yetiştiricilik becerisi +2 (bugün)' }
    },
    unlockSource: 'Hurma hasat ettikten sonra açılır',
    description: 'Tatlı ve yumuşak hurma keki, enerji ve kan tazeler.'
  }
]

/** ID’ye göre tarif al */
export const getRecipeById = (id: string): RecipeDef | undefined => {
  return RECIPES.find(r => r.id === id)
    }
