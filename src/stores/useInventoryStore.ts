import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { InventoryItem, Quality, Tool, ToolType, ToolTier, OwnedWeapon, OwnedRing, RingEffectType, OwnedHat, OwnedShoe } from '@/types'

/** Ekipman ön ayarı */
export interface EquipmentPreset {
  id: string
  name: string
  weaponDefId: string | null
  ringSlot1DefId: string | null
  ringSlot2DefId: string | null
  hatDefId: string | null
  shoeDefId: string | null
}
import { showFloat } from '@/composables/useGameLog'
import { getItemById } from '@/data/items'
import { getWeaponById, getEnchantmentById, getWeaponSellPrice } from '@/data/weapons'
import { getRingById } from '@/data/rings'
import { getHatById } from '@/data/hats'
import { getShoeById } from '@/data/shoes'
import { EQUIPMENT_SETS } from '@/data/equipmentSets'
import { usePlayerStore } from './usePlayerStore'
import { useAchievementStore } from './useAchievementStore'

const INITIAL_CAPACITY = 24
const MAX_CAPACITY = 60
const MAX_STACK = 99
const TEMP_CAPACITY = 10

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<InventoryItem[]>([])
  const capacity = ref(INITIAL_CAPACITY)
  const tools = ref<Tool[]>([
    { type: 'wateringCan', tier: 'basic' },
    { type: 'hoe', tier: 'basic' },
    { type: 'pickaxe', tier: 'basic' },
    { type: 'fishingRod', tier: 'basic' },
    { type: 'scythe', tier: 'basic' },
    { type: 'axe', tier: 'basic' },
    { type: 'pan', tier: 'basic' }
  ])

  /** Sahip olunan silah listesi */
  const ownedWeapons = ref<OwnedWeapon[]>([{ defId: 'wooden_stick', enchantmentId: null }])
  /** Şu anda kuşanılmış silahın indeksi */
  const equippedWeaponIndex = ref(0)

  /** Sahip olunan yüzük listesi */
  const ownedRings = ref<OwnedRing[]>([])
  /** Kuşanılmış yüzük indeksleri (2 yuva, -1 = boş) */
  const equippedRingSlot1 = ref(-1)
  const equippedRingSlot2 = ref(-1)

  /** Sahip olunan şapka listesi */
  const ownedHats = ref<OwnedHat[]>([])
  /** Şu anda kuşanılmış şapkanın indeksi (-1 = boş) */
  const equippedHatIndex = ref(-1)

  /** Sahip olunan ayakkabı listesi */
  const ownedShoes = ref<OwnedShoe[]>([])
  /** Şu anda kuşanılmış ayakkabının indeksi (-1 = boş) */
  const equippedShoeIndex = ref(-1)

  /** Ekipman ön ayarı listesi */
  const equipmentPresets = ref<EquipmentPreset[]>([])
  /** Şu anda kullanılan ön ayarın ID'si */
  const activePresetId = ref<string | null>(null)

  /** Yükseltme aşamasındaki araç (2 günlük bekleme süresi) */
  const pendingUpgrade = ref<{ toolType: ToolType; targetTier: ToolTier; daysRemaining: number } | null>(null)

  const isFull = computed(() => items.value.length >= capacity.value)

  /** Geçici envanter (taşma tamponu) */
  const tempItems = ref<InventoryItem[]>([])
  const isTempFull = computed(() => tempItems.value.length >= TEMP_CAPACITY)
  /** Ana envanter + geçici envanter tamamen dolu */
  const isAllFull = computed(() => isFull.value && isTempFull.value)

  /** Şu anda kuşanılmış silahı al */
  const getEquippedWeapon = (): OwnedWeapon => {
    return ownedWeapons.value[equippedWeaponIndex.value] ?? { defId: 'wooden_stick', enchantmentId: null }
  }

  /** Silah saldırı gücünü al (büyü bonusu dahil) */
  const getWeaponAttack = (): number => {
    const owned = getEquippedWeapon()
    const def = getWeaponById(owned.defId)
    if (!def) return 5
    let attack = def.attack
    if (owned.enchantmentId) {
      const enchant = getEnchantmentById(owned.enchantmentId)
      if (enchant) attack += enchant.attackBonus
    }
    return attack
  }

  /** Silah kritik vuruş oranını al (büyü bonusu dahil) */
  const getWeaponCritRate = (): number => {
    const owned = getEquippedWeapon()
    const def = getWeaponById(owned.defId)
    if (!def) return 0.02
    let critRate = def.critRate
    if (owned.enchantmentId) {
      const enchant = getEnchantmentById(owned.enchantmentId)
      if (enchant) critRate += enchant.critBonus
    }
    return critRate
  }

  /** Koleksiyona silah ekle */
  const addWeapon = (defId: string, enchantmentId: string | null = null): boolean => {
    ownedWeapons.value.push({ defId, enchantmentId })
    useAchievementStore().discoverItem(defId)
    return true
  }

  /** Belirli bir silaha sahip olunup olunmadığını kontrol et (büyü farkı gözetilmez) */
  const hasWeapon = (defId: string): boolean => {
    return ownedWeapons.value.some(w => w.defId === defId)
  }

  /** Silah kuşan (indekse göre) */
  const equipWeapon = (index: number): boolean => {
    if (index < 0 || index >= ownedWeapons.value.length) return false
    equippedWeaponIndex.value = index
    return true
  }

  /** Silah sat (kuşanılmış silah satılamaz, tek silah satılamaz) */
  const sellWeapon = (index: number): { success: boolean; message: string } => {
    if (ownedWeapons.value.length <= 1) return { success: false, message: 'En az bir silah bırakılmalıdır.' }
    if (index === equippedWeaponIndex.value) return { success: false, message: 'Kuşanılmış silah satılamaz, önce değiştirin.' }
    if (index < 0 || index >= ownedWeapons.value.length) return { success: false, message: 'Geçersiz indeks.' }
    const weapon = ownedWeapons.value[index]!
    const price = getWeaponSellPrice(weapon.defId, weapon.enchantmentId)
    const playerStore = usePlayerStore()
    playerStore.earnMoney(price)
    ownedWeapons.value.splice(index, 1)
    // Kuşanım indeksini düzelt
    if (equippedWeaponIndex.value > index) {
      equippedWeaponIndex.value--
    }
    const def = getWeaponById(weapon.defId)
    return { success: true, message: `${def?.name ?? 'Silah'} satıldı, ${price} para kazanıldı.` }
  }

  /** Envantere eşya ekle */
  const addItem = (itemId: string, quantity: number = 1, quality: Quality = 'normal'): boolean => {
    // Eşyanın var olup olmadığını doğrula
    if (!getItemById(itemId)) return false
    // Otomatik olarak koleksiyona kaydet
    useAchievementStore().discoverItem(itemId)
    let remaining = quantity

    // Önce mevcut aynı tür yığınları doldur
    for (const slot of items.value) {
      if (remaining <= 0) break
      if (slot.itemId === itemId && slot.quality === quality && slot.quantity < MAX_STACK) {
        const canAdd = Math.min(remaining, MAX_STACK - slot.quantity)
        slot.quantity += canAdd
        remaining -= canAdd
      }
    }

    // Kalan kısmı yeni yığınlar oluştur
    while (remaining > 0 && !isFull.value) {
      const batch = Math.min(remaining, MAX_STACK)
      items.value.push({ itemId, quantity: batch, quality })
      remaining -= batch
    }

    // Taşanı geçici envantere aktar
    if (remaining > 0) {
      for (const slot of tempItems.value) {
        if (remaining <= 0) break
        if (slot.itemId === itemId && slot.quality === quality && slot.quantity < MAX_STACK) {
          const canAdd = Math.min(remaining, MAX_STACK - slot.quantity)
          slot.quantity += canAdd
          remaining -= canAdd
        }
      }
      while (remaining > 0 && !isTempFull.value) {
        const batch = Math.min(remaining, MAX_STACK)
        tempItems.value.push({ itemId, quantity: batch, quality })
        remaining -= batch
      }
    }

    if (remaining > 0) {
      const name = getItemById(itemId)?.name ?? itemId
      showFloat(`Envanter dolu! ${name}×${remaining} kayboldu`, 'danger')
    } else {
      // Envanter neredeyse dolu uyarısı: kalan yuva ≤ 3 ise bir kez göster
      const freeSlots = capacity.value - items.value.length
      if (freeSlots <= 3) {
        showFloat(`Envanter neredeyse dolu! Kalan ${freeSlots} yuva`, 'accent')
      }
    }

    return remaining <= 0
  }

  /** Eşya kaldır (yığınlar arası silmeyi destekler). quality verilmezse önce düşük kalite tüketilir */
  const removeItem = (itemId: string, quantity: number = 1, quality?: Quality): boolean => {
    // Önce toplam miktarın yeterli olup olmadığını kontrol et
    const matchQuality = (i: { itemId: string; quality: Quality }) =>
      i.itemId === itemId && (quality === undefined || i.quality === quality)
    const total = items.value.filter(matchQuality).reduce((sum, i) => sum + i.quantity, 0)
    if (total < quantity) return false

    // Kalite belirtilmemişse normal → fine → excellent → supreme sırasıyla tüket
    const qualityOrder: Quality[] = ['normal', 'fine', 'excellent', 'supreme']
    let remaining = quantity
    for (const q of quality !== undefined ? [quality] : qualityOrder) {
      for (let i = items.value.length - 1; i >= 0 && remaining > 0; i--) {
        const slot = items.value[i]!
        if (slot.itemId !== itemId || slot.quality !== q) continue
        const take = Math.min(remaining, slot.quantity)
        slot.quantity -= take
        remaining -= take
        if (slot.quantity <= 0) {
          items.value.splice(i, 1)
        }
      }
    }
    return true
  }

  /** Eşya miktarını sorgula */
  const getItemCount = (itemId: string, quality?: Quality): number => {
    return items.value
      .filter(i => i.itemId === itemId && (quality === undefined || i.quality === quality))
      .reduce((sum, i) => sum + i.quantity, 0)
  }

  /** Yeterli miktarda eşya olup olmadığını kontrol et */
  const hasItem = (itemId: string, quantity: number = 1): boolean => {
    return getItemCount(itemId) >= quantity
  }

  /** Eşya kategorisi sıralama önceliği */
  const CATEGORY_ORDER: Record<string, number> = {
    seed: 0,
    crop: 1,
    fruit: 2,
    fish: 3,
    animal_product: 4,
    processed: 5,
    food: 6,
    ore: 7,
    gem: 8,
    material: 9,
    machine: 10,
    sprinkler: 11,
    fertilizer: 12,
    bait: 13,
    tackle: 14,
    bomb: 15,
    sapling: 16,
    gift: 17,
    fossil: 18,
    artifact: 19,
    misc: 20
  }

  /** Eşya kilit durumunu değiştir */
  const toggleLock = (itemId: string, quality: Quality) => {
    const slot = items.value.find(i => i.itemId === itemId && i.quality === quality)
    if (slot) slot.locked = !slot.locked
  }

  /** Envanteri tek tuşla düzenle (kategori → eşya ID → kaliteye göre sırala, aynı tür yığınları birleştir) */
  const sortItems = () => {
    // Önce aynı tür yığınları birleştir (herhangi bir yığın kilitliyse birleşim sonrası da kilitli kalır)
    const merged: InventoryItem[] = []
    for (const item of items.value) {
      const existing = merged.find(m => m.itemId === item.itemId && m.quality === item.quality)
      if (existing) {
        existing.quantity += item.quantity
        if (item.locked) existing.locked = true
      } else {
        merged.push({ ...item })
      }
    }
    // MAX_STACK'i aşan yığınları böl (kilit durumunu koru)
    const split: InventoryItem[] = []
    for (const item of merged) {
      let remaining = item.quantity
      while (remaining > 0) {
        const batch = Math.min(remaining, MAX_STACK)
        split.push({ itemId: item.itemId, quantity: batch, quality: item.quality, locked: item.locked })
        remaining -= batch
      }
    }
    // Kategori → Eşya ID → Kaliteye göre sırala
    const qualityOrder: Record<string, number> = { normal: 0, fine: 1, excellent: 2, supreme: 3 }
    split.sort((a, b) => {
      const defA = getItemById(a.itemId)
      const defB = getItemById(b.itemId)
      const catA = CATEGORY_ORDER[defA?.category ?? 'misc'] ?? 20
      const catB = CATEGORY_ORDER[defB?.category ?? 'misc'] ?? 20
      if (catA !== catB) return catA - catB
      if (a.itemId !== b.itemId) return a.itemId.localeCompare(b.itemId)
      return (qualityOrder[a.quality] ?? 0) - (qualityOrder[b.quality] ?? 0)
    })
    items.value = split
  }

  /** Envanter kapasitesini artır */
  const expandCapacity = (): boolean => {
    if (capacity.value >= MAX_CAPACITY) return false
    capacity.value += 4
    return true
  }

  /** Sınır üstü envanter genişletme (+1 yuva, MAX_CAPACITY aşılır) */
  const expandCapacityExtra = (): boolean => {
    capacity.value += 1
    return true
  }

  /** Geçici envanterdeki eşyaları ana envantere taşı */
  const moveFromTemp = (index: number): boolean => {
    if (index < 0 || index >= tempItems.value.length) return false
    const tempSlot = tempItems.value[index]!
    const { itemId, quality } = tempSlot
    let remaining = tempSlot.quantity

    for (const slot of items.value) {
      if (remaining <= 0) break
      if (slot.itemId === itemId && slot.quality === quality && slot.quantity < MAX_STACK) {
        const canAdd = Math.min(remaining, MAX_STACK - slot.quantity)
        slot.quantity += canAdd
        remaining -= canAdd
      }
    }
    while (remaining > 0 && !isFull.value) {
      const batch = Math.min(remaining, MAX_STACK)
      items.value.push({ itemId, quantity: batch, quality })
      remaining -= batch
    }

    if (remaining <= 0) {
      tempItems.value.splice(index, 1)
      return true
    }
    tempSlot.quantity = remaining
    return false
  }

  /** Geçici envanterde taşınabilen tüm eşyaları tek seferde ana envantere taşı */
  const moveAllFromTemp = (): number => {
    let movedCount = 0
    for (let i = tempItems.value.length - 1; i >= 0; i--) {
      if (isFull.value) break
      if (moveFromTemp(i)) movedCount++
    }
    return movedCount
  }

  /** Geçici envanterdeki eşyayı at */
  const discardTempItem = (index: number): boolean => {
    if (index < 0 || index >= tempItems.value.length) return false
    tempItems.value.splice(index, 1)
    return true
  }

  /** Aracı al */
  const getTool = (type: ToolType): Tool | undefined => {
    return tools.value.find(t => t.type === type)
  }

  /** Araç seviyesine karşılık gelen dayanıklılık tüketim çarpanını al */
  const getToolStaminaMultiplier = (type: ToolType): number => {
    const tool = getTool(type)
    if (!tool) return 1
    const multipliers: Record<ToolTier, number> = { basic: 1.0, iron: 0.8, steel: 0.6, iridium: 0.4 }
    return multipliers[tool.tier]
  }

  /** Araç seviyesine karşılık gelen toplu işlem sayısını al (şarj mekaniği) */
  const getToolBatchCount = (type: ToolType): number => {
    const tool = getTool(type)
    if (!tool) return 1
    const counts: Record<ToolTier, number> = { basic: 1, iron: 2, steel: 4, iridium: 8 }
    return counts[tool.tier]
  }

  /** Araç yükselt */
  const upgradeTool = (type: ToolType): boolean => {
    const tool = getTool(type)
    if (!tool) return false
    const tiers: ToolTier[] = ['basic', 'iron', 'steel', 'iridium']
    const currentIndex = tiers.indexOf(tool.tier)
    if (currentIndex >= tiers.length - 1) return false
    tool.tier = tiers[currentIndex + 1]!
    return true
  }

  /** Aracın kullanılabilir olup olmadığını kontrol et (yükseltmede değil) */
  const isToolAvailable = (type: ToolType): boolean => {
    return !pendingUpgrade.value || pendingUpgrade.value.toolType !== type
  }

  /** Araç yükseltmesini başlat (2 günlük bekleme süresine girer) */
  const startUpgrade = (type: ToolType, targetTier: ToolTier): boolean => {
    if (pendingUpgrade.value) return false
    pendingUpgrade.value = { toolType: type, targetTier, daysRemaining: 2 }
    return true
  }

  /** Günlük yükseltme ilerlemesini güncelle, tamamlanan aracın adını döndürür (varsa) */
  const dailyUpgradeUpdate = (): { completed: boolean; toolType: ToolType; targetTier: ToolTier } | null => {
    if (!pendingUpgrade.value) return null
    pendingUpgrade.value.daysRemaining--
    if (pendingUpgrade.value.daysRemaining <= 0) {
      const { toolType, targetTier } = pendingUpgrade.value
      upgradeTool(toolType)
      pendingUpgrade.value = null
      return { completed: true, toolType, targetTier }
    }
    return null
  }

  // ============================================================
  // Yüzük sistemi
  // ============================================================

  /** Koleksiyona yüzük ekle */
  const addRing = (defId: string): boolean => {
    ownedRings.value.push({ defId })
    useAchievementStore().discoverItem(defId)
    return true
  }

  /** Belirli bir yüzüğe sahip olunup olunmadığını kontrol et */
  const hasRing = (defId: string): boolean => {
    return ownedRings.value.some(r => r.defId === defId)
  }

  /** Belirtilen yuvaya yüzük kuşan (0 veya 1), iki yuvada aynı defId yüzük yasaktır */
  const equipRing = (ringIndex: number, slot: 0 | 1): boolean => {
    if (ringIndex < 0 || ringIndex >= ownedRings.value.length) return false
    const targetSlot = slot === 0 ? equippedRingSlot1 : equippedRingSlot2
    const otherSlot = slot === 0 ? equippedRingSlot2 : equippedRingSlot1
    // Hedef yuvadaysa işlem yapma
    if (targetSlot.value === ringIndex) return true
    // Aynı yüzük diğer yuvadaysa → yer değiştir
    if (otherSlot.value === ringIndex) {
      otherSlot.value = targetSlot.value // -1 olabilir
      targetSlot.value = ringIndex
      return true
    }
    // İki yuvada aynı defId yüzük takılmasını engelle
    const targetDefId = ownedRings.value[ringIndex]!.defId
    if (otherSlot.value >= 0 && otherSlot.value < ownedRings.value.length && ownedRings.value[otherSlot.value]!.defId === targetDefId) {
      return false
    }
    targetSlot.value = ringIndex
    return true
  }

  /** Yüzüğü çıkar (belirtilen yuva) */
  const unequipRing = (slot: 0 | 1): boolean => {
    if (slot === 0) {
      if (equippedRingSlot1.value < 0) return false
      equippedRingSlot1.value = -1
    } else {
      if (equippedRingSlot2.value < 0) return false
      equippedRingSlot2.value = -1
    }
    return true
  }

  /** Yüzük sat (kuşanılmışsa otomatik çıkarılır) */
  const sellRing = (index: number): { success: boolean; message: string } => {
    if (index < 0 || index >= ownedRings.value.length) return { success: false, message: 'Geçersiz indeks.' }
    const ring = ownedRings.value[index]!
    const def = getRingById(ring.defId)
    const price = def?.sellPrice ?? 0
    // Otomatik çıkar
    if (equippedRingSlot1.value === index) equippedRingSlot1.value = -1
    if (equippedRingSlot2.value === index) equippedRingSlot2.value = -1
    const playerStore = usePlayerStore()
    playerStore.earnMoney(price)
    ownedRings.value.splice(index, 1)
    // Kuşanım indekslerini düzelt
    if (equippedRingSlot1.value > index) equippedRingSlot1.value--
    if (equippedRingSlot2.value > index) equippedRingSlot2.value--
    return { success: true, message: `${def?.name ?? 'Yüzük'} satıldı, ${price} para kazanıldı.` }
  }

  /** Belirli bir ekipman etkisinin toplam değerini sorgula (yüzük + şapka + ayakkabı birikir) */
  const getEquipmentBonus = (effectType: RingEffectType): number => {
    let total = 0
    // Yüzükler (2 yuva)
    const ringIndices = [equippedRingSlot1.value, equippedRingSlot2.value]
    for (const idx of ringIndices) {
      if (idx < 0 || idx >= ownedRings.value.length) continue
      const ring = ownedRings.value[idx]!
      const def = getRingById(ring.defId)
      if (def) {
        for (const eff of def.effects) {
          if (eff.type === effectType) total += eff.value
        }
      }
    }
    // Şapka (1 yuva)
    if (equippedHatIndex.value >= 0 && equippedHatIndex.value < ownedHats.value.length) {
      const hat = ownedHats.value[equippedHatIndex.value]!
      const def = getHatById(hat.defId)
      if (def) {
        for (const eff of def.effects) {
          if (eff.type === effectType) total += eff.value
        }
      }
    }
    // Ayakkabı (1 yuva)
    if (equippedShoeIndex.value >= 0 && equippedShoeIndex.value < ownedShoes.value.length) {
      const shoe = ownedShoes.value[equippedShoeIndex.value]!
      const def = getShoeById(shoe.defId)
      if (def) {
        for (const eff of def.effects) {
          if (eff.type === effectType) total += eff.value
        }
      }
    }
    // Set bonusları
    for (const b of activeSetBonuses.value) {
      if (b.type === effectType) total += b.value
    }
    return total
  }

  /** Belirli bir yüzük etkisinin toplam değerini sorgula (getEquipmentBonus'a yönlendirir, şapka/ayakkabı bonuslarını da içerir) */
  const getRingEffectValue = (effectType: RingEffectType): number => {
    return getEquipmentBonus(effectType)
  }

  // ============================================================
  // Set sistemi
  // ============================================================

  /** Mevcut kuşanımda her set için etkin parça sayısını hesapla */
  const _getSetPieceCount = (set: (typeof EQUIPMENT_SETS)[number]): number => {
    let count = 0
    // Silah (isteğe bağlı alan)
    if (set.pieces.weapon) {
      const w = ownedWeapons.value[equippedWeaponIndex.value]
      if (w && w.defId === set.pieces.weapon) count++
    }
    // Yüzük: iki yuva yalnızca bir kez sayılır (aynı ID'li iki yüzüğün tekrar sayılmasını önlemek için)
    let ringMatched = false
    for (const idx of [equippedRingSlot1.value, equippedRingSlot2.value]) {
      if (!ringMatched && idx >= 0 && idx < ownedRings.value.length && ownedRings.value[idx]!.defId === set.pieces.ring) {
        ringMatched = true
        count++
      }
    }
    if (
      equippedHatIndex.value >= 0 &&
      equippedHatIndex.value < ownedHats.value.length &&
      ownedHats.value[equippedHatIndex.value]!.defId === set.pieces.hat
    )
      count++
    if (
      equippedShoeIndex.value >= 0 &&
      equippedShoeIndex.value < ownedShoes.value.length &&
      ownedShoes.value[equippedShoeIndex.value]!.defId === set.pieces.shoe
    )
      count++
    return count
  }

  /** Şu anda etkin olan set bonus etkileri listesi */
  const activeSetBonuses = computed(() => {
    const bonuses: { type: RingEffectType; value: number }[] = []
    for (const set of EQUIPMENT_SETS) {
      const count = _getSetPieceCount(set)
      for (const bonus of set.bonuses) {
        if (count >= bonus.count) bonuses.push(...bonus.effects)
      }
    }
    return bonuses
  })

  /** Set etkinlik durumu (arayüzde göstermek için) */
  const activeSets = computed(() => {
    return EQUIPMENT_SETS.map(set => {
      const equippedCount = _getSetPieceCount(set)
      return {
        id: set.id,
        name: set.name,
        description: set.description,
        equippedCount,
        bonuses: set.bonuses.map(b => ({
          count: b.count,
          description: b.description,
          active: equippedCount >= b.count
        }))
      }
    }).filter(s => s.equippedCount > 0)
  })

  /** Yüzük üret */
  const craftRing = (defId: string): { success: boolean; message: string } => {
    const def = getRingById(defId)
    if (!def || !def.recipe) return { success: false, message: 'Bu yüzük üretilemez.' }

    // Malzemeleri kontrol et
    for (const mat of def.recipe) {
      if (getItemCount(mat.itemId) < mat.quantity) {
        const matName = getItemById(mat.itemId)?.name ?? mat.itemId
        return { success: false, message: `Yetersiz malzeme: ${matName}.` }
      }
    }

    // Parayı kontrol et (döngüsel bağımlılığı önlemek için gecikmeli içe aktarma)
    const playerStore = usePlayerStore()
    if (playerStore.money < def.recipeMoney) {
      return { success: false, message: `Yetersiz para (gereken: ${def.recipeMoney}).` }
    }

    // Malzemeleri tüket
    for (const mat of def.recipe) {
      removeItem(mat.itemId, mat.quantity)
    }
    playerStore.spendMoney(def.recipeMoney)

    // Yüzüğü ekle
    addRing(defId)
    return { success: true, message: `${def.name} üretildi!` }
  }

  // ============================================================
  // Şapka sistemi
  // ============================================================

  /** Koleksiyona şapka ekle */
  const addHat = (defId: string): boolean => {
    ownedHats.value.push({ defId })
    useAchievementStore().discoverItem(defId)
    return true
  }

  /** Belirli bir şapkaya sahip olunup olunmadığını kontrol et */
  const hasHat = (defId: string): boolean => {
    return ownedHats.value.some(h => h.defId === defId)
  }

  /** Şapka kuşan */
  const equipHat = (index: number): boolean => {
    if (index < 0 || index >= ownedHats.value.length) return false
    equippedHatIndex.value = index
    return true
  }

  /** Şapkayı çıkar */
  const unequipHat = (): boolean => {
    if (equippedHatIndex.value < 0) return false
    equippedHatIndex.value = -1
    return true
  }

  /** Şapka sat */
  const sellHat = (index: number): { success: boolean; message: string } => {
    if (index < 0 || index >= ownedHats.value.length) return { success: false, message: 'Geçersiz indeks.' }
    const hat = ownedHats.value[index]!
    const def = getHatById(hat.defId)
    const price = def?.sellPrice ?? 0
    // Otomatik çıkar
    if (equippedHatIndex.value === index) equippedHatIndex.value = -1
    const playerStore = usePlayerStore()
    playerStore.earnMoney(price)
    ownedHats.value.splice(index, 1)
    // Kuşanım indeksini düzelt
    if (equippedHatIndex.value > index) equippedHatIndex.value--
    return { success: true, message: `${def?.name ?? 'Şapka'} satıldı, ${price} para kazanıldı.` }
  }

  /** Şapka üret */
  const craftHat = (defId: string): { success: boolean; message: string } => {
    const def = getHatById(defId)
    if (!def || !def.recipe) return { success: false, message: 'Bu şapka üretilemez.' }
    for (const mat of def.recipe) {
      if (getItemCount(mat.itemId) < mat.quantity) {
        const matName = getItemById(mat.itemId)?.name ?? mat.itemId
        return { success: false, message: `Yetersiz malzeme: ${matName}.` }
      }
    }
    const playerStore = usePlayerStore()
    if (playerStore.money < def.recipeMoney) {
      return { success: false, message: `Yetersiz para (gereken: ${def.recipeMoney}).` }
    }
    for (const mat of def.recipe) {
      removeItem(mat.itemId, mat.quantity)
    }
    playerStore.spendMoney(def.recipeMoney)
    addHat(defId)
    return { success: true, message: `${def.name} üretildi!` }
  }

  // ============================================================
  // Ayakkabı sistemi
  // ============================================================

  /** Koleksiyona ayakkabı ekle */
  const addShoe = (defId: string): boolean => {
    ownedShoes.value.push({ defId })
    useAchievementStore().discoverItem(defId)
    return true
  }

  /** Belirli bir ayakkabıya sahip olunup olunmadığını kontrol et */
  const hasShoe = (defId: string): boolean => {
    return ownedShoes.value.some(s => s.defId === defId)
  }

  /** Ayakkabı kuşan */
  const equipShoe = (index: number): boolean => {
    if (index < 0 || index >= ownedShoes.value.length) return false
    equippedShoeIndex.value = index
    return true
  }

  /** Ayakkabıyı çıkar */
  const unequipShoe = (): boolean => {
    if (equippedShoeIndex.value < 0) return false
    equippedShoeIndex.value = -1
    return true
  }

  /** Ayakkabı sat */
  const sellShoe = (index: number): { success: boolean; message: string } => {
    if (index < 0 || index >= ownedShoes.value.length) return { success: false, message: 'Geçersiz indeks.' }
    const shoe = ownedShoes.value[index]!
    const def = getShoeById(shoe.defId)
    const price = def?.sellPrice ?? 0
    // Otomatik çıkar
    if (equippedShoeIndex.value === index) equippedShoeIndex.value = -1
    const playerStore = usePlayerStore()
    playerStore.earnMoney(price)
    ownedShoes.value.splice(index, 1)
    // Kuşanım indeksini düzelt
    if (equippedShoeIndex.value > index) equippedShoeIndex.value--
    return { success: true, message: `${def?.name ?? 'Ayakkabı'} satıldı, ${price} para kazanıldı.` }
  }

  /** Ayakkabı üret */
  const craftShoe = (defId: string): { success: boolean; message: string } => {
    const def = getShoeById(defId)
    if (!def || !def.recipe) return { success: false, message: 'Bu ayakkabı üretilemez.' }
    for (const mat of def.recipe) {
      if (getItemCount(mat.itemId) < mat.quantity) {
        const matName = getItemById(mat.itemId)?.name ?? mat.itemId
        return { success: false, message: `Yetersiz malzeme: ${matName}.` }
      }
    }
    const playerStore = usePlayerStore()
    if (playerStore.money < def.recipeMoney) {
      return { success: false, message: `Yetersiz para (gereken: ${def.recipeMoney}).` }
    }
    for (const mat of def.recipe) {
      removeItem(mat.itemId, mat.quantity)
    }
    playerStore.spendMoney(def.recipeMoney)
    addShoe(defId)
    return { success: true, message: `${def.name} üretildi!` }
  }

  // ============================================================
  // Ekipman ön ayarı sistemi
  // ============================================================

  /** Boş ön ayar oluştur */
  const createEquipmentPreset = (name: string): boolean => {
    if (equipmentPresets.value.length >= 3) return false
    equipmentPresets.value.push({
      id: Date.now().toString(),
      name,
      weaponDefId: null,
      ringSlot1DefId: null,
      ringSlot2DefId: null,
      hatDefId: null,
      shoeDefId: null
    })
    return true
  }

  /** Ön ayarı sil */
  const deleteEquipmentPreset = (id: string) => {
    const idx = equipmentPresets.value.findIndex(p => p.id === id)
    if (idx >= 0) equipmentPresets.value.splice(idx, 1)
    if (activePresetId.value === id) activePresetId.value = null
  }

  /** Ön ayarı yeniden adlandır */
  const renameEquipmentPreset = (id: string, name: string) => {
    const preset = equipmentPresets.value.find(p => p.id === id)
    if (preset) preset.name = name.trim() || preset.name
  }

  /** Mevcut kuşanımı ön ayara kaydet */
  const saveCurrentToPreset = (id: string) => {
    const preset = equipmentPresets.value.find(p => p.id === id)
    if (!preset) return
    preset.weaponDefId = ownedWeapons.value[equippedWeaponIndex.value]?.defId ?? null
    preset.ringSlot1DefId = equippedRingSlot1.value >= 0 ? (ownedRings.value[equippedRingSlot1.value]?.defId ?? null) : null
    preset.ringSlot2DefId = equippedRingSlot2.value >= 0 ? (ownedRings.value[equippedRingSlot2.value]?.defId ?? null) : null
    preset.hatDefId = equippedHatIndex.value >= 0 ? (ownedHats.value[equippedHatIndex.value]?.defId ?? null) : null
    preset.shoeDefId = equippedShoeIndex.value >= 0 ? (ownedShoes.value[equippedShoeIndex.value]?.defId ?? null) : null
  }

  /** Ekipman ön ayarını uygula */
  const applyEquipmentPreset = (id: string): { success: boolean; message: string } => {
    const preset = equipmentPresets.value.find(p => p.id === id)
    if (!preset) return { success: false, message: 'Ön ayar mevcut değil.' }

    const missing: string[] = []

    // Silah
    if (preset.weaponDefId) {
      const idx = ownedWeapons.value.findIndex(w => w.defId === preset.weaponDefId)
      if (idx >= 0) equipWeapon(idx)
      else missing.push('Silah')
    }

    // Yüzük yuvası 1
    let ring1Idx = -1
    if (preset.ringSlot1DefId) {
      ring1Idx = ownedRings.value.findIndex(r => r.defId === preset.ringSlot1DefId)
      if (ring1Idx >= 0) equipRing(ring1Idx, 0)
      else missing.push('Yüzük 1')
    } else {
      unequipRing(0)
    }

    // Yüzük yuvası 2 (yuva 1 ile aynı defId yüzük yasaktır)
    if (preset.ringSlot2DefId) {
      if (preset.ringSlot2DefId === preset.ringSlot1DefId) {
        // Eski ön ayarda iki yuvada da aynı defId yüzük kayıtlıysa, artık yasak; yuva 2 atlanır
        unequipRing(1)
        missing.push('Yüzük 2 (Yuva 1 ile aynı olamaz)')
      } else {
        const idx = ownedRings.value.findIndex(r => r.defId === preset.ringSlot2DefId)
        if (idx >= 0) equipRing(idx, 1)
        else missing.push('Yüzük 2')
      }
    } else {
      unequipRing(1)
    }

    // Şapka
    if (preset.hatDefId) {
      const idx = ownedHats.value.findIndex(h => h.defId === preset.hatDefId)
      if (idx >= 0) equipHat(idx)
      else missing.push('Şapka')
    } else {
      unequipHat()
    }

    // Ayakkabı
    if (preset.shoeDefId) {
      const idx = ownedShoes.value.findIndex(s => s.defId === preset.shoeDefId)
      if (idx >= 0) equipShoe(idx)
      else missing.push('Ayakkabı')
    } else {
      unequipShoe()
    }

    activePresetId.value = id

    if (missing.length > 0) {
      return { success: true, message: `Ön ayar "${preset.name}" uygulandı, ancak ${missing.join('、')} artık envanterde yok.` }
    }
    return { success: true, message: `Ön ayar "${preset.name}" uygulandı.` }
  }

  const serialize = () => {
    return {
      items: items.value,
      capacity: capacity.value,
      tempItems: tempItems.value,
      tools: tools.value,
      ownedWeapons: ownedWeapons.value,
      equippedWeaponIndex: equippedWeaponIndex.value,
      pendingUpgrade: pendingUpgrade.value,
      ownedRings: ownedRings.value,
      equippedRingSlot1: equippedRingSlot1.value,
      equippedRingSlot2: equippedRingSlot2.value,
      ownedHats: ownedHats.value,
      equippedHatIndex: equippedHatIndex.value,
      ownedShoes: ownedShoes.value,
      equippedShoeIndex: equippedShoeIndex.value,
      equipmentPresets: equipmentPresets.value,
      activePresetId: activePresetId.value
    }
  }

  const deserialize = (data: ReturnType<typeof serialize>) => {
    items.value = (data.items ?? []).filter(i => getItemById(i.itemId))
    capacity.value = data.capacity ?? INITIAL_CAPACITY
    tempItems.value = ((data as any).tempItems ?? []).filter((i: InventoryItem) => getItemById(i.itemId))
    tools.value = data.tools ?? [
      { type: 'wateringCan', tier: 'basic' },
      { type: 'hoe', tier: 'basic' },
      { type: 'pickaxe', tier: 'basic' },
      { type: 'fishingRod', tier: 'basic' },
      { type: 'scythe', tier: 'basic' },
      { type: 'axe', tier: 'basic' },
      { type: 'pan', tier: 'basic' }
    ]
    // Geriye dönük uyumluluk: eski kayıtlar yeni araçları içermeyebilir
    const requiredTools: ToolType[] = ['wateringCan', 'hoe', 'pickaxe', 'fishingRod', 'scythe', 'axe', 'pan']
    for (const rt of requiredTools) {
      if (!tools.value.find(t => t.type === rt)) {
        tools.value.push({ type: rt, tier: 'basic' })
      }
    }

    // Yeni silah sistemi
    if ((data as any).ownedWeapons) {
      ownedWeapons.value = (data as any).ownedWeapons
      equippedWeaponIndex.value = (data as any).equippedWeaponIndex ?? 0
    } else {
      // Eski kayıt geçişi: weapon: { tier: 'copper' } → ownedWeapons
      const oldWeapon = (data as any).weapon
      if (oldWeapon?.tier) {
        const tierMap: Record<string, string> = {
          wood: 'wooden_stick',
          copper: 'copper_sword',
          iron: 'iron_blade',
          gold: 'gold_halberd'
        }
        const defId = tierMap[oldWeapon.tier as string] ?? 'wooden_stick'
        ownedWeapons.value = [{ defId, enchantmentId: null }]
        equippedWeaponIndex.value = 0
      } else {
        ownedWeapons.value = [{ defId: 'wooden_stick', enchantmentId: null }]
        equippedWeaponIndex.value = 0
      }
    }

    pendingUpgrade.value = (data as any).pendingUpgrade ?? null

    // Yüzük sistemi (eski kayıtlarla geriye dönük uyumluluk)
    ownedRings.value = ((data as Record<string, unknown>).ownedRings as OwnedRing[]) ?? []
    equippedRingSlot1.value = ((data as Record<string, unknown>).equippedRingSlot1 as number | undefined) ?? -1
    equippedRingSlot2.value = ((data as Record<string, unknown>).equippedRingSlot2 as number | undefined) ?? -1
    // Geçersiz indeksleri düzelt
    if (equippedRingSlot1.value >= ownedRings.value.length) equippedRingSlot1.value = -1
    if (equippedRingSlot2.value >= ownedRings.value.length) equippedRingSlot2.value = -1

    // Şapka sistemi (eski kayıtlarla geriye dönük uyumluluk)
    ownedHats.value = ((data as Record<string, unknown>).ownedHats as OwnedHat[]) ?? []
    equippedHatIndex.value = ((data as Record<string, unknown>).equippedHatIndex as number | undefined) ?? -1
    if (equippedHatIndex.value >= ownedHats.value.length) equippedHatIndex.value = -1

    // Ayakkabı sistemi (eski kayıtlarla geriye dönük uyumluluk)
    ownedShoes.value = ((data as Record<string, unknown>).ownedShoes as OwnedShoe[]) ?? []
    equippedShoeIndex.value = ((data as Record<string, unknown>).equippedShoeIndex as number | undefined) ?? -1
    if (equippedShoeIndex.value >= ownedShoes.value.length) equippedShoeIndex.value = -1

    // Ekipman ön ayarları (eski kayıtlarla geriye dönük uyumluluk)
    equipmentPresets.value = ((data as Record<string, unknown>).equipmentPresets as EquipmentPreset[] | undefined) ?? []
    activePresetId.value = ((data as Record<string, unknown>).activePresetId as string | null | undefined) ?? null
  }

  return {
    items,
    capacity,
    tools,
    ownedWeapons,
    equippedWeaponIndex,
    pendingUpgrade,
    isFull,
    tempItems,
    isTempFull,
    isAllFull,
    addItem,
    removeItem,
    getItemCount,
    hasItem,
    expandCapacity,
    expandCapacityExtra,
    MAX_CAPACITY,
    moveFromTemp,
    moveAllFromTemp,
    discardTempItem,
    sortItems,
    toggleLock,
    getTool,
    getToolStaminaMultiplier,
    getToolBatchCount,
    upgradeTool,
    isToolAvailable,
    startUpgrade,
    dailyUpgradeUpdate,
    getWeaponAttack,
    getWeaponCritRate,
    getEquippedWeapon,
    addWeapon,
    hasWeapon,
    equipWeapon,
    sellWeapon,
    ownedRings,
    equippedRingSlot1,
    equippedRingSlot2,
    addRing,
    hasRing,
    equipRing,
    unequipRing,
    sellRing,
    getRingEffectValue,
    getEquipmentBonus,
    craftRing,
    activeSets,
    ownedHats,
    equippedHatIndex,
    addHat,
    hasHat,
    equipHat,
    unequipHat,
    sellHat,
    craftHat,
    ownedShoes,
    equippedShoeIndex,
    addShoe,
    hasShoe,
    equipShoe,
    unequipShoe,
    sellShoe,
    craftShoe,
    equipmentPresets,
    activePresetId,
    createEquipmentPreset,
    deleteEquipmentPreset,
    renameEquipmentPreset,
    saveCurrentToPreset,
    applyEquipmentPreset,
    serialize,
    deserialize
  }
})
