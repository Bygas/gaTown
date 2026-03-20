import type { WalletItemDef } from '@/types'

/** Cüzdan eşyası tanımları */
export const WALLET_ITEMS: WalletItemDef[] = [
  {
    id: 'merchant_seal',
    name: 'Esnaf Mührü',
    description: 'Dükkândaki alışverişlerde fiyatı %10 aşağı çeker.',
    effect: { type: 'shopDiscount', value: 0.1 },
    unlockCondition: 'Toplam 10000 akçe kazan'
  },
  {
    id: 'herb_guide',
    name: 'Otacı Defteri',
    description: 'Toplanan kır ürünlerinin kalitesini 1 kademe artırır.',
    effect: { type: 'forageQuality', value: 1 },
    unlockCondition: 'Toplayıcılık seviyesini 8’e çıkar'
  },
  {
    id: 'miners_charm',
    name: 'Madenci Muskası',
    description: 'Madende harcanan dayanıklılığı %15 azaltır.',
    effect: { type: 'miningStamina', value: 0.15 },
    unlockCondition: 'Madende 50. kata in'
  },
  {
    id: 'anglers_token',
    name: 'Olta Uğuru',
    description: 'Balık tutma mini oyununda balığın hareket hızını %10 düşürür.',
    effect: { type: 'fishingCalm', value: 0.1 },
    unlockCondition: '30 farklı balık türü yakala'
  },
  {
    id: 'chefs_hat',
    name: 'Aşçı Kavuğu',
    description: 'Pişen yemeklerin can ve güç toparlama etkisini %25 artırır.',
    effect: { type: 'cookingRestore', value: 0.25 },
    unlockCondition: '10 farklı yemek tarifi pişir'
  },
  {
    id: 'earth_totem',
    name: 'Bereket Tılsımı',
    description: 'Ekinlerin büyüme hızını %10 artırır.',
    effect: { type: 'cropGrowth', value: 0.1 },
    unlockCondition: '100 kez hasat yap'
  }
]

export const getWalletItemById = (id: string): WalletItemDef | undefined => {
  return WALLET_ITEMS.find(w => w.id === id)
}
