<template>
  <div>
    <!-- Başlık -->
    <div class="flex items-center justify-between mb-1">
      <div class="flex items-center space-x-1.5 text-sm text-accent">
        <FlaskConical :size="14" />
        <span>Yetiştirme</span>
      </div>
      <span class="text-xs text-muted">Tohum Kutusu {{ breedingStore.boxCount }}/{{ breedingStore.maxSeedBox }}</span>
    </div>

    <!-- İki sekme -->
    <div class="flex space-x-1 mb-3">
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'breeding' }" @click="tab = 'breeding'">Yetiştirme Masası</Button>
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'compendium' }" @click="tab = 'compendium'">
        Ansiklopedi
      </Button>
    </div>

    <!-- ===== Yetiştirme Sekmesi ===== -->
    <template v-if="tab === 'breeding'">
      <!-- Yetiştirme Alanı -->
      <div class="mb-3">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs text-muted">Yetiştirme Masası {{ breedingStore.stationCount }}/{{ MAX_BREEDING_STATIONS }}</span>
          <Button v-if="breedingStore.stationCount < MAX_BREEDING_STATIONS" :icon="Plus" :icon-size="12" @click="showCraftModal = true">
            İnşa Et
          </Button>
        </div>

        <!-- Boş durum -->
        <div v-if="breedingStore.stationCount === 0" class="border border-accent/10 rounded-xs py-6 flex flex-col items-center space-y-2">
          <Dna :size="32" class="text-muted/30" />
          <p class="text-xs text-muted">Henüz yetiştirme masası yok</p>
          <p class="text-xs text-muted/60">Yetiştirme masası inşa ederek hibrit üretim yapabilirsin</p>
        </div>

        <!-- Liste -->
        <div v-else class="flex flex-col space-y-1.5">
          <div v-for="(slot, idx) in breedingStore.stations" :key="idx" class="border border-accent/20 rounded-xs px-3 py-2">
            <!-- Boş -->
            <template v-if="!slot.parentA && !slot.ready">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-1.5">
                  <FlaskConical :size="12" class="text-muted/40" />
                  <span class="text-xs text-muted">Yetiştirme #{{ idx + 1 }} · Boş</span>
                </div>
                <Button :icon="Dna" :icon-size="12" :disabled="breedingStore.boxCount < 2" @click="openBreedingSelect(idx)">Başlat</Button>
              </div>
            </template>

            <!-- İşlemde -->
            <template v-else-if="slot.parentA && !slot.ready">
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center space-x-1.5">
                  <FlaskConical :size="12" class="text-accent" />
                  <span class="text-xs text-accent">Yetiştirme #{{ idx + 1 }} · Devam Ediyor</span>
                </div>
                <span class="text-xs text-muted">{{ slot.daysProcessed }}/{{ slot.totalDays }} gün</span>
              </div>
              <div class="h-1 bg-bg rounded-xs border border-accent/10">
                <div class="h-full rounded-xs bg-accent transition-all"
                  :style="{ width: (slot.daysProcessed / slot.totalDays) * 100 + '%' }" />
              </div>
            </template>

            <!-- Tamamlandı -->
            <template v-else-if="slot.ready">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-1.5">
                  <Sprout :size="12" class="text-success" />
                  <span class="text-xs text-success">Yetiştirme #{{ idx + 1 }} · Tamamlandı</span>
                </div>
                <Button :icon="Check" :icon-size="12" @click="handleCollect(idx)">Topla</Button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Tohum Kutusu -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs text-muted">Tohum Kutusu {{ breedingStore.boxCount }}/{{ breedingStore.maxSeedBox }}</span>
          <button
            v-if="nextSeedBoxUpgrade || breedingStore.seedBoxLevel > 0"
            class="text-[10px] px-2 py-0.5 border rounded-xs"
            :class="nextSeedBoxUpgrade ? 'border-accent/30 text-accent hover:bg-accent/5 cursor-pointer' : 'border-accent/10 text-muted'"
            @click="showSeedBoxUpgradeModal = true"
          >
            <ArrowUpCircle :size="10" class="inline mr-0.5" />
            Sv.{{ breedingStore.seedBoxLevel }}
          </button>
        </div>

        <!-- Boş -->
        <div v-if="breedingStore.boxCount === 0" class="border border-accent/10 rounded-xs py-6 flex flex-col items-center space-y-2">
          <PackageOpen :size="32" class="text-muted/30" />
          <p class="text-xs text-muted">Tohum kutusu boş</p>
          <p class="text-xs text-muted/60">Üretim sırasında nadiren yetiştirme tohumları elde edebilirsin</p>
        </div>

    <!-- İnşa Onay Penceresi -->
<Transition name="panel-fade">
  <div
    v-if="showCraftModal"
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    @click.self="showCraftModal = false"
  >
    <div class="game-panel max-w-xs w-full relative">
      <button class="absolute top-2 right-2 text-muted hover:text-text" @click="showCraftModal = false">
        <X :size="14" />
      </button>

      <p class="text-sm text-accent mb-2">Yetiştirme Masası İnşa Et</p>

      <div class="border border-accent/10 rounded-xs p-2 mb-2">
        <p class="text-xs text-muted mb-1">Gerekli Malzemeler</p>
        <div v-for="mat in craftMaterials" :key="mat.itemId" class="flex items-center justify-between mt-0.5">
          <span class="text-xs">{{ mat.name }}</span>
          <span class="text-xs" :class="mat.enough ? 'text-success' : 'text-danger'">
            {{ mat.owned }}/{{ mat.required }}
          </span>
        </div>
      </div>

      <div class="border border-accent/10 rounded-xs p-2 mb-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Maliyet</span>
          <span class="text-xs" :class="playerStore.money >= BREEDING_STATION_COST.money ? 'text-accent' : 'text-danger'">
            {{ BREEDING_STATION_COST.money }} akçe
          </span>
        </div>
        <div class="flex items-center justify-between mt-0.5">
          <span class="text-xs text-muted">Mevcut Para</span>
          <span class="text-xs">{{ playerStore.money }} akçe</span>
        </div>
      </div>

      <Button
        class="w-full justify-center"
        :class="{ '!bg-accent !text-bg': canCraftStation }"
        :icon="Plus"
        :icon-size="12"
        :disabled="!canCraftStation"
        @click="handleCraftStation"
      >
        İnşa Et
      </Button>
    </div>
  </div>
</Transition>

    <!-- Tohum Detay Penceresi -->
<Transition name="panel-fade">
  <div v-if="detailSeed" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" @click.self="detailSeed = null">
    <div class="game-panel max-w-xs w-full relative">
      <button class="absolute top-2 right-2 text-muted hover:text-text" @click="detailSeed = null">
        <X :size="14" />
      </button>

      <p class="text-sm text-accent mb-2">
        {{ getCropName(detailSeed.genetics.cropId) }} · G{{ detailSeed.genetics.generation }}
      </p>

      <p class="text-xs mb-2 flex items-center space-x-1" :class="seedStarColor(detailSeed.genetics)">
        <span class="flex items-center space-x-px">
          <Star v-for="n in getStarRating(detailSeed.genetics)" :key="n" :size="10" />
        </span>
        <span>(Toplam {{ getTotalStats(detailSeed.genetics) }})</span>
      </p>

      <!-- Özellikler -->
      <div class="flex flex-col space-y-1 mb-3">
        <div v-for="attr in seedAttributes" :key="attr.key" class="flex items-center space-x-2">
          <span class="text-xs text-muted w-10 shrink-0">{{ attr.label }}</span>
          <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
            <div
              class="h-full rounded-xs transition-all"
              :class="attr.barClass"
              :style="{ width: attr.value + '%' }"
            />
          </div>
          <span class="text-xs w-6 text-right">{{ attr.value }}</span>
        </div>
      </div>
<!-- İşlem Butonları -->
<div class="flex flex-col space-y-1">
  <Button class="w-full justify-center text-danger" :icon="Trash2" :icon-size="12" @click="handleDiscard">
    Sil
  </Button>
</div>
</div>
</div>
</Transition>

<!-- Ansiklopedi Detay Penceresi -->
<Transition name="panel-fade">
  <div
    v-if="activeHybrid"
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    @click.self="activeHybrid = null"
  >
    <div class="game-panel max-w-xs w-full relative">
      <button class="absolute top-2 right-2 text-muted hover:text-text" @click="activeHybrid = null">
        <X :size="14" />
      </button>

      <p class="text-sm mb-2" :class="tierColor(activeHybrid.id)">{{ activeHybrid.name }}</p>

      <div class="border border-accent/10 rounded-xs p-2 mb-2">
        <p class="text-xs text-muted">{{ activeHybrid.discoveryText }}</p>
      </div>

      <div class="border border-accent/10 rounded-xs p-2 mb-2">
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Seviye</span>
          <span class="text-xs">{{ TIER_LABELS[getHybridTier(activeHybrid.id)] ?? '1' }}. Nesil</span>
        </div>
        <div class="flex items-center justify-between mt-0.5">
          <span class="text-xs text-muted">Ebeveyn A</span>
          <span class="text-xs">{{ getCropName(activeHybrid.parentCropA) }}</span>
        </div>
        <div class="flex items-center justify-between mt-0.5">
          <span class="text-xs text-muted">Ebeveyn B</span>
          <span class="text-xs">{{ getCropName(activeHybrid.parentCropB) }}</span>
        </div>
        <div class="flex items-center justify-between mt-0.5">
          <span class="text-xs text-muted">Gerekli Tatlılık</span>
          <span class="text-xs text-accent">≥{{ activeHybrid.minSweetness }}</span>
        </div>
        <div class="flex items-center justify-between mt-0.5">
          <span class="text-xs text-muted">Gerekli Verim</span>
          <span class="text-xs text-accent">≥{{ activeHybrid.minYield }}</span>
        </div>
      </div>

      <div class="border border-accent/10 rounded-xs p-2">
        <p class="text-xs text-muted mb-1">Temel Özellikler</p>
        <div class="flex items-center justify-between mt-0.5">
          <span class="text-xs text-muted">Tatlılık</span>
          <span class="text-xs">{{ activeHybrid.baseGenetics.sweetness }}</span>
        </div>
        <div class="flex items-center justify-between mt-0.5">
          <span class="text-xs text-muted">Verim</span>
          <span class="text-xs">{{ activeHybrid.baseGenetics.yield }}</span>
        </div>
        <div class="flex items-center justify-between mt-0.5">
          <span class="text-xs text-muted">Dayanıklılık</span>
          <span class="text-xs">{{ activeHybrid.baseGenetics.resistance }}</span>
        </div>
        <div v-if="getCompendiumEntry(activeHybrid.id)" class="flex items-center justify-between mt-1 pt-1 border-t border-accent/10">
          <span class="text-xs text-muted">Ekiliş Sayısı</span>
          <span class="text-xs">{{ getCompendiumEntry(activeHybrid.id)?.timesGrown ?? 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</Transition>

    <!-- Tohum Kutusu Yükseltme Penceresi -->
<Transition name="panel-fade">
  <div
    v-if="showSeedBoxUpgradeModal"
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    @click.self="showSeedBoxUpgradeModal = false"
  >
    <div class="game-panel max-w-xs w-full relative">
      <button class="absolute top-2 right-2 text-muted hover:text-text" @click="showSeedBoxUpgradeModal = false">
        <X :size="14" />
      </button>

      <p class="text-sm text-accent mb-2">
        <ArrowUpCircle :size="14" class="inline mr-0.5" />
        Tohum Kutusu Bilgisi
      </p>

      <!-- Mevcut Durum -->
      <div class="border border-accent/10 rounded-xs p-2 mb-2">
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Mevcut Seviye</span>
          <span class="text-xs text-accent">Sv.{{ breedingStore.seedBoxLevel }}</span>
        </div>
        <div class="flex items-center justify-between mt-0.5">
          <span class="text-xs text-muted">Kapasite</span>
          <span class="text-xs text-text">{{ breedingStore.maxSeedBox }} slot</span>
        </div>
      </div>

          <!-- Sonraki Seviye -->
<template v-if="nextSeedBoxUpgrade">
  <div class="border border-accent/10 rounded-xs p-2 mb-2">
    <p class="text-xs text-muted mb-1">Sv.{{ breedingStore.seedBoxLevel + 1 }} seviyesine yükselt</p>
    <div class="flex items-center justify-between">
      <span class="text-xs text-muted">Kapasite</span>
      <span class="text-xs text-text">
        {{ breedingStore.maxSeedBox }} → {{ breedingStore.maxSeedBox + SEED_BOX_UPGRADE_INCREMENT }}
      </span>
    </div>
  </div>

  <!-- Gerekli Malzemeler -->
  <div class="border border-accent/10 rounded-xs p-2 mb-2">
    <p class="text-xs text-muted mb-1">Gerekli Malzemeler</p>
    <div v-for="mat in nextSeedBoxUpgrade.materials" :key="mat.itemId" class="flex items-center justify-between">
      <span class="text-xs text-muted">{{ getItemById(mat.itemId)?.name }}</span>
      <span class="text-xs" :class="getCombinedItemCount(mat.itemId) >= mat.quantity ? '' : 'text-danger'">
        {{ getCombinedItemCount(mat.itemId) }}/{{ mat.quantity }}
      </span>
    </div>
    <div class="flex items-center justify-between mt-0.5">
      <span class="text-xs text-muted">Para</span>
      <span class="text-xs" :class="playerStore.money >= nextSeedBoxUpgrade.cost ? '' : 'text-danger'">
        {{ nextSeedBoxUpgrade.cost }} akçe
      </span>
    </div>
  </div>

            <!-- Kapasite Artırma Butonu -->
<Button
  v-if="!showSeedBoxUpgradeConfirm"
  class="w-full justify-center"
  :class="{ '!bg-accent !text-bg': canUpgradeSeedBox }"
  :icon="ArrowUpCircle"
  :icon-size="12"
  :disabled="!canUpgradeSeedBox"
  @click="showSeedBoxUpgradeConfirm = true"
>
  Tohum Kutusunu Genişlet
</Button>

<!-- Onay -->
<div v-else class="flex space-x-1">
  <Button class="flex-1 justify-center" @click="showSeedBoxUpgradeConfirm = false">İptal</Button>
  <Button
    class="flex-1 justify-center !bg-accent !text-bg"
    :icon="ArrowUpCircle"
    :icon-size="12"
    @click="handleSeedBoxUpgrade"
  >
    Genişletmeyi Onayla
  </Button>
</div>
</template>
<p v-else class="text-[10px] text-muted text-center">Tohum kutusu maksimum seviyeye ulaştı.</p>
</div>
</div>
</Transition>

<!-- Yetiştirme Seçim Penceresi -->
<Transition name="panel-fade">
  <div
    v-if="breedingSelectSlot !== null"
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    @click.self="cancelBreedingSelect"
  >
    <div class="game-panel max-w-xs w-full relative">
      <button class="absolute top-2 right-2 text-muted hover:text-text" @click="cancelBreedingSelect">
        <X :size="14" />
      </button>

      <p class="text-sm text-accent mb-1">İki tohum seç</p>
      <p class="text-xs text-muted mb-2">Seçilen: {{ selectedSeedIds.length }}/2</p>
          
          <div class="flex flex-col space-y-1 max-h-60 overflow-y-auto mb-3">
  <button
    v-for="seed in breedingStore.breedingBox"
    :key="seed.genetics.id"
    class="flex items-center justify-between px-2 py-1 border rounded-xs text-xs cursor-pointer hover:bg-accent/5"
    :class="selectedSeedIds.includes(seed.genetics.id) ? 'border-accent bg-accent/10' : 'border-accent/20'"
    @click="toggleSeedSelect(seed.genetics.id)"
  >
    <span :class="seedStarColor(seed.genetics)">
      {{ getCropName(seed.genetics.cropId) }} G{{ seed.genetics.generation }}
    </span>
    <span class="text-muted flex items-center space-x-1">
      <span class="flex items-center space-x-px">
        <Star v-for="n in getStarRating(seed.genetics)" :key="n" :size="10" />
      </span>
      <span>{{ getTotalStats(seed.genetics) }}</span>
    </span>
  </button>
</div>

<!-- Hibrit İpucu -->
<div
  v-if="crossBreedHint"
  class="border rounded-xs p-2 mb-3"
  :class="crossBreedHint.type === 'recipe' && crossBreedHint.canSucceed ? 'border-success/30' : 'border-accent/10'"
>
  <template v-if="crossBreedHint.type === 'same'">
    <p class="text-xs text-muted">
      Aynı tür yetiştirme: Yavrunun özelliklerini artırır, yeni tür üretmez.
    </p>
  </template>

  <template v-else-if="crossBreedHint.type === 'no_recipe'">
    <p class="text-xs text-muted">
      Bu iki tür için bilinen bir hibrit formülü yok.
    </p>
  </template>

  <template v-else-if="crossBreedHint.type === 'recipe'">
    <p class="text-xs text-accent mb-1">Hibrit mümkün: {{ crossBreedHint.name }}</p>

    <div class="flex items-center justify-between">
      <span class="text-xs text-muted">Tatlılık</span>
      <span class="text-xs" :class="crossBreedHint.sweetOk ? 'text-success' : 'text-danger'">
        {{ crossBreedHint.avgSweet }} / {{ crossBreedHint.minSweet }}
      </span>
    </div>

    <div class="flex items-center justify-between mt-0.5">
      <span class="text-xs text-muted">Verim</span>
      <span class="text-xs" :class="crossBreedHint.yieldOk ? 'text-success' : 'text-danger'">
        {{ crossBreedHint.avgYield }} / {{ crossBreedHint.minYield }}
      </span>
    </div>

    <p v-if="!crossBreedHint.canSucceed" class="text-xs text-danger mt-1">
      Özellikler yetersiz, hibrit başarısız olur. Önce aynı tür yetiştirerek geliştirin.
    </p>
    <p v-else class="text-xs text-success mt-1">
      Özellikler yeterli, hibrit başarılı olabilir!
    </p>
  </template>
</div>
<Button
  class="w-full justify-center"
  :class="{ '!bg-accent !text-bg': selectedSeedIds.length === 2 }"
  :icon="Dna"
  :icon-size="12"
  :disabled="selectedSeedIds.length !== 2"
  @click="handleStartBreeding"
>
  Yetiştirmeyi Başlat
</Button>
</div>
</div>
</Transition>
</div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { FlaskConical, Plus, Check, X, Dna, Trash2, Sprout, PackageOpen, Star, Lock, ArrowUpCircle } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import { useBreedingStore } from '@/stores/useBreedingStore'
  import { useGameStore } from '@/stores/useGameStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { getCombinedItemCount, removeCombinedItem } from '@/composables/useCombinedInventory'
  import { getCropById } from '@/data/crops'
  import { getItemById } from '@/data/items'
  import {
    MAX_BREEDING_STATIONS,
    BREEDING_STATION_COST,
    SEED_BOX_UPGRADE_INCREMENT,
    getStarRating,
    getTotalStats,
    HYBRID_DEFS,
    getHybridTier,
    findPossibleHybrid
  } from '@/data/breeding'
  import { ACTION_TIME_COSTS } from '@/data/timeConstants'
  import { addLog } from '@/composables/useGameLog'
  import { handleEndDay } from '@/composables/useEndDay'
  import type { BreedingSeed, HybridDef } from '@/types/breeding'

  const breedingStore = useBreedingStore()
  const playerStore = usePlayerStore()
  const gameStore = useGameStore()
          
  // === Sekmeler ===

type Tab = 'breeding' | 'compendium'
const tab = ref<Tab>('breeding')

// === Ansiklopedi Seviye Filtresi ===

const TIER_LABELS: Record<number, string> = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10'
}

const TIER_FILTERS = [
  { value: 0, label: 'Tümü' },
  { value: 1, label: '1. Nesil' },
  { value: 2, label: '2. Nesil' },
  { value: 3, label: '3. Nesil' },
  { value: 4, label: '4. Nesil' },
  { value: 5, label: '5. Nesil' },
  { value: 6, label: '6. Nesil' },
  { value: 7, label: '7. Nesil' },
  { value: 8, label: '8. Nesil' },
  { value: 9, label: '9. Nesil' },
  { value: 10, label: '10. Nesil' }
]

const tierFilter = ref(0)

const filteredHybrids = computed(() => {
  if (tierFilter.value === 0) return HYBRID_DEFS
  return HYBRID_DEFS.filter(h => getHybridTier(h.id) === tierFilter.value)
})

const filteredDiscoveredCount = computed(() => {
  return filteredHybrids.value.filter(h => isDiscovered(h.id)).length
})

const totalDiscovered = computed(() => {
  return breedingStore.compendium.length
})

const completionPercent = computed(() => {
  if (HYBRID_DEFS.length === 0) return 0
  return Math.floor((totalDiscovered.value / HYBRID_DEFS.length) * 100)
})

const tierStats = computed(() => {
  const stats: { tier: number; label: string; total: number; discovered: number }[] = []
  for (let t = 1; t <= 10; t++) {
    const hybrids = HYBRID_DEFS.filter(h => getHybridTier(h.id) === t)
    const discovered = hybrids.filter(h => isDiscovered(h.id)).length
    stats.push({
      tier: t,
      label: `${TIER_LABELS[t]}. Nesil`,
      total: hybrids.length,
      discovered
    })
  }
  return stats
  })

/** Seviyeye göre keşfedilmiş türleri renklendir */
const TIER_COLOR_MAP: Record<number, string> = {
  1: 'text-accent',
  2: 'text-quality-fine',
  3: 'text-accent',
  4: 'text-quality-fine',
  5: 'text-quality-excellent',
  6: 'text-quality-excellent',
  7: 'text-quality-supreme',
  8: 'text-quality-supreme',
  9: 'text-quality-supreme',
  10: 'text-quality-supreme'
}

const tierColor = (hybridId: string): string => {
  return TIER_COLOR_MAP[getHybridTier(hybridId)] ?? 'text-accent'
}

// === Ansiklopedi Detayı ===

const activeHybrid = ref<HybridDef | null>(null)

// === Tohum Detayı ===

const detailSeed = ref<BreedingSeed | null>(null)

const openSeedDetail = (seed: BreedingSeed) => {
  detailSeed.value = seed
}

const seedAttributes = computed(() => {
  if (!detailSeed.value) return []
  const g = detailSeed.value.genetics
  return [
    { key: 'sweetness', label: 'Tatlılık', value: g.sweetness, barClass: 'bg-accent' },
    { key: 'yield', label: 'Verim', value: g.yield, barClass: 'bg-success' },
    { key: 'resistance', label: 'Dayanıklılık', value: g.resistance, barClass: 'bg-water' },
    { key: 'stability', label: 'Stabilite', value: g.stability, barClass: 'bg-muted' },
    { key: 'mutationRate', label: 'Mutasyon', value: g.mutationRate, barClass: 'bg-danger' }
  ]
})

  const handleDiscard = () => {
  if (!detailSeed.value) return
  breedingStore.removeFromBox(detailSeed.value.genetics.id)
  addLog('Bir tohum atıldı.')
  detailSeed.value = null
}

// === Yetiştirme Seçimi ===

const breedingSelectSlot = ref<number | null>(null)
const selectedSeedIds = ref<string[]>([])

const openBreedingSelect = (slotIdx: number) => {
  breedingSelectSlot.value = slotIdx
  selectedSeedIds.value = []
}

const cancelBreedingSelect = () => {
  breedingSelectSlot.value = null
  selectedSeedIds.value = []
}

const toggleSeedSelect = (id: string) => {
  const idx = selectedSeedIds.value.indexOf(id)
  if (idx >= 0) {
    selectedSeedIds.value.splice(idx, 1)
  } else if (selectedSeedIds.value.length < 2) {
    selectedSeedIds.value.push(id)
  }
}

/** İki tohum seçildiğinde, hibrit tarif olup olmadığını kontrol eder ve gereksinimleri gösterir */
const crossBreedHint = computed(() => {
  if (selectedSeedIds.value.length !== 2) return null

  const seedA = breedingStore.breedingBox.find(s => s.genetics.id === selectedSeedIds.value[0])
  const seedB = breedingStore.breedingBox.find(s => s.genetics.id === selectedSeedIds.value[1])
  if (!seedA || !seedB) return null

  const a = seedA.genetics
  const b = seedB.genetics

  if (a.cropId === b.cropId) return { type: 'same' as const }

  const hybrid = findPossibleHybrid(a.cropId, b.cropId)
  if (!hybrid) return { type: 'no_recipe' as const }

  const avgSweet = Math.round((a.sweetness + b.sweetness) / 2)
  const avgYield = Math.round((a.yield + b.yield) / 2)

  const sweetOk = avgSweet >= hybrid.minSweetness
  const yieldOk = avgYield >= hybrid.minYield

  return {
    type: 'recipe' as const,
    name: hybrid.name,
    avgSweet,
    avgYield,
    minSweet: hybrid.minSweetness,
    minYield: hybrid.minYield,
    sweetOk,
    yieldOk,
    canSucceed: sweetOk && yieldOk
  }
})

  const handleStartBreeding = () => {
  if (breedingSelectSlot.value === null || selectedSeedIds.value.length !== 2) return

  const ok = breedingStore.startBreeding(
    breedingSelectSlot.value,
    selectedSeedIds.value[0]!,
    selectedSeedIds.value[1]!
  )

  if (ok) {
    addLog('Yetiştirme başladı, 2 gün sonra sonuç alınabilir.')

    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.breeding)
    if (tr.message) addLog(tr.message)

    if (tr.passedOut) {
      handleEndDay()
    }
  } else {
    addLog('Yetiştirme başlatılamadı.')
  }

  cancelBreedingSelect()
}

const handleCollect = (slotIdx: number) => {
  const result = breedingStore.collectResult(slotIdx)
  if (result) {
    const crop = getCropById(result.cropId)
    const stars = getStarRating(result)
    addLog(`Yetiştirme tohumu alındı: ${crop?.name ?? result.cropId} (${stars}★).`)
  }
      }

  // === Yetiştirme Masası İnşası ===

const showCraftModal = ref(false)

const canCraftStation = computed(() => {
  return breedingStore.canCraftStation(playerStore.money, (id: string) => getCombinedItemCount(id))
})

const craftMaterials = computed(() => {
  return BREEDING_STATION_COST.materials.map(m => ({
    itemId: m.itemId,
    name: getItemById(m.itemId)?.name ?? m.itemId,
    required: m.quantity,
    owned: getCombinedItemCount(m.itemId),
    enough: getCombinedItemCount(m.itemId) >= m.quantity
  }))
})

const handleCraftStation = () => {
  if (!canCraftStation.value) return

  breedingStore.craftStation(
    (amount: number) => playerStore.spendMoney(amount),
    (id: string, qty: number) => removeCombinedItem(id, qty)
  )

  addLog('Bir yetiştirme masası inşa edildi.')
  showCraftModal.value = false

  const tr = gameStore.advanceTime(ACTION_TIME_COSTS.breeding)
  if (tr.message) addLog(tr.message)
  if (tr.passedOut) {
    handleEndDay()
  }
}

// === Tohum Kutusu Yükseltme ===

const showSeedBoxUpgradeModal = ref(false)
const showSeedBoxUpgradeConfirm = ref(false)

const nextSeedBoxUpgrade = computed(() => breedingStore.getNextSeedBoxUpgrade())

const canUpgradeSeedBox = computed(() => {
  return breedingStore.canUpgradeSeedBox(playerStore.money, (id: string) => getCombinedItemCount(id))
})

const handleSeedBoxUpgrade = () => {
  const result = breedingStore.upgradeSeedBox(
    (amount: number) => playerStore.spendMoney(amount),
    (id: string, qty: number) => removeCombinedItem(id, qty)
  )

  addLog(result.message)

  if (result.success) {
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.breeding)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  }

  showSeedBoxUpgradeConfirm.value = false
  showSeedBoxUpgradeModal.value = false
}

// === Ansiklopedi ===

const isDiscovered = (hybridId: string): boolean => {
  return breedingStore.compendium.some(e => e.hybridId === hybridId)
}

const getCompendiumEntry = (hybridId: string) => {
  return breedingStore.compendium.find(e => e.hybridId === hybridId) ?? null
}

// === Yardımcılar ===

const getCropName = (cropId: string): string => {
  return getCropById(cropId)?.name ?? cropId
}

const seedStarColor = (g: { sweetness: number; yield: number; resistance: number }): string => {
  const total = g.sweetness + g.yield + g.resistance

  if (total >= 250) return 'text-quality-supreme'
  if (total >= 200) return 'text-quality-excellent'
  if (total >= 150) return 'text-quality-fine'
  return ''
}
</script>
