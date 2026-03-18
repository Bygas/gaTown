import type { FertilizerType } from './processing'
import type { SeedGenetics } from './breeding'
import type { Season } from './game'

/** Tarla durumu */
export type PlotState = 'wasteland' | 'tilled' | 'planted' | 'growing' | 'harvestable'

/** Çiftlik arazisi */
export interface FarmPlot {
  id: number
  state: PlotState
  /** Ekili ürün ID */
  cropId: string | null
  /** Geçen büyüme günü */
  growthDays: number
  /** Bugün sulandı mı */
  watered: boolean
  /** Arka arkaya sulanmayan gün sayısı */
  unwateredDays: number
  /** Uygulanan gübre türü */
  fertilizer: FertilizerType | null
  /** Çok hasatlı ürünlerde hasat sayısı */
  harvestCount: number
  /** Dev mahsul grup ID (null değilse dev mahsule ait) */
  giantCropGroup: number | null
  /** Tohum genetik bilgisi */
  seedGenetics: SeedGenetics | null
  /** Zararlı istilası var mı */
  infested: boolean
  /** Arka arkaya istilalı gün sayısı */
  infestedDays: number
  /** Yabani ot var mı */
  weedy: boolean
  /** Arka arkaya otlu gün sayısı */
  weedyDays: number
}

/** Ürün tanımı (veri yapılandırması için) */
export interface CropDef {
  id: string
  name: string
  seedId: string
  season: Season[]
  growthDays: number
  sellPrice: number
  seedPrice: number
  /** Derin sulama gerekir mi */
  deepWatering: boolean
  description: string
  /** Çok hasatlı mı (hasattan sonra tekrar büyür) */
  regrowth?: boolean
  /** Yeniden büyüme süresi */
  regrowthDays?: number
  /** Maksimum hasat sayısı */
  maxHarvests?: number
  /** Dev mahsul olabilir mi */
  giantCropEligible?: boolean
}

/** Çiftlik boyutu */
export type FarmSize = 4 | 6 | 8
