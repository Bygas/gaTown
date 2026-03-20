import type { WeaponDef, EnchantmentDef, WeaponType } from '@/types'

/** Tılsım tanımları */
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
    name: 'Harlı',
    description: 'Saldırı gücü +5',
    attackBonus: 5,
    critBonus: 0,
    special: null
  },
  precise: {
    id: 'precise',
    name: 'Nokta Atışı',
    description: 'Kritik vuruş oranı +%10',
    attackBonus: 0,
    critBonus: 0.1,
    special: null
  },
  vampiric: {
    id: 'vampiric',
    name: 'Kan Emici',
    description: 'Verilen hasarın %15’i kadar can yeniler',
    attackBonus: 0,
    critBonus: 0,
    special: 'vampiric'
  },
  sturdy: {
    id: 'sturdy',
    name: 'Çelik Gibi',
    description: 'Alınan hasar -%15',
    attackBonus: 0,
    critBonus: 0,
    special: 'sturdy'
  },
  lucky: {
    id: 'lucky',
    name: 'Kutlu',
    description: 'Canavar ganimeti düşme oranı +%20',
    attackBonus: 0,
    critBonus: 0,
    special: 'lucky'
  }
}

/** Rastgele tılsım için kullanılabilecek ID listesi */
const RANDOM_ENCHANT_IDS = ['sharp', 'fierce', 'precise', 'vampiric', 'sturdy', 'lucky']

/** Rastgele bir tılsım al (%30 olasılıkla tetiklenir) */
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
  // === Dükkânda satılır ===
  wooden_stick: {
    id: 'wooden_stick',
    name: 'Çoban Sopası',
    type: 'club',
    attack: 5,
    critRate: 0.02,
    description: 'Yerden kapılmış sıradan bir değnek, elde hiç yoksa işe yarar.',
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
    description: 'Bakırdan dövülmüş kısa kılıç, yolun başı için güvenilir bir silahtır.',
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
    description: 'İşlenmiş demirden yapılmış uzun kılıç, hem keskin hem sağlamdır.',
    shopPrice: 800,
    shopMaterials: [{ itemId: 'iron_ore', quantity: 5 }],
    fixedEnchantment: null
  },
  war_hammer: {
    id: 'war_hammer',
    name: 'Cenk Çekici',
    type: 'club',
    attack: 22,
    critRate: 0.03,
    description: 'Ağır bir savaş çekici, tek vuruşta taşı tuzla buz eder.',
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
    description: 'Altın parıltıyla ışıldayan uzun teber, pek kudretlidir.',
    shopPrice: 2500,
    shopMaterials: [{ itemId: 'gold_ore', quantity: 8 }],
    fixedEnchantment: null
  },

  // === Canavardan düşer ===
  bone_dagger: {
    id: 'bone_dagger',
    name: 'Kemik Hançer',
    type: 'dagger',
    attack: 9,
    critRate: 0.15,
    description: 'Canavar kemiğinden yapılmış hançer, beklenmedik kadar keskindir.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  frost_dagger: {
    id: 'frost_dagger',
    name: 'Ayaz Hançeri',
    type: 'dagger',
    attack: 16,
    critRate: 0.18,
    description: 'Buzdan yoğrulmuş bu hançer, değdiği yere soğuk işler.',
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
    description: 'Gölgelerden biçim almış bıçak, sessiz ve sinsi vurur.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },

  // === BOSS düşürür (sabit tılsım) ===
  mud_king_fang: {
    id: 'mud_king_fang',
    name: 'Çamur Han’ın Dişi',
    type: 'sword',
    attack: 20,
    critRate: 0.12,
    description: 'Çamur yaratığının dişinden dövüldü, hem ölümcül hem kana susamış.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'vampiric'
  },
  frost_queen_sting: {
    id: 'frost_queen_sting',
    name: 'Ayaz Sultan’ın İğnesi',
    type: 'dagger',
    attack: 19,
    critRate: 0.25,
    description: 'Buz sultanından arta kalmış öldürücü diken, pek az şaşar.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'precise'
  },
  lava_lord_maul: {
    id: 'lava_lord_maul',
    name: 'Kor Çekici',
    type: 'club',
    attack: 38,
    critRate: 0.08,
    description: 'Lav efendisinin tokmağı, ateş gibi yakıcıdır.',
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
    description: 'Kristal kırıklarından biçim almış, jilet gibi bir hançer.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  shadow_katana: {
    id: 'shadow_katana',
    name: 'Gölge Yatağanı',
    type: 'sword',
    attack: 35,
    critRate: 0.1,
    description: 'Gölge yarığından doğmuş bu kılıç, ışığı bile biçer.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  void_hammer: {
    id: 'void_hammer',
    name: 'Uçurum Çekici',
    type: 'club',
    attack: 48,
    critRate: 0.05,
    description: 'Derin boşluğun gücüyle yoğrulmuş savaş çekici, ele pek ağır gelir.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },

  // === Yeni bölge dükkân silahları ===
  crystal_blade: {
    id: 'crystal_blade',
    name: 'Kristal Uzun Kılıç',
    type: 'sword',
    attack: 35,
    critRate: 0.08,
    description: 'Kristal cevherinden dövülmüş uzun kılıç, yedi renk ışık saçar.',
    shopPrice: 5000,
    shopMaterials: [{ itemId: 'crystal_ore', quantity: 8 }],
    fixedEnchantment: null
  },
  shadow_mace: {
    id: 'shadow_mace',
    name: 'Gölge Topuzu',
    type: 'club',
    attack: 42,
    critRate: 0.05,
    description: 'Gölge cevherinden dövülmüş ağır topuz, tek darbede düşmanı ezer.',
    shopPrice: 8000,
    shopMaterials: [{ itemId: 'shadow_ore', quantity: 8 }],
    fixedEnchantment: null
  },
  void_katana: {
    id: 'void_katana',
    name: 'Uçurum Yatağanı',
    type: 'sword',
    attack: 52,
    critRate: 0.1,
    description: 'Boşluk cevheriyle işlenmiş üstün bir kılıç, göğü bile yaracak gibidir.',
    shopPrice: 15000,
    shopMaterials: [{ itemId: 'void_ore', quantity: 10 }],
    fixedEnchantment: null
  },

  // === Yeni bölge BOSS düşürür (sabit tılsım) ===
  crystal_king_blade: {
    id: 'crystal_king_blade',
    name: 'Kristal Han’ın Ulu Kılıcı',
    type: 'sword',
    attack: 45,
    critRate: 0.15,
    description: 'Kristal handan kalma kutsal kılıç, talih ışığıyla çevrilidir.',
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
    description: 'Gölge hükümdarının dişinden yapıldı, kana doymak bilmez.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'vampiric'
  },
  abyss_dragon_mace: {
    id: 'abyss_dragon_mace',
    name: 'Ejder Han Asası',
    type: 'club',
    attack: 60,
    critRate: 0.12,
    description: 'Uçurum ejderhasının asası, değdiğini kül eder.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: 'fierce'
  },

  // === Yeni dükkân silahları ===
  bamboo_staff: {
    id: 'bamboo_staff',
    name: 'Bambu Asa',
    type: 'club',
    attack: 10,
    critRate: 0.03,
    description: 'Sağlam bambudan oyulmuş uzun asa, hafif ve elde rahat durur.',
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
    description: 'İnce işlenmiş demir hançer, hızlı ve çevik kullanılır.',
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
    description: 'Altın işlemeli savaş yelpazesi, açılınca bıçak, kapanınca değnek kesilir.',
    shopPrice: 2000,
    shopMaterials: [{ itemId: 'gold_ore', quantity: 5 }],
    fixedEnchantment: null
  },
  obsidian_blade: {
    id: 'obsidian_blade',
    name: 'Kara Cam Kılıcı',
    type: 'sword',
    attack: 38,
    critRate: 0.08,
    description: 'Obsidyenden dövülmüş eğri kılıç, metali bile yağ gibi keser.',
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
    description: 'Donmuş balçık özünden oluşmuş, beklenmedik kadar ağır bir tokmak.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  magma_blade: {
    id: 'magma_blade',
    name: 'Kor Kılıcı',
    type: 'sword',
    attack: 21,
    critRate: 0.08,
    description: 'Magmadan donup kalmış kısa kılıç, hâlâ sıcaklık saçar.',
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
    description: 'Kristal parçalardan doğal biçimde oluşmuş keskin bir hançer.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  void_fang_dagger: {
    id: 'void_fang_dagger',
    name: 'Uçurum Dişi',
    type: 'dagger',
    attack: 42,
    critRate: 0.25,
    description: 'Derinlik yılanının zehirli dişi, aşındırıcı bir kudret taşır.',
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
    description: 'Sandıkta yıllarca uyumuş eski bir kılıç, yeşil ışıkla parlar.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },
  ancient_blade: {
    id: 'ancient_blade',
    name: 'Kadim Ulu Kılıç',
    type: 'sword',
    attack: 50,
    critRate: 0.15,
    description: 'Eski harabelerde bulunan gizemli uzun kılıç, kudretini hâlâ korur.',
    shopPrice: null,
    shopMaterials: [],
    fixedEnchantment: null
  },

  // === Lonca özel ===
  guild_war_blade: {
    id: 'guild_war_blade',
    name: 'Lonca Cenk Kılıcı',
    type: 'sword',
    attack: 36,
    critRate: 0.1,
    description: 'Maceracılar loncasının seçkin yiğitleri için dövülmüş kılıç, üstünde lonca damgası vardır.',
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

/** ID’ye göre tılsım tanımını al */
export const getEnchantmentById = (id: string): EnchantmentDef | undefined => {
  return ENCHANTMENTS[id]
}

/** Silah satış fiyatını hesapla */
export const getWeaponSellPrice = (defId: string, enchantmentId: string | null): number => {
  const def = WEAPONS[defId]
  if (!def) return 0
  const base = def.shopPrice ? Math.floor(def.shopPrice * 0.5) : def.attack * 15
  // Tılsım ek fiyatı
  if (enchantmentId) {
    const enchant = ENCHANTMENTS[enchantmentId]
    if (enchant) return base + 100 + enchant.attackBonus * 20
  }
  return base
}

/** Tılsımlı silahın görünen adını al */
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
