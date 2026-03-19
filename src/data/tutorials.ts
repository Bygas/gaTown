/** Sabah ipucu tanımı */
export interface MorningTipDef {
  id: string
  priority: number
  conditionKey: string
  message: string
}

/**
 * 18 adet sabah ipucu, önceliğe göre sıralanmıştır.
 * conditionKey, useEndDay içindeki sabah ipucu mantığında gerçek kontrol fonksiyonuna eşlenir.
 */
export const MORNING_TIPS: MorningTipDef[] = [
  {
    id: 'tip_welcome',
    priority: 1,
    conditionKey: 'earlyFirstDay',
    message: 'Köy muhtarı Gökhan: "Taoyuan’a hoş geldin! Çantanda lahana tohumları var. Tarla panelinden toprağı sürüp ekim yapabilirsin."'
  },
  {
    id: 'tip_first_till',
    priority: 2,
    conditionKey: 'allWasteland',
    message: 'Köy muhtarı Gökhan: "Tarlayı önce sürmen gerekir. Tarla panelinde ‘Toplu İşlem’ → ‘Hepsini Sür’ seçeneğini kullan."'
  },
  {
    id: 'tip_first_plant',
    priority: 3,
    conditionKey: 'tilledNoPlanted',
    message: 'Köy muhtarı Gökhan: "Toprak hazır, şimdi ekim zamanı! ‘Toplu Ekim’ ile hızlıca tohum ekebilirsin."'
  },
  {
    id: 'tip_first_water',
    priority: 4,
    conditionKey: 'plantedUnwatered',
    message: 'Köy muhtarı Gökhan: "Ektikten sonra sulamayı unutma. Sulamazsan ürünler büyümez. ‘Toplu Sulama’yı dene."'
  },
  {
    id: 'tip_first_harvest',
    priority: 5,
    conditionKey: 'hasHarvestable',
    message: 'Köy muhtarı Gökhan: "Ürünlerin hazır! Tarla panelinden hasat et. Altın renkli alanlar hasat edilebilir demektir."'
  },
  {
    id: 'tip_sell_crops',
    priority: 6,
    conditionKey: 'harvestedNeverSold',
    message: 'Köy muhtarı Gökhan: "Hasat ettiklerini tarla panelinin altındaki sevkiyat kutusuna koy, ertesi gün paraya dönüşür."'
  },
  {
    id: 'tip_check_weather',
    priority: 7,
    conditionKey: 'earlyGame',
    message: 'Köy muhtarı Gökhan: "Her gün hava durumuna bak. Planlı çalışırsan işlerin çok daha kolay olur."'
  },
  {
    id: 'tip_stamina',
    priority: 8,
    conditionKey: 'staminaWasLow',
    message: 'Köy muhtarı Gökhan: "Enerjin azalırsa erken dinlen. Geç yatmak ertesi günü etkiler. Yemek yemek de enerji kazandırır."'
  },
  {
    id: 'tip_visit_shop',
    priority: 9,
    conditionKey: 'neverVisitedShop',
    message: 'Köy muhtarı Gökhan: "Çarşıda birçok tohum ve eşya bulabilirsin. Bir uğra derim."'
  },
  {
    id: 'tip_try_fishing',
    priority: 10,
    conditionKey: 'neverFished',
    message: 'Köy muhtarı Gökhan: "Köyün doğusundaki dere balık dolu. Oltanı alıp balık tutmayı dene."'
  },
  {
    id: 'tip_try_mining',
    priority: 11,
    conditionKey: 'neverMined',
    message: 'Köy muhtarı Gökhan: "Köyün kuzeyindeki madende cevher ve hazineler var, ama canavarlara dikkat et."'
  },
  {
    id: 'tip_talk_npc',
    priority: 12,
    conditionKey: 'neverTalkedNpc',
    message: 'Köy muhtarı Gökhan: "Komşularla sohbet et, hatta hediye ver. İlişkiler böyle gelişir."'
  },
  {
    id: 'tip_quest_board',
    priority: 13,
    conditionKey: 'neverCheckedQuests',
    message: 'Köy muhtarı Gökhan: "Duyuru panosunda köylülerin istekleri var. Yardım edersen hem para hem saygınlık kazanırsın."'
  },
  {
    id: 'tip_try_cooking',
    priority: 14,
    conditionKey: 'neverCooked',
    message: 'Köy muhtarı Gökhan: "Tarif öğrendikçe yemek yapabilirsin. Yemekler enerji verir. Ocağı dene."'
  },
  {
    id: 'tip_rain',
    priority: 15,
    conditionKey: 'firstRainyDay',
    message: 'Köy muhtarı Gökhan: "Yağmurda ürünler otomatik sulanır. Bu fırsatı başka işler için kullan."'
  },
  {
    id: 'tip_season_change',
    priority: 16,
    conditionKey: 'justChangedSeason',
    message: 'Köy muhtarı Gökhan: "Mevsim değişti! Her mevsimde farklı ürünler yetişir. Çarşıya gidip yeni tohumlara bak."'
  },
  {
    id: 'tip_sprinkler',
    priority: 17,
    conditionKey: 'hasCropNoSprinkler',
    message: 'Köy muhtarı Gökhan: "Tarla büyüdükçe sulamak zorlaşır. Atölyede veya demircide sulama sistemi yapabilirsin."'
  },
  {
    id: 'tip_try_animal',
    priority: 18,
    conditionKey: 'neverHadAnimal',
    message: 'Köy muhtarı Gökhan: "Tavuk, inek gibi hayvanlar yetiştirmeyi dene. Önce bir kümes ya da ahır inşa et."'
  }
]
