import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useGameStore } from './useGameStore'
import { usePlayerStore } from './usePlayerStore'
import { useInventoryStore } from './useInventoryStore'
import { useSkillStore } from './useSkillStore'
import { useWalletStore } from './useWalletStore'
import { getCropsBySeason, getItemById } from '@/data'
import { BAITS, TACKLES, FERTILIZERS } from '@/data/processing'
import { isTravelingMerchantDay, generateMerchantStock, TRAVELING_MERCHANT_POOL } from '@/data/travelingMerchant'
import { getMarketMultiplier } from '@/data/market'
import type { MarketCategory } from '@/data/market'
import type { TravelingMerchantStock } from '@/data/travelingMerchant'
import type { Quality } from '@/types'
import { useHiddenNpcStore } from './useHiddenNpcStore'

/** Mağaza ürün kaydı */
export interface ShopItemEntry {
  itemId: string
  name: string
  price: number
  description: string
}

export const useShopStore = defineStore('shop', () => {
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const inventoryStore = useInventoryStore()
  const skillStore = useSkillStore()

  // === Çoklu mağaza gezinmesi ===

  /** Şu anda seçili mağaza (null = çarşı genel görünümü) */
  const currentShopId = ref<string | null>(null)

  // === İndirim sistemi ===

  /** İndirimli fiyatı hesapla */
  const applyDiscount = (price: number): number => {
    const walletStore = useWalletStore()
    const discount = walletStore.getShopDiscount()
    const ringDiscount = inventoryStore.getRingEffectValue('shop_discount')
    // Ruh bağı yeteneği: Tilki Gözü (hu_xian_1) mağaza fiyatlarını düşürür
    const spiritDiscount = useHiddenNpcStore().getAbilityValue('hu_xian_1') / 100
    return Math.floor(price * (1 - discount) * (1 - ringDiscount) * (1 - spiritDiscount))
  }

  // === Genel dükkân ===

  /** Mevcut mevsimde satın alınabilecek tohumlar */
  const availableSeeds = computed(() => {
    return getCropsBySeason(gameStore.season)
      .filter(crop => crop.seedPrice > 0)
      .map(crop => ({
        seedId: crop.seedId,
        cropName: crop.name,
        price: crop.seedPrice,
        growthDays: crop.growthDays,
        sellPrice: crop.sellPrice,
        regrowth: crop.regrowth ?? false,
        regrowthDays: crop.regrowthDays,
        season: crop.season
      }))
  })

  /** Tohum satın al */
  const buySeed = (seedId: string, quantity: number = 1): boolean => {
    const seed = availableSeeds.value.find(s => s.seedId === seedId)
    if (!seed) return false
    if (inventoryStore.isAllFull && !inventoryStore.items.some(s => s.itemId === seedId && s.quantity + quantity <= 99)) return false
    const totalCost = applyDiscount(seed.price) * quantity
    if (!playerStore.spendMoney(totalCost)) return false
    if (!inventoryStore.addItem(seedId, quantity)) {
      playerStore.earnMoney(totalCost)
      return false
    }
    return true
  }

  // === Demirci ===

  const blacksmithItems = computed<ShopItemEntry[]>(() => [
    { itemId: 'copper_ore', name: 'Bakır Cevheri', price: 100, description: 'Madende sık görülen bakır cevheri' },
    { itemId: 'iron_ore', name: 'Demir Cevheri', price: 200, description: 'Orta katmanlarda çıkan demir cevheri' },
    { itemId: 'gold_ore', name: 'Altın Cevheri', price: 400, description: 'Derin katmanlarda çıkan altın cevheri' },
    { itemId: 'copper_bar', name: 'Bakır Külçe', price: 300, description: 'Eritilmiş bakır külçesi' },
    { itemId: 'iron_bar', name: 'Demir Külçe', price: 600, description: 'Eritilmiş demir külçesi' },
    { itemId: 'gold_bar', name: 'Altın Külçe', price: 1200, description: 'Eritilmiş altın külçesi' },
    { itemId: 'charcoal', name: 'Odun Kömürü', price: 100, description: 'Yakılarak elde edilmiş odun kömürü' }
  ])

  // === Eczane ===

  /** Satın alınabilir gübreler (shopPrice != null) */
  const shopFertilizers = computed(() =>
    FERTILIZERS.filter(f => f.shopPrice !== null).map(f => ({
      id: f.id,
      name: f.name,
      description: f.description,
      price: f.shopPrice!
    }))
  )

  const apothecaryItems = computed<ShopItemEntry[]>(() => [
    { itemId: 'herb', name: 'Şifalı Ot', price: 50, description: 'Dağlarda yetişen yabani otlar' },
    { itemId: 'ginseng', name: 'Ginseng', price: 600, description: 'Son derece değerli yabani ginseng' },
    { itemId: 'animal_medicine', name: 'Hayvan İlacı', price: 150, description: 'Hastalanan çiftlik hayvanlarını tedavi eder' },
    { itemId: 'premium_feed', name: 'Özel Yem', price: 200, description: 'Hayvanların ruh halini ve sevgisini artırır' },
    { itemId: 'nourishing_feed', name: 'Besleyici Yem', price: 250, description: 'Hayvan üretimini hızlandırır' },
    { itemId: 'vitality_feed', name: 'Canlandırıcı Yem', price: 300, description: 'Verildiğinde hastalığı kesin iyileştirir' },
    { itemId: 'fish_feed', name: 'Balık Yemi', price: 30, description: 'Balık havuzu için özel yem' },
    { itemId: 'water_purifier', name: 'Su Arıtıcı', price: 100, description: 'Balık havuzunun su kalitesini iyileştirir' }
  ])

  // === Balıkçılık dükkânı ===

  /** Satın alınabilir yemler (shopPrice != null) */
  const shopBaits = computed(() =>
    BAITS.filter(b => b.shopPrice !== null).map(b => ({
      id: b.id,
      name: b.name,
      description: b.description,
      price: b.shopPrice!
    }))
  )

  /** Satın alınabilir şamandıralar (shopPrice != null) */
  const shopTackles = computed(() =>
    TACKLES.filter(t => t.shopPrice !== null).map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      price: t.shopPrice!
    }))
  )

  /** Balıkçılık dükkânındaki diğer ürünler */
  const fishingShopItems = computed<ShopItemEntry[]>(() => [
    { itemId: 'crab_pot', name: 'Yengeç Kapanı', price: 1500, description: 'Balık tutma alanına yerleştirilir, her gün otomatik su ürünü yakalar (yem gerekir)' }
  ])

  // === Kumaşçı ===

  const textileItems = computed<ShopItemEntry[]>(() => [
    { itemId: 'cloth', name: 'Kumaş', price: 1200, description: 'Yünden dokunmuş kumaş' },
    { itemId: 'silk_cloth', name: 'İpek', price: 500, description: 'Gösterişli ipek kumaş' },
    { itemId: 'alpaca_cloth', name: 'Alpaka Yünü', price: 900, description: 'Son derece yumuşak alpaka kumaşı' },
    { itemId: 'felt', name: 'Keçe', price: 600, description: 'Tavşan tüyünden sıkıştırılmış keçe' },
    { itemId: 'silk_ribbon', name: 'İpek Mendil', price: 500, description: 'Özenle işlenmiş ipek mendil' },
    { itemId: 'jade_ring', name: 'Yeşim Yüzük', price: 1500, description: 'Evlenme teklifinde kullanılabilir' },
    { itemId: 'zhiji_jade', name: 'Dostluk Yeşimi', price: 1500, description: 'Aynı cinsiyetten yakın dosta verilirse ruh dostu olunur' },
    { itemId: 'pine_incense', name: 'Çam Tütsüsü', price: 250, description: 'Ferah çam kokusu' },
    { itemId: 'camphor_incense', name: 'Kafur Tütsüsü', price: 400, description: 'Zihni açar, canlandırır' },
    { itemId: 'osmanthus_incense', name: 'Osmanthus Tütsüsü', price: 800, description: 'Yoğun ve hoş osmanthus kokusu' }
  ])

  // === Genel satın alma / satma ===

  /** Genel eşya satın al */
  const buyItem = (itemId: string, price: number, quantity: number = 1): boolean => {
    if (inventoryStore.isAllFull && !inventoryStore.items.some(s => s.itemId === itemId && s.quantity + quantity <= 99)) return false
    const totalCost = applyDiscount(price) * quantity
    if (!playerStore.spendMoney(totalCost)) return false
    if (!inventoryStore.addItem(itemId, quantity)) {
      playerStore.earnMoney(totalCost)
      return false
    }
    return true
  }

  /** Piyasa katsayısı olmadan temel satış fiyatını hesapla */
  const _basePrice = (itemId: string, quantity: number, quality: Quality): number => {
    const itemDef = getItemById(itemId)
    if (!itemDef) return 0
    const qualityMultiplier: Record<Quality, number> = {
      normal: 1.0,
      fine: 1.25,
      excellent: 1.5,
      supreme: 2.0
    }
    let bonus = 1.0
    if (itemDef.category === 'processed' && skillStore.getSkill('farming').perk10 === 'artisan') bonus *= 1.25
    if (itemDef.category === 'crop' && skillStore.getSkill('farming').perk5 === 'harvester') bonus *= 1.1
    if (itemDef.category === 'animal_product' && skillStore.getSkill('farming').perk5 === 'rancher') bonus *= 1.2
    if (itemDef.category === 'fish' && skillStore.getSkill('fishing').perk5 === 'fisher') bonus *= 1.25
    if (itemDef.category === 'fish' && skillStore.getSkill('fishing').perk10 === 'aquaculture') bonus *= 1.5
    if (itemDef.category === 'fish' && gameStore.farmMapType === 'riverland') bonus *= 1.1
    if (itemDef.category === 'ore' && skillStore.getSkill('mining').perk10 === 'blacksmith') bonus *= 1.5
    const ringSelBonus = inventoryStore.getRingEffectValue('sell_price_bonus')
    // Ruh bağı ödülü: Tilki ruhu satış bonusu
    const hiddenNpcStore = useHiddenNpcStore()
    const sellBonusData = hiddenNpcStore.getBondBonusByType('sell_bonus')
    const spiritSellBonus = sellBonusData?.type === 'sell_bonus' ? sellBonusData.percent / 100 : 0
    return Math.floor(itemDef.sellPrice * quantity * qualityMultiplier[quality] * bonus * (1 + ringSelBonus) * (1 + spiritSellBonus))
  }

  /** Eşya satış fiyatını hesapla (sadece değer biçme için, satış yapmaz) */
  const calculateSellPrice = (itemId: string, quantity: number, quality: Quality): number => {
    const itemDef = getItemById(itemId)
    if (!itemDef) return 0
    const recentVolume = getRecentShipping()[itemDef.category as MarketCategory] ?? 0
    const marketMultiplier = getMarketMultiplier(itemDef.category, gameStore.year, gameStore.seasonIndex, gameStore.day, recentVolume)
    return Math.floor(_basePrice(itemId, quantity, quality) * marketMultiplier)
  }

  /** Piyasa etkisi olmadan temel satış fiyatını hesapla (ham fiyat gösterimi için) */
  const calculateBaseSellPrice = (itemId: string, quantity: number, quality: Quality): number => {
    return _basePrice(itemId, quantity, quality)
  }

  /** Eşya sat, gerçek satış fiyatını döndürür (0 = başarısız) */
  const sellItem = (itemId: string, quantity: number = 1, quality: Quality = 'normal'): number => {
    if (!inventoryStore.removeItem(itemId, quantity, quality)) return 0
    const totalPrice = calculateSellPrice(itemId, quantity, quality)
    playerStore.earnMoney(totalPrice)
    return totalPrice
  }

  // === Gezgin tüccar ===

  const travelingStock = ref<TravelingMerchantStock[]>([])
  const travelingStockKey = ref('')

  const isMerchantHere = computed(() => isTravelingMerchantDay(gameStore.day))

  const refreshMerchantStock = () => {
    const key = `${gameStore.year}_${gameStore.seasonIndex}_${gameStore.day}`
    if (travelingStockKey.value === key) return
    travelingStock.value = generateMerchantStock(gameStore.year, gameStore.seasonIndex, gameStore.day, gameStore.season)
    // Ruh bağı yeteneği: Tilki Talihi (hu_xian_3), gezgin tüccara 1 nadir eşya daha ekler
    if (useHiddenNpcStore().isAbilityActive('hu_xian_3')) {
      const existingIds = new Set(travelingStock.value.map(s => s.itemId))
      const available = TRAVELING_MERCHANT_POOL.filter(p => !existingIds.has(p.itemId))
      if (available.length > 0) {
        const pick = available[Math.floor(Math.random() * available.length)]!
        const def = getItemById(pick.itemId)
        let price = pick.basePrice
        if (def && def.sellPrice > 0) price = Math.max(price, def.sellPrice * 2)
        travelingStock.value.push({
          itemId: pick.itemId,
          name: pick.name,
          price,
          quantity: 1
        })
      }
    }
    travelingStockKey.value = key
  }

  const buyFromTraveler = (itemId: string): boolean => {
    const item = travelingStock.value.find(s => s.itemId === itemId)
    if (!item || item.quantity <= 0) return false
    if (inventoryStore.isAllFull && !inventoryStore.items.some(s => s.itemId === itemId && s.quantity < 99)) return false
    const finalPrice = applyDiscount(item.price)
    if (!playerStore.spendMoney(finalPrice)) return false
    if (!inventoryStore.addItem(itemId)) {
      playerStore.earnMoney(finalPrice)
      return false
    }
    item.quantity--
    return true
  }

  // === Sevkiyat kutusu ===

  /** Sevkiyat kutusundaki eşyalar */
  const shippingBox = ref<{ itemId: string; quantity: number; quality: Quality }[]>([])

  /** Sevkiyat kutusuna eşya ekle */
  const addToShippingBox = (itemId: string, quantity: number, quality: Quality): boolean => {
    if (!inventoryStore.removeItem(itemId, quantity, quality)) return false
    const existing = shippingBox.value.find(s => s.itemId === itemId && s.quality === quality)
    if (existing) {
      existing.quantity += quantity
    } else {
      shippingBox.value.push({ itemId, quantity, quality })
    }
    return true
  }

  /** Sevkiyat kutusundan eşya geri al */
  const removeFromShippingBox = (itemId: string, quantity: number, quality: Quality): boolean => {
    const idx = shippingBox.value.findIndex(s => s.itemId === itemId && s.quality === quality)
    if (idx === -1) return false
    const entry = shippingBox.value[idx]!
    if (entry.quantity < quantity) return false
    // Önce çantadaki boş alanı hesapla; addItem’in kısmi ekleme etkilerini önlemek için
    const MAX_STACK = 99
    let space = 0
    for (const s of inventoryStore.items) {
      if (s.itemId === itemId && s.quality === quality && s.quantity < MAX_STACK) {
        space += MAX_STACK - s.quantity
      }
    }
    space += (inventoryStore.capacity - inventoryStore.items.length) * MAX_STACK
    const toTransfer = Math.min(quantity, space)
    if (toTransfer <= 0) return false
    // Önce sevkiyat kutusundan düş, sonra çantaya ekle
    entry.quantity -= toTransfer
    if (entry.quantity <= 0) {
      shippingBox.value.splice(idx, 1)
    }
    inventoryStore.addItem(itemId, toTransfer, quality)
    return true
  }

  /** Gün sonu sevkiyat kutusunu işle, toplam geliri döndürür */
  const processShippingBox = (): number => {
    let total = 0
    const dayKey = `${gameStore.year}-${gameStore.seasonIndex}-${gameStore.day}`
    const dayRecord: Record<string, number> = { ...(shippingHistory.value[dayKey] ?? {}) }
    for (const entry of shippingBox.value) {
      total += calculateSellPrice(entry.itemId, entry.quantity, entry.quality)
      // Sevkiyat koleksiyonuna kaydet
      if (!shippedItems.value.includes(entry.itemId)) {
        shippedItems.value.push(entry.itemId)
      }
      // Kategori bazlı sevkiyat miktarını kaydet (arz-talep katsayısı için)
      const def = getItemById(entry.itemId)
      if (def) {
        dayRecord[def.category] = (dayRecord[def.category] ?? 0) + entry.quantity
      }
    }
    shippingHistory.value[dayKey] = dayRecord
    _pruneShippingHistory()
    shippingBox.value = []
    return total
  }

  // === Sevkiyat koleksiyonu ===

  /** Daha önce sevk edilmiş eşya ID kümesi */
  const shippedItems = ref<string[]>([])

  // === Sevkiyat geçmişi (arz-talep katsayısı için) ===

  /** Son sevkiyat kayıtları: dayKey → { category → quantity } */
  const shippingHistory = ref<Record<string, Record<string, number>>>({})

  /** Tarihi mutlak gün değerine çevir (karşılaştırma için) */
  const _toAbsoluteDay = (year: number, seasonIndex: number, day: number): number => {
    return (year - 1) * 112 + seasonIndex * 28 + day
  }

  /** 7 günden eski sevkiyat kayıtlarını temizle */
  const _pruneShippingHistory = () => {
    const now = _toAbsoluteDay(gameStore.year, gameStore.seasonIndex, gameStore.day)
    const keys = Object.keys(shippingHistory.value)
    for (const key of keys) {
      const parts = key.split('-').map(Number)
      const abs = _toAbsoluteDay(parts[0]!, parts[1]!, parts[2]!)
      if (now - abs > 7) {
        delete shippingHistory.value[key]
      }
    }
  }

  /** Son 7 gündeki kategori bazlı toplam sevkiyat miktarını al */
  const getRecentShipping = (): Partial<Record<MarketCategory, number>> => {
    _pruneShippingHistory()
    const result: Partial<Record<MarketCategory, number>> = {}
    for (const record of Object.values(shippingHistory.value)) {
      for (const [cat, qty] of Object.entries(record)) {
        result[cat as MarketCategory] = (result[cat as MarketCategory] ?? 0) + qty
      }
    }
    return result
  }

  // === Serileştirme ===

  const serialize = () => ({
    travelingStockKey: travelingStockKey.value,
    travelingStock: travelingStock.value,
    shippingBox: shippingBox.value,
    shippedItems: shippedItems.value,
    shippingHistory: shippingHistory.value
  })

  const deserialize = (data: any) => {
    travelingStockKey.value = data?.travelingStockKey ?? ''
    travelingStock.value = data?.travelingStock ?? []
    shippingBox.value = data?.shippingBox ?? []
    shippedItems.value = data?.shippedItems ?? []
    shippingHistory.value = data?.shippingHistory ?? {}
    currentShopId.value = null
  }

  return {
    // Gezinme
    currentShopId,
    // İndirim
    applyDiscount,
    // Genel dükkân
    availableSeeds,
    buySeed,
    // Demirci
    blacksmithItems,
    // Balıkçılık dükkânı
    shopBaits,
    shopTackles,
    fishingShopItems,
    // Eczane
    shopFertilizers,
    apothecaryItems,
    // Kumaşçı
    textileItems,
    // Genel
    buyItem,
    sellItem,
    calculateSellPrice,
    calculateBaseSellPrice,
    // Gezgin tüccar
    travelingStock,
    isMerchantHere,
    refreshMerchantStock,
    buyFromTraveler,
    // Sevkiyat kutusu
    shippingBox,
    addToShippingBox,
    removeFromShippingBox,
    processShippingBox,
    // Sevkiyat koleksiyonu
    shippedItems,
    // Arz-talep verileri
    getRecentShipping,
    // Serileştirme
    serialize,
    deserialize
  }
})
