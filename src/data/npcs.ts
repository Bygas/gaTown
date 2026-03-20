import type { NpcDef } from '@/types'

/** Tüm NPC tanımları */
export const NPCS: NpcDef[] = [
  // ============================================================
  // Mevcut NPC'ler (6)
  // ============================================================
  {
    id: 'chen_bo',
    name: 'Hasan Enişte',
    gender: 'male',
    role: 'Tuhafiyeci',
    personality: 'yardımsever, gönlü bol',
    birthday: { season: 'spring', day: 8 },
    lovedItems: ['tea', 'osmanthus', 'ginseng'],
    likedItems: ['cabbage', 'rice', 'potato', 'goat_milk', 'truffle', 'rabbit_foot', 'hanhai_spice'],
    hatedItems: ['copper_ore', 'quartz'],
    dialogues: {
      stranger: ['Hele buyur yiğidim, buralara yeni geldin galiba? Ben Hasan Enişte, bu dükkân da benim.', '{title}, ne lazım olursa çekinmeden gel. Bizde alavere dalavere olmaz.'],
      acquaintance: ['Hah hah! {title} yine gelmiş! Bugün ne bakarsın?', 'Yeni mallar geldi, bir göz at istersen.'],
      friendly: ['{player}, rahmetli deden gençliğinde senin gibiydi, çalışkan adamdı.', 'Bazı güzel şeyleri yalnızca sana ayırıyorum {title}.'],
      bestFriend: ['{player}, sen bana öz evladım gibi oldun.', 'Şu dükkânı ilerde sana bırakırım belki... Şaka ettim canım.']
    }
  },
  {
    id: 'liu_niang',
    name: 'Elif',
    gender: 'female',
    role: 'Muhtarın kızı',
    personality: 'nazik ve zeki',
    birthday: { season: 'summer', day: 14 },
    lovedItems: ['chrysanthemum', 'osmanthus', 'peacock_feather'],
    likedItems: ['tea', 'wintersweet', 'rabbit_fur', 'rabbit_foot', 'hanhai_silk'],
    hatedItems: ['iron_ore', 'firewood'],
    dialogues: {
      stranger: ['Merhaba, sen yeni gelen çiftlik sahibi olmalısın. Ben Elif.', 'Burası çok güzel bir köy, {title}. Seveceğine eminim.'],
      acquaintance: ['Bugün hava ne güzel, {title} sen de şöyle bir dolaşmaya mı çıktın?', 'Eski şiirlerden bir kitap okuyorum, istersen beraber bakarız.'],
      friendly: ['{title} gelince köy daha da şenlendi vallahi.', 'Biraz çiçekli çörek yaptım, {player}, bir parça tatsana.'],
      bestFriend: ['{title} ile konuşmak hep içimi ferahlatıyor...', 'Bu çiçeği sana getirdim, dağ yolunda buldum.']
    },
    marriageable: true,
    heartEventIds: ['liu_niang_heart_3', 'liu_niang_heart_5', 'liu_niang_heart_8'],
    datingDialogues: [
      'Bugün {player} ile dere kenarında biraz yürümek isterim.',
      '{title}, sana küçük bir nazarlık işledim, üstünde taşı.',
      '{player} ile geçen her gün, sanki türkü sözü gibi güzel geliyor bana.'
    ],
    zhijiDialogues: [
      '{player} ile şiir okuyup oturduğumuz o öğleden sonralar, en kıymetli vakitlerim.',
      'Bazı sözler var, insan ancak can dostuna söyler... {title}, hep yanımda olduğun için sağ ol.',
      'Böyle gönül dostu zor bulunur. {player} ile karşılaşmak benim bahtım oldu.'
    ],
    zhijiHeartEventIds: ['liu_niang_zhiji_7', 'liu_niang_zhiji_9']
  },
  {
    id: 'a_shi',
    name: 'İsmail',
    gender: 'male',
    role: 'Madenci',
    personality: 'az konuşan',
    birthday: { season: 'autumn', day: 5 },
    lovedItems: ['ruby', 'jade', 'hanhai_turquoise'],
    likedItems: ['gold_ore', 'iron_ore', 'potato', 'rabbit_foot'],
    hatedItems: ['chrysanthemum', 'wintersweet'],
    dialogues: {
      stranger: ['... Hı.', 'Maden ocağı... {title}, dikkat et.'],
      acquaintance: ['{title} sen de mi kazıya gidiyorsun?... Kazmanı unutma.', 'Derinlerde iyi taş da var, bela da var.'],
      friendly: ['Şu taş fena değil, al {title}.', '{player}’ın kazması eskimiş, istersen bakarım.'],
      bestFriend: ['... {player}, benim ilk dostumsun.', 'En dipteki hazineyi... yalnızca {title}’a söylerim.']
    },
    marriageable: true,
    heartEventIds: ['a_shi_heart_3', 'a_shi_heart_5', 'a_shi_heart_8'],
    datingDialogues: [
      '... {player}, bu taş çok güzel. Gözlerin gibi.',
      'Eskiden en iyi yer maden ocağıydı. Şimdi... {title} neredeyse orası daha iyi.',
      'Çok laf edemem... Ama {player} yanımda olsun yeter.'
    ],
    zhijiDialogues: [
      '... Sen yanımdayken kazı daha bereketli oluyor sanki.',
      '{player}, bu taş... ancak can dosta yakışır.',
      'Hiç konuşmadan da rahat etmek... Demek can dostu böyle oluyormuş.'
    ],
    zhijiHeartEventIds: ['a_shi_zhiji_7', 'a_shi_zhiji_9']
  },
  {
    id: 'qiu_yue',
    name: 'Aylin',
    gender: 'female',
    role: 'Balıkçı kızı',
    personality: 'neşeli ve dışa dönük',
    birthday: { season: 'winter', day: 20 },
    lovedItems: ['koi', 'giant_salamander'],
    likedItems: ['crucian', 'carp', 'grass_carp', 'bass', 'rabbit_foot'],
    hatedItems: ['copper_ore', 'iron_ore'],
    dialogues: {
      stranger: ['Aaa, yeni bir yüz! {title} merhaba, ben Aylin, köyün en iyi oltacısı!', 'Balık tutmayı öğrenmek istersen bana gel!'],
      acquaintance: ['Bugün derenin suyu öyle berrak ki, kesin iri balık çıkar!', '{title}, balık tutuşun gitgide ustalaşıyor ha.'],
      friendly: ['Şu benim gizli balık yerim, yalnızca {title}’a söylerim.', '{player}’a nefis sazan yapmayı öğreteyim, parmaklarını yersin!'],
      bestFriend: ['Bundan sonra hep beraber balığa gidelim olur mu? Her gün gidelim!', '{title}, gördüğüm en iyi oltacısın! Hehe.']
    },
    marriageable: true,
    heartEventIds: ['qiu_yue_heart_3', 'qiu_yue_heart_5', 'qiu_yue_heart_8'],
    datingDialogues: [
      '{player}! Şu akşam güneşine bak, ne güzel... Hadi beraber izleyelim!',
      'Hehe, {title} artık benim. Kimseye kaptırmam.',
      'Bundan sonra her gün balığa gidelim mi? Yalnız ikimiz!'
    ],
    zhijiDialogues: [
      '{player}! Hadi bugün balığa çıkalım! Benim gizli yerime ancak can dostu gelir!',
      'Hehe, içinde ne varsa bana anlatabilirsin! Biz can dostuyuz!',
      'Nereye gidersem gideyim, {title} da yanımda olacak!'
    ],
    zhijiHeartEventIds: ['qiu_yue_zhiji_7', 'qiu_yue_zhiji_9']
  },
  {
    id: 'lin_lao',
    name: 'Hekim Dede',
    gender: 'male',
    role: 'Köy hekimi',
    personality: 'şefkatli ve bilgili',
    birthday: { season: 'autumn', day: 22 },
    lovedItems: ['herb', 'tea', 'antler_velvet'],
    likedItems: ['winter_bamboo_shoot', 'bamboo', 'yak_milk', 'camel_milk', 'rabbit_foot', 'hanhai_spice'],
    hatedItems: ['ruby', 'gold_ore'],
    dialogues: {
      stranger: ['Evlat, buralara yeni geldin; toprağa, suya alışabildin mi?', 'Ben yıllardır hekimlik ederim. {title}, bir derdin varsa söyle.'],
      acquaintance: ['Şu ot iyidir, hem ilaca girer hem çaya.', '{title}, yüzüne renk gelmiş; ilk geldiğinden iyisin.'],
      friendly: ['Benim bir kuvvet şerbeti tarifim var, bedene iyi gelir.', '{player}’ın dedesi... eski ahbabımdı.'],
      bestFriend: ['Şu eski şifa kitabını sana veriyorum {title}. İyi oku.', 'Bu köyün geleceği artık siz gençlere emanet, {player}.']
    }
  },
  {
    id: 'xiao_man',
    name: 'Mıstık',
    gender: 'male',
    role: 'Marangoz çırağı',
    personality: 'yaramaz ve meraklı',
    birthday: { season: 'spring', day: 18 },
    lovedItems: ['watermelon', 'sweet_potato'],
    likedItems: ['wood', 'bamboo', 'radish', 'rabbit_foot'],
    hatedItems: ['herb', 'tea'],
    dialogues: {
      stranger: ['Vay, yeni gelen sen misin! Ben Mıstık!', '{title}’ın çiftliğine gizlice baktım da... biraz dökük duruyor— şey yani, potansiyeli var!'],
      acquaintance: ['Ben aralar dolap yapmayı öğreniyorum, {title} isterse sana da yaparım.', 'Usta diyor ki daha elim alışmamış, hıh!'],
      friendly: ['{title}’ın aletlerini ben tamir edeyim! Mis gibi olur!', 'Hehe, {player}’a gizliden indirim yaparım.'],
      bestFriend: ['Bir gün köyün en büyük evini ben yapacağım! {title}, planını sen çizersin ha?', '{player} benim en iyi arkadaşım! ... Kimseye deme ama.']
    }
  },

  // ============================================================
  // Yeni evlenilebilir NPC'ler (9) — Toplam 12 evlenilebilir
  // ============================================================
  {
    id: 'chun_lan',
    name: 'Bahar',
    gender: 'female',
    role: 'Çayhane sahibi',
    personality: 'zarif ve ağırbaşlı',
    birthday: { season: 'spring', day: 3 },
    lovedItems: ['tea', 'osmanthus', 'chrysanthemum'],
    likedItems: ['honey', 'lotus_seed', 'peach', 'rabbit_foot', 'hanhai_silk'],
    hatedItems: ['iron_ore', 'copper_ore'],
    dialogues: {
      stranger: ['Buyur içeri, bir çay iç. Ben Bahar, bu çayhane aile yadigârı.', '{title} çayı severse bundan sonra sık sık uğrasın.'],
      acquaintance: ['Bugün taze demledim, {title} bir yudum alır mı?', 'Çay yaprağı sabah çiği kurumadan toplanırsa daha güzel olur.'],
      friendly: ['{player}’ın damak tadını öğrendim, sevdiğin çayı ayırdım.', 'Bir iki çaylığımız var, bir gün {title}’ı da götüreyim.'],
      bestFriend: ['{title} ile çay içilen vakitler, günün en kıymetli anı oluyor bana.', 'Bu fincan çayı yalnızca {player} için demledim.']
    },
    marriageable: true,
    heartEventIds: ['chun_lan_heart_3', 'chun_lan_heart_5', 'chun_lan_heart_8'],
    datingDialogues: [
      'Bu çayı {player} için ayrı harmanladım, bir bak bakalım.',
      '{title} ile içilen şu sakin öğle vakitleri, en kıymetli zamanım oldu.',
      '{player}, bundan sonra her günü seninle bir demlik çay paylaşarak geçirmek isterim.'
    ],
    zhijiDialogues: [
      'Bu fincan, ancak gönül dostuna demlenir. {player}, afiyet olsun.',
      'Eskiden çayhanenin bütün yükü yalnız bendeydi. {title} olunca içim hafifledi.',
      'Can dostla içilen çayın tadı, hiçbir şeye benzemez.'
    ],
    zhijiHeartEventIds: ['chun_lan_zhiji_7', 'chun_lan_zhiji_9']
  },
  {
    id: 'xue_qin',
    name: 'Nazan',
    gender: 'female',
    role: 'Ressam',
    personality: 'mesafeli ve gururlu',
    birthday: { season: 'winter', day: 10 },
    lovedItems: ['snow_lotus', 'moonstone'],
    likedItems: ['chrysanthemum', 'wintersweet', 'bamboo', 'rabbit_foot', 'hanhai_turquoise'],
    hatedItems: ['pickled_cabbage', 'dried_radish'],
    dialogues: {
      stranger: ['... Işığımı kesiyorsun.', 'Resim almayacaksan boyalara dokunma lütfen.'],
      acquaintance: ['{title} resimden anlıyor mu? Fena gözün yokmuş.', 'Şu manzara resmine köyün arkasındaki şelale ilham oldu.'],
      friendly: ['{player}, senin çiftlik akşam güneşinde güzel görünüyor; bir resmini yaptım.', 'Kalabalığı pek sevmem... Ama {title} gelince öyle olmuyor.'],
      bestFriend: ['Eskiden kimse resmimi anlamıyor sanırdım... {player} ile karşılaşana kadar.', 'Bu tabloyu {title} için yaptım, iyi sakla.']
    },
    marriageable: true,
    heartEventIds: ['xue_qin_heart_3', 'xue_qin_heart_5', 'xue_qin_heart_8'],
    datingDialogues: [
      '... {player}, kıpırdama. Şu halini çizmek istiyorum.',
      'Eskiden güzeli yalnız tabloda arardım. Şimdi... {title} tablodan da güzel geliyor.',
      'Bu resmin adı “Yuva”. Çünkü seninle ben de bir yuva duygusu tattım.'
    ],
    zhijiDialogues: [
      '... Ben resim yaparken beni bunaltmayan tek kişi sensin. Demek can dostluk buymuş.',
      'Şu tablonun konusu “gönül bağı”... İlhamı da {player}.',
      'Eskiden dünyada kimse beni anlamaz sanırdım. Şimdi öyle düşünmüyorum.'
    ],
    zhijiHeartEventIds: ['xue_qin_zhiji_7', 'xue_qin_zhiji_9']
  },
  {
    id: 'su_su',
    name: 'Suna',
    gender: 'female',
    role: 'Terzi',
    personality: 'sakin ve maharetli',
    birthday: { season: 'summer', day: 3 },
    lovedItems: ['silk', 'wintersweet', 'alpaca_wool', 'peacock_feather'],
    likedItems: ['wool', 'chrysanthemum', 'osmanthus', 'rabbit_fur', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'stone'],
    dialogues: {
      stranger: ['Hoş geldin, ben Suna. Burası terzi dükkânım.', '{title}, nasıl bir kıyafet istersen söyle yeter.'],
      acquaintance: ['{title}’ın giysisi sökülmüş, bırak da onarayım.', 'Şu kumaşın deseni çok güzel, tam baharlık.'],
      friendly: ['{player} için bir yelek diktim, üstüne olur mu bak bakalım.', 'Her ilmeğinde ayrı bir gönül emeği var...'],
      bestFriend: ['{player}’ın benim diktiğim giysileri giymesi beni en çok sevindiren şey.', 'Bundan sonra yalnızca {title}’a dikerim sanki.']
    },
    marriageable: true,
    heartEventIds: ['su_su_heart_3', 'su_su_heart_5', 'su_su_heart_8'],
    datingDialogues: [
      '{player} için bir kıyafet dikiyorum; her dikişinde gönlüm var.',
      '{title} benim diktiğim giysiyi giyince içim öyle bir ısınıyor ki...',
      'Bundan sonra yalnızca {player} için dikiş diksem... olur mu?'
    ],
    zhijiDialogues: [
      '{player} için diktiğim giysilerde daha da özenli oluyorum... Çünkü sen benim can dostumsun.',
      'İçimde bir sıkıntı olunca {title} aklıma geliyor, içim yatışıyor.',
      'Can dost arasında çok söz gerekmez... Ama ben yine de {player} ile daha çok konuşmak istiyorum.'
    ],
    zhijiHeartEventIds: ['su_su_zhiji_7', 'su_su_zhiji_9']
  },
  {
    id: 'hong_dou',
    name: 'Zeyno',
    gender: 'female',
    role: 'Meyhane sahibi',
    personality: 'açık sözlü ve cömert',
    birthday: { season: 'autumn', day: 10 },
    lovedItems: ['watermelon_wine', 'peach_wine', 'jujube_wine'],
    likedItems: ['watermelon', 'peanut', 'corn', 'rabbit_foot'],
    hatedItems: ['tea', 'herb'],
    dialogues: {
      stranger: ['Hey! Bir testi ister misin? Ben Zeyno, buranın sahibiyim!', 'İçmesen de olur, gel otur hele {title}, yabancılık çekme.'],
      acquaintance: ['Bu yılın şeftali şarabı güzel oldu, {title} bir tas alır mı?', 'İşin sırrı nedir biliyor musun? Gönül koyacaksın... bir de sabır.'],
      friendly: ['{player} benim iyi dostum sayılır, şu küp sana hediyem olsun!', 'Bir dahaki sefere karşılıklı içeriz, kim yenilirse hesabı o öder!'],
      bestFriend: ['Köyde benim saklı fıçımı içmeye layık biri varsa o da {title}.', '{player} varken içkinin tadı başka oluyor.']
    },
    marriageable: true,
    heartEventIds: ['hong_dou_heart_3', 'hong_dou_heart_5', 'hong_dou_heart_8'],
    datingDialogues: [
      '{player}! Gel, bir kadeh tokuşturalım! Bugünün içkisi ayrı tatlı.',
      'Hey {title}, yüzümü kızartan tek kişi sensin.',
      'Bundan sonra mahzendeki en güzel içkileri {player} için saklayacağım! Kimse dokunamaz!'
    ],
    zhijiDialogues: [
      '{player}! Gel! Can dost arasında içki ikramı esirgenmez! Dibine kadar!',
      'Dünyada benimle kafa tutacak tek kişi {title}! İşte dostluk budur!',
      'Senin gibi bir can dost olunca, en sert içki bile tatlı geliyor.'
    ],
    zhijiHeartEventIds: ['hong_dou_zhiji_7', 'hong_dou_zhiji_9']
  },
  {
    id: 'dan_qing',
    name: 'Cemil',
    gender: 'male',
    role: 'Medrese görmüş genç',
    personality: 'nazik ve edepli',
    birthday: { season: 'spring', day: 22 },
    lovedItems: ['tea', 'bamboo'],
    likedItems: ['chrysanthemum', 'osmanthus', 'pine_cone', 'rabbit_foot'],
    hatedItems: ['copper_ore', 'firewood'],
    dialogues: {
      stranger: ['Ben Cemil. Gezip görürken bu güzel köy beni burada tuttu.', '{title} da okumayı sevenlerden midir?'],
      acquaintance: ['Bugün güzel bir yazı okudum, {title} ile paylaşayım dedim.', 'İnsanın gönlüne iyi gelen yerler vardır; bu köy de öyle.'],
      friendly: ['{player}, bir gün sana güzel bir yazı yazayım.', '{title} gibi bir gönül dostu bulan için dünya eksik kalmaz.'],
      bestFriend: ['{player} ile karşılaşmasaydım belki çoktan gitmiştim.', 'Kalem kâğıt bir yana, {title}’ın bir tebessümü bir yana.']
    },
    marriageable: true,
    heartEventIds: ['dan_qing_heart_3', 'dan_qing_heart_5', 'dan_qing_heart_8'],
    datingDialogues: [
      'Bugün bir mani yazdım, {player} için... Dinlemek ister misin?',
      '{title} ile tanışmadan önce ömrüm kitaplarla geçer sanırdım.',
      '{player}, el ele verip ömrü beraber geçirmek isterim.'
    ],
    zhijiDialogues: [
      'İnsanın gönüldaşı kolay bulunmaz. {player}, sen benim gönlüme denk geldin.',
      'Bugün yine yeni bir yazı karaladım; ilk {title} görsün istedim.',
      '{player} gibi bir can dost varken, sade bir ömür sürsem de içimde ukde kalmaz.'
    ],
    zhijiHeartEventIds: ['dan_qing_zhiji_7', 'dan_qing_zhiji_9']
  },
  {
    id: 'a_tie',
    name: 'Demir',
    gender: 'male',
    role: 'Demirci çırağı',
    personality: 'iyi niyetli ve saf',
    birthday: { season: 'autumn', day: 15 },
    lovedItems: ['iron_ore', 'gold_ore'],
    likedItems: ['copper_ore', 'potato', 'corn', 'rabbit_foot'],
    hatedItems: ['chrysanthemum', 'silk'],
    dialogues: {
      stranger: ['Ş-şey, merhaba! Ben Demir... ustanın çırağıyım.', 'Demir dövmek zor iştir ama hoşuma gider... {title} bakmak ister mi?'],
      acquaintance: ['{title}’ın tamir edilecek aleti var mı? B-ben yardım ederim.', 'Bugün güzel bir bıçak çıkardım, usta ilk kez beni övdü!'],
      friendly: ['{player}’ın aletine gizlice biraz daha sağlam malzeme kattım.', '{title}, benim acemiliğime gülmeyen tek kişisin...'],
      bestFriend: ['{player}... beni hep yüreklendirdiğin için sağ ol.', 'Ustalığımı alınca yaptığım ilk işi {title}’a vereceğim.']
    },
    marriageable: true,
    heartEventIds: ['a_tie_heart_3', 'a_tie_heart_5', 'a_tie_heart_8'],
    datingDialogues: [
      'B-ben {player} için küçük bir demir çiçek yaptım... Beğenmezsen at gitsin...',
      '{title} yanımda durup beni izleyince, çekicin ağırlığı bile azalıyor.',
      '{player}... Çok çalışacağım, ustalaşacağım, sonra da... bir ömür sana bakacağım.'
    ],
    zhijiDialogues: [
      '{player} yanımdayken koluma daha çok kuvvet geliyor! Demek dostluk böyle bir şey!',
      'Sana yeni bir alet yaptım, başkasına yaptıklarımdan daha sağlam oldu!',
      '{title} benim en yakın yoldaşım! ... Şey, yani can dostum!'
    ],
    zhijiHeartEventIds: ['a_tie_zhiji_7', 'a_tie_zhiji_9']
  },
  {
    id: 'yun_fei',
    name: 'Baran',
    gender: 'male',
    role: 'Avcı',
    personality: 'asi ve başına buyruk',
    birthday: { season: 'summer', day: 8 },
    lovedItems: ['wild_mushroom', 'ginseng'],
    likedItems: ['pine_cone', 'herb', 'wild_berry', 'rabbit_foot'],
    hatedItems: ['gold_ore', 'jade'],
    dialogues: {
      stranger: ['Fazla yaklaşma, insan kalabalığını sevmem.', 'Dağ başına alışmışım, köy çok gürültülü geliyor.'],
      acquaintance: ['... {title} yine gelmiş. Neyse, otur bari.', 'Şu dağ mantarı var ya, sizinkilerden lezzetlidir.'],
      friendly: ['{player}, beni bunaltmayan sayılı kişidensin.', 'Bir dahaki dağa çıkışta {title} da gelsin, yolları bilirim.'],
      bestFriend: ['Ömrümde kimseye güvenmedim... {player} hariç.', '{title}, şu dağları beraber kollayalım.']
    },
    marriageable: true,
    heartEventIds: ['yun_fei_heart_3', 'yun_fei_heart_5', 'yun_fei_heart_8'],
    datingDialogues: [
      '... {player}, bu gece ay güzel. Biraz yanıma otur.',
      'Eskiden yalnız kendime güvenir, kimseyi umursamazdım. Şimdi... {title} başka.',
      'Bu dağları bundan sonra {player} ile birlikte koruyacağım.'
    ],
    zhijiDialogues: [
      '... Ben kimseye güvenmezdim. Ama sen başkasın, {player}.',
      'Dağın gizli yolunu yalnız sana gösterdim. Bu yeter.',
      'Can dostluk... sıradan arkadaşlıktan da ağır gelir.'
    ],
    zhijiHeartEventIds: ['yun_fei_zhiji_7', 'yun_fei_zhiji_9']
  },
  {
    id: 'da_niu',
    name: 'İbo',
    gender: 'male',
    role: 'Çoban delikanlı',
    personality: 'samimi ve coşkulu',
    birthday: { season: 'winter', day: 3 },
    lovedItems: ['milk', 'hay', 'goat_milk', 'buffalo_milk', 'yak_milk'],
    likedItems: ['egg', 'corn', 'sweet_potato', 'truffle', 'donkey_milk', 'rabbit_foot'],
    hatedItems: ['ruby', 'moonstone'],
    dialogues: {
      stranger: ['Hey! Selam selam! Ben İbo! Hayvanları pek severim!', '{title}, hayvan besliyor musun? Öğretirim ben!'],
      acquaintance: ['Bizim sarı inek bugün pek keyifli!', '{title}, şu kuzuyu bir sev hele, yumuşacık değil mi?'],
      friendly: ['{player}’ın tavukları pek güzel olmuş, benim eski günlerim gibi!', 'Bir ara bize gel de yeni doğan buzağıyı göstereyim {title}!'],
      bestFriend: ['{player}, gördüğüm en iyi hayvan bakıcısısın!', '{title}, ilerde birlikte kocaman bir çiftlik kursak ne dersin?']
    },
    marriageable: true,
    heartEventIds: ['da_niu_heart_3', 'da_niu_heart_5', 'da_niu_heart_8'],
    datingDialogues: [
      '{player}! Buzağı doğdu bugün! İlk sana haber vereyim dedim!',
      'Hehe, {title} ile olmak, ineklerle olmaktan bile daha güzel!',
      'Bir gün bizim çiftlik köyün en büyüğü olacak! {player}, inan bana!'
    ],
    zhijiDialogues: [
      '{player}! Sen benim en sağlam dostumsun!',
      'Benimle yağmurda, çamurda, hayvan peşinde dolaşman kadar güzel bir şey yok!',
      'Gelin ortak çiftlik kuralım! Can dost ortak olursa sırt yere gelmez!'
    ],
    zhijiHeartEventIds: ['da_niu_zhiji_7', 'da_niu_zhiji_9']
  },
  {
    id: 'mo_bai',
    name: 'Mahir',
    gender: 'male',
    role: 'Sazende',
    personality: 'sessiz ve melankolik',
    birthday: { season: 'spring', day: 12 },
    lovedItems: ['bamboo', 'moonstone'],
    likedItems: ['tea', 'chrysanthemum', 'pine_cone', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'pickled_cabbage'],
    dialogues: {
      stranger: ['... Merhaba. Çalgımı çalışıyorum, çok ses etmeyin lütfen.', 'Ben Mahir, buralara yolu düşmüş bir sazende.'],
      acquaintance: ['{title} de türkü dinlemeyi sever mi? Bir gün sana çalarım.', 'Şu ezginin adı “Sonbahar Suyu”; bu köy için besteledim.'],
      friendly: ['{player} geldi, iyi oldu. Yeni bir ezgi yaptım, dinle.', '{title} dinlerken içim biraz daha hafifliyor.'],
      bestFriend: ['Bu ezginin adı yok... Çünkü onu {player} için yaptım.', '{title}, benim gönül kulağımdan anlayan kişisin.']
    },
    marriageable: true,
    heartEventIds: ['mo_bai_heart_3', 'mo_bai_heart_5', 'mo_bai_heart_8'],
    datingDialogues: [
      '... {player}, bu ezgiyi yalnız sana çalıyorum.',
      'Eskiden müzik hep yalnızlık gibiydi... {title} ile karşılaşınca sıcaklığı da öğrendim.',
      '{player} için bir ezgi besteledim; adını “Yolunu Bulan” koydum.'
    ],
    zhijiDialogues: [
      'Gönülden anlayan zor bulunur... {player}, sesimi anlayan tek kişi sensin.',
      'Senin için yaptığım ezgiler çoğaldı... Demek dostluk ilham veriyormuş.',
      '{title} varken çaldığım her ezgi daha içli, daha sıcak oluyor.'
    ],
    zhijiHeartEventIds: ['mo_bai_zhiji_7', 'mo_bai_zhiji_9']
  },

  // ============================================================
  // Evlenilemeyen NPC'ler (22) — Toplam 22
  // ============================================================
  {
    id: 'wang_dashen',
    name: 'Fatma Teyze',
    gender: 'female',
    role: 'Köyün aşçısı',
    personality: 'yardımsever ve iyi kalpli',
    birthday: { season: 'summer', day: 18 },
    lovedItems: ['rice', 'sesame_oil'],
    likedItems: ['cabbage', 'radish', 'egg', 'rabbit_foot'],
    hatedItems: ['quartz', 'obsidian'],
    dialogues: {
      stranger: ['Amanın, yeni gelen sensin demek? Zayıf kalmışsın iyice, gel hele bir tabak yemek koyayım!', 'Ben Fatma Teyze, köyün düğün dernek aşçısıyım!'],
      acquaintance: ['{title}, bugün bir şey yedin mi? Yemedinse sıcak çorba koyayım.', 'Yemeğin sırrı şudur: tuzu az, gönlü bol koyacaksın.'],
      friendly: ['{player}, iyice serpilmişsin, belli ki benim yemeklerden eksik kalmıyorsun!', 'Şu benim özel yemeğim, {title} bir tatsın.'],
      bestFriend: ['{player} bana öz evladım gibi geliyor. Koşturup durdukça içim sızlıyor.', 'Ne zaman yuva kuracaksın? Düğün yemeğini ben yaparım!']
    }
  },
  {
    id: 'zhao_mujiang',
    name: 'Mustafa Usta',
    gender: 'male',
    role: 'Marangoz ustası',
    personality: 'sert ama titiz',
    birthday: { season: 'autumn', day: 1 },
    lovedItems: ['wood', 'bamboo'],
    likedItems: ['pine_resin', 'camphor_oil', 'rabbit_foot'],
    hatedItems: ['watermelon', 'peanut'],
    dialogues: {
      stranger: ['Hı? Bir işin mi var? Ben Mustafa Usta. El işinden konuşacaksan açık konuş.', 'Mıstık yine kaytardı herhalde...'],
      acquaintance: ['Şu evinin iskeleti sağlam, eskilerin işi. {title}, iyi bak buna.', 'Ağaç dediğin insana benzer, damarına göre davranacaksın.'],
      friendly: ['{player} fena değil, eli ayağı düzgün çalışıyor. Mıstık gibi afacan değil.', 'Tamir tadilat gerekirse {title}’a... yok yok, bana gel.'],
      bestFriend: ['{player}, bana gençliğimi hatırlatıyorsun.', 'Şu rende otuz yıldır benimleydi, artık {title}’ın olsun.']
    }
  },
  {
    id: 'sun_tiejiang',
    name: 'Ali Usta',
    gender: 'male',
    role: 'Demirci',
    personality: 'gür sesli ve yiğit',
    birthday: { season: 'winter', day: 15 },
    lovedItems: ['gold_ore', 'iridium_ore', 'copper_ore'],
    likedItems: ['iron_ore', 'crystal_ore', 'rabbit_foot'],
    hatedItems: ['chrysanthemum', 'silk'],
    dialogues: {
      stranger: ['Demir işin varsa doğru yere geldin! Ben Ali Usta!', 'Demir benim çırağım, daha yolun başında. {title}’ın aletine ben bakarım.'],
      acquaintance: ['İyi çelik iyi elde belli olur, {title}’ın aletleri artık yenilenmeli.', 'Şu çekicin sesine kulak ver— tın tın tın, türkü gibi!'],
      friendly: ['{player}, şu bıçağı üç gün üç gece dövdüm, bir dene bakalım.', '{title} gibi müşterim oldukça örse daha bir şevkle vuruyorum!'],
      bestFriend: ['Köyün en iyi demiri artık {player}’ın elinde.', '{title}, bir gün aklına efsane bir silah yaptırmak düşerse bana gel!']
    }
  },
  {
    id: 'zhang_popo',
    name: 'Emine Nine',
    gender: 'female',
    role: 'Dokumacı nine',
    personality: 'şefkatli ama çok konuşan',
    birthday: { season: 'spring', day: 7 },
    lovedItems: ['wool', 'silk'],
    likedItems: ['tea', 'pumpkin', 'sweet_potato', 'rabbit_foot'],
    hatedItems: ['gold_ore', 'ruby'],
    dialogues: {
      stranger: ['Ayy evladım, hoş geldin. Otur hele. Ben Emine Nine, ömrüm tezgâh başında geçti.', 'Şu giydiğin üst baş olmaz, sana bir şeyler dokuyayım ben.'],
      acquaintance: ['{title} gelmiş, hadi bir çay iç. Sana eskilerden anlatayım.', 'Ben gençken bu köy cıvıl cıvıldı ah ah...'],
      friendly: ['{player} ne iyi evlatmış. Sana bir atkı dokudum.', 'Senin deden de gelir benimle laklak ederdi, sen de onun gibisin.'],
      bestFriend: ['{player} olunca içim rahat ediyor.', 'Bu yaşıma geldim, {title} gibi yüz ağartan genç az gördüm.']
    }
  },
  {
    id: 'li_yu',
    name: 'Balıkçı Dede',
    gender: 'male',
    role: 'Yaşlı balıkçı',
    personality: 'sakin ve dünya malına tamah etmeyen',
    birthday: { season: 'summer', day: 22 },
    lovedItems: ['koi', 'sturgeon'],
    likedItems: ['crucian', 'bass', 'tea', 'rabbit_foot'],
    hatedItems: ['gold_ore', 'ruby'],
    dialogues: {
      stranger: ['Heh, bir balık sevdalısı daha gelmiş. Ben Balıkçı Dede, yirmi yıldır şu derenin başındayım.', 'Balık mı tutacaksın? Acele eden eli boş döner.'],
      acquaintance: ['Olta, elin devamıdır. İçin sakin olursa balık da gelir.', '{title}, bugün nasip var mı bakalım?'],
      friendly: ['{player}’ın oltası epey gelişti, biraz benim eski halime benzedin.', 'Şu usule “yaprak düşüşü” derler, artık {title} da öğrensin.'],
      bestFriend: ['Bir olta, bir gölge, bir de {player} gibi yol arkadaşı... daha ne olsun?', 'Ömrümün bütün bilgisini {title}’a bırakıyorum.']
    }
  },
  {
    id: 'zhou_xiucai',
    name: 'Hoca Efendi',
    gender: 'male',
    role: 'Mektep hocası',
    personality: 'tatlı sert ve eski kafalı',
    birthday: { season: 'autumn', day: 18 },
    lovedItems: ['bamboo', 'tea'],
    likedItems: ['chrysanthemum', 'osmanthus', 'rabbit_foot'],
    hatedItems: ['pickled_cabbage', 'corn_wine'],
    dialogues: {
      stranger: ['Uzaktan gelen dost baş üstüne. Ben bu köyün hocasıyım.', '{title}, kitap yüzü gördün mü bakalım?'],
      acquaintance: ['İnsan eskiyi bilirse yeniyi de daha iyi anlar. {title}, bu aralar okuyor musun?', 'Bugün iki afacana harf öğrettim, sabrım taştı vallahi.'],
      friendly: ['{player} çiftçi olsa da duruşunda okumuş adam ağırbaşlılığı var.', 'Yeni bir eski kitap elime geçti, {title} ile inceleyelim mi?'],
      bestFriend: ['{player}, benim kıymetli dostum oldun!', 'Şu kalem eski hocamın yadigârıydı, artık {title} kullansın.']
    }
  },
  {
    id: 'wu_shen',
    name: 'Nuriye Teyze',
    gender: 'female',
    role: 'Dükkân yardımcısı',
    personality: 'akıllı ve kurnaz',
    birthday: { season: 'spring', day: 25 },
    lovedItems: ['honey', 'sesame_oil'],
    likedItems: ['egg', 'rice', 'peanut', 'rabbit_foot'],
    hatedItems: ['wild_mushroom', 'pine_cone'],
    dialogues: {
      stranger: ['Yeni gelen sensin ha? Dükkânın asıl sahibi Hasan Enişte’dir, ama ufak tefek işler için bana gel.', 'Ben Nuriye Teyze, burada yardım ederim.'],
      acquaintance: ['{title}, bugünkü lahanalar taze taze, almaz mısın?', 'Hasan Enişte çok yumuşak yüzlü, herkese veresiye açıyor; ben öyle değilim.'],
      friendly: ['{player}’ın işi iyi gidiyor ha! Bak sana gelecek maldan iyisini ayırırım.', 'İnsan hesabını kitabını bilirse rahat yaşar.'],
      bestFriend: ['{player}, gördüğüm en eli ayağı düzgün gençlerden biri.', 'Bir işin olursa Nuriye Teyze burada, {title} yeter ki söylesin.']
    }
  },
  {
    id: 'ma_liu',
    name: 'Seyyar Salih',
    gender: 'male',
    role: 'Seyyar satıcı',
    personality: 'laf cambazı',
    birthday: { season: 'winter', day: 25 },
    lovedItems: ['jade', 'prismatic_shard'],
    likedItems: ['gold_ore', 'honey', 'peach', 'rabbit_foot'],
    hatedItems: ['stone', 'wood'],
    dialogues: {
      stranger: ['Aman aman {title}! Ben Seyyar Salih, diyar diyar gezen tüccar! Ne ararsan var!', 'Gel bak hele, dışarıda bulamayacağın şeyler bunlar!'],
      acquaintance: ['{title} geldi demek! Bugün sana özel mallar göstereceğim!', 'Ticarette en önemli şey güvendir... hehe, bir de kâr tabii.'],
      friendly: ['{player}, eski müşterimsin, sana sekizden veririm!', 'Ben çok yer gördüm ama en rahat ettiğim yer bu köy oldu.'],
      bestFriend: ['{player}, mallarım arasında önce sen seçersin.', 'Ben geveze adamım ama {title}’ın yanında söylediklerim içtendir.']
    }
  },
  {
    id: 'lao_song',
    name: 'Bekçi Osman',
    gender: 'male',
    role: 'Gece bekçisi',
    personality: 'ağırbaşlı ve az sözlü',
    birthday: { season: 'summer', day: 10 },
    lovedItems: ['tea', 'firewood'],
    likedItems: ['wood', 'pine_resin', 'herb', 'rabbit_foot'],
    hatedItems: ['watermelon', 'peach'],
    dialogues: {
      stranger: ['... Hı. Osman. Gece bekçisiyim.', 'Gece bir ses duyarsan {title}, panik yapma.'],
      acquaintance: ['Geç oldu, {title} evine erken dön.', 'Ay bugün pek parlak...'],
      friendly: ['{player} çalışkan biri, tavuktan önce ayakta.', 'Şu sıcak çayı {title} için ayırdım, gece ısınırsın.'],
      bestFriend: ['Yirmi yıldır gece gezerim, benimle laf eden sayılı kişi oldun {player}.', '{title} olunca içim daha rahat ediyor.']
    }
  },
  {
    id: 'pang_shen',
    name: 'Hatice Abla',
    gender: 'female',
    role: 'Peynirci / yoğurtçu dükkânı sahibi',
    personality: 'atak ve dobra',
    birthday: { season: 'autumn', day: 25 },
    lovedItems: ['broad_bean', 'sesame'],
    likedItems: ['rice', 'peanut', 'cabbage', 'rabbit_foot'],
    hatedItems: ['ruby', 'jade'],
    dialogues: {
      stranger: ['Taze mal almaya geldin değil mi? Ben Hatice Abla!', '{title}, benim göbekli olduğuma bakma, işte çok çevik olurum!'],
      acquaintance: ['Bugünkü çökelek pek güzel oldu, {title} bir kap alır mı?', 'Bu işte en önemlisi temiz su, bizim köyün suyu bir başkadır!'],
      friendly: ['{player}, sana iyi bir parça ayırdım, al da evde pişir!', 'Sen dürüst birine benziyorsun, seyyar satıcının dilbazlığı sende yok.'],
      bestFriend: ['{player} ne zaman düğün yapacak da beni çağıracak bakalım?', '{title} artık benim yarı evladım sayılır!']
    }
  },
  {
    id: 'a_hua',
    name: 'Zehra',
    gender: 'female',
    role: 'Hasan Enişte’nin torunu',
    personality: 'çocuksu ve neşeli',
    birthday: { season: 'spring', day: 1 },
    lovedItems: ['watermelon', 'wild_berry'],
    likedItems: ['peach', 'honey', 'peanut', 'rabbit_foot'],
    hatedItems: ['herb', 'ginseng'],
    dialogues: {
      stranger: ['Sen kimsin? Ben Zehra! Dedem yabancılarla konuşma dedi... Aaa konuştum işte!', '{title}, ne ekiyorsun? Güzel mi bari?'],
      acquaintance: ['{title}! Bugün yine beni kızdırdılar!', 'Hoca bana adımı yazmayı öğretiyor ama zor vallahi.'],
      friendly: ['{player}, bak ne güzel taş buldum sana göstereyim!', 'Ben en çok {title}’ı severim! Herkesten daha çok!'],
      bestFriend: ['{player}, sana resim yaptım! Bak, burada tarlada çalışıyorsun.', 'Büyüyünce ben de {title} gibi güçlü olacağım!']
    }
  },
  {
    id: 'shi_tou',
    name: 'Yaman',
    gender: 'male',
    role: 'Köyün afacanı',
    personality: 'yaramaz',
    birthday: { season: 'summer', day: 25 },
    lovedItems: ['sweet_potato', 'watermelon'],
    likedItems: ['wild_berry', 'corn', 'peanut', 'rabbit_foot'],
    hatedItems: ['tea', 'herb'],
    dialogues: {
      stranger: ['Hehehe! Yeni gelen çiftçi sen misin? Pek de güçlü görünmüyorsun ha!', 'Ben Yaman! Köyün en hızlı koşanı benim!'],
      acquaintance: ['{title}, yarışalım mı?', 'Bugün hocanın mürekkebine su kattım da fark etmedi! Hehehe!'],
      friendly: ['{player}, bana balık tutmayı öğret ya! Aylin abla çok ses yapıyorsun diye kızıyor.', 'Sana bir sır vereyim mi? Köyün arkasındaki mağarada yarasalar var!'],
      bestFriend: ['Aslında... {player}, anamla babam dışarıda çalışıyor, uzun zamandır gelmediler.', '{title} burada kalacak değil mi? Gitme olur mu?']
    }
  },
  {
    id: 'hui_niang',
    name: 'Meryem',
    gender: 'female',
    role: 'Nakış dükkânı sahibi',
    personality: 'güçlü ve yumuşak huylu',
    birthday: { season: 'winter', day: 8 },
    lovedItems: ['silk', 'chrysanthemum', 'alpaca_wool'],
    likedItems: ['wool', 'tea', 'osmanthus', 'rabbit_fur', 'peacock_feather', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'copper_ore'],
    dialogues: {
      stranger: ['Merhaba, ben Meryem. Bu dükkân eşimden kaldı.', '{title}, nakış işi istersen buyur bak.'],
      acquaintance: ['Bu dükkânı tek başıma döndürmek kolay değildi ama şükür, ayakta kaldım.', '{title} bugün keyifli görünüyor.'],
      friendly: ['{player}, güven veren biri. İnsanın içi rahat ediyor.', 'Şu işlemeli mendili {title} için yaptım, kabul et.'],
      bestFriend: ['{player} bana insanın tek başına da ayakta kalabileceğini hatırlattı.', '{title} olunca Meryem kendini yalnız hissetmiyor.']
    }
  },
  {
    id: 'lao_lu',
    name: 'Rıza Dayı',
    gender: 'male',
    role: 'Mahzen sahibi',
    personality: 'misafirperver ve içkiye düşkün',
    birthday: { season: 'autumn', day: 8 },
    lovedItems: ['watermelon_wine', 'peach_wine'],
    likedItems: ['jujube_wine', 'corn_wine', 'peanut', 'rabbit_foot'],
    hatedItems: ['tea', 'herb'],
    dialogues: {
      stranger: ['Gel gel! Bir tas içmeden gitmek yok! Ben Rıza Dayı!', 'İnsan dünyaya bir kere geliyor, içmeden ne tadı var hayatın? {title}, değil mi?'],
      acquaintance: ['{title}! Gel de şu yeni mayayı dene!', 'Zeyno’nun eli içkiye benden de yatkın çıktı ha...'],
      friendly: ['{player} dürüst adam, Rıza Dayı da dürüst adamla içer.', 'Şu üç yıllık küpü {title} için saklıyordum.'],
      bestFriend: ['{player} ile kadeh tokuşturmak bu ömürdeki en güzel bahtlarımdan biri.', '{title}, hadi vur kadehi!']
    }
  },
  {
    id: 'liu_cunzhang',
    name: 'Muhtar Mehmet',
    gender: 'male',
    role: 'Muhtar',
    personality: 'vakur ve adil',
    birthday: { season: 'summer', day: 5 },
    lovedItems: ['tea', 'ginseng'],
    likedItems: ['herb', 'osmanthus', 'bamboo', 'rabbit_foot'],
    hatedItems: ['pickled_cabbage', 'firewood'],
    dialogues: {
      stranger: ['Demek o eski çiftliği devralan genç sensin. Ben Muhtar Mehmet. Atalarından kalanı yere düşürme.', 'Bu köyün bir düzeni, bir adabı vardır; bozulmaz.'],
      acquaintance: ['{title}, son zamanlarda iyi çalışıyorsun, köylü memnun senden.', 'Kızım senden birkaç kez söz etti... Hm.'],
      friendly: ['{player}, köy için yaptıklarını görüyorum.', 'Senin deden de aynı bu şekilde gözü pekti.'],
      bestFriend: ['{player}, bu köy için büyük nimettir.', 'Yaşlandık artık; bu köyün yükünü {title} gibi gençler taşıyacak.']
    }
  },
  {
    id: 'qian_niang',
    name: 'Yasemin',
    gender: 'female',
    role: 'Eczane çırağı',
    personality: 'utangaç ve yumuşak başlı',
    birthday: { season: 'winter', day: 12 },
    lovedItems: ['herb', 'ginseng'],
    likedItems: ['tea', 'chrysanthemum', 'winter_bamboo_shoot', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'gold_ore'],
    dialogues: {
      stranger: ['Aa... merhaba... Ben Yasemin, Hekim Dede’nin çırağıyım.', 'Ota çöpe ihtiyacın olursa... bana gelebilirsin...'],
      acquaintance: ['{title} hoş geldin... Bugün taze ot topladım.', 'Hekim Dede bana çok tarif öğretiyor, ben de ezberlemeye çalışıyorum...'],
      friendly: ['{player}, şu hapları ben deneme diye yaptım, d-denemek ister misin?', '{title} gelince o kadar çekinmiyorum.'],
      bestFriend: ['{player} ile olunca... sanki biraz daha cesur oluyorum.', '{title} için güç ilacını ben özenle hazırlarım.']
    }
  },
  {
    id: 'he_zhanggui',
    name: 'Kahveci Bekir',
    gender: 'male',
    role: 'Kıraathane sahibi',
    personality: 'konuşkan ve insan sarrafı',
    birthday: { season: 'spring', day: 15 },
    lovedItems: ['tea', 'honey'],
    likedItems: ['osmanthus', 'lotus_seed', 'peanut', 'rabbit_foot'],
    hatedItems: ['iron_ore', 'stone'],
    dialogues: {
      stranger: ['Hoş geldin efendim! Ben Bekir, buyur bir çayımızı iç!', '{title} ilk defa mı geliyor? Otur hele!'],
      acquaintance: ['{title}’ın yeri hazır, her zamanki köşe senin!', 'Köyün bütün dedikodusu... şey yani haberleri burada döner.'],
      friendly: ['{player}, senin çiftlikte olanları duymadığım kalmadı, hah hah!', 'İyi çay iyi dosta yakışır; {title} da benim iyi dostum.'],
      bestFriend: ['{player}’ın huyunu suyunu köyde kötüleyen çıkmaz.', '{title}’dan çay parası almak da neymiş, eski dosttan para mı alınır?']
    }
  },
  {
    id: 'qin_dashu',
    name: 'Kemal Amca',
    gender: 'male',
    role: 'Meyve bahçesi sahibi',
    personality: 'dürüst ve çalışkan',
    birthday: { season: 'autumn', day: 12 },
    lovedItems: ['peach', 'jujube'],
    likedItems: ['persimmon', 'sweet_potato', 'corn', 'rabbit_foot'],
    hatedItems: ['jade', 'moonstone'],
    dialogues: {
      stranger: ['Merhaba, ben Kemal Amca. Köyün doğusunda bahçem var.', 'Ağaç işi sabır ister, {title}. Dikince hemen vermez.'],
      acquaintance: ['{title} sen de meyve ağacı dikiyorsun ha? Bilmediğin olursa sor.', 'Bu yılın şeftalisi pek tatlı oldu, sana da ayırdım.'],
      friendly: ['{player}’ın toprak işi gitgide ustalaşıyor.', 'Şu fidanları ben yetiştirdim, {title} al da dik.'],
      bestFriend: ['{player} bana gençliğimin azmini hatırlatıyor.', 'Benim bahçenin kapısı {title}’a her zaman açık.']
    }
  },
  {
    id: 'a_fu',
    name: 'Ufuk',
    gender: 'male',
    role: 'Çoban çırağı',
    personality: 'iyi kalpli ve neşeli',
    birthday: { season: 'winter', day: 5 },
    lovedItems: ['sweet_potato', 'milk', 'goat_milk'],
    likedItems: ['corn', 'hay', 'wild_berry', 'truffle', 'buffalo_milk', 'rabbit_foot'],
    hatedItems: ['jade', 'silk'],
    dialogues: {
      stranger: ['Hehe, merhaba! Ben Ufuk! İbo ağabeye yardım ederim!', 'İnekler çok tatlıdır, {title} sence de öyle değil mi!'],
      acquaintance: ['{title}! Bugün inek yine çitten çıktı, hehe.', 'İbo ağabey diyor ki ilerde ben de çiftlik sahibi olabilirmişim!'],
      friendly: ['{player}’ın tavukları yumurtladı mı? Bizim inek bugün süt verdi!', '{title} için bir saman şapkası ördüm, çirkin ama güneşi keser!'],
      bestFriend: ['{player} bana çok iyi davranıyor... İbo ağabey gibi.', 'Büyüyünce ben de {title} gibi işe yarar biri olacağım!']
    }
  }
]

/** ID'ye göre NPC tanımını getir */
export const getNpcById = (id: string): NpcDef | undefined => {
  return NPCS.find(n => n.id === id)
                 }
