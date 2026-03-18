/** Gizli not türü */
export type SecretNoteType = 'tip' | 'treasure' | 'npc' | 'story'

/** Gizli not tanımı */
export interface SecretNoteDef {
  id: number
  type: SecretNoteType
  title: string
  content: string
  /** Kullanılabilir mi? (hazine türü notlar) */
  usable: boolean
  /** Kullanım sonrası ödül */
  reward?: {
    money?: number
    items?: { itemId: string; quantity: number }[]
  }
}
