/** Sabah öğüdü tanımı */
export interface MorningTipDef {
  id: string
  priority: number
  conditionKey: string
  message: string
}

/**
 * Öncelik sırasına göre dizilmiş 18 sabah öğüdü.
 * conditionKey, useEndDay içindeki sabah öğüdü mantığında gerçek kontrol fonksiyonuna bağlanır.
 */
export const MORNING_TIPS: MorningTipDef[] = [
  {
    id: 'tip_welcome',
    priority: 1,
    conditionKey: 'earlyFirstDay',
    message: 'Muhtar Mehmet: "Köyümüze hoş geldin evlat! Çantanda lahana tohumu var. Tarla kısmından önce toprağı belle, sonra ekimini yap."'
  },
  {
    id: 'tip_first_till',
    priority: 2,
    conditionKey: 'allWasteland',
    message: 'Muhtar Mehmet: "Tarlaya başlamadan önce toprağı sürmen gerek. Tarla kısmında ‘Toplu İşlem’ → ‘Hepsini Sür’ yolunu kullan."'
  },
  {
    id: 'tip_first_plant',
    priority: 3,
    conditionKey: 'tilledNoPlanted',
    message: 'Muhtar Mehmet: "Toprak hazırsa sıra ekimde. ‘Toplu Ekim’ ile tohumları bir çırpıda serebilirsin."'
  },
  {
    id: 'tip_first_water',
    priority: 4,
    conditionKey: 'plantedUnwatered',
    message: 'Muhtar Mehmet: "Ekimden sonra suyu unutma. Su vermezsen mahsul büyümez. ‘Toplu Sulama’yı bir dene."'
  },
  {
    id: 'tip_first_harvest',
    priority: 5,
    conditionKey: 'hasHarvestable',
    message: 'Muhtar Mehmet: "Mahsulün olmuş! Tarla kısmından hasadını yap. Altın sarısı görünen yerler toplanmaya hazır demektir."'
  },
  {
    id: 'tip_sell_crops',
    priority: 6,
    conditionKey: 'harvestedNeverSold',
    message: 'Muhtar Mehmet: "Topladıklarını tarla kısmının altındaki sevkiyat sandığına bırak, ertesi sabah akçeye döner."'
  },
  {
    id: 'tip_check_weather',
    priority: 7,
    conditionKey: 'earlyGame',
    message: 'Muhtar Mehmet: "Her sabah havaya bir göz at. İşini planlı yaparsan elin daha da rahatlar."'
  },
  {
    id: 'tip_stamina',
    priority: 8,
    conditionKey: 'staminaWasLow',
    message: 'Muhtar Mehmet: "Takatin düşerse erkenden dinlen. Geç yatarsan ertesi gün elin ayağın tutmaz. Karnını doyurmak da güç toplatır."'
  },
  {
    id: 'tip_visit_shop',
    priority: 9,
    conditionKey: 'neverVisitedShop',
    message: 'Muhtar Mehmet: "Çarşıda türlü tohum, takım taklavat bulunur. Bir uğrayıp bak derim."'
  },
  {
    id: 'tip_try_fishing',
    priority: 10,
    conditionKey: 'neverFished',
    message: 'Muhtar Mehmet: "Köyün doğusundaki dere balık kaynıyor. Oltanı kap da bir şansını dene."'
  },
  {
    id: 'tip_try_mining',
    priority: 11,
    conditionKey: 'neverMined',
    message: 'Muhtar Mehmet: "Köyün kuzeyindeki madende cevher de çıkar, hazine de. Amma velakin canavarlara karşı gözünü dört aç."'
  },
  {
    id: 'tip_talk_npc',
    priority: 12,
    conditionKey: 'neverTalkedNpc',
    message: 'Muhtar Mehmet: "Komşularla iki çift laf et, gönüllerini almak için arada bir hediye de ver. Muhabbet böyle kurulur."'
  },
  {
    id: 'tip_quest_board',
    priority: 13,
    conditionKey: 'neverCheckedQuests',
    message: 'Muhtar Mehmet: "İlan tahtasında köylünün isteği eksik olmaz. Yardım edersen hem akçe kazanırsın hem adın duyulur."'
  },
  {
    id: 'tip_try_cooking',
    priority: 14,
    conditionKey: 'neverCooked',
    message: 'Muhtar Mehmet: "Tarif öğrendikçe tencere kaynatırsın. Yemek adamı diri tutar. Ocağı bir dene bakalım."'
  },
  {
    id: 'tip_rain',
    priority: 15,
    conditionKey: 'firstRainyDay',
    message: 'Muhtar Mehmet: "Yağmur yağınca ekin kendi kendine sulanır. Sen de o vakti başka işlere ayırırsın."'
  },
  {
    id: 'tip_season_change',
    priority: 16,
    conditionKey: 'justChangedSeason',
    message: 'Muhtar Mehmet: "Mevsim döndü! Her mevsimin mahsulü ayrıdır. Çarşıya uğra da yeni tohumlara bir bak."'
  },
  {
    id: 'tip_sprinkler',
    priority: 17,
    conditionKey: 'hasCropNoSprinkler',
    message: 'Muhtar Mehmet: "Tarla büyüdükçe su işi zorlaşır. Atölyede ya da demircide sulama düzeneği yaptırabilirsin."'
  },
  {
    id: 'tip_try_animal',
    priority: 18,
    conditionKey: 'neverHadAnimal',
    message: 'Muhtar Mehmet: "Tavuk, inek gibi hayvan da beslemeyi düşün. Önce bir kümes ya da ahır kurman gerekir."'
  }
]
