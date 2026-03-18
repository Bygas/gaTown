/** Müze eşya kategorisi */
export type MuseumCategory = 'ore' | 'gem' | 'bar' | 'fossil' | 'artifact' | 'spirit'

/** Müzeye bağışlanabilir eşya tanımı */
export interface MuseumItemDef {
  id: string
  name: string
  category: MuseumCategory
  /** Kaynak ipucu (henüz elde edilmemişse gösterilir) */
  sourceHint: string
}

/** Müze kilometre taşı ödülü */
export interface MuseumMilestone {
  count: number
  name: string
  reward: {
    money?: number
    items?: { itemId: string; quantity: number }[]
  }
}
