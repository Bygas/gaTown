import type { SecretNoteDef } from '@/types'

/** Tüm gizli notlar */
export const SECRET_NOTES: SecretNoteDef[] = [
  {
    id: 1,
    type: 'tip',
    title: 'Yırtık Bir Kâğıt Parçası',
    content: 'Şeftali çiçeği ormanının derinliklerinde bir şeyler saklı gibi görünüyor... İlkbaharda şeftali çiçekleri dökülürken bazen yerde nadir şeyler bulunabilir.',
    usable: false
  },
  {
    id: 2,
    type: 'treasure',
    title: 'Madencinin Vasiyeti',
    content: 'Hayat boyu biriktirdiğim serveti madenin 20. katındaki gizli bir köşeye sakladım... Bu mektubu bulduysan, o para artık senin.',
    usable: true,
    reward: { money: 500 }
  },
  {
    id: 3,
    type: 'npc',
    title: 'Balıkçının Zevki',
    content: 'Aylin en çok Alabalık sever. Ona göre Alabalık, nehirlerin kralıdır; Alabalık tutabilen kişi gerçek bir balıkçıdır.',
    usable: false
  },
  {
    id: 4,
    type: 'story',
    title: 'gaKöy Kayıtları · I',
    content: 'Yüz yıl önce, bir münzevi dünyadan izole bu vadiyi keşfetti. Vadide şeftali çiçekleri her yeri kaplıyor, dere usul usul akıyordu; adeta dünyevi olmayan bir cennetti. Böylece burada bir köy kurup yerleşti ve adını "gaKöy" koydu.',
    usable: false
  },
  {
    id: 5,
    type: 'treasure',
    title: 'Bambu Koruluğunun Gizli Haritası',
    content: 'Bambu koruluğunun en sık yerinde, yosunla kaplı bir taş var. Onu kaldırırsan çok kaliteli bir yeşim taşı bulabilirsin.',
    usable: true,
    reward: { items: [{ itemId: 'jade', quantity: 1 }] }
  },
  {
    id: 6,
    type: 'tip',
    title: 'Balıkçılık Üzerine Notlar',
    content: 'Dolunay gecelerinde sudaki balıklar çok daha hareketli olur. Nadir balıklar yakalamak istiyorsan, dolunay gecesinde denemelisin.',
    usable: false
  },
  {
    id: 7,
    type: 'npc',
    title: 'Demircinin Sırrı',
    content: 'Ali Usta bütün gün demir dövse de aslında bakır cevherini çok sever. Ona göre bakır, en sıcak metaldir.',
    usable: false
  },
  {
    id: 8,
    type: 'story',
    title: 'gaKöy Kayıtları · II',
    content: 'Münzevi öldükten sonra köylüler bu toprakları nesiller boyu korudu. Bir kural koydular: şeftali ormanı kesilmeyecek, dere kirletilmeyecekti. Böylece gaKöy yüz yıl boyunca huzur içinde yaşamını sürdürdü.',
    usable: false
  },
  {
    id: 9,
    type: 'treasure',
    title: 'Nehir Kenarındaki Sır',
    content: 'Derenin kıvrıldığı yerdeki büyük kayanın altına bir miktar para saklamıştım. Bulabilirsen kullan.',
    usable: true,
    reward: { money: 800 }
  },
  {
    id: 10,
    type: 'tip',
    title: 'Toplayıcılık Notu',
    content: 'Yağmurlu günlerde, dağlarda ve ormanda normalde görülmeyen bazı nadir toplanabilirler ortaya çıkar. Özellikle yağmurdan sonraki bambu koruluğu görülmeye değerdir.',
    usable: false
  },
  {
    id: 11,
    type: 'npc',
    title: 'Elif`in İç Dünyası',
    content: 'Elif en çok papatya çiçeğini sever. Her sonbahar bütün bir günü papatyaların altında geçirir.',
    usable: false
  },
  {
    id: 12,
    type: 'treasure',
    title: 'Maden Şifresi',
    content: 'Madenin yer altı nehir katmanının sonunda, suyun oyduğu bir mağara var. İçeride değerli bir aytaşı saklı.',
    usable: true,
    reward: { items: [{ itemId: 'moonstone', quantity: 1 }] }
  },
  {
    id: 13,
    type: 'story',
    title: 'Hanhai Ticaret Yolu',
    content: 'Çok eski zamanlarda gaKöy dünyadan tamamen kopuk değildi. Batıdaki çorak araziden geçen bir ticaret yolu, uzak diyarlara ulaşıyordu. Tüccarlar bu ıssız bölgeye "Hanhai" diyordu; çünkü kum ve taşlar deniz gibi sonsuz görünüyordu.',
    usable: false
  },
  {
    id: 14,
    type: 'tip',
    title: 'Ekim Üzerine Düşünceler',
    content: 'Ürün kalitesi birçok etkene bağlıdır: toprağın verimliliği, sulama sıklığı, mevsime uygunluk... hatta günlük şans bile etkili olabilir.',
    usable: false
  },
  {
    id: 15,
    type: 'npc',
    title: 'Aşçı Kadının Arzusu',
    content: 'Fatma Teyze her zaman mükemmel pilavı pişirmek istemiştir. Ona göre iyi pilav, her güzel yemeğin temelidir.',
    usable: false
  },
  {
    id: 16,
    type: 'treasure',
    title: 'Eski Kuyu Efsanesi',
    content: 'Köy girişindeki terk edilmiş eski kuyunun dibinde, köy kurulduğunda gömülmüş kutsal bir hazine olduğu söylenir. Kuyu kurumuş olsa da hazine hâlâ orada olmalı.',
    usable: true,
    reward: { money: 1500 }
  },
  {
    id: 17,
    type: 'story',
    title: 'Loncanın Geçmişi',
    content: 'Maceracılar Loncası ilk başta sadece avcıların toplandığı küçük bir kulübeydi. Sonraları madendeki canavarlar çoğalınca, avcılar loncayı kurup canavarları temizleme ve köylüleri koruma görevini üstlendi.',
    usable: false
  },
  {
    id: 18,
    type: 'tip',
    title: 'Fırtınalı Maden',
    content: 'Fırtınalı havada madene girildiğinde cevherlerin kalitesinin daha yüksek olduğu söylenir. Belki de yıldırım bir şeyleri harekete geçiriyordur...',
    usable: false
  },
  {
    id: 19,
    type: 'npc',
    title: 'Hekimin Zevki',
    content: 'Hekim Dede her gün mutlaka bir demlik iyi çay içer. Çayın ruhu arındırdığını, gözleri açtığını ve zihni canlandırdığını söyler. Ona iyi çay hediye etmek kesinlikle doğru seçimdir.',
    usable: false
  },
  {
    id: 20,
    type: 'treasure',
    title: 'Şeftali Ormanı Hazinesi',
    content: 'Şeftali ormanındaki en yaşlı ağacın altında, kadim bir tohum gömülü. Söylentiye göre köyü kuran münzeviden kalma.',
    usable: true,
    reward: { items: [{ itemId: 'ancient_seed', quantity: 1 }] }
  },
  {
    id: 21,
    type: 'story',
    title: 'Müzenin Gizli Geçmişi',
    content:
      'Müze aslında eskiden köy tapınağıydı. Daha sonra bazı bilginler, köylülerin bulduğu fosil ve antik eşyaların tek bir yerde korunmasını önerdi. Böylece tapınak müzeye dönüştürüldü. Söylentiye göre tüm sergiler tamamlanırsa bir mucize gerçekleşecek.',
    usable: false
  },
  {
    id: 22,
    type: 'tip',
    title: 'Sera Sırrı',
    content: 'Kışın her şey solar, ama serada dört mevsim bahar yaşanır. Eğer bir seran varsa, kışın da ekim yapmaya devam edebilirsin.',
    usable: false
  },
  {
    id: 23,
    type: 'npc',
    title: 'Hasan Enişte`nim Sağlık Sırrı',
    content: 'Hasan Enişte sağlıklı yaşama çok önem verir ve sarı kantoronun bütün otların kralı olduğunu söyler. Ona sarı kantoron verirsen çok mutlu olur.',
    usable: false
  },
  {
    id: 24,
    type: 'treasure',
    title: 'Terk Edilmiş Maden Kuyusu',
    content: 'Madenin derinliklerinde kapatılmış bir yan tünel var; söylenene göre burası daha eski bir maden kuyusunun kalıntısı. İçeride sadece altın ve gümüş değil, çok değerli iridyum cevheri de var.',
    usable: true,
    reward: { money: 2000, items: [{ itemId: 'iridium_ore', quantity: 1 }] }
  },
  {
    id: 25,
    type: 'story',
    title: 'gaKöy`ün Gizli Hikâyesi',
    content:
      'gaKöy’ün yer altının derinliklerinde, kadim bir gücün mühürlü olduğu söylenir. Köyü kuran münzevinin bu yeri seçmesi tesadüf değildi; o, bu gücün koruyucusuydu. Artık koruyucu yok ve güç yavaş yavaş uyanıyor... Belki de bu yüzden madendeki canavarlar gitgide çoğalıyor.',
    usable: false
  },

  // Ruhani varlık ipuçları
  {
    id: 26,
    type: 'story',
    title: 'Pul Işığı Altındaki Fısıltı',
    content:
      'Köyün yaşlılarına göre, arka dağdaki şelalenin derinliklerinde zümrüt renkli ruhani bir ejder yaşıyor. Her ilkbahar yağmurlu gecede suda pul gibi parıltılar belirirmiş. Efsanevi Yeşil Ejder Balığı’nı yakalayabilirsen, belki onun varlığını hissedebilirsin.',
    usable: false
  },
  {
    id: 27,
    type: 'story',
    title: 'Yeşim Havan Parçası',
    content:
      'Ot toplarken tesadüfen yeşim beyazı bir parça buldum; sanki bir havan tokmağının kırık parçası gibiydi. Yaşlılar, dolunay gecelerinde bambu koruluğunun derinliklerinden bazen tıkırtılı ilaç ezme sesleri duyulduğunu söylüyor. Ama kimsenin bunu kimin yaptığı hakkında fikri yok.',
    usable: false
  },
  {
    id: 28,
    type: 'story',
    title: 'Altın Işığın Gölgesi',
    content:
      'Birden fazla köylü alacakaranlıkta altın bir ışığın geçtiğini gördüğünü söylüyor. Rivayete göre köyün yakınındaki dağlarda bin yıllık bir tilki ruhu yaşıyor — hem iyi hem kötü, yolculara bilmece sormayı sever. Söylenene göre sadece yeterince zengin ve halk arasında sevilen kişiler onun dikkatini çekebilir.',
    usable: false
  }
]
