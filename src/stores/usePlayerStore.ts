import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Gender } from '@/types'
import {
  LATE_NIGHT_RECOVERY_MAX,
  LATE_NIGHT_RECOVERY_MIN,
  PASSOUT_STAMINA_RECOVERY,
  PASSOUT_MONEY_PENALTY_RATE,
  PASSOUT_MONEY_PENALTY_CAP
} from '@/data/timeConstants'
import { useSkillStore } from './useSkillStore'
import { useHomeStore } from './useHomeStore'
import { useInventoryStore } from './useInventoryStore'
import { useAchievementStore } from './useAchievementStore'
import { useHiddenNpcStore } from './useHiddenNpcStore'
import { useMiningStore } from './useMiningStore'
import { useGuildStore } from './useGuildStore'

/** Maksimum enerji kademeleri (5 kademe, 120'den başlar, 300'de biter) */
const STAMINA_CAPS = [120, 160, 200, 250, 300]

/** HP sabitleri */
const BASE_MAX_HP = 100
const HP_PER_COMBAT_LEVEL = 5
const FIGHTER_HP_BONUS = 25
const WARRIOR_HP_BONUS = 40

export const usePlayerStore = defineStore('player', () => {
  const playerName = ref('İsimsiz')
  const gender = ref<Gender>('male')
  /** Eski kayıt yüklendikten sonra kimlik ayarı yapılması gerekir (kalıcı değil) */
  const needsIdentitySetup = ref(false)
  const money = ref(500)
  const stamina = ref(120)
  const maxStamina = ref(120)
  const staminaCapLevel = ref(0) // 0=120, 1=160, 2=200, 3=250, 4=300
  /** Ekstra maksimum enerji bonusu (ölümsüz hap vb.), ana enerji kademesinden bağımsızdır */
  const bonusMaxStamina = ref(0)

  // HP sistemi
  const hp = ref(BASE_MAX_HP)
  const baseMaxHp = ref(BASE_MAX_HP)

  const isExhausted = computed(() => stamina.value <= 5)
  const staminaPercent = computed(() => Math.round((stamina.value / maxStamina.value) * 100))
  /** NPC'lerin oyuncuya hitap ederken kullandığı unvan */
  const honorific = computed(() => (gender.value === 'male' ? 'delikanlı' : 'genç hanım'))

  /** Geçerli maksimum HP'yi hesapla (temel + savaş seviyesi + uzmanlık bonusu + ruh bağı bonusu + lonca bonusu) */
  const getMaxHp = (): number => {
    const skillStore = useSkillStore()
    let bonus = skillStore.combatLevel * HP_PER_COMBAT_LEVEL
    const perk5 = skillStore.getSkill('combat').perk5
    const perk10 = skillStore.getSkill('combat').perk10
    if (perk5 === 'fighter') bonus += FIGHTER_HP_BONUS
    if (perk10 === 'warrior') bonus += WARRIOR_HP_BONUS
    const ringHpBonus = useInventoryStore().getRingEffectValue('max_hp_bonus')
    // Ruh bağı: Ruh Kalkanı (spirit_shield) HP bonusu
    const spiritShield = useHiddenNpcStore().getBondBonusByType('spirit_shield')
    const spiritHpBonus = spiritShield?.type === 'spirit_shield' ? spiritShield.hpBonus : 0
    // Lonca bonusu: Yaşam tılsımı kalıcı etkisi + seviye pasifi
    const guildHpBonus = useMiningStore().guildBonusMaxHp
    const guildLevelHpBonus = useGuildStore().getGuildHpBonus()
    return baseMaxHp.value + bonus + ringHpBonus + spiritHpBonus + guildHpBonus + guildLevelHpBonus
  }

  const getHpPercent = (): number => {
    return Math.round((hp.value / getMaxHp()) * 100)
  }

  const getIsLowHp = (): boolean => {
    return hp.value <= getMaxHp() * 0.25
  }

  /** Enerji tüketir (ruh bağı kalkan indirimi dahil), başarılıysa true döner */
  const consumeStamina = (amount: number): boolean => {
    // Ruh bağı: Ruh Kalkanı (spirit_shield) enerji tüketimini azaltır
    const spiritShield2 = useHiddenNpcStore().getBondBonusByType('spirit_shield')
    const spiritSave = spiritShield2?.type === 'spirit_shield' ? spiritShield2.staminaSave / 100 : 0
    const effectiveAmount = Math.max(1, Math.floor(amount * (1 - spiritSave)))
    if (stamina.value < effectiveAmount) return false
    stamina.value -= effectiveAmount
    return true
  }

  /** Enerji yeniler */
  const restoreStamina = (amount: number) => {
    stamina.value = Math.min(stamina.value + amount, maxStamina.value)
  }

  /** Hasar alır (HP düşer), gerçek hasar miktarını döndürür */
  const takeDamage = (amount: number): number => {
    const actual = Math.min(amount, hp.value)
    hp.value -= actual
    return actual
  }

  /** Can yeniler */
  const restoreHealth = (amount: number) => {
    hp.value = Math.min(hp.value + amount, getMaxHp())
  }

  /**
   * Günlük sıfırlama
   * - Normal: tam enerji + tam HP
   * - Geç yatma: kademeli yenilenme (24:00'te %90 → 25:00'te %60) + tam HP
   * - Bayılma: %50 enerji + tam HP + paranın %10'u kesilir
   */
  const dailyReset = (mode: 'normal' | 'late' | 'passout', bedHour?: number): { moneyLost: number; recoveryPct: number } => {
    let moneyLost = 0
    let recoveryPct = 1
    switch (mode) {
      case 'normal':
        stamina.value = maxStamina.value
        break
      case 'late': {
        // Kademeli yenilenme: 24:00 → %90, 25:00 → %60, doğrusal ara değer
        const homeStore = useHomeStore()
        const staminaBonus = homeStore.getStaminaRecoveryBonus()
        const t = Math.min(Math.max((bedHour ?? 24) - 24, 0), 1)
        recoveryPct = LATE_NIGHT_RECOVERY_MAX - t * (LATE_NIGHT_RECOVERY_MAX - LATE_NIGHT_RECOVERY_MIN) + staminaBonus
        stamina.value = Math.floor(maxStamina.value * Math.min(recoveryPct, 1))
        break
      }
      case 'passout': {
        const homeStore2 = useHomeStore()
        const staminaBonus2 = homeStore2.getStaminaRecoveryBonus()
        recoveryPct = PASSOUT_STAMINA_RECOVERY + staminaBonus2
        stamina.value = Math.floor(maxStamina.value * Math.min(recoveryPct, 1))
        moneyLost = Math.min(Math.floor(money.value * PASSOUT_MONEY_PENALTY_RATE), PASSOUT_MONEY_PENALTY_CAP)
        money.value -= moneyLost
        break
      }
    }
    // HP her gün tamamen dolar
    hp.value = getMaxHp()
    return { moneyLost, recoveryPct }
  }

  /** Maksimum enerjiyi artırır */
  const upgradeMaxStamina = (): boolean => {
    if (staminaCapLevel.value >= STAMINA_CAPS.length - 1) return false
    staminaCapLevel.value++
    maxStamina.value = STAMINA_CAPS[staminaCapLevel.value]! + bonusMaxStamina.value
    return true
  }

  /** Ek maksimum enerji bonusu ekler (ölümsüz hap vb.) */
  const addBonusMaxStamina = (amount: number) => {
    bonusMaxStamina.value += amount
    maxStamina.value = STAMINA_CAPS[staminaCapLevel.value]! + bonusMaxStamina.value
  }

  /** Para harcar, başarılıysa true döner */
  const spendMoney = (amount: number): boolean => {
    if (money.value < amount) return false
    money.value -= amount
    return true
  }

  /** Para kazanır */
  const earnMoney = (amount: number) => {
    money.value += amount
    useAchievementStore().recordMoneyEarned(amount)
  }

  /** Oyuncu kimliğini ayarlar (yeni oyun veya eski kayıt geçişlerinde çağrılır) */
  const setIdentity = (name: string, g: Gender) => {
    playerName.value = name
    gender.value = g
    needsIdentitySetup.value = false
  }

  const serialize = () => {
    return {
      playerName: playerName.value,
      gender: gender.value,
      money: money.value,
      stamina: stamina.value,
      maxStamina: maxStamina.value,
      staminaCapLevel: staminaCapLevel.value,
      bonusMaxStamina: bonusMaxStamina.value,
      hp: hp.value,
      baseMaxHp: baseMaxHp.value
    }
  }

  const deserialize = (data: ReturnType<typeof serialize>) => {
    const hasIdentity = (data as any).playerName != null
    playerName.value = (data as any).playerName ?? 'İsimsiz'
    gender.value = (data as any).gender ?? 'male'
    needsIdentitySetup.value = !hasIdentity
    money.value = data.money
    stamina.value = data.stamina
    maxStamina.value = data.maxStamina
    staminaCapLevel.value = data.staminaCapLevel
    bonusMaxStamina.value = (data as any).bonusMaxStamina ?? 0
    // Eski kayıt uyumluluğu: bonusMaxStamina alanı yoksa maxStamina ve staminaCapLevel üzerinden hesapla
    if ((data as any).bonusMaxStamina == null) {
      const expectedBase = STAMINA_CAPS[staminaCapLevel.value] ?? 120
      const diff = maxStamina.value - expectedBase
      if (diff > 0) bonusMaxStamina.value = diff
    }
    // maxStamina ile staminaCapLevel + bonusMaxStamina değerlerini eşitle (eski kayıt düzeltmesi)
    const expectedMax = (STAMINA_CAPS[staminaCapLevel.value] ?? 120) + bonusMaxStamina.value
    if (maxStamina.value !== expectedMax) {
      maxStamina.value = expectedMax
    }
    hp.value = (data as any).hp ?? BASE_MAX_HP
    baseMaxHp.value = (data as any).baseMaxHp ?? BASE_MAX_HP
  }

  return {
    playerName,
    gender,
    needsIdentitySetup,
    honorific,
    money,
    stamina,
    maxStamina,
    staminaCapLevel,
    bonusMaxStamina,
    hp,
    baseMaxHp,
    isExhausted,
    staminaPercent,
    getMaxHp,
    getHpPercent,
    getIsLowHp,
    consumeStamina,
    restoreStamina,
    takeDamage,
    restoreHealth,
    dailyReset,
    upgradeMaxStamina,
    addBonusMaxStamina,
    spendMoney,
    earnMoney,
    setIdentity,
    serialize,
    deserialize
  }
})
