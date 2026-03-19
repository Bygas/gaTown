import type { WalletItemDef } from '@/types'

/** Cüzdan eşyası tanımları */
export const WALLET_ITEMS: WalletItemDef[] = [
  {
    id: 'merchant_seal',
    name: 'Tüccar Mührü',
    description: 'Mağazadaki alışveriş fiyatlarını %10 düşürür.',
    effect: { type: 'shopDiscount', value: 0.1 },
    unlockCondition: 'Toplam 10000 para kazan'
  },
  {
    id: 'herb_guide',
    name: 'Şifalı Ot Rehberi',
    description: 'Toplanan doğa ürünlerinin kalitesini 1 kademe artırır.',
    effect: { type: 'forageQuality', value: 1 },
    unlockCondition: 'Toplayıcılık seviyesi 8’e ulaş'
  },
  {
    id: 'miners_charm',
    name: 'Madenci Tılsımı',
    description: 'Madencilikte dayanıklılık tüketimini %15 azaltır.',
    effect: { type: 'miningStamina', value: 0.15 },
    unlockCondition: 'Madende 50. kata ulaş'
  },
  {
    id: 'anglers_token',
    name: 'Balıkçı Jetonu',
    description: 'Balık tutma mini oyununda balığın hareket hızını %10 azaltır.',
    effect: { type: 'fishingCalm', value: 0.1 },
    unlockCondition: '30 farklı balık türü yakala'
  },
  {
    id: 'chefs_hat',
    name: 'Aşçı Şapkası',
    description: 'Pişirilen yemeklerin yenileme etkisini %25 artırır.',
    effect: { type: 'cookingRestore', value: 0.25 },
    unlockCondition: '10 farklı tarif pişir'
  },
  {
    id: 'earth_totem',
    name: 'Toprak Totemi',
    description: 'Ürünlerin büyüme hızını %10 artırır.',
    effect: { type: 'cropGrowth', value: 0.1 },
    unlockCondition: '100 kez ürün hasat et'
  }
]

export const getWalletItemById = (id: string): WalletItemDef | undefined => {
  return WALLET_ITEMS.find(w => w.id === id)
}
