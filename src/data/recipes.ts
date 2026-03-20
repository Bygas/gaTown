import type { RecipeDef } from '@/types'

/** Tüm yemek tarifleri */
export const RECIPES: RecipeDef[] = [
  {
    id: 'stir_fried_cabbage',
    name: 'Lahana Kavurması',
    ingredients: [{ itemId: 'cabbage', quantity: 2 }],
    effect: { staminaRestore: 15, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Sade, gösterişsiz ama doyurucu bir köy yemeği.'
  },
  {
    id: 'radish_soup',
    name: 'Turp Çorbası',
    ingredients: [
      { itemId: 'radish', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Hasan Enişte ile tanışıklık',
    description: 'Sıcacık turp çorbası, içi de bedeni de ısıtır.'
  },
  {
    id: 'braised_carp',
    name: 'Sazan Yahnisi',
    ingredients: [
      { itemId: 'carp', quantity: 1 },
      { itemId: 'sesame', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'fishing', value: 1, description: 'Balıkçılık +1 (o gün)' }
    },
    unlockSource: 'Aylin ile tanışıklık',
    description: 'Mis gibi kokan, lokumu bol bir sazan yahnisi.'
  },
  {
    id: 'herbal_porridge',
    name: 'Şifalı Ot Lapası',
    ingredients: [
      { itemId: 'herb', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 40, healthRestore: 20 },
    unlockSource: 'Hekim Dede ile tanışıklık',
    description: 'Bedeni toparlayan eski usul bir şifa aşı.'
  },
  {
    id: 'osmanthus_cake',
    name: 'Çiçekli Pirinç Tatlısı',
    ingredients: [
      { itemId: 'osmanthus', quantity: 3 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 20,
      healthRestore: 5,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı x2 (o gün)' }
    },
    unlockSource: 'Elif ile tanışıklık',
    description: 'İnce işçilikle yapılmış, ikramı pek makbul bir tatlı.'
  },
  {
    id: 'miner_lunch',
    name: 'Madenci Azığı',
    ingredients: [
      { itemId: 'potato', quantity: 2 },
      { itemId: 'sweet_potato', quantity: 1 }
    ],
    effect: {
      staminaRestore: 25,
      healthRestore: 25,
      buff: { type: 'mining', value: 20, description: 'Madende dayanıklılık tüketimi -20% (o gün)' }
    },
    unlockSource: 'İsmail ile tanışıklık',
    description: 'Tok tutan, maden ağzında adam ayakta tutan sağlam yemek.'
  },
  {
    id: 'spicy_hotpot',
    name: 'Acılı Kazan Aşı',
    ingredients: [
      { itemId: 'chili', quantity: 2 },
      { itemId: 'cabbage', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 40,
      buff: { type: 'defense', value: 20, description: 'Alınan hasar -20% (o gün)' }
    },
    unlockSource: 'Yemek ustalığı 4. seviye',
    requiredSkill: { type: 'farming', level: 4 },
    description: 'Ağzı yakar, içi ısıtır, insanı kendine getirir.'
  },
  {
    id: 'steamed_bass',
    name: 'Buğulama Levrek',
    ingredients: [
      { itemId: 'bass', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'fishing', value: 2, description: 'Balıkçılık +2 (o gün)' }
    },
    unlockSource: 'Balıkçılık 3. seviye',
    requiredSkill: { type: 'fishing', level: 3 },
    description: 'Eti diri, tadı hafif, nefis bir buğulama.'
  },
  {
    id: 'honey_tea',
    name: 'Ballı Çay',
    ingredients: [
      { itemId: 'honey', quantity: 1 },
      { itemId: 'herb', quantity: 1 }
    ],
    effect: { staminaRestore: 30, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Tatlı içimli, yumuşak bir ballı çay.'
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
      buff: { type: 'speed', value: 15, description: 'Hareket hızı +15% (o gün)' }
    },
    unlockSource: 'Başlangıçta açık',
    description: 'İçi ısıtan, mideyi rahatlatan sıcak bir çorba.'
  },
  {
    id: 'jujube_cake',
    name: 'Hurma Tatlısı',
    ingredients: [
      { itemId: 'jujube', quantity: 3 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 35, healthRestore: 15 },
    unlockSource: 'Yemek ustalığı 2. seviye',
    requiredSkill: { type: 'farming', level: 2 },
    description: 'Tatlı mı tatlı, yumuşacık bir köy tatlısı.'
  },
  {
    id: 'peach_blossom_cake',
    name: 'Şeftalili Bahar Çöreği',
    ingredients: [
      { itemId: 'peach', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 25,
      healthRestore: 10,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı x2 (o gün)' }
    },
    unlockSource: 'Yemek ustalığı 3. seviye',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'Bahar kokusu taşıyan, gönül almak için birebir bir çörek.'
  },
  {
    id: 'fish_noodle',
    name: 'Balıklı Erişte Çorbası',
    ingredients: [
      { itemId: 'crucian', quantity: 1 },
      { itemId: 'winter_wheat', quantity: 2 }
    ],
    effect: { staminaRestore: 30, healthRestore: 15 },
    unlockSource: 'Balıkçılık 2. seviye',
    requiredSkill: { type: 'fishing', level: 2 },
    description: 'Balık suyuyla yapılmış, pek lezzetli erişte çorbası.'
  },
  {
    id: 'miner_iron_pot',
    name: 'Madenci Tencere Aşı',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'copper_ore', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 30,
      buff: { type: 'mining', value: 25, description: 'Madende dayanıklılık tüketimi -25% (o gün)' }
    },
    unlockSource: 'Madencilik 4. seviye',
    requiredSkill: { type: 'mining', level: 4 },
    description: 'Madencilerin kazan başında uydurduğu ama pek doyurucu bir aş.'
  },
  {
    id: 'bamboo_shoot_stir_fry',
    name: 'Kış Filizi Kavurması',
    ingredients: [
      { itemId: 'winter_bamboo_shoot', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Tavada çevrilmiş taze filiz, kokusu iştah açar.'
  },
  {
    id: 'dried_persimmon',
    name: 'Kurutulmuş Trabzon Hurması',
    ingredients: [{ itemId: 'persimmon', quantity: 3 }],
    effect: { staminaRestore: 20, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Güneşte kurutulmuş, tatlı mı tatlı kışlık atıştırmalık.'
  },
  {
    id: 'lotus_seed_soup',
    name: 'Lotus Taneli Tatlı Çorba',
    ingredients: [
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'luck', value: 15, description: 'Şans +15% (o gün)' }
    },
    unlockSource: 'Yemek ustalığı 5. seviye',
    requiredSkill: { type: 'farming', level: 5 },
    description: 'İnsanın içini yatıştıran, hafif ve tatlı bir çorba.'
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
    description: 'Yoğun kıvamlı, mis kokulu susam ezmesi.'
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
      buff: { type: 'farming', value: 20, description: 'Tarla işlerinde dayanıklılık tüketimi -20% (o gün)' }
    },
    unlockSource: 'Toplayıcılık 5. seviye',
    requiredSkill: { type: 'foraging', level: 5 },
    description: 'Can toplayan, kuvvet veren güçlü bir şifa çorbası.'
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
    description: 'Dışı kızarmış, içi yumuşak nefis bir mısır tavası.'
  },
  {
    id: 'osmanthus_lotus_root',
    name: 'Çiçek Kokulu Kök Tatlısı',
    ingredients: [
      { itemId: 'osmanthus', quantity: 1 },
      { itemId: 'lotus_root', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'luck', value: 10, description: 'Şans +10% (o gün)' }
    },
    unlockSource: 'Yemek ustalığı 3. seviye',
    requiredSkill: { type: 'farming', level: 3 },
    description: 'Çiçek kokusuyla hoş, tadıyla sakin bir tatlı.'
  },

  // ==================== Yeni başlangıç tarifleri ====================
  {
    id: 'scrambled_egg_rice',
    name: 'Yumurtalı Pilav',
    ingredients: [
      { itemId: 'egg', quantity: 1 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: { staminaRestore: 20, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Az malzemeyle çıkan, doyurucu ve pratik bir yemek.'
  },
  {
    id: 'stir_fried_potato',
    name: 'Patates Kavurması',
    ingredients: [{ itemId: 'potato', quantity: 2 }],
    effect: { staminaRestore: 18, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Tavada çevrilmiş, hafif baharlı patates.'
  },
  {
    id: 'boiled_egg',
    name: 'Haşlanmış Yumurta',
    ingredients: [{ itemId: 'egg', quantity: 2 }],
    effect: { staminaRestore: 15, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'En sade ama en güvenilir güç kaynağı.'
  },
  {
    id: 'congee',
    name: 'Sade Lapa',
    ingredients: [{ itemId: 'rice', quantity: 2 }],
    effect: { staminaRestore: 15, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Mideyi yormayan, yumuşak içimli bir lapa.'
  },
  {
    id: 'rice_ball',
    name: 'Pirinç Topağı',
    ingredients: [{ itemId: 'rice', quantity: 1 }],
    effect: { staminaRestore: 12, healthRestore: 3 },
    unlockSource: 'Başlangıçta açık',
    description: 'Elde sıkılmış, çantaya atmalık küçük bir azık.'
  },
  {
    id: 'steamed_bun',
    name: 'Beyaz Çörek',
    ingredients: [{ itemId: 'wheat_flour', quantity: 1 }],
    effect: { staminaRestore: 12, healthRestore: 3 },
    unlockSource: 'Başlangıçta açık',
    description: 'Yumuşacık, sade bir un çöreği.'
  },
  {
    id: 'roasted_sweet_potato',
    name: 'Köz Tatlı Patates',
    ingredients: [{ itemId: 'sweet_potato', quantity: 2 }],
    effect: { staminaRestore: 20, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Közde ağır ağır pişmiş, içi bal gibi tatlı.'
  },
  {
    id: 'vegetable_soup',
    name: 'Köy Sebze Çorbası',
    ingredients: [
      { itemId: 'cabbage', quantity: 1 },
      { itemId: 'radish', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Bahçeden çıkan taze sebzelerle kaynatılmış tertemiz bir çorba.'
  },
  {
    id: 'chive_egg_stir_fry',
    name: 'Yumurtalı Ot Kavurması',
    ingredients: [
      { itemId: 'chives', quantity: 2 },
      { itemId: 'egg', quantity: 1 }
    ],
    effect: { staminaRestore: 22, healthRestore: 10 },
    unlockSource: 'Başlangıçta açık',
    description: 'Otla yumurtanın şahane uyumu.'
  },
  {
    id: 'peanut_candy',
    name: 'Fıstık Helvası',
    ingredients: [
      { itemId: 'peanut', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: { staminaRestore: 18, healthRestore: 5 },
    unlockSource: 'Başlangıçta açık',
    description: 'Kıtırtılı, tatlı ve ağızda dağılan bir atıştırmalık.'
  },

  // ==================== NPC tarifleri — tanışıklık ====================
  {
    id: 'sweet_osmanthus_tea',
    name: 'Çiçekli Tatlı Çay',
    ingredients: [
      { itemId: 'osmanthus', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 20,
      healthRestore: 5,
      buff: { type: 'luck', value: 10, description: 'Şans +10% (o gün)' }
    },
    unlockSource: 'Mıstık ile tanışıklık',
    description: 'Mis kokulu, tatlı içimli bir köy çayı.'
  },

  // ==================== NPC tarifleri — can dost ====================
  {
    id: 'aged_radish_stew',
    name: 'Terbiyeli Turp Yahnisi',
    ingredients: [
      { itemId: 'radish', quantity: 3 },
      { itemId: 'firewood', quantity: 2 }
    ],
    effect: { staminaRestore: 40, healthRestore: 25 },
    unlockSource: 'Hasan Enişte ile can dost olunca',
    description: 'Hasan Enişte’nin sakladığı, ağır ateşte pişen nefis yahni.'
  },
  {
    id: 'maple_grilled_fish',
    name: 'Közlenmiş Dere Balığı',
    ingredients: [
      { itemId: 'mandarin_fish', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'fishing', value: 2, description: 'Balıkçılık +2 (o gün)' }
    },
    unlockSource: 'Aylin ile can dost olunca',
    description: 'Aylin’in kendi usulüyle közlediği mis kokulu balık.'
  },
  {
    id: 'herbal_pill',
    name: 'Şifa Hapı',
    ingredients: [
      { itemId: 'herb', quantity: 3 },
      { itemId: 'ginseng', quantity: 1 }
    ],
    effect: { staminaRestore: 60, healthRestore: 30 },
    unlockSource: 'Hekim Dede ile can dost olunca',
    description: 'Hekim Dede’nin elinden çıkan kuvvetli bir şifa karışımı.'
  },
  {
    id: 'embroidered_cake',
    name: 'Nakışlı Tatlı Çörek',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'osmanthus', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı x2 (o gün)' }
    },
    unlockSource: 'Elif ile can dost olunca',
    description: 'Elif’in ince zevkiyle hazırlanmış, göze de gönle de hoş gelen bir çörek.'
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
      buff: { type: 'mining', value: 30, description: 'Madende dayanıklılık tüketimi -30% (o gün)' }
    },
    unlockSource: 'İsmail ile can dost olunca',
    description: 'İsmail’in maden dibinde uydurduğu, tok tutan güçlü güveç.'
  },
  {
    id: 'wild_berry_jam',
    name: 'Yaban Meyvesi Reçeli',
    ingredients: [
      { itemId: 'wild_berry', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 25,
      healthRestore: 10,
      buff: { type: 'speed', value: 20, description: 'Hareket hızı +20% (o gün)' }
    },
    unlockSource: 'Mıstık ile can dost olunca',
    description: 'Ormandan toplanmış meyvelerle yapılmış canlı bir reçel.'
  },

  // ==================== NPC tarifleri — en iyi dost ====================
  {
    id: 'farmers_feast',
    name: 'Çiftçi Sofrası',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'cabbage', quantity: 2 },
      { itemId: 'egg', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 40,
      buff: { type: 'farming', value: 25, description: 'Tarla işlerinde dayanıklılık tüketimi -25% (o gün)' }
    },
    unlockSource: 'Hasan Enişte ile en iyi dost olunca',
    description: 'Hasan Enişte’nin sakladığı, köy sofrasının baş tacı bir ziyafet.'
  },
  {
    id: 'autumn_moon_feast',
    name: 'Ay Işığı Sofrası',
    ingredients: [
      { itemId: 'mandarin_fish', quantity: 1 },
      { itemId: 'river_crab', quantity: 1 },
      { itemId: 'osmanthus', quantity: 2 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'luck', value: 20, description: 'Şans +20% (o gün)' }
    },
    unlockSource: 'Aylin ile en iyi dost olunca',
    description: 'Aylin’in gönülden hazırladığı, geceye yakışan nefis sofra.'
  },
  {
    id: 'longevity_soup',
    name: 'Ömür Çorbası',
    ingredients: [
      { itemId: 'ginseng', quantity: 2 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: { staminaRestore: 80, healthRestore: 40 },
    unlockSource: 'Hekim Dede ile en iyi dost olunca',
    description: 'Hekim Dede’nin ömrünü verdiği bilgiyle hazırlanan kuvvetli çorba.'
  },
  {
    id: 'lovers_pastry',
    name: 'Sevda Çöreği',
    ingredients: [
      { itemId: 'peach', quantity: 2 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'giftBonus', value: 3, description: 'Hediye yakınlığı x3 (o gün)' }
    },
    unlockSource: 'Elif ile en iyi dost olunca',
    description: 'Elif’in gönlünden kopup gelen, sevgiyle yoğrulmuş tatlı çörek.'
  },
  {
    id: 'forgemasters_meal',
    name: 'Demirci Öğünü',
    ingredients: [
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'potato', quantity: 3 },
      { itemId: 'firewood', quantity: 2 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 50,
      buff: { type: 'defense', value: 25, description: 'Alınan hasar -25% (o gün)' }
    },
    unlockSource: 'İsmail ile en iyi dost olunca',
    description: 'Ağır işe ağır yemek; insanı sapasağlam tutan bir usta öğünü.'
  },
  {
    id: 'spirit_fruit_wine',
    name: 'Meyve Şarabı',
    ingredients: [
      { itemId: 'wild_berry', quantity: 3 },
      { itemId: 'honey', quantity: 2 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'luck', value: 25, description: 'Şans +25% (o gün)' }
    },
    unlockSource: 'Mıstık ile en iyi dost olunca',
    description: 'Mıstık’ın coşkusu gibi canlı, neşeli bir meyve şarabı.'
  },

  // ==================== Evlilik tarifleri ====================
  {
    id: 'phoenix_cake',
    name: 'Nişan Tatlısı',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'osmanthus', quantity: 2 },
      { itemId: 'jujube', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'giftBonus', value: 3, description: 'Hediye yakınlığı x3 (o gün)' }
    },
    unlockSource: 'Elif ile evlendikten sonra',
    description: 'Elif’in ev kurulduktan sonra öğrettiği özel tatlı.'
  },
  {
    id: 'molten_hotpot',
    name: 'Kor Tenceresi',
    ingredients: [
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'chili', quantity: 2 },
      { itemId: 'potato', quantity: 2 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 50,
      buff: { type: 'mining', value: 35, description: 'Madende dayanıklılık tüketimi -35% (o gün)' }
    },
    unlockSource: 'İsmail ile evlendikten sonra',
    description: 'İsmail’in öğrettiği, içi de bedeni de ateşleyen kuvvetli bir tencere aşı.'
  },
  {
    id: 'moonlight_sashimi',
    name: 'Ay Işığı Mezesi',
    ingredients: [
      { itemId: 'sturgeon', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 20,
      buff: { type: 'fishing', value: 3, description: 'Balıkçılık +3 (o gün)' }
    },
    unlockSource: 'Aylin ile evlendikten sonra',
    description: 'Aylin’in gece vakti sofraya koyduğu hafif ama kıymetli meze.'
  },
  {
    id: 'tea_banquet',
    name: 'Çay Sofrası',
    ingredients: [
      { itemId: 'tea', quantity: 3 },
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı x2 (o gün)' }
    },
    unlockSource: 'Bahar ile evlendikten sonra',
    description: 'Bahar’ın çaydan ilhamla kurduğu zarif bir sofra.'
  },
  {
    id: 'snow_plum_soup',
    name: 'Soğuk Gün Şerbeti',
    ingredients: [
      { itemId: 'snow_lotus', quantity: 1 },
      { itemId: 'honey', quantity: 2 }
    ],
    effect: {
      staminaRestore: 65,
      healthRestore: 35,
      buff: { type: 'luck', value: 3, description: 'Şans +3 (o gün)' }
    },
    unlockSource: 'Nazan ile evlendikten sonra',
    description: 'Nazan’ın ince zevkine yakışan, hafif ve zarif bir tatlı şerbet.'
  },
  {
    id: 'silk_dumpling',
    name: 'İnce İş Böreği',
    ingredients: [
      { itemId: 'silk', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'cabbage', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı x2 (o gün)' }
    },
    unlockSource: 'Suna ile evlendikten sonra',
    description: 'Suna’nın elinden çıkan, görüntüsü kadar tadı da ince bir börek.'
  },
  {
    id: 'drunken_chicken',
    name: 'Şaraplı Tavuk',
    ingredients: [
      { itemId: 'egg', quantity: 3 },
      { itemId: 'peach_wine', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 40,
      buff: { type: 'farming', value: 30, description: 'Tarla işlerinde dayanıklılık tüketimi -30% (o gün)' }
    },
    unlockSource: 'Zeyno ile evlendikten sonra',
    description: 'Zeyno’nun neşesi gibi sıcak, kokusu baş döndüren bir yemek.'
  },
  {
    id: 'scholars_porridge',
    name: 'Alim Aşı',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'tea', quantity: 1 },
      { itemId: 'ginseng', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 30,
      buff: { type: 'speed', value: 2, description: 'Hareket hızı +2 (o gün)' }
    },
    unlockSource: 'Cemil ile evlendikten sonra',
    description: 'Cemil’in eski usul tariflerle kaynattığı gönül açıcı bir aş.'
  },
  {
    id: 'ironforge_stew',
    name: 'Demir Ocağı Güveci',
    ingredients: [
      { itemId: 'potato', quantity: 3 },
      { itemId: 'corn', quantity: 2 },
      { itemId: 'iron_ore', quantity: 1 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 50,
      buff: { type: 'mining', value: 40, description: 'Madende dayanıklılık tüketimi -40% (o gün)' }
    },
    unlockSource: 'Demir ile evlendikten sonra',
    description: 'Demir’in doyurucu, ağır iş günlerine yaraşır güçlü güveci.'
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
      buff: { type: 'defense', value: 3, description: 'Savunma +3 (o gün)' }
    },
    unlockSource: 'Baran ile evlendikten sonra',
    description: 'Baran’ın dağlardan getirdiği malzemelerle yaptığı sert ama kuvvetli bir yemek.'
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
      buff: { type: 'farming', value: 25, description: 'Tarla işlerinde dayanıklılık tüketimi -25% (o gün)' }
    },
    unlockSource: 'İbo ile evlendikten sonra',
    description: 'İbo’nun çiftlikten çıkardığı mis gibi malzemelerle yaptığı sıcak çorba.'
  },
  {
    id: 'moonlit_tea_rice',
    name: 'Gece Çayı Aşı',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'tea', quantity: 2 },
      { itemId: 'bamboo_shoot', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'luck', value: 2, description: 'Şans +2 (o gün)' }
    },
    unlockSource: 'Mahir ile evlendikten sonra',
    description: 'Mahir’in ay ışığında hazırladığı hafif, dingin bir gece yemeği.'
  },

  // ==================== Tarla becerisi tarifleri ====================
  {
    id: 'pumpkin_pie',
    name: 'Balkabağı Çöreği',
    ingredients: [
      { itemId: 'pumpkin', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'farming', value: 15, description: 'Tarla işlerinde dayanıklılık tüketimi -15% (o gün)' }
    },
    unlockSource: 'Tarla işi 6. seviye',
    requiredSkill: { type: 'farming', level: 6 },
    description: 'Altın sarısı, yumuşacık bir balkabağı çöreği.'
  },
  {
    id: 'golden_fried_rice',
    name: 'Altın Pilav',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'egg', quantity: 2 },
      { itemId: 'corn', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'farming', value: 20, description: 'Tarla işlerinde dayanıklılık tüketimi -20% (o gün)' }
    },
    unlockSource: 'Tarla işi 7. seviye',
    requiredSkill: { type: 'farming', level: 7 },
    description: 'Taneleri tek tek parlayan, bereketli bir pilav.'
  },
  {
    id: 'supreme_farm_feast',
    name: 'Kır Şöleni',
    ingredients: [
      { itemId: 'pumpkin', quantity: 1 },
      { itemId: 'watermelon', quantity: 1 },
      { itemId: 'corn', quantity: 1 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 35,
      buff: { type: 'farming', value: 30, description: 'Tarla işlerinde dayanıklılık tüketimi -30% (o gün)' }
    },
    unlockSource: 'Tarla işi 9. seviye',
    requiredSkill: { type: 'farming', level: 9 },
    description: 'Dört mevsimin bereketini bir sofrada toplayan büyük şölen.'
  },

  // ==================== Balıkçılık tarifleri ====================
  {
    id: 'braised_catfish',
    name: 'Yayın Tenceresi',
    ingredients: [
      { itemId: 'catfish', quantity: 1 },
      { itemId: 'chili', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'fishing', value: 1, description: 'Balıkçılık +1 (o gün)' }
    },
    unlockSource: 'Balıkçılık 4. seviye',
    requiredSkill: { type: 'fishing', level: 4 },
    description: 'Az acılı, bol lezzetli yayın yemeği.'
  },
  {
    id: 'grilled_eel',
    name: 'Köz Yılanbalığı',
    ingredients: [
      { itemId: 'eel', quantity: 1 },
      { itemId: 'sesame', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'fishing', value: 2, description: 'Balıkçılık +2 (o gün)' }
    },
    unlockSource: 'Balıkçılık 5. seviye',
    requiredSkill: { type: 'fishing', level: 5 },
    description: 'Dışı nar gibi kızarmış, içi lokum bir köz balığı.'
  },
  {
    id: 'crab_soup',
    name: 'Yengeç Çorbası',
    ingredients: [
      { itemId: 'river_crab', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'luck', value: 15, description: 'Şans +15% (o gün)' }
    },
    unlockSource: 'Balıkçılık 6. seviye',
    requiredSkill: { type: 'fishing', level: 6 },
    description: 'Yoğun kıvamlı, bereketli bir yengeç çorbası.'
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
      buff: { type: 'fishing', value: 3, description: 'Balıkçılık +3 (o gün)' }
    },
    unlockSource: 'Balıkçılık 7. seviye',
    requiredSkill: { type: 'fishing', level: 7 },
    description: 'Kıymetli balıktan yapılan, sofraya şeref katan bir güveç.'
  },
  {
    id: 'dragon_sashimi',
    name: 'Efsane Balık Mezesi',
    ingredients: [
      { itemId: 'dragonfish', quantity: 1 },
      { itemId: 'ginger', quantity: 2 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 35,
      buff: { type: 'fishing', value: 4, description: 'Balıkçılık +4 (o gün)' }
    },
    unlockSource: 'Balıkçılık 8. seviye',
    requiredSkill: { type: 'fishing', level: 8 },
    description: 'Adı dilden dile dolaşan, pek nadir bir balıktan yapılan özel meze.'
  },

  // ==================== Madencilik tarifleri ====================
  {
    id: 'stone_soup',
    name: 'Maden Çorbası',
    ingredients: [
      { itemId: 'copper_ore', quantity: 2 },
      { itemId: 'radish', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 20 },
    unlockSource: 'Madencilik 3. seviye',
    requiredSkill: { type: 'mining', level: 3 },
    description: 'Maden ağzında eldekiyle yapılan sade ama işe yarar çorba.'
  },
  {
    id: 'crystal_jelly',
    name: 'Kristal Tatlısı',
    ingredients: [
      { itemId: 'crystal_ore', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 25,
      buff: { type: 'mining', value: 25, description: 'Madende dayanıklılık tüketimi -25% (o gün)' }
    },
    unlockSource: 'Madencilik 5. seviye',
    requiredSkill: { type: 'mining', level: 5 },
    description: 'Kristal gibi parlayan, tatlı ve serinletici bir yiyecek.'
  },
  {
    id: 'iron_tonic',
    name: 'Demir Güç Çorbası',
    ingredients: [
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 35,
      buff: { type: 'defense', value: 20, description: 'Alınan hasar -20% (o gün)' }
    },
    unlockSource: 'Madencilik 6. seviye',
    requiredSkill: { type: 'mining', level: 6 },
    description: 'Kemikleri güçlendirir, insanı dimdik tutar derler.'
  },
  {
    id: 'gold_dumpling',
    name: 'Altın Böreği',
    ingredients: [
      { itemId: 'gold_ore', quantity: 1 },
      { itemId: 'winter_wheat', quantity: 2 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'mining', value: 30, description: 'Madende dayanıklılık tüketimi -30% (o gün)' }
    },
    unlockSource: 'Madencilik 7. seviye',
    requiredSkill: { type: 'mining', level: 7 },
    description: 'Madencilerin gözdesi olmuş, kuvvet veren bir hamur işi.'
  },
  {
    id: 'void_essence_soup',
    name: 'Derinlik İksiri',
    ingredients: [
      { itemId: 'void_ore', quantity: 1 },
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'herb', quantity: 2 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 40,
      buff: { type: 'mining', value: 35, description: 'Madende dayanıklılık tüketimi -35% (o gün)' }
    },
    unlockSource: 'Madencilik 8. seviye',
    requiredSkill: { type: 'mining', level: 8 },
    description: 'Derinlikten gelen güçle hazırlanmış esrarengiz bir içecek.'
  },

  // ==================== Toplayıcılık tarifleri ====================
  {
    id: 'wild_salad',
    name: 'Kır Salatası',
    ingredients: [
      { itemId: 'herb', quantity: 2 },
      { itemId: 'wild_berry', quantity: 1 }
    ],
    effect: { staminaRestore: 20, healthRestore: 10 },
    unlockSource: 'Toplayıcılık 3. seviye',
    requiredSkill: { type: 'foraging', level: 3 },
    description: 'Dağ bayırdan toplanmış taptaze otlarla yapılan salata.'
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
      buff: { type: 'speed', value: 15, description: 'Hareket hızı +15% (o gün)' }
    },
    unlockSource: 'Toplayıcılık 4. seviye',
    requiredSkill: { type: 'foraging', level: 4 },
    description: 'Orman mantarlarıyla ağır ağır pişmiş nefis bir güveç.'
  },
  {
    id: 'forest_tonic',
    name: 'Orman Kuvvet Şerbeti',
    ingredients: [
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'wild_mushroom', quantity: 2 },
      { itemId: 'herb', quantity: 2 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 30,
      buff: { type: 'farming', value: 20, description: 'Tarla işlerinde dayanıklılık tüketimi -20% (o gün)' }
    },
    unlockSource: 'Toplayıcılık 7. seviye',
    requiredSkill: { type: 'foraging', level: 7 },
    description: 'Ormanın bereketinden güç alan kuvvetli bir karışım.'
  },
  {
    id: 'spirit_herb_elixir',
    name: 'Otacı İksiri',
    ingredients: [
      { itemId: 'ginseng', quantity: 2 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'luck', value: 25, description: 'Şans +25% (o gün)' }
    },
    unlockSource: 'Toplayıcılık 9. seviye',
    requiredSkill: { type: 'foraging', level: 9 },
    description: 'Toplayıcılıkta ustalaşanların bildiği, kudretli bir bitki iksiri.'
  },

  // ==================== Savaş tarifleri ====================
  {
    id: 'warrior_ration',
    name: 'Yiğit Azığı',
    ingredients: [
      { itemId: 'potato', quantity: 2 },
      { itemId: 'egg', quantity: 1 }
    ],
    effect: { staminaRestore: 25, healthRestore: 25 },
    unlockSource: 'Savaş 3. seviye',
    requiredSkill: { type: 'combat', level: 3 },
    description: 'Kavgaya girmeden önce insanı diri tutan sade azık.'
  },
  {
    id: 'battle_stew',
    name: 'Cenk Güveci',
    ingredients: [
      { itemId: 'chili', quantity: 1 },
      { itemId: 'potato', quantity: 1 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 30,
      buff: { type: 'defense', value: 15, description: 'Alınan hasar -15% (o gün)' }
    },
    unlockSource: 'Savaş 4. seviye',
    requiredSkill: { type: 'combat', level: 4 },
    description: 'Acısı insanı ayıltır, gücü yerine getirir.'
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
      buff: { type: 'defense', value: 20, description: 'Alınan hasar -20% (o gün)' }
    },
    unlockSource: 'Savaş 5. seviye',
    requiredSkill: { type: 'combat', level: 5 },
    description: 'İçen kendini taş gibi hisseder derler.'
  },
  {
    id: 'shadow_brew',
    name: 'Gölge Demi',
    ingredients: [
      { itemId: 'shadow_ore', quantity: 1 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 55,
      healthRestore: 40,
      buff: { type: 'defense', value: 25, description: 'Alınan hasar -25% (o gün)' }
    },
    unlockSource: 'Savaş 7. seviye',
    requiredSkill: { type: 'combat', level: 7 },
    description: 'Koyu renkli, sert içimli, cesaret veren bir dem.'
  },
  {
    id: 'void_elixir',
    name: 'Derinlik İksiri',
    ingredients: [
      { itemId: 'void_ore', quantity: 1 },
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'shadow_ore', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 50,
      buff: { type: 'defense', value: 30, description: 'Alınan hasar -30% (o gün)' }
    },
    unlockSource: 'Savaş 9. seviye',
    requiredSkill: { type: 'combat', level: 9 },
    description: 'Savaşta ustalaşanların bildiği son kuvvet iksiri.'
  },

  // ==================== Mevsimlik / şenlik tarifleri ====================
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
      buff: { type: 'speed', value: 15, description: 'Hareket hızı +15% (o gün)' }
    },
    unlockSource: 'Bahar şenliği ödülü',
    description: 'Baharın gelişini kutlamak için yapılan çıtır börek.'
  },
  {
    id: 'lotus_lantern_cake',
    name: 'Fener Tatlısı',
    ingredients: [
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'luck', value: 15, description: 'Şans +15% (o gün)' }
    },
    unlockSource: 'Fener gecesi ödülü',
    description: 'Şenlik gecelerinde yapılan, hafif tatlı bir ikram.'
  },
  {
    id: 'harvest_feast',
    name: 'Hasat Sofrası',
    ingredients: [
      { itemId: 'pumpkin', quantity: 1 },
      { itemId: 'sweet_potato', quantity: 1 },
      { itemId: 'corn', quantity: 1 },
      { itemId: 'firewood', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'farming', value: 20, description: 'Tarla işlerinde dayanıklılık tüketimi -20% (o gün)' }
    },
    unlockSource: 'Hasat şöleni ödülü',
    description: 'Bereketli günlerin anısına kurulan büyük bir sofra.'
  },
  {
    id: 'new_year_dumpling',
    name: 'Yılbaşı Böreği',
    ingredients: [
      { itemId: 'winter_wheat', quantity: 3 },
      { itemId: 'napa_cabbage', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'luck', value: 20, description: 'Şans +20% (o gün)' }
    },
    unlockSource: 'Yıl sonu nöbeti ödülü',
    description: 'Yeni yıla girerken yapılan uğurlu börek.'
  },

  // ==================== Yeni şenlik tarifleri ====================
  {
    id: 'nian_gao',
    name: 'Bereket Keki',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 15,
      buff: { type: 'farming', value: 10, description: 'Tarla işlerinde dayanıklılık tüketimi -10% (o gün)' }
    },
    unlockSource: 'Yılbaşı ödülü',
    description: 'Yeni yılın bereketini çağırdığı söylenen tatlı kek.'
  },
  {
    id: 'hua_gao',
    name: 'Çiçek Tatlısı',
    ingredients: [
      { itemId: 'peach', quantity: 2 },
      { itemId: 'rice', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 10,
      buff: { type: 'luck', value: 10, description: 'Şans +10% (o gün)' }
    },
    unlockSource: 'Çiçek bayramı ödülü',
    description: 'İçine tazelik sinmiş, zarif bir bayram tatlısı.'
  },
  {
    id: 'qing_tuan',
    name: 'Otlu Kömbe',
    ingredients: [
      { itemId: 'herb', quantity: 2 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 10,
      buff: { type: 'farming', value: 15, description: 'Tarla işlerinde dayanıklılık tüketimi -15% (o gün)' }
    },
    unlockSource: 'Bahar gezisi ödülü',
    description: 'Ot kokulu, hafif ve hoş bir hamur işi.'
  },
  {
    id: 'yue_bing',
    name: 'Ay Çöreği',
    ingredients: [
      { itemId: 'lotus_seed', quantity: 2 },
      { itemId: 'sesame_oil', quantity: 1 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'luck', value: 15, description: 'Şans +15% (o gün)' }
    },
    unlockSource: 'Ay izleme gecesi ödülü',
    description: 'Dolunay gecesine yakışan, tatlı ve ince bir çörek.'
  },
  {
    id: 'la_ba_zhou',
    name: 'Kış Aşı',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'peanut', quantity: 1 },
      { itemId: 'wild_berry', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25
    },
    unlockSource: 'Kış aşı günü ödülü',
    description: 'Soğuk günlerde mideyi ve içi ısıtan koyu bir aş.'
  },
  {
    id: 'dragon_boat_zongzi',
    name: 'Sarma Azık',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'bamboo_shoot', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'speed', value: 10, description: 'Hareket hızı +10% (o gün)' }
    },
    unlockSource: 'Yarış günü ödülü',
    description: 'Sarıp sarmalanmış, yolda yenmelik nefis bir azık.'
  },
  {
    id: 'qiao_guo',
    name: 'İnce İş Kurabiyesi',
    ingredients: [
      { itemId: 'winter_wheat', quantity: 2 },
      { itemId: 'honey', quantity: 1 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 10,
      buff: { type: 'fishing', value: 1, description: 'Balıkçılık +1 (o gün)' }
    },
    unlockSource: 'Bilmece gecesi ödülü',
    description: 'İnce işçilik isteyen, kıtır kıtır bir bayram kurabiyesi.'
  },
  {
    id: 'chrysanthemum_wine',
    name: 'Kasımpatı Şerbeti',
    ingredients: [
      { itemId: 'chrysanthemum', quantity: 3 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 40,
      healthRestore: 20,
      buff: { type: 'luck', value: 12, description: 'Şans +12% (o gün)' }
    },
    unlockSource: 'Güz şenliği ödülü',
    description: 'Güz vakti içilen, ferah ve uğurlu bir içecek.'
  },
  {
    id: 'jiaozi',
    name: 'Kış Böreği',
    ingredients: [
      { itemId: 'winter_wheat', quantity: 2 },
      { itemId: 'napa_cabbage', quantity: 2 }
    ],
    effect: {
      staminaRestore: 45,
      healthRestore: 20,
      buff: { type: 'mining', value: 1, description: 'Madencilik +1 (o gün)' }
    },
    unlockSource: 'Kış dönümü ödülü',
    description: 'Soğuk günlerde sofraya sıcaklık getiren bir börek.'
  },
  {
    id: 'tangyuan',
    name: 'Ballı Topçuklar',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'honey', quantity: 1 },
      { itemId: 'peanut', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 25,
      buff: { type: 'all_skills', value: 1, description: 'Tüm beceriler +1 (o gün)' }
    },
    unlockSource: 'Yıl sonu havai fişek gecesi ödülü',
    description: 'Birlik ve dirliği simgeleyen tatlı toplar.'
  },
  {
    id: 'dou_cha_yin',
    name: 'Çay Ustası Demliği',
    ingredients: [
      { itemId: 'tea', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'all_skills', value: 1, description: 'Tüm beceriler +1 (o gün)' }
    },
    unlockSource: 'Çay demleme yarışması ödülü',
    description: 'İnsanın içine ferahlık veren, ustalık işi bir çay.'
  },
  {
    id: 'zhi_yuan_gao',
    name: 'Rüzgâr Tatlısı',
    ingredients: [
      { itemId: 'rice', quantity: 2 },
      { itemId: 'peach', quantity: 1 },
      { itemId: 'sesame_oil', quantity: 1 }
    ],
    effect: {
      staminaRestore: 35,
      healthRestore: 15,
      buff: { type: 'speed', value: 12, description: 'Hareket hızı +12% (o gün)' }
    },
    unlockSource: 'Uçurtma şenliği ödülü',
    description: 'Şenlik günlerinde yapılan, hafif ve neşeli bir tatlı.'
  },

  // ==================== Başarı / dönüm noktası tarifleri ====================
  {
    id: 'first_catch_soup',
    name: 'İlk Balık Çorbası',
    ingredients: [
      { itemId: 'crucian', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: { staminaRestore: 20, healthRestore: 10 },
    unlockSource: 'Başarım: ilk balık',
    description: 'İlk balığın anısına pişirilen mütevazı çorba.'
  },
  {
    id: 'bountiful_porridge',
    name: 'Bereket Lapası',
    ingredients: [
      { itemId: 'rice', quantity: 3 },
      { itemId: 'jujube', quantity: 2 }
    ],
    effect: { staminaRestore: 40, healthRestore: 20 },
    unlockSource: 'Başarım: 100 kez hasat',
    description: 'Bol mahsulün sevincini kutlayan tatlı bir lapa.'
  },
  {
    id: 'miners_glory',
    name: 'Madenci Şerefi',
    ingredients: [
      { itemId: 'gold_ore', quantity: 1 },
      { itemId: 'egg', quantity: 2 },
      { itemId: 'rice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 50,
      healthRestore: 30,
      buff: { type: 'mining', value: 25, description: 'Madende dayanıklılık tüketimi -25% (o gün)' }
    },
    unlockSource: 'Başarım: maden 30. kat',
    description: 'Derine inenlerin hak ettiği kuvvetli bir öğün.'
  },
  {
    id: 'chef_special',
    name: 'Usta Sofrası',
    ingredients: [
      { itemId: 'egg', quantity: 2 },
      { itemId: 'honey', quantity: 1 },
      { itemId: 'sesame', quantity: 2 }
    ],
    effect: { staminaRestore: 45, healthRestore: 20 },
    unlockSource: 'Başarım: 20 yemek pişir',
    description: 'Mutfağa eli yatkın olanların çıkarabildiği özel bir tabak.'
  },
  {
    id: 'social_tea',
    name: 'Gönül Çayı',
    ingredients: [
      { itemId: 'osmanthus', quantity: 2 },
      { itemId: 'honey', quantity: 1 }
    ],
    effect: {
      staminaRestore: 30,
      healthRestore: 15,
      buff: { type: 'giftBonus', value: 2, description: 'Hediye yakınlığı x2 (o gün)' }
    },
    unlockSource: 'Başarım: 3 NPC ile can dost ol',
    description: 'İnsan ilişkilerini kuvvetlendiren ince içimli bir çay.'
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
      buff: { type: 'fishing', value: 2, description: 'Balıkçılık +2 (o gün)' }
    },
    unlockSource: 'Başarım: 20 balık yakala',
    description: 'Irmaktan çıkan nimetlerle hazırlanmış zengin bir tabak.'
  },
  {
    id: 'legendary_feast',
    name: 'Efsane Sofra',
    ingredients: [
      { itemId: 'jade_dragon', quantity: 1 },
      { itemId: 'ginger', quantity: 2 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'fishing', value: 4, description: 'Balıkçılık +4 (o gün)' }
    },
    unlockSource: 'Başarım: efsane balık yakala',
    description: 'Adı dilden dile dolaşan balıktan çıkan, unutulmaz bir sofra.'
  },
  {
    id: 'abyss_stew',
    name: 'Dip Güveci',
    ingredients: [
      { itemId: 'shadow_ore', quantity: 1 },
      { itemId: 'crystal_shrimp', quantity: 1 },
      { itemId: 'herb', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 35,
      buff: { type: 'defense', value: 20, description: 'Alınan hasar -20% (o gün)' }
    },
    unlockSource: 'Başarım: maden 50. kat',
    description: 'Derinlere inenlerin, geri dönünce pişirdiği sert ama kıymetli yemek.'
  },
  {
    id: 'collectors_banquet',
    name: 'Koleksiyoncu Sofrası',
    ingredients: [
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'sturgeon', quantity: 1 },
      { itemId: 'pumpkin', quantity: 1 },
      { itemId: 'rice', quantity: 2 }
    ],
    effect: {
      staminaRestore: 80,
      healthRestore: 40,
      buff: { type: 'luck', value: 25, description: 'Şans +25% (o gün)' }
    },
    unlockSource: 'Başarım: 50 eşya keşfet',
    description: 'Nadir bulunan nimetlerle kurulmuş görkemli bir sofra.'
  },

  // ===== Hayvansal ürün tarifleri =====
  {
    id: 'silkie_egg_soup',
    name: 'Kara Tavuk Yumurtası Çorbası',
    ingredients: [
      { itemId: 'silkie_egg', quantity: 2 },
      { itemId: 'ginger', quantity: 1 }
    ],
    effect: { staminaRestore: 50, healthRestore: 30 },
    unlockSource: 'Başlangıçta açık',
    description: 'Besleyici, şifalı bir yumurta çorbası.'
  },
  {
    id: 'goat_milk_soup',
    name: 'Keçi Sütü Çorbası',
    ingredients: [
      { itemId: 'goat_milk', quantity: 2 },
      { itemId: 'herb', quantity: 1 }
    ],
    effect: { staminaRestore: 45, healthRestore: 25 },
    unlockSource: 'İbo ile en iyi dost olunca',
    description: 'Ilık içimli, besleyici bir süt çorbası.'
  },
  {
    id: 'truffle_fried_rice',
    name: 'Trüflü Pilav',
    ingredients: [
      { itemId: 'truffle', quantity: 1 },
      { itemId: 'rice', quantity: 1 },
      { itemId: 'egg', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'farming', value: 1, description: 'Tarla işi +1 (o gün)' }
    },
    unlockSource: 'İbo ile can dost olunca',
    description: 'Kokusu uzaktan duyulan, pek kıymetli bir pilav.'
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
      buff: { type: 'stamina', value: 100, description: 'Dayanıklılık tamamen dolar' }
    },
    unlockSource: 'Hekim Dede ile can dost olunca',
    description: 'Bir tası insanı dipten ayağa kaldıran güçlü bir şifa çorbası.'
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
      buff: { type: 'speed', value: 15, description: 'Hareket hızı +15% (o gün)' }
    },
    unlockSource: 'Hasan Enişte ile en iyi dost olunca',
    description: 'Kıvamlı, yumuşak içimli, farklı tadıyla şaşırtan bir çay.'
  },
  {
    id: 'peacock_feast',
    name: 'Saray Sofrası',
    ingredients: [
      { itemId: 'peacock_feather', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'osmanthus', quantity: 1 }
    ],
    effect: {
      staminaRestore: 90,
      healthRestore: 50,
      buff: { type: 'all_skills', value: 1, description: 'Tüm beceriler +1 (o gün)' }
    },
    unlockSource: 'Evlilikten sonra açılır',
    description: 'Gösterişli, kıymetli ve şanına yaraşır bir büyük sofra.'
  },

  // === Çöl / kervan yolu tarifleri ===
  {
    id: 'spiced_lamb',
    name: 'Baharatlı Kuzu',
    ingredients: [
      { itemId: 'hanhai_spice', quantity: 1 },
      { itemId: 'goat_milk', quantity: 1 }
    ],
    effect: {
      staminaRestore: 60,
      healthRestore: 30,
      buff: { type: 'mining', value: 2, description: 'Madencilik +2 (o gün)' }
    },
    unlockSource: 'Kervan durağından baharat alındıktan sonra',
    description: 'Uzak diyar kokusu taşıyan, kuvvet veren baharatlı kuzu.'
  },
  {
    id: 'silk_dumpling_deluxe',
    name: 'İpek Yolu Böreği',
    ingredients: [
      { itemId: 'hanhai_silk', quantity: 1 },
      { itemId: 'rice', quantity: 2 },
      { itemId: 'hanhai_spice', quantity: 1 }
    ],
    effect: {
      staminaRestore: 70,
      healthRestore: 35,
      buff: { type: 'giftBonus', value: 3, description: 'Hediye yakınlığı x3 (o gün)' }
    },
    unlockSource: 'Kervan durağından ipek alındıktan sonra',
    description: 'İnce, gösterişli ve ikrama çok yaraşan özel bir börek.'
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
      buff: { type: 'stamina', value: 30, description: 'Maksimum dayanıklılık +30 (o gün)' }
    },
    unlockSource: 'Kaktüs hasat edilince',
    description: 'Çöl yolcusunu ayakta tutan ferahlatıcı bir çorba.'
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
      buff: { type: 'farming', value: 2, description: 'Tarla işi +2 (o gün)' }
    },
    unlockSource: 'Hurma hasat edilince',
    description: 'Tatlı, yumuşak ve insana kuvvet veren bir hurma keki.'
  }
]

/** ID’ye göre tarif getir */
export const getRecipeById = (id: string): RecipeDef | undefined => {
  return RECIPES.find(r => r.id === id)
      }
