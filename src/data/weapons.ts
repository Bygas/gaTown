import type { WeaponDef, EnchantmentDef, WeaponType } from '@/types'

/** Büyü tanımları */
export const ENCHANTMENTS: Record<string, EnchantmentDef> = {
  sharp: {
    id: 'sharp',
    name: 'Keskin',
    description: 'Saldırı gücü +3',
    attackBonus: 3,
    critBonus: 0,
    special: null
  },
  fierce: {
    id: 'fierce',
    name: 'Alevli',
    description: 'Saldırı gücü +5',
    attackBonus: 5,
    critBonus: 0,
    special: null
  },
  precise: {
    id: 'precise',
    name: 'İsabetli',
    description: 'Kritik vuruş oranı +%10',
    attackBonus: 0,
    critBonus: 0.1,
    special: null
  },
  vampiric: {
    id: 'vampiric',
    name: 'Vampirik',
    description: 'Verilen hasarın %15’i kadar HP yeniler',
    attackBonus: 0,
    critBonus: 0,
    special: 'vampiric'
  },
  sturdy: {
    id: 'sturdy',
    name: 'Dayanıklı',
    description: 'Alınan hasar -%15',
    attackBonus: 0,
    critBonus: 0,
    special: 'sturdy'
  },
  lucky: {
    id: 'lucky',
    name: 'Şanslı',
    description: 'Canavar ganimet düşme oranı +%20',
    attackBonus: 0,
    critBonus: 0,
    special: 'lucky'
  }
}

/** Rastgele büyü için kullanılabilecek ID listesi */
const RANDOM_ENCHANT_IDS = ['sharp', 'fierce', 'precise', 'vampiric', 'sturdy', 'lucky']

/** Rastgele bir büyü al (%30 olasılıkla tetiklenir) */
export const rollRandomEnchantment = (): string | null => {
  if (Math.random() >= 0.3) return null
  return RANDOM_ENCHANT_IDS[Math.floor(Math.random() * RANDOM_ENCHANT_IDS.length)]!
}

/** Silah türü adları */
export const WEAPON_TYPE_NAMES: Record<WeaponType, string> = {
  sword: 'Kılıç',
  dagger: 'Hançer',
  club: 'Topuz'
}

/** Tüm silah tanımları */
export const WEAPONS: Record<string, WeaponDef> = {
  // === Mağazada satın alınabilir ===
  wooden_stick: {
    id: 'wooden_stick',
    name: 'Tahta Sopa',
    type: 'club',
    attack: 5,
    critRate: 0.02,
    description: 'Yerden rastgele alınmış bir sopa, yoktan iyidir.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  copper_sword: {
    id: 'copper_sword',
    name: 'Bakır Kılıç',
    type: 'sword',
    attack: 12,
    critRate: 0.05,
    description: 'Bakırdan dövülmüş kısa kılıç, güvenilir bir başlangıç silahı.',
    shopPrice: 300,
    shopMaterials: [{ itemId: 'copper_ore', quantity: 5 }],
    fixedEnchantment: null
  },
  iron_blade: {
    id: 'iron_blade',
    name: 'Demir Kılıç',
    type: 'sword',
    attack: 18,
    critRate: 0.05,
    description: 'İşlenmiş demirden yapılmış uzun kılıç, keskin ve sağlam.',
    shopPrice: 800,
    shopMaterials: [{ itemId: 'iron_ore', quantity: 5 }],
    fixedEnchantment: null
  },
  war_hammer: {
    id: 'war_hammer',
    name: 'Savaş Çekici',
    type: 'club',
    attack: 22,
    critRate: 0.03,
    description: 'Ağır demir çekici, tek vuruşta taşı parçalar.',
    shopPrice: 1200,
    shopMaterials: [{ itemId: 'iron_ore', quantity: 8 }],
    fixedEnchantment: null
  },
  gold_halberd: {
    id: 'gold_halberd',
    name: 'Altın Teber',
    type: 'sword',
    attack: 28,
    critRate: 0.08,
    description: 'Altın ışıklarla parlayan uzun teber, olağanüstü güçlüdür.',
    shopPrice: 2500,
    shopMaterials: [{ itemId: 'gold_ore', quantity: 8 }],
    fixedEnchantment: null
  },

  // === Canavar düşürür ===
  bone_dagger: {
    id: 'bone_dagger',
    name: 'Kemik Hançer',
    type: 'dagger',
    attack: 9,
    critRate: 0.15,
    description: 'Canavar kemiklerinden yapılmış hançer, son derece keskin.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  frost_dagger: {
    id: 'frost_dagger',
    name: 'Buz Hançeri',
    type: 'dagger',
    attack: 16,
    critRate: 0.18,
    description: 'Buzdan oluşmuş hançer, dokununca iliklere işler.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  shadow_blade: {
    id: 'shadow_blade',
    name: 'Gölge Kılıcı',
    type: 'dagger',
    attack: 24,
    critRate: 0.22,
    description: 'Gölgelerden oluşan bıçak, görünmeden öldürür.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },

  // === BOSS düşürür (sabit büyü) ===
  mud_king_fang: {
    id: 'mud_king_fang',
    name: 'Çamur Kralın Dişi',
    type: 'sword',
    attack: 20,
    critRate: 0.12,
    description: 'Çamur kayası yaratığının dişinden dövüldü, ölümcül ve kan emici.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'vampiric'
  },
  frost_queen_sting: {
    id: 'frost_queen_sting',
    name: 'Buz Kraliçesinin İğnesi',
    type: 'dagger',
    attack: 19,
    critRate: 0.25,
    description: 'Buz kraliçesinden kalan ölümcül diken, asla şaşmaz.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'precise'
  },
  lava_lord_maul: {
    id: 'lava_lord_maul',
    name: 'Lav Çekici',
    type: 'club',
    attack: 38,
    critRate: 0.08,
    description: 'Lav efendisinin asası, ateş gibi yakıcı.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'fierce'
  },

  // === Yeni bölge canavar düşürür ===
  crystal_shard_dagger: {
    id: 'crystal_shard_dagger',
    name: 'Kristal Diken Hançeri',
    type: 'dagger',
    attack: 30,
    critRate: 0.2,
    description: 'Kristal parçalarından oluşmuş keskin bir hançer.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  shadow_katana: {
    id: 'shadow_katana',
    name: 'Gölge Katana',
    type: 'sword',
    attack: 35,
    critRate: 0.1,
    description: 'Gölge yarığından ortaya çıkan katana, ışığı bile biçer.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  void_hammer: {
    id: 'void_hammer',
    name: 'Boşluk Çekici',
    type: 'club',
    attack: 48,
    critRate: 0.05,
    description: 'Uçurum gücüyle doldurulmuş savaş çekici, olağanüstü ağırdır.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },

  // === Yeni bölge mağaza silahları ===
  crystal_blade: {
    id: 'crystal_blade',
    name: 'Kristal Uzun Kılıç',
    type: 'sword',
    attack: 35,
    critRate: 0.08,
    description: 'Kristal cevherinden dövülmüş uzun kılıç, yedi renkli ışık saçar.',
    shopPrice: 5000,
    shopMaterials: [{ itemId: 'crystal_ore', quantity: 8 }],
    fixedEnchantment: null
  },
  shadow_mace: {
    id: 'shadow_mace',
    name: 'Gölge Çekici',
    type: 'club',
    attack: 42,
    critRate: 0.05,
    description: 'Gölge cevherinden dövülmüş ağır tokmak, tek darbede düşmanı ezer.',
    shopPrice: 8000,
    shopMaterials: [{ itemId: 'shadow_ore', quantity: 8 }],
    fixedEnchantment: null
  },
  void_katana: {
    id: 'void_katana',
    name: 'Boşluk Katanası',
    type: 'sword',
    attack: 52,
    critRate: 0.1,
    description: 'Boşluk cevheriyle işlenmiş üstün bir katana, göğü bile yarar.',
    shopPrice: 15000,
    shopMaterials: [{ itemId: 'void_ore', quantity: 10 }],
    fixedEnchantment: null
  },

  // === Yeni bölge BOSS düşürür (sabit büyü) ===
  crystal_king_blade: {
    id: 'crystal_king_blade',
    name: 'Kristal Kralın Kutsal Kılıcı',
    type: 'sword',
    attack: 45,
    critRate: 0.15,
    description: 'Kristal kraldan kalan kutsal kılıç, şans ışığıyla çevrilidir.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'lucky'
  },
  shadow_sovereign_fang: {
    id: 'shadow_sovereign_fang',
    name: 'Gölge Dişi',
    type: 'dagger',
    attack: 38,
    critRate: 0.3,
    description: 'Gölge hükümdarının dişlerinden yapıldı, kana doymak bilmez.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'vampiric'
  },
  abyss_dragon_mace: {
    id: 'abyss_dragon_mace',
    name: 'Ejderha Kral Asası',
    type: 'club',
    attack: 60,
    critRate: 0.12,
    description: 'Uçurum ejderha kralının asası, her şeyi kül eder.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'fierce'
  },

  // === Yeni mağaza silahları ===
  bamboo_staff: {
    id: 'bamboo_staff',
    name: 'Bambu Asa',
    type: 'club',
    attack: 10,
    critRate: 0.03,
    description: 'Sağlam bambudan oyulmuş uzun asa, hafif ve kullanışlı.',
    shopPrice: 400,
    shopMaterials: [{ itemId: 'bamboo', quantity: 5 }],
    fixedEnchantment: null
  },
  iron_dagger: {
    id: 'iron_dagger',
    name: 'Demir Hançer',
    type: 'dagger',
    attack: 14,
    critRate: 0.15,
    description: 'İnce işlenmiş demir hançer, çok hızlı kullanılır.',
    shopPrice: 600,
    shopMaterials: [{ itemId: 'iron_ore', quantity: 3 }],
    fixedEnchantment: null
  },
  golden_fan: {
    id: 'golden_fan',
    name: 'Altın Yelpaze',
    type: 'sword',
    attack: 26,
    critRate: 0.1,
    description: 'Altın işlemeli savaş yelpazesi, açılınca bıçak, kapanınca sopa olur.',
    shopPrice: 2000,
    shopMaterials: [{ itemId: 'gold_ore', quantity: 5 }],
    fixedEnchantment: null
  },
  obsidian_blade: {
    id: 'obsidian_blade',
    name: 'Obsidyen Kılıç',
    type: 'sword',
    attack: 38,
    critRate: 0.08,
    description: 'Obsidyenden dövülmüş eğri kılıç, metali bile tereyağı gibi keser.',
    shopPrice: 4000,
    shopMaterials: [{ itemId: 'shadow_ore', quantity: 5 }],
    fixedEnchantment: null
  },

  // === Yeni canavar düşürme silahları ===
  slime_mace: {
    id: 'slime_mace',
    name: 'Balçık Tokmağı',
    type: 'club',
    attack: 7,
    critRate: 0.02,
    description: 'Donmuş balçık çekirdeği, beklenmedik şekilde ağırdır.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  magma_blade: {
    id: 'magma_blade',
    name: 'Magma Kılıcı',
    type: 'sword',
    attack: 21,
    critRate: 0.08,
    description: 'Magmadan donmuş kısa bıçak, hâlâ sıcaklık yayar.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  prism_dagger: {
    id: 'prism_dagger',
    name: 'Prizma Hançeri',
    type: 'dagger',
    attack: 28,
    critRate: 0.22,
    description: 'Kristal parçalarından doğal olarak oluşmuş keskin bir hançer.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  void_fang_dagger: {
    id: 'void_fang_dagger',
    name: 'Boşluk Dişi',
    type: 'dagger',
    attack: 42,
    critRate: 0.25,
    description: 'Uçurum yılanının zehirli dişi, aşındırıcı güç taşır.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },

  // === Hazine sandığı silahları ===
  jade_sword: {
    id: 'jade_sword',
    name: 'Yeşim Kılıç',
    type: 'sword',
    attack: 22,
    critRate: 0.1,
    description: 'Hazine sandığında uyuyan antik kılıç, yeşil ışıkla parlar.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  ancient_blade: {
    id: 'ancient_blade',
    name: 'Antik Kutsal Kılıç',
    type: 'sword',
    attack: 50,
    critRate: 0.15,
    description: 'Kadim harabelerde bulunan gizemli uzun kılıç, gücünü hâlâ korur.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },

  // === Lonca özel ===
  guild_war_blade: {
    id: 'guild_war_blade',
    name: 'Lonca Savaş Kılıcı',
    type: 'sword',
    attack: 36,
    critRate: 0.1,
    description: 'Maceracılar Loncası tarafından seçkin üyeler için dövülmüş kılıç, üzerinde lonca amblemi vardır.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  }
}

export const SHOP_WEAPONS: WeaponDef[] = Object.values(WEAPONS).filter(w => w.shopPrice !== null)

/** Bölgelere göre canavarların düşürebileceği silah ID’leri */
export const MONSTER_DROP_WEAPONS: Record<string, { weaponId: string; chance: number }[]> = {
  shallow: [
    { weaponId: 'bone_dagger', chance: 0.05 },
    { weaponId: 'slime_mace', chance: 0.03 }
  ],
  frost: [{ weaponId: 'frost_dagger', chance: 0.05 }],
  lava: [
    { weaponId: 'shadow_blade', chance: 0.05 },
    { weaponId: 'magma_blade', chance: 0.04 }
  ],
  crystal: [
    { weaponId: 'crystal_shard_dagger', chance: 0.05 },
    { weaponId: 'prism_dagger', chance: 0.04 }
  ],
  shadow: [{ weaponId: 'shadow_katana', chance: 0.05 }],
  abyss: [
    { weaponId: 'void_hammer', chance: 0.05 },
    { weaponId: 'void_fang_dagger', chance: 0.03 }
  ]
}

/** BOSS düşürme silah eşlemesi */
export const BOSS_DROP_WEAPONS: Record<number, string> = {
  20: 'mud_king_fang',
  40: 'frost_queen_sting',
  60: 'lava_lord_maul',
  80: 'crystal_king_blade',
  100: 'shadow_sovereign_fang',
  120: 'abyss_dragon_mace'
}

/** ID’ye göre silah tanımını al */
export const getWeaponById = (id: string): WeaponDef | undefined => {
  return WEAPONS[id]
}

/** ID’ye göre büyü tanımını al */
export const getEnchantmentById = (id: string): EnchantmentDef | undefined => {
  return ENCHANTMENTS[id]
}

/** Silah satış fiyatını hesapla */
export const getWeaponSellPrice = (defId: string, enchantmentId: string | null): number => {
  const def = WEAPONS[defId]
  if (!def) return 0
  const base = def.shopPrice ? Math.floor(def.shopPrice * 0.5) : def.attack * 15
  // Büyü ek fiyatı
  if (enchantmentId) {
    const enchant = ENCHANTMENTS[enchantmentId]
    if (enchant) return base + 100 + enchant.attackBonus * 20
  }
  return base
}

/** Büyülü silahın görüntü adını al */
export const getWeaponDisplayName = (defId: string, enchantmentId: string | null): string => {
  const weapon = WEAPONS[defId]
  if (!weapon) return defId
  if (!enchantmentId) return weapon.name
  const enchant = ENCHANTMENTS[enchantmentId]
  if (!enchant) return weapon.name
  return `${enchant.name} ${weapon.name}`
}

/** Hazine sandığından düşen silahlar (maden bölgesine göre) */
export const TREASURE_DROP_WEAPONS: Record<string, { weaponId: string; chance: number }[]> = {
  shallow: [],
  frost: [{ weaponId: 'jade_sword', chance: 0.05 }],
  lava: [{ weaponId: 'jade_sword', chance: 0.04 }],
  crystal: [],
  shadow: [{ weaponId: 'ancient_blade', chance: 0.03 }],
  abyss: [{ weaponId: 'ancient_blade', chance: 0.025 }]
}
