import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { MONSTER_GOALS, GUILD_SHOP_ITEMS, GUILD_DONATIONS, GUILD_LEVELS, GUILD_BONUS_PER_LEVEL } from '@/data/guild'
import { usePlayerStore } from './usePlayerStore'
import { useInventoryStore } from './useInventoryStore'
import { useGameStore } from './useGameStore'
import { addLog } from '@/composables/useGameLog'

export const useGuildStore = defineStore('guild', () => {
  /** Canavar ID'sine göre öldürme sayısını kaydeder */
  const monsterKills = ref<Record<string, number>>({})

  /** Ödülü alınmış av hedeflerinin monsterId kümesi */
  const claimedGoals = ref<string[]>([])

  /** Daha önce karşılaşılan canavar ID'leri kümesi (ansiklopedi için) */
  const encounteredMonsters = ref<string[]>([])

  /** Katkı puanı (harcanabilir para birimi) */
  const contributionPoints = ref(0)

  /** Lonca deneyimi (gizli değer) */
  const guildExp = ref(0)

  /** Lonca seviyesi (görünür değer) */
  const guildLevel = ref(0)

  /** Günlük satın alma takibi: { itemId: bugünkü satın alma sayısı } */
  const dailyPurchases = ref<Record<string, number>>({})

  /** Günlük satın alma sınırının en son sıfırlandığı gün numarası */
  const lastResetDay = ref(-1)

  /** Haftalık satın alma takibi: { itemId: bu haftaki satın alma sayısı } */
  const weeklyPurchases = ref<Record<string, number>>({})

  /** Haftalık satın alma sınırının en son sıfırlandığı hafta numarası */
  const lastResetWeek = ref(-1)

  /** Toplam kalıcı satın alma takibi: { itemId: toplam satın alma sayısı } */
  const totalPurchases = ref<Record<string, number>>({})

  /** Öldürme kaydı ekle */
  const recordKill = (monsterId: string) => {
    monsterKills.value[monsterId] = (monsterKills.value[monsterId] ?? 0) + 1
    if (!encounteredMonsters.value.includes(monsterId)) {
      encounteredMonsters.value.push(monsterId)
    }
  }

  /** Karşılaşma kaydı ekle (savaş başladığında çağrılır, öldürülse de öldürülmese de) */
  const recordEncounter = (monsterId: string) => {
    if (!encounteredMonsters.value.includes(monsterId)) {
      encounteredMonsters.value.push(monsterId)
    }
  }

  /** Belirli bir canavarın öldürülme sayısını al */
  const getKillCount = (monsterId: string): number => {
    return monsterKills.value[monsterId] ?? 0
  }

  /** Belirli bir canavarla karşılaşılıp karşılaşılmadığını kontrol et */
  const isEncountered = (monsterId: string): boolean => {
    return encounteredMonsters.value.includes(monsterId)
  }

  /** Tamamlanan av hedefi sayısı */
  const completedGoalCount = computed(() => {
    return MONSTER_GOALS.filter(g => (monsterKills.value[g.monsterId] ?? 0) >= g.killTarget).length
  })

  /** Ödülü alınabilecek hedefler */
  const claimableGoals = computed(() => {
    return MONSTER_GOALS.filter(g => (monsterKills.value[g.monsterId] ?? 0) >= g.killTarget && !claimedGoals.value.includes(g.monsterId))
  })

  /** Av ödülünü al */
  const claimGoal = (monsterId: string): boolean => {
    const goal = MONSTER_GOALS.find(g => g.monsterId === monsterId)
    if (!goal) return false
    if ((monsterKills.value[monsterId] ?? 0) < goal.killTarget) return false
    if (claimedGoals.value.includes(monsterId)) return false

    const playerStore = usePlayerStore()
    const inventoryStore = useInventoryStore()

    if (goal.reward.money) {
      playerStore.earnMoney(goal.reward.money)
    }
    if (goal.reward.items) {
      for (const item of goal.reward.items) {
        inventoryStore.addItem(item.itemId, item.quantity)
      }
    }
    // Av ödülü yalnızca katkı puanı verir, lonca deneyimi vermez (yalnızca bağış deneyim kazandırır)
    const bonusPoints = Math.floor((goal.reward.money ?? 0) / 20) + goal.killTarget
    contributionPoints.value += bonusPoints
    claimedGoals.value.push(monsterId)
    addLog(`Av ödülü alındı, ayrıca ${bonusPoints} katkı puanı kazanıldı.`)
    return true
  }

  // ==================== Lonca seviyesi ====================

  /** Mevcut oyun içi gün numarasını hesapla */
  const getCurrentDay = (): number => {
    const gameStore = useGameStore()
    const seasonIndex = ['spring', 'summer', 'autumn', 'winter'].indexOf(gameStore.season)
    return (gameStore.year - 1) * 112 + seasonIndex * 28 + gameStore.day
  }

  /** Günlük satın alma sınırlarının sıfırlandığından emin ol */
  const ensureDailyReset = () => {
    const day = getCurrentDay()
    if (day !== lastResetDay.value) {
      dailyPurchases.value = {}
      lastResetDay.value = day
    }
  }

  /** Mevcut oyun içi hafta numarasını hesapla */
  const getCurrentWeek = (): number => {
    return Math.floor((getCurrentDay() - 1) / 7)
  }

  /** Haftalık satın alma sınırlarının sıfırlandığından emin ol */
  const ensureWeeklyReset = () => {
    const week = getCurrentWeek()
    if (week !== lastResetWeek.value) {
      weeklyPurchases.value = {}
      lastResetWeek.value = week
    }
  }

  /** Seviye atlamayı kontrol et */
  const checkLevelUp = () => {
    while (guildLevel.value < GUILD_LEVELS.length) {
      const next = GUILD_LEVELS[guildLevel.value]
      if (!next || guildExp.value < next.expRequired) break
      guildLevel.value++
      addLog(`Maceracılar Loncası seviyesi ${guildLevel.value}. seviyeye yükseldi!`)
    }
  }

  /** Eşya bağışla */
  const donateItem = (itemId: string, quantity: number): { success: boolean; pointsGained: number } => {
    const donation = GUILD_DONATIONS.find(d => d.itemId === itemId)
    if (!donation) return { success: false, pointsGained: 0 }
    const inventoryStore = useInventoryStore()
    const available = inventoryStore.getItemCount(itemId)
    const actual = Math.min(quantity, available)
    if (actual <= 0) return { success: false, pointsGained: 0 }
    inventoryStore.removeItem(itemId, actual)
    const points = donation.points * actual
    contributionPoints.value += points
    guildExp.value += points
    checkLevelUp()
    return { success: true, pointsGained: points }
  }

  /** Bugün için kalan satın alma hakkını al */
  const getDailyRemaining = (itemId: string, dailyLimit: number): number => {
    ensureDailyReset()
    return dailyLimit - (dailyPurchases.value[itemId] ?? 0)
  }

  /** Bu hafta için kalan satın alma hakkını al */
  const getWeeklyRemaining = (itemId: string, weeklyLimit: number): number => {
    ensureWeeklyReset()
    return weeklyLimit - (weeklyPurchases.value[itemId] ?? 0)
  }

  /** Toplam kalan kalıcı satın alma hakkını al */
  const getTotalRemaining = (itemId: string, totalLimit: number): number => {
    return totalLimit - (totalPurchases.value[itemId] ?? 0)
  }

  /** Lonca seviyesi pasif saldırı bonusunu al */
  const getGuildAttackBonus = (): number => {
    return guildLevel.value * GUILD_BONUS_PER_LEVEL.attack
  }

  /** Lonca seviyesi pasif HP bonusunu al */
  const getGuildHpBonus = (): number => {
    return guildLevel.value * GUILD_BONUS_PER_LEVEL.maxHp
  }

  // ==================== Mağaza ====================

  /** Lonca mağazası: eşyanın kilidinin açılıp açılmadığını kontrol et */
  const isShopItemUnlocked = (itemId: string): boolean => {
    const item = GUILD_SHOP_ITEMS.find(i => i.itemId === itemId)
    if (!item) return false
    if (!item.unlockGuildLevel) return true
    return guildLevel.value >= item.unlockGuildLevel
  }

  /** Lonca mağazası: eşya satın al */
  const buyShopItem = (itemId: string): boolean => {
    const item = GUILD_SHOP_ITEMS.find(i => i.itemId === itemId)
    if (!item) return false
    if (!isShopItemUnlocked(itemId)) return false

    // Günlük sınır kontrolü
    if (item.dailyLimit) {
      ensureDailyReset()
      if ((dailyPurchases.value[itemId] ?? 0) >= item.dailyLimit) return false
    }

    // Haftalık sınır kontrolü
    if (item.weeklyLimit) {
      ensureWeeklyReset()
      if ((weeklyPurchases.value[itemId] ?? 0) >= item.weeklyLimit) return false
    }

    // Kalıcı toplam sınır kontrolü
    if (item.totalLimit) {
      if ((totalPurchases.value[itemId] ?? 0) >= item.totalLimit) return false
    }

    const playerStore = usePlayerStore()
    const inventoryStore = useInventoryStore()

    // Malzemeler yeterli mi kontrol et
    if (item.materials) {
      for (const mat of item.materials) {
        if (inventoryStore.getItemCount(mat.itemId) < mat.quantity) return false
      }
    }

    // Kalıcı ürünlerde katkı puanı, tüketimliklerde para kullanılır
    if (item.contributionCost) {
      if (contributionPoints.value < item.contributionCost) return false
      contributionPoints.value -= item.contributionCost
    } else {
      if (playerStore.money < item.price) return false
      playerStore.spendMoney(item.price)
    }

    // Malzemeleri düş
    if (item.materials) {
      for (const mat of item.materials) {
        inventoryStore.removeItem(mat.itemId, mat.quantity)
      }
    }

    // Ekipman türüne göre ilgili bölüme ekle
    let addSuccess = true
    if (item.equipType === 'weapon') {
      addSuccess = inventoryStore.addWeapon(item.itemId, null)
    } else if (item.equipType === 'ring') {
      addSuccess = inventoryStore.addRing(item.itemId)
    } else if (item.equipType === 'hat') {
      addSuccess = inventoryStore.addHat(item.itemId)
    } else if (item.equipType === 'shoe') {
      addSuccess = inventoryStore.addShoe(item.itemId)
    } else {
      addSuccess = inventoryStore.addItem(item.itemId, 1)
    }

    if (!addSuccess) {
      // Katkı puanı / para iadesi
      if (item.contributionCost) contributionPoints.value += item.contributionCost
      else playerStore.earnMoney(item.price)
      // Malzeme iadesi
      if (item.materials) {
        for (const mat of item.materials) {
          inventoryStore.addItem(mat.itemId, mat.quantity)
        }
      }
      return false
    }

    // Satın alma sınırlarını kaydet
    if (item.dailyLimit) {
      dailyPurchases.value[itemId] = (dailyPurchases.value[itemId] ?? 0) + 1
    }
    if (item.weeklyLimit) {
      weeklyPurchases.value[itemId] = (weeklyPurchases.value[itemId] ?? 0) + 1
    }
    if (item.totalLimit) {
      totalPurchases.value[itemId] = (totalPurchases.value[itemId] ?? 0) + 1
    }
    addLog(`Lonca mağazasından "${item.name}" satın alındı.`)
    return true
  }

  /** Serileştir */
  const serialize = () => ({
    monsterKills: { ...monsterKills.value },
    claimedGoals: [...claimedGoals.value],
    encounteredMonsters: [...encounteredMonsters.value],
    contributionPoints: contributionPoints.value,
    guildExp: guildExp.value,
    guildLevel: guildLevel.value,
    dailyPurchases: { ...dailyPurchases.value },
    lastResetDay: lastResetDay.value,
    weeklyPurchases: { ...weeklyPurchases.value },
    lastResetWeek: lastResetWeek.value,
    totalPurchases: { ...totalPurchases.value }
  })

  /** Serileştirmeyi çöz */
  const deserialize = (data: ReturnType<typeof serialize>) => {
    monsterKills.value = data.monsterKills ?? {}
    claimedGoals.value = data.claimedGoals ?? []
    encounteredMonsters.value = data.encounteredMonsters ?? []
    dailyPurchases.value = ((data as Record<string, unknown>).dailyPurchases as Record<string, number>) ?? {}
    lastResetDay.value = ((data as Record<string, unknown>).lastResetDay as number) ?? -1
    weeklyPurchases.value = ((data as Record<string, unknown>).weeklyPurchases as Record<string, number>) ?? {}
    lastResetWeek.value = ((data as Record<string, unknown>).lastResetWeek as number) ?? -1
    totalPurchases.value = ((data as Record<string, unknown>).totalPurchases as Record<string, number>) ?? {}

    // Eski kayıt aktarımı: katkı puanı alanı yoksa ama alınmış av ödülleri varsa, katkı puanlarını sonradan ekle
    // (deneyim eklenmez, deneyim yalnızca bağıştan gelir)
    const isOldSave = !('contributionPoints' in data)
    if (isOldSave && claimedGoals.value.length > 0) {
      let migratedPoints = 0
      for (const monsterId of claimedGoals.value) {
        const goal = MONSTER_GOALS.find(g => g.monsterId === monsterId)
        if (goal) {
          migratedPoints += Math.floor((goal.reward.money ?? 0) / 20) + goal.killTarget
        }
      }
      contributionPoints.value = migratedPoints
      guildExp.value = 0
      guildLevel.value = 0
    } else {
      contributionPoints.value = ((data as Record<string, unknown>).contributionPoints as number) ?? 0
      guildExp.value = ((data as Record<string, unknown>).guildExp as number) ?? 0
      guildLevel.value = ((data as Record<string, unknown>).guildLevel as number) ?? 0
    }
  }

  return {
    monsterKills,
    claimedGoals,
    encounteredMonsters,
    contributionPoints,
    guildExp,
    guildLevel,
    recordKill,
    recordEncounter,
    getKillCount,
    isEncountered,
    completedGoalCount,
    claimableGoals,
    claimGoal,
    donateItem,
    getDailyRemaining,
    getWeeklyRemaining,
    getTotalRemaining,
    getGuildAttackBonus,
    getGuildHpBonus,
    isShopItemUnlocked,
    buyShopItem,
    serialize,
    deserialize
  }
})
