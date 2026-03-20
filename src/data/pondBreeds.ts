import type { PondBreedDef } from '@/types/fishPond'

// === Tür dağılımı ===
// 13 temel balık türü, toplam 5 nesilde 400 tür
// Nesil 1 = 200, Nesil 2 = 100, Nesil 3 = 50, Nesil 4 = 30, Nesil 5 = 20
// Zincir yapısı: Nesil N'in ebeveynleri, Nesil N-1'den gelir; ebeveyn eşleşmeleri tekrar etmez

// [baseFishId, suffix, gen1, gen2, gen3, gen4, gen5]
const SPECIES_CFG: [string, string, number, number, number, number, number][] = [
  ['crucian',        'Sazan',        16, 8, 4, 3, 2],
  ['carp',           'Karp',         16, 8, 4, 3, 2],
  ['grass_carp',     'Ot Sazanı',    16, 8, 4, 3, 2],
  ['golden_carp',    'Altın Karp',   16, 8, 4, 3, 2],
  ['koi',            'Koi',          16, 8, 4, 3, 2],
  ['pond_turtle',    'Kaplumbağa',   15, 8, 4, 3, 2],
  ['bass',           'Levrek',       15, 8, 4, 3, 2],
  ['catfish',        'Yayın',        15, 8, 4, 3, 2],
  ['yellow_eel',     'Yılanbalığı',  15, 8, 4, 3, 2],
  ['rainbow_trout',  'Alabalık',     15, 7, 4, 3, 2],
  ['mud_loach',      'Çamur Balığı', 15, 7, 4, 0, 0],
  ['pond_snail',     'Salyangoz',    15, 7, 3, 0, 0],
  ['cave_blindfish', 'Kör Balık',    15, 7, 3, 0, 0],
]

// === İsim ön ekleri ===

const G1_PREFIXES = ['Gümüş', 'Altın', 'Kızıl', 'Çiçek', 'Kara', 'Zümrüt', 'Ay', 'Kırağı', 'Yıldız', 'Bulut', 'Yeşim', 'Lacivert', 'Kar', 'Pembe', 'Alev', 'Sis']
const G2_PREFIXES = ['Ruh', 'Peri', 'Narin', 'Hayal', 'Düş', 'Tanrı', 'Kutsal', 'Gök']
const G3_PREFIXES = ['Işık Öz', 'Yeşim Parıltı', 'Ruh Diyarı', 'Peri Âlemi']
const G4_PREFIXES = ['Kadim', 'Başlangıç', 'Kaos']
const G5_PREFIXES = ['Ejderleşen', 'Ateşte Doğan']

// === Eşleştirme algoritması ===
// parentCount kadar ebeveynden childCount kadar benzersiz eş oluşturur

const makePairs = (parentCount: number, childCount: number): [number, number][] => {
  const pairs: [number, number][] = []

  // Strateji 1: Ardışık eşleme (0,1), (2,3), ...
  let i = 0
  while (pairs.length < childCount && i + 1 < parentCount) {
    pairs.push([i, i + 1])
    i += 2
  }

  // Strateji 2: İlk bireyle çapraz eşleme
  let j = i
  while (pairs.length < childCount && j < parentCount) {
    pairs.push([0, j])
    j++
  }

  // Strateji 3: Daha fazla çapraz eşleme
  for (let a = 0; a < parentCount && pairs.length < childCount; a++) {
    for (let b = a + 2; b < parentCount && pairs.length < childCount; b++) {
      if (!pairs.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) {
        pairs.push([a, b])
      }
    }
  }

  return pairs
}

// === Tüm türleri oluştur ===

const buildAllBreeds = (): PondBreedDef[] => {
  const all: PondBreedDef[] = []
  const counters = { g1: 0, g2: 0, g3: 0, g4: 0, g5: 0 }

  for (const [baseFish, suffix, g1n, g2n, g3n, g4n, g5n] of SPECIES_CFG) {
    const g1: PondBreedDef[] = []
    const g2: PondBreedDef[] = []
    const g3: PondBreedDef[] = []
    const g4: PondBreedDef[] = []
    const g5: PondBreedDef[] = []

    // Nesil 1
    for (let i = 0; i < g1n; i++) {
      counters.g1++
      const b: PondBreedDef = {
        breedId: `g1_${String(counters.g1).padStart(3, '0')}`,
        name: G1_PREFIXES[i]! + ' ' + suffix,
        generation: 1,
        baseFishId: baseFish,
        parentBreedA: null,
        parentBreedB: null
      }
      all.push(b)
      g1.push(b)
    }

    // Nesil 2
    const g2Pairs = makePairs(g1n, g2n)
    for (const [a, b] of g2Pairs) {
      counters.g2++
      const breed: PondBreedDef = {
        breedId: `g2_${String(counters.g2).padStart(3, '0')}`,
        name: G2_PREFIXES[g2.length]! + ' ' + suffix,
        generation: 2,
        baseFishId: baseFish,
        parentBreedA: g1[a]!.breedId,
        parentBreedB: g1[b]!.breedId
      }
      all.push(breed)
      g2.push(breed)
    }

    // Nesil 3
    const g3Pairs = makePairs(g2n, g3n)
    for (const [a, b] of g3Pairs) {
      counters.g3++
      const breed: PondBreedDef = {
        breedId: `g3_${String(counters.g3).padStart(3, '0')}`,
        name: G3_PREFIXES[g3.length]! + ' ' + suffix,
        generation: 3,
        baseFishId: baseFish,
        parentBreedA: g2[a]!.breedId,
        parentBreedB: g2[b]!.breedId
      }
      all.push(breed)
      g3.push(breed)
    }

    // Nesil 4
    if (g4n > 0) {
      const g4Pairs = makePairs(g3n, g4n)
      for (const [a, b] of g4Pairs) {
        counters.g4++
        const breed: PondBreedDef = {
          breedId: `g4_${String(counters.g4).padStart(3, '0')}`,
          name: G4_PREFIXES[g4.length]! + ' ' + suffix,
          generation: 4,
          baseFishId: baseFish,
          parentBreedA: g3[a]!.breedId,
          parentBreedB: g3[b]!.breedId
        }
        all.push(breed)
        g4.push(breed)
      }
    }

    // Nesil 5
    if (g5n > 0) {
      const g5Pairs = makePairs(g4n, g5n)
      for (const [a, b] of g5Pairs) {
        counters.g5++
        const breed: PondBreedDef = {
          breedId: `g5_${String(counters.g5).padStart(3, '0')}`,
          name: G5_PREFIXES[g5.length]! + ' ' + suffix,
          generation: 5,
          baseFishId: baseFish,
          parentBreedA: g4[a]!.breedId,
          parentBreedB: g4[b]!.breedId
        }
        all.push(breed)
        g5.push(breed)
      }
    }
  }

  return all
}

/** Tüm tür tanımları (400 adet) */
export const POND_BREEDS: PondBreedDef[] = buildAllBreeds()

/** Tür ID'sine göre bul */
export const getBreedById = (breedId: string): PondBreedDef | undefined =>
  POND_BREEDS.find(b => b.breedId === breedId)

/** Belirli nesildeki tüm türleri getir */
export const getBreedsByGeneration = (gen: 1 | 2 | 3 | 4 | 5): PondBreedDef[] =>
  POND_BREEDS.filter(b => b.generation === gen)

/** Belirli balık türüne ait tüm varyantları getir */
export const getBreedsBySpecies = (baseFishId: string): PondBreedDef[] =>
  POND_BREEDS.filter(b => b.baseFishId === baseFishId)

/** Belirli balık türünün 1. nesil varyantlarını getir */
export const getGen1BreedsForFish = (fishId: string): PondBreedDef[] =>
  POND_BREEDS.filter(b => b.generation === 1 && b.baseFishId === fishId)

/** Ebeveyn tür ID'lerine göre yavru türü bulur (sıra önemsiz) */
export const findBreedByParents = (breedIdA: string, breedIdB: string): PondBreedDef | undefined =>
  POND_BREEDS.find(b =>
    (b.parentBreedA === breedIdA && b.parentBreedB === breedIdB) ||
    (b.parentBreedA === breedIdB && b.parentBreedB === breedIdA)
  )

/** Nesillere göre tür sayıları */
export const BREED_COUNTS: Record<number, number> = {
  1: 200,
  2: 100,
  3: 50,
  4: 30,
  5: 20
}
