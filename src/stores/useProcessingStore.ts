import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { MachineType, ProcessingSlot, Quality } from '@/types'
import {
  PROCESSING_MACHINES,
  SPRINKLERS,
  FERTILIZERS,
  BAITS,
  TACKLES,
  TAPPER,
  CRAB_POT_CRAFT,
  BOMBS,
  getRecipesForMachine,
  getProcessingRecipeById
} from '@/data/processing'
import { useInventoryStore } from './useInventoryStore'
import { usePlayerStore } from './usePlayerStore'
import { useSkillStore } from './useSkillStore'
import { useBreedingStore } from './useBreedingStore'
import { useWarehouseStore } from './useWarehouseStore'
import { useHiddenNpcStore } from './useHiddenNpcStore'
import { addLog } from '@/composables/useGameLog'
import { hasCombinedItem, removeCombinedItem, getLowestCombinedQuality } from '@/composables/useCombinedInventory'

/** Atolye yükseltme tanımları */
const WORKSHOP_UPGRADES = [
  {
    level: 1,
    cost: 10000,
    materials: [
      { itemId: 'iron_bar', quantity: 15 },
      { itemId: 'wood', quantity: 50 }
    ]
  },
  {
    level: 2,
    cost: 25000,
    materials: [
      { itemId: 'gold_bar', quantity: 10 },
      { itemId: 'wood', quantity: 80 }
    ]
  }
]

export const useProcessingStore = defineStore('processing', () => {
  const inventoryStore = useInventoryStore()
  const playerStore = usePlayerStore()
  const skillStore = useSkillStore()

  /** Yerleştirilmiş işleme makineleri (çalışan slotlar) */
  const machines = ref<ProcessingSlot[]>([])

  /** Atölye seviyesi: 0/1/2, karşılık gelen kapasite 15/20/25 */
  const workshopLevel = ref(0)

  /** Yerleştirilebilecek maksimum makine sayısı */
  const maxMachines = computed(() => 15 + workshopLevel.value * 5)

  /** Mevcut yerleştirilmiş makine sayısı */
  const machineCount = computed(() => machines.value.length)

  // === Üretim (Craft) ===

  /** Bir şeyi üretmek için yeterli malzeme olup olmadığını kontrol et */
  const canCraft = (craftCost: { itemId: string; quantity: number }[], craftMoney: number): boolean => {
    if (playerStore.money < craftMoney) return false
    return craftCost.every(c => hasCombinedItem(c.itemId, c.quantity))
  }

  /** Malzemeleri tüket */
  const consumeCraftMaterials = (craftCost: { itemId: string; quantity: number }[], craftMoney: number): boolean => {
    if (!canCraft(craftCost, craftMoney)) return false
    if (!playerStore.spendMoney(craftMoney)) return false
    for (const c of craftCost) {
      if (!removeCombinedItem(c.itemId, c.quantity)) {
        // Geri alma (basitleştirilmiş işlem: teoride canCraft kontrol ettiği için buraya gelmez)
        playerStore.earnMoney(craftMoney)
        return false
      }
    }
    return true
  }

  /** Bir işleme makinesi üret ve yerleştir */
  const craftMachine = (machineType: MachineType): boolean => {
    if (machines.value.length >= maxMachines.value) return false
    const def = PROCESSING_MACHINES.find(m => m.id === machineType)
    if (!def) return false
    if (!consumeCraftMaterials(def.craftCost, def.craftMoney)) return false
    machines.value.push({
      machineType,
      recipeId: null,
      inputItemId: null,
      daysProcessed: 0,
      totalDays: 0,
      ready: false
    })
    return true
  }

  /** Sulayıcı üret (eşya ID olarak çantaya eklenir) */
  const craftSprinkler = (sprinklerId: string): boolean => {
    const def = SPRINKLERS.find(s => s.id === sprinklerId)
    if (!def) return false
    if (!consumeCraftMaterials(def.craftCost, def.craftMoney)) return false
    inventoryStore.addItem(def.id)
    return true
  }

  /** Gübre üret */
  const craftFertilizer = (fertilizerId: string): boolean => {
    const def = FERTILIZERS.find(f => f.id === fertilizerId)
    if (!def) return false
    if (!consumeCraftMaterials(def.craftCost, def.craftMoney)) return false
    inventoryStore.addItem(def.id)
    return true
  }

  /** Yem üret */
  const craftBait = (baitId: string): boolean => {
    const def = BAITS.find(b => b.id === baitId)
    if (!def) return false
    if (!consumeCraftMaterials(def.craftCost, def.craftMoney)) return false
    inventoryStore.addItem(def.id)
    return true
  }

  /** Şamandıra üret */
  const craftTackle = (tackleId: string): boolean => {
    const def = TACKLES.find(t => t.id === tackleId)
    if (!def) return false
    if (!consumeCraftMaterials(def.craftCost, def.craftMoney)) return false
    inventoryStore.addItem(def.id)
    return true
  }

  /** Reçine musluğu üret */
  const craftTapper = (): boolean => {
    if (!consumeCraftMaterials(TAPPER.craftCost, TAPPER.craftMoney)) return false
    inventoryStore.addItem(TAPPER.id)
    return true
  }

  /** Yengeç kapanı üret */
  const craftCrabPot = (): boolean => {
    if (!consumeCraftMaterials(CRAB_POT_CRAFT.craftCost, CRAB_POT_CRAFT.craftMoney)) return false
    inventoryStore.addItem(CRAB_POT_CRAFT.id)
    return true
  }

  /** Bomba üret */
  const craftBomb = (bombId: string): boolean => {
    const def = BOMBS.find(b => b.id === bombId)
    if (!def) return false
    if (!consumeCraftMaterials(def.craftCost, def.craftMoney)) return false
    inventoryStore.addItem(def.id)
    return true
  }

  // === İşleme işlemleri ===

  /** Çanta + depodaki bir eşyanın en düşük kalitesini tespit et (removeItem varsayılan tüketim sırası) */
  const getLowestQuality = (itemId: string): Quality => {
    return getLowestCombinedQuality(itemId)
  }

  /** Yerleştirilmiş makineye hammadde koyup işlemeyi başlat */
  const startProcessing = (slotIndex: number, recipeId: string): boolean => {
    const slot = machines.value[slotIndex]
    if (!slot || slot.recipeId !== null) return false // Zaten işleniyor
    const recipe = getProcessingRecipeById(recipeId)
    if (!recipe || recipe.machineType !== slot.machineType) return false

    // Girdi malzemesini tüket (arı kovanı girdi istemez), kaliteyi kaydet
    let quality: Quality = 'normal'
    if (recipe.inputItemId !== null) {
      quality = getLowestQuality(recipe.inputItemId)
      // Kalite belirtmeden tüket; karışık kalite girdisine izin verilir (normal→supreme sırasıyla tüketilir)
      if (!removeCombinedItem(recipe.inputItemId, recipe.inputQuantity)) return false
    }

    slot.recipeId = recipeId
    slot.inputItemId = recipe.inputItemId
    slot.inputQuality = quality
    slot.daysProcessed = 0
    slot.totalDays = recipe.processingDays
    // Ruhsal yetenek: Dokuma Hızı (gui_nv_1), tezgâh işlem süresi -%30
    if (slot.machineType === 'loom' && useHiddenNpcStore().isAbilityActive('gui_nv_1')) {
      slot.totalDays = Math.max(1, Math.ceil(slot.totalDays * 0.7))
    }
    slot.ready = false
    return true
  }

  /** İşlenmiş ürünü topla */
  const collectProduct = (slotIndex: number): string | null => {
    const slot = machines.value[slotIndex]
    if (!slot || !slot.ready || !slot.recipeId) return null

    const recipe = getProcessingRecipeById(slot.recipeId)
    if (!recipe) return null

    // Önce boşluk sandığı çıktı sandığına koy, doluysa çantaya geri düş
    const warehouseStore = useWarehouseStore()
    const voidOutput = warehouseStore.getVoidOutputChest()
    const outputQuality = slot.inputQuality ?? 'normal'
    if (!voidOutput || !warehouseStore.addItemToChest(voidOutput.id, recipe.outputItemId, recipe.outputQuantity, outputQuality)) {
      inventoryStore.addItem(recipe.outputItemId, recipe.outputQuantity, outputQuality)
    }

    // Tohum makinesi ek olarak yetiştirme tohumu üretimini tetikler
    if (slot.machineType === 'seed_maker' && slot.inputItemId) {
      const breedingStore = useBreedingStore()
      const farmingLevel = skillStore.farmingLevel
      if (breedingStore.trySeedMakerGeneticSeed(slot.inputItemId, farmingLevel)) {
        addLog('Tohum makinesi ek olarak bir yetiştirme tohumu üretti!')
      }
    }

    // Slotu sıfırla
    slot.recipeId = null
    slot.inputItemId = null
    slot.inputQuality = undefined
    slot.daysProcessed = 0
    slot.totalDays = 0
    slot.ready = false

    return recipe.outputItemId
  }

  /** Makineyi kaldır (işlenen hammadde + tamamlanmış ürün + makine yapım malzemeleri iade edilir) */
  const removeMachine = (slotIndex: number): boolean => {
    const slot = machines.value[slotIndex]
    if (!slot) return false

    // Eğer tamamlandıysa: önce ürünü al
    if (slot.recipeId && slot.ready) {
      const recipe = getProcessingRecipeById(slot.recipeId)
      if (recipe) {
        const warehouseStore = useWarehouseStore()
        const voidOutput = warehouseStore.getVoidOutputChest()
        const outputQuality = slot.inputQuality ?? 'normal'
        if (!voidOutput || !warehouseStore.addItemToChest(voidOutput.id, recipe.outputItemId, recipe.outputQuantity, outputQuality)) {
          inventoryStore.addItem(recipe.outputItemId, recipe.outputQuantity, outputQuality)
        }
      }
    }
    // Eğer işleniyorsa: hammaddeleri geri ver
    else if (slot.recipeId && !slot.ready && slot.inputItemId) {
      const recipe = getProcessingRecipeById(slot.recipeId)
      if (recipe && recipe.inputItemId) {
        inventoryStore.addItem(recipe.inputItemId, recipe.inputQuantity, slot.inputQuality ?? 'normal')
      }
    }

    // Makine üretim malzemelerini geri ver
    const machineDef = PROCESSING_MACHINES.find(m => m.id === slot.machineType)
    if (machineDef) {
      for (const mat of machineDef.craftCost) {
        inventoryStore.addItem(mat.itemId, mat.quantity)
      }
      playerStore.earnMoney(machineDef.craftMoney)
    }

    machines.value.splice(slotIndex, 1)
    return true
  }

  /** İşlemeyi iptal et (hammadde geri verilir, makine boş duruma döner) */
  const cancelProcessing = (slotIndex: number): boolean => {
    const slot = machines.value[slotIndex]
    if (!slot || !slot.recipeId) return false
    // Eğer işlem sürüyorsa ve hammadde girdisi varsa, hammaddeleri geri ver
    if (!slot.ready && slot.inputItemId) {
      const recipe = getProcessingRecipeById(slot.recipeId)
      if (recipe && recipe.inputItemId) {
        inventoryStore.addItem(recipe.inputItemId, recipe.inputQuantity, slot.inputQuality ?? 'normal')
      }
    }
    // Boş duruma sıfırla
    slot.recipeId = null
    slot.inputItemId = null
    slot.inputQuality = undefined
    slot.daysProcessed = 0
    slot.totalDays = 0
    slot.ready = false
    return true
  }

  /** Belirli bir makine için kullanılabilir tarif listesini al */
  const getAvailableRecipes = (machineType: MachineType) => {
    return getRecipesForMachine(machineType)
  }

  // === Günlük güncelleme ===

  const dailyUpdate = () => {
    const collected: string[] = []
    const readyNames: string[] = []
    const warehouseStore = useWarehouseStore()
    const voidOutput = warehouseStore.getVoidOutputChest()
    for (const slot of machines.value) {
      if (!slot.recipeId || slot.ready) continue
      slot.daysProcessed++
      if (slot.daysProcessed >= slot.totalDays) {
        const recipe = getProcessingRecipeById(slot.recipeId)
        if (recipe) {
          // Ruhsal yetenek: Rüya Dokuması (gui_nv_2), tezgâhta %8 ihtimalle ekstra rüya ipeği üretir
          if (slot.machineType === 'loom' && useHiddenNpcStore().isAbilityActive('gui_nv_2') && Math.random() < 0.08) {
            inventoryStore.addItem('dream_silk', 1)
            collected.push('Rüya İpeği')
          }
          const machineDef = PROCESSING_MACHINES.find(m => m.id === slot.machineType)
          if (recipe.inputItemId === null || machineDef?.autoCollect) {
            // Otomatik toplama: girdi istemeyen makineler (arı kovanı / solucan kutusu) veya autoCollect işaretli makineler (fırın)
            const outputQuality = slot.inputQuality ?? 'normal'
            if (!voidOutput || !warehouseStore.addItemToChest(voidOutput.id, recipe.outputItemId, recipe.outputQuantity, outputQuality)) {
              inventoryStore.addItem(recipe.outputItemId, recipe.outputQuantity, outputQuality)
            }
            collected.push(recipe.name)
            // Girdi istemeyen makineler otomatik yeniden başlar, diğerleri boş duruma döner
            if (recipe.inputItemId === null) {
              slot.daysProcessed = 0
              slot.inputQuality = undefined
              slot.ready = false
            } else {
              slot.recipeId = null
              slot.inputItemId = null
              slot.inputQuality = undefined
              slot.daysProcessed = 0
              slot.totalDays = 0
              slot.ready = false
            }
          } else {
            // Girdi isteyen makineler: boşluk girdi sandığından otomatik devam edip edemeyeceğini kontrol et
            const voidInput = warehouseStore.getVoidInputChest()
            if (voidInput && recipe.inputItemId) {
              // Mevcut ürünü otomatik topla
              const outputQuality = slot.inputQuality ?? 'normal'
              if (!voidOutput || !warehouseStore.addItemToChest(voidOutput.id, recipe.outputItemId, recipe.outputQuantity, outputQuality)) {
                inventoryStore.addItem(recipe.outputItemId, recipe.outputQuantity, outputQuality)
              }
              collected.push(recipe.name)

              // Sonraki tur için boşluk girdi sandığından malzeme çekmeyi dene
              const available = warehouseStore.getChestItemCount(voidInput.id, recipe.inputItemId)
              if (available >= recipe.inputQuantity) {
                // En düşük kaliteyi bul
                const qOrder: Quality[] = ['normal', 'fine', 'excellent', 'supreme']
                const newQuality = qOrder.find(q => warehouseStore.getChestItemCount(voidInput.id, recipe.inputItemId!, q) > 0) ?? 'normal'
                warehouseStore.removeItemFromChest(voidInput.id, recipe.inputItemId, recipe.inputQuantity, newQuality)
                slot.daysProcessed = 0
                slot.inputQuality = newQuality
                slot.ready = false
              } else {
                // Boşluk sandığında yeterli hammadde yok, boş duruma dön
                slot.recipeId = null
                slot.inputItemId = null
                slot.inputQuality = undefined
                slot.daysProcessed = 0
                slot.totalDays = 0
                slot.ready = false
              }
            } else {
              // Boşluk girdi sandığı yoksa eski davranış korunur: tamamlandı olarak işaretlenir ve elle toplanır
              slot.ready = true
              readyNames.push(recipe.name)
            }
          }
        } else {
          slot.ready = true
        }
      }
    }
    if (collected.length > 0) {
      const counts = new Map<string, number>()
      for (const name of collected) {
        counts.set(name, (counts.get(name) ?? 0) + 1)
      }
      const summary = Array.from(counts.entries())
        .map(([name, count]) => (count > 1 ? `${name}x${count}` : name))
        .join('、')
      addLog(`Atölyede otomatik toplananlar: ${summary}.`)
    }
    if (readyNames.length > 0) {
      const counts = new Map<string, number>()
      for (const name of readyNames) {
        counts.set(name, (counts.get(name) ?? 0) + 1)
      }
      const summary = Array.from(counts.entries())
        .map(([name, count]) => (count > 1 ? `${name}x${count}` : name))
        .join('、')
      addLog(`İşleme tamamlandı: ${summary}, gidip atölyeden al.`)
    }
  }

  // === Atölye yükseltme ===

  /** Atölyeyi yükselt (makine sınırını artırır) */
  const upgradeWorkshop = (): { success: boolean; message: string } => {
    const next = workshopLevel.value + 1
    const upgrade = WORKSHOP_UPGRADES.find(u => u.level === next)
    if (!upgrade) return { success: false, message: 'Atölye en yüksek seviyeye ulaştı.' }
    if (!consumeCraftMaterials(upgrade.materials, upgrade.cost)) return { success: false, message: 'Malzeme veya para yetersiz.' }
    workshopLevel.value = next
    return { success: true, message: `Atölye genişletildi! Makine limiti ${maxMachines.value} adede çıktı.` }
  }

  /** Sonraki seviye yükseltme bilgisini al */
  const getNextUpgrade = () => {
    const next = workshopLevel.value + 1
    return WORKSHOP_UPGRADES.find(u => u.level === next) ?? null
  }

  // === Serileştirme ===

  const serialize = () => {
    return { machines: machines.value, workshopLevel: workshopLevel.value }
  }

  const deserialize = (data: ReturnType<typeof serialize>) => {
    machines.value = data.machines ?? []
    workshopLevel.value = (data as any).workshopLevel ?? 0
  }

  return {
    machines,
    machineCount,
    maxMachines,
    workshopLevel,
    canCraft,
    consumeCraftMaterials,
    craftMachine,
    craftSprinkler,
    craftFertilizer,
    craftBait,
    craftTackle,
    craftTapper,
    craftCrabPot,
    craftBomb,
    startProcessing,
    collectProduct,
    cancelProcessing,
    removeMachine,
    getAvailableRecipes,
    dailyUpdate,
    upgradeWorkshop,
    getNextUpgrade,
    WORKSHOP_UPGRADES,
    serialize,
    deserialize
  }
})
