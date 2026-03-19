import { getWeekday } from './timeConstants'
import { CROPS } from './crops'
import { getItemById } from './items'
import type { Season } from '@/types'

/** Gezgin tüccar eşya tanımı */
export interface TravelingMerchantItem {
  itemId: string
  name: string
  basePrice: number // Tüccarın satış fiyatı (genelde satış fiyatının 2-3 katı)
}

/** Gezgin tüccarın günlük stoğu */
export interface TravelingMerchantStock {
  itemId: string
  name: string
  price: number // Rastgele dalgalanma uygulanmış satış fiyatı
  quantity: number // Kalan satın alınabilir miktar
}

/** Gezgin tüccar eşya havuzu */
export const TRAVELING_MERCHANT_POOL: TravelingMerchantItem[] = [
  // Nadir mücevherler
  { itemId: 'dragon_jade', name: 'Ejder Yeşimi', basePrice: 800 },
  { itemId: 'prismatic_shard', name: 'Prizmatik Parça', basePrice: 1200 },
  { itemId: 'moonstone', name: 'Aytaşı', basePrice: 400 },
  // Nadir toplanabilirler
  { itemId: 'ginseng', name: 'Ginseng', basePrice: 500 },
  { itemId: 'wintersweet', name: 'Kış Tatlısı Çiçeği', basePrice: 150 },
  // Özel malzemeler
  { itemId: 'iridium_ore', name: 'İridyum Cevheri', basePrice: 700 },
  { itemId: 'cloth', name: 'Kumaş', basePrice: 1000 },
  // Nadir hayvansal ürünler
  { itemId: 'rabbit_foot', name: 'Şanslı Tavşan Ayağı', basePrice: 1200 },
  { itemId: 'truffle', name: 'Trüf', basePrice: 1400 },
  // Özel eşyalar
  { itemId: 'rain_totem', name: 'Yağmur Totemi', basePrice: 500 },
  { itemId: 'silk_ribbon', name: 'İpek Kurdele', basePrice: 500 }
]

/** Belirli bir günün gezgin tüccar günü olup olmadığını kontrol eder (Cuma / Pazar) */
export const isTravelingMerchantDay = (day: number): boolean => {
  const weekday = getWeekday(day)
  return weekday === 'fri' || weekday === 'sun'
}

/** Basit deterministik sahte rastgele sayı üreticisi */
const seededRandom = (seed: number): (() => number) => {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

/** Oyun tarihine göre gezgin tüccarın günlük stoğunu oluşturur */
export const generateMerchantStock = (year: number, seasonIndex: number, day: number, currentSeason: Season): TravelingMerchantStock[] => {
  const seed = year * 10000 + seasonIndex * 1000 + day * 37
  const rng = seededRandom(seed)

  const stock: TravelingMerchantStock[] = []

  // Genel havuzdan rastgele 3-4 eşya seç
  const shuffled = [...TRAVELING_MERCHANT_POOL].sort(() => rng() - 0.5)
  const generalCount = 3 + Math.floor(rng() * 2) // 3 veya 4
  for (let i = 0; i < Math.min(generalCount, shuffled.length); i++) {
    const item = shuffled[i]!
    const priceVariation = 0.85 + rng() * 0.3 // ±%15 fiyat dalgalanması
    let price = Math.floor(item.basePrice * priceVariation)
    // Suistimali önleme: tüccar satış fiyatı, eşyanın satış fiyatının 2 katından düşük olamaz
    const def = getItemById(item.itemId)
    if (def && def.sellPrice > 0) price = Math.max(price, def.sellPrice * 2)
    stock.push({
      itemId: item.itemId,
      name: item.name,
      price,
      quantity: 1 + Math.floor(rng() * 2) // 1-2 adet
    })
  }

  // Mevsim dışı ürünlerden 1-2 tohum seç
  const otherSeasonCrops = CROPS.filter(c => !c.season.includes(currentSeason) && c.seedPrice > 0)
  if (otherSeasonCrops.length > 0) {
    const shuffledCrops = [...otherSeasonCrops].sort(() => rng() - 0.5)
    const seedCount = 1 + Math.floor(rng() * 2) // 1 veya 2
    for (let i = 0; i < Math.min(seedCount, shuffledCrops.length); i++) {
      const crop = shuffledCrops[i]!
      stock.push({
        itemId: crop.seedId,
        name: `${crop.name} Tohumu`,
        price: Math.max(Math.floor(crop.seedPrice * 4), crop.sellPrice * 2), // Mevsim dışı için 4 kat fiyat, ayrıca ürün satış fiyatının 2 katından düşük olamaz
        quantity: 3 + Math.floor(rng() * 3) // 3-5 adet
      })
    }
  }

  return stock
}
