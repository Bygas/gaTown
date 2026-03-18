import type { Season } from './game'

/** Görev türü */
export type QuestType = 'delivery' | 'fishing' | 'mining' | 'gathering' | 'special_order'

/** Görev hedef şablonu */
export interface QuestTargetDef {
  itemId: string
  name: string
  minQty: number
  maxQty: number
  /** Bu hedefin geçerli olduğu mevsimler (boş = tüm mevsimler) */
  seasons: Season[]
  /** Birim fiyat (ödül hesaplamasında kullanılır) */
  unitPrice: number
}

/** Görev şablonu (türe göre) */
export interface QuestTemplateDef {
  type: QuestType
  targets: QuestTargetDef[]
  npcPool: string[]
  rewardMultiplier: number
  friendshipReward: number
}

/** Görev örneği (çalışma zamanı) */
export interface QuestInstance {
  id: string
  type: QuestType
  npcId: string
  npcName: string
  description: string
  targetItemId: string
  targetItemName: string
  targetQuantity: number
  collectedQuantity: number
  moneyReward: number
  friendshipReward: number
  daysRemaining: number
  accepted: boolean
  /** Eşya ödülü (özel siparişler) */
  itemReward?: { itemId: string; quantity: number }[]
  /** Zorluk etiketi (özel siparişler) */
  tierLabel?: string
}

// ============================================================
// Ana görev türleri
// ============================================================

/** Ana görev hedef türü */
export type MainQuestObjectiveType =
  | 'earnMoney'
  | 'reachMineFloor'
  | 'reachSkullFloor'
  | 'skillLevel'
  | 'allSkillsLevel'
  | 'harvestCrops'
  | 'catchFish'
  | 'cookRecipes'
  | 'killMonsters'
  | 'discoverItems'
  | 'npcFriendship'
  | 'npcAllFriendly'
  | 'completeBundles'
  | 'completeQuests'
  | 'shipItems'
  | 'ownAnimals'
  | 'married'
  | 'hasChild'
  | 'deliverItem'

/** Ana görev tekil hedef */
export interface MainQuestObjective {
  type: MainQuestObjectiveType
  /** Hedef açıklama metni */
  label: string
  /** Sayısal hedef (para/kat/seviye/miktar) */
  target?: number
  /** Yetenek türü (skillLevel için) */
  skillType?: string
  /** NPC ID (npcFriendship için) */
  npcId?: string
  /** Dostluk seviyesi (npcFriendship/npcAllFriendly için) */
  friendshipLevel?: string
  /** Eşya ID (deliverItem için) */
  itemId?: string
  /** Eşya miktarı (deliverItem için) */
  itemQuantity?: number
}

/** Ana görev tanımı (veri katmanı) */
export interface MainQuestDef {
  id: string
  chapter: number
  order: number
  title: string
  description: string
  npcId: string
  objectives: MainQuestObjective[]
  moneyReward: number
  friendshipReward?: { npcId: string; amount: number }[]
  itemReward?: { itemId: string; quantity: number }[]
}

/** Ana görev çalışma zamanı durumu */
export interface MainQuestState {
  questId: string
  accepted: boolean
  objectiveProgress: boolean[]
  }
