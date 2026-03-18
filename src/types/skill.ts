/** Yetenek türü */
export type SkillType = 'farming' | 'foraging' | 'fishing' | 'mining' | 'combat'

/** Yetenek uzmanlığı (seviye 5 seçimi) */
export type SkillPerk5 =
  | 'harvester'
  | 'rancher' // Tarım
  | 'lumberjack'
  | 'herbalist' // Toplayıcılık
  | 'fisher'
  | 'trapper' // Balıkçılık
  | 'miner'
  | 'geologist' // Madencilik
  | 'fighter'
  | 'defender' // Savaş

/** Yetenek uzmanlığı (seviye 10 seçimi, seviye 5 dalına bağlı) */
export type SkillPerk10 =
  | 'intensive'
  | 'artisan' // Tarım: harvester dalı
  | 'coopmaster'
  | 'shepherd' // Tarım: rancher dalı
  | 'botanist'
  | 'alchemist' // Toplayıcılık: herbalist dalı
  | 'forester'
  | 'tracker' // Toplayıcılık: lumberjack dalı
  | 'angler'
  | 'aquaculture' // Balıkçılık: fisher dalı
  | 'mariner'
  | 'luremaster' // Balıkçılık: trapper dalı
  | 'prospector'
  | 'blacksmith' // Madencilik: miner dalı
  | 'excavator'
  | 'mineralogist' // Madencilik: geologist dalı
  | 'warrior'
  | 'brute' // Savaş: fighter dalı
  | 'acrobat'
  | 'tank' // Savaş: defender dalı

/** Yetenek durumu */
export interface SkillState {
  type: SkillType
  exp: number
  level: number
  perk5: SkillPerk5 | null
  perk10: SkillPerk10 | null
}

/** Balıkçılık mini oyunu derecelendirmesi */
export type MiniGameRating = 'perfect' | 'excellent' | 'good' | 'poor'

/** Balıkçılık mini oyunu parametreleri */
export interface MiniGameParams {
  fishName: string
  difficulty: 'easy' | 'normal' | 'hard' | 'legendary'
  hookHeight: number
  fishSpeed: number
  fishChangeDir: number
  gravity: number
  liftSpeed: number
  scoreGain: number
  scoreLoss: number
  timeLimit: number
}

/** Balıkçılık mini oyunu sonucu */
export interface MiniGameResult {
  rating: MiniGameRating
  score: number
  perfect: boolean
}

/** Balıkçılık konumu */
export type FishingLocation = 'creek' | 'pond' | 'river' | 'mine' | 'waterfall' | 'swamp'

/** Balık tanımı */
export interface FishDef {
  id: string
  name: string
  season: ('spring' | 'summer' | 'autumn' | 'winter')[]
  weather: ('sunny' | 'rainy' | 'stormy' | 'snowy' | 'windy' | 'any')[]
  difficulty: 'easy' | 'normal' | 'hard' | 'legendary'
  sellPrice: number
  description: string
  /** Balıkçılık konumu (varsayılan: creek) */
  location?: FishingLocation
  /** Mini oyunda balığın hareket hızı (zorluk varsayılanını geçersiz kılar) */
  miniGameSpeed?: number
  /** Mini oyunda balığın yön değiştirme olasılığı (zorluk varsayılanını geçersiz kılar) */
  miniGameDirChange?: number
}

/** Maden katmanı tanımı */
export interface MineFloorDef {
  floor: number
  zone: 'shallow' | 'frost' | 'lava' | 'crystal' | 'shadow' | 'abyss'
  ores: string[] // Elde edilebilecek maden ID'leri
  monsters: MonsterDef[]
  isSafePoint: boolean // Güvenli nokta mı? (her 5 katta bir)
  specialType: 'mushroom' | 'treasure' | 'infested' | 'dark' | 'boss' | null // Özel kat türü
}

/** Canavar tanımı */
export interface MonsterDef {
  id: string
  name: string
  hp: number
  attack: number // Verdiği HP hasarı
  defense: number
  expReward: number // Öldürüldüğünde verilen savaş deneyimi
  drops: { itemId: string; chance: number }[]
  description: string
}

/** Savaş durumu */
export interface CombatState {
  monster: MonsterDef
  monsterHp: number
  round: number
  log: string[]
  isBoss: boolean
}

/** Savaş eylemi */
export type CombatAction = 'attack' | 'defend' | 'flee'

/** Tarif tanımı */
export interface RecipeDef {
  id: string
  name: string
  ingredients: { itemId: string; quantity: number }[]
  effect: {
    staminaRestore: number
    healthRestore?: number
    buff?: {
      type: 'fishing' | 'mining' | 'giftBonus' | 'speed' | 'defense' | 'luck' | 'farming' | 'stamina' | 'all_skills'
      value: number // Yüzde veya çarpan
      description: string
    }
  }
  unlockSource: string // Açılma kaynağının açıklaması
  description: string
  /** Yemeği pişirebilmek için gereken yetenek seviyesi */
  requiredSkill?: { type: SkillType; level: number }
}
