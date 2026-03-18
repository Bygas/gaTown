import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MonsterDef, CombatAction, MineFloorDef, MineTile, Quality } from '@/types'
import {
  getFloor,
  getRewardNames,
  getInfestedClearRewards,
  BOSS_MONSTERS,
  BOSS_MONEY_REWARDS,
  BOSS_ORE_REWARDS,
  getWeakenedBoss,
  MAX_MINE_FLOOR,
  generateSkullCavernFloor,
  scaleMonster,
  generateFloorGrid,
  getAdjacentIndices,
  getBombIndices
} from '@/data'
import { getBombById } from '@/data/processing'
import { getItemById } from '@/data/items'
import {
  getWeaponById,
  getEnchantmentById,
  MONSTER_DROP_WEAPONS,
  BOSS_DROP_WEAPONS,
  TREASURE_DROP_WEAPONS,
  rollRandomEnchantment,
  getWeaponDisplayName
} from '@/data/weapons'
import { getRingById, MONSTER_DROP_RINGS, BOSS_DROP_RINGS, TREASURE_DROP_RINGS } from '@/data/rings'
import { getHatById, MONSTER_DROP_HATS, BOSS_DROP_HATS, TREASURE_DROP_HATS } from '@/data/hats'
import { getShoeById, MONSTER_DROP_SHOES, BOSS_DROP_SHOES, TREASURE_DROP_SHOES } from '@/data/shoes'
import { usePlayerStore } from './usePlayerStore'
import { useInventoryStore } from './useInventoryStore'
import { useSkillStore } from './useSkillStore'
import { useAchievementStore } from './useAchievementStore'
import { useGuildStore } from './useGuildStore'
import { useQuestStore } from './useQuestStore'
import { useCookingStore } from './useCookingStore'
import { useGameStore } from './useGameStore'
import { useWalletStore } from './useWalletStore'
import { useSecretNoteStore } from './useSecretNoteStore'
import { useHiddenNpcStore } from './useHiddenNpcStore'
import type { SkullCavernFloorDef } from '@/data/mine'

const DEFEAT_MONEY_PENALTY_RATE = 0.1
const DEFEAT_MONEY_PENALTY_CAP = 15000
const DEFEAT_MAX_ITEM_LOSS = 3

export const useMiningStore = defineStore('mining', () => {
  const playerStore = usePlayerStore()
  const inventoryStore = useInventoryStore()
  const skillStore = useSkillStore()

  /** Mevcut ilerleme (ana maden) */
  const currentFloor = ref(1)
  const safePointFloor = ref(0)
  const isExploring = ref(false)

  /** Skull Cavern durumu */
  const isInSkullCavern = ref(false)
  const skullCavernFloor = ref(0)
  const skullCavernBestFloor = ref(0)
  const cachedSkullFloorData = ref<SkullCavernFloorDef | null>(null)

  /** Savaş durumu */
  const inCombat = ref(false)
  const combatMonster = ref<MonsterDef | null>(null)
  const combatMonsterHp = ref(0)
  const combatRound = ref(0)
  const combatLog = ref<string[]>([])
  const combatIsBoss = ref(false)

  /** Yenilmiş BOSS'lar (ilk öldürme kaydı) */
  const defeatedBosses = ref<string[]>([])

  /** Bu keşif sırasında toplanan eşyalar (çıkarken %50 kayıp için) */
  const sessionLoot = ref<{ itemId: string; quantity: number }[]>([])

  /** Katil tılsımı etkisi: bu keşifte düşme oranı +%20 */
  const slayerCharmActive = ref(false)
  /** Lonca rozeti birikimli saldırı bonusu (kalıcı) */
  const guildBadgeBonusAttack = ref(0)
  /** Yaşam tılsımı birikimli maksimum HP bonusu (kalıcı) */
  const guildBonusMaxHp = ref(0)
  /** Şanslı para birikimli düşme oranı bonusu (kalıcı, her seferinde +0.05) */
  const guildBonusDropRate = ref(0)
  /** Koruyucu tılsım birikimli savunma bonusu (kalıcı, her seferinde +0.03) */
  const guildBonusDefense = ref(0)

  // ==================== Kare keşif durumu ====================

  /** Mevcut kattaki 6×6 kareler */
  const floorGrid = ref<MineTile[]>([])
  /** Giriş karesi indeksi */
  const entryIndex = ref(0)
  /** Merdiven bulundu mu */
  const stairsFound = ref(false)
  /** Merdiven kullanılabilir mi (istilalı/BOSS katlarında hepsi temizlenmeli) */
  const stairsUsable = ref(false)
  /** Mevcut kattaki toplam canavar sayısı */
  const totalMonstersOnFloor = ref(0)
  /** Yenilen canavar sayısı */
  const monstersDefeatedCount = ref(0)
  /** Mevcut savaşın ilgili olduğu kare indeksi */
  const _combatTileIndex = ref(-1)

  // ==================== Skull Cavern yardımcıları ====================

  /** Skull Cavern açıldı mı (60. kat BOSS'u yenilince) */
  const isSkullCavernUnlocked = (): boolean => {
    return defeatedBosses.value.includes('lava_lord')
  }

  /** Şu an aktif olan kat numarasını al */
  const getActiveFloorNum = (): number => {
    return isInSkullCavern.value ? skullCavernFloor.value : currentFloor.value
  }

  /** Şu an aktif olan kat verisini al (ana maden ve Skull Cavern uyumlu) */
  const getActiveFloorData = (): MineFloorDef | undefined => {
    if (isInSkullCavern.value) {
      const sc = cachedSkullFloorData.value
      if (!sc) return undefined
      return {
        floor: sc.floor,
        zone: 'abyss',
        ores: sc.ores,
        monsters: sc.monsters.map(m => scaleMonster(m, sc.scaleFactor)),
        isSafePoint: false,
        specialType: sc.specialType
      }
    }
    return getFloor(currentFloor.value)
  }

  /** Skull Cavern mevcut kat verisini oluştur ve önbelleğe al */
  const cacheSkullFloor = (floor: number) => {
    cachedSkullFloorData.value = generateSkullCavernFloor(floor)
  }

  // ==================== Kare oluşturma ====================

  /** Mevcut katın 6×6 karelerini oluştur */
  const _generateGrid = () => {
    const floor = getActiveFloorData()
    if (!floor) return

    const floorNum = getActiveFloorNum()
    const scaleFactor = isInSkullCavern.value ? (cachedSkullFloorData.value?.scaleFactor ?? 1) : 1

    // BOSS katı ilk öldürme kontrolü: BOSS verisini değiştir
    let floorForGrid = floor
    if (floor.specialType === 'boss' && !isInSkullCavern.value) {
      const bossId = BOSS_MONSTERS[currentFloor.value]?.id
      const isFirstKill = bossId ? !defeatedBosses.value.includes(bossId) : true
      if (!isFirstKill) {
        // Zayıflatılmış BOSS — kareler oluşturulduktan sonra değiştirilmeli
        // generateFloorGrid orijinal BOSS'u kullanacak, burada üzerine yazıyoruz
        const result = generateFloorGrid(floorForGrid, floorNum, isInSkullCavern.value, scaleFactor)
        // BOSS karesindeki canavarı zayıflatılmış sürümle değiştir
        const weakBoss = getWeakenedBoss(currentFloor.value)
        if (weakBoss) {
          for (const tile of result.tiles) {
            if (tile.type === 'boss' && tile.data?.monster) {
              tile.data.monster = weakBoss
            }
          }
        }
        floorGrid.value = result.tiles
        entryIndex.value = result.entryIndex
        totalMonstersOnFloor.value = result.totalMonsters
        monstersDefeatedCount.value = 0
        stairsFound.value = false
        stairsUsable.value = result.stairsUsable
        _combatTileIndex.value = -1
        return
      }
    }

    const result = generateFloorGrid(floorForGrid, floorNum, isInSkullCavern.value, scaleFactor)
    floorGrid.value = result.tiles
    entryIndex.value = result.entryIndex
    totalMonstersOnFloor.value = result.totalMonsters
    monstersDefeatedCount.value = 0
    stairsFound.value = false
    stairsUsable.value = result.stairsUsable
    _combatTileIndex.value = -1
  }

  // ==================== Kare etkileşimi ====================

  /** Açığa çıkmış canavar/BOSS ile yeniden savaş (kaçtıktan sonra veya bombayla açıldıktan sonra) */
  const engageRevealedMonster = (index: number): { success: boolean; message: string; startsCombat: boolean } => {
    if (!isExploring.value) return { success: false, message: 'Madende değilsin.', startsCombat: false }
    if (inCombat.value) return { success: false, message: 'Savaş sırasında keşif yapamazsın.', startsCombat: false }

    const tile = floorGrid.value[index]
    if (!tile || tile.state !== 'revealed') return { success: false, message: 'Savaşa girilemez.', startsCombat: false }
    if (tile.type !== 'monster' && tile.type !== 'boss') return { success: false, message: 'Bu karede canavar yok.', startsCombat: false }

    const monster = tile.data?.monster
    if (!monster) return { success: false, message: 'Bu karede canavar yok.', startsCombat: false }

    _combatTileIndex.value = tile.index
    combatMonster.value = { ...monster }
    combatMonsterHp.value = monster.hp
    combatRound.value = 0

    if (tile.type === 'boss') {
      const isFirstKill = !defeatedBosses.value.includes(monster.id)
      combatLog.value = [`BOSS savaşı! ${monster.name} ile tekrar karşılaştın! (HP: ${monster.hp})${isFirstKill ? '' : ' (zayıflatılmış sürüm)'}`]
      combatIsBoss.value = true
    } else {
      combatLog.value = [`${monster.name} ile tekrar karşılaştın! (HP: ${monster.hp})`]
      combatIsBoss.value = false
    }
    inCombat.value = true

    return { success: true, message: `${monster.name} ile savaşa girdin!`, startsCombat: true }
  }

  /** Karenin açılıp açılamayacağını kontrol et */
  const canRevealTile = (index: number): boolean => {
    const tile = floorGrid.value[index]
    if (!tile || tile.state !== 'hidden') return false
    // En az bir komşu kare açılmış olmalı
    const adj = getAdjacentIndices(index)
    return adj.some(a => {
      const t = floorGrid.value[a]
      return t && t.state !== 'hidden'
    })
  }

  /** Kareyi aç — temel etkileşim girişi */
  const revealTile = (index: number): { success: boolean; message: string; startsCombat: boolean } => {
    if (!isExploring.value) return { success: false, message: 'Madende değilsin.', startsCombat: false }
    if (inCombat.value) return { success: false, message: 'Savaş sırasında keşif yapamazsın.', startsCombat: false }

    const tile = floorGrid.value[index]
    if (!tile || tile.state !== 'hidden') return { success: false, message: 'Bu kare açılamaz.', startsCombat: false }
    if (!canRevealTile(index)) return { success: false, message: 'Yalnızca keşfedilmiş karelere bitişik olan yerler açılabilir.', startsCombat: false }

    // Kazmanın kullanılabilir olduğunu kontrol et (geliştirme aşamasında olmamalı)
    if (!inventoryStore.isToolAvailable('pickaxe')) {
      return { success: false, message: 'Kazma geliştiriliyor, madende keşif yapılamaz.', startsCombat: false }
    }

    // Dayanıklılık harca (temel 1 puan, kazma/yetenek/buff ile azaltılabilir)
    const pickaxeMultiplier = inventoryStore.getToolStaminaMultiplier('pickaxe')
    const cookingStore = useCookingStore()
    const miningBuff = cookingStore.activeBuff?.type === 'mining' ? cookingStore.activeBuff.value / 100 : 0
    const walletStore = useWalletStore()
    const walletMiningReduction = walletStore.getMiningStaminaReduction()
    const ringMiningReduction = inventoryStore.getRingEffectValue('mining_stamina')
    const ringGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
    // Ruhsal yetenek: Odaklanma (shan_weng_1) madencilikte dayanıklılık -%15
    const spiritMiningReduction = useHiddenNpcStore().getAbilityValue('shan_weng_1') / 100
    const staminaCost = Math.max(
      1,
      Math.floor(
        2 *
          pickaxeMultiplier *
          (1 - skillStore.getStaminaReduction('mining')) *
          (1 - miningBuff) *
          (1 - walletMiningReduction) *
          (1 - ringMiningReduction) *
          (1 - ringGlobalReduction) *
          (1 - spiritMiningReduction)
      )
    )
    if (!playerStore.consumeStamina(staminaCost)) {
      return { success: false, message: 'Yeterli dayanıklılık yok, keşif yapılamaz.', startsCombat: false }
    }

    // %3 ihtimalle gizli not kazan
    if (Math.random() < 0.03) {
      useSecretNoteStore().tryCollectNote()
    }

    // Türe göre işle
    switch (tile.type) {
      case 'empty':
        return _handleEmptyTile(tile, staminaCost)
      case 'ore':
        return _handleOreTile(tile, staminaCost)
      case 'monster':
        return _handleMonsterTile(tile, staminaCost)
      case 'boss':
        return _handleBossTile(tile, staminaCost)
      case 'stairs':
        return _handleStairsTile(tile, staminaCost)
      case 'trap':
        return _handleTrapTile(tile, staminaCost)
      case 'treasure':
        return _handleTreasureTile(tile, staminaCost)
      case 'mushroom':
        return _handleMushroomTile(tile, staminaCost)
      default:
        tile.state = 'revealed'
        return { success: true, message: 'Burada hiçbir şey yok.', startsCombat: false }
    }
  }

  /** Boş kareyi işle */
  const _handleEmptyTile = (tile: MineTile, staminaCost: number): { success: boolean; message: string; startsCombat: boolean } => {
    tile.state = 'revealed'
    return { success: true, message: `Boş bir alan keşfettin. (-${staminaCost} dayanıklılık)`, startsCombat: false }
  }

  /** Maden cevheri karesini işle */
  const _handleOreTile = (tile: MineTile, staminaCost: number): { success: boolean; message: string; startsCombat: boolean } => {
    const oreId = tile.data?.oreId ?? 'copper_ore'
    let quantity = tile.data?.oreQuantity ?? 1

    // Madenci uzmanlığı: %50 ihtimalle +1
    if (skillStore.getSkill('mining').perk5 === 'miner' && Math.random() < 0.5) quantity += 1
    // Tepe çiftliği bonusu: %50 ihtimalle +1
    const gameStore = useGameStore()
    if (gameStore.farmMapType === 'hilltop' && Math.random() < 0.5) quantity += 1
    // Arayıcı uzmanlığı: %15 ihtimalle iki katı
    if (skillStore.getSkill('mining').perk10 === 'prospector' && Math.random() < 0.15) quantity *= 2
    // Yüzük cevher bonusu
    const ringOreBonus = inventoryStore.getRingEffectValue('ore_bonus')
    if (ringOreBonus > 0) quantity += Math.floor(ringOreBonus)
    // Ruhsal yetenek: Ruh Tilkisi Gözü (hu_xian_2) %15 ihtimalle ekstra cevher
    if (useHiddenNpcStore().isAbilityActive('hu_xian_2') && Math.random() < 0.15) quantity += 1

    inventoryStore.addItem(oreId, quantity)
    sessionLoot.value.push({ itemId: oreId, quantity })
    useAchievementStore().discoverItem(oreId)
    useQuestStore().onItemObtained(oreId, quantity)

    // Ruhsal yetenek: Şifalı Dağ (shan_weng_2) madende %15 ihtimalle nadir bitki toplar
    const hiddenNpcStore = useHiddenNpcStore()
    if (hiddenNpcStore.isAbilityActive('shan_weng_2') && Math.random() < 0.15) {
      const herbs = ['herb', 'ginseng'] as const
      const herbId = herbs[Math.floor(Math.random() * herbs.length)]!
      inventoryStore.addItem(herbId, 1)
      sessionLoot.value.push({ itemId: herbId, quantity: 1 })
    }

    // Tecrübe
    const hilltopXpBonus = gameStore.farmMapType === 'hilltop' ? 1.25 : 1.0
    skillStore.addExp('mining', Math.floor(5 * hilltopXpBonus))

    tile.state = 'collected'
    return { success: true, message: `${quantity} adet cevher çıkardın! (-${staminaCost} dayanıklılık)`, startsCombat: false }
  }

  /** Canavar karesini işle */
  const _handleMonsterTile = (tile: MineTile, staminaCost: number): { success: boolean; message: string; startsCombat: boolean } => {
    const monster = tile.data?.monster
    if (!monster) {
      tile.state = 'revealed'
      return { success: true, message: 'Burada hiçbir şey yok.', startsCombat: false }
    }

    _combatTileIndex.value = tile.index
    combatMonster.value = { ...monster }
    combatMonsterHp.value = monster.hp
    combatRound.value = 0
    combatLog.value = [`${monster.name} ile karşılaştın! (HP: ${monster.hp}) (-${staminaCost} dayanıklılık)`]
    combatIsBoss.value = false
    inCombat.value = true

    return { success: true, message: `${monster.name} ile karşılaştın!`, startsCombat: true }
  }

  /** BOSS karesini işle */
  const _handleBossTile = (tile: MineTile, staminaCost: number): { success: boolean; message: string; startsCombat: boolean } => {
    const monster = tile.data?.monster
    if (!monster) {
      tile.state = 'revealed'
      return { success: true, message: 'Burada hiçbir şey yok.', startsCombat: false }
    }

    _combatTileIndex.value = tile.index
    combatMonster.value = { ...monster }
    combatMonsterHp.value = monster.hp
    combatRound.value = 0

    const isFirstKill = !defeatedBosses.value.includes(monster.id)
    combatLog.value = [`BOSS savaşı! ${monster.name} ile karşılaştın! (HP: ${monster.hp})${isFirstKill ? '' : ' (zayıflatılmış sürüm)'} (-${staminaCost} dayanıklılık)`]
    combatIsBoss.value = true
    inCombat.value = true

    return { success: true, message: `BOSS katı! ${monster.name} yolunu kesti!`, startsCombat: true }
  }

  /** Merdiven karesini işle */
  const _handleStairsTile = (tile: MineTile, staminaCost: number): { success: boolean; message: string; startsCombat: boolean } => {
    tile.state = 'revealed'
    stairsFound.value = true

    if (!stairsUsable.value) {
      const floor = getActiveFloorData()
      if (floor?.specialType === 'infested') {
        const remaining = totalMonstersOnFloor.value - monstersDefeatedCount.value
        return {
          success: true,
          message: `Merdiven bulundu! Ama ilerlemek için önce kalan ${remaining} canavarı temizlemelisin. (-${staminaCost} dayanıklılık)`,
          startsCombat: false
        }
      }
      if (floor?.specialType === 'boss') {
        return { success: true, message: `Merdiven bulundu! Ama ilerlemek için önce BOSS'u yenmelisin. (-${staminaCost} dayanıklılık)`, startsCombat: false }
      }
    }

    return { success: true, message: `Merdiven bulundu! Bir sonraki kata geçebilirsin. (-${staminaCost} dayanıklılık)`, startsCombat: false }
  }

  /** Tuzak karesini işle */
  const _handleTrapTile = (tile: MineTile, staminaCost: number): { success: boolean; message: string; startsCombat: boolean } => {
    const damage = tile.data?.trapDamage ?? 5
    playerStore.takeDamage(damage)
    tile.state = 'triggered'

    if (playerStore.hp <= 0) {
      const defeatResult = handleDefeat()
      return { success: true, message: `Tuzağa bastın! ${damage} hasar aldın. ${defeatResult.message}`, startsCombat: false }
    }

    return { success: true, message: `Tuzağa bastın! ${damage} hasar aldın. (-${staminaCost} dayanıklılık)`, startsCombat: false }
  }

  /** Hazine sandığı karesini işle */
  const _handleTreasureTile = (tile: MineTile, staminaCost: number): { success: boolean; message: string; startsCombat: boolean } => {
    const items = tile.data?.treasureItems ?? []
    const money = tile.data?.treasureMoney ?? 0

    for (const r of items) {
      inventoryStore.addItem(r.itemId, r.quantity)
      sessionLoot.value.push(r)
      useAchievementStore().discoverItem(r.itemId)
    }
    if (money > 0) playerStore.earnMoney(money)

    // Sandıktan yüzük düşmesi
    const floor = getActiveFloorData()
    const treasureRings = TREASURE_DROP_RINGS[floor?.zone ?? 'shallow']
    if (treasureRings) {
      const ringTreasureBonus = inventoryStore.getRingEffectValue('treasure_find')
      for (const tr of treasureRings) {
        if (Math.random() < tr.chance + ringTreasureBonus * tr.chance) {
          inventoryStore.addRing(tr.ringId)
          const ringDef = getRingById(tr.ringId)
          items.push({ itemId: tr.ringId, quantity: 1 })
          if (ringDef) {
            if (money > 0 || items.length > 1) {
              // mesaj aşağıda yüzük adını içerecek
            }
          }
        }
      }
    }

    // Sandıktan şapka düşmesi
    const treasureHats = TREASURE_DROP_HATS[floor?.zone ?? 'shallow']
    if (treasureHats) {
      const treasureBonus = inventoryStore.getRingEffectValue('treasure_find')
      for (const th of treasureHats) {
        if (Math.random() < th.chance + treasureBonus * th.chance) {
          inventoryStore.addHat(th.hatId)
          items.push({ itemId: th.hatId, quantity: 1 })
        }
      }
    }

    // Sandıktan ayakkabı düşmesi
    const treasureShoes = TREASURE_DROP_SHOES[floor?.zone ?? 'shallow']
    if (treasureShoes) {
      const treasureBonus = inventoryStore.getRingEffectValue('treasure_find')
      for (const ts of treasureShoes) {
        if (Math.random() < ts.chance + treasureBonus * ts.chance) {
          inventoryStore.addShoe(ts.shoeId)
          items.push({ itemId: ts.shoeId, quantity: 1 })
        }
      }
    }

    // Sandıktan silah düşmesi
    const treasureWeapons = TREASURE_DROP_WEAPONS[floor?.zone ?? 'shallow']
    if (treasureWeapons) {
      const treasureBonus = inventoryStore.getRingEffectValue('treasure_find')
      for (const tw of treasureWeapons) {
        if (Math.random() < tw.chance + treasureBonus * tw.chance) {
          const enchantId = rollRandomEnchantment()
          inventoryStore.addWeapon(tw.weaponId, enchantId)
          items.push({ itemId: tw.weaponId, quantity: 1 })
        }
      }
    }

    tile.state = 'collected'

    let msg = 'Bir hazine sandığı buldun!'
    if (items.length > 0) msg += `${getRewardNames(items)} kazandın`
    if (money > 0) msg += `${items.length > 0 ? ' ve ' : ''}${money} para aldın`
    msg += `! (-${staminaCost} dayanıklılık)`
    return { success: true, message: msg, startsCombat: false }
  }

  /** Mantar karesini işle */
  const _handleMushroomTile = (tile: MineTile, staminaCost: number): { success: boolean; message: string; startsCombat: boolean } => {
    const items = tile.data?.mushroomItems ?? []

    for (const r of items) {
      inventoryStore.addItem(r.itemId, r.quantity)
      sessionLoot.value.push(r)
      useAchievementStore().discoverItem(r.itemId)
    }
    skillStore.addExp('foraging', 3)

    tile.state = 'collected'
    return { success: true, message: `${getRewardNames(items)} topladın! (+3 toplama deneyimi, -${staminaCost} dayanıklılık)`, startsCombat: false }
  }

  // ==================== Bombalar ====================

  /** Kare üzerinde bomba kullan */
  const useBombOnGrid = (bombId: string, centerIndex: number): { success: boolean; message: string } => {
    if (!isExploring.value) return { success: false, message: 'Madende değilsin.' }
    if (inCombat.value) return { success: false, message: 'Savaş sırasında bomba kullanamazsın.' }

    const bombDef = getBombById(bombId)
    if (!bombDef) return { success: false, message: 'Geçersiz bomba.' }
    if (!inventoryStore.removeItem(bombId)) return { success: false, message: 'Envanterinde bu bomba yok.' }

    // Kazıcı uzmanlığı: %30 ihtimalle bomba tüketilmez
    const excavatorSaved = skillStore.getSkill('mining').perk10 === 'excavator' && Math.random() < 0.3
    if (excavatorSaved) {
      inventoryStore.addItem(bombId, 1)
    }

    const indices = getBombIndices(centerIndex, bombId)
    const floor = getActiveFloorData()

    let oreCollected = 0
    let monstersKilled = 0
    const collectedOres: string[] = []

    for (const idx of indices) {
      const tile = floorGrid.value[idx]
      if (!tile || tile.state !== 'hidden') continue

      switch (tile.type) {
        case 'empty':
          tile.state = 'revealed'
          break
        case 'ore': {
          const oreId = tile.data?.oreId ?? 'copper_ore'
          // Bombayla madencilikte madenci uzmanlığı/arazi/arayıcı bonusları geçmez, sadece temel miktar verilir
          const quantity = tile.data?.oreQuantity ?? 1
          inventoryStore.addItem(oreId, quantity)
          sessionLoot.value.push({ itemId: oreId, quantity })
          useAchievementStore().discoverItem(oreId)
          collectedOres.push(oreId)
          oreCollected++
          tile.state = 'collected'
          break
        }
        case 'monster': {
          if (bombDef.clearsMonster && tile.data?.monster) {
            // Bombayla canavar öldürme: %50 deneyim
            const monster = tile.data.monster
            const wildernessXpBonus = useGameStore().farmMapType === 'wilderness' ? 1.5 : 1.0
            skillStore.addExp('combat', Math.floor(monster.expReward * 0.5 * wildernessXpBonus))
            // Normal düşüşler (olasılık yarıya iner)
            for (const drop of monster.drops) {
              if (Math.random() < drop.chance * 0.5) {
                inventoryStore.addItem(drop.itemId)
                sessionLoot.value.push({ itemId: drop.itemId, quantity: 1 })
              }
            }
            tile.state = 'defeated'
            monstersDefeatedCount.value++
            useAchievementStore().recordMonsterKill()
            useGuildStore().recordKill(monster.id)
            monstersKilled++
          } else {
            // Havai fişek sadece açığa çıkarır, öldürmez
            tile.state = 'revealed'
          }
          break
        }
        case 'boss':
          // Bomba BOSS'u öldürmez, sadece açığa çıkarır
          tile.state = 'revealed'
          break
        case 'trap':
          // Bomba tuzağı patlatır, hasar alınmaz
          tile.state = 'triggered'
          break
        case 'stairs':
          tile.state = 'revealed'
          stairsFound.value = true
          break
        case 'treasure': {
          const items = tile.data?.treasureItems ?? []
          const money = tile.data?.treasureMoney ?? 0
          for (const r of items) {
            inventoryStore.addItem(r.itemId, r.quantity)
            sessionLoot.value.push(r)
          }
          if (money > 0) playerStore.earnMoney(money)
          tile.state = 'collected'
          break
        }
        case 'mushroom': {
          const items = tile.data?.mushroomItems ?? []
          for (const r of items) {
            inventoryStore.addItem(r.itemId, r.quantity)
            sessionLoot.value.push(r)
          }
          tile.state = 'collected'
          break
        }
      }
    }

    // İstilalı/BOSS katı temizleme koşulunu kontrol et
    if (monstersDefeatedCount.value >= totalMonstersOnFloor.value && totalMonstersOnFloor.value > 0) {
      stairsUsable.value = true
      // İstilalı kat temizleme ödülü
      if (floor?.specialType === 'infested') {
        const activeFloorNum = getActiveFloorNum()
        const clearRewards = getInfestedClearRewards(activeFloorNum)
        for (const r of clearRewards.items) {
          inventoryStore.addItem(r.itemId, r.quantity)
          sessionLoot.value.push(r)
        }
        playerStore.earnMoney(clearRewards.money)
      }
    }

    if (oreCollected > 0) skillStore.addExp('mining', 5 * oreCollected)

    let msg = `${bombDef.name} patladı!`
    if (oreCollected > 0) msg += `${oreCollected} cevher toplandı`
    if (monstersKilled > 0) msg += `${oreCollected > 0 ? ', ' : ''}${monstersKilled} canavar yenildi`
    if (oreCollected === 0 && monstersKilled === 0) msg += 'Bazı alanlar açığa çıkarıldı'
    msg += '!'
    if (excavatorSaved) msg += ' (Kazıcı: bomba tüketilmedi!)'
    return { success: true, message: msg }
  }

  // ==================== Giriş / Çıkış ====================

  /** Madene gir (isteğe bağlı güvenli nokta katından başla) */
  const enterMine = (startFromSafePoint?: number): string => {
    isExploring.value = true
    isInSkullCavern.value = false
    const baseFloor = startFromSafePoint ?? safePointFloor.value
    currentFloor.value = baseFloor + 1
    sessionLoot.value = []

    _generateGrid()

    // BOSS katıysa otomatik savaşa gir (eğer boss karedeyse ve girişin yanında ise)
    _checkAutoBossCombat()

    return `Bulut Gizemi Madenine girdin, şu an ${currentFloor.value}. kattasın.`
  }

  /** Skull Cavern'a gir */
  const enterSkullCavern = (): string => {
    if (!isSkullCavernUnlocked()) return 'Skull Cavern\'a girmek için önce 60. kat BOSS\'unu yenmelisin.'
    isExploring.value = true
    isInSkullCavern.value = true
    skullCavernFloor.value = 1
    cacheSkullFloor(1)
    sessionLoot.value = []

    _generateGrid()

    _checkAutoBossCombat()

    return 'Skull Cavern\'a girdin, şu an 1. kattasın.'
  }

  /** BOSS savaşının otomatik tetiklenip tetiklenmeyeceğini kontrol et (BOSS karesi girişe bitişikse) */
  const _checkAutoBossCombat = () => {
    // BOSS katında otomatik tetikleme yok — oyuncu BOSS karesini kendisi keşfetmeli
  }

  /** Açılmış tüm güvenli noktaları al (kat seçimi için) */
  const getUnlockedSafePoints = (): number[] => {
    const points: number[] = [0] // 0 = 1. kattan başla
    for (let f = 5; f <= safePointFloor.value; f += 5) {
      points.push(f)
    }
    return points
  }

  // ==================== Savaş ====================

  /** Savaş aksiyonu */
  const combatAction = (action: CombatAction): { message: string; combatOver: boolean; won: boolean } => {
    if (!inCombat.value || !combatMonster.value) {
      return { message: 'Savaşta değilsin.', combatOver: true, won: false }
    }

    combatRound.value++
    const monster = combatMonster.value

    // BOSS savaşında kaçış yok
    if (action === 'flee') {
      if (combatIsBoss.value) {
        combatLog.value.push('BOSS savaşından kaçamazsın!')
        return { message: 'BOSS savaşından kaçamazsın!', combatOver: false, won: false }
      }
      inCombat.value = false
      // Kaçınca kare revealed olarak işaretlenir (canavar hâlâ orada ama açılmıştır)
      if (_combatTileIndex.value >= 0) {
        const tile = floorGrid.value[_combatTileIndex.value]
        if (tile) tile.state = 'revealed'
        _combatTileIndex.value = -1
      }
      combatLog.value.push('Kaçtın!')
      return { message: 'Savaştan başarıyla kaçtın.', combatOver: true, won: false }
    }

    if (action === 'defend') {
      // Savunma alınan hasarı azaltır (Ağır zırh uzmanlığı: %70 azaltma, varsayılan %60)
      const cookingStore = useCookingStore()
      const defenseReduction = cookingStore.activeBuff?.type === 'defense' ? cookingStore.activeBuff.value / 100 : 0
      const tankReduction = skillStore.getSkill('combat').perk10 === 'tank' ? 0.7 : 0.6
      // Sağlamlık büyüsü
      const owned = inventoryStore.getEquippedWeapon()
      const enchant = owned.enchantmentId ? getEnchantmentById(owned.enchantmentId) : null
      const sturdyReduction = enchant?.special === 'sturdy' ? 0.85 : 1.0
      const ringDefenseBonus = inventoryStore.getRingEffectValue('defense_bonus')
      const damage = Math.max(
        1,
        Math.floor(
          monster.attack *
            (1 - tankReduction) *
            (1 - defenseReduction) *
            sturdyReduction *
            (1 - ringDefenseBonus) *
            (1 - guildBonusDefense.value)
        )
      )
      playerStore.takeDamage(damage)
      let defendMsg = `Kalkanını kaldırıp savundun, ${damage} hasar aldın.`

      // Koruyucu uzmanlığı: savunma turunda 5 HP iyileştirir
      if (skillStore.getSkill('combat').perk5 === 'defender') {
        playerStore.restoreHealth(5)
        defendMsg += ' (Koruyucu 5 HP yeniledi)'
      }

      combatLog.value.push(defendMsg)

      if (playerStore.hp <= 0) {
        return handleDefeat()
      }
      return { message: `Savundun! ${damage} hasar aldın.`, combatOver: false, won: false }
    }

    // === Saldırı ===
    const cookingStore = useCookingStore()
    const owned = inventoryStore.getEquippedWeapon()
    const weaponDef = getWeaponById(owned.defId)
    const enchant = owned.enchantmentId ? getEnchantmentById(owned.enchantmentId) : null

    // Temel saldırı gücü (yüzük bonusu + yemek genel beceri bonusu dahil)
    const ringAttackBonus = inventoryStore.getRingEffectValue('attack_bonus')
    const allSkillsBuff = cookingStore.activeBuff?.type === 'all_skills' ? cookingStore.activeBuff.value : 0
    const guildStore = useGuildStore()
    const baseAttack =
      inventoryStore.getWeaponAttack() +
      (skillStore.combatLevel + allSkillsBuff) * 2 +
      ringAttackBonus +
      guildBadgeBonusAttack.value +
      guildStore.getGuildAttackBonus()
    const bruteBonus = skillStore.getSkill('combat').perk10 === 'brute' ? 1.25 : 1.0

    // Kritik vuruş kontrolü (yüzük bonusu + şans bonusu dahil)
    const ringCritBonus = inventoryStore.getRingEffectValue('crit_rate_bonus')
    const ringLuck = inventoryStore.getRingEffectValue('luck')
    const critRate = inventoryStore.getWeaponCritRate() + ringCritBonus + ringLuck * 0.5
    const isCrit = Math.random() < critRate
    const critMult = isCrit ? 1.5 : 1.0

    const damageToMonster = Math.max(1, Math.floor((baseAttack - monster.defense) * bruteBonus * critMult))
    combatMonsterHp.value -= damageToMonster
    const totalDamageDealt = damageToMonster

    let msg = `${monster.name}'e saldırdın ve ${damageToMonster} hasar verdin.`
    if (isCrit) msg = `Kritik vuruş! ${msg}`

    // Hançer ek saldırısı (%25 ihtimal, %50 hasar)
    let extraDamage = 0
    if (weaponDef?.type === 'dagger' && Math.random() < 0.25) {
      const bonusDamage = Math.max(1, Math.floor(damageToMonster * 0.5))
      combatMonsterHp.value -= bonusDamage
      extraDamage = bonusDamage
      msg += ` Ek saldırı! İlave ${bonusDamage} hasar verildi!`
    }

    // Topuz sersemletme kontrolü (%20 ihtimal, canavar karşı saldırısını atlar)
    const isStunned = weaponDef?.type === 'club' && Math.random() < 0.2

    // Vampirlik (büyü + yüzük üst üste eklenir)
    const ringVampiric = inventoryStore.getRingEffectValue('vampiric')
    const totalVampiric = (enchant?.special === 'vampiric' ? 0.15 : 0) + ringVampiric
    if (totalVampiric > 0) {
      const healAmount = Math.floor((totalDamageDealt + extraDamage) * totalVampiric)
      if (healAmount > 0) {
        playerStore.restoreHealth(healAmount)
        msg += ` Vampirlik sayesinde ${healAmount} HP geri kazandın!`
      }
    }

    if (combatMonsterHp.value <= 0) {
      // Canavar yenildi
      return handleMonsterDefeat(monster, msg, totalDamageDealt + extraDamage)
    }

    if (isStunned) {
      msg += ` ${monster.name} sersemledi!`
      combatLog.value.push(msg)
      return { message: msg, combatOver: false, won: false }
    }

    // Akrobat uzmanlığı: %25 ihtimalle karşı saldırıdan kaçınır
    if (skillStore.getSkill('combat').perk10 === 'acrobat' && Math.random() < 0.25) {
      msg += ` ${monster.name}'in karşı saldırısından çevikçe kaçındın!`
      combatLog.value.push(msg)
      return { message: msg, combatOver: false, won: false }
    }

    // Canavar karşı saldırısı (yüzük hasar azaltması dahil)
    const defenseReduction = cookingStore.activeBuff?.type === 'defense' ? cookingStore.activeBuff.value / 100 : 0
    const fighterReduction = skillStore.getSkill('combat').perk5 === 'fighter' ? 0.15 : 0
    const sturdyReduction = enchant?.special === 'sturdy' ? 0.85 : 1.0
    const ringDefenseBonus = inventoryStore.getRingEffectValue('defense_bonus')
    const monsterDamage = Math.max(
      1,
      Math.floor(
        monster.attack *
          (1 - fighterReduction) *
          (1 - defenseReduction) *
          sturdyReduction *
          (1 - ringDefenseBonus) *
          (1 - guildBonusDefense.value)
      )
    )
    playerStore.takeDamage(monsterDamage)
    msg += ` ${monster.name} karşı saldırdı, ${monsterDamage} hasar aldın.`
    combatLog.value.push(msg)

    if (playerStore.hp <= 0) {
      return handleDefeat()
    }

    return { message: msg, combatOver: false, won: false }
  }

  /** Canavar yenilmesini işle (normal canavar ve BOSS ortak) */
  const handleMonsterDefeat = (
    monster: MonsterDef,
    msg: string,
    _totalDamage: number
  ): { message: string; combatOver: boolean; won: boolean } => {
    inCombat.value = false

    // Deneyim
    const floor = getActiveFloorData()
    const wildernessXpBonus = useGameStore().farmMapType === 'wilderness' ? 1.5 : 1.0
    const infestedXpBonus = floor?.specialType === 'infested' ? 1.5 : 1.0
    skillStore.addExp('combat', Math.floor(monster.expReward * wildernessXpBonus * infestedXpBonus))

    // Şanslı büyü + yüzük düşme oranını artırır
    const owned = inventoryStore.getEquippedWeapon()
    const enchant = owned.enchantmentId ? getEnchantmentById(owned.enchantmentId) : null
    const ringDropBonus = inventoryStore.getRingEffectValue('monster_drop_bonus')
    const ringLuckBonus = inventoryStore.getRingEffectValue('luck')
    const luckyBonus =
      (enchant?.special === 'lucky' ? 0.2 : 0) +
      ringDropBonus +
      ringLuckBonus * 0.5 +
      (slayerCharmActive.value ? 0.2 : 0) +
      guildBonusDropRate.value

    // Normal düşüşler
    const drops: string[] = []
    for (const drop of monster.drops) {
      if (Math.random() < drop.chance + luckyBonus) {
        inventoryStore.addItem(drop.itemId)
        sessionLoot.value.push({ itemId: drop.itemId, quantity: 1 })
        useAchievementStore().discoverItem(drop.itemId)
        drops.push(drop.itemId)
      }
    }

    // Mineraloji uzmanlığı: canavar mevcut kattaki cevherlerden fazladan düşürür
    if (skillStore.getSkill('mining').perk10 === 'mineralogist') {
      if (floor && floor.ores.length > 0) {
        const bonusOre = floor.ores[Math.floor(Math.random() * floor.ores.length)]!
        inventoryStore.addItem(bonusOre)
        sessionLoot.value.push({ itemId: bonusOre, quantity: 1 })
        drops.push(bonusOre)
      }
    }

    // Silah düşüşü (normal canavarlar, BOSS değil)
    if (!combatIsBoss.value && floor) {
      const weaponDrops = MONSTER_DROP_WEAPONS[floor.zone]
      if (weaponDrops) {
        for (const wd of weaponDrops) {
          const dropChance = wd.chance + luckyBonus * wd.chance
          if (Math.random() < dropChance) {
            const enchantId = rollRandomEnchantment()
            inventoryStore.addWeapon(wd.weaponId, enchantId)
            const displayName = getWeaponDisplayName(wd.weaponId, enchantId)
            msg += ` Silah kazandın: ${displayName}!`
          }
        }
      }
      // Yüzük düşüşü (normal canavar)
      const ringDrops = MONSTER_DROP_RINGS[floor.zone]
      if (ringDrops) {
        for (const rd of ringDrops) {
          if (Math.random() < rd.chance + luckyBonus * rd.chance) {
            inventoryStore.addRing(rd.ringId)
            const ringDef = getRingById(rd.ringId)
            msg += ` Yüzük kazandın: ${ringDef?.name ?? rd.ringId}!`
          }
        }
      }
      // Şapka düşüşü (normal canavar)
      const hatDrops = MONSTER_DROP_HATS[floor.zone]
      if (hatDrops) {
        for (const hd of hatDrops) {
          if (Math.random() < hd.chance + luckyBonus * hd.chance) {
            inventoryStore.addHat(hd.hatId)
            const hatDef = getHatById(hd.hatId)
            msg += ` Şapka kazandın: ${hatDef?.name ?? hd.hatId}!`
          }
        }
      }
      // Ayakkabı düşüşü (normal canavar)
      const shoeDrops = MONSTER_DROP_SHOES[floor.zone]
      if (shoeDrops) {
        for (const sd of shoeDrops) {
          if (Math.random() < sd.chance + luckyBonus * sd.chance) {
            inventoryStore.addShoe(sd.shoeId)
            const shoeDef = getShoeById(sd.shoeId)
            msg += ` Ayakkabı kazandın: ${shoeDef?.name ?? sd.shoeId}!`
          }
        }
      }
    }

    // BOSS yenilme işlemi
    if (combatIsBoss.value) {
      if (isInSkullCavern.value) {
        // Skull Cavern BOSS'u: para ve cevher ödülü (derinliğe göre ölçeklenir)
        const scFloor = skullCavernFloor.value
        const moneyReward = 200 + scFloor * 20
        playerStore.earnMoney(moneyReward)
        msg += ` ${moneyReward} para kazandın!`
        const bonusOreCount = 3 + Math.floor(scFloor / 25)
        const orePool = ['iridium_ore', 'void_ore', 'shadow_ore']
        for (let i = 0; i < bonusOreCount; i++) {
          const oreId = orePool[Math.floor(Math.random() * orePool.length)]!
          inventoryStore.addItem(oreId)
          sessionLoot.value.push({ itemId: oreId, quantity: 1 })
        }
        msg += ` ${bonusOreCount} nadir cevher kazandın!`
      } else {
        // Ana maden BOSS'u
        const bossId = monster.id
        const isFirstKill = !defeatedBosses.value.includes(bossId)

        if (isFirstKill) {
          defeatedBosses.value.push(bossId)
          // İlk öldürmede silah düşer
          const weaponId = BOSS_DROP_WEAPONS[currentFloor.value]
          if (weaponId) {
            const bossWeaponDef = getWeaponById(weaponId)
            const fixedEnchant = bossWeaponDef?.fixedEnchantment ?? null
            inventoryStore.addWeapon(weaponId, fixedEnchant)
            const displayName = getWeaponDisplayName(weaponId, fixedEnchant)
            msg += ` BOSS'u ilk kez yendin! Efsanevi silah kazandın: ${displayName}!`
          }
        }
        // Ekipman düşüşleri (ilk öldürmeden bağımsız, has* ile tekrar engellenir, eski kayıtlarla uyumlu)
        const bossRingId = BOSS_DROP_RINGS[currentFloor.value]
        if (bossRingId && !inventoryStore.hasRing(bossRingId)) {
          inventoryStore.addRing(bossRingId)
          const bossRingDef = getRingById(bossRingId)
          msg += ` Yüzük kazandın: ${bossRingDef?.name ?? bossRingId}!`
        }
        const bossHatId = BOSS_DROP_HATS[currentFloor.value]
        if (bossHatId && !inventoryStore.hasHat(bossHatId)) {
          inventoryStore.addHat(bossHatId)
          const bossHatDef = getHatById(bossHatId)
          msg += ` Şapka kazandın: ${bossHatDef?.name ?? bossHatId}!`
        }
        const bossShoeId = BOSS_DROP_SHOES[currentFloor.value]
        if (bossShoeId && !inventoryStore.hasShoe(bossShoeId)) {
          inventoryStore.addShoe(bossShoeId)
          const bossShoeDef = getShoeById(bossShoeId)
          msg += ` Ayakkabı kazandın: ${bossShoeDef?.name ?? bossShoeId}!`
        }

        // BOSS ek para ve cevher düşürür
        const moneyReward = BOSS_MONEY_REWARDS[currentFloor.value] ?? 0
        if (moneyReward > 0) {
          playerStore.earnMoney(moneyReward)
          msg += ` ${moneyReward} para kazandın!`
        }
        const oreRewards = BOSS_ORE_REWARDS[currentFloor.value]
        if (oreRewards) {
          for (const ore of oreRewards) {
            inventoryStore.addItem(ore.itemId, ore.quantity)
            sessionLoot.value.push(ore)
          }
          msg += ` ${getRewardNames(oreRewards)} kazandın!`
        }
      }
    }

    msg += ` ${monster.name} yenildi! (+${monster.expReward} deneyim)`
    if (drops.length > 0) msg += ' Eşya düştü.'
    combatLog.value.push(msg)

    // === Kare durumunu güncelle ===
    if (_combatTileIndex.value >= 0) {
      const tile = floorGrid.value[_combatTileIndex.value]
      if (tile) tile.state = 'defeated'
      _combatTileIndex.value = -1
    }
    monstersDefeatedCount.value++
    useAchievementStore().recordMonsterKill()
    if (combatMonster.value) {
      useGuildStore().recordKill(combatMonster.value.id)
    }

    // İstilalı/BOSS katı temizleme koşulunu kontrol et
    if (monstersDefeatedCount.value >= totalMonstersOnFloor.value && totalMonstersOnFloor.value > 0) {
      stairsUsable.value = true
      // İstilalı kat temizleme ödülü
      if (floor?.specialType === 'infested') {
        const activeFloorNum = getActiveFloorNum()
        const clearRewards = getInfestedClearRewards(activeFloorNum)
        for (const r of clearRewards.items) {
          inventoryStore.addItem(r.itemId, r.quantity)
          sessionLoot.value.push(r)
        }
        playerStore.earnMoney(clearRewards.money)
        msg += ` İstilalı kat tamamen temizlendi! ${getRewardNames(clearRewards.items)} ve ${clearRewards.money} para kazandın!`
      }
    } else if (floor?.specialType === 'infested') {
      const remaining = totalMonstersOnFloor.value - monstersDefeatedCount.value
      msg += ` ${remaining} canavar kaldı!`
    }

    combatIsBoss.value = false
    return { message: msg, combatOver: true, won: true }
  }

  /** Yenilgi işlemi */
  const handleDefeat = (): { message: string; combatOver: boolean; won: boolean } => {
    inCombat.value = false
    combatIsBoss.value = false
    const wasInSkullCavern = isInSkullCavern.value
    isExploring.value = false
    slayerCharmActive.value = false

    // Kareleri temizle
    floorGrid.value = []
    _combatTileIndex.value = -1

    // Bu keşifte toplanan eşyaların %50'sini kaybet
    const lostCount = Math.ceil(sessionLoot.value.length / 2)
    for (let i = 0; i < lostCount; i++) {
      const item = sessionLoot.value.pop()
      if (item) inventoryStore.removeItem(item.itemId, item.quantity)
    }

    // Rastgele en fazla 3 envanter eşyası kaybet
    const droppedItems: string[] = []
    const availableItems = inventoryStore.items.filter(i => i.quantity > 0)
    const dropCount = Math.min(DEFEAT_MAX_ITEM_LOSS, availableItems.length)
    for (let i = 0; i < dropCount; i++) {
      const candidates = inventoryStore.items.filter(i => i.quantity > 0)
      if (candidates.length === 0) break
      const pick = candidates[Math.floor(Math.random() * candidates.length)]!
      droppedItems.push(pick.itemId)
      inventoryStore.removeItem(pick.itemId, 1, pick.quality)
    }

    // Para cezası
    const moneyLost = Math.min(Math.floor(playerStore.money * DEFEAT_MONEY_PENALTY_RATE), DEFEAT_MONEY_PENALTY_CAP)
    if (moneyLost > 0) playerStore.spendMoney(moneyLost)

    // HP'yi %50'ye geri getir
    const maxHp = playerStore.getMaxHp()
    playerStore.restoreHealth(Math.floor(maxHp * 0.5))

    // Skull Cavern: sıfırla
    if (wasInSkullCavern) {
      isInSkullCavern.value = false
      skullCavernFloor.value = 0
      cachedSkullFloorData.value = null
    }

    const location = wasInSkullCavern ? 'Skull Cavern' : 'maden'
    const parts: string[] = [`${location} içinde bayıldın...`]
    parts.push('ganimetlerinin yarısını kaybettin')
    if (droppedItems.length > 0) parts.push(` ve envanterinden ${droppedItems.length} eşya daha`)
    if (moneyLost > 0) parts.push(` ayrıca ${moneyLost} para`)
    parts.push(', girişe geri gönderildin.')
    const msg = parts.join('')
    combatLog.value.push(msg)
    return { message: msg, combatOver: true, won: false }
  }

  // ==================== Kat ilerleme ====================

  /** Bir sonraki kata geç */
  const goNextFloor = (): { success: boolean; message: string } => {
    if (!isExploring.value) return { success: false, message: 'Madende değilsin.' }
    if (!stairsFound.value) {
      return { success: false, message: 'Henüz merdiven bulunmadı, keşfetmeye devam et.' }
    }
    if (!stairsUsable.value) {
      const floor = getActiveFloorData()
      if (floor?.specialType === 'infested') {
        const remaining = totalMonstersOnFloor.value - monstersDefeatedCount.value
        return { success: false, message: `Hâlâ ${remaining} canavar temizlenmedi, ilerleyemezsin!` }
      }
      if (floor?.specialType === 'boss') {
        return { success: false, message: 'İlerlemek için BOSS\'u yenmelisin!' }
      }
      return { success: false, message: 'Merdiven şu anda kullanılamaz.' }
    }

    if (isInSkullCavern.value) {
      // Skull Cavern: limitsiz, güvenli nokta yok
      skullCavernFloor.value++
      cacheSkullFloor(skullCavernFloor.value)
      if (skullCavernFloor.value > skullCavernBestFloor.value) {
        skullCavernBestFloor.value = skullCavernFloor.value
        useAchievementStore().recordSkullCavernFloor(skullCavernFloor.value)
      }
    } else {
      // Ana maden: en fazla 120 kat
      if (currentFloor.value >= MAX_MINE_FLOOR) {
        // 120. kata ulaşıldıktan sonra otomatik olarak Skull Cavern'a geç
        if (isSkullCavernUnlocked()) {
          isInSkullCavern.value = true
          skullCavernFloor.value = 1
          cacheSkullFloor(1)
          _generateGrid()
          return { success: true, message: 'Madenin en derin yarığından geçtin ve Skull Cavern 1. kata girdin!' }
        }
        return { success: false, message: 'Madenin en derin noktasına ulaştın! (Skull Cavern\'ı açmak için 60. kat BOSS\'unu yen)' }
      }

      currentFloor.value++
      useAchievementStore().recordMineFloor(currentFloor.value)

      // Yeni güvenli noktaya ulaşıldığında kaydet (yalnızca daha yüksek katta güncellenir)
      const newFloorData = getFloor(currentFloor.value)
      if (newFloorData?.isSafePoint && currentFloor.value > safePointFloor.value) {
        safePointFloor.value = currentFloor.value
      }
    }

    // Yeni kat karelerini oluştur
    _generateGrid()

    const activeFloorNum = getActiveFloorNum()
    const newFloor = getActiveFloorData()
    const locationName = isInSkullCavern.value ? 'Skull Cavern ' : ''
    const specialLabels: Record<string, string> = {
      mushroom: 'Mantar Mağarası',
      treasure: 'Hazine Katı',
      infested: 'İstilalı Kat',
      dark: 'Karanlık Nehir Katı',
      boss: 'BOSS Katı'
    }
    const specialLabel = newFloor?.specialType ? (specialLabels[newFloor.specialType] ?? '') : ''
    let msg = `${locationName}${activeFloorNum}. kata ilerledin.${newFloor?.isSafePoint ? ' (Güvenli nokta!)' : ''}`
    if (specialLabel) msg += ` [${specialLabel}]`
    return { success: true, message: msg }
  }

  /** Madenden çık */
  const leaveMine = (): string => {
    // Çıkmadan önce güvenli noktayı kaydet (oyuncu güvenli kata ulaşıp doğrudan çıkarsa diye)
    if (!isInSkullCavern.value) {
      const floor = getActiveFloorData()
      if (floor?.isSafePoint && currentFloor.value > safePointFloor.value) {
        safePointFloor.value = currentFloor.value
      }
    }
    isExploring.value = false
    combatIsBoss.value = false
    floorGrid.value = []
    _combatTileIndex.value = -1
    slayerCharmActive.value = false
    if (isInSkullCavern.value) {
      isInSkullCavern.value = false
      cachedSkullFloorData.value = null
      return 'Skull Cavern\'dan çıktın.'
    }
    return 'Madenden çıktın.'
  }

  // ==================== Eşya kullanımı ====================

  /** Savaşta/keşifte eşya kullan */
  const useCombatItem = (itemId: string): { success: boolean; message: string } => {
    if (!inCombat.value && !isExploring.value) return { success: false, message: 'Madende değilsin.' }

    // Lonca rozeti: kalıcı +3 saldırı
    if (itemId === 'guild_badge') {
      if (!inventoryStore.removeItem('guild_badge')) return { success: false, message: 'Lonca rozeti yok.' }
      guildBadgeBonusAttack.value += 3
      const msg = 'Lonca rozeti kullanıldı, saldırı kalıcı olarak +3 arttı!'
      if (inCombat.value) combatLog.value.push(msg)
      return { success: true, message: msg }
    }

    // Yaşam tılsımı: kalıcı +15 maksimum HP
    if (itemId === 'life_talisman') {
      if (!inventoryStore.removeItem('life_talisman')) return { success: false, message: 'Yaşam tılsımı yok.' }
      guildBonusMaxHp.value += 15
      const msg = 'Yaşam tılsımı kullanıldı, maksimum sağlık kalıcı olarak +15 arttı!'
      if (inCombat.value) combatLog.value.push(msg)
      return { success: true, message: msg }
    }

    // Şanslı para: kalıcı düşme oranı +%5
    if (itemId === 'lucky_coin') {
      if (!inventoryStore.removeItem('lucky_coin')) return { success: false, message: 'Şanslı para yok.' }
      guildBonusDropRate.value += 0.05
      const msg = 'Şanslı para kullanıldı, canavar eşya düşürme oranı kalıcı olarak +%5 arttı!'
      if (inCombat.value) combatLog.value.push(msg)
      return { success: true, message: msg }
    }

    // Koruyucu tılsım: kalıcı savunma +%3
    if (itemId === 'defense_charm') {
      if (!inventoryStore.removeItem('defense_charm')) return { success: false, message: 'Koruyucu tılsım yok.' }
      guildBonusDefense.value += 0.03
      const msg = 'Koruyucu tılsım kullanıldı, savunma kalıcı olarak +%3 arttı!'
      if (inCombat.value) combatLog.value.push(msg)
      return { success: true, message: msg }
    }

    // Katil tılsımı: bu keşifte düşme oranı +%20
    if (itemId === 'slayer_charm') {
      if (slayerCharmActive.value) return { success: false, message: 'Katil tılsımı etkisi zaten aktif.' }
      if (!inventoryStore.removeItem('slayer_charm')) return { success: false, message: 'Katil tılsımı yok.' }
      slayerCharmActive.value = true
      const msg = 'Katil tılsımı kullanıldı, bu keşifte canavar düşme oranı +%20!'
      if (inCombat.value) combatLog.value.push(msg)
      return { success: true, message: msg }
    }

    // Yiyecek/iksir tipi eşyalar
    const def = getItemById(itemId)
    if (!def) return { success: false, message: 'Bilinmeyen eşya.' }

    // Yemekler cookingStore.eat() ile işlenir; buff, mutfak bonusu vb. doğru uygulansın diye
    if (itemId.startsWith('food_')) {
      const cookingStore = useCookingStore()
      const hpFull = playerStore.hp >= playerStore.getMaxHp()
      const staminaFull = playerStore.stamina >= playerStore.maxStamina
      if (hpFull && staminaFull) {
        return { success: false, message: 'Hem sağlık hem dayanıklılık zaten dolu.' }
      }
      // Envanterde bu yiyeceğin en düşük kalitesini bul
      const qualityOrder: Quality[] = ['normal', 'fine', 'excellent', 'supreme']
      const foodQuality = qualityOrder.find(q => inventoryStore.getItemCount(itemId, q) > 0) ?? 'normal'
      const result = cookingStore.eat(itemId.slice(5), foodQuality)
      if (result.success && inCombat.value) combatLog.value.push(result.message)
      return result
    }

    const hpFull = playerStore.hp >= playerStore.getMaxHp()
    const staminaFull = playerStore.stamina >= playerStore.maxStamina
    const hasHpRestore = def.healthRestore && def.healthRestore > 0
    const hasStaminaRestore = def.staminaRestore && def.staminaRestore > 0

    if (hasHpRestore && !hasStaminaRestore && hpFull) {
      return { success: false, message: 'Sağlık zaten dolu.' }
    }
    if (hasStaminaRestore && !hasHpRestore && staminaFull) {
      return { success: false, message: 'Dayanıklılık zaten dolu.' }
    }
    if (hpFull && staminaFull && (hasHpRestore || hasStaminaRestore)) {
      return { success: false, message: 'Hem sağlık hem dayanıklılık zaten dolu.' }
    }

    if (!inventoryStore.removeItem(itemId)) return { success: false, message: `${def.name} yok.` }

    // Simyacı uzmanlığı: yiyecek iyileştirmesi +%50
    const alchemistBonus = skillStore.getSkill('foraging').perk10 === 'alchemist' ? 1.5 : 1.0
    const parts: string[] = []
    if (hasHpRestore) {
      const restore = def.healthRestore! >= 999 ? playerStore.getMaxHp() : Math.floor(def.healthRestore! * alchemistBonus)
      playerStore.restoreHealth(restore)
      parts.push(`${def.healthRestore! >= 999 ? 'tamamen' : restore} HP yeniledi`)
    }
    if (hasStaminaRestore) {
      const restore = Math.floor(def.staminaRestore! * alchemistBonus)
      playerStore.restoreStamina(restore)
      parts.push(`${restore} dayanıklılık yeniledi`)
    }

    const msg = `${def.name} kullandın, ${parts.join(' ve ')}!`
    if (inCombat.value) combatLog.value.push(msg)
    return { success: true, message: msg }
  }

  /** Keşif sırasında canavar yemi kullan (bu kattaki canavar sayısını iki katına çıkarır) */
  const useMonsterLure = (): { success: boolean; message: string } => {
    if (!isExploring.value) return { success: false, message: 'Madende değilsin.' }
    if (inCombat.value) return { success: false, message: 'Savaş sırasında canavar yemi kullanamazsın.' }
    if (!inventoryStore.removeItem('monster_lure')) return { success: false, message: 'Canavar yemin yok.' }

    const floor = getActiveFloorData()
    if (!floor) return { success: true, message: 'Canavar yemi kullanıldı ama bu katta etkisiz.' }

    // Mevcut yenilmemiş canavar sayısını hesapla
    const existingMonsters = floorGrid.value.filter(t => (t.type === 'monster' || t.type === 'boss') && t.state !== 'defeated').length

    // Tüm gizli boş kareleri bul
    const hiddenEmpty = floorGrid.value.filter(t => t.state === 'hidden' && t.type === 'empty')
    const monstersToAdd = Math.min(existingMonsters, hiddenEmpty.length)

    if (monstersToAdd === 0) {
      return { success: true, message: 'Canavar yemi kullanıldı ama bu katta daha fazla canavar yerleştirilecek boş alan yok.' }
    }

    // Rastgele karıştır ve canavar yerleştir
    const shuffled = [...hiddenEmpty].sort(() => Math.random() - 0.5)
    const monsterPool = floor.monsters
    for (let i = 0; i < monstersToAdd; i++) {
      const tile = shuffled[i]!
      const monster = monsterPool.length > 0 ? { ...monsterPool[Math.floor(Math.random() * monsterPool.length)]! } : undefined
      if (monster) {
        tile.type = 'monster'
        tile.data = { monster }
      }
    }

    totalMonstersOnFloor.value += monstersToAdd
    return { success: true, message: `Canavar yemi kullanıldı! Bu kata ${monstersToAdd} canavar eklendi.` }
  }

  // ==================== Serileştirme ====================

  const serialize = () => {
    return {
      currentFloor: currentFloor.value,
      safePointFloor: safePointFloor.value,
      defeatedBosses: defeatedBosses.value,
      isInSkullCavern: isInSkullCavern.value,
      skullCavernFloor: skullCavernFloor.value,
      skullCavernBestFloor: skullCavernBestFloor.value,
      guildBadgeBonusAttack: guildBadgeBonusAttack.value,
      guildBonusMaxHp: guildBonusMaxHp.value,
      guildBonusDropRate: guildBonusDropRate.value,
      guildBonusDefense: guildBonusDefense.value
    }
  }

  const deserialize = (data: ReturnType<typeof serialize>) => {
    defeatedBosses.value = ((data as Record<string, unknown>).defeatedBosses as string[]) ?? []

    // Eski kayıtları algıla (30 kat sistemi) ve taşı
    const rawSafePoint = ((data as Record<string, unknown>).safePointFloor as number) ?? 0
    const hasSkullCavern = 'isInSkullCavern' in data
    const isOldSave = rawSafePoint <= 30 && !hasSkullCavern

    if (isOldSave) {
      // Eski kayıt dönüşümü: safePoint × 2 (5→10, 10→20, 15→30, ..., 30→60)
      safePointFloor.value = rawSafePoint * 2
      currentFloor.value = safePointFloor.value > 0 ? safePointFloor.value + 1 : 1
    } else {
      safePointFloor.value = rawSafePoint
      currentFloor.value = data.currentFloor ?? 1
    }

    // Skull Cavern durumu
    isInSkullCavern.value = ((data as Record<string, unknown>).isInSkullCavern as boolean) ?? false
    skullCavernFloor.value = ((data as Record<string, unknown>).skullCavernFloor as number) ?? 0
    skullCavernBestFloor.value = ((data as Record<string, unknown>).skullCavernBestFloor as number) ?? 0

    // Kare durumu serileştirilmez — kayıt yüklendikten sonra oyuncu maden dışında olur
    isExploring.value = false
    floorGrid.value = []

    // Lonca rozeti kalıcı bonusları
    guildBadgeBonusAttack.value = ((data as Record<string, unknown>).guildBadgeBonusAttack as number) ?? 0
    guildBonusMaxHp.value = ((data as Record<string, unknown>).guildBonusMaxHp as number) ?? 0
    guildBonusDropRate.value = ((data as Record<string, unknown>).guildBonusDropRate as number) ?? 0
    guildBonusDefense.value = ((data as Record<string, unknown>).guildBonusDefense as number) ?? 0
  }

  return {
    currentFloor,
    safePointFloor,
    isExploring,
    isInSkullCavern,
    skullCavernFloor,
    skullCavernBestFloor,
    inCombat,
    combatMonster,
    combatMonsterHp,
    combatRound,
    combatLog,
    combatIsBoss,
    defeatedBosses,
    // Kare sistemi
    floorGrid,
    entryIndex,
    stairsFound,
    stairsUsable,
    totalMonstersOnFloor,
    monstersDefeatedCount,
    // Eşya sistemi
    slayerCharmActive,
    guildBadgeBonusAttack,
    guildBonusMaxHp,
    guildBonusDropRate,
    guildBonusDefense,
    // Metotlar
    isSkullCavernUnlocked,
    getActiveFloorData,
    getUnlockedSafePoints,
    canRevealTile,
    engageRevealedMonster,
    revealTile,
    useBombOnGrid,
    enterMine,
    enterSkullCavern,
    combatAction,
    useCombatItem,
    useMonsterLure,
    goNextFloor,
    leaveMine,
    serialize,
    deserialize
  }
})
