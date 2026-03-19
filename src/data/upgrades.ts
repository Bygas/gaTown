import type { ToolType, ToolTier } from '@/types'

/** Alet yükseltmesi için gereken malzeme ve ücret */
export interface ToolUpgradeCost {
  fromTier: ToolTier
  toTier: ToolTier
  money: number
  materials: { itemId: string; quantity: number }[]
}

/** Genel alet yükseltme maliyetleri (sulama kabı / çapa / kazma / orak / balta) */
const STANDARD_COSTS: ToolUpgradeCost[] = [
  { fromTier: 'basic', toTier: 'iron', money: 2000, materials: [{ itemId: 'copper_bar', quantity: 5 }] },
  { fromTier: 'iron', toTier: 'steel', money: 5000, materials: [{ itemId: 'iron_bar', quantity: 5 }] },
  { fromTier: 'steel', toTier: 'iridium', money: 10000, materials: [{ itemId: 'gold_bar', quantity: 5 }] }
]

/** Sulama kabı yükseltme maliyetleri (ilk yükseltme eşiği daha düşüktür) */
const WATERING_CAN_COSTS: ToolUpgradeCost[] = [
  { fromTier: 'basic', toTier: 'iron', money: 1200, materials: [{ itemId: 'copper_bar', quantity: 3 }] },
  { fromTier: 'iron', toTier: 'steel', money: 5000, materials: [{ itemId: 'iron_bar', quantity: 5 }] },
  { fromTier: 'steel', toTier: 'iridium', money: 10000, materials: [{ itemId: 'gold_bar', quantity: 5 }] }
]

/** Her alet için yükseltme maliyetleri */
export const TOOL_UPGRADE_COSTS: Record<ToolType, ToolUpgradeCost[]> = {
  wateringCan: WATERING_CAN_COSTS,
  hoe: STANDARD_COSTS,
  pickaxe: STANDARD_COSTS,
  scythe: STANDARD_COSTS,
  axe: STANDARD_COSTS,
  fishingRod: [
    {
      fromTier: 'basic',
      toTier: 'iron',
      money: 2000,
      materials: [
        { itemId: 'copper_bar', quantity: 5 },
        { itemId: 'wood', quantity: 5 }
      ]
    },
    {
      fromTier: 'iron',
      toTier: 'steel',
      money: 5000,
      materials: [
        { itemId: 'iron_bar', quantity: 5 },
        { itemId: 'bamboo', quantity: 5 }
      ]
    },
    {
      fromTier: 'steel',
      toTier: 'iridium',
      money: 10000,
      materials: [
        { itemId: 'gold_bar', quantity: 5 },
        { itemId: 'bamboo', quantity: 10 }
      ]
    }
  ],
  pan: [
    {
      fromTier: 'basic',
      toTier: 'iron',
      money: 2000,
      materials: [
        { itemId: 'copper_bar', quantity: 5 },
        { itemId: 'quartz', quantity: 2 }
      ]
    },
    {
      fromTier: 'iron',
      toTier: 'steel',
      money: 5000,
      materials: [
        { itemId: 'iron_bar', quantity: 5 },
        { itemId: 'quartz', quantity: 3 }
      ]
    },
    {
      fromTier: 'steel',
      toTier: 'iridium',
      money: 10000,
      materials: [
        { itemId: 'gold_bar', quantity: 5 },
        { itemId: 'quartz', quantity: 5 }
      ]
    }
  ]
}

/** Belirli bir alet için mevcut seviyeye göre kullanılabilir yükseltme bilgisini al */
export const getUpgradeCost = (type: ToolType, currentTier: ToolTier): ToolUpgradeCost | undefined => {
  return TOOL_UPGRADE_COSTS[type].find(c => c.fromTier === currentTier)
}

/** Alet adları */
export const TOOL_NAMES: Record<ToolType, string> = {
  wateringCan: 'Sulama Kabı',
  hoe: 'Çapa',
  pickaxe: 'Kazma',
  fishingRod: 'Olta',
  scythe: 'Orak',
  axe: 'Balta',
  pan: 'Altın Eleği'
}

/** Alet seviye adları */
export const TIER_NAMES: Record<ToolTier, string> = {
  basic: 'Basit',
  iron: 'Demir',
  steel: 'Çelik',
  iridium: 'İridyum'
}
