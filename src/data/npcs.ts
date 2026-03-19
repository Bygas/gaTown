import type { NpcDef } from '@/types'

/** Tüm NPC tanımları */
export const NPCS: NpcDef[] = [
  // ============================================================
  // Mevcut NPC'ler (6)
  // ============================================================
  {
    id: 'chen_bo',
    name: 'Chen Bo',
    gender: 'male',
    role: 'Genel dükkân sahibi',
    personality: 'Yardımsever ve cömert',
    birthday: { season: 'spring', day: 8 },
    lovedItems: ['tea', 'osmanthus', 'ginseng'],
    likedItems: ['cabbage', 'rice', 'potato', 'goat_milk', 'truffle', 'rabbit_foot', 'hanhai_spice'],
    hatedItems: ['copper_ore', 'quartz'],
    dialogues: {
      stranger: ['Müşteri, belli ki buralara yeni geldin, öyle değil mi? Ben ihtiyar Chen Bo, bu genel dükkânın sahibiyim.', '{title}, neye ihtiyacın olursa gel, herkese dürüst davranırım.'],
      acquaintance: ['Haha, {title} yine gelmiş! Bugün ne almak istiyorsun?', 'Son zamanlarda güzel mallar geldi, bir bak istersen.'],
      friendly: ['{player}, gençliğinde dedene çok benziyorsun; çalışkan ve dayanıklısın.', 'Bazı güzel şeyleri sadece senin için ayırıyorum, {title}.'],
      bestFriend: ['{player}, sen benim kendi çocuğum gibisin.', 'Belki bir gün bu dükkânı sana bırakırım... şaka yapıyorum.']
    }
  },
  {
    id: 'liu_niang',
    name: 'Liu Niang',
    gender: 'female',
    role: 'Köy muhtarının kızı',
    personality: 'Nazik ve zeki',
    birthday: { season: 'summer', day: 14 },
    lovedItems: ['chrysanthemum', 'osmanthus', 'peacock_feather'],
    likedItems: ['tea', 'wintersweet', 'rabbit_fur', 'rabbit_foot', 'hanhai_silk'],
    hatedItems: ['iron_ore', 'firewood'],
    dialogues: {
      stranger: ['Merhaba, sen yeni gelen çiftlik sahibi olmalısın, değil mi? Ben Liu Niang.', 'Taoyuan Köyü çok güzeldir, {title}, burayı seveceksin.'],
      acquaintance: ['Bugün hava güzel, {title} sen de dolaşmaya mı çıktın?', 'Eski şiirlerden oluşan bir kitap okuyorum, birlikte bakmak ister misin?'],
      friendly: ['{title} burada olunca köy daha neşeli oldu.', 'Biraz osmanthus keki yaptım, {player}, bir parça dene.'],
      bestFriend: ['{title} ile sohbet etmek her zaman çok keyifli...', 'Bu çiçeği sana veriyorum, dağda buldum.']
    },
    marriageable: true,
    heartEventIds: ['liu_niang_heart_3', 'liu_niang_heart_5', 'liu_niang_heart_8'],
    datingDialogues: [
      'Bugün {player} ile dere kenarında yürümek istiyorum.',
      '{title}, senin için bir koku kesesi işledim, yanında taşı.',
      '{player} ile geçirdiğim her gün, şiirlerde yazdığı kadar güzel.'
    ],
    zhijiDialogues: [
      '{player} ile şiir okuduğum öğleden sonraları benim en değerli zamanlarım.',
      'Bazı şeyleri sadece can dosta söylemek isterim... {title}, hep yanımda olduğun için teşekkür ederim.',
      'Gerçek bir can dostu bulmak hayatta çok zordur. {player} ile karşılaşmak benim şansım.'
    ],
    zhijiHeartEventIds: ['liu_niang_zhiji_7', 'liu_niang_zhiji_9']
  },
  {
    id: 'a_shi',
    name: 'A Shi',
    gender: 'male',
    role: 'Madenci',
    personality: 'Sessiz ve içine kapanık',
    birthday: { season: 'autumn', day: 5 },
    lovedItems: ['ruby', 'jade', 'hanhai_turquoise'],
    likedItems: ['gold_ore', 'iron_ore', 'potato', 'rabbit_foot'],
    hatedItems: ['chrysanthemum', 'wintersweet'],
    dialogues: {
      stranger: ['... Hm.', 'Maden... {title}, dikkatli ol.'],
      acquaintance: ['{title} de madene mi gidiyor?... Kazmanı yanına al.', 'Derinlerde iyi şeyler de var, tehlike de.'],
      friendly: ['Bu cevher parçası iyi, al {title}.', '{player}’ın kazması yükseltilmeli, istersen bakabilirim.'],
      bestFriend: ['... {player}, benim ilk arkadaşım.', 'En derindeki hazineyi... sadece {title}’a söylerim.']
    },
    marriageable: true,
    heartEventIds: ['a_shi_heart_3', 'a_shi_heart_5', 'a_shi_heart_8'],
    datingDialogues: [
      '... {player}, bu cevher çok güzel. Gözlerin gibi.',
      'Eskiden maden en iyi yerdi, ama şimdi... {title}’ın olduğu yer daha iyi.',
      'Pek konuşamam... ama {player} yanımda olunca yeter.'
    ],
    zhijiDialogues: [
      '... Yanımda sen kazı yapınca verimim artıyor gibi.',
      '{player}, bu cevher... sadece gerçek bir can dosta yaraşır.',
      'Konuşmadan da rahat hissetmek... demek ki can dostluk böyle bir şey.'
    ],
    zhijiHeartEventIds: ['a_shi_zhiji_7', 'a_shi_zhiji_9']
  },
  {
    id: 'qiu_yue',
    name: 'Qiu Yue',
    gender: 'female',
    role: 'Balıkçı kız',
    personality: 'Neşeli ve canlı',
    birthday: { season: 'winter', day: 20 },
    lovedItems: ['koi', 'giant_salamander'],
    likedItems: ['crucian', 'carp', 'grass_carp', 'bass', 'rabbit_foot'],
    hatedItems: ['copper_ore', 'iron_ore'],
    dialogues: {
      stranger: ['Aaa, yeni bir yüz! {title} merhaba, ben Qiu Yue, köyün en iyi balıkçısı!', 'Balık tutmayı öğrenmek istersen beni bul!'],
      acquaintance: ['Bugün dere suyu o kadar berrak ki, kesin büyük balık tutarız!', '{title}, balık tutuşun gittikçe daha iyi oluyor.'],
      friendly: ['Burası benim gizli oltalama noktam, sadece {title}’a söylüyorum.', '{player}’a kızarmış sazan yapmayı öğreteyim, çok lezzetlidir!'],
      bestFriend: ['Bundan sonra birlikte balık tutalım mı? Her gün gidelim!', '{title}, gördüğüm en iyi balıkçısın! Hehe.']
    },
    marriageable: true,
    heartEventIds: ['qiu_yue_heart_3', 'qiu_yue_heart_5', 'qiu_yue_heart_8'],
    datingDialogues: [
      '{player}! Bugünkü gün batımı çok güzel, birlikte izleyelim!',
      'Hehe, {title} artık benim, başkası seni alamaz.',
      'Bundan sonra her gün birlikte balık tutalım mı? Sadece ikimiz!'
    ],
    zhijiDialogues: [
      '{player}! Hadi bugün birlikte balık tutalım! Sadece can dostlarımı gizli yerime götürürüm!',
      'Hehe, içinde ne varsa bana anlatabilirsin! Biz can dostuz!',
      'Bundan sonra nereye gidersem gideyim, {title} da benimle gelecek!'
    ],
    zhijiHeartEventIds: ['qiu_yue_zhiji_7', 'qiu_yue_zhiji_9']
  },
  {
    id: 'lin_lao',
    name: 'Lin Lao',
    gender: 'male',
    role: 'Yaşlı hekim',
    personality: 'Şefkatli ve bilgili',
    birthday: { season: 'autumn', day: 22 },
    lovedItems: ['herb', 'tea', 'antler_velvet'],
    likedItems: ['winter_bamboo_shoot', 'bamboo', 'yak_milk', 'camel_milk', 'rabbit_foot', 'hanhai_spice'],
    hatedItems: ['ruby', 'gold_ore'],
    dialogues: {
      stranger: ['Genç adam, buraya yeni geldin; iklime ve suya alışabildin mi?', 'Ben onlarca yıldır hekimlik yapıyorum, {title}, bir rahatsızlığın varsa çekinmeden söyle.'],
      acquaintance: ['Bu bitki çok değerlidir, hem ilaç yapılır hem çay demlenir.', '{title}’ın yüzü buraya ilk geldiğinden çok daha iyi görünüyor.'],
      friendly: ['Bende kuvvet artıran bir şifalı yemek tarifi var.', '{player}’ın dedesi... benim eski dostumdu.'],
      bestFriend: ['Şu “Bitkiler Üzerine Notlar” kitabını sana veriyorum, {title}. İyi çalış.', 'Taoyuan Köyü’nün geleceğini {player}’a emanet ediyorum.']
    }
  },
  {
    id: 'xiao_man',
    name: 'Xiao Man',
    gender: 'male',
    role: 'Marangoz çırağı',
    personality: 'Yaramaz ve meraklı',
    birthday: { season: 'spring', day: 18 },
    lovedItems: ['watermelon', 'sweet_potato'],
    likedItems: ['wood', 'bamboo', 'radish', 'rabbit_foot'],
    hatedItems: ['herb', 'tea'],
    dialogues: {
      stranger: ['Vay, demek yeni gelen sensin! Ben Xiao Man!', '{title}’ın çiftliğine gidip gizlice baktım, bayağı harapmış— şey yani, çok potansiyeli var!'],
      acquaintance: ['Son zamanlarda dolap yapmayı çalışıyorum, {title} bir tane ister mi?', 'Ustam hâlâ el becerimin yetmediğini söylüyor, hıh!'],
      friendly: ['{title}’ın aletlerini tamir edeyim! Söz, mis gibi çalışır!', 'Hehe, {player}’a gizlice indirim yaparım.'],
      bestFriend: ['Bir gün köyün en büyük evini yapacağım! {title}, tasarımda yardım eder misin?', '{player} benim en iyi arkadaşım! ...Ama kimseye söyleme.']
    }
  },

  // ============================================================
  // Yeni evlenilebilir NPC'ler (9) — toplam 12 evlenilebilir
  // ============================================================
  {
    id: 'chun_lan',
    name: 'Chun Lan',
    gender: 'female',
    role: 'Çayhane sahibi kadın',
    personality: 'Zarif ve ağırbaşlı',
    birthday: { season: 'spring', day: 3 },
    lovedItems: ['tea', 'osmanthus', 'chrysanthemum'],
    likedItems: ['honey', 'lotus_seed', 'peach', 'rabbit_foot', 'hanhai_silk'],
    hatedItems: ['iron_ore', 'copper_ore'],
    dialogues: {
      stranger: ['Buyurun, bir fincan çay için. Ben Chun Lan, bu çayhane atalarımdan kaldı.', '{title} çayı seviyorsa bundan sonra sık sık uğrasın.'],
      acquaintance: ['Bugün erken hasat Longjing çayı demledim, {title} bir tatsın mı?', 'Çay yaprakları, sabah çiği kurumadan toplanmalı; o zaman en taze olurlar.'],
      friendly: ['{player}’ın damak tadını hatırladım, sevdiğin çayı özellikle ayırdım.', 'Birkaç dönüm çay bahçem var, bir gün {title}’ı gezdireyim.'],
      bestFriend: ['{title} ile çay içtiğim zamanlar günümün en çok beklediğim anları.', 'Bu fincan çay, sadece {player} için demlendi.']
    },
    marriageable: true,
    heartEventIds: ['chun_lan_heart_3', 'chun_lan_heart_5', 'chun_lan_heart_8'],
    datingDialogues: [
      'Bu fincan çayı {player} için özel karıştırdım, tadına bak.',
      '{title} ile çay içtiğim öğleden sonralar benim en kıymetli zamanlarım.',
      '{player}, bundan sonraki her gün, seninle aynı demlikten çay içmek istiyorum.'
    ],
    zhijiDialogues: [
      'Bu fincan çay sadece can dosta demlenir. {player}, afiyet olsun.',
      'Eskiden çayhanenin yükünü hep tek başıma taşırdım. {title} yanımdayken çok daha kolay.',
      'Can dostla birlikte çay içmek, hayattaki en büyük mutluluklardan biridir.'
    ],
    zhijiHeartEventIds: ['chun_lan_zhiji_7', 'chun_lan_zhiji_9']
  },
  {
    id: 'xue_qin',
    name: 'Xue Qin',
    gender: 'female',
    role: 'Ressam',
    personality: 'Gururlu ve mesafeli',
    birthday: { season: 'winter', day: 10 },
    lovedItems: ['snow_lotus', 'moonstone'],
    likedItems: ['chrysanthemum', 'wintersweet', 'bamboo', 'rabbit_foot', 'hanhai_turquoise'],
    hatedItems: ['pickled_cabbage', 'dried_radish'],
    dialogues: {
      stranger: ['... Işığımı kapatıyorsun.', 'Resim almayacaksan lütfen boyalara dokunma.'],
      acquaintance: ['{title} resimle ilgileniyor mu? Zevkin fena değil.', 'Bu manzara resmi, köyün arkasındaki şelaleden ilham aldı.'],
      friendly: ['{player}, çiftliğin gün batımında çok güzel görünüyor, bir resmini yaptım.', 'Normalde kalabalığı sevmem... ama {title} gelince fena olmuyor.'],
      bestFriend: ['Eskiden kimsenin resimlerimi anlamadığını düşünürdüm... ta ki {player} ile tanışana kadar.', 'Bu tabloyu {title} için yaptım, iyi sakla.']
    },
    marriageable: true,
    heartEventIds: ['xue_qin_heart_3', 'xue_qin_heart_5', 'xue_qin_heart_8'],
    datingDialogues: [
      '... {player}, kıpırdama, şu anki halini çizmek istiyorum.',
      'Eskiden güzelliği sadece resimlerde arardım, ama şimdi... {title} resimlerden daha güzel.',
      'Bu tablonun adı “Yuva”. Çünkü senin sayende benim de bir yuvam var.'
    ],
    zhijiDialogues: [
      '... Resim yaparken beni sinirlendirmeden izleyebilen tek kişi sensin. Demek can dostluk böyle bir şey.',
      'Bu tablonun teması “Gönül dostu”... ilhamını {player}’dan aldı.',
      'Eskiden dünyada beni anlayan kimse yok sanırdım. Artık öyle düşünmüyorum.'
    ],
    zhijiHeartEventIds: ['xue_qin_zhiji_7', 'xue_qin_zhiji_9']
  },
  {
    id: 'su_su',
    name: 'Su Su',
    gender: 'female',
    role: 'Terzi',
    personality: 'Sakin ve becerikli',
    birthday: { season: 'summer', day: 3 },
    lovedItems: ['silk', 'wintersweet', 'alpaca_wool', 'peacock_feather'],
    likedItems: ['wool', 'chrysanthemum', 'osmanthus', 'rabbit_fur', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'stone'],
    dialogues: {
      stranger: ['Su Terzihanesi’ne hoş geldin, ben Su Su.', 'Ne tür kıyafete ihtiyacın varsa söyle, {title}.'],
      acquaintance: ['{title}’ın kıyafeti yırtılmış, bırak ben dikeceğim.', 'Bu kumaşın deseni çok özel, baharlık elbise için uygun.'],
      friendly: ['{player} için bir yelek diktim, üstüne oluyor mu dene bakalım.', 'Her iğne ve her dikiş, kalpten gelen bir emektir...'],
      bestFriend: ['{player}’ın benim diktiğim kıyafetleri giymesi beni en çok mutlu eden şey.', 'Bundan sonra sadece {title} için kıyafet dikeceğim.']
    },
    marriageable: true,
    heartEventIds: ['su_su_heart_3', 'su_su_heart_5', 'su_su_heart_8'],
    datingDialogues: [
      '{player} için bir kıyafet dikiyorum, her ilmekte kalbim var.',
      '{title} benim diktiğim kıyafetleri giydiğinde en mutlu olduğum an o oluyor.',
      'Bundan sonra sadece {player} için kıyafet dikeyim... olur mu?'
    ],
    zhijiDialogues: [
      '{player} için yaptığım giysilerin her dikişinde daha çok özen var... çünkü sen benim can dostumsun.',
      'İçim sıkıldığında {title}’ı düşünmek bana huzur veriyor.',
      'Can dostların çok söze ihtiyacı olmaz... ama yine de {player} ile daha çok konuşmak istiyorum.'
    ],
    zhijiHeartEventIds: ['su_su_zhiji_7', 'su_su_zhiji_9']
  },
  {
    id: 'hong_dou',
    name: 'Hong Dou',
    gender: 'female',
    role: 'Şaraphane sahibi',
    personality: 'Açık sözlü ve cömert',
    birthday: { season: 'autumn', day: 10 },
    lovedItems: ['watermelon_wine', 'peach_wine', 'jujube_wine'],
    likedItems: ['watermelon', 'peanut', 'corn', 'rabbit_foot'],
    hatedItems: ['tea', 'herb'],
    dialogues: {
      stranger: ['Hey, bir testi ister misin? Ben Hong Dou, bu şaraphanenin sahibiyim!', 'İçmesen de olur, gel otur, {title}, çekinme.'],
      acquaintance: ['Bu yılın şeftali şarabı çok iyi oldu, {title}, bir kâse ister misin?', 'Şarap yapmanın sırrı şudur: emek! Ve bolca sabır.'],
      friendly: ['{player} artık iyi dostum sayılır, bu küp şarap senin olsun!', 'Bir dahaki sefere içki oyunu oynayalım, kaybeden hesabı ödesin!'],
      bestFriend: ['Köyde sadece {title}, benim saklı şarabımı içmeyi hak ediyor.', '{player} varken şarabın tadı daha güzel.']
    },
    marriageable: true,
    heartEventIds: ['hong_dou_heart_3', 'hong_dou_heart_5', 'hong_dou_heart_8'],
    datingDialogues: [
      '{player}! Gel, benimle bir kadeh iç! Bugünkü şarap özellikle tatlı.',
      'Hey, {title}, yüzümü kızartan tek kişi sensin.',
      'Bundan sonra şaraphanedeki bütün şaraplar {player} için ayrılacak! Kimse el süremeyecek!'
    ],
    zhijiDialogues: [
      '{player}! Gel! Can dost arasında içki içerken çekinmeye gerek yok! Şerefe!',
      'Dünyada benimle içki yarışına girebilecek tek kişi {title}! İşte buna can dost denir!',
      'Senin gibi bir can dostum varken, en sert içki bile tatlı geliyor.'
    ],
    zhijiHeartEventIds: ['hong_dou_zhiji_7', 'hong_dou_zhiji_9']
  },
  {
    id: 'dan_qing',
    name: 'Dan Qing',
    gender: 'male',
    role: 'Bilgin',
    personality: 'Nazik ve kültürlü',
    birthday: { season: 'spring', day: 22 },
    lovedItems: ['tea', 'bamboo'],
    likedItems: ['chrysanthemum', 'osmanthus', 'pine_cone', 'rabbit_foot'],
    hatedItems: ['copper_ore', 'firewood'],
    dialogues: {
      stranger: ['Ben Dan Qing. Gezerek eğitim alırken bu cennet manzarası beni burada tuttu.', '{title} da kitap okumayı seven biri mi?'],
      acquaintance: ['Bugün güzel bir metin okudum, bunu {title} ile paylaşayım.', '"Dağ yüksek olmak zorunda değildir; içinde ermiş varsa ünlenir."—Taoyuan Köyü de böyledir.'],
      friendly: ['{player}, bir gün senin için hat yazacağım.', 'Senin gibi bir can dosta sahip olmak, bu hayatta pişmanlıksız yaşamak demek.'],
      bestFriend: ['{player} ile karşılaşmasaydım, çoktan buradan gitmiş olurdum.', 'Kalem, mürekkep ve kâğıt bile {title}’ın bir gülümsemesine denk değil.']
    },
    marriageable: true,
    heartEventIds: ['dan_qing_heart_3', 'dan_qing_heart_5', 'dan_qing_heart_8'],
    datingDialogues: [
      'Bugün {player} hakkında bir şiir yazdım... dinlemek ister misin?',
      '{title} ile tanışmadan önce hayatımı sadece kitaplarla geçireceğimi sanıyordum.',
      '{player}, “Elini tutup seninle yaşlanmak istiyorum.”'
    ],
    zhijiDialogues: [
      'Yüksek dağlar, akan sular... sonunda gerçek ruh eşini buldum. {player}, sen benim aradığım kişisin.',
      'Bugün yine yeni bir metin yazdım, ilk olarak {title}’a göstermek istedim.',
      '{player} gibi bir can dosta sahipken, sade bir ömür sürsem bile ne pişmanlığım olur ki?'
    ],
    zhijiHeartEventIds: ['dan_qing_zhiji_7', 'dan_qing_zhiji_9']
  },
  {
    id: 'a_tie',
    name: 'A Tie',
    gender: 'male',
    role: 'Demirci çırağı',
    personality: 'Saf ve dürüst',
    birthday: { season: 'autumn', day: 15 },
    lovedItems: ['iron_ore', 'gold_ore'],
    likedItems: ['copper_ore', 'potato', 'corn', 'rabbit_foot'],
    hatedItems: ['chrysanthemum', 'silk'],
    dialogues: {
      stranger: ['Aa, se-selam! Ben A Tie... Usta Sun’ın çırağıyım.', 'Demir dövmek zor ama çok ilginç... {title} bakmak ister mi?'],
      acquaintance: ['{title}’ın tamir edilmesi gereken aletleri var mı? Be-ben yardım edebilirim.', 'Bugün çok güzel bir bıçak yaptım, Usta Sun sonunda beni övdü!'],
      friendly: ['{player}’ın aletlerine gizlice biraz daha sağlam malzeme ekledim.', '{title}, benim beceriksizliğimle dalga geçmeyen tek kişi...'],
      bestFriend: ['{player}... beni hep cesaretlendirdiğin için teşekkür ederim.', 'Ustalığımı alınca ilk eserimi {title}’a vereceğim.']
    },
    marriageable: true,
    heartEventIds: ['a_tie_heart_3', 'a_tie_heart_5', 'a_tie_heart_8'],
    datingDialogues: [
      '{player} için demirden bir çiçek yaptım... çirkin olduysa atabilirsin...',
      '{title} yanımda durup beni izleyince, çekicim bile daha hafif geliyor.',
      '{player}... Ustalığımı almak için çok çalışacağım, sonra da... sana ömür boyu bakacağım.'
    ],
    zhijiDialogues: [
      '{player} yanımda olunca demir dövmek daha da kolay geliyor! Demek can dostluk böyle bir şey!',
      'Senin için yeni bir alet yaptım, başkalarına yaptıklarımdan daha dayanıklı!',
      '{title} benim en iyi kardeşim! ...Yani, can dostum!'
    ],
    zhijiHeartEventIds: ['a_tie_zhiji_7', 'a_tie_zhiji_9']
  },
  {
    id: 'yun_fei',
    name: 'Yun Fei',
    gender: 'male',
    role: 'Avcı',
    personality: 'Asi ve özgür ruhlu',
    birthday: { season: 'summer', day: 8 },
    lovedItems: ['wild_mushroom', 'ginseng'],
    likedItems: ['pine_cone', 'herb', 'wild_berry', 'rabbit_foot'],
    hatedItems: ['gold_ore', 'jade'],
    dialogues: {
      stranger: ['Fazla yaklaşma, insanlarla uğraşmayı sevmem.', 'Dağlarda yaşamaya alıştım, köy fazla gürültülü.'],
      acquaintance: ['... {title} yine mi geldi. Neyse, otur.', 'Bunlar dağ mantarı, sizin yetiştirdiklerinizden daha lezzetli.'],
      friendly: ['{player}, beni rahatsız etmeyen az sayıdaki insandan birisin.', 'Bir dahaki dağ yolculuğunda {title} da gelsin, yolları iyi bilirim.'],
      bestFriend: ['Bu hayatta kimseye güvenmedim... {player} dışında.', '{title}, gel bu ormanı birlikte koruyalım.']
    },
    marriageable: true,
    heartEventIds: ['yun_fei_heart_3', 'yun_fei_heart_5', 'yun_fei_heart_8'],
    datingDialogues: [
      '... {player}, bu gece ay ışığı güzel. Biraz benimle otur.',
      'Eskiden sadece kendime güvenirdim. Şimdi... {title}’a da güveniyorum.',
      'Bu dağı bundan sonra {player} ile birlikte koruyacağım.'
    ],
    zhijiDialogues: [
      '... Eskiden kimseye güvenmezdim. Ama sen farklısın, {player}.',
      'Dağa giden yolu sadece sana gösterdim. Bu bile yeter.',
      'Can dost... arkadaştan daha ağır gelir, kardeşten geri kalmaz.'
    ],
    zhijiHeartEventIds: ['yun_fei_zhiji_7', 'yun_fei_zhiji_9']
  },
  {
    id: 'da_niu',
    name: 'Da Niu',
    gender: 'male',
    role: 'Çiftlik delikanlısı',
    personality: 'Dürüst ve sıcak kanlı',
    birthday: { season: 'winter', day: 3 },
    lovedItems: ['milk', 'hay', 'goat_milk', 'buffalo_milk', 'yak_milk'],
    likedItems: ['egg', 'corn', 'sweet_potato', 'truffle', 'donkey_milk', 'rabbit_foot'],
    hatedItems: ['ruby', 'moonstone'],
    dialogues: {
      stranger: ['Hey! Merhaba merhaba! Ben Da Niu! En çok inekleri severim!', '{title} hayvan yetiştiriyor mu? Sana öğretebilirim!'],
      acquaintance: ['Bizim yaşlı sarı ineğin bugün keyfi çok yerinde!', '{title}, şu kuzuyu sev bakalım, yumuşak değil mi?'],
      friendly: ['{player}’ın tavukları harika yetişmiş, tam benim gençliğimdeki gibi!', 'Bir ara bize gel, yeni doğan buzağıyı sana göstereyim, {title}!'],
      bestFriend: ['{player}, gördüğüm en iyi hayvan bakıcısısın!', '{title}, ileride beraber büyük bir çiftlik açalım mı?']
    },
    marriageable: true,
    heartEventIds: ['da_niu_heart_3', 'da_niu_heart_5', 'da_niu_heart_8'],
    datingDialogues: [
      '{player}! Bugün buzağı doğdu! İlk sana söylemek istedim!',
      'Hehe, {title} ile birlikte olmak, ineklerle olmaktan bile daha keyifli!',
      'Bir gün bizim çiftliğimiz köyün en büyüğü olacak! {player}, inanıyor musun?'
    ],
    zhijiDialogues: [
      '{player}! Sen benim en sıkı dostumsun! Fu Bao’dan bile daha sıkı!',
      'Benimle inek bakıp yağmurda kalmak, koyun gütmek... bunları seninle yapmak her şeyden güzel!',
      'Hadi ikimiz birlikte çiftlik kuralım! Can dost ortak olursa yenilmez olur!'
    ],
    zhijiHeartEventIds: ['da_niu_zhiji_7', 'da_niu_zhiji_9']
  },
  {
    id: 'mo_bai',
    name: 'Mo Bai',
    gender: 'male',
    role: 'Müzisyen',
    personality: 'Sessiz ve melankolik',
    birthday: { season: 'spring', day: 12 },
    lovedItems: ['bamboo', 'moonstone'],
    likedItems: ['tea', 'chrysanthemum', 'pine_cone', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'pickled_cabbage'],
    dialogues: {
      stranger: ['... Merhaba. Enstrüman çalışıyorum, lütfen çok ses çıkarma.', 'Ben Mo Bai, buralara sürüklenip gelmiş bir gezgin müzisyenim.'],
      acquaintance: ['{title} da müzik dinlemeyi seviyor mu? Bir gün senin için çalarım.', 'Bu parçanın adı “Sonbahar Suyu”, Taoyuan Köyü için yazdım.'],
      friendly: ['{player} gelmiş, iyi oldu; yeni bir beste yaptım, dinler misin?', '{title} beni dinlerken... ruhum biraz daha hafifliyor.'],
      bestFriend: ['Bu bestenin adı yok... çünkü onu {player} için yazdım.', '{title}, benim gerçek ruh eşim.']
    },
    marriageable: true,
    heartEventIds: ['mo_bai_heart_3', 'mo_bai_heart_5', 'mo_bai_heart_8'],
    datingDialogues: [
      '... {player}, bu parçayı sadece senin için çalıyorum.',
      'Eskiden müziğin yalnızlık olduğunu sanırdım... {title} ile tanışınca onun sıcaklık da olabileceğini anladım.',
      '{player} için bir beste yapacağım, adı da “Eve Dönen” olacak.'
    ],
    zhijiDialogues: [
      'Gerçek bir dinleyici bulmak çok zor... {player}, benim müziğimi anlayan tek kişi sensin.',
      'Senin için yazdığım besteler giderek çoğalıyor... can dostluğun gücü gerçekten tuhaf.',
      '{title} yanımdayken melodilerim bile daha sıcak geliyor.'
    ],
    zhijiHeartEventIds: ['mo_bai_zhiji_7', 'mo_bai_zhiji_9']
  },

  // ============================================================
  // Evlenilemeyen NPC'ler (22) — toplam 22 evlenilemez
  // ============================================================
  {
    id: 'wang_dashen',
    name: 'Wang Teyze',
    gender: 'female',
    role: 'Köy aşçısı',
    personality: 'Yardımsever ve iyi kalpli',
    birthday: { season: 'summer', day: 18 },
    lovedItems: ['rice', 'sesame_oil'],
    likedItems: ['cabbage', 'radish', 'egg', 'rabbit_foot'],
    hatedItems: ['quartz', 'obsidian'],
    dialogues: {
      stranger: ['Ayy, yeni geldin herhâlde? Dal gibi zayıfsın, gel gel, teyzen sana bir kâse pilav koysun!', 'Ben Wang Teyze, köydeki düğünlerin ve törenlerin baş aşçısıyım!'],
      acquaintance: ['{title} bugün yemek yedi mi? Yemediyse sana sıcak bir çorba koyayım.', 'Yemek yapmanın sırrı şudur: tuz az, sevgi çok olacak.'],
      friendly: ['{player} gittikçe daha güçlü görünüyor, demek ki teyzemin yemeklerinden bolca yemiş!', 'Bu benim özel yemeğimdir, {title} bir tatsın.'],
      bestFriend: ['{player} benim kendi çocuğum gibi; seni oradan oraya koştururken görünce içim sızlıyor.', 'Ne zaman evleniyorsun ha? Düğününü teyzen düzenler!']
    }
  },
  {
    id: 'zhao_mujiang',
    name: 'Zhao Usta',
    gender: 'male',
    role: 'Marangoz ustası',
    personality: 'Sert ve ciddi',
    birthday: { season: 'autumn', day: 1 },
    lovedItems: ['wood', 'bamboo'],
    likedItems: ['pine_resin', 'camphor_oil', 'rabbit_foot'],
    hatedItems: ['watermelon', 'peanut'],
    dialogues: {
      stranger: ['Hm? Benimle işin mi var? Ben Zhao Usta. El işiyle ilgiliyse, açık konuş.', 'Xiao Man o velet yine kaytarıyordur herhâlde...'],
      acquaintance: ['Senin çiftlik evinin yapısı sağlam, eskilerin işi. {title}, iyi bakım yap.', 'Ağaç dediğin şey insan gibidir; damarına göre davranmak gerekir.'],
      friendly: ['{player}, fena değilsin; işini sağlam yapıyorsun, Xiao Man denen afacana hiç benzemiyorsun.', 'Tamir ettirmen gereken bir şey olursa {title}’ı... yok, beni bul.'],
      bestFriend: ['{player}, bana gençliğimi hatırlatıyorsun.', 'Bu rende otuz yıldır benimleydi, artık {title}’ın olsun.']
    }
  },
  {
    id: 'sun_tiejiang',
    name: 'Usta Sun',
    gender: 'male',
    role: 'Demirci',
    personality: 'Kaba ama yiğit',
    birthday: { season: 'winter', day: 15 },
    lovedItems: ['gold_ore', 'iridium_ore', 'copper_ore'],
    likedItems: ['iron_ore', 'crystal_ore', 'rabbit_foot'],
    hatedItems: ['chrysanthemum', 'silk'],
    dialogues: {
      stranger: ['Demir işi mi var? O zaman doğru yere geldin! Ben Usta Sun!', 'A Tie benim çırağım, daha çok hamuru var. {title}’ın aletleriyle ben ilgilenirim.'],
      acquaintance: ['İyi çelik keskin ağızda kullanılır; {title}’ın aletlerini yükseltmenin vakti geldi.', 'Şu çekiç sesini dinle— tıkır tıkır, şarkıdan güzel!'],
      friendly: ['{player}, bu bıçağı üç gün üç gece dövdüm, bir dene.', 'Senin gibi iyi müşterim olunca ben de daha hevesle çalışıyorum!'],
      bestFriend: ['Köydeki en iyi demir işleri hep {player}’ın elinde.', '{title} bir gün efsanevi bir silah isterse gelsin, Sun halleder!']
    }
  },
  {
    id: 'zhang_popo',
    name: 'Büyükanne Zhang',
    gender: 'female',
    role: 'Yaşlı dokumacı',
    personality: 'Şefkatli ve biraz geveze',
    birthday: { season: 'spring', day: 7 },
    lovedItems: ['wool', 'silk'],
    likedItems: ['tea', 'pumpkin', 'sweet_potato', 'rabbit_foot'],
    hatedItems: ['gold_ore', 'ruby'],
    dialogues: {
      stranger: ['Ayy, genç biri gelmiş? Gel otur otur. Ben Zhang nine, ömrümü dokumayla geçirdim.', 'Şu üstündeki kıyafet hiç olmamış, bak ninen sana bir tane dokusun.'],
      acquaintance: ['{title} gelmiş? Bir çay iç. Eski günlerden biraz anlatayım sana.', 'Ben gençken bu köy ne kadar hareketliydi bir bilsen...'],
      friendly: ['{player} ne kadar iyi bir çocuk. Nine senin için bir atkı ördü.', 'Deden eskiden sık sık gelip benimle sohbet ederdi; sen de onun gibi yumuşak huylusun.'],
      bestFriend: ['{player} yanımdayken içim rahat ediyor.', 'Bu yaşa geldim, {title} kadar içimi ferahlatan genç az gördüm.']
    }
  },
  {
    id: 'li_yu',
    name: 'Yaşlı Balıkçı Li',
    gender: 'male',
    role: 'Yaşlı balıkçı',
    personality: 'Sakin ve dünyevi şeylerden uzak',
    birthday: { season: 'summer', day: 22 },
    lovedItems: ['koi', 'sturgeon'],
    likedItems: ['crucian', 'bass', 'tea', 'rabbit_foot'],
    hatedItems: ['gold_ore', 'ruby'],
    dialogues: {
      stranger: ['Heh, demek yeni bir balıkçı daha geldi. Ben yaşlı Li, şu dere kenarında yirmi yıldır otururum.', 'Balık tutmak mı? Aceleye gelmez.'],
      acquaintance: ['Olta, elin uzantısıdır; zihin sakin olursa balık kendi gelir.', '{title}, bugün şansın nasıl?'],
      friendly: ['{player}’ın balıkçılığı gelişmiş, biraz gençliğimdeki bana benzemeye başladı.', 'Bu tekniğin adı “Düşen Yaprak İğnesi”, artık {title}’a öğrettim.'],
      bestFriend: ['Bir olta, bir misina, bir testi şarap... yanımda {player} gibi biri varken hayat boşa geçmemiş demektir.', 'Hayat boyu bildiğim ne varsa artık {title}’a bırakıyorum.']
    }
  },
  {
    id: 'zhou_xiucai',
    name: 'Bilgin Zhou',
    gender: 'male',
    role: 'Özel okul öğretmeni',
    personality: 'Tatlı biçimde tutucu',
    birthday: { season: 'autumn', day: 18 },
    lovedItems: ['bamboo', 'tea'],
    likedItems: ['chrysanthemum', 'osmanthus', 'rabbit_foot'],
    hatedItems: ['pickled_cabbage', 'corn_wine'],
    dialogues: {
      stranger: ['"Uzaklardan gelen dost için ne büyük sevinçtir." Ben Bilgin Zhou, buradaki özel okulun öğretmeniyim.', '{title}, hiç Analektler okudun mu?'],
      acquaintance: ['Eskileri tekrar etmek yeniyi anlamayı sağlar. {title}, son zamanlarda bir şeyler okudun mu?', 'Bugün A Hua ile Shi Tou’ya yazı öğrettim; o iki afacan... ah ah.'],
      friendly: ['{player} çiftçi olsa da bir bilginin duruşuna sahip.', 'Yeni bir antik kitap buldum, {title} birlikte incelemek ister mi?'],
      bestFriend: ['{player}, benim en değerli dostumsun!', 'Bu fırça ustamın yadigârıydı, artık {title}’ın olsun; iyi kullan.']
    }
  },
  {
    id: 'wu_shen',
    name: 'Teyze Wu',
    gender: 'female',
    role: 'Bakkalda yardımcı',
    personality: 'Kurnaz ve hayatı bilen',
    birthday: { season: 'spring', day: 25 },
    lovedItems: ['honey', 'sesame_oil'],
    likedItems: ['egg', 'rice', 'peanut', 'rabbit_foot'],
    hatedItems: ['wild_mushroom', 'pine_cone'],
    dialogues: {
      stranger: ['Yeni gelen sensin ha? Genel dükkân için Chen Bo’yu bul, ufak tefek işler için beni çağır.', 'Ben Teyze Wu, dükkânda yardımcıyım.'],
      acquaintance: ['{title}, bugünkü lahanalar çok taze, biraz alır mısın?', 'Chen Bo’nun kalbi fazla yumuşak, herkese veresiye açıyor; ben öyle değilim.'],
      friendly: ['{player}’ın işleri iyi gidiyor ha! Gizlice söyleyeyim, sonraki mallardan iyilerini sana ayırırım.', 'İnsan hesaplı olmazsa rahat yaşayamaz.'],
      bestFriend: ['{player}, gördüğüm en becerikli gençlerden biri.', 'Bir şeye ihtiyacın olursa Teyze Wu’yu bul; {title} isteyince ben yardım ederim.']
    }
  },
  {
    id: 'ma_liu',
    name: 'Ma Liu',
    gender: 'male',
    role: 'Gezgin satıcı',
    personality: 'Ağzı laf yapan',
    birthday: { season: 'winter', day: 25 },
    lovedItems: ['jade', 'prismatic_shard'],
    likedItems: ['gold_ore', 'honey', 'peach', 'rabbit_foot'],
    hatedItems: ['stone', 'wood'],
    dialogues: {
      stranger: ['Aman aman {title}! Ben Ma Liu, diyar diyar gezen tüccarım! Acayip şeylerim çoktur!', 'Gel gel bak, dışarıda bulamazsın bunları!'],
      acquaintance: ['{title} geldi! Bugün sana özel şeyler göstereceğim— hem de tek bende!', 'Ticarette önemli olan güvendir... hehe, tabii biraz da kâr.'],
      friendly: ['{player}, artık eski müşterimsin, sana yüzde yirmi indirim!', 'Dünyayı dolaştım ama en huzurlu köy {title}’ın köyü çıktı.'],
      bestFriend: ['{player}, en çok güvendiğim insan sensin; bu mallarda önce sen seç.', 'Ağzım laf yapar ama {title}’ın yanında söylediklerim hep içtendir.']
    }
  },
  {
    id: 'lao_song',
    name: 'Yaşlı Song',
    gender: 'male',
    role: 'Gece bekçisi',
    personality: 'Sakin ve az konuşan',
    birthday: { season: 'summer', day: 10 },
    lovedItems: ['tea', 'firewood'],
    likedItems: ['wood', 'pine_resin', 'herb', 'rabbit_foot'],
    hatedItems: ['watermelon', 'peach'],
    dialogues: {
      stranger: ['... Hm. Ben Song. Gece nöbeti tutarım.', 'Gece bir ses duyarsan, {title}, panik yapma.'],
      acquaintance: ['Geç oldu, {title}, erkenden eve dön.', 'Ay çok parlak bu gece...'],
      friendly: ['{player}, çalışkan birisin; horozdan önce kalkıyorsun.', 'Bu sıcak çayı {title} için ayırdım, gece ısın diye.'],
      bestFriend: ['Yirmi yıldır gece bekçiliği yapıyorum; benimle konuşmak isteyen az insan çıktı, {player} onlardan biri.', '{title} burada olunca içim daha rahat.']
    }
  },
  {
    id: 'pang_shen',
    name: 'Teyze Pang',
    gender: 'female',
    role: 'Tofu dükkânı sahibi',
    personality: 'Sert ama dobra',
    birthday: { season: 'autumn', day: 25 },
    lovedItems: ['broad_bean', 'sesame'],
    likedItems: ['rice', 'peanut', 'cabbage', 'rabbit_foot'],
    hatedItems: ['ruby', 'jade'],
    dialogues: {
      stranger: ['Tofu almaya geldin değil mi? Tazecik! Ben Teyze Pang!', '{title}, kiloluyum diye yavaş sanma, işte çevikliğime yetişemezsin!'],
      acquaintance: ['Bugünkü tofu çorbası çok yumuşak oldu, {title}, bir kâse ister misin?', 'Tofu yaparken en önemli şey sudur; bizim köyün kaynak suyu bir başka!'],
      friendly: ['{player}, sana sert tofu ayırdım, götür çorba yap!', 'Dürüst birisin; Ma Liu gibi kaypak değilsin.'],
      bestFriend: ['{player}, ne zaman düğün yemeği vereceksin ha?', '{title}, artık benim yarı çocuğum sayılırsın!']
    }
  },
  {
    id: 'a_hua',
    name: 'A Hua',
    gender: 'female',
    role: 'Chen Bo’nun torunu',
    personality: 'Saf ve neşeli',
    birthday: { season: 'spring', day: 1 },
    lovedItems: ['watermelon', 'wild_berry'],
    likedItems: ['peach', 'honey', 'peanut', 'rabbit_foot'],
    hatedItems: ['herb', 'ginseng'],
    dialogues: {
      stranger: ['Sen kimsin? Benim adım A Hua! Dedem yabancılarla konuşma dedi... aa konuştum!', '{title}, ne ekiyorsun? Güzel mi, değil mi?'],
      acquaintance: ['{title}! Bugün Shi Tou yine bana sataştı! Hıh!', 'Öğretmen Zhou bana “çiçek” karakterini yazmayı öğretti ama çok zor.'],
      friendly: ['{player}, bak ne güzel taş buldum!', 'En çok {title}’ı seviyorum! Shi Tou’dan yüz kat daha çok!'],
      bestFriend: ['{player}, sana bir resim yaptım! Bak, burada sen tarla sürüyorsun.', 'Büyüyünce ben de {title} kadar güçlü olacağım!']
    }
  },
  {
    id: 'shi_tou',
    name: 'Shi Tou',
    gender: 'male',
    role: 'Köyün afacanı',
    personality: 'Yaramaz ve ele avuca sığmaz',
    birthday: { season: 'summer', day: 25 },
    lovedItems: ['sweet_potato', 'watermelon'],
    likedItems: ['wild_berry', 'corn', 'peanut', 'rabbit_foot'],
    hatedItems: ['tea', 'herb'],
    dialogues: {
      stranger: ['Hehehe! Demek yeni gelen çiftçi sensin? Pek de güçlü görünmüyorsun!', 'Ben Shi Tou! Köyde en hızlı koşan benim!'],
      acquaintance: ['{title}, koşu yarışı yapalım mı?', 'Bugün öğretmen Zhou’nun mürekkebine su kattım, fark etmedi! Hehe!'],
      friendly: ['{player}, bana balık tutmayı öğretsene! Qiu Yue abla çok gürültü yapıyorum diye beni kovuyor!', 'Sana bir sır vereyim {title}— köyün arkasındaki mağarada yarasalar var!'],
      bestFriend: ['Aslında... {player}, annemle babam dışarıda çalışıyor, uzun zamandır dönmediler.', '{title}, sen köyde kalacaksın değil mi? Gitme olur mu?']
    }
  },
  {
    id: 'hui_niang',
    name: 'Hui Niang',
    gender: 'female',
    role: 'Nakış dükkânı sahibi',
    personality: 'Güçlü ve yumuşak huylu',
    birthday: { season: 'winter', day: 8 },
    lovedItems: ['silk', 'chrysanthemum', 'alpaca_wool'],
    likedItems: ['wool', 'tea', 'osmanthus', 'rabbit_fur', 'peacock_feather', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'copper_ore'],
    dialogues: {
      stranger: ['Merhaba, ben Hui Niang. Bu nakış dükkânı bana eşimden kaldı.', '{title} nakış işi isterse gelip bakabilir.'],
      acquaintance: ['Bu dükkânı tek başına ayakta tutmak kolay değildi ama artık alıştım.', '{title}, bugün bayağı rahatsın anlaşılan.'],
      friendly: ['{player}, sorumluluk sahibi birisin; insana güven veriyorsun.', 'Bu işlemeli mendili sana veriyorum, {title}; kendi ellerimle işledim.'],
      bestFriend: ['{player}, bana insanın tek başına da iyi yaşayabileceğini gösterdi.', '{title} varken Hui Niang kendini yalnız hissetmiyor.']
    }
  },
  {
    id: 'lao_lu',
    name: 'Yaşlı Lu',
    gender: 'male',
    role: 'Şarap mahzeni sahibi',
    personality: 'İçkiyi seven ve misafirperver',
    birthday: { season: 'autumn', day: 8 },
    lovedItems: ['watermelon_wine', 'peach_wine'],
    likedItems: ['jujube_wine', 'corn_wine', 'peanut', 'rabbit_foot'],
    hatedItems: ['tea', 'herb'],
    dialogues: {
      stranger: ['Gel gel gel! İçeri gir, bir şeyler iç! Ben Yaşlı Lu!', 'İnsan ömrü kısa; içmeden yaşamanın ne anlamı var ki! {title}, öyle değil mi?'],
      acquaintance: ['{title}! Gel gel, bugün yeni yaptığım şeftali şarabını dene!', 'Hong Dou denen kızın şarap yeteneği benden bile iyi... hehe.'],
      friendly: ['{player}, sen dürüst bir insansın; Yaşlı Lu dürüst insanlarla içmeyi sever.', 'Üç yıllık şu şarabı senin için ayırdım, {title}.'],
      bestFriend: ['{player} ile karşılıklı içmek, bu hayatta yaşadığım büyük mutluluklardan biri.', '{title}, hadi, fondip!']
    }
  },
  {
    id: 'liu_cunzhang',
    name: 'Muhtar Liu',
    gender: 'male',
    role: 'Köy muhtarı',
    personality: 'Vakarlı ve adil',
    birthday: { season: 'summer', day: 5 },
    lovedItems: ['tea', 'ginseng'],
    likedItems: ['herb', 'osmanthus', 'bamboo', 'rabbit_foot'],
    hatedItems: ['pickled_cabbage', 'firewood'],
    dialogues: {
      stranger: ['Atalarından kalan o çiftliği devralan genç sen misin? Ben Muhtar Liu. Umarım ailenden kalan emeği boşa çıkarmazsın.', 'Taoyuan Köyü’nün kuralları vardır; onlara uyulmalıdır.'],
      acquaintance: ['{title}, son zamanlarda iyi iş çıkarıyorsun; köylüler seni çalışkan buluyor.', 'Liu Niang senden birkaç kez bahsetti... hm.'],
      friendly: ['{player}, köy için yaptıklarını yaşlı gözlerim görüyor.', 'Deden de eskiden tıpkı senin gibi kararlıydı.'],
      bestFriend: ['{player}, Taoyuan Köyü için büyük bir nimettir.', 'Ben yaşlandım; bu köyün geleceğinde {title}’ın daha çok sorumluluk alması gerekecek.']
    }
  },
  {
    id: 'qian_niang',
    name: 'Qian Niang',
    gender: 'female',
    role: 'Eczane çırağı',
    personality: 'Utangaç ve yumuşak huylu',
    birthday: { season: 'winter', day: 12 },
    lovedItems: ['herb', 'ginseng'],
    likedItems: ['tea', 'chrysanthemum', 'winter_bamboo_shoot', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'gold_ore'],
    dialogues: {
      stranger: ['Aa... merhaba... be-ben Qian Niang, Lin Lao’nun çırağıyım.', 'Şifalı ot lazım olursa... bana gelebilirsin...'],
      acquaintance: ['{title}, merhaba... bugün taze otlar topladım.', 'Lin Lao bana birçok tarif öğretti, ben de ezberlemeye çalışıyorum...'],
      friendly: ['{player}, bu hapları pratik olsun diye yaptım, s-sen denemek ister misin?', '{title} gelip benimle sohbet edince daha az geriliyorum.'],
      bestFriend: ['{player} ile birlikteyken... sanki biraz daha cesur oluyorum.', '{title} için kuvvet ilacını mutlaka özenle hazırlayacağım.']
    }
  },
  {
    id: 'he_zhanggui',
    name: 'İşletmeci He',
    gender: 'male',
    role: 'Çayhane işletmecisi',
    personality: 'Kaypak ama konuşkan',
    birthday: { season: 'spring', day: 15 },
    lovedItems: ['tea', 'honey'],
    likedItems: ['osmanthus', 'lotus_seed', 'peanut', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'stone'],
    dialogues: {
      stranger: ['Aman efendim, hoş geldiniz! Ben İşletmeci He, size bir demlik güzel çay hazırlayayım!', '{title} ilk kez mi geldi? Otur, otur, buyur!'],
      acquaintance: ['{title}’ın her zamanki yerini ayırdım!', 'Köyün dedikoduları— yani haberleri— hep bu çayhaneden geçer.'],
      friendly: ['{player}, senin çiftlikteki maceralarını duydum, hahaha!', 'İyi çay iyi dosta verilir; {title}, sen de benim iyi dostumsun!'],
      bestFriend: ['{player}’ın karakteri konusunda köyde kimsenin iki lafı yok; herkes övgüyle söz eder.', '{title}’ın çay parası mı? Yok canım, eski dosttan para mı alınır!']
    }
  },
  {
    id: 'qin_dashu',
    name: 'Amca Qin',
    gender: 'male',
    role: 'Meyve bahçesi sahibi',
    personality: 'Dürüst ve çalışkan',
    birthday: { season: 'autumn', day: 12 },
    lovedItems: ['peach', 'jujube'],
    likedItems: ['persimmon', 'sweet_potato', 'corn', 'rabbit_foot'],
    hatedItems: ['jade', 'moonstone'],
    dialogues: {
      stranger: ['Merhaba, soyadım Qin, herkes bana Amca Qin der. Köyün doğusunda bir meyve bahçem var.', 'Meyve ağacı dediğin sabır ister. {title}, acele etmemelisin.'],
      acquaintance: ['{title} de meyve ağacı mı dikiyor? Bilmediğin bir şey olursa sor bana.', 'Bu yıl şeftaliler çok tatlı oldu, senin için birkaç tane ayırdım.'],
      friendly: ['{player}’ın çiftçilik becerisi gittikçe gelişiyor.', 'Bu fidanları ben yetiştirdim, {title}, alıp dikebilirsin.'],
      bestFriend: ['{player}, bana gençliğimdeki çalışma azmini hatırlatıyor.', 'Benim bahçeme {title} istediği zaman gelip meyve toplayabilir.']
    }
  },
  {
    id: 'a_fu',
    name: 'A Fu',
    gender: 'male',
    role: 'Çoban çocuk',
    personality: 'Saf ve iyimser',
    birthday: { season: 'winter', day: 5 },
    lovedItems: ['sweet_potato', 'milk', 'goat_milk'],
    likedItems: ['corn', 'hay', 'wild_berry', 'truffle', 'buffalo_milk', 'rabbit_foot'],
    hatedItems: ['jade', 'silk'],
    dialogues: {
      stranger: ['Hehe, merhaba! Ben A Fu! Da Niu ağabeyin ineklerine ben bakıyorum!', 'İnekler en tatlısı, değil mi {title}?'],
      acquaintance: ['{title}! Bugün yine inekler çitten kaçtı, hehe.', 'Da Niu ağabey bir gün benim de çiftlik sahibi olacağımı söylüyor!'],
      friendly: ['{player}’ın tavukları yumurtladı mı? Bizim inek bugün süt verdi!', '{title} için bir saman şapka ördüm, güzel olmadı ama güneşten korur!'],
      bestFriend: ['{player} bana çok iyi davranıyor... Da Niu ağabey kadar iyi.', 'Ben büyüyünce ben de {title} gibi başarılı olacağım!']
    }
  }
]

/** ID’ye göre NPC tanımını getir */
export const getNpcById = (id: string): NpcDef | undefined => {
  return NPCS.find(n => n.id === id)
                 }
