import type { ProcessingMachineDef, ProcessingRecipeDef, SprinklerDef, FertilizerDef, BaitDef, TackleDef, BombDef } from '@/types'

/** İşleme makineleri tanımları */
export const PROCESSING_MACHINES: ProcessingMachineDef[] = [
  {
    id: 'wine_workshop',
    name: 'Şaraphane',
    description: 'Meyve ve mahsulleri şaraba dönüştürür, satış fiyatını üçe katlar.',
    craftCost: [
      { itemId: 'wood', quantity: 30 },
      { itemId: 'copper_ore', quantity: 5 },
      { itemId: 'iron_ore', quantity: 3 }
    ],
    craftMoney: 300
  },
  {
    id: 'sauce_jar',
    name: 'Turşu Küpü',
    description: 'Mahsulleri turşu ve reçele dönüştürür, değerini istikrarlı biçimde artırır.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'copper_ore', quantity: 8 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 200
  },
  {
    id: 'bee_house',
    name: 'Arı Kovanı',
    description: 'Her 4 günde bir otomatik olarak bal üretir.',
    craftCost: [
      { itemId: 'wood', quantity: 40 },
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'bamboo', quantity: 10 }
    ],
    craftMoney: 250
  },
  {
    id: 'oil_press',
    name: 'Yağ Presi',
    description: 'Susam veya tohumlardan yemeklik yağ çıkarır.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'gold_ore', quantity: 1 }
    ],
    craftMoney: 350
  },
  {
    id: 'mayo_maker',
    name: 'Mayonez Makinesi',
    description: 'Tavuk ya da ördek yumurtasından mayonez yapar.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'copper_ore', quantity: 5 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 200
  },
  {
    id: 'seed_maker',
    name: 'Tohum Makinesi',
    description: 'Olgun mahsulleri tohuma dönüştürür.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'gold_ore', quantity: 2 }
    ],
    craftMoney: 500
  },
  {
    id: 'crystal_duplicator',
    name: 'Kristal Kopyalayıcı',
    description: 'İçine değerli taş koyunca yavaşça kopyalar ve iki kat ürün verir.',
    craftCost: [
      { itemId: 'gold_ore', quantity: 5 },
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'quartz', quantity: 2 }
    ],
    craftMoney: 500
  },
  {
    id: 'smoker',
    name: 'Tütsüleme Makinesi',
    description: 'Balıkları tütsüler, satış fiyatını ikiye katlar.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'firewood', quantity: 5 }
    ],
    craftMoney: 300
  },
  {
    id: 'dehydrator',
    name: 'Kurutucu',
    description: 'Mantar ya da meyveleri kurutarak saklar ve daha değerli hâle getirir.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'firewood', quantity: 10 }
    ],
    craftMoney: 200
  },
  {
    id: 'recycler',
    name: 'Geri Dönüşüm Makinesi',
    description: 'Çöpleri işe yarar malzemelere dönüştürür.',
    craftCost: [
      { itemId: 'wood', quantity: 25 },
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'copper_ore', quantity: 5 }
    ],
    craftMoney: 150
  },
  {
    id: 'cheese_press',
    name: 'Peynir Presi',
    description: 'Sütü leziz peynire dönüştürür.',
    craftCost: [
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'wood', quantity: 15 },
      { itemId: 'copper_ore', quantity: 3 }
    ],
    craftMoney: 400
  },
  {
    id: 'loom',
    name: 'Dokuma Tezgâhı',
    description: 'Yün ve ipeği kumaşa dönüştürür.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'bamboo', quantity: 10 }
    ],
    craftMoney: 300
  },
  {
    id: 'furnace',
    name: 'Fırın',
    description: 'Cevheri metal külçeye dönüştürür. Tamamlanınca otomatik toplar.',
    craftCost: [
      { itemId: 'copper_ore', quantity: 10 },
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'quartz', quantity: 2 }
    ],
    craftMoney: 500,
    autoCollect: true
  },
  {
    id: 'charcoal_kiln',
    name: 'Kömür Ocağı',
    description: 'Odunu odun kömürüne dönüştürür.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'copper_ore', quantity: 3 },
      { itemId: 'firewood', quantity: 10 }
    ],
    craftMoney: 150
  },
  {
    id: 'mill',
    name: 'Değirmen',
    description: 'Tahılları una çevirir.',
    craftCost: [
      { itemId: 'wood', quantity: 25 },
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 350
  },
  {
    id: 'worm_bin',
    name: 'Solucan Kutusu',
    description: 'Her 2 günde bir otomatik yem üretir.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'herb', quantity: 5 },
      { itemId: 'firewood', quantity: 5 }
    ],
    craftMoney: 200
  },
  {
    id: 'tea_maker',
    name: 'Çay Makinesi',
    description: 'Çay yaprağı ve çiçeklerden içecek hazırlar.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'bamboo', quantity: 5 }
    ],
    craftMoney: 250
  },
  {
    id: 'tofu_press',
    name: 'Tofu Presi',
    description: 'Bakliyatları tofu ve ezmeye dönüştürür.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 300
  },
  {
    id: 'herb_grinder',
    name: 'Bitki Öğütücüsü',
    description: 'Şifalı otları merhem ve özlere dönüştürür.',
    craftCost: [
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'quartz', quantity: 2 },
      { itemId: 'gold_ore', quantity: 1 }
    ],
    craftMoney: 400
  },
  {
    id: 'incense_maker',
    name: 'Tütsü Atölyesi',
    description: 'Reçine ve çiçeklerden tütsü yapar.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'bamboo', quantity: 10 },
      { itemId: 'firewood', quantity: 5 }
    ],
    craftMoney: 200
  }
]

/** İşleme tarifleri */
export const PROCESSING_RECIPES: ProcessingRecipeDef[] = [
  // Şaraphane
  {
    id: 'wine_watermelon',
    machineType: 'wine_workshop',
    name: 'Karpuz Şarabı',
    inputItemId: 'watermelon',
    inputQuantity: 1,
    outputItemId: 'watermelon_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Tatlı karpuzdan yapılmış nefis bir şarap.'
  },
  {
    id: 'wine_osmanthus',
    machineType: 'wine_workshop',
    name: 'Osmanthus Şarabı',
    inputItemId: 'osmanthus',
    inputQuantity: 1,
    outputItemId: 'osmanthus_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Yoğun kokulu osmanthus çiçeği şarabı.'
  },
  {
    id: 'vinegar_rice',
    machineType: 'wine_workshop',
    name: 'Pirinç Sirkesi',
    inputItemId: 'rice',
    inputQuantity: 2,
    outputItemId: 'rice_vinegar',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Ev yapımı yıllanmış pirinç sirkesi.'
  },

  // Turşu Küpü
  {
    id: 'pickle_cabbage',
    machineType: 'sauce_jar',
    name: 'Lahana Turşusu',
    inputItemId: 'cabbage',
    inputQuantity: 2,
    outputItemId: 'pickled_cabbage',
    outputQuantity: 1,
    processingDays: 2,
    description: 'İştah açıcı lahana turşusu.'
  },
  {
    id: 'pickle_radish',
    machineType: 'sauce_jar',
    name: 'Kurutulmuş Turp',
    inputItemId: 'radish',
    inputQuantity: 2,
    outputItemId: 'dried_radish',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Gevrek kurutulmuş turp.'
  },
  {
    id: 'preserve_pumpkin',
    machineType: 'sauce_jar',
    name: 'Balkabağı Reçeli',
    inputItemId: 'pumpkin',
    inputQuantity: 1,
    outputItemId: 'pumpkin_preserve',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Yoğun kıvamlı balkabağı reçeli.'
  },

  // Arı Kovanı
  {
    id: 'honey',
    machineType: 'bee_house',
    name: 'Bal',
    inputItemId: null,
    inputQuantity: 0,
    outputItemId: 'honey',
    outputQuantity: 1,
    processingDays: 4,
    description: 'Altın renkli, tatlı bal.'
  },
  {
    id: 'honey_chrysanthemum',
    machineType: 'bee_house',
    name: 'Kasımpatı Balı',
    inputItemId: 'chrysanthemum',
    inputQuantity: 1,
    outputItemId: 'chrysanthemum_honey',
    outputQuantity: 1,
    processingDays: 4,
    description: 'Kasımpatı kokulu bal.'
  },
  {
    id: 'honey_osmanthus',
    machineType: 'bee_house',
    name: 'Osmanthus Balı',
    inputItemId: 'osmanthus',
    inputQuantity: 1,
    outputItemId: 'osmanthus_honey',
    outputQuantity: 1,
    processingDays: 4,
    description: 'Mis kokulu osmanthus balı.'
  },
  {
    id: 'honey_rapeseed',
    machineType: 'bee_house',
    name: 'Kanola Çiçeği Balı',
    inputItemId: 'rapeseed',
    inputQuantity: 1,
    outputItemId: 'rapeseed_honey',
    outputQuantity: 1,
    processingDays: 4,
    description: 'Hafif tatlı kanola balı.'
  },
  {
    id: 'honey_snow_lotus',
    machineType: 'bee_house',
    name: 'Kardelen Lotus Balı',
    inputItemId: 'snow_lotus',
    inputQuantity: 1,
    outputItemId: 'snow_lotus_honey',
    outputQuantity: 1,
    processingDays: 4,
    description: 'Nadir kar lotusu balı.'
  },

  // Yağ Presi
  {
    id: 'sesame_oil',
    machineType: 'oil_press',
    name: 'Susam Yağı',
    inputItemId: 'sesame',
    inputQuantity: 3,
    outputItemId: 'sesame_oil',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Yoğun aromalı susam yağı.'
  },
  {
    id: 'tea_oil',
    machineType: 'oil_press',
    name: 'Çay Yağı',
    inputItemId: 'tea',
    inputQuantity: 2,
    outputItemId: 'tea_oil',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Değerli çay tohumu yağı.'
  },
  {
    id: 'truffle_oil',
    machineType: 'oil_press',
    name: 'Trüf Yağı',
    inputItemId: 'truffle',
    inputQuantity: 1,
    outputItemId: 'truffle_oil',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Nadir ve değerli trüf yağı.'
  },

  // Yeni: Şaraphane tarifleri
  {
    id: 'wine_peach',
    machineType: 'wine_workshop',
    name: 'Şeftali Şarabı',
    inputItemId: 'peach',
    inputQuantity: 1,
    outputItemId: 'peach_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Hafif ve tatlı şeftali şarabı.'
  },
  {
    id: 'wine_jujube',
    machineType: 'wine_workshop',
    name: 'Hünnap Şarabı',
    inputItemId: 'jujube',
    inputQuantity: 1,
    outputItemId: 'jujube_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Besleyici ve yoğun hünnap şarabı.'
  },
  {
    id: 'wine_corn',
    machineType: 'wine_workshop',
    name: 'Mısır Şarabı',
    inputItemId: 'corn',
    inputQuantity: 2,
    outputItemId: 'corn_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Hafif aromalı mısır şarabı.'
  },

  // Yeni: Turşu Küpü tarifleri
  {
    id: 'pickle_chili',
    machineType: 'sauce_jar',
    name: 'Acı Biber Turşusu',
    inputItemId: 'chili',
    inputQuantity: 2,
    outputItemId: 'pickled_chili',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Ekşi ve iştah açıcı biber turşusu.'
  },
  {
    id: 'pickle_ginger',
    machineType: 'sauce_jar',
    name: 'Zencefil Turşusu',
    inputItemId: 'ginger',
    inputQuantity: 2,
    outputItemId: 'pickled_ginger',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Tatlı-ekşi ve gevrek zencefil turşusu.'
  },

  // Mayonez Makinesi
  {
    id: 'mayo_egg',
    machineType: 'mayo_maker',
    name: 'Mayonez',
    inputItemId: 'egg',
    inputQuantity: 1,
    outputItemId: 'mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Tavuk yumurtasından yapılan yoğun mayonez.'
  },
  {
    id: 'mayo_duck_egg',
    machineType: 'mayo_maker',
    name: 'Ördek Yumurtası Mayonezi',
    inputItemId: 'duck_egg',
    inputQuantity: 1,
    outputItemId: 'duck_mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Ördek yumurtasından yapılan özel mayonez.'
  },
  {
    id: 'mayo_goose_egg',
    machineType: 'mayo_maker',
    name: 'Kaz Yumurtası Mayonezi',
    inputItemId: 'goose_egg',
    inputQuantity: 1,
    outputItemId: 'goose_mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Kaz yumurtasından yapılan koyu kıvamlı mayonez.'
  },
  {
    id: 'mayo_silkie_egg',
    machineType: 'mayo_maker',
    name: 'Süs Tavuğu Yumurtası Mayonezi',
    inputItemId: 'silkie_egg',
    inputQuantity: 1,
    outputItemId: 'silkie_mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Süs tavuğu yumurtasından yapılan besleyici mayonez.'
  },
  {
    id: 'mayo_ostrich_egg',
    machineType: 'mayo_maker',
    name: 'Devekuşu Yumurtası Mayonezi',
    inputItemId: 'ostrich_egg',
    inputQuantity: 1,
    outputItemId: 'ostrich_mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Devekuşu yumurtasından yapılan büyük boy mayonez.'
  },
  {
    id: 'mayo_quail_egg',
    machineType: 'mayo_maker',
    name: 'Bıldırcın Yumurtası Mayonezi',
    inputItemId: 'quail_egg',
    inputQuantity: 3,
    outputItemId: 'quail_mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Bıldırcın yumurtasından yapılan zarif mayonez.'
  },

  // Tohum Makinesi
  {
    id: 'seed_from_cabbage',
    machineType: 'seed_maker',
    name: 'Lahana Tohumu',
    inputItemId: 'cabbage',
    inputQuantity: 1,
    outputItemId: 'seed_cabbage',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Lahanadan tohum elde edilir.'
  },
  {
    id: 'seed_from_radish',
    machineType: 'seed_maker',
    name: 'Turp Tohumu',
    inputItemId: 'radish',
    inputQuantity: 1,
    outputItemId: 'seed_radish',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Turptan tohum elde edilir.'
  },
  {
    id: 'seed_from_potato',
    machineType: 'seed_maker',
    name: 'Patates Tohumu',
    inputItemId: 'potato',
    inputQuantity: 1,
    outputItemId: 'seed_potato',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Patatesten tohum elde edilir.'
  },
  {
    id: 'seed_from_tea',
    machineType: 'seed_maker',
    name: 'Çay Fidesi Tohumu',
    inputItemId: 'tea',
    inputQuantity: 1,
    outputItemId: 'seed_tea',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Çay fidesinden tohum elde edilir.'
  },
  {
    id: 'seed_from_watermelon',
    machineType: 'seed_maker',
    name: 'Karpuz Tohumu',
    inputItemId: 'watermelon',
    inputQuantity: 1,
    outputItemId: 'seed_watermelon',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Karpuzdan tohum elde edilir.'
  },
  {
    id: 'seed_from_rice',
    machineType: 'seed_maker',
    name: 'Pirinç Tohumu',
    inputItemId: 'rice',
    inputQuantity: 1,
    outputItemId: 'seed_rice',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Pirinçten tohum elde edilir.'
  },
  {
    id: 'seed_from_lotus_root',
    machineType: 'seed_maker',
    name: 'Lotus Kökü Tohumu',
    inputItemId: 'lotus_root',
    inputQuantity: 1,
    outputItemId: 'seed_lotus_root',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Lotus kökünden tohum elde edilir.'
  },
  {
    id: 'seed_from_sesame',
    machineType: 'seed_maker',
    name: 'Susam Tohumu',
    inputItemId: 'sesame',
    inputQuantity: 1,
    outputItemId: 'seed_sesame',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Susamdan tohum elde edilir.'
  },
  {
    id: 'seed_from_pumpkin',
    machineType: 'seed_maker',
    name: 'Balkabağı Tohumu',
    inputItemId: 'pumpkin',
    inputQuantity: 1,
    outputItemId: 'seed_pumpkin',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Balkabağından tohum elde edilir.'
  },
  {
    id: 'seed_from_sweet_potato',
    machineType: 'seed_maker',
    name: 'Tatlı Patates Tohumu',
    inputItemId: 'sweet_potato',
    inputQuantity: 1,
    outputItemId: 'seed_sweet_potato',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Tatlı patatesten tohum elde edilir.'
  },
  {
    id: 'seed_from_chrysanthemum',
    machineType: 'seed_maker',
    name: 'Kasımpatı Tohumu',
    inputItemId: 'chrysanthemum',
    inputQuantity: 1,
    outputItemId: 'seed_chrysanthemum',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Kasımpatıdan tohum elde edilir.'
  },
  {
    id: 'seed_from_osmanthus',
    machineType: 'seed_maker',
    name: 'Osmanthus Tohumu',
    inputItemId: 'osmanthus',
    inputQuantity: 1,
    outputItemId: 'seed_osmanthus',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Osmanthus çiçeğinden tohum elde edilir.'
  },
  {
    id: 'seed_from_bamboo_shoot',
    machineType: 'seed_maker',
    name: 'Bambu Filizi Tohumu',
    inputItemId: 'bamboo_shoot',
    inputQuantity: 1,
    outputItemId: 'seed_bamboo_shoot',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Bambu filizinden tohum elde edilir.'
  },
  {
    id: 'seed_from_persimmon',
    machineType: 'seed_maker',
    name: 'Trabzon Hurması Tohumu',
    inputItemId: 'persimmon',
    inputQuantity: 1,
    outputItemId: 'seed_persimmon',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Trabzon hurmasından tohum elde edilir.'
  },
  {
    id: 'seed_from_winter_wheat',
    machineType: 'seed_maker',
    name: 'Kışlık Buğday Tohumu',
    inputItemId: 'winter_wheat',
    inputQuantity: 1,
    outputItemId: 'seed_winter_wheat',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Kış buğdayından tohum elde edilir.'
  },
  {
    id: 'seed_from_garlic',
    machineType: 'seed_maker',
    name: 'Sarımsak Tohumu',
    inputItemId: 'garlic',
    inputQuantity: 1,
    outputItemId: 'seed_garlic',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Sarımsaktan tohum elde edilir.'
  },
  {
    id: 'seed_from_snow_lotus',
    machineType: 'seed_maker',
    name: 'Kar Lotusu Tohumu',
    inputItemId: 'snow_lotus',
    inputQuantity: 1,
    outputItemId: 'seed_snow_lotus',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Kar lotusundan tohum elde edilir.'
  },
  {
    id: 'seed_from_rapeseed',
    machineType: 'seed_maker',
    name: 'Kanola Tohumu',
    inputItemId: 'rapeseed',
    inputQuantity: 1,
    outputItemId: 'seed_rapeseed',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Kanoladan tohum elde edilir.'
  },
  {
    id: 'seed_from_broad_bean',
    machineType: 'seed_maker',
    name: 'Bakla Tohumu',
    inputItemId: 'broad_bean',
    inputQuantity: 1,
    outputItemId: 'seed_broad_bean',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Bakladan tohum elde edilir.'
  },
  {
    id: 'seed_from_peach',
    machineType: 'seed_maker',
    name: 'Şeftali Tohumu',
    inputItemId: 'peach',
    inputQuantity: 1,
    outputItemId: 'seed_peach',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Şeftaliden tohum elde edilir.'
  },
  {
    id: 'seed_from_green_bean',
    machineType: 'seed_maker',
    name: 'Fasulye Tohumu',
    inputItemId: 'green_bean',
    inputQuantity: 1,
    outputItemId: 'seed_green_bean',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Taze fasulyeden tohum elde edilir.'
  },
  {
    id: 'seed_from_loofah',
    machineType: 'seed_maker',
    name: 'Sünger Kabak Tohumu',
    inputItemId: 'loofah',
    inputQuantity: 1,
    outputItemId: 'seed_loofah',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Sünger kabaktan tohum elde edilir.'
  },
  {
    id: 'seed_from_eggplant',
    machineType: 'seed_maker',
    name: 'Patlıcan Tohumu',
    inputItemId: 'eggplant',
    inputQuantity: 1,
    outputItemId: 'seed_eggplant',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Patlıcandan tohum elde edilir.'
  },
  {
    id: 'seed_from_chili',
    machineType: 'seed_maker',
    name: 'Biber Tohumu',
    inputItemId: 'chili',
    inputQuantity: 1,
    outputItemId: 'seed_chili',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Biberden tohum elde edilir.'
  },
  {
    id: 'seed_from_lotus_seed',
    machineType: 'seed_maker',
    name: 'Lotus Tohumu',
    inputItemId: 'lotus_seed',
    inputQuantity: 1,
    outputItemId: 'seed_lotus_seed',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Lotus tohumundan yeni tohum elde edilir.'
  },
  {
    id: 'seed_from_corn',
    machineType: 'seed_maker',
    name: 'Mısır Tohumu',
    inputItemId: 'corn',
    inputQuantity: 1,
    outputItemId: 'seed_corn',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Mısırdan tohum elde edilir.'
  },
  {
    id: 'seed_from_yam',
    machineType: 'seed_maker',
    name: 'Yer Elması Tohumu',
    inputItemId: 'yam',
    inputQuantity: 1,
    outputItemId: 'seed_yam',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Yam kökünden tohum elde edilir.'
  },
  {
    id: 'seed_from_peanut',
    machineType: 'seed_maker',
    name: 'Yer Fıstığı Tohumu',
    inputItemId: 'peanut',
    inputQuantity: 1,
    outputItemId: 'seed_peanut',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Yer fıstığından tohum elde edilir.'
  },
  {
    id: 'seed_from_jujube',
    machineType: 'seed_maker',
    name: 'Hünnap Tohumu',
    inputItemId: 'jujube',
    inputQuantity: 1,
    outputItemId: 'seed_jujube',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Hünnaptan tohum elde edilir.'
  },
  {
    id: 'seed_from_ginger',
    machineType: 'seed_maker',
    name: 'Zencefil Tohumu',
    inputItemId: 'ginger',
    inputQuantity: 1,
    outputItemId: 'seed_ginger',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Zencefilden tohum elde edilir.'
  },
  {
    id: 'seed_from_napa_cabbage',
    machineType: 'seed_maker',
    name: 'Çin Lahanası Tohumu',
    inputItemId: 'napa_cabbage',
    inputQuantity: 1,
    outputItemId: 'seed_napa_cabbage',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Çin lahanasından tohum elde edilir.'
  },
  {
    id: 'seed_from_spinach',
    machineType: 'seed_maker',
    name: 'Ispanak Tohumu',
    inputItemId: 'spinach',
    inputQuantity: 1,
    outputItemId: 'seed_spinach',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Ispanaktan tohum elde edilir.'
  },
  {
    id: 'seed_from_mustard_green',
    machineType: 'seed_maker',
    name: 'Hardal Otu Tohumu',
    inputItemId: 'mustard_green',
    inputQuantity: 1,
    outputItemId: 'seed_mustard_green',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Hardal otundan tohum elde edilir.'
  },
  {
    id: 'seed_from_chives',
    machineType: 'seed_maker',
    name: 'Frenk Soğanı Tohumu',
    inputItemId: 'chives',
    inputQuantity: 1,
    outputItemId: 'seed_chives',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Frenk soğanından tohum elde edilir.'
  },

  // Kristal Kopyalayıcı
  {
    id: 'dup_quartz',
    machineType: 'crystal_duplicator',
    name: 'Kuvars Kopyala',
    inputItemId: 'quartz',
    inputQuantity: 1,
    outputItemId: 'quartz',
    outputQuantity: 2,
    processingDays: 3,
    description: 'Bir kuvarsı yavaşça çoğaltır.'
  },
  {
    id: 'dup_jade',
    machineType: 'crystal_duplicator',
    name: 'Yeşim Kopyala',
    inputItemId: 'jade',
    inputQuantity: 1,
    outputItemId: 'jade',
    outputQuantity: 2,
    processingDays: 4,
    description: 'Bir yeşimi yavaşça çoğaltır.'
  },
  {
    id: 'dup_ruby',
    machineType: 'crystal_duplicator',
    name: 'Yakut Kopyala',
    inputItemId: 'ruby',
    inputQuantity: 1,
    outputItemId: 'ruby',
    outputQuantity: 2,
    processingDays: 5,
    description: 'Bir yakutu yavaşça çoğaltır.'
  },
  {
    id: 'dup_moonstone',
    machineType: 'crystal_duplicator',
    name: 'Aytaşı Kopyala',
    inputItemId: 'moonstone',
    inputQuantity: 1,
    outputItemId: 'moonstone',
    outputQuantity: 2,
    processingDays: 5,
    description: 'Bir aytaşını yavaşça çoğaltır.'
  },
  {
    id: 'dup_obsidian',
    machineType: 'crystal_duplicator',
    name: 'Obsidyen Kopyala',
    inputItemId: 'obsidian',
    inputQuantity: 1,
    outputItemId: 'obsidian',
    outputQuantity: 2,
    processingDays: 4,
    description: 'Bir obsidyeni yavaşça çoğaltır.'
  },
  {
    id: 'dup_dragon_jade',
    machineType: 'crystal_duplicator',
    name: 'Ejder Yeşimi Kopyala',
    inputItemId: 'dragon_jade',
    inputQuantity: 1,
    outputItemId: 'dragon_jade',
    outputQuantity: 2,
    processingDays: 7,
    description: 'Bir ejder yeşimini yavaşça çoğaltır.'
  },

  // Tütsüleme Makinesi
  {
    id: 'smoke_crucian',
    machineType: 'smoker',
    name: 'Tütsülenmiş Gümüş Balığı',
    inputItemId: 'crucian',
    inputQuantity: 1,
    outputItemId: 'smoked_crucian',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Gümüş balığını tütsüler.'
  },
  {
    id: 'smoke_carp',
    machineType: 'smoker',
    name: 'Tütsülenmiş Sazan',
    inputItemId: 'carp',
    inputQuantity: 1,
    outputItemId: 'smoked_carp',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Sazanı tütsüler.'
  },
  {
    id: 'smoke_grass_carp',
    machineType: 'smoker',
    name: 'Tütsülenmiş Ot Sazanı',
    inputItemId: 'grass_carp',
    inputQuantity: 1,
    outputItemId: 'smoked_grass_carp',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Ot sazanını tütsüler.'
  },
  {
    id: 'smoke_bass',
    machineType: 'smoker',
    name: 'Tütsülenmiş Levrek',
    inputItemId: 'bass',
    inputQuantity: 1,
    outputItemId: 'smoked_bass',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Levreği tütsüler.'
  },
  {
    id: 'smoke_catfish',
    machineType: 'smoker',
    name: 'Tütsülenmiş Yayın Balığı',
    inputItemId: 'catfish',
    inputQuantity: 1,
    outputItemId: 'smoked_catfish',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Yayın balığını tütsüler.'
  },
  {
    id: 'smoke_mandarin_fish',
    machineType: 'smoker',
    name: 'Tütsülenmiş Mandalina Balığı',
    inputItemId: 'mandarin_fish',
    inputQuantity: 1,
    outputItemId: 'smoked_mandarin_fish',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Mandalina balığını tütsüler.'
  },
  {
    id: 'smoke_eel',
    machineType: 'smoker',
    name: 'Tütsülenmiş Yılan Balığı',
    inputItemId: 'eel',
    inputQuantity: 1,
    outputItemId: 'smoked_eel',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Yılan balığını tütsüler.'
  },
  {
    id: 'smoke_sturgeon',
    machineType: 'smoker',
    name: 'Tütsülenmiş Mersin Balığı',
    inputItemId: 'sturgeon',
    inputQuantity: 1,
    outputItemId: 'smoked_sturgeon',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Mersin balığını tütsüler.'
  },
  {
    id: 'smoke_loach',
    machineType: 'smoker',
    name: 'Tütsülenmiş Çamur Balığı',
    inputItemId: 'loach',
    inputQuantity: 1,
    outputItemId: 'smoked_loach',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Çamur balığını tütsüler.'
  },
  {
    id: 'smoke_yellow_eel',
    machineType: 'smoker',
    name: 'Tütsülenmiş Sarı Yılan Balığı',
    inputItemId: 'yellow_eel',
    inputQuantity: 1,
    outputItemId: 'smoked_yellow_eel',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Sarı yılan balığını tütsüler.'
  },

  // Kurutucu
  {
    id: 'dry_mushroom',
    machineType: 'dehydrator',
    name: 'Kurutulmuş Mantar',
    inputItemId: 'wild_mushroom',
    inputQuantity: 3,
    outputItemId: 'dried_mushroom',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Yabani mantarları kurutup kuru mantara dönüştürür.'
  },
  {
    id: 'dry_peach',
    machineType: 'dehydrator',
    name: 'Kuru Şeftali',
    inputItemId: 'tree_peach',
    inputQuantity: 1,
    outputItemId: 'dried_peach',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Taze şeftaliyi kurutup kuru şeftali yapar.'
  },
  {
    id: 'dry_lychee',
    machineType: 'dehydrator',
    name: 'Kuru Liçi',
    inputItemId: 'lychee',
    inputQuantity: 1,
    outputItemId: 'dried_lychee',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Liçiyi kurutup kuru liçi yapar.'
  },
  {
    id: 'dry_persimmon',
    machineType: 'dehydrator',
    name: 'Kuru Trabzon Hurması',
    inputItemId: 'persimmon',
    inputQuantity: 1,
    outputItemId: 'dried_persimmon_slice',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Trabzon hurmasını kurutup pestile dönüştürür.'
  },
  {
    id: 'dry_hawthorn',
    machineType: 'dehydrator',
    name: 'Alıç Kurusu',
    inputItemId: 'hawthorn',
    inputQuantity: 1,
    outputItemId: 'dried_hawthorn',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Alıcı kurutup dilim hâline getirir.'
  },
  {
    id: 'dry_apricot',
    machineType: 'dehydrator',
    name: 'Kuru Kayısı',
    inputItemId: 'apricot',
    inputQuantity: 1,
    outputItemId: 'dried_apricot',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Kayısıyı kurutup kuru kayısı yapar.'
  },
  {
    id: 'dry_wild_berry',
    machineType: 'dehydrator',
    name: 'Kurutulmuş Orman Meyvesi',
    inputItemId: 'wild_berry',
    inputQuantity: 3,
    outputItemId: 'dried_berry',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Yabani meyveleri kurutup meyve kurusuna dönüştürür.'
  },

  // Geri Dönüşüm Makinesi
  {
    id: 'recycle_firewood',
    machineType: 'recycler',
    name: 'Yakacak Geri Dönüşümü',
    inputItemId: 'trash',
    inputQuantity: 3,
    outputItemId: 'firewood',
    outputQuantity: 5,
    processingDays: 1,
    description: 'Çöpleri yakacağa dönüştürür.'
  },
  {
    id: 'recycle_copper',
    machineType: 'recycler',
    name: 'Bakır Geri Dönüşümü',
    inputItemId: 'trash',
    inputQuantity: 5,
    outputItemId: 'copper_ore',
    outputQuantity: 3,
    processingDays: 1,
    description: 'Çöplerden bakır cevheri elde eder.'
  },
  {
    id: 'recycle_iron',
    machineType: 'recycler',
    name: 'Demir Geri Dönüşümü',
    inputItemId: 'trash',
    inputQuantity: 5,
    outputItemId: 'iron_ore',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Çöplerden demir cevheri elde eder.'
  },
  {
    id: 'recycle_quartz',
    machineType: 'recycler',
    name: 'Kuvars Geri Dönüşümü',
    inputItemId: 'trash',
    inputQuantity: 8,
    outputItemId: 'quartz',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Çöplerden kuvars ayıklar.'
  },
  {
    id: 'recycle_driftwood',
    machineType: 'recycler',
    name: 'Sürüklenen Odun Geri Dönüşümü',
    inputItemId: 'driftwood',
    inputQuantity: 5,
    outputItemId: 'wood',
    outputQuantity: 10,
    processingDays: 1,
    description: 'Sürüklenen odunları kullanılabilir keresteye dönüştürür.'
  },
  {
    id: 'recycle_cd',
    machineType: 'recycler',
    name: 'CD Geri Kazanımı',
    inputItemId: 'broken_cd',
    inputQuantity: 3,
    outputItemId: 'copper_ore',
    outputQuantity: 3,
    processingDays: 1,
    description: 'Kırık CD’lerden metal geri kazanır.'
  },
  {
    id: 'recycle_newspaper',
    machineType: 'recycler',
    name: 'Gazete Geri Dönüşümü',
    inputItemId: 'soggy_newspaper',
    inputQuantity: 5,
    outputItemId: 'firewood',
    outputQuantity: 3,
    processingDays: 1,
    description: 'Islak gazeteleri kurutup yakıt olarak kullanır.'
  },

  // Peynir Presi
  {
    id: 'cheese_milk',
    machineType: 'cheese_press',
    name: 'Peynir',
    inputItemId: 'milk',
    inputQuantity: 1,
    outputItemId: 'cheese',
    outputQuantity: 1,
    processingDays: 2,
    description: 'İnek sütünden yapılan dolgun aromalı peynir.'
  },
  {
    id: 'cheese_goat',
    machineType: 'cheese_press',
    name: 'Keçi Peyniri',
    inputItemId: 'goat_milk',
    inputQuantity: 1,
    outputItemId: 'goat_cheese',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Keçi sütünden yapılan özel aromalı peynir.'
  },
  {
    id: 'cheese_buffalo',
    machineType: 'cheese_press',
    name: 'Manda Peyniri',
    inputItemId: 'buffalo_milk',
    inputQuantity: 1,
    outputItemId: 'buffalo_cheese',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Manda sütünden yapılan yoğun peynir.'
  },
  {
    id: 'cheese_yak',
    machineType: 'cheese_press',
    name: 'Yak Peyniri',
    inputItemId: 'yak_milk',
    inputQuantity: 1,
    outputItemId: 'yak_cheese',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Yak sütünden yapılan yayla peyniri.'
  },

  // Dokuma Tezgâhı
  {
    id: 'weave_wool',
    machineType: 'loom',
    name: 'Kumaş',
    inputItemId: 'wool',
    inputQuantity: 1,
    outputItemId: 'cloth',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Yünü işleyip kumaşa dönüştürür.'
  },
  {
    id: 'weave_silk',
    machineType: 'loom',
    name: 'İpek Kumaş',
    inputItemId: 'silk',
    inputQuantity: 1,
    outputItemId: 'silk_cloth',
    outputQuantity: 1,
    processingDays: 2,
    description: 'İpek liflerini zarif kumaşa dönüştürür.'
  },
  {
    id: 'weave_alpaca',
    machineType: 'loom',
    name: 'Alpaka Kumaşı',
    inputItemId: 'alpaca_wool',
    inputQuantity: 1,
    outputItemId: 'alpaca_cloth',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Alpaka yününü yumuşak kumaşa dönüştürür.'
  },
  {
    id: 'weave_rabbit',
    machineType: 'loom',
    name: 'Keçe',
    inputItemId: 'rabbit_fur',
    inputQuantity: 1,
    outputItemId: 'felt',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Tavşan tüyünü keçeye dönüştürür.'
  },

  // Fırın
  {
    id: 'smelt_copper',
    machineType: 'furnace',
    name: 'Bakır Külçe',
    inputItemId: 'copper_ore',
    inputQuantity: 5,
    outputItemId: 'copper_bar',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Bakır cevherini bakır külçeye dönüştürür.'
  },
  {
    id: 'smelt_iron',
    machineType: 'furnace',
    name: 'Demir Külçe',
    inputItemId: 'iron_ore',
    inputQuantity: 5,
    outputItemId: 'iron_bar',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Demir cevherini demir külçeye dönüştürür.'
  },
  {
    id: 'smelt_gold',
    machineType: 'furnace',
    name: 'Altın Külçe',
    inputItemId: 'gold_ore',
    inputQuantity: 5,
    outputItemId: 'gold_bar',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Altın cevherini altın külçeye dönüştürür.'
  },
  {
    id: 'smelt_iridium',
    machineType: 'furnace',
    name: 'İridyum Külçe',
    inputItemId: 'iridium_ore',
    inputQuantity: 5,
    outputItemId: 'iridium_bar',
    outputQuantity: 1,
    processingDays: 2,
    description: 'İridyum cevherini iridyum külçeye dönüştürür.'
  },

  // Kömür Ocağı
  {
    id: 'burn_wood',
    machineType: 'charcoal_kiln',
    name: 'Odun Kömürü (Odun)',
    inputItemId: 'wood',
    inputQuantity: 10,
    outputItemId: 'charcoal',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Odunu odun kömürüne çevirir.'
  },
  {
    id: 'burn_bamboo',
    machineType: 'charcoal_kiln',
    name: 'Odun Kömürü (Bambu)',
    inputItemId: 'bamboo',
    inputQuantity: 5,
    outputItemId: 'charcoal',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Bambuyu kömüre dönüştürür.'
  },

  // Değirmen
  {
    id: 'mill_rice',
    machineType: 'mill',
    name: 'Pirinç Unu',
    inputItemId: 'rice',
    inputQuantity: 2,
    outputItemId: 'rice_flour',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Pirinci una dönüştürür.'
  },
  {
    id: 'mill_wheat',
    machineType: 'mill',
    name: 'Un',
    inputItemId: 'winter_wheat',
    inputQuantity: 2,
    outputItemId: 'wheat_flour',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Kış buğdayını una dönüştürür.'
  },
  {
    id: 'mill_corn',
    machineType: 'mill',
    name: 'Mısır Unu',
    inputItemId: 'corn',
    inputQuantity: 2,
    outputItemId: 'cornmeal',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Mısırı öğütüp mısır unu yapar.'
  },

  // Solucan Kutusu
  {
    id: 'worm_bait',
    machineType: 'worm_bin',
    name: 'Solucan Yemi',
    inputItemId: null,
    inputQuantity: 0,
    outputItemId: 'standard_bait',
    outputQuantity: 3,
    processingDays: 2,
    description: 'Solucan kutusu otomatik yem üretir.'
  },

  // Çay Makinesi
  {
    id: 'brew_green_tea',
    machineType: 'tea_maker',
    name: 'Yeşil Çay',
    inputItemId: 'tea',
    inputQuantity: 2,
    outputItemId: 'green_tea_drink',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Çay yapraklarından demlenen hoş kokulu yeşil çay.'
  },
  {
    id: 'brew_chrysanthemum',
    machineType: 'tea_maker',
    name: 'Kasımpatı Çayı',
    inputItemId: 'chrysanthemum',
    inputQuantity: 2,
    outputItemId: 'chrysanthemum_tea',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Ferahlatıcı kasımpatı çayı.'
  },
  {
    id: 'brew_osmanthus',
    machineType: 'tea_maker',
    name: 'Osmanthus Çayı',
    inputItemId: 'osmanthus',
    inputQuantity: 2,
    outputItemId: 'osmanthus_tea',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Mis kokulu osmanthus çayı.'
  },
  {
    id: 'brew_ginseng',
    machineType: 'tea_maker',
    name: 'Ginseng Çayı',
    inputItemId: 'ginseng',
    inputQuantity: 1,
    outputItemId: 'ginseng_tea',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Güç veren ginseng çayı.'
  },

  // Tofu Presi
  {
    id: 'press_tofu',
    machineType: 'tofu_press',
    name: 'Tofu',
    inputItemId: 'broad_bean',
    inputQuantity: 3,
    outputItemId: 'tofu',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Bakladan yapılan taze tofu.'
  },
  {
    id: 'press_peanut_tofu',
    machineType: 'tofu_press',
    name: 'Fıstık Tofusu',
    inputItemId: 'peanut',
    inputQuantity: 3,
    outputItemId: 'peanut_tofu',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Yer fıstığından yapılan aromalı tofu.'
  },
  {
    id: 'press_sesame_paste',
    machineType: 'tofu_press',
    name: 'Susam Ezmesi',
    inputItemId: 'sesame',
    inputQuantity: 2,
    outputItemId: 'sesame_paste',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Susamdan yapılan yoğun susam ezmesi.'
  },

  // Bitki Öğütücüsü
  {
    id: 'grind_herb',
    machineType: 'herb_grinder',
    name: 'Bitkisel Merhem',
    inputItemId: 'herb',
    inputQuantity: 3,
    outputItemId: 'herbal_paste',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Şifalı otları merheme dönüştürür.'
  },
  {
    id: 'grind_ginseng',
    machineType: 'herb_grinder',
    name: 'Ginseng Özütü',
    inputItemId: 'ginseng',
    inputQuantity: 1,
    outputItemId: 'ginseng_extract',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Ginsengi yoğun öz hâline getirir.'
  },
  {
    id: 'grind_antler',
    machineType: 'herb_grinder',
    name: 'Geyik Boynuzu Tozu',
    inputItemId: 'antler_velvet',
    inputQuantity: 1,
    outputItemId: 'antler_powder',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Geyik boynuzunu ince toz hâline getirir.'
  },
  {
    id: 'grind_animal_medicine',
    machineType: 'herb_grinder',
    name: 'Hayvan İlacı',
    inputItemId: 'herb',
    inputQuantity: 2,
    outputItemId: 'animal_medicine',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Şifalı otlardan çiftlik hayvanları için ilaç yapar.'
  },

  // Özel yemler
  {
    id: 'mill_premium_feed',
    machineType: 'mill',
    name: 'Kaliteli Yem',
    inputItemId: 'corn',
    inputQuantity: 3,
    outputItemId: 'premium_feed',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Mısırdan özel kaliteli yem hazırlar.'
  },
  {
    id: 'mill_nourishing_feed',
    machineType: 'mill',
    name: 'Besleyici Yem',
    inputItemId: 'rice',
    inputQuantity: 3,
    outputItemId: 'nourishing_feed',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Pirinci besleyici yeme dönüştürür.'
  },
  {
    id: 'grind_vitality_feed',
    machineType: 'herb_grinder',
    name: 'Canlandırıcı Yem',
    inputItemId: 'herb',
    inputQuantity: 3,
    outputItemId: 'vitality_feed',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Şifalı otları canlandırıcı yeme dönüştürür.'
  },

  // Tütsü Atölyesi
  {
    id: 'incense_pine',
    machineType: 'incense_maker',
    name: 'Çam Tütsüsü',
    inputItemId: 'pine_resin',
    inputQuantity: 2,
    outputItemId: 'pine_incense',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Çam reçinesinden çam tütsüsü yapar.'
  },
  {
    id: 'incense_camphor',
    machineType: 'incense_maker',
    name: 'Kafur Tütsüsü',
    inputItemId: 'camphor_oil',
    inputQuantity: 2,
    outputItemId: 'camphor_incense',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Kafur yağından kafur tütsüsü yapar.'
  },
  {
    id: 'incense_osmanthus',
    machineType: 'incense_maker',
    name: 'Osmanthus Tütsüsü',
    inputItemId: 'osmanthus',
    inputQuantity: 2,
    outputItemId: 'osmanthus_incense',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Osmanthus çiçeğinden tütsü yapar.'
  }
]

/** Fıskiyeler */
export const SPRINKLERS: SprinklerDef[] = [
  {
    id: 'bamboo_sprinkler',
    name: 'Bambu Fıskiye',
    description: 'Üst, alt, sağ ve soldaki 4 kareyi otomatik sular.',
    range: 4,
    craftCost: [
      { itemId: 'bamboo', quantity: 10 },
      { itemId: 'copper_ore', quantity: 3 }
    ],
    craftMoney: 100
  },
  {
    id: 'copper_sprinkler',
    name: 'Bakır Fıskiye',
    description: 'Çevresindeki 8 kareyi otomatik sular.',
    range: 8,
    craftCost: [
      { itemId: 'copper_bar', quantity: 3 },
      { itemId: 'iron_bar', quantity: 1 }
    ],
    craftMoney: 500
  },
  {
    id: 'gold_sprinkler',
    name: 'Altın Fıskiye',
    description: 'Çevresindeki 5×5 alan içindeki toplam 24 kareyi otomatik sular.',
    range: 24,
    craftCost: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'iron_bar', quantity: 2 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 1500
  }
]

/** Gübreler */
export const FERTILIZERS: FertilizerDef[] = [
  {
    id: 'basic_fertilizer',
    name: 'Temel Gübre',
    description: 'Ürün kalitesi ihtimalini %20 artırır.',
    qualityBonus: 0.2,
    craftCost: [
      { itemId: 'wood', quantity: 5 },
      { itemId: 'herb', quantity: 2 }
    ],
    craftMoney: 0,
    shopPrice: 25
  },
  {
    id: 'quality_fertilizer',
    name: 'Kaliteli Gübre',
    description: 'Ürün kalitesi ihtimalini %40 artırır.',
    qualityBonus: 0.4,
    craftCost: [
      { itemId: 'herb', quantity: 3 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 0,
    shopPrice: 75
  },
  {
    id: 'speed_gro',
    name: 'Hızlı Büyütücü',
    description: 'Mahsul büyümesini %25 hızlandırır.',
    growthSpeedup: 0.25,
    craftCost: [
      { itemId: 'pine_cone', quantity: 3 },
      { itemId: 'herb', quantity: 1 }
    ],
    craftMoney: 0,
    shopPrice: 50
  },
  {
    id: 'deluxe_speed_gro',
    name: 'Gelişmiş Hızlı Büyütücü',
    description: 'Mahsul büyümesini %33 hızlandırır.',
    growthSpeedup: 0.33,
    craftCost: [
      { itemId: 'quartz', quantity: 1 },
      { itemId: 'firewood', quantity: 3 }
    ],
    craftMoney: 0,
    shopPrice: 100
  },
  {
    id: 'retaining_soil',
    name: 'Nem Tutan Toprak',
    description: 'Gece boyunca sulu kalma ihtimali %50’dir.',
    retainChance: 0.5,
    craftCost: [
      { itemId: 'wood', quantity: 3 },
      { itemId: 'firewood', quantity: 2 }
    ],
    craftMoney: 0,
    shopPrice: 30
  },
  {
    id: 'quality_retaining_soil',
    name: 'Kaliteli Nem Tutan Toprak',
    description: 'Gece boyunca %100 sulu kalır.',
    retainChance: 1.0,
    craftCost: [
      { itemId: 'quartz', quantity: 1 },
      { itemId: 'wood', quantity: 5 }
    ],
    craftMoney: 0,
    shopPrice: 80
  }
]

/** Yemler */
export const BAITS: BaitDef[] = [
  {
    id: 'standard_bait',
    name: 'Sıradan Yem',
    description: 'Balıkları daha sakin yapar, ani hamle ihtimalini azaltır.',
    behaviorModifier: { calm: 0.1, struggle: 0, dash: -0.1 },
    craftCost: [{ itemId: 'herb', quantity: 2 }],
    craftMoney: 0,
    shopPrice: 5
  },
  {
    id: 'wild_bait',
    name: 'Yabani Yem',
    description: '%25 ihtimalle çift balık yakalanır.',
    doubleCatchChance: 0.25,
    craftCost: [
      { itemId: 'herb', quantity: 3 },
      { itemId: 'wild_berry', quantity: 1 },
      { itemId: 'firewood', quantity: 2 }
    ],
    craftMoney: 0,
    shopPrice: null
  },
  {
    id: 'magic_bait',
    name: 'Büyülü Yem',
    description: 'Mevsim sınırını yok sayar, tüm balıkları yakalamanı sağlar.',
    ignoresSeason: true,
    craftCost: [
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'gold_ore', quantity: 1 }
    ],
    craftMoney: 0,
    shopPrice: null
  },
  {
    id: 'deluxe_bait',
    name: 'Kaliteli Yem',
    description: 'Balıkları daha sakin yapar, mücadele başarısını %5 artırır.',
    behaviorModifier: { calm: 0.15, struggle: 0, dash: -0.1 },
    struggleBonus: 0.05,
    craftCost: [
      { itemId: 'herb', quantity: 3 },
      { itemId: 'ginseng', quantity: 1 }
    ],
    craftMoney: 0,
    shopPrice: null
  },
  {
    id: 'targeted_bait',
    name: 'Hedefli Yem',
    description: 'Zor balıkların ağırlığını 2x, efsanevi balıkların ağırlığını 1.5x yapar.',
    hardWeightMult: 2,
    legendaryWeightMult: 1.5,
    craftCost: [
      { itemId: 'magic_bait', quantity: 1 },
      { itemId: 'gold_ore', quantity: 1 }
    ],
    craftMoney: 0,
    shopPrice: null
  }
]

/** Şamandıralar */
export const TACKLES: TackleDef[] = [
  {
    id: 'spinner',
    name: 'Döner Şamandıra',
    description: 'Balık tutarken enerji tüketimini %50 azaltır.',
    maxDurability: 20,
    requiredRodTier: 'iron',
    staminaReduction: 0.5,
    craftCost: [
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'bamboo', quantity: 2 }
    ],
    craftMoney: 0,
    shopPrice: 250
  },
  {
    id: 'trap_bobber',
    name: 'Tuzak Şamandıra',
    description: 'Misina koptuğunda 1 ek şans verir.',
    maxDurability: 20,
    requiredRodTier: 'iron',
    extraBreakChance: 1,
    craftCost: [
      { itemId: 'copper_ore', quantity: 5 },
      { itemId: 'wood', quantity: 5 }
    ],
    craftMoney: 0,
    shopPrice: 200
  },
  {
    id: 'cork_bobber',
    name: 'Mantar Şamandıra',
    description: 'Mücadele başarısını %25 artırır.',
    maxDurability: 20,
    requiredRodTier: 'iron',
    struggleBonus: 0.25,
    craftCost: [
      { itemId: 'wood', quantity: 10 },
      { itemId: 'iron_ore', quantity: 2 }
    ],
    craftMoney: 0,
    shopPrice: 250
  },
  {
    id: 'quality_bobber',
    name: 'Kalite Şamandırası',
    description: 'Yakalanan balığın kalitesini 1 kademe artırır.',
    maxDurability: 20,
    requiredRodTier: 'iron',
    qualityBoost: 1,
    craftCost: [
      { itemId: 'gold_ore', quantity: 2 },
      { itemId: 'copper_ore', quantity: 3 }
    ],
    craftMoney: 0,
    shopPrice: 500
  },
  {
    id: 'lead_bobber',
    name: 'Kurşun Şamandıra',
    description: 'Balığın ani atak ve çırpınma ihtimalini ayrı ayrı %10 azaltır.',
    maxDurability: 20,
    requiredRodTier: 'iron',
    dangerReduction: 0.1,
    craftCost: [
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'wood', quantity: 3 }
    ],
    craftMoney: 0,
    shopPrice: 200
  }
]

export const getMachineById = (id: string): ProcessingMachineDef | undefined => {
  return PROCESSING_MACHINES.find(m => m.id === id)
}

export const getProcessingRecipeById = (id: string): ProcessingRecipeDef | undefined => {
  return PROCESSING_RECIPES.find(r => r.id === id)
}

export const getRecipesForMachine = (machineType: string): ProcessingRecipeDef[] => {
  return PROCESSING_RECIPES.filter(r => r.machineType === machineType)
}

export const getSprinklerById = (id: string): SprinklerDef | undefined => {
  return SPRINKLERS.find(s => s.id === id)
}

export const getFertilizerById = (id: string): FertilizerDef | undefined => {
  return FERTILIZERS.find(f => f.id === id)
}

export const getBaitById = (id: string): BaitDef | undefined => {
  return BAITS.find(b => b.id === id)
}

export const getTackleById = (id: string): TackleDef | undefined => {
  return TACKLES.find(t => t.id === id)
}

/** Reçine Toplayıcı yapım tanımı */
export const TAPPER = {
  id: 'tapper',
  name: 'Reçine Toplayıcı',
  description: 'Olgun yabani ağaçlara yerleştirilir, düzenli aralıklarla reçine üretir.',
  craftCost: [
    { itemId: 'copper_ore', quantity: 5 },
    { itemId: 'wood', quantity: 10 }
  ],
  craftMoney: 200
}

/** Yengeç Kapanı yapım tanımı */
export const CRAB_POT_CRAFT = {
  id: 'crab_pot',
  name: 'Yengeç Kapanı',
  description: 'Balık tutma bölgelerine yerleştirilir, her gün otomatik su ürünü yakalar (yem gerekir).',
  craftCost: [
    { itemId: 'wood', quantity: 15 },
    { itemId: 'iron_bar', quantity: 2 }
  ],
  craftMoney: 500
}

/** Yıldırımsavar yapım tanımı */
export const LIGHTNING_ROD = {
  id: 'lightning_rod',
  name: 'Yıldırımsavar',
  description: 'Çiftliğe yerleştirilir; fırtınada yıldırımı emerek mahsulleri korur ve pil üretir.',
  craftCost: [
    { itemId: 'iron_ore', quantity: 5 },
    { itemId: 'copper_ore', quantity: 3 },
    { itemId: 'quartz', quantity: 1 }
  ],
  craftMoney: 300
}

/** Korkuluk yapım tanımı */
export const SCARECROW = {
  id: 'scarecrow',
  name: 'Korkuluk',
  description: 'Çiftliğe yerleştirilir, mahsul çalan kargaları uzak tutar.',
  craftCost: [
    { itemId: 'wood', quantity: 20 },
    { itemId: 'bamboo', quantity: 5 },
    { itemId: 'firewood', quantity: 5 }
  ],
  craftMoney: 150
}

export const AUTO_PETTER = {
  id: 'auto_petter',
  name: 'Otomatik Sevgi Makinesi',
  description: 'Ahıra kurulduğunda her gün tüm hayvanları otomatik sever. Büyük ahır (Seviye 2) gerekir.',
  craftCost: [
    { itemId: 'gold_bar', quantity: 10 },
    { itemId: 'iron_bar', quantity: 20 },
    { itemId: 'copper_bar', quantity: 20 }
  ],
  craftMoney: 5000
}

/** Bombalar */
export const BOMBS: BombDef[] = [
  {
    id: 'cherry_bomb',
    name: 'Fındık Patlağı',
    description: 'Küçük alanda patlar, tek seferde 3 birim cevher kazandırır.',
    oreMultiplier: 3,
    clearsMonster: false,
    craftCost: [
      { itemId: 'copper_ore', quantity: 12 },
      { itemId: 'firewood', quantity: 15 }
    ],
    craftMoney: 100,
    shopPrice: null
  },
  {
    id: 'bomb',
    name: 'Barut Paketi',
    description: 'Geniş alanda patlar, 5 birim cevher kazandırır ve canavarları temizler.',
    oreMultiplier: 5,
    clearsMonster: true,
    craftCost: [
      { itemId: 'iron_ore', quantity: 12 },
      { itemId: 'firewood', quantity: 18 },
      { itemId: 'quartz', quantity: 5 }
    ],
    craftMoney: 250,
    shopPrice: null
  },
  {
    id: 'mega_bomb',
    name: 'Gök Gürültüsü Bombası',
    description: 'Çok geniş alanda patlar, 8 birim cevher kazandırır ve canavarları temizler.',
    oreMultiplier: 8,
    clearsMonster: true,
    craftCost: [
      { itemId: 'gold_ore', quantity: 18 },
      { itemId: 'iron_ore', quantity: 15 },
      { itemId: 'firewood', quantity: 25 },
      { itemId: 'ruby', quantity: 3 }
    ],
    craftMoney: 500,
    shopPrice: null
  }
]

export const getBombById = (id: string): BombDef | undefined => {
  return BOMBS.find(b => b.id === id)
    }
