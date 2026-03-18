/** Tohum genetik özellikleri */
export interface SeedGenetics {
  /** Benzersiz kimlik */
  id: string
  /** Bağlı olduğu ürün ID */
  cropId: string
  /** Nesil (tohum makinesi = 0, her çaprazlama +1) */
  generation: number
  /** Tatlılık 0-100 → satış fiyatı bonusu */
  sweetness: number
  /** Verim 0-100 → çift ürün olasılığı */
  yield: number
  /** Dayanıklılık 0-100 → solmayı yavaşlatır */
  resistance: number
  /** Stabilite 0-100 → yavrularda daha az değişim */
  stability: number
  /** Mutasyon oranı 1-50 → büyük değişim ihtimali */
  mutationRate: number
  /** Ebeveyn A ID (izlenebilirlik) */
  parentA: string | null
  /** Ebeveyn B ID (izlenebilirlik) */
  parentB: string | null
  /** Hibrit mi */
  isHybrid: boolean
  /** Hibrit ID (sadece hibritlerde dolu) */
  hybridId: string | null
}

/** Yetiştirme tohumu (tohum kutusundaki öğe) */
export interface BreedingSeed {
  genetics: SeedGenetics
  /** Görünen etiket (ürün adı + nesil + yıldız) */
  label: string
}

/** Yetiştirme slotu */
export interface BreedingSlot {
  /** Ebeveyn A */
  parentA: SeedGenetics | null
  /** Ebeveyn B */
  parentB: SeedGenetics | null
  /** Geçen gün sayısı */
  daysProcessed: number
  /** Toplam gereken gün */
  totalDays: number
  /** Sonuç tohumu */
  result: SeedGenetics | null
  /** Tamamlandı mı */
  ready: boolean
}

/** Hibrit tarif tanımı */
export interface HybridDef {
  /** Hibrit ID */
  id: string
  /** Hibrit adı */
  name: string
  /** Ebeveyn A cropId */
  parentCropA: string
  /** Ebeveyn B cropId */
  parentCropB: string
  /** Ortalama tatlılık gereksinimi */
  minSweetness: number
  /** Ortalama verim gereksinimi */
  minYield: number
  /** Ortaya çıkan ürün ID */
  resultCropId: string
  /** Hibritin temel genetik değerleri */
  baseGenetics: { sweetness: number; yield: number; resistance: number }
  /** Keşif açıklaması */
  discoveryText: string
}

/** Koleksiyon (Compendium) kaydı */
export interface CompendiumEntry {
  /** Hibrit ID */
  hybridId: string
  /** Keşfedildiği yıl */
  discoveredYear: number
  /** En iyi toplam stat */
  bestTotalStats: number
  /** Ekilme sayısı */
  timesGrown: number
}

/** Yıldız derecesi 1-5 */
export type SeedStarRating = 1 | 2 | 3 | 4 | 5
