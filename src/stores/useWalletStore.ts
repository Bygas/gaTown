import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { WALLET_ITEMS } from '@/data/wallet'
import { FISH } from '@/data/fish'
import { useAchievementStore } from './useAchievementStore'
import { useSkillStore } from './useSkillStore'
import { useMiningStore } from './useMiningStore'

export const useWalletStore = defineStore('wallet', () => {
  /** Kilidi açılmış cüzdan eşyalarının ID'leri */
  const unlockedItems = ref<string[]>([])

  /** Kilidi açılmış cüzdan eşyalarının tanımları */
  const unlockedDefs = computed(() => WALLET_ITEMS.filter(w => unlockedItems.value.includes(w.id)))

  /** Bir eşyaya sahip olunup olunmadığını kontrol et */
  const has = (id: string): boolean => {
    return unlockedItems.value.includes(id)
  }

  /** Manuel olarak kilit aç */
  const unlock = (id: string): boolean => {
    if (has(id)) return false
    if (!WALLET_ITEMS.find(w => w.id === id)) return false
    unlockedItems.value.push(id)
    return true
  }

  /** Koşulları sağlayan eşyaları otomatik kontrol edip açar, yeni açılan eşya adlarını döndürür */
  const checkAndUnlock = (): string[] => {
    const achievementStore = useAchievementStore()
    const skillStore = useSkillStore()
    const miningStore = useMiningStore()

    const newlyUnlocked: string[] = []

    // Tüccar Mührü: toplam 10000 akçe kazan
    if (!has('merchant_seal') && achievementStore.stats.totalMoneyEarned >= 10000) {
      unlock('merchant_seal')
      newlyUnlocked.push('Tüccar Mührü')
    }

    // Şifalı Ot Rehberi: Toplayıcılık seviyesi 8
    if (!has('herb_guide') && skillStore.getSkill('foraging').level >= 8) {
      unlock('herb_guide')
      newlyUnlocked.push('Şifalı Ot Rehberi')
    }

    // Madenci Tılsımı: Madende 50. kat
    if (!has('miners_charm') && miningStore.safePointFloor >= 50) {
      unlock('miners_charm')
      newlyUnlocked.push('Madenci Tılsımı')
    }

    // Balıkçı Jetonu: 30 farklı balık yakala
    if (!has('anglers_token')) {
      const fishIdSet = new Set(FISH.map(f => f.id))
      const fishCount = achievementStore.discoveredItems.filter(id => fishIdSet.has(id)).length
      if (fishCount >= 30) {
        unlock('anglers_token')
        newlyUnlocked.push('Balıkçı Jetonu')
      }
    }

    // Aşçı Şapkası: 10 farklı tarif pişir
    if (!has('chefs_hat') && achievementStore.stats.totalRecipesCooked >= 10) {
      unlock('chefs_hat')
      newlyUnlocked.push('Aşçı Şapkası')
    }

    // Toprak Totemi: 100 kez ürün hasat et
    if (!has('earth_totem') && achievementStore.stats.totalCropsHarvested >= 100) {
      unlock('earth_totem')
      newlyUnlocked.push('Toprak Totemi')
    }

    return newlyUnlocked
  }

  // === Pasif etki sorguları ===

  /** Mağaza indirimi (0.1 = %10) */
  const getShopDiscount = (): number => {
    return has('merchant_seal') ? 0.1 : 0
  }

  /** Toplayıcılık kalite bonus seviyesi */
  const getForageQualityBoost = (): number => {
    return has('herb_guide') ? 1 : 0
  }

  /** Madencilik dayanıklılık tüketimi azaltma (0.15 = %15) */
  const getMiningStaminaReduction = (): number => {
    return has('miners_charm') ? 0.15 : 0
  }

  /** Balıkçılıkta calm olasılığı bonusu */
  const getFishingCalmBonus = (): number => {
    return has('anglers_token') ? 0.1 : 0
  }

  /** Yemek iyileştirme miktarı bonusu (0.25 = %25) */
  const getCookingRestoreBonus = (): number => {
    return has('chefs_hat') ? 0.25 : 0
  }

  /** Ürün büyüme hızı bonusu (0.1 = %10) */
  const getCropGrowthBonus = (): number => {
    return has('earth_totem') ? 0.1 : 0
  }

  const serialize = () => {
    return { unlockedItems: unlockedItems.value }
  }

  const deserialize = (data: ReturnType<typeof serialize>) => {
    unlockedItems.value = data.unlockedItems ?? []
  }

  return {
    unlockedItems,
    unlockedDefs,
    has,
    unlock,
    checkAndUnlock,
    getShopDiscount,
    getForageQualityBoost,
    getMiningStaminaReduction,
    getFishingCalmBonus,
    getCookingRestoreBonus,
    getCropGrowthBonus,
    serialize,
    deserialize
  }
})
