import type { MainQuestDef } from '@/types'

/** Bölüm başlıkları */
export const CHAPTER_TITLES: Record<number, string> = {
  1: 'Köye İlk Adım',
  2: 'Toprağa Kök Salmak',
  3: 'Dört Yana Nam Salmak',
  4: 'Çetin Karşılaşmalar',
  5: 'Köyün Beyi'
}

/** 50 ana hikâye görevi tanımı, 5 bölüm ve her bölümde 10 görev */
export const STORY_QUESTS: MainQuestDef[] = [
  // ============================================================
  // 1. Bölüm "Köye İlk Adım" — Başlangıç rehberi
  // ============================================================
  {
    id: 'main_1_1',
    chapter: 1,
    order: 1,
    title: 'Yeni Bir Başlangıç',
    description: 'Muhtar Gökhan, bu köyde tutunmak istiyorsan önce toprağa sarılman gerektiğini söylüyor. 5 kez mahsul kaldırmayı dene.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'harvestCrops', label: 'Toplam 5 kez ürün hasat et', target: 5 }],
    moneyReward: 300,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_1_2',
    chapter: 1,
    order: 2,
    title: 'Yakın Komşu Candır',
    description: 'Hasan Enişte köyün bakkalını işletir. Onunla daha sık görüş, gönlünü al.',
    npcId: 'chen_bo',
    objectives: [{ type: 'npcFriendship', label: 'Hasan Enişte ile tanışıklık seviyesine ulaş', npcId: 'chen_bo', friendshipLevel: 'acquaintance' }],
    moneyReward: 200,
    friendshipReward: [{ npcId: 'chen_bo', amount: 20 }]
  },
  {
    id: 'main_1_3',
    chapter: 1,
    order: 3,
    title: 'Dere Kenarında Kısmet Aramak',
    description: 'Aylin, köyün en iyi oltacısıdır. Seni dere kenarında balık şansını denemeye çağırıyor.',
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
    title: 'Madene İlk İniş',
    description: 'İsmail, madenin dibinde hem nimet hem tehlike olduğunu söylüyor. Önce bir 5. kata inmeyi dene.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Madende 5. kata ulaş', target: 5 }],
    moneyReward: 500,
    friendshipReward: [{ npcId: 'a_shi', amount: 20 }]
  },
  {
    id: 'main_1_5',
    chapter: 1,
    order: 5,
    title: 'Köy Sofrasının Tadı',
    description: 'Fatma Teyze, çiftçiliğin kolay iş olmadığını, insanın kendini bir tas sıcak yemekle ödüllendirmesi gerektiğini söylüyor.',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Toplam 3 yemek pişir', target: 3 }],
    moneyReward: 300,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 20 }]
  },
  {
    id: 'main_1_6',
    chapter: 1,
    order: 6,
    title: 'Köylüyle Kaynaş',
    description: 'Muhtar Gökhan, köydeki insanları daha iyi tanımanı ve ihtiyaçlarına el vermeni istiyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeQuests', label: 'Toplam 3 görev tamamla', target: 3 }],
    moneyReward: 500,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_1_7',
    chapter: 1,
    order: 7,
    title: 'Marangoz Ocağında İmtihan',
    description: 'Mıstık, ustası Mustafa Usta’nın acilen oduna ihtiyacı olduğunu söylüyor. 30 odun götür de ellerine destek ol.',
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
    title: 'Hekim Dede’nin İsteği',
    description: 'Hekim Dede bir şifa ilacı hazırlamak istiyor ama birkaç demet ota ihtiyacı var. Ona 10 şifalı ot götür.',
    npcId: 'lin_lao',
    objectives: [{ type: 'deliverItem', label: 'Şifalı ot ×10 teslim et', itemId: 'herb', itemQuantity: 10 }],
    moneyReward: 500,
    friendshipReward: [{ npcId: 'lin_lao', amount: 30 }]
  },
  {
    id: 'main_1_9',
    chapter: 1,
    order: 9,
    title: 'İlk Yüz Akı',
    description: 'Muhtar Gökhan yaptıklarından memnun. Biraz daha çalış, elin para görsün.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Toplam 5000 para kazan', target: 5000 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_1_10',
    chapter: 1,
    order: 10,
    title: 'Kökte Tutunmak',
    description: 'Bu köyde gerçekten yer edinmek istiyorsan çiftçilikte elin iyice alışmalı. Çiftçilik becerini 3. seviyeye çıkar.',
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
    description: 'Elif, çiftliğinin yavaş yavaş düzene girdiğini söylüyor. Mahsul kaldırmaya devam et.',
    npcId: 'liu_niang',
    objectives: [{ type: 'harvestCrops', label: 'Toplam 50 kez ürün hasat et', target: 50 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'liu_niang', amount: 20 }]
  },
  {
    id: 'main_2_2',
    chapter: 2,
    order: 2,
    title: 'Madenin Dibine Doğru',
    description: 'İsmail, 20. katın altlarında demir damarları olduğunu söylüyor. Biraz daha derine in.',
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
    title: 'Olta Ehlinin Yolu',
    description: 'Balıkçı Dede, balık tutmanın sabır ve dingin gönül işi olduğunu söylüyor. Biraz daha balık yakala, işin özünü kavra.',
    npcId: 'li_yu',
    objectives: [{ type: 'catchFish', label: 'Toplam 30 balık yakala', target: 30 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'li_yu', amount: 20 }]
  },
  {
    id: 'main_2_4',
    chapter: 2,
    order: 4,
    title: 'Köy Bağı Güçleniyor',
    description: 'Muhtar Gökhan, köy tapınağında bir iş tahtası olduğunu söylüyor. Kayıt/ansiklopedi bölümündeki "Tapınak"a gidip bir görevi tamamla da köye katkın olsun.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeBundles', label: '1 tapınak görevini tamamla', target: 1 }],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_2_5',
    chapter: 2,
    order: 5,
    title: 'Demirci Ocağına Yardım',
    description: 'Ali Usta, yeni aletler dövmek için bir miktar demir cevheri istiyor. Ona 15 demir cevheri götür.',
    npcId: 'sun_tiejiang',
    objectives: [
      { type: 'npcFriendship', label: 'Ali Usta ile tanışıklık seviyesine ulaş', npcId: 'sun_tiejiang', friendshipLevel: 'acquaintance' },
      { type: 'deliverItem', label: 'Demir cevheri ×15 teslim et', itemId: 'iron_ore', itemQuantity: 15 }
    ],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'sun_tiejiang', amount: 30 }]
  },
  {
    id: 'main_2_6',
    chapter: 2,
    order: 6,
    title: 'Çiftlikte Can Bereketi',
    description: 'İbo, hayvan beslemenin ayrı bir keyfi olduğunu söylüyor. 3 hayvan edinmeyi dene.',
    npcId: 'da_niu',
    objectives: [{ type: 'ownAnimals', label: '3 hayvana sahip ol', target: 3 }],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'da_niu', amount: 30 }]
  },
  {
    id: 'main_2_7',
    chapter: 2,
    order: 7,
    title: 'Ocakta Eli Alışmak',
    description: 'Fatma Teyze, yaptığın yemeklerin tadını pek beğendi. Birkaç yemek daha pişir de elin alışsın.',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Toplam 15 yemek pişir', target: 15 }],
    moneyReward: 800,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 20 }]
  },
  {
    id: 'main_2_8',
    chapter: 2,
    order: 8,
    title: 'Köylünün Gönlüne Girmek',
    description: 'Muhtar Gökhan, köylüye çok yardım ettiğini söylüyor. Aynı yolda devam et.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeQuests', label: 'Toplam 10 görev tamamla', target: 10 }],
    moneyReward: 1000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_2_9',
    chapter: 2,
    order: 9,
    title: 'Dört Mevsim Bin Nimet',
    description: 'Hasan Enişte, bu köyün ürününün, nimetinin bol olduğunu söylüyor. Daha çok eşya keşfet.',
    npcId: 'chen_bo',
    objectives: [{ type: 'discoverItems', label: '30 farklı eşya keşfet', target: 30 }],
    moneyReward: 1200,
    friendshipReward: [{ npcId: 'chen_bo', amount: 20 }]
  },
  {
    id: 'main_2_10',
    chapter: 2,
    order: 10,
    title: 'Adın Duyulmaya Başladı',
    description: 'Artık köyde ufaktan tanınır oldun. Birikimini artır, elinin gücünü göster.',
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
    title: 'Derinliğin Meydan Okuması',
    description: 'İsmail, 40. katın altlarında altın damarları olduğunu ama yaratıkların da daha hırçınlaştığını söylüyor.',
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
    description: 'Muhtar Gökhan, köyün yükünü omuzlayan adamlardan biri olmaya başladığını söylüyor. Köylüye yardım etmeyi sürdür.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeQuests', label: 'Toplam 25 görev tamamla', target: 25 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 20 }]
  },
  {
    id: 'main_3_3',
    chapter: 3,
    order: 3,
    title: 'Bilene Danışırlar',
    description: 'Hoca Efendi, köyün nimetleri ve eşyaları hakkında epey şey öğrendiğini fark etmiş. Daha fazlasını keşfet.',
    npcId: 'zhou_xiucai',
    objectives: [{ type: 'discoverItems', label: '50 farklı eşya keşfet', target: 50 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'zhou_xiucai', amount: 20 }]
  },
  {
    id: 'main_3_4',
    chapter: 3,
    order: 4,
    title: 'Lezzet Ehli',
    description: 'Hatice Abla, elinin mutfakta iyice yatkınlaştığını söylüyor. Daha çok yemek dene.',
    npcId: 'pang_shen',
    objectives: [{ type: 'cookRecipes', label: 'Toplam 30 yemek pişir', target: 30 }],
    moneyReward: 1200,
    friendshipReward: [{ npcId: 'pang_shen', amount: 20 }]
  },
  {
    id: 'main_3_5',
    chapter: 3,
    order: 5,
    title: 'Herkes Seni Tanısın',
    description: 'Muhtar Gökhan, köyde kapısını çalmadığın, selam vermediğin kimse kalmasın istiyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'npcAllFriendly', label: 'Tüm köylülerle tanışıklık seviyesine ulaş', friendshipLevel: 'acquaintance' }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_3_6',
    chapter: 3,
    order: 6,
    title: 'Çiftlik Büyüyor',
    description: 'İbo, çiftliğine hayran. Hayvan sayını 8’e çıkar da bereket artsın.',
    npcId: 'da_niu',
    objectives: [{ type: 'ownAnimals', label: '8 hayvana sahip ol', target: 8 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'da_niu', amount: 20 }]
  },
  {
    id: 'main_3_7',
    chapter: 3,
    order: 7,
    title: 'Olta Ustalığına Doğru',
    description: 'Aylin, balıkçılıkta elinin artık iyice oturduğunu söylüyor. Daha da ilerle.',
    npcId: 'qiu_yue',
    objectives: [{ type: 'catchFish', label: 'Toplam 80 balık yakala', target: 80 }],
    moneyReward: 1500,
    friendshipReward: [{ npcId: 'qiu_yue', amount: 20 }]
  },
  {
    id: 'main_3_8',
    chapter: 3,
    order: 8,
    title: 'Sevkiyat Ehli',
    description: 'Bekir, satışa çıkardığın mal çeşitliliğine şaşmış durumda. Ticaretini daha da büyüt.',
    npcId: 'he_zhanggui',
    objectives: [{ type: 'shipItems', label: '15 farklı eşya sevk et', target: 15 }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'he_zhanggui', amount: 20 }]
  },
  {
    id: 'main_3_9',
    chapter: 3,
    order: 9,
    title: 'Bir Sanatta Ustalaş',
    description: 'Hekim Dede, insanın elinde mutlaka bir hüner olması gerektiğini söylüyor. Herhangi bir beceriyi 7. seviyeye çıkar.',
    npcId: 'lin_lao',
    objectives: [{ type: 'skillLevel', label: 'Herhangi bir beceriyi 7. seviyeye çıkar', target: 7 }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'lin_lao', amount: 20 }]
  },
  {
    id: 'main_3_10',
    chapter: 3,
    order: 10,
    title: 'Namın Yayıldı',
    description: 'Adın komşu köylere dek varmış. Birikimini daha da artır, köyün yüz akı ol.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Toplam 40000 para kazan', target: 40000 }],
    moneyReward: 2500,
    itemReward: [{ itemId: 'jade', quantity: 2 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },

  // ============================================================
  // 4. Bölüm "Çetin Karşılaşmalar" — Orta / geç dönem
  // ============================================================
  {
    id: 'main_4_1',
    chapter: 4,
    order: 1,
    title: 'Derinliğin Fatihi',
    description: 'İsmail, madenin daha derinlerinde güçlü bir baş yaratığın saklandığını söylüyor. 80. kata ulaş.',
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
    title: 'Yaratık Avcısı',
    description: 'Baran, dağlarda canavarın çoğaldığını ve birilerinin bunların hakkından gelmesi gerektiğini söylüyor.',
    npcId: 'yun_fei',
    objectives: [{ type: 'killMonsters', label: 'Toplam 150 canavar öldür', target: 150 }],
    moneyReward: 2500,
    friendshipReward: [{ npcId: 'yun_fei', amount: 30 }]
  },
  {
    id: 'main_4_3',
    chapter: 4,
    order: 3,
    title: 'Tapınağa Büyük Katkı',
    description: 'Muhtar Gökhan, tapınak işleri için senden daha çok emek bekliyor. Kayıt/ansiklopedi bölümündeki "Tapınak"a gidip gereken eşyaları teslim et.',
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
    description: 'Muhtar Gökhan gülümseyip artık bir yuva kurmanın vakti gelmedi mi diye soruyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'married', label: 'Sevdiğin kişiyle evlen' }],
    moneyReward: 2000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_4_5',
    chapter: 4,
    order: 5,
    title: 'Usta Ocağı',
    description: 'Fatma Teyze, artık mutfakta onu geçtiğini söylüyor. Daha çok yemek yap, elin iyice açılsın.',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Toplam 50 yemek pişir', target: 50 }],
    moneyReward: 2500,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 20 }]
  },
  {
    id: 'main_4_6',
    chapter: 4,
    order: 6,
    title: 'Bilginin Sonu Yok',
    description: 'Hoca Efendi, artık çoğu kişiden daha çok şey bildiğini düşünüyor. Keşfetmeye devam et.',
    npcId: 'zhou_xiucai',
    objectives: [{ type: 'discoverItems', label: '80 farklı eşya keşfet', target: 80 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'zhou_xiucai', amount: 20 }]
  },
  {
    id: 'main_4_7',
    chapter: 4,
    order: 7,
    title: 'Ticaretin Ustası',
    description: 'Bekir, sevkiyat işinde kurduğun düzen karşısında pek etkilenmiş. Mal çeşitliliğini daha da artır.',
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
    description: 'İnsanın şu dünyada bir gerçek dostu olsa yeter. Bir köylüyle en iyi dost ol.',
    npcId: 'lin_lao',
    objectives: [{ type: 'npcFriendship', label: 'Herhangi bir köylüyle en iyi dost ol', npcId: '_any', friendshipLevel: 'bestFriend' }],
    moneyReward: 2500,
    friendshipReward: [{ npcId: 'lin_lao', amount: 20 }]
  },
  {
    id: 'main_4_9',
    chapter: 4,
    order: 9,
    title: 'Bereketin Sahibi',
    description: 'Elif, çiftliğinin artık köyün en verimli yeri olduğunu söylüyor. Aynı azimle devam et.',
    npcId: 'liu_niang',
    objectives: [{ type: 'harvestCrops', label: 'Toplam 300 kez ürün hasat et', target: 300 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'liu_niang', amount: 20 }]
  },
  {
    id: 'main_4_10',
    chapter: 4,
    order: 10,
    title: 'Yörenin En Varlıklısı',
    description: 'Artık birikimin her yerde konuşuluyor. Muhtar Gökhan, köyün gururu olduğunu söylüyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'earnMoney', label: 'Toplam 100000 para kazan', target: 100000 }],
    moneyReward: 5000,
    itemReward: [{ itemId: 'prismatic_shard', quantity: 1 }],
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },

  // ============================================================
  // 5. Bölüm "Köyün Beyi" — Geç dönem / final
  // ============================================================
  {
    id: 'main_5_1',
    chapter: 5,
    order: 1,
    title: 'Madenin Dibine Varış',
    description: 'İsmail, madenin en altında kadim sırların uyuduğunu söylüyor. 120. kata ulaş ve perdeyi arala.',
    npcId: 'a_shi',
    objectives: [{ type: 'reachMineFloor', label: 'Madende 120. kata ulaş', target: 120 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'a_shi', amount: 30 }]
  },
  {
    id: 'main_5_2',
    chapter: 5,
    order: 2,
    title: 'Kafatası Madeni Yolu',
    description: 'İsmail, ana madenin sonunda Kafatası Madeni’ne çıkan bir yol bulunduğunu, orada daha kıymetli cevherler yattığını söylüyor.',
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
    description: 'Baran, artık köyün en güçlü savaşçılarından biri olduğunu ama yaratıkların hâlâ çoğalmayı sürdürdüğünü söylüyor.',
    npcId: 'yun_fei',
    objectives: [{ type: 'killMonsters', label: 'Toplam 500 canavar öldür', target: 500 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'yun_fei', amount: 30 }]
  },
  {
    id: 'main_5_4',
    chapter: 5,
    order: 4,
    title: 'Her İşte Ustalık',
    description: 'Hekim Dede, gerçek ustanın tek bir işte değil, her işte maharetli olduğunu söyler. Bütün becerilerini 8. seviyeye çıkar.',
    npcId: 'lin_lao',
    objectives: [{ type: 'allSkillsLevel', label: 'Tüm becerileri 8. seviyeye çıkar', target: 8 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'lin_lao', amount: 30 }]
  },
  {
    id: 'main_5_5',
    chapter: 5,
    order: 5,
    title: 'Sofranın Baş Tacı',
    description: 'Fatma Teyze, mutfakta artık doruğa vardığını söylüyor. Yüz yemeğe giden yolda ilerlemeyi sürdür!',
    npcId: 'wang_dashen',
    objectives: [{ type: 'cookRecipes', label: 'Toplam 80 yemek pişir', target: 80 }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'wang_dashen', amount: 30 }]
  },
  {
    id: 'main_5_6',
    chapter: 5,
    order: 6,
    title: 'Aile Ocağı',
    description: 'Muhtar Gökhan gülerek, artık yuva kurduğuna göre bir çocuk sesi duymanın da vakti geldiğini söylüyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'hasChild', label: 'İlk çocuğunu karşıla' }],
    moneyReward: 3000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_5_7',
    chapter: 5,
    order: 7,
    title: 'Köyün Gönül Adamı',
    description: 'Muhtar Gökhan, köyde gönlüne girmediğin kimse kalmasın istiyor.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'npcAllFriendly', label: 'Tüm köylülerle dost ol', friendshipLevel: 'friendly' }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_5_8',
    chapter: 5,
    order: 8,
    title: 'Sevkiyat Defteri Tamamlansın',
    description: 'Bekir, köyde çıkan her malı en az bir kere sevk etmeni istiyor.',
    npcId: 'he_zhanggui',
    objectives: [{ type: 'shipItems', label: '50 farklı eşya sevk et', target: 50 }],
    moneyReward: 5000,
    friendshipReward: [{ npcId: 'he_zhanggui', amount: 30 }]
  },
  {
    id: 'main_5_9',
    chapter: 5,
    order: 9,
    title: 'Tapınağın Son Eksiği',
    description: 'Muhtar Gökhan, tapınaktaki bütün işlerin artık senin omzuna kaldığını söylüyor. Kayıt/ansiklopedi bölümündeki "Tapınak"a gidip kalan görevleri tamamla.',
    npcId: 'liu_cunzhang',
    objectives: [{ type: 'completeBundles', label: 'Tüm 6 tapınak görevini tamamla', target: 6 }],
    moneyReward: 8000,
    friendshipReward: [{ npcId: 'liu_cunzhang', amount: 30 }]
  },
  {
    id: 'main_5_10',
    chapter: 5,
    order: 10,
    title: 'Köyün Beyi',
    description: 'Artık gerçekten bu köyün sözü dinlenen kişisi oldun. Bütün becerilerini doruğa çıkar, varlığını daha da büyüt. Son sınavın budur.',
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
