import type { Season, Weather } from './game'
import type { HeartEventScene } from './npc'

/** Keşif aşaması */
export type DiscoveryPhase = 'unknown' | 'rumor' | 'glimpse' | 'encounter' | 'revealed'

/** Bağ (affinity) seviyesi */
export type AffinityLevel = 'wary' | 'curious' | 'trusting' | 'devoted' | 'eternal'

/** Bağ seviyesi eşikleri */
export const AFFINITY_THRESHOLDS: { level: AffinityLevel; min: number }[] = [
  { level: 'eternal', min: 2500 },
  { level: 'devoted', min: 1800 },
  { level: 'trusting', min: 1000 },
  { level: 'curious', min: 400 },
  { level: 'wary', min: 0 }
]

/** Maksimum bağ değeri */
export const MAX_AFFINITY = 3000

/** Her bir bağ puanı (12 elmas gösterimi) */
export const AFFINITY_PER_DIAMOND = 250

/** Günlük etkileşim yoksa bağ azalması */
export const AFFINITY_DECAY_BONDED = 15
export const AFFINITY_DECAY_COURTING = 10

/** Haftalık sunu limiti */
export const MAX_OFFERS_PER_WEEK = 3

/** Keşif koşulları */
export type DiscoveryCondition =
  | { type: 'season'; season: Season }
  | { type: 'weather'; weather: Weather }
  | { type: 'timeRange'; minHour: number; maxHour: number }
  | { type: 'location'; panel: string }
  | { type: 'item'; itemId: string; quantity?: number }
  | { type: 'skill'; skillType: string; minLevel: number }
  | { type: 'npcFriendship'; npcId: string; minFriendship: number }
  | { type: 'questComplete'; questId: string }
  | { type: 'mineFloor'; minFloor: number }
  | { type: 'fishCaught'; fishId: string }
  | { type: 'money'; minAmount: number }
  | { type: 'yearMin'; year: number }
  | { type: 'day'; day: number }

/** Keşif adımı */
export interface DiscoveryStep {
  id: string
  /** Bu adım NPC’yi hangi aşamaya ilerletir */
  phase: DiscoveryPhase
  /** Tüm koşullar sağlanmalı */
  conditions: DiscoveryCondition[]
  /** Tetiklendiğinde oynatılan sahneler */
  scenes: HeartEventScene[]
  /** Keşif sonrası günlük mesajı */
  logMessage?: string
}

/** Özel etkileşim türü */
export type InteractionType = 'meditation' | 'music' | 'ritual' | 'dreamwalk' | 'cultivation'

/** Etkileşim türü adları */
export const INTERACTION_NAMES: Record<InteractionType, string> = {
  meditation: 'Meditasyon',
  music: 'Müzik',
  ritual: 'Ritüel',
  dreamwalk: 'Rüya Yürüyüşü',
  cultivation: 'Gelişim'
}

/** Bağ yeteneği */
export interface AffinityAbility {
  id: string
  affinityRequired: number
  name: string
  description: string
  passive?: {
    type: 'quality_boost' | 'stamina_save' | 'exp_boost' | 'sell_bonus' | 'luck' | 'max_stamina' | 'max_hp'
    value: number
  }
}

/** Bağ ödül türü */
export type BondBonusType =
  | { type: 'weather_control'; chance: number }
  | { type: 'crop_blessing'; chance: number }
  | { type: 'animal_blessing'; chance: number }
  | { type: 'stamina_restore'; amount: number }
  | { type: 'fish_attraction'; chance: number }
  | { type: 'spirit_shield'; staminaSave: number; hpBonus: number }
  | { type: 'sell_bonus'; percent: number }

/** Gizli NPC tanımı */
export interface HiddenNpcDef {
  id: string
  name: string
  /** Gerçek adı (yüksek bağda açılır) */
  trueName: string
  gender: 'male' | 'female'
  /** Unvan */
  title: string
  /** Köken açıklaması */
  origin: string
  personality: string
  /** Keşif zinciri */
  discoverySteps: DiscoveryStep[]
  /** Mükemmel sunular: +100 bağ */
  resonantOfferings: string[]
  /** İyi sunular: +50 bağ */
  pleasedOfferings: string[]
  /** Olumsuz sunular: -40 bağ */
  repelledOfferings: string[]
  /** Bağ seviyesine göre diyaloglar */
  dialogues: Record<AffinityLevel, string[]>
  /** Özel etkileşim türü */
  interactionType: InteractionType
  /** Bağ kurulabilir mi */
  bondable: boolean
  /** Kur yapma eşyası */
  courtshipItemId: string
  /** Bağ kurma eşyası */
  bondItemId: string
  /** Kur yapma eşiği */
  courtshipThreshold: number
  /** Bağ kurma eşiği */
  bondThreshold: number
  /** Kalp olayı ID listesi */
  heartEventIds: string[]
  /** Kur aşaması diyalogları */
  courtshipDialogues: string[]
  /** Bağ sonrası günlük ödüller */
  bondBonuses: BondBonusType[]
  /** Bağ yetenek ağacı */
  abilities: AffinityAbility[]
  /** Ortaya çıkış günü (doğum günü gibi) */
  manifestationDay: { season: Season; day: number }
}

/** Gizli NPC çalışma zamanı durumu */
export interface HiddenNpcState {
  npcId: string
  discoveryPhase: DiscoveryPhase
  /** Tamamlanan keşif adımları */
  completedSteps: string[]
  /** Bağ değeri (0-3000) */
  affinity: number
  /** Bugün etkileşim yapıldı mı */
  interactedToday: boolean
  /** Bugün sunu yapıldı mı */
  offeredToday: boolean
  /** Bu hafta yapılan sunular */
  offersThisWeek: number
  /** Özel etkileşim bekleme süresi */
  specialInteractionCooldown: number
  /** Kur yapılıyor */
  courting: boolean
  /** Bağ kurulmuş */
  bonded: boolean
  /** Tetiklenen kalp olayları */
  triggeredHeartEvents: string[]
  /** Açılan yetenekler */
  unlockedAbilities: string[]
}
