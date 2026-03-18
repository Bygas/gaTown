import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { QuestInstance, Season, MainQuestState, MainQuestObjective } from '@/types'
import { generateQuest, generateSpecialOrder as _generateSpecialOrder } from '@/data/quests'
import { getStoryQuestById, getNextStoryQuest, getFirstStoryQuest, STORY_QUESTS } from '@/data/storyQuests'
import { getNpcById } from '@/data/npcs'
import { useInventoryStore } from './useInventoryStore'
import { usePlayerStore } from './usePlayerStore'
import { useNpcStore } from './useNpcStore'
import { useAchievementStore } from './useAchievementStore'
import { useSkillStore } from './useSkillStore'
import { useShopStore } from './useShopStore'
import { useAnimalStore } from './useAnimalStore'

export const useQuestStore = defineStore('quest', () => {
  const inventoryStore = useInventoryStore()
  const playerStore = usePlayerStore()
  const npcStore = useNpcStore()
  const achievementStore = useAchievementStore()

  /** İlan panosundaki alınabilir görevler */
  const boardQuests = ref<QuestInstance[]>([])

  /** Kabul edilmiş, devam eden görevler */
  const activeQuests = ref<QuestInstance[]>([])

  /** Toplam tamamlanan görev sayısı */
  const completedQuestCount = ref<number>(0)

  /** Şu anda alınabilir özel sipariş */
  const specialOrder = ref<QuestInstance | null>(null)

  /** Aynı anda alınabilecek azami görev sayısı */
  const MAX_ACTIVE_QUESTS = 3

  /** Her gün ilan panosuna yeni görevler üret */
  const generateDailyQuests = (season: Season, day: number) => {
    boardQuests.value = [] // Eski ilan panosunu temizle
    const count = 1 + Math.floor(Math.random() * 2) // 1-2 adet
    for (let i = 0; i < count; i++) {
      const quest = generateQuest(season, day)
      if (quest) {
        boardQuests.value.push(quest)
      }
    }
  }

  /** Kademeye göre özel sipariş üret (tier: 1-4 = 7/14/21/28. gün) */
  const generateSpecialOrder = (season: Season, tier: number) => {
    const order = _generateSpecialOrder(season, tier)
    specialOrder.value = order
  }

  /** Görev kabul et */
  const acceptQuest = (questId: string): { success: boolean; message: string } => {
    if (activeQuests.value.length >= MAX_ACTIVE_QUESTS) {
      return { success: false, message: `Aynı anda en fazla ${MAX_ACTIVE_QUESTS} görev alınabilir.` }
    }
    const idx = boardQuests.value.findIndex(q => q.id === questId)
    if (idx === -1) return { success: false, message: 'Görev bulunamadı.' }

    const quest = boardQuests.value[idx]!
    quest.accepted = true

    // Teslimat dışı görevler: çantadaki mevcut eşya miktarını kontrol et
    if (quest.type !== 'delivery') {
      quest.collectedQuantity = Math.min(inventoryStore.getItemCount(quest.targetItemId), quest.targetQuantity)
    }

    activeQuests.value.push(quest)
    boardQuests.value.splice(idx, 1)
    return { success: true, message: `Görev alındı: ${quest.description}` }
  }

  /** Özel siparişi kabul et */
  const acceptSpecialOrder = (): { success: boolean; message: string } => {
    if (!specialOrder.value) return { success: false, message: 'Alınabilir özel sipariş yok.' }
    if (activeQuests.value.length >= MAX_ACTIVE_QUESTS) {
      return { success: false, message: `Aynı anda en fazla ${MAX_ACTIVE_QUESTS} görev alınabilir.` }
    }

    const order = specialOrder.value
    order.accepted = true
    order.collectedQuantity = Math.min(inventoryStore.getItemCount(order.targetItemId), order.targetQuantity)

    activeQuests.value.push(order)
    specialOrder.value = null
    return { success: true, message: `Özel sipariş alındı: ${order.description}` }
  }

  /** Tamamlanan görevi teslim et */
  const submitQuest = (questId: string): { success: boolean; message: string } => {
    const idx = activeQuests.value.findIndex(q => q.id === questId)
    if (idx === -1) return { success: false, message: 'Görev bulunamadı.' }

    const quest = activeQuests.value[idx]!

    // Teslimat türü görevler: teslim sırasında çantadan eşya eksilt
    if (quest.type === 'delivery') {
      if (!inventoryStore.hasItem(quest.targetItemId, quest.targetQuantity)) {
        return { success: false, message: `Çantada yeterli ${quest.targetItemName} yok.` }
      }
      inventoryStore.removeItem(quest.targetItemId, quest.targetQuantity)
    } else {
      // Balıkçılık / madencilik / toplama / özel sipariş görevleri:
      // toplama ilerlemesini veya çanta miktarını kontrol et
      const effectiveProgress = Math.max(quest.collectedQuantity, inventoryStore.getItemCount(quest.targetItemId))
      if (effectiveProgress < quest.targetQuantity) {
        return { success: false, message: `${quest.targetItemName} ilerlemesi yetersiz (${effectiveProgress}/${quest.targetQuantity}).` }
      }
    }

    // Para ödülünü ver
    playerStore.earnMoney(quest.moneyReward)
    npcStore.adjustFriendship(quest.npcId, quest.friendshipReward)

    // Eşya ödüllerini ver
    if (quest.itemReward) {
      for (const item of quest.itemReward) {
        inventoryStore.addItem(item.itemId, item.quantity)
      }
    }

    // Tamamlanma kaydı
    completedQuestCount.value++

    // Aktif listeden kaldır
    activeQuests.value.splice(idx, 1)

    let message = `${quest.npcName} adlı karakterin görevi tamamlandı! ${quest.moneyReward} akçe kazanıldı, ${quest.npcName} yakınlığı +${quest.friendshipReward}.`
    if (quest.itemReward && quest.itemReward.length > 0) {
      const itemNames = quest.itemReward.map(i => `${i.quantity} adet eşya`).join('、')
      message += ` Ek olarak ${itemNames} kazanıldı.`
    }

    return { success: true, message }
  }

  /** Oyuncu bir eşya aldığında aktif görev ilerlemesini güncelle */
  const onItemObtained = (itemId: string, quantity: number = 1) => {
    for (const quest of activeQuests.value) {
      if (quest.type === 'delivery') continue // Teslimat görevleri otomatik takip edilmez
      if (quest.targetItemId === itemId && quest.collectedQuantity < quest.targetQuantity) {
        quest.collectedQuantity = Math.min(quest.collectedQuantity + quantity, quest.targetQuantity)
      }
    }

    // Ana görevlerde deliverItem hedeflerini de senkronize et
    if (mainQuest.value?.accepted) {
      const def = getStoryQuestById(mainQuest.value.questId)
      if (def) {
        for (let i = 0; i < def.objectives.length; i++) {
          const obj = def.objectives[i]!
          if (obj.type === 'deliverItem' && obj.itemId === itemId && !mainQuest.value.objectiveProgress[i]) {
            mainQuest.value.objectiveProgress[i] = evaluateObjective(obj)
          }
        }
      }
    }
  }

  /** Günlük güncelleme: kalan günleri azalt, süresi dolanları kaldır */
  const dailyUpdate = () => {
    const expired: QuestInstance[] = []
    activeQuests.value = activeQuests.value.filter(q => {
      q.daysRemaining--
      if (q.daysRemaining <= 0) {
        expired.push(q)
        return false
      }
      return true
    })

    // Özel siparişin süresi dolabilir, alınmamış olsa bile
    if (specialOrder.value) {
      specialOrder.value.daysRemaining--
      if (specialOrder.value.daysRemaining <= 0) {
        specialOrder.value = null
      }
    }

    return expired
  }

  /** Belirli eşyayı isteyen aktif görev var mı */
  const hasActiveQuestFor = (itemId: string): boolean => {
    return activeQuests.value.some(q => q.targetItemId === itemId)
  }

  // ============================================================
  // Ana hikâye görevleri
  // ============================================================

  /** Mevcut ana görev durumu */
  const mainQuest = ref<MainQuestState | null>(null)

  /** Tamamlanan ana görev ID listesi */
  const completedMainQuests = ref<string[]>([])

  /** Yakınlık seviyeleri sıralaması */
  const LEVEL_ORDER = ['stranger', 'acquaintance', 'friendly', 'bestFriend'] as const
  const meetsLevel = (current: string, required: string): boolean => {
    return LEVEL_ORDER.indexOf(current as (typeof LEVEL_ORDER)[number]) >= LEVEL_ORDER.indexOf(required as (typeof LEVEL_ORDER)[number])
  }

  /** Tek bir hedefin tamamlanıp tamamlanmadığını değerlendir */
  const evaluateObjective = (obj: MainQuestObjective): boolean => {
    const skillStore = useSkillStore()
    const shopStore = useShopStore()
    const animalStore = useAnimalStore()

    switch (obj.type) {
      case 'earnMoney':
        return achievementStore.stats.totalMoneyEarned >= (obj.target ?? 0)
      case 'reachMineFloor':
        return achievementStore.stats.highestMineFloor >= (obj.target ?? 0)
      case 'reachSkullFloor':
        return achievementStore.stats.skullCavernBestFloor >= (obj.target ?? 0)
      case 'skillLevel':
        if (obj.skillType) {
          return skillStore.getSkill(obj.skillType as 'farming' | 'foraging' | 'fishing' | 'mining' | 'combat').level >= (obj.target ?? 0)
        }
        // Belirli bir yetenek yoksa: herhangi bir yetenek yeterli
        return skillStore.skills.some(s => s.level >= (obj.target ?? 0))
      case 'allSkillsLevel':
        return skillStore.skills.every(s => s.level >= (obj.target ?? 0))
      case 'harvestCrops':
        return achievementStore.stats.totalCropsHarvested >= (obj.target ?? 0)
      case 'catchFish':
        return achievementStore.stats.totalFishCaught >= (obj.target ?? 0)
      case 'cookRecipes':
        return achievementStore.stats.totalRecipesCooked >= (obj.target ?? 0)
      case 'killMonsters':
        return achievementStore.stats.totalMonstersKilled >= (obj.target ?? 0)
      case 'discoverItems':
        return achievementStore.discoveredItems.length >= (obj.target ?? 0)
      case 'npcFriendship': {
        if (obj.npcId === '_any') {
          // Herhangi bir NPC belirtilen yakınlık seviyesine ulaşmış mı
          return npcStore.npcStates.some(n => meetsLevel(npcStore.getFriendshipLevel(n.npcId), obj.friendshipLevel ?? 'acquaintance'))
        }
        const level = npcStore.getFriendshipLevel(obj.npcId ?? '')
        return meetsLevel(level, obj.friendshipLevel ?? 'acquaintance')
      }
      case 'npcAllFriendly':
        return npcStore.npcStates.every(n => meetsLevel(npcStore.getFriendshipLevel(n.npcId), obj.friendshipLevel ?? 'friendly'))
      case 'completeBundles':
        return achievementStore.completedBundles.length >= (obj.target ?? 0)
      case 'completeQuests':
        return completedQuestCount.value >= (obj.target ?? 0)
      case 'shipItems':
        return shopStore.shippedItems.length >= (obj.target ?? 0)
      case 'ownAnimals':
        return animalStore.animals.length >= (obj.target ?? 0)
      case 'married':
        return npcStore.getSpouse() !== null
      case 'hasChild':
        return npcStore.children.length > 0
      case 'deliverItem':
        // deliverItem sadece çantada yeterli eşya olup olmadığını kontrol eder
        return inventoryStore.hasItem(obj.itemId ?? '', obj.itemQuantity ?? 1)
      default:
        return false
    }
  }

  /** Ana görevi başlat: mevcut görev yoksa sıradaki görevi ayarla */
  const initMainQuest = () => {
    if (mainQuest.value) return
    if (completedMainQuests.value.length >= STORY_QUESTS.length) return

    const nextQuest =
      completedMainQuests.value.length === 0
        ? getFirstStoryQuest()
        : getNextStoryQuest(completedMainQuests.value[completedMainQuests.value.length - 1]!)

    if (nextQuest) {
      mainQuest.value = {
        questId: nextQuest.id,
        accepted: false,
        objectiveProgress: nextQuest.objectives.map(() => false)
      }
    }
  }

  /** Ana görevi kabul et */
  const acceptMainQuest = (): { success: boolean; message: string } => {
    if (!mainQuest.value) return { success: false, message: 'Alınabilir ana görev yok.' }
    if (mainQuest.value.accepted) return { success: false, message: 'Ana görev zaten alınmış.' }

    const def = getStoryQuestById(mainQuest.value.questId)
    if (!def) return { success: false, message: 'Ana görev verisi hatalı.' }

    mainQuest.value.accepted = true

    // Kabul edildiği anda ilerlemeyi bir kez değerlendir
    for (let i = 0; i < def.objectives.length; i++) {
      mainQuest.value.objectiveProgress[i] = evaluateObjective(def.objectives[i]!)
    }

    const npcDef = getNpcById(def.npcId)
    const npcName = npcDef?.name ?? def.npcId
    return { success: true, message: `Ana görev alındı: ${def.title} (${npcName})` }
  }

  /** Ana görev ilerlemesini günlük güncelle */
  const updateMainQuestProgress = () => {
    if (!mainQuest.value || !mainQuest.value.accepted) return

    const def = getStoryQuestById(mainQuest.value.questId)
    if (!def) return

    for (let i = 0; i < def.objectives.length; i++) {
      if (!mainQuest.value.objectiveProgress[i]) {
        mainQuest.value.objectiveProgress[i] = evaluateObjective(def.objectives[i]!)
      }
    }
  }

  /** Ana görev teslim edilebilir mi */
  const canSubmitMainQuest = (): boolean => {
    if (!mainQuest.value || !mainQuest.value.accepted) return false

    const def = getStoryQuestById(mainQuest.value.questId)
    if (!def) return false

    for (let i = 0; i < def.objectives.length; i++) {
      if (!mainQuest.value.objectiveProgress[i]) {
        mainQuest.value.objectiveProgress[i] = evaluateObjective(def.objectives[i]!)
      }
    }

    return mainQuest.value.objectiveProgress.every(p => p)
  }

  /** Ana görevi teslim et */
  const submitMainQuest = (): { success: boolean; message: string } => {
    if (!mainQuest.value || !mainQuest.value.accepted) {
      return { success: false, message: 'Teslim edilebilecek ana görev yok.' }
    }

    const def = getStoryQuestById(mainQuest.value.questId)
    if (!def) return { success: false, message: 'Ana görev verisi hatalı.' }

    // Son doğrulama
    for (let i = 0; i < def.objectives.length; i++) {
      mainQuest.value.objectiveProgress[i] = evaluateObjective(def.objectives[i]!)
    }
    if (!mainQuest.value.objectiveProgress.every(p => p)) {
      return { success: false, message: 'Ana görev hedefleri henüz tamamlanmadı.' }
    }

    // deliverItem hedeflerinde çantadan eşya eksilt
    for (const obj of def.objectives) {
      if (obj.type === 'deliverItem' && obj.itemId && obj.itemQuantity) {
        if (!inventoryStore.removeItem(obj.itemId, obj.itemQuantity)) {
          return { success: false, message: `Çantadaki eşya yetersiz, teslim edilemiyor.` }
        }
      }
    }

    // Para ödülü
    playerStore.earnMoney(def.moneyReward)

    // Yakınlık ödülü
    if (def.friendshipReward) {
      for (const fr of def.friendshipReward) {
        npcStore.adjustFriendship(fr.npcId, fr.amount)
      }
    }

    // Eşya ödülü
    if (def.itemReward) {
      for (const item of def.itemReward) {
        inventoryStore.addItem(item.itemId, item.quantity)
      }
    }

    completedMainQuests.value.push(mainQuest.value.questId)
    mainQuest.value = null

    // Sonraki ana görevi otomatik başlat
    initMainQuest()

    const npcDef = getNpcById(def.npcId)
    const npcName = npcDef?.name ?? def.npcId
    let message = `【Ana Görev Tamamlandı】${def.title}! ${npcName}: ${def.moneyReward} akçe kazanıldı.`
    if (def.itemReward && def.itemReward.length > 0) {
      message += ` Ayrıca eşya ödülü alındı.`
    }
    if (!mainQuest.value) {
      if (completedMainQuests.value.length >= STORY_QUESTS.length) {
        message += ` Tebrikler! Taoyuanxiang ana hikâyesinin tüm görevleri tamamlandı!`
      }
    }

    return { success: true, message }
  }

  // ============================================================
  // Serileştirme
  // ============================================================

  const serialize = () => {
    return {
      boardQuests: boardQuests.value,
      activeQuests: activeQuests.value,
      completedQuestCount: completedQuestCount.value,
      specialOrder: specialOrder.value,
      mainQuest: mainQuest.value,
      completedMainQuests: completedMainQuests.value
    }
  }

  const deserialize = (data: ReturnType<typeof serialize>) => {
    boardQuests.value = data.boardQuests ?? []
    activeQuests.value = data.activeQuests ?? []
    completedQuestCount.value = data.completedQuestCount ?? 0
    specialOrder.value = ((data as Record<string, unknown>).specialOrder as QuestInstance | null) ?? null
    mainQuest.value = ((data as Record<string, unknown>).mainQuest as MainQuestState | null) ?? null
    completedMainQuests.value = ((data as Record<string, unknown>).completedMainQuests as string[] | undefined) ?? []
    // Yükleme sonrası ana görevi başlat (eski kayıtlarla uyumluluk için)
    initMainQuest()
  }

  return {
    boardQuests,
    activeQuests,
    completedQuestCount,
    specialOrder,
    mainQuest,
    completedMainQuests,
    MAX_ACTIVE_QUESTS,
    generateDailyQuests,
    generateSpecialOrder,
    acceptQuest,
    acceptSpecialOrder,
    submitQuest,
    onItemObtained,
    dailyUpdate,
    hasActiveQuestFor,
    initMainQuest,
    acceptMainQuest,
    updateMainQuestProgress,
    canSubmitMainQuest,
    submitMainQuest,
    serialize,
    deserialize
  }
})
