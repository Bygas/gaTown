import type { MuseumItemDef, MuseumMilestone } from '@/types'

/** Müzeye bağışlanabilecek eşyaların tam kataloğu */
export const MUSEUM_ITEMS: MuseumItemDef[] = [
  // ===== Cevherler (7) =====
  { id: 'copper_ore', name: 'Bakır Cevheri', category: 'ore', sourceHint: 'Madenin sığ katmanlarından toplanır' },
  { id: 'iron_ore', name: 'Demir Cevheri', category: 'ore', sourceHint: 'Madenin buz katmanlarından toplanır' },
  { id: 'gold_ore', name: 'Altın Cevheri', category: 'ore', sourceHint: 'Madenin lav katmanlarından toplanır' },
  { id: 'crystal_ore', name: 'Kristal Cevheri', category: 'ore', sourceHint: 'Madenin kristal katmanlarından toplanır' },
  { id: 'shadow_ore', name: 'Gölge Cevheri', category: 'ore', sourceHint: 'Madenin gölge katmanlarından toplanır' },
  { id: 'void_ore', name: 'Boşluk Cevheri', category: 'ore', sourceHint: 'Madenin uçurum katmanlarından toplanır' },
  { id: 'iridium_ore', name: 'İridyum Cevheri', category: 'ore', sourceHint: 'Kafatası Maden Oyuğu’ndan toplanır' },

  // ===== Değerli Taşlar (7) =====
  { id: 'quartz', name: 'Kuvars', category: 'gem', sourceHint: 'Madenin her katmanında bulunabilir' },
  { id: 'jade', name: 'Yeşim', category: 'gem', sourceHint: 'Madenin buz katmanından aşağısında bulunur' },
  { id: 'ruby', name: 'Yakut', category: 'gem', sourceHint: 'Madenin lav katmanından aşağısında bulunur' },
  { id: 'moonstone', name: 'Aytaşı', category: 'gem', sourceHint: 'Madenin kristal katmanında bulunur' },
  { id: 'obsidian', name: 'Obsidyen', category: 'gem', sourceHint: 'Madenin gölge katmanında bulunur' },
  { id: 'dragon_jade', name: 'Ejder Yeşimi', category: 'gem', sourceHint: 'Madenin uçurum katmanında bulunur' },
  { id: 'prismatic_shard', name: 'Prizmatik Parça', category: 'gem', sourceHint: 'Son derece nadir, derin katman sandıklarında çıkar' },

  // ===== Metal Külçeleri (4) =====
  { id: 'copper_bar', name: 'Bakır Külçesi', category: 'bar', sourceHint: 'Bakır cevheri ergitilerek elde edilir' },
  { id: 'iron_bar', name: 'Demir Külçesi', category: 'bar', sourceHint: 'Demir cevheri ergitilerek elde edilir' },
  { id: 'gold_bar', name: 'Altın Külçesi', category: 'bar', sourceHint: 'Altın cevheri ergitilerek elde edilir' },
  { id: 'iridium_bar', name: 'İridyum Külçesi', category: 'bar', sourceHint: 'İridyum cevheri ergitilerek elde edilir' },

  // ===== Fosiller (8) =====
  { id: 'trilobite_fossil', name: 'Trilobit Fosili', category: 'fossil', sourceHint: 'Madenin sığ ve buz katmanı sandıklarında bulunur' },
  { id: 'amber', name: 'Kehribar', category: 'fossil', sourceHint: 'Madenin yeraltı nehir katmanında düşer' },
  { id: 'ammonite_fossil', name: 'Ammonit Fosili', category: 'fossil', sourceHint: 'Lav ve kristal katmanı sandıklarında bulunur' },
  { id: 'fern_fossil', name: 'Eğrelti Fosili', category: 'fossil', sourceHint: 'Bambu ormanında nadir toplanır' },
  { id: 'shell_fossil', name: 'Kabuk Fosili', category: 'fossil', sourceHint: 'Madenin sığ ve buz katmanı sandıklarında bulunur' },
  { id: 'bone_fragment', name: 'Kemik Parçası', category: 'fossil', sourceHint: 'Derin katman canavarlarından nadiren düşer' },
  { id: 'petrified_wood', name: 'Taşlaşmış Odun', category: 'fossil', sourceHint: 'Bambu ormanında nadir toplanır' },
  { id: 'dragon_tooth', name: 'Ejder Dişi Fosili', category: 'fossil', sourceHint: 'Uçurum katmanı sandıklarında ya da kemik ejderden düşer' },

  // ===== Antik Eşyalar (10) =====
  { id: 'ancient_pottery', name: 'Antik Çömlek Parçası', category: 'artifact', sourceHint: 'Bambu ormanında nadir toplanır' },
  { id: 'jade_disc', name: 'Yeşim Disk Parçası', category: 'artifact', sourceHint: 'Kristal katmanı sandıklarında bulunur' },
  { id: 'bronze_mirror', name: 'Bronz Ayna', category: 'artifact', sourceHint: 'Lav katmanı sandıklarında bulunur' },
  { id: 'ancient_coin', name: 'Antik Bakır Sikke', category: 'artifact', sourceHint: 'Madenin yeraltı nehir katmanında düşer' },
  { id: 'oracle_bone', name: 'Kehanet Kemiği Parçası', category: 'artifact', sourceHint: 'Gölge katmanı sandıklarında bulunur' },
  { id: 'jade_pendant', name: 'Yeşim Kolye Ucu', category: 'artifact', sourceHint: 'Kristal katmanında düşer' },
  { id: 'ancient_seed', name: 'Antik Tohum', category: 'artifact', sourceHint: 'Derin katman sandıklarında son derece nadir bulunur' },
  { id: 'bamboo_scroll', name: 'Bambu Tomar', category: 'artifact', sourceHint: 'Bambu ormanında nadir toplanır' },
  { id: 'stone_axe_head', name: 'Taş Balta Başı', category: 'artifact', sourceHint: 'Bambu ormanında nadir toplanır' },
  { id: 'painted_pottery', name: 'Boyalı Çömlek Parçası', category: 'artifact', sourceHint: 'Lav katmanı sandıklarında bulunur' },

  // ===== Ruhani Eşyalar (4) =====
  { id: 'fox_bead', name: 'Tilki İncisi', category: 'spirit', sourceHint: 'Madenin derinliklerinde bulunur (tilki ruhuyla ilgili ipuçlarıyla)' },
  { id: 'spirit_peach', name: 'Ruh Şeftalisi', category: 'spirit', sourceHint: 'Şeftali ruhunun kutsadığı ağaçlardan nadiren çıkar' },
  { id: 'moon_herb', name: 'Ay Otu', category: 'spirit', sourceHint: 'Ay tavşanının kutsamasından sonra toplarken elde etme ihtimali vardır' },
  { id: 'dream_silk', name: 'Rüya İpeği', category: 'spirit', sourceHint: 'Gui Kadın’ın kutsamasından sonra tezgahta nadiren üretilir' }
]

/** Müze kategori etiketleri */
export const MUSEUM_CATEGORIES = [
  { key: 'ore' as const, label: 'Cevher' },
  { key: 'gem' as const, label: 'Değerli Taş' },
  { key: 'bar' as const, label: 'Metal Külçesi' },
  { key: 'fossil' as const, label: 'Fosil' },
  { key: 'artifact' as const, label: 'Antik Eşya' },
  { key: 'spirit' as const, label: 'Ruhani Eşya' }
]

/** Müze kilometre taşı ödülleri */
export const MUSEUM_MILESTONES: MuseumMilestone[] = [
  { count: 5, name: 'İlk Adım', reward: { money: 300 } },
  { count: 10, name: 'Küçük Koleksiyon', reward: { money: 500, items: [{ itemId: 'ancient_seed', quantity: 1 }] } },
  { count: 15, name: 'Cevher Uzmanı', reward: { money: 1000 } },
  { count: 20, name: 'Geçmişin Bilgesi', reward: { money: 1500, items: [{ itemId: 'prismatic_shard', quantity: 1 }] } },
  { count: 25, name: 'Emanet Koruyucusu', reward: { money: 3000 } },
  { count: 30, name: 'Kadim İzlerin Peşinde', reward: { money: 5000, items: [{ itemId: 'iridium_bar', quantity: 3 }] } },
  { count: 36, name: 'Müzenin Yıldızı', reward: { money: 10000 } },
  { count: 40, name: 'Ruhani Koleksiyon Ustası', reward: { money: 8000, items: [{ itemId: 'moonstone', quantity: 3 }] } }
]

/** ID'ye göre müze eşyasını bul */
export const getMuseumItemById = (id: string): MuseumItemDef | undefined => MUSEUM_ITEMS.find(item => item.id === id)
