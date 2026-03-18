import type { Season, Gender } from './game'

/** Arkadaşlık seviyesi */
export type FriendshipLevel = 'stranger' | 'acquaintance' | 'friendly' | 'bestFriend'

/** NPC tanımı */
export interface NpcDef {
  id: string
  name: string
  /** Cinsiyet */
  gender: Gender
  role: string
  personality: string
  lovedItems: string[]
  likedItems: string[]
  hatedItems: string[]
  dialogues: Record<FriendshipLevel, string[]>
  /** Evlenilebilir mi */
  marriageable?: boolean
  /** Bağlı kalp olayı ID listesi */
  heartEventIds?: string[]
  /** Flört aşamasına özel diyaloglar */
  datingDialogues?: string[]
  /** Yakın dost (zhiji) diyalogları */
  zhijiDialogues?: string[]
  /** Yakın dost kalp olayları ID listesi */
  zhijiHeartEventIds?: string[]
  /** Doğum günü (mevsim + gün) */
  birthday?: { season: Season; day: number }
}

/** NPC durumu (çalışma zamanı) */
export interface NpcState {
  npcId: string
  friendship: number
  talkedToday: boolean
  giftedToday: boolean
  /** Bu hafta verilen hediye sayısı (maks. 2) */
  giftsThisWeek: number
  /** Flört halinde mi */
  dating: boolean
  /** Evli mi */
  married: boolean
  /** Yakın dost (zhiji) mı */
  zhiji: boolean
  /** Tetiklenen kalp olayları */
  triggeredHeartEvents: string[]
}

/** Kalp olayı sahnesi */
export interface HeartEventScene {
  text: string
  /** Bu sahnede seçimler (yoksa otomatik ilerler) */
  choices?: {
    text: string
    friendshipChange: number
    response: string
  }[]
}

/** Kalp olayı tanımı */
export interface HeartEventDef {
  id: string
  npcId: string
  /** Gerekli minimum arkadaşlık */
  requiredFriendship: number
  /** Yakın dost ilişkisi gerekir mi */
  requiresZhiji?: boolean
  title: string
  scenes: HeartEventScene[]
}

/** Çocuk büyüme aşaması */
export type ChildStage = 'baby' | 'toddler' | 'child' | 'teen'

/** Çocuk durumu */
export interface ChildState {
  id: number
  name: string
  daysOld: number
  stage: ChildStage
  friendship: number
  interactedToday: boolean
  /** Doğum kalitesi */
  birthQuality: 'normal' | 'premature' | 'healthy'
}

/** Hamilelik aşaması */
export type PregnancyStage = 'early' | 'mid' | 'late' | 'ready'

/** Teklif yanıtı */
export type ProposalResponse = 'accept' | 'decline' | 'wait'

/** Çiftlik yardımcısı görev türü */
export type FarmHelperTask = 'water' | 'feed' | 'harvest' | 'weed'

/** Çalışan yardımcının durumu */
export interface HiredHelper {
  npcId: string
  task: FarmHelperTask
  dailyWage: number
}

/** Hamilelik durumu */
export interface PregnancyState {
  stage: PregnancyStage
  daysInStage: number
  stageDays: number
  /** Bakım puanı (0-100) */
  careScore: number
  caredToday: boolean
  giftedForPregnancy: boolean
  companionToday: boolean
  medicalPlan: 'normal' | 'advanced' | 'luxury' | null
}
