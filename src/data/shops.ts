import type { Weather, Season, Weekday } from '@/types'
import { getWeekday } from './timeConstants'

/** Dükkân tanımı */
export interface ShopDef {
  id: string
  name: string
  description: string
  npcName: string
  closedDays: Weekday[]
  openHour: number
  closeHour: number
  closedWeathers: Weather[]
  closedSeasons: Season[]
}

/** Altı büyük dükkân */
export const SHOPS: ShopDef[] = [
  {
    id: 'wanwupu',
    name: 'Genel Dükkân',
    description: 'Mustafa Amca’nın işlettiği dükkân; tohum ve günlük ihtiyaçlar satar.',
    npcName: 'Mustafa Amca',
    closedDays: ['wed'],
    openHour: 8,
    closeHour: 20,
    closedWeathers: [],
    closedSeasons: []
  },
  {
    id: 'tiejiangpu',
    name: 'Demirci',
    description: 'Demirci Kadir`in dükkânı; cevher ve metal ürünler satar.',
    npcName: 'Demirci Kadir',
    closedDays: ['sun'],
    openHour: 7,
    closeHour: 18,
    closedWeathers: [],
    closedSeasons: []
  },
  {
    id: 'biaoju',
    name: 'Muhafız Kervanı',
    description: 'Oğuzcan`ın işlettiği dükkân; silahlar ve savaş malzemeleri satar.',
    npcName: 'Oğuzcan',
    closedDays: [],
    openHour: 10,
    closeHour: 22,
    closedWeathers: ['stormy'],
    closedSeasons: []
  },
  {
    id: 'yugupu',
    name: 'Balıkçılık Dükkânı',
    description: 'Miray`ın küçük dükkânı; yem ve şamandıra satar.',
    npcName: 'Miray',
    closedDays: ['mon', 'tue'],
    openHour: 6,
    closeHour: 17,
    closedWeathers: ['stormy'],
    closedSeasons: []
  },
  {
    id: 'yaopu',
    name: 'Şifacı Dükkânı',
    description: 'İhtiyar Burhan`ın dükkânı; gübre ve şifalı otlar satar.',
    npcName: 'İhtiyar Burhan',
    closedDays: [],
    openHour: 8,
    closeHour: 20,
    closedWeathers: ['stormy'],
    closedSeasons: ['winter']
  },
  {
    id: 'chouduanzhuang',
    name: 'İpek Mağazası',
    description: 'Öykü`nün işlettiği mağaza; kumaş ve zarif hediyeler satar.',
    npcName: 'Öykü',
    closedDays: ['sat', 'sun'],
    openHour: 9,
    closeHour: 18,
    closedWeathers: [],
    closedSeasons: []
  }
]

/** ID’ye göre dükkân bul */
export const getShopById = (id: string): ShopDef | undefined => {
  return SHOPS.find(s => s.id === id)
}

/** Dükkânın açık olup olmadığını kontrol et */
export const isShopAvailable = (shop: ShopDef, day: number, hour: number, weather: Weather, season: Season): boolean => {
  const weekday = getWeekday(day)
  if (shop.closedDays.includes(weekday)) return false
  if (hour < shop.openHour || hour >= shop.closeHour) return false
  if (shop.closedWeathers.length > 0 && shop.closedWeathers.includes(weather)) return false
  if (shop.closedSeasons.length > 0 && shop.closedSeasons.includes(season)) return false
  return true
}

/** Dükkânın kapalı olma nedenini al */
export const getShopClosedReason = (shop: ShopDef, day: number, hour: number, weather: Weather, season: Season): string => {
  const weekday = getWeekday(day)
  if (shop.closedSeasons.length > 0 && shop.closedSeasons.includes(season)) {
    return 'Bu mevsimde kapalı'
  }
  if (shop.closedWeathers.length > 0 && shop.closedWeathers.includes(weather)) {
    return 'Hava koşulları nedeniyle kapalı'
  }
  if (shop.closedDays.includes(weekday)) {
    return 'Bugün kapalı'
  }
  if (hour < shop.openHour) {
    return `${shop.openHour}:00'da açılır`
  }
  if (hour >= shop.closeHour) {
    return 'Kapanmış'
  }
  return ''
}
