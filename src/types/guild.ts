/** Canavar avı hedefi tanımı */
export interface MonsterGoalDef {
  monsterId: string
  monsterName: string
  zone: string
  killTarget: number
  reward: {
    money?: number
    items?: { itemId: string; quantity: number }[]
  }
  description: string
}

/** Lonca bağış eşyası tanımı */
export interface GuildDonationDef {
  itemId: string
  points: number
}

/** Lonca seviye tanımı */
export interface GuildLevelDef {
  level: number
  expRequired: number
}

/** Lonca mağazası eşya tanımı */
export interface GuildShopItemDef {
  itemId: string
  name: string
  price: number
  contributionCost?: number
  description: string
  /** Açılması için gereken lonca seviyesi */
  unlockGuildLevel?: number
  /** Günlük satın alma limiti */
  dailyLimit?: number
  /** Haftalık satın alma limiti */
  weeklyLimit?: number
  /** Toplam satın alma limiti */
  totalLimit?: number
  /** Ekipman türü (satın alındığında ilgili slota eklenir) */
  equipType?: 'weapon' | 'ring' | 'hat' | 'shoe'
  /** Üretim malzemeleri */
  materials?: { itemId: string; quantity: number }[]
}
