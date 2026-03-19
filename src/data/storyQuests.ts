import type { MainQuestDef } from '@/types'

/** Bölüm başlıkları */
export const CHAPTER_TITLES: Record<number, string> = {
  1: 'gaKöy`e İlk Adım',
  2: 'Toprağa Kök Salmak',
  3: 'Dört Yana Nam Salmak',
  4: 'Fırtınalı Karşılaşmalar',
  5: 'gaKöy’ün Efendisi'
}

/** 50 ana hikâye görevi tanımı, 5 bölüm ve her bölümde 10 görev */
export const STORY_QUESTS: MainQuestDef[] = [
  // ============================================================
  // 1. Bölüm "gaKöy’e İlk Adım" — Başlangıç rehberi
  // ============================================================
  {
    id: 'main_1_1',
    chapter: 1,
    order: 1,
    title: 'Yeni Bir Başlangıç',
    description: 'Köy muhtarı Gökhan, gaKöy`de tutunmak istiyorsan önce çiftçilikle başlaman gerektiğini söylüyor. 5 kez ürün hasat etmeyi dene.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'harvestCrops', label: 'Toplam 5 kez ürün hasat et', target: 5 }],
    moneyReward: 300,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_1_2',
    chapter: 1,
    order: 2,
    title: 'Yakın Komşu, Uzak Akrabadan İyidir',
    description: 'Mustafa Amca köydeki genel dükkânın sahibidir. Onunla daha sık görüşmeye çalış.',
    npcId: 'chen_bo',
    objectives: [{ type: 'npcFriendship', label: 'Mustafa Amca ile tanışıklık seviyesine ulaş', npcId: 'chen_bo', friendshipLevel: 'acquaintance' }],
    moneyReward: 200,
    friendshipReward: [{ npcId: 'chen_bo', amount: 20 }]
  },
  {
    id: 'main_1_3',
    chapter: 1,
    order: 3,
    title: 'Dere Kenarında Balık Tutmak',
    description: 'Miray, köyün en iyi balıkçısıdır. Seni dere kenarında şansını denemeye çağırıyor.',
    npcId: 'qiu_yue',
    objectives: [{ type: 'catchFish', label: 'Toplam 5 balık yakala', target: 5 }],
    moneyReward: 300,
    itemReward: [{ itemId: 'standard_bait', quantity: 10 }],
    friendshipReward: [{ npcId: 'qiu_yue', amount: 20 }]
  },
  {
    id: 'main_1_4',
    chapter: 1,
    order: 4,
    title: 'Madene İlk Adım',
    description: 'Mehmethan, madenin içinde güzel şeyler olduğunu ama tehlikeler de barındırdığını söylüyor. Önce 5. kata ulaşmayı dene.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Madende 5. kata ulaş', target: 5 }],
    moneyReward: 500,
    friendshipReward: [{ npcId: 'a_shi', amount: 20 }]
  },
  {
    id: 'main_1_5',
    chapter: 1,
    order: 5,
    title: 'Kırsal Lezzetler',
    description: 'Müzeyyen Teyze, çiftçiliğin yorucu olduğunu ve kendini birkaç yemekle ödüllendirmen gerektiğini söylüyor.',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Toplam 3 yemek pişir', target: 3 }],
    moneyReward: 300,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 20 }]
  },
  {
    id: 'main_1_6',
    chapter: 1,
    order: 6,
    title: 'İyi İlişkiler Kur',
    description: 'Köy muhtarı Gökhan, köydeki insanları daha iyi tanımanı ve onlara işlerinde yardım etmeni istiyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeQuests', label: 'Toplam 3 görev tamamla', target: 3 }],
    moneyReward: 500,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_1_7',
    chapter: 1,
    order: 7,
    title: 'Marangozun Sınavı',
    description: 'Merve, ustası marangoz Oğuz`un acilen oduna ihtiyacı olduğunu söylüyor. 30 odun götür ve yardım et.',
    npcId: 'xiao_man',
    objectives: [{ type: 'deliverItem', label: 'Odun ×30 teslim et', itemId: 'wood', itemQuantity: 30 }],
    moneyReward: 500,
    itemReward: [{ itemId: 'basic_fertilizer', quantity: 5 }],
    friendshipReward: [{ npcId: 'xiao_man', amount: 30 }]
  },
  {
    id: 'main_1_8',
    chapter: 1,
    order: 8,
    title: 'İhtiyar Burhan`ın İsteği',
    description: 'İhtiyar Burhan bir ilaç hazırlamak istiyor ve birkaç şifalı ota ihtiyacı var. Ona 10 adet ot topla.',
    npcId: 'lin_lao',
    objectives: [{ type: 'deliverItem', label: 'Şifalı ot ×10 teslim et', itemId: 'herb', itemQuantity: 10 }],
    moneyReward: 500,
    friendshipReward: [{ npcId: 'lin_lao', amount: 30 }]
  },
  {
    id: 'main_1_9',
    chapter: 1,
    order: 9,
    title: 'İlk Başarı Işığı',
    description: 'Köy muhtarı Gökhan, performansından memnun. Biraz daha çalış ve birikimini artır.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Toplam 5000 para kazan', target: 5000 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_1_10',
    chapter: 1,
    order: 10,
    title: 'gaKöy`e Kök Salmak',
    description: 'gaKöy`de gerçekten yer edinmek için çiftçilikte usta olmalısın. Çiftçilik becerini 3. seviyeye çıkar.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'skillLevel', label: 'Çiftçilik becerisi 3. seviyeye ulaşsın', skillType: 'farming', target: 3 }],
    moneyReward: 1000,
    itemReward: [{ itemId: 'quality_fertilizer', quantity: 5 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },

  // ============================================================
  // 2. Bölüm "Toprağa Kök Salmak" — Erken / orta dönem
  // ============================================================
  {
    id: 'main_2_1',
    chapter: 2,
    order: 1,
    title: 'Bereket Yolu',
    description: 'Gamze, çiftliğinin giderek düzene girdiğini söylüyor. Daha fazla ürün hasat etmeye devam et.',
    npcId: 'liu_niang',
    objectives: [{ type: 'harvestCrops', label: 'Toplam 50 kez ürün hasat et', target: 50 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'liu_niang', amount: 20 }]
  },
  {
    id: 'main_2_2',
    chapter: 2,
    order: 2,
    title: 'Madenin Derinlikleri',
    description: 'Mehmethan, 20. katın altında demir damarları olduğunu söylüyor. Biraz daha derine in.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Madende 20. kata ulaş', target: 20 }],
    moneyReward: 1000,
    itemReward: [{ itemId: 'iron_ore', quantity: 10 }],
    friendshipReward: [{ npcId: 'a_shi', amount: 20 }]
  },
  {
    id: 'main_2_3',
    chapter: 2,
    order: 3,
    title: 'Balıkçının Yolu',
    description: 'Melisa, balık tutmanın sakin bir zihin işi olduğunu söylüyor. Biraz daha balık yakala ve özünü kavra.',
    npcId: 'li_yu',
    objectives: [{ type: 'catchFish', label: 'Toplam 30 balık yakala', target: 30 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'li_yu', amount: 20 }]
  },
  {
    id: 'main_2_4',
    chapter: 2,
    order: 4,
    title: 'Köy Bağları Filizleniyor',
    description: 'Köy muhtarı Gökhan, köy tapınağında bir görev panosu olduğunu söylüyor. Kayıt/ansiklopedi bölümündeki "Tapınak"a gidip bir görev tamamla ve köye katkıda bulun.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeBundles', label: '1 tapınak görevini tamamla', target: 1 }],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_2_5',
    chapter: 2,
    order: 5,
    title: 'Demirciyle Dostluk',
    description: 'Demirci Kadir, alet yapmak için bir miktar demir cevherine ihtiyaç duyuyor. Ona 15 demir cevheri götür.',
    npcId: 'sun_tiejiang',
    objectives: [
      { type: 'npcFriendship', label: 'Demirci Kadir ile tanışıklık seviyesine ulaş', npcId: 'sun_tiejiang', friendshipLevel: 'acquaintance' },
      { type: 'deliverItem', label: 'Demir cevheri ×15 teslim et', itemId: 'iron_ore', itemQuantity: 15 }
    ],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'sun_tiejiang', amount: 30 }]
  },
  {
    id: 'main_2_6',
    chapter: 2,
    order: 6,
    title: 'Çiftlik Hayali',
    description: 'Dorukhan, hayvan yetiştirmenin ne kadar keyifli olduğunu söylüyor. 3 hayvan yetiştirmeyi dene.',
    npcId: 'da_niu',
    objectives: [{ type: 'ownAnimals', label: '3 hayvana sahip ol', target: 3 }],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'da_niu', amount: 30 }]
  },
  {
    id: 'main_2_7',
    chapter: 2,
    order: 7,
    title: 'Aşçılıkta İlerleme',
    description: 'Müzeyyen Teyze, yemeklerinin tadını çok beğendi. Birkaç tarif daha öğren.',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Toplam 15 yemek pişir', target: 15 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 20 }]
  },
  {
    id: 'main_2_8',
    chapter: 2,
    order: 8,
    title: 'Köylülerin İstekleri',
    description: 'Köy muhtarı Gökhan, köylülere çok yardım ettiğini söylüyor. Böyle devam et.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeQuests', label: 'Toplam 10 görev tamamla', target: 10 }],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_2_9',
    chapter: 2,
    order: 9,
    title: 'Dört Mevsimin Ürünleri',
    description: 'Mustafa Amca, gaKöy`ün ürünlerinin çok çeşitli olduğunu söylüyor. Daha farklı eşyalar keşfet.',
    npcId: 'chen_bo',
    objectives: [{ type: 'discoverItems', label: '30 farklı eşya keşfet', target: 30 }],
    moneyReward: 1200,
    friendshipReward: [{ npcId: 'chen_bo', amount: 20 }]
  },
  {
    id: 'main_2_10',
    chapter: 2,
    order: 10,
    title: 'Küçük Bir Ün',
    description: 'Taoyuan’da artık az da olsa tanınır oldun. Servetini büyütmeye devam et ve gücünü göster.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Toplam 15000 para kazan', target: 15000 }],
    moneyReward: 1500,
    itemReward: [{ itemId: 'seed_peach', quantity: 3 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },

  // ============================================================
  // 3. Bölüm "Dört Yana Nam Salmak" — Orta dönem
  // ============================================================
  {
    id: 'main_3_1',
    chapter: 3,
    order: 1,
    title: 'Derinliklerin Meydan Okuması',
    description: 'Mehmethan, 40. katın altında altın damarları olduğunu ama canavarların da çok daha vahşi olduğunu söylüyor.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Madende 40. kata ulaş', target: 40 }],
    moneyReward: 1500,
    itemReward: [{ itemId: 'gold_ore', quantity: 10 }],
    friendshipReward: [{ npcId: 'a_shi', amount: 20 }]
  },
  {
    id: 'main_3_2',
    chapter: 3,
    order: 2,
    title: 'Her İşe Koşan Biri',
    description: 'Köy muhtarı Gökhan, köyün en yardımsever kişisi olmaya başladığını söylüyor. Köylülere yardım etmeye devam et.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeQuests', label: 'Toplam 25 görev tamamla', target: 25 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_3_3',
    chapter: 3,
    order: 3,
    title: 'Her Şeyi Bilen',
    description: 'Bilgin Bayram, Taoyuan’daki ürünler hakkındaki bilginle ilgileniyor. Daha fazlasını keşfet.',
    npcId: 'zhou_xiucai',
    objectives: [{ type: 'discoverItems', label: '50 farklı eşya keşfet', target: 50 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'zhou_xiucai', amount: 20 }]
  },
  {
    id: 'main_3_4',
    chapter: 3,
    order: 4,
    title: 'Gurme',
    description: 'Öykü, aşçılığının giderek daha iyi olduğunu söylüyor. Daha fazla tarif dene.',
    npcId: 'pang_shen',
    objectives: [{ type: 'cookRecipes', label: 'Toplam 30 yemek pişir', target: 30 }],
    moneyReward: 1200,
    friendshipReward: [{ npcId: 'pang_shen', amount: 20 }]
  },
  {
    id: 'main_3_5',
    chapter: 3,
    order: 5,
    title: 'Herkesle İyi Geçin',
    description: 'Köy muhtarı Gökhan, köydeki herkesin seni tanımasını istiyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'npcAllFriendly', label: 'Tüm köylülerle tanışıklık seviyesine ulaş', friendshipLevel: 'acquaintance' }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_3_6',
    chapter: 3,
    order: 6,
    title: 'Çiftliği Büyütmek',
    description: 'Dorukhan, çiftliğinle çok ilgileniyor. Hayvan sayını 8’e çıkar.',
    npcId: 'da_niu',
    objectives: [{ type: 'ownAnimals', label: '8 hayvana sahip ol', target: 8 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'da_niu', amount: 20 }]
  },
  {
    id: 'main_3_7',
    chapter: 3,
    order: 7,
    title: 'Balıkçı Kral Olma Yolunda',
    description: 'Melisa, balıkçılık yeteneğinin artık oldukça iyi olduğunu söylüyor. Daha da ilerle.',
    npcId: 'qiu_yue',
    objectives: [{ type: 'catchFish', label: 'Toplam 80 balık yakala', target: 80 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'qiu_yue', amount: 20 }]
  },
  {
    id: 'main_3_8',
    chapter: 3,
    order: 8,
    title: 'Teslimat Ustası',
    description: 'İşletmeci Mustafa, satışa çıkardığın ürün çeşitliliğine şaşırıyor. Ticaret ağını büyüt.',
    npcId: 'he_zhanggui',
    objectives: [{ type: 'shipItems', label: '15 farklı eşya sevk et', target: 15 }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'he_zhanggui', amount: 20 }]
  },
  {
    id: 'main_3_9',
    chapter: 3,
    order: 9,
    title: 'Zanaatta Ustalık',
    description: 'İhtiyar Burhan, insanın elinde mutlaka bir beceri olması gerektiğini söylüyor. Herhangi bir beceriyi 7. seviyeye çıkar.',
    npcId: 'lin_lao',
    objectives: [{ type: 'skillLevel', label: 'Herhangi bir beceriyi 7. seviyeye çıkar', target: 7 }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'lin_lao', amount: 20 }]
  },
  {
    id: 'main_3_10',
    chapter: 3,
    order: 10,
    title: 'Şöhretin Yayılıyor',
    description: 'Adın komşu köylere kadar ulaşmış durumda. Servetini artırmaya devam et ve gaKöy`ün gururu ol.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Toplam 40000 para kazan', target: 40000 }],
    moneyReward: 2500,
    itemReward: [{ itemId: 'jade', quantity: 2 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },

  // ============================================================
  // 4. Bölüm "Fırtınalı Karşılaşmalar" — Orta / geç dönem
  // ============================================================
  {
    id: 'main_4_1',
    chapter: 4,
    order: 1,
    title: 'Derinliklerin Fatihi',
    description: 'Mehmethan, madenin en derinlerinde güçlü bir boss saklandığını söylüyor. 80. kata ulaş.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Madende 80. kata ulaş', target: 80 }],
    moneyReward: 3000,
    itemReward: [{ itemId: 'gold_ore', quantity: 15 }],
    friendshipReward: [{ npcId: 'a_shi', amount: 20 }]
  },
  {
    id: 'main_4_2',
    chapter: 4,
    order: 2,
    title: 'Canavar Avcısı',
    description: 'Oğuzcan, dağlardaki canavarların çoğaldığını ve birilerinin onları temizlemesi gerektiğini söylüyor.',
    npcId: 'yun_fei',
    objectives: [{ type: 'killMonsters', label: 'Toplam 150 canavar öldür', target: 150 }],
    moneyReward: 2500,
    friendshipReward: [{ npcId: 'yun_fei', amount: 30 }]
  },
  {
    id: 'main_4_3',
    chapter: 4,
    order: 3,
    title: 'Köy Bağlarının Tamamlanışı',
    description: 'Köy muhtarı Gökhan, tapınak görevleri için senden daha fazla katkı bekliyor. Kayıt/ansiklopedi bölümündeki "Tapınak"a gidip gereken eşyaları teslim et.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeBundles', label: '4 tapınak görevini tamamla', target: 4 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_4_4',
    chapter: 4,
    order: 4,
    title: 'Hayırlı Bir Yuva',
    description: 'Köy muhtarı Gökhan gülümseyerek, artık bir yuva kurmanın zamanı gelmedi mi diye soruyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'married', label: 'Sevdiğin kişiyle evlen' }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_4_5',
    chapter: 4,
    order: 5,
    title: 'Usta Aşçının Yolu',
    description: 'Müzeyyen Teyze, artık aşçılığının kendisini geçtiğini söylüyor. Daha fazla yemek dene.',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Toplam 50 yemek pişir', target: 50 }],
    moneyReward: 2500,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 20 }]
  },
  {
    id: 'main_4_6',
    chapter: 4,
    order: 6,
    title: 'Her Şeyi Bilen Bilgin',
    description: 'Bilgin Bayram, artık çoğu kişiden daha bilgili olduğunu düşünüyor. Keşfetmeye devam et.',
    npcId: 'zhou_xiucai',
    objectives: [{ type: 'discoverItems', label: '80 farklı eşya keşfet', target: 80 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'zhou_xiucai', amount: 20 }]
  },
  {
    id: 'main_4_7',
    chapter: 4,
    order: 7,
    title: 'Ticaretin Efendisi',
    description: 'İşletmeci Mustafa, sevkiyat ölçeğinden çok etkilenmiş durumda. Ürün çeşitliliğini daha da artır.',
    npcId: 'he_zhanggui',
    objectives: [{ type: 'shipItems', label: '30 farklı eşya sevk et', target: 30 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'he_zhanggui', amount: 20 }]
  },
  {
    id: 'main_4_8',
    chapter: 4,
    order: 8,
    title: 'Gerçek Dostluk',
    description: 'İnsan hayatta bir gerçek dosta sahip olsa yeter. Bir köylüyle en iyi dost ol.',
    npcId: 'lin_lao',
    objectives: [{ type: 'npcFriendship', label: 'Herhangi bir köylüyle en iyi dost ol', npcId: '_any', friendshipLevel: 'bestFriend' }],
    moneyReward: 2500,
    friendshipReward: [{ npcId: 'lin_lao', amount: 20 }]
  },
  {
    id: 'main_4_9',
    chapter: 4,
    order: 9,
    title: 'Bereket Baronu',
    description: 'Gamze, çiftliğinin artık gaKöy`ün en verimlisi olduğunu söylüyor. Böyle devam et.',
    npcId: 'liu_niang',
    objectives: [{ type: 'harvestCrops', label: 'Toplam 300 kez ürün hasat et', target: 300 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'liu_niang', amount: 20 }]
  },
  {
    id: 'main_4_10',
    chapter: 4,
    order: 10,
    title: 'Bölgenin En Zengini',
    description: 'Servetin artık her yerde konuşuluyor. Köy muhtarı Gökhan, gaKöy`ün gururu olduğunu söylüyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Toplam 100000 para kazan', target: 100000 }],
    moneyReward: 5000,
    itemReward: [{ itemId: 'prismatic_shard', quantity: 1 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },

  // ============================================================
  // 5. Bölüm "Taoyuan’ın Efendisi" — Geç dönem / final
  // ============================================================
  {
    id: 'main_5_1',
    chapter: 5,
    order: 1,
    title: 'Madenin Dibine Yolculuk',
    description: 'Mehmethan, madenin en altında kadim sırlar uyuduğunu söylüyor. 120. kata ulaş ve gerçeği ortaya çıkar.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Madende 120. kata ulaş', target: 120 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'a_shi', amount: 30 }]
  },
  {
    id: 'main_5_2',
    chapter: 5,
    order: 2,
    title: 'İskelet Uçurumu',
    description: 'Mehmethan, madenin sonunda Kafatası Madeni’ne giden bir yol olduğunu ve orada daha değerli cevherler bulunduğunu söylüyor.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachSkullFloor', label: 'Kafatası Madeni’nde 50. kata ulaş', target: 50 }],
    moneyReward: 5000,
    itemReward: [{ itemId: 'iridium_ore', quantity: 5 }],
    friendshipReward: [{ npcId: 'a_shi', amount: 30 }]
  },
  {
    id: 'main_5_3',
    chapter: 5,
    order: 3,
    title: 'Canavarların Kâbusu',
    description: 'Öykü, artık gaKöy`ün en güçlü savaşçısı olduğunu ama canavarların hâlâ ortaya çıkmaya devam ettiğini söylüyor.',
    npcId: 'yun_fei',
    objectives: [{ type: 'killMonsters', label: 'Toplam 500 canavar öldür', target: 500 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'yun_fei', amount: 30 }]
  },
  {
    id: 'main_5_4',
    chapter: 5,
    order: 4,
    title: 'Her Alanda Usta',
    description: 'İhtiyar Burhan, gerçek ustaların her alanda yetkin olduğunu söylüyor. Tüm becerilerini 8. seviyeye çıkar.',
    npcId: 'lin_lao',
    objectives: [{ type: 'allSkillsLevel', label: 'Tüm becerileri 8. seviyeye çıkar', target: 8 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'lin_lao', amount: 30 }]
  },
  {
    id: 'main_5_5',
    chapter: 5,
    order: 5,
    title: 'Saray Aşçısı',
    description: 'Müzeyyen Teyze, aşçılığının artık zirveye ulaştığını söylüyor. Yüz yemek hedefi için ilerle!',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Toplam 80 yemek pişir', target: 80 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 30 }]
  },
  {
    id: 'main_5_6',
    chapter: 5,
    order: 6,
    title: 'Aile Saadeti',
    description: 'Köy muhtarı Gökhan gülerek, artık aile kurduğuna göre bir çocuk sahibi olmanın da vakti geldiğini söylüyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'hasChild', label: 'İlk çocuğunu karşıla' }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_5_7',
    chapter: 5,
    order: 7,
    title: 'gaKöy`ün Dostu',
    description: 'Köy muhtarı Gökhan, köydeki herkesle dost olmanı istiyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'npcAllFriendly', label: 'Tüm köylülerle dost ol', friendshipLevel: 'friendly' }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_5_8',
    chapter: 5,
    order: 8,
    title: 'Tam Katalog Sevkiyat',
    description: 'İşletmeci Mustafa, gaKöy`deki tüm ürünleri en az bir kez sevk etmeni istiyor.',
    npcId: 'he_zhanggui',
    objectives: [{ type: 'shipItems', label: '50 farklı eşya sevk et', target: 50 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'he_zhanggui', amount: 30 }]
  },
  {
    id: 'main_5_9',
    chapter: 5,
    order: 9,
    title: 'Tapınağın Tamamlanışı',
    description: 'Köy muhtarı Gökhan, tapınaktaki tüm görevlerin artık sana bağlı olduğunu söylüyor. Kayıt/ansiklopedi bölümündeki "Tapınak"a gidip kalan görevleri tamamla.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeBundles', label: 'Tüm 6 tapınak görevini tamamla', target: 6 }],
    moneyReward: 8000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_5_10',
    chapter: 5,
    order: 10,
    title: 'gaKöy`ün Efendisi',
    description: 'Artık gerçekten gaKöy`ün efendisi oldun. Tüm becerilerini en üst seviyeye çıkar ve servetinle herkesi geride bırak. Bu son sınavdır.',
    npcId: 'liu_cunzhang',
    objectives: [
      { type: 'earnMoney', label: 'Toplam 300000 para kazan', target: 300000 },
      { type: 'allSkillsLevel', label: 'Tüm becerileri 10. seviyeye çıkar', target: 10 }
    ],
    moneyReward: 10000,
    itemReward: [{ itemId: 'prismatic_shard', quantity: 1 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 50 }]
  }
]

/** ID’ye göre ana hikâye görevini al */
export const getStoryQuestById = (id: string): MainQuestDef | undefined => {
  return STORY_QUESTS.find(q => q.id === id)
}

/** Bölüm ve sıraya göre ana hikâye görevini al */
export const getStoryQuestByOrder = (chapter: number, order: number): MainQuestDef | undefined => {
  return STORY_QUESTS.find(q => q.chapter === chapter && q.order === order)
}

/** Sonraki ana hikâye görevini al */
export const getNextStoryQuest = (currentId: string): MainQuestDef | undefined => {
  const idx = STORY_QUESTS.findIndex(q => q.id === currentId)
  if (idx === -1 || idx >= STORY_QUESTS.length - 1) return undefined
  return STORY_QUESTS[idx + 1]
}

/** Belirli bir bölümün tüm ana hikâye görevlerini al */
export const getChapterQuests = (chapter: number): MainQuestDef[] => {
  return STORY_QUESTS.filter(q => q.chapter === chapter)
}

/** İlk ana hikâye görevini al */
export const getFirstStoryQuest = (): MainQuestDef => {
  return STORY_QUESTS[0]!
}
