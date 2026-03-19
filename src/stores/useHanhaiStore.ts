import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  HANHAI_SHOP_ITEMS,
  MAX_DAILY_BETS,
  HANHAI_UNLOCK_COST,
  spinRoulette,
  rollDice,
  ROULETTE_BET_TIERS,
  DICE_BET_AMOUNT,
  CUP_BET_AMOUNT,
  CUP_WIN_MULTIPLIER,
  playCupRound,
  CRICKET_BET_AMOUNT,
  CRICKET_WIN_MULTIPLIER,
  fightCricket,
  CARD_BET_AMOUNT,
  CARD_WIN_MULTIPLIER,
  dealCards,
  getTexasTier,
  dealTexas,
  BUCKSHOT_BET_AMOUNT,
  BUCKSHOT_WIN_MULTIPLIER,
  BUCKSHOT_PLAYER_HP,
  BUCKSHOT_DEALER_HP,
  loadShotgun
} from '@/data/hanhai'
import { usePlayerStore } from './usePlayerStore'
import { useInventoryStore } from './useInventoryStore'
import { useGameStore } from './useGameStore'
import { addLog } from '@/composables/useGameLog'
import type { TexasSetup, TexasTierId, BuckshotSetup } from '@/types'

export const useHanhaiStore = defineStore('hanhai', () => {
  /** Hanhai kilidi açık mı */
  const unlocked = ref(false)
  /** Bugünkü kumar oynama sayısı */
  const casinoBetsToday = ref(0)
  /** Bu haftaki mağaza satın alma sayacı { itemId: count } */
  const weeklyPurchases = ref<Record<string, number>>({})

  const canBet = computed(() => casinoBetsToday.value < MAX_DAILY_BETS)
  const betsRemaining = computed(() => MAX_DAILY_BETS - casinoBetsToday.value)

  /** Hanhai'nin kilidini aç */
  const unlockHanhai = (): { success: boolean; message: string } => {
    if (unlocked.value) return { success: false, message: 'Hanhai zaten açık.' }
    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(HANHAI_UNLOCK_COST)) {
      return { success: false, message: `Yetersiz para (gerekli: ${HANHAI_UNLOCK_COST}).` }
    }
    unlocked.value = true
    addLog('Hanhai’ye giden ticaret yolu açıldı! Seni yeni maceralar bekliyor.')
    return { success: true, message: 'Hanhai ticaret yolu açıldı!' }
  }

  /** Bir ürünün bu hafta kalan satın alma hakkını sorgula */
  const getWeeklyRemaining = (itemId: string): number => {
    const item = HANHAI_SHOP_ITEMS.find(i => i.itemId === itemId)
    if (!item?.weeklyLimit) return Infinity
    return Math.max(0, item.weeklyLimit - (weeklyPurchases.value[itemId] ?? 0))
  }

  /** Kervansaray mağazasından ürün satın al */
  const buyShopItem = (itemId: string): { success: boolean; message: string } => {
    const item = HANHAI_SHOP_ITEMS.find(i => i.itemId === itemId)
    if (!item) return { success: false, message: 'Ürün bulunamadı.' }
    if (item.weeklyLimit && (weeklyPurchases.value[itemId] ?? 0) >= item.weeklyLimit) {
      return { success: false, message: `${item.name} için bu haftaki satın alma sınırına ulaşıldı.` }
    }
    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(item.price)) {
      return { success: false, message: 'Yetersiz para.' }
    }
    const inventoryStore = useInventoryStore()
    if (!inventoryStore.addItem(item.itemId, 1)) {
      playerStore.earnMoney(item.price)
      return { success: false, message: 'Envanter dolu, satın alma başarısız.' }
    }
    weeklyPurchases.value[itemId] = (weeklyPurchases.value[itemId] ?? 0) + 1
    return { success: true, message: `${item.name} satın alındı.` }
  }

  /** Hazine haritası kullanarak define ara */
  const useTreasureMap = (): { success: boolean; message: string; rewards: { name: string; quantity: number }[] } => {
    const inventoryStore = useInventoryStore()
    if (!inventoryStore.removeItem('hanhai_map')) {
      return { success: false, message: 'Hazine haritası yok.', rewards: [] }
    }
    const playerStore = usePlayerStore()
    // Rastgele ödül havuzu
    const roll = Math.random()
    const rewards: { itemId: string; name: string; quantity: number }[] = []
    if (roll < 0.05) {
      // %5 büyük ödül: para + nadir eşya
      playerStore.earnMoney(5000)
      rewards.push({ itemId: '', name: '5000 para', quantity: 1 })
      rewards.push({ itemId: 'hanhai_turquoise', name: 'Turkuaz', quantity: 2 })
      inventoryStore.addItem('hanhai_turquoise', 2)
    } else if (roll < 0.2) {
      // %15 orta ödül: para + malzeme
      playerStore.earnMoney(2000)
      rewards.push({ itemId: '', name: '2000 para', quantity: 1 })
      rewards.push({ itemId: 'hanhai_spice', name: 'Batı Diyarı Baharatı', quantity: 3 })
      inventoryStore.addItem('hanhai_spice', 3)
    } else if (roll < 0.45) {
      // %25 küçük ödül: para
      playerStore.earnMoney(1000)
      rewards.push({ itemId: '', name: '1000 para', quantity: 1 })
      rewards.push({ itemId: 'hanhai_silk', name: 'İpek', quantity: 1 })
      inventoryStore.addItem('hanhai_silk', 1)
    } else {
      // %55 teselli ödülü
      playerStore.earnMoney(500)
      rewards.push({ itemId: '', name: '500 para', quantity: 1 })
    }
    const rewardText = rewards.map(r => r.name + (r.quantity > 1 ? `×${r.quantity}` : '')).join('、')
    addLog(`Hazine haritası kullanıldı, bulunanlar: ${rewardText}!`)
    return { success: true, message: `Define avı başarılı! Kazanılanlar: ${rewardText}`, rewards }
  }

  /** Şans ruleti oyna */
  const playRoulette = (betTier: number): { success: boolean; message: string; multiplier: number; winnings: number } => {
    if (!canBet.value) return { success: false, message: 'Bugünkü kumar hakkı tükendi.', multiplier: 0, winnings: 0 }
    if (!ROULETTE_BET_TIERS.includes(betTier as (typeof ROULETTE_BET_TIERS)[number])) {
      return { success: false, message: 'Geçersiz bahis miktarı.', multiplier: 0, winnings: 0 }
    }
    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(betTier)) {
      return { success: false, message: 'Yetersiz para.', multiplier: 0, winnings: 0 }
    }
    casinoBetsToday.value++
    const outcome = spinRoulette()
    const winnings = Math.floor(betTier * outcome.multiplier)
    if (winnings > 0) {
      playerStore.earnMoney(winnings)
    }
    if (outcome.multiplier === 0) {
      addLog(`Rulet "${outcome.label}" üzerinde durdu, ${betTier} para kaybettin.`)
    } else {
      addLog(`Rulet "${outcome.label}" üzerinde durdu! ${winnings} para kazandın!`)
    }
    return { success: true, message: `Rulet "${outcome.label}" üzerinde durdu`, multiplier: outcome.multiplier, winnings }
  }

  /** Zar oyunu oyna (büyük / küçük tahmini) */
  const playDice = (
    guessBig: boolean
  ): { success: boolean; message: string; dice1: number; dice2: number; won: boolean; winnings: number } => {
    if (!canBet.value) return { success: false, message: 'Bugünkü kumar hakkı tükendi.', dice1: 0, dice2: 0, won: false, winnings: 0 }
    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(DICE_BET_AMOUNT)) {
      return { success: false, message: 'Yetersiz para.', dice1: 0, dice2: 0, won: false, winnings: 0 }
    }
    casinoBetsToday.value++
    const result = rollDice()
    const won = guessBig === result.isBig
    const winnings = won ? DICE_BET_AMOUNT * 2 : 0
    if (won) {
      playerStore.earnMoney(winnings)
    }
    const guessText = guessBig ? 'büyük' : 'küçük'
    const resultText = result.isBig ? 'büyük' : 'küçük'
    if (won) {
      addLog(`Zarlar ${result.dice1}+${result.dice2}=${result.total} (${resultText}), tahminin ${guessText} — ${winnings} para kazandın!`)
    } else {
      addLog(`Zarlar ${result.dice1}+${result.dice2}=${result.total} (${resultText}), tahminin ${guessText} — ${DICE_BET_AMOUNT} para kaybettin.`)
    }
    return { success: true, message: won ? 'Kazandın!' : 'Kaybettin…', dice1: result.dice1, dice2: result.dice2, won, winnings }
  }

  /** Bardak tahmin oyunu oyna */
  const playCup = (guess: number): { success: boolean; message: string; correctCup: number; won: boolean; winnings: number } => {
    if (!canBet.value) return { success: false, message: 'Bugünkü kumar hakkı tükendi.', correctCup: 0, won: false, winnings: 0 }
    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(CUP_BET_AMOUNT)) {
      return { success: false, message: 'Yetersiz para.', correctCup: 0, won: false, winnings: 0 }
    }
    casinoBetsToday.value++
    const result = playCupRound()
    const won = guess === result.correctCup
    const winnings = won ? Math.floor(CUP_BET_AMOUNT * CUP_WIN_MULTIPLIER) : 0
    if (won) {
      playerStore.earnMoney(winnings)
      addLog(`Bardak tahmininde ${guess + 1}. bardağı doğru bildin! ${winnings} para kazandın!`)
    } else {
      addLog(`Bardak tahmininde yanıldın, top ${result.correctCup + 1}. bardağın altındaydı, ${CUP_BET_AMOUNT} para kaybettin.`)
    }
    return { success: true, message: won ? 'Doğru bildin!' : 'Yanlış tahmin…', correctCup: result.correctCup, won, winnings }
  }

  /** Cırcır böceği dövüşü oyna */
  const playCricketFight = (
    cricketId: string
  ): { success: boolean; message: string; playerPower: number; opponentPower: number; won: boolean; draw: boolean; winnings: number } => {
    if (!canBet.value)
      return { success: false, message: 'Bugünkü kumar hakkı tükendi.', playerPower: 0, opponentPower: 0, won: false, draw: false, winnings: 0 }
    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(CRICKET_BET_AMOUNT)) {
      return { success: false, message: 'Yetersiz para.', playerPower: 0, opponentPower: 0, won: false, draw: false, winnings: 0 }
    }
    casinoBetsToday.value++
    const result = fightCricket()
    const won = result.playerPower > result.opponentPower
    const draw = result.playerPower === result.opponentPower
    const winnings = won ? Math.floor(CRICKET_BET_AMOUNT * CRICKET_WIN_MULTIPLIER) : draw ? CRICKET_BET_AMOUNT : 0
    if (won || draw) {
      playerStore.earnMoney(winnings)
    }
    if (won) {
      addLog(`Cırcır böceği dövüşü (${cricketId}): güç ${result.playerPower} - ${result.opponentPower}, ezici zafer! ${winnings} para kazandın!`)
    } else if (draw) {
      addLog(`Cırcır böceği dövüşü (${cricketId}): güç ${result.playerPower} - ${result.opponentPower}, beraberlik, ${CRICKET_BET_AMOUNT} para iade edildi.`)
    } else {
      addLog(`Cırcır böceği dövüşü (${cricketId}): güç ${result.playerPower} - ${result.opponentPower}, yenildin, ${CRICKET_BET_AMOUNT} para kaybettin.`)
    }
    return {
      success: true,
      message: won ? 'Kazandın!' : draw ? 'Berabere' : 'Kaybettin…',
      playerPower: result.playerPower,
      opponentPower: result.opponentPower,
      won,
      draw,
      winnings
    }
  }

  /** Kart çevirerek hazine bulma oyunu oyna */
  const playCardFlip = (pick: number): { success: boolean; message: string; treasures: number[]; won: boolean; winnings: number } => {
    if (!canBet.value) return { success: false, message: 'Bugünkü kumar hakkı tükendi.', treasures: [], won: false, winnings: 0 }
    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(CARD_BET_AMOUNT)) {
      return { success: false, message: 'Yetersiz para.', treasures: [], won: false, winnings: 0 }
    }
    casinoBetsToday.value++
    const result = dealCards()
    const won = result.treasures.includes(pick)
    const winnings = won ? Math.floor(CARD_BET_AMOUNT * CARD_WIN_MULTIPLIER) : 0
    if (won) {
      playerStore.earnMoney(winnings)
      addLog(`Kart çevirme oyununda hazine kartını buldun! ${winnings} para kazandın!`)
    } else {
      addLog(`Kart çevirme oyununda boş kart açtın, ${CARD_BET_AMOUNT} para kaybettin.`)
    }
    return { success: true, message: won ? 'Hazineyi buldun!' : 'Boş kart…', treasures: result.treasures, won, winnings }
  }

  /** Hanhai pokerini başlat (giriş ücreti + komisyon düşülür, kartlar dağıtılır) */
  const startTexas = (tierId: TexasTierId): { success: boolean; message: string } & Partial<TexasSetup> => {
    if (!canBet.value) return { success: false, message: 'Bugünkü kumar hakkı tükendi.' }
    const tier = getTexasTier(tierId)
    const playerStore = usePlayerStore()
    if (playerStore.money < tier.minMoney) {
      return { success: false, message: `Oyuna girmek için en az ${tier.minMoney} para gerekir.` }
    }
    const totalCost = tier.entryFee + tier.rake
    if (!playerStore.spendMoney(totalCost)) {
      return { success: false, message: 'Yetersiz para.' }
    }
    casinoBetsToday.value++
    const deal = dealTexas()
    return {
      success: true,
      message: `${tier.name} başladı!`,
      playerHole: deal.playerHole,
      dealerHole: deal.dealerHole,
      community: deal.community,
      tier
    }
  }

  /** Hanhai pokerini bitir (hesaplaşma: kalan fişler iade edilir) */
  const endTexas = (finalChips: number, tierName: string) => {
    const playerStore = usePlayerStore()
    if (finalChips > 0) {
      playerStore.earnMoney(finalChips)
    }
    addLog(`Hanhai Pokeri (${tierName}) sona erdi, ${finalChips} para değerinde fiş geri alındı.`)
  }

  /** Şeytan ruletini başlat (bahis alınır + başlangıç durumu oluşturulur) */
  const startBuckshot = (): { success: boolean; message: string } & Partial<BuckshotSetup> => {
    if (!canBet.value) return { success: false, message: 'Bugünkü kumar hakkı tükendi.' }
    const playerStore = usePlayerStore()
    if (!playerStore.spendMoney(BUCKSHOT_BET_AMOUNT)) {
      return { success: false, message: 'Yetersiz para.' }
    }
    casinoBetsToday.value++
    return {
      success: true,
      message: 'Şeytan ruleti başladı!',
      shells: loadShotgun(),
      playerHP: BUCKSHOT_PLAYER_HP,
      dealerHP: BUCKSHOT_DEALER_HP
    }
  }

  /** Şeytan ruleti sonuçlandır */
  const endBuckshot = (won: boolean, draw: boolean) => {
    const playerStore = usePlayerStore()
    if (won) {
      playerStore.earnMoney(BUCKSHOT_BET_AMOUNT * BUCKSHOT_WIN_MULTIPLIER)
      addLog(`Şeytan ruletinde zafer! ${BUCKSHOT_BET_AMOUNT * BUCKSHOT_WIN_MULTIPLIER} para kazandın!`)
    } else if (draw) {
      playerStore.earnMoney(BUCKSHOT_BET_AMOUNT)
      addLog(`Şeytan ruletinde beraberlik, ${BUCKSHOT_BET_AMOUNT} para iade edildi.`)
    } else {
      addLog(`Şeytan ruletinde yenildin, ${BUCKSHOT_BET_AMOUNT} para kaybettin.`)
    }
  }

  /** Günlük kumar sayısını sıfırla, haftalık mağaza limitlerini yenile */
  const resetDailyBets = () => {
    casinoBetsToday.value = 0
    // Haftalık mağaza limiti sıfırlanır (7, 14, 21, 28. gün)
    const gameStore = useGameStore()
    if (gameStore.day % 7 === 0) {
      weeklyPurchases.value = {}
    }
  }

  const serialize = () => ({
    unlocked: unlocked.value,
    casinoBetsToday: casinoBetsToday.value,
    weeklyPurchases: weeklyPurchases.value
  })

  const deserialize = (data: any) => {
    unlocked.value = data.unlocked ?? false
    casinoBetsToday.value = data.casinoBetsToday ?? 0
    weeklyPurchases.value = data.weeklyPurchases ?? {}
  }

  return {
    unlocked,
    casinoBetsToday,
    weeklyPurchases,
    canBet,
    betsRemaining,
    unlockHanhai,
    getWeeklyRemaining,
    buyShopItem,
    useTreasureMap,
    playRoulette,
    playDice,
    playCup,
    playCricketFight,
    playCardFlip,
    startTexas,
    endTexas,
    startBuckshot,
    endBuckshot,
    resetDailyBets,
    serialize,
    deserialize
  }
})
