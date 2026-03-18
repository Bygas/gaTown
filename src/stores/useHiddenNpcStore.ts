import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { HIDDEN_NPCS, getHiddenNpcById } from '@/data/hiddenNpcs'
import { getHiddenNpcHeartEvents } from '@/data/hiddenNpcHeartEvents'
import { useGameStore } from './useGameStore'
import { useSkillStore } from './useSkillStore'
import { useAchievementStore } from './useAchievementStore'
import { useNpcStore } from './useNpcStore'
import { useQuestStore } from './useQuestStore'
import { useInventoryStore } from './useInventoryStore'
import { usePlayerStore } from './usePlayerStore'
import router from '@/router'
import type { HiddenNpcState, DiscoveryCondition, DiscoveryStep, AffinityLevel, BondBonusType } from '@/types/hiddenNpc'
import type { Quality, HeartEventDef } from '@/types'
import { AFFINITY_THRESHOLDS, MAX_AFFINITY, AFFINITY_DECAY_BONDED, AFFINITY_DECAY_COURTING, MAX_OFFERS_PER_WEEK } from '@/types/hiddenNpc'

/** Sunu için temel bağ puanı */
const OFFERING_RESONANT = 100
const OFFERING_PLEASED = 50
const OFFERING_NEUTRAL = 10
const OFFERING_REPELLED = -40

/** Kalite çarpanı */
const QUALITY_MULTIPLIER: Record<Quality, number> = {
  normal: 1,
  fine: 1.25,
  excellent: 1.5,
  supreme: 2
}

/** Tezahür gününde sunu çarpanı */
const MANIFESTATION_BONUS = 3

const defaultState = (npcId: string): HiddenNpcState => ({
  npcId,
  discoveryPhase: 'unknown',
  completedSteps: [],
  affinity: 0,
  interactedToday: false,
  offeredToday: false,
  offersThisWeek: 0,
  specialInteractionCooldown: 0,
  courting: false,
  bonded: false,
  triggeredHeartEvents: [],
  unlockedAbilities: []
})

export const useHiddenNpcStore = defineStore('hiddenNpc', () => {
  const hiddenNpcStates = ref<HiddenNpcState[]>(HIDDEN_NPCS.map(n => defaultState(n.id)))

  // ==================== Temel sorgular ====================

  const getHiddenNpcState = (npcId: string): HiddenNpcState | undefined => hiddenNpcStates.value.find(s => s.npcId === npcId)

  const getAffinityLevel = (npcId: string): AffinityLevel => {
    const state = getHiddenNpcState(npcId)
    if (!state) return 'wary'
    for (const t of AFFINITY_THRESHOLDS) {
      if (state.affinity >= t.min) return t.level
    }
    return 'wary'
  }

  const getRevealedNpcs = computed(() =>
    HIDDEN_NPCS.filter(n => {
      const s = getHiddenNpcState(n.id)
      return s && s.discoveryPhase === 'revealed'
    })
  )

  const getRumorNpcs = computed(() =>
    HIDDEN_NPCS.filter(n => {
      const s = getHiddenNpcState(n.id)
      return s && (s.discoveryPhase === 'rumor' || s.discoveryPhase === 'glimpse')
    })
  )

  const getBondedNpc = computed(() => {
    const state = hiddenNpcStates.value.find(s => s.bonded)
    return state ? getHiddenNpcById(state.npcId) : undefined
  })

  /** Bugün tezahür günü mü */
  const isManifestationDay = (npcId: string): boolean => {
    const def = getHiddenNpcById(npcId)
    if (!def) return false
    const gameStore = useGameStore()
    return gameStore.season === def.manifestationDay.season && gameStore.day === def.manifestationDay.day
  }

  // ==================== Keşif sistemi ====================

  /** Tek bir keşif koşulunu değerlendir */
  const evaluateCondition = (cond: DiscoveryCondition): boolean => {
    const gameStore = useGameStore()
    const skillStore = useSkillStore()
    const achievementStore = useAchievementStore()
    const npcStore = useNpcStore()
    const questStore = useQuestStore()
    const inventoryStore = useInventoryStore()
    const playerStore = usePlayerStore()

    switch (cond.type) {
      case 'season':
        return gameStore.season === cond.season
      case 'weather':
        return gameStore.weather === cond.weather
      case 'timeRange':
        return gameStore.hour >= cond.minHour && gameStore.hour <= cond.maxHour
      case 'location': {
        const routeName = router.currentRoute.value.name
        return routeName === cond.panel
      }
      case 'item':
        return inventoryStore.getItemCount(cond.itemId) >= (cond.quantity ?? 1)
      case 'skill':
        return skillStore.getSkill(cond.skillType as any).level >= cond.minLevel
      case 'npcFriendship': {
        const npcState = npcStore.getNpcState(cond.npcId)
        return npcState ? npcState.friendship >= cond.minFriendship : false
      }
      case 'questComplete':
        return questStore.completedMainQuests.includes(cond.questId)
      case 'mineFloor':
        return achievementStore.stats.highestMineFloor >= cond.minFloor
      case 'fishCaught':
        return achievementStore.discoveredItems.includes(cond.fishId)
      case 'money':
        return playerStore.money >= cond.minAmount
      case 'yearMin':
        return gameStore.year >= cond.year
      case 'day':
        return gameStore.day === cond.day
      default:
        return false
    }
  }

  /** Tüm NPC'lerin keşif ilerlemesini kontrol et */
  const checkDiscoveryConditions = (): { npcId: string; step: DiscoveryStep }[] => {
    const triggered: { npcId: string; step: DiscoveryStep }[] = []

    for (const npc of HIDDEN_NPCS) {
      const state = getHiddenNpcState(npc.id)
      if (!state || state.discoveryPhase === 'revealed') continue

      // Keşif zincirinde sıradaki tamamlanmamış adımı bul
      for (const step of npc.discoverySteps) {
        if (state.completedSteps.includes(step.id)) continue

        // Tüm koşulları kontrol et
        const allMet = step.conditions.every(evaluateCondition)
        if (allMet) {
          state.completedSteps.push(step.id)
          state.discoveryPhase = step.phase
          triggered.push({ npcId: npc.id, step })
        }
        break // Her seferde yalnızca bir adım ilerlet
      }
    }

    return triggered
  }

  // ==================== Etkileşim sistemi ====================

  /** Bağ puanını artır veya azalt */
  const addAffinity = (npcId: string, amount: number) => {
    const state = getHiddenNpcState(npcId)
    if (!state) return
    state.affinity = Math.max(0, Math.min(MAX_AFFINITY, state.affinity + amount))
  }

  /** Eşya sun */
  const performOffering = (
    npcId: string,
    itemId: string,
    quality: Quality
  ): { success: boolean; message: string; affinityChange: number } => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def) return { success: false, message: 'Bu ruhani varlık bulunamadı.', affinityChange: 0 }
    if (state.discoveryPhase !== 'revealed') return { success: false, message: 'Bu ruhani varlıkla henüz bağ kurulmadı.', affinityChange: 0 }
    if (state.offeredToday) return { success: false, message: 'Bugün zaten sunu yapıldı.', affinityChange: 0 }
    if (state.offersThisWeek >= MAX_OFFERS_PER_WEEK) return { success: false, message: 'Bu haftaki sunu hakkı doldu.', affinityChange: 0 }

    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem(itemId, 1, quality)) {
      return { success: false, message: 'Envanterde bu eşya yok.', affinityChange: 0 }
    }

    let base = OFFERING_NEUTRAL
    if (def.resonantOfferings.includes(itemId)) base = OFFERING_RESONANT
    else if (def.pleasedOfferings.includes(itemId)) base = OFFERING_PLEASED
    else if (def.repelledOfferings.includes(itemId)) base = OFFERING_REPELLED

    let multiplier = QUALITY_MULTIPLIER[quality]
    if (isManifestationDay(npcId)) multiplier *= MANIFESTATION_BONUS

    const change = Math.round(base * multiplier)
    addAffinity(npcId, change)
    state.offeredToday = true
    state.offersThisWeek++

    let reaction = '……'
    if (base === OFFERING_RESONANT) reaction = `${def.name} seninle derin bir uyum hissetti.`
    else if (base === OFFERING_PLEASED) reaction = `${def.name} memnuniyetini gösterdi.`
    else if (base === OFFERING_REPELLED) reaction = `${def.name} kaşlarını çattı.`
    else reaction = `${def.name} sununu kabul etti.`

    return { success: true, message: reaction, affinityChange: change }
  }

  /** Özel etkileşimi gerçekleştir */
  const performSpecialInteraction = (npcId: string): { success: boolean; message: string; affinityChange: number } => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def) return { success: false, message: 'Bu ruhani varlık bulunamadı.', affinityChange: 0 }
    if (state.discoveryPhase !== 'revealed') return { success: false, message: 'Bu ruhani varlıkla henüz bağ kurulmadı.', affinityChange: 0 }
    if (state.interactedToday) return { success: false, message: 'Bugün zaten etkileşim kuruldu.', affinityChange: 0 }
    if (state.specialInteractionCooldown > 0)
      return { success: false, message: `${state.specialInteractionCooldown} gün daha beklemelisin.`, affinityChange: 0 }

    const skillStore = useSkillStore()
    let affinityGain = 30
    let message = ''

    switch (def.interactionType) {
      case 'meditation': {
        // Tefekkür: bağ artışı = toplam yetenek seviyesi × 3
        const totalLevels =
          skillStore.getSkill('farming').level +
          skillStore.getSkill('foraging').level +
          skillStore.getSkill('fishing').level +
          skillStore.getSkill('mining').level
        affinityGain = totalLevels * 3
        message = `Sen ve ${def.name}, su kenarında sessizce tefekküre daldınız.`
        break
      }
      case 'music': {
        // Müzik: temel 30, rastgele ek 0-20
        affinityGain = 30 + Math.floor(Math.random() * 21)
        message = `Sen ve ${def.name} birlikte bir ezgi çaldınız.`
        break
      }
      case 'ritual': {
        // Ritüel: sabit 40
        affinityGain = 40
        message = `Sen ve ${def.name} bir ritüeli tamamladınız.`
        break
      }
      case 'dreamwalk': {
        // Rüya yolculuğu: sabit 35
        affinityGain = 35
        message = `Sen ve ${def.name} aynı düşte bir yolculuğa çıktınız.`
        break
      }
      case 'cultivation': {
        // Gelişim: başarı oranı = madencilik×5 + toplayıcılık×5, başarı +40, başarısızlık +10
        const successRate = skillStore.getSkill('mining').level * 5 + skillStore.getSkill('foraging').level * 5
        if (Math.random() * 100 < successRate) {
          affinityGain = 40
          message = `Gelişim başarılı oldu! Sen ve ${def.name}, gök ile yerin ruhani özünü birlikte idrak ettiniz.`
          const playerStore = usePlayerStore()
          playerStore.restoreStamina(10)
        } else {
          affinityGain = 10
          message = `Gelişim kusursuz olmadı, ama ${def.name} çabanı onaylarcasına başını salladı.`
        }
        break
      }
    }

    addAffinity(npcId, affinityGain)
    state.interactedToday = true
    state.specialInteractionCooldown = 1

    return { success: true, message, affinityChange: affinityGain }
  }

  // ==================== Gönül bağı ve ruh bağı ====================

  const startCourting = (npcId: string): { success: boolean; message: string } => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def) return { success: false, message: 'Bu ruhani varlık bulunamadı.' }
    if (!def.bondable) return { success: false, message: 'Bu ruhani varlıkla bağ kurulamaz.' }
    if (state.courting) return { success: false, message: 'Zaten gönül bağı süreci başladı.' }
    if (state.bonded) return { success: false, message: 'Zaten ruh bağı kuruldu.' }
    if (state.affinity < def.courtshipThreshold) return { success: false, message: `Yetersiz bağ puanı (gerekli: ${def.courtshipThreshold}).` }

    // Başka bir bağ olup olmadığını kontrol et
    const existingBond = hiddenNpcStates.value.find(s => s.bonded || s.courting)
    if (existingBond && existingBond.npcId !== npcId) {
      return { success: false, message: 'Başka bir ruhani varlıkla zaten bir bağ kurulmuş durumda.' }
    }

    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem(def.courtshipItemId, 1)) {
      return { success: false, message: `Gerekli eşya: "${def.courtshipItemId}".` }
    }

    state.courting = true
    return { success: true, message: `${def.name}, gönül teklifini kabul etti.` }
  }

  const formBond = (npcId: string): { success: boolean; message: string } => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def) return { success: false, message: 'Bu ruhani varlık bulunamadı.' }
    if (!state.courting) return { success: false, message: 'Önce gönül bağı sürecini başlatmalısın.' }
    if (state.bonded) return { success: false, message: 'Zaten ruh bağı kuruldu.' }
    if (state.affinity < def.bondThreshold) return { success: false, message: `Yetersiz bağ puanı (gerekli: ${def.bondThreshold}).` }

    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem(def.bondItemId, 1)) {
      return { success: false, message: `Gerekli eşya: "${def.bondItemId}".` }
    }

    state.bonded = true
    return { success: true, message: `Sen ve ${def.name} arasında sonsuz bir ruh bağı kuruldu.` }
  }

  const dissolveBond = (npcId: string): { success: boolean; message: string } => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def) return { success: false, message: 'Bu ruhani varlık bulunamadı.' }
    if (!state.bonded && !state.courting) return { success: false, message: 'Çözülecek bir bağ yok.' }

    const playerStore = usePlayerStore()
    if (playerStore.money < 10000) return { success: false, message: '10000 para gerekiyor.' }
    playerStore.spendMoney(10000)

    state.bonded = false
    state.courting = false
    state.affinity = Math.min(state.affinity, 1000)
    return { success: true, message: `${def.name} ile olan bağ çözüldü.` }
  }

  // ==================== Kalp olayları ====================

  const checkHeartEvent = (npcId: string): HeartEventDef | null => {
    const state = getHiddenNpcState(npcId)
    const def = getHiddenNpcById(npcId)
    if (!state || !def || state.discoveryPhase !== 'revealed') return null

    const events = getHiddenNpcHeartEvents(npcId)
    for (const event of events) {
      if (state.affinity >= event.requiredFriendship && !state.triggeredHeartEvents.includes(event.id)) {
        return event
      }
    }
    return null
  }

  /** Kalp olayını tetiklendi olarak işaretle */
  const markHeartEventTriggered = (npcId: string, eventId: string) => {
    const state = getHiddenNpcState(npcId)
    if (state && !state.triggeredHeartEvents.includes(eventId)) {
      state.triggeredHeartEvents.push(eventId)
    }
  }

  // ==================== Yetenek sistemi ====================

  const checkAbilityUnlocks = (): { id: string; npcId: string; name: string; description: string }[] => {
    const newlyUnlocked: { id: string; npcId: string; name: string; description: string }[] = []

    for (const npc of HIDDEN_NPCS) {
      const state = getHiddenNpcState(npc.id)
      if (!state || state.discoveryPhase !== 'revealed') continue

      for (const ability of npc.abilities) {
        if (state.affinity >= ability.affinityRequired && !state.unlockedAbilities.includes(ability.id)) {
          state.unlockedAbilities.push(ability.id)
          newlyUnlocked.push({ id: ability.id, npcId: npc.id, name: ability.name, description: ability.description })
        }
      }
    }

    return newlyUnlocked
  }

  /** Belirli bir yeteneğin etkin olup olmadığını sorgula */
  const isAbilityActive = (abilityId: string): boolean => {
    return getActiveAbilities.value.some(a => a.id === abilityId)
  }

  /** Belirli bir yeteneğin pasif değerini al (etkin değilse 0 döner) */
  const getAbilityValue = (abilityId: string): number => {
    const ability = getActiveAbilities.value.find(a => a.id === abilityId)
    return ability?.passive.value ?? 0
  }

  /** Mevcut ruh bağı kurulan varlığın bondBonus türünü al (yoksa null) */
  const getBondBonusType = (): string | null => {
    const bondedState = hiddenNpcStates.value.find(s => s.bonded)
    if (!bondedState) return null
    const def = getHiddenNpcById(bondedState.npcId)
    return def?.bondBonuses[0]?.type ?? null
  }

  /** Türe göre ruh bağı ödülünü bul (çoklu ödüllü NPC'leri destekler) */
  const getBondBonusByType = (type: string): BondBonusType | null => {
    for (const state of hiddenNpcStates.value) {
      if (!state.bonded) continue
      const def = getHiddenNpcById(state.npcId)
      if (!def) continue
      const found = def.bondBonuses.find(b => b.type === type)
      if (found) return found
    }
    return null
  }

  /** Mevcut ruh bağı kurulan varlığın tam bondBonus bilgisini al (uyumluluk için: ilkini döner) */
  const getBondBonus = (): BondBonusType | null => {
    const bondedState = hiddenNpcStates.value.find(s => s.bonded)
    if (!bondedState) return null
    const def = getHiddenNpcById(bondedState.npcId)
    return def?.bondBonuses[0] ?? null
  }

  /** Etkin olan tüm pasif yetenekleri al */
  const getActiveAbilities = computed(() => {
    const abilities: {
      npcId: string
      id: string
      name: string
      passive: NonNullable<(typeof HIDDEN_NPCS)[0]['abilities'][0]['passive']>
    }[] = []

    for (const npc of HIDDEN_NPCS) {
      const state = getHiddenNpcState(npc.id)
      if (!state || state.discoveryPhase !== 'revealed') continue

      for (const ability of npc.abilities) {
        if (state.unlockedAbilities.includes(ability.id) && ability.passive) {
          abilities.push({ npcId: npc.id, id: ability.id, name: ability.name, passive: ability.passive })
        }
      }
    }

    return abilities
  })

  // ==================== Günlük işlemler ====================

  /** Ruh bağı günlük ödüllerini işle */
  const dailyBondBonus = (): { messages: string[] } => {
    const messages: string[] = []
    const bondedState = hiddenNpcStates.value.find(s => s.bonded)
    if (!bondedState) return { messages }

    const def = getHiddenNpcById(bondedState.npcId)
    if (!def) return { messages }

    const bonus = def.bondBonuses
    for (const b of bonus) {
      switch (b.type) {
        case 'weather_control': {
          if (Math.random() < b.chance) {
            // Gök ejderhasının kudreti: yarının havasını güneşli yap
            const gameStore = useGameStore()
            gameStore.setTomorrowWeather('sunny')
            messages.push(`${def.name} yarının bulutlarını dağıttı; yarın hava güneşli olacak.`)
          }
          break
        }
        case 'crop_blessing': {
          if (Math.random() < b.chance) {
            messages.push(`${def.name} tarlalarını kutsadı.`)
          }
          break
        }
        case 'animal_blessing': {
          // Pasif etki, hayvansal ürün kalitesi hesaplanırken kontrol edilir
          break
        }
        case 'stamina_restore': {
          const playerStore = usePlayerStore()
          playerStore.restoreStamina(b.amount)
          messages.push(`${def.name} sana ${b.amount} dayanıklılık geri kazandırdı.`)
          break
        }
        case 'spirit_shield': {
          messages.push(`${def.name} seni ruhani bir kalkanla sardı.`)
          break
        }
        case 'sell_bonus': {
          // Pasif etki, satış sırasında kontrol edilir
          break
        }
        case 'fish_attraction': {
          if (Math.random() < b.chance) {
            messages.push(`${def.name} ruhani balıkları kendine çekti.`)
          }
          break
        }
      }
    }

    return { messages }
  }

  /** Günlük sıfırlama */
  const dailyReset = () => {
    const gameStore = useGameStore()

    for (const state of hiddenNpcStates.value) {
      if (state.discoveryPhase !== 'revealed') continue

      // Bağ puanı düşüşü (etkileşim ve sunu yoksa)
      if (!state.interactedToday && !state.offeredToday) {
        if (state.bonded) {
          state.affinity = Math.max(0, state.affinity - AFFINITY_DECAY_BONDED)
        } else if (state.courting) {
          state.affinity = Math.max(0, state.affinity - AFFINITY_DECAY_COURTING)
        }
      }

      // Günlük işaretleri sıfırla
      state.interactedToday = false
      state.offeredToday = false

      // Bekleme süresini azalt
      if (state.specialInteractionCooldown > 0) {
        state.specialInteractionCooldown--
      }

      // Haftalık sunu sayısını sıfırla (7/14/21/28. gün)
      if (gameStore.day % 7 === 0) {
        state.offersThisWeek = 0
      }
    }
  }

  // ==================== Serileştirme ====================

  const serialize = () => ({
    hiddenNpcStates: hiddenNpcStates.value
  })

  const deserialize = (data: ReturnType<typeof serialize>) => {
    const savedStates = (data.hiddenNpcStates ?? []).map((s: any) => ({
      ...defaultState(s.npcId),
      ...s
    }))
    // Birleştir: kayıtlı olanları koru, yeni NPC'ler için varsayılan durum ekle
    const savedIds = new Set(savedStates.map((s: HiddenNpcState) => s.npcId))
    const newStates = HIDDEN_NPCS.filter(n => !savedIds.has(n.id)).map(n => defaultState(n.id))
    hiddenNpcStates.value = [...savedStates, ...newStates]
  }

  return {
    hiddenNpcStates,
    getHiddenNpcState,
    getAffinityLevel,
    getRevealedNpcs,
    getRumorNpcs,
    getBondedNpc,
    isManifestationDay,
    evaluateCondition,
    checkDiscoveryConditions,
    addAffinity,
    performOffering,
    performSpecialInteraction,
    startCourting,
    formBond,
    dissolveBond,
    checkHeartEvent,
    markHeartEventTriggered,
    checkAbilityUnlocks,
    getActiveAbilities,
    isAbilityActive,
    getAbilityValue,
    getBondBonusType,
    getBondBonus,
    getBondBonusByType,
    dailyBondBonus,
    dailyReset,
    serialize,
    deserialize
  }
})
