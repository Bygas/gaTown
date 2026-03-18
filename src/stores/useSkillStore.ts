import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { SkillType, SkillState, SkillPerk5, SkillPerk10 } from '@/types'
import { useInventoryStore } from './useInventoryStore'

/** Her seviye için gereken toplam deneyim **/
const EXP_TABLE = [0, 100, 380, 770, 1300, 2150, 3300, 4800, 6900, 10000, 15000]

/** Başlangıç yetenek durumu oluştur */
const createSkill = (type: SkillType): SkillState => {
  return { type, exp: 0, level: 0, perk5: null, perk10: null }
}

export const useSkillStore = defineStore('skill', () => {
  const skills = ref<SkillState[]>([
    createSkill('farming'),
    createSkill('foraging'),
    createSkill('fishing'),
    createSkill('mining'),
    createSkill('combat')
  ])

  const getSkill = (type: SkillType): SkillState => {
    return skills.value.find(s => s.type === type)!
  }

  const farmingLevel = computed(() => getSkill('farming').level)
  const fishingLevel = computed(() => getSkill('fishing').level)
  const miningLevel = computed(() => getSkill('mining').level)
  const foragingLevel = computed(() => getSkill('foraging').level)
  const combatLevel = computed(() => getSkill('combat').level)

  /** Deneyim ekle ve otomatik seviye atlat (yüzük deneyim bonusu dahil) */
  const addExp = (type: SkillType, amount: number): { leveledUp: boolean; newLevel: number } => {
    const ringExpBonus = useInventoryStore().getRingEffectValue('exp_bonus')
    const adjustedAmount = Math.floor(amount * (1 + ringExpBonus))

    const skill = getSkill(type)
    skill.exp += adjustedAmount
    let leveledUp = false

    while (skill.level < 10) {
      const nextLevelExp = EXP_TABLE[skill.level + 1]!
      if (skill.exp >= nextLevelExp) {
        skill.level++
        leveledUp = true
      } else {
        break
      }
    }

    return { leveledUp, newLevel: skill.level }
  }

  /** Sonraki seviyeye ulaşmak için gereken deneyimi al */
  const getExpToNextLevel = (type: SkillType): { current: number; required: number } | null => {
    const skill = getSkill(type)
    if (skill.level >= 10) return null
    return { current: skill.exp, required: EXP_TABLE[skill.level + 1]! }
  }

  /** Yeteneğin dayanıklılık tüketimini ne kadar azalttığını hesapla (her seviye %1, 10 seviyede toplam %10) */
  const getStaminaReduction = (type: SkillType): number => {
    return getSkill(type).level * 0.01
  }

  /** Seviye 5 uzmanlığını ayarla */
  const setPerk5 = (type: SkillType, perk: SkillPerk5): boolean => {
    const skill = getSkill(type)
    if (skill.level < 5 || skill.perk5 !== null) return false
    skill.perk5 = perk
    return true
  }

  /** Seviye 10 uzmanlığını ayarla */
  const setPerk10 = (type: SkillType, perk: SkillPerk10): boolean => {
    const skill = getSkill(type)
    if (skill.level < 10 || skill.perk10 !== null) return false
    skill.perk10 = perk
    return true
  }

  /** Ürün kalitesini belirle (tarım seviyesine göre) */
  const rollCropQuality = (): 'normal' | 'fine' | 'excellent' | 'supreme' => {
    return rollCropQualityWithBonus(0)
  }

  /** Ürün kalitesini belirle (gübre bonusu + isteğe bağlı yetenek seviyesi bonusu ile) */
  const rollCropQualityWithBonus = (qualityBonus: number, levelBonus: number = 0): 'normal' | 'fine' | 'excellent' | 'supreme' => {
    const level = farmingLevel.value + levelBonus
    const roll = Math.random()

    if (level >= 9 && roll < 0.05 + qualityBonus * 0.5) return 'supreme'
    if (level >= 6 && roll < 0.15 + qualityBonus) return 'excellent'
    if (level >= 3 && roll < 0.3 + qualityBonus) return 'fine'
    return 'normal'
  }

  /** Toplama ürünleri kalitesini belirle (toplama seviyesi ve uzmanlığa göre + isteğe bağlı seviye bonusu) */
  const rollForageQuality = (levelBonus: number = 0): 'normal' | 'fine' | 'excellent' | 'supreme' => {
    const skill = getSkill('foraging')
    if (skill.perk10 === 'botanist') return 'excellent'
    const level = skill.level + levelBonus
    const roll = Math.random()

    if (level >= 9 && roll < 0.05) return 'supreme'
    if (level >= 6 && roll < 0.12) return 'excellent'
    if (level >= 3 && roll < 0.25) return 'fine'
    return 'normal'
  }

  const serialize = () => {
    return { skills: skills.value }
  }

  const deserialize = (data: ReturnType<typeof serialize>) => {
    const arr: SkillState[] = data.skills ?? []
    // 5 yeteneğin de var olduğundan emin ol (eski kayıtlarda combat olmayabilir)
    const allTypes: SkillType[] = ['farming', 'foraging', 'fishing', 'mining', 'combat']
    for (const type of allTypes) {
      if (!arr.find(s => s.type === type)) {
        const newSkill = createSkill(type)
        // Eski kayıt taşıması: mining içindeki fighter/warrior/brute → combat
        if (type === 'combat') {
          const mining = arr.find(s => s.type === 'mining')
          if (mining && mining.perk5 === 'fighter') {
            newSkill.exp = mining.exp
            newSkill.level = mining.level
            newSkill.perk5 = 'fighter'
            newSkill.perk10 = mining.perk10
            mining.perk5 = null
            mining.perk10 = null
          }
        }
        arr.push(newSkill)
      }
    }
    skills.value = arr
  }

  return {
    skills,
    farmingLevel,
    fishingLevel,
    miningLevel,
    foragingLevel,
    combatLevel,
    getSkill,
    addExp,
    getExpToNextLevel,
    getStaminaReduction,
    setPerk5,
    setPerk10,
    rollCropQuality,
    rollCropQualityWithBonus,
    rollForageQuality,
    serialize,
    deserialize
  }
})
