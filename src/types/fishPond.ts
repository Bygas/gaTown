import type { Quality } from './item'

/** Balık havuzu seviyesi */
export type PondLevel = 1 | 2 | 3

/** Balık genetiği */
export interface FishGenetics {
  /** Ağırlık 0-100 → satış fiyatını etkiler */
  weight: number
  /** Büyüme oranı 0-100 → olgunlaşma hızı */
  growthRate: number
  /** Hastalık direnci 0-100 → hastalığa karşı dayanıklılık */
  diseaseRes: number
  /** Kalite geni 0-100 → üretim kalitesi */
  qualityGene: number
  /** Mutasyon oranı 1-50 → yavrularda değişim miktarı */
  mutationRate: number
}

/** Havuzdaki balık bireyi */
export interface PondFish {
  id: string
  fishId: string
  name: string
  genetics: FishGenetics
  /** Havuzda geçirilen gün sayısı */
  daysInPond: number
  /** Olgun mu (üretim/üreme için) */
  mature: boolean
  /** Hasta mı */
  sick: boolean
  /** Arka arkaya hasta olunan gün sayısı */
  sickDays: number
  /** Tür ID (koleksiyon sistemi) */
  breedId: string | null
}

/** Tür (koleksiyon) tanımı */
export interface PondBreedDef {
  breedId: string
  name: string
  generation: 1 | 2 | 3 | 4 | 5
  baseFishId: string
  parentBreedA: string | null
  parentBreedB: string | null
}

/** Üreme çifti */
export interface BreedingPair {
  parentA: string
  parentB: string
  daysLeft: number
  fishId: string
}

/** Balık havuzu durumu */
export interface FishPondState {
  built: boolean
  level: PondLevel
  fish: PondFish[]
  /** Su kalitesi 0-100 */
  waterQuality: number
  fedToday: boolean
  breeding: BreedingPair | null
  collectedToday: boolean
}

/** Yetiştirilebilir balık tanımı */
export interface PondableFishDef {
  fishId: string
  name: string
  /** Olgunlaşma süresi (gün) */
  maturityDays: number
  /** Günlük üretim ihtimali (0-1) */
  baseProductionRate: number
  /** Üretilen eşya ID (genelde balığın kendisi) */
  productItemId: string
  /** Varsayılan genetik değerler */
  defaultGenetics: FishGenetics
}

/** Günlük havuz sonucu */
export interface PondDailyResult {
  products: { itemId: string; quality: Quality }[]
  died: string[]
  gotSick: string[]
  healed: string[]
  bred: string | null
  /** Üremenin başarısız olma sebebi */
  breedingFailed: string | null
}
