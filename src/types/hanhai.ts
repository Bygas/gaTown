/** Hanhai mağaza eşya tanımı */
export interface HanhaiShopItemDef {
  itemId: string
  name: string
  price: number
  description: string
  /** Haftalık satın alma limiti (0 veya boş = sınırsız) */
  weeklyLimit?: number
}

/** Kumar oyunu türü */
export type CasinoGameType = 'roulette' | 'dice' | 'cup' | 'cricket' | 'cardflip' | 'texas' | 'buckshot'

/** Cırcır böceği (cricket) tanımı */
export interface CricketDef {
  id: string
  name: string
  description: string
}

/** Rulet sonuç oranları */
export interface RouletteOutcome {
  label: string
  multiplier: number
  /** Olasılık yüzdesi (toplamı 100 olmalı) */
  chance: number
}

// === Poker ===

export type PokerSuit = 'spade' | 'heart' | 'diamond' | 'club'
export type PokerRank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

export interface PokerCard {
  suit: PokerSuit
  rank: PokerRank
}

export type PokerHandType =
  | 'royal_flush'
  | 'straight_flush'
  | 'four_kind'
  | 'full_house'
  | 'flush'
  | 'straight'
  | 'three_kind'
  | 'two_pair'
  | 'one_pair'
  | 'high_card'

export interface PokerHandResult {
  type: PokerHandType
  /** El sıralaması (büyük = daha güçlü) */
  typeRank: number
  /** Aynı tip karşılaştırması için sıralı değerler (azalan) */
  ranks: number[]
  label: string
}

export type TexasStreet = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown'
export type PokerActionType = 'check' | 'raise' | 'call' | 'fold' | 'allin'
export type TexasTierId = 'beginner' | 'normal' | 'expert'

export interface TexasTierDef {
  id: TexasTierId
  name: string
  /** Giriş ücreti (= başlangıç fişleri) */
  entryFee: number
  /** Büyük kör bahis */
  blind: number
  /** Masa kesintisi (krupiye payı) */
  rake: number
  /** Katılım için minimum para */
  minMoney: number
  /** Oynanabilecek el sayısı */
  rounds: number
}

export interface TexasSetup {
  playerHole: PokerCard[]
  dealerHole: PokerCard[]
  /** Önceden dağıtılmış 5 kart (sokaklara göre açılır) */
  community: PokerCard[]
  /** Masa ayarları */
  tier: TexasTierDef
}

// === Şeytan Ruleti (Buckshot) ===

export type ShellType = 'live' | 'blank'

export interface BuckshotSetup {
  shells: ShellType[]
  playerHP: number
  dealerHP: number
}
