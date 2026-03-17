<template>
  <div>
    <h3 class="text-accent text-sm mb-3">
      <TreePine :size="14" class="inline" />
      Bambu Ormanı Toplayıcılığı
    </h3>

    <!-- Toplama işlemi -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm text-accent">Topla</p>
        <span class="text-xs text-muted">{{ forageCost }} enerji · {{ forageTimeLabel }}</span>
      </div>
      <p class="text-xs text-muted mb-2">Baltanı kullanarak bambu ormanında çeşitli kaynaklar ara.</p>
      <div
        class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
        @click="handleForage"
      >
        <span class="text-xs">Bir kez topla</span>
        <span class="text-xs text-muted">{{ playerStore.stamina }}/{{ playerStore.maxStamina }} enerji</span>
      </div>
      <!-- Hava / bonus ipuçları -->
      <div class="flex flex-wrap space-x-3 mt-2">
        <span v-if="weatherMod !== 1" class="text-[10px]" :class="weatherMod > 1 ? 'text-success' : 'text-danger'">
          {{ weatherModLabel }}
        </span>
        <span v-if="hasHerbalistPerk" class="text-[10px] text-success">Şifacı: olasılık +20%</span>
        <span v-if="hasLumberjackPerk" class="text-[10px] text-success">
          {{ foragingSkill.perk10 === 'forester' ? 'Ormancı: garanti odun' : 'Oduncu: %25 ekstra odun' }}
        </span>
        <span v-if="foragingSkill.perk10 === 'tracker'" class="text-[10px] text-success">İzci: ekstra +1 eşya</span>
        <span v-if="cookingLuckBuff > 0" class="text-[10px] text-success">Yemek şansı +{{ cookingLuckBuff }}%</span>
        <span v-if="isForestFarm" class="text-[10px] text-success">Orman çiftliği: deneyim ×1.25</span>
      </div>
    </div>

    <!-- Toplama sonuçları -->
    <div class="border border-accent/20 rounded-xs p-3 mb-4">
      <p class="text-sm text-accent mb-2">
        <Search :size="14" class="inline" />
        Toplama Sonuçları
      </p>
      <div v-if="lastResults.length > 0" class="flex flex-col space-y-1">
        <div
          v-for="(r, i) in lastResults"
          :key="i"
          class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5"
          :class="r.itemId ? 'cursor-pointer hover:bg-accent/5' : ''"
          @click="r.itemId && (selectedResult = r)"
        >
          <span class="text-xs" :class="r.quality ? QUALITY_COLORS[r.quality] : ''">{{ r.label }}</span>
          <span v-if="r.itemId" class="text-xs text-muted/50">Detay ›</span>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-6 text-muted">
        <Search :size="32" class="mb-2" />
        <p class="text-xs">Henüz toplama yapmadın, gidip dene.</p>
      </div>
    </div>

    <!-- Toplanan eşya detay penceresi -->
    <Transition name="panel-fade">
      <div
        v-if="selectedResult && selectedResultDef"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="selectedResult = null"
      >
        <div class="game-panel max-w-xs w-full relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text" @click="selectedResult = null">
            <X :size="14" />
          </button>

          <p class="text-sm mb-2" :class="selectedResult.quality ? QUALITY_COLORS[selectedResult.quality] : 'text-accent'">
            {{ selectedResultDef.name }}
            <span v-if="selectedResult.quantity > 1" class="text-muted">×{{ selectedResult.quantity }}</span>
          </p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ selectedResultDef.description }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Kategori</span>
              <span class="text-xs">{{ CATEGORY_NAMES[selectedResultDef.category] ?? selectedResultDef.category }}</span>
            </div>
            <div v-if="selectedResult.quality && selectedResult.quality !== 'normal'" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Kalite</span>
              <span class="text-xs" :class="QUALITY_COLORS[selectedResult.quality]">{{ QUALITY_NAMES[selectedResult.quality] }}</span>
            </div>
            <div v-if="selectedResultDef.sellPrice > 0" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Satış fiyatı</span>
              <span class="text-xs text-accent">{{ selectedResultDef.sellPrice }} bakır</span>
            </div>
            <div v-if="selectedResultDef.edible" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Yeme etkisi</span>
              <span class="text-xs text-success">
                {{ selectedResultDef.staminaRestore ? `Enerji +${selectedResultDef.staminaRestore}` : '' }}
                {{ selectedResultDef.healthRestore ? `HP +${selectedResultDef.healthRestore}` : '' }}
              </span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Kaynak</span>
              <span class="text-xs">{{ getItemSource(selectedResult.itemId!) }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mevsimlik toplama eşyaları -->
    <div class="border border-accent/20 rounded-xs p-3">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm text-accent">Bu Mevsimin Toplanabilirleri</p>
        <span class="text-xs text-muted">{{ SEASON_NAMES[gameStore.season] }}</span>
      </div>
      <div class="flex flex-col space-y-1">
        <div
          v-for="item in currentForage"
          :key="item.itemId"
          class="flex items-center justify-between border border-accent/10 rounded-xs px-3 py-1.5"
        >
          <div>
            <span class="text-xs">{{ item.name }}</span>
            <span class="text-[10px] text-muted ml-2">+{{ item.expReward }} deneyim</span>
          </div>
          <span class="text-xs text-muted">{{ Math.round(item.chance * 100) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { TreePine, Search, X } from 'lucide-vue-next'
  import { useAchievementStore } from '@/stores/useAchievementStore'
  import { useCookingStore } from '@/stores/useCookingStore'
  import { useGameStore, SEASON_NAMES } from '@/stores/useGameStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { useQuestStore } from '@/stores/useQuestStore'
  import { useSkillStore } from '@/stores/useSkillStore'
  import { useWalletStore } from '@/stores/useWalletStore'
  import type { Quality } from '@/types'
  import { getForageItems, getItemById, getItemSource } from '@/data'
  import { WEATHER_FORAGE_MODIFIER } from '@/data/forage'
  import { ACTION_TIME_COSTS, TOOL_TIME_SAVINGS, SKILL_TIME_REDUCTION_PER_LEVEL, MIN_ACTION_MINUTES } from '@/data/timeConstants'
  import { sfxForage } from '@/composables/useAudio'
  import { addLog } from '@/composables/useGameLog'
  import { handleEndDay } from '@/composables/useEndDay'
  import { useHiddenNpcStore } from '@/stores/useHiddenNpcStore'

  const playerStore = usePlayerStore()
  const inventoryStore = useInventoryStore()
  const skillStore = useSkillStore()
  const gameStore = useGameStore()
  const achievementStore = useAchievementStore()
  const cookingStore = useCookingStore()
  const walletStore = useWalletStore()

  interface ForageResult {
    label: string
    itemId?: string
    quantity: number
    quality?: Quality
  }

  const QUALITY_COLORS: Record<Quality, string> = {
    normal: '',
    fine: 'text-quality-fine',
    excellent: 'text-quality-excellent',
    supreme: 'text-quality-supreme'
  }

  const QUALITY_NAMES: Record<Quality, string> = {
    normal: 'Normal',
    fine: 'İyi',
    excellent: 'Kaliteli',
    supreme: 'Mükemmel'
  }

  const CATEGORY_NAMES: Record<string, string> = {
    seed: 'Tohum',
    crop: 'Tarım Ürünü',
    fish: 'Balık',
    ore: 'Maden',
    gem: 'Mücevher',
    gift: 'Hediye',
    food: 'Yemek',
    material: 'Malzeme',
    misc: 'Çeşitli',
    processed: 'İşlenmiş Ürün',
    machine: 'Makine',
    sprinkler: 'Fıskiye',
    fertilizer: 'Gübre',
    animal_product: 'Hayvansal Ürün',
    sapling: 'Fidan',
    fruit: 'Meyve',
    bait: 'Yem',
    tackle: 'Olta Takımı',
    bomb: 'Bomba',
    fossil: 'Fosil',
    artifact: 'Eser',
    weapon: 'Silah',
    ring: 'Yüzük',
    hat: 'Şapka',
    shoe: 'Ayakkabı'
  }

  const lastResults = ref<ForageResult[]>([])
  const selectedResult = ref<ForageResult | null>(null)

  const selectedResultDef = computed(() => {
    if (!selectedResult.value?.itemId) return null
    return getItemById(selectedResult.value.itemId) ?? null
  })

  const currentForage = computed(() => getForageItems(gameStore.season))
  const foragingSkill = computed(() => skillStore.getSkill('foraging'))

  const forageCost = computed(() =>
    Math.max(1, Math.floor(5 * inventoryStore.getToolStaminaMultiplier('axe') * (1 - skillStore.getStaminaReduction('foraging'))))
  )

  /** Toplama süresi (saat), alet ve beceri indirimlerinden etkilenir */
  const forageTime = computed(() => {
    const baseMin = ACTION_TIME_COSTS.forage * 60
    const toolTier = inventoryStore.getTool('axe')?.tier ?? 'basic'
    const saving = TOOL_TIME_SAVINGS[toolTier] ?? 0
    const skillReduction = skillStore.getSkill('foraging').level * SKILL_TIME_REDUCTION_PER_LEVEL
    return Math.max(MIN_ACTION_MINUTES, Math.round((baseMin - saving) * (1 - skillReduction))) / 60
  })

  const forageTimeLabel = computed(() => `${Math.round(forageTime.value * 60)} dakika`)

  const weatherMod = computed(() => WEATHER_FORAGE_MODIFIER[gameStore.weather] ?? 1)

  const WEATHER_MOD_LABELS: Record<string, string> = {
    rainy: 'Yağmur: olasılık +15%',
    stormy: 'Fırtına: olasılık -20%',
    snowy: 'Kar: olasılık -10%',
    windy: 'Rüzgar: olasılık +10%',
    green_rain: 'Yeşil yağmur: olasılık +50%'
  }

  const weatherModLabel = computed(() => WEATHER_MOD_LABELS[gameStore.weather] ?? '')

  const hasHerbalistPerk = computed(() => foragingSkill.value.perk5 === 'herbalist')
  const hasLumberjackPerk = computed(() => foragingSkill.value.perk5 === 'lumberjack' || foragingSkill.value.perk10 === 'forester')
  const isForestFarm = computed(() => gameStore.farmMapType === 'forest')
  const cookingLuckBuff = computed(() => (cookingStore.activeBuff?.type === 'luck' ? cookingStore.activeBuff.value : 0))

  const handleForage = () => {
    if (gameStore.isPastBedtime) {
      addLog('Çok geç oldu, artık toplayamazsın.')
      handleEndDay()
      return
    }

    if (!inventoryStore.isToolAvailable('axe')) {
      addLog('Balta yükseltiliyor, bu yüzden toplama yapılamaz.')
      return
    }

    const cost = forageCost.value
    if (!playerStore.consumeStamina(cost)) {
      addLog('Yeterli enerji yok, toplama yapılamaz.')
      return
    }

    sfxForage()

    const items = currentForage.value
    const gathered: ForageResult[] = []
    const skill = foragingSkill.value
    const forestFarm = isForestFarm.value
    const forestXpBonus = forestFarm ? 1.25 : 1.0
    const hiddenNpcStore = useHiddenNpcStore()
    const herbDouble = hiddenNpcStore.isAbilityActive('yue_tu_1')
    const moonHerbChance = hiddenNpcStore.isAbilityActive('yue_tu_3')

    for (const item of items) {
      const herbalistBonus = skill.perk5 === 'herbalist' ? 1.2 : 1.0
      const cookingBuff = cookingStore.activeBuff?.type === 'luck' ? cookingStore.activeBuff.value / 100 : 0
      const adjustedChance = Math.min(
        1,
        item.chance * (WEATHER_FORAGE_MODIFIER[gameStore.weather] ?? 1) * herbalistBonus * (1 + cookingBuff)
      )
      if (Math.random() < adjustedChance) {
        const forageAllSkillsBuff = cookingStore.activeBuff?.type === 'all_skills' ? cookingStore.activeBuff.value : 0
        let quality = skillStore.rollForageQuality(forageAllSkillsBuff)
        const walletBoost = walletStore.getForageQualityBoost()
        if (walletBoost > 0) {
          const qualityOrder: Quality[] = ['normal', 'fine', 'excellent', 'supreme']
          const idx = qualityOrder.indexOf(quality)
          const newIdx = Math.min(idx + walletBoost, qualityOrder.length - 1)
          quality = qualityOrder[newIdx]!
        }
        const qty = forestFarm && Math.random() < 0.2 ? 2 : 1
        // Ruhsal yetenek: Bitki Bilgisi (yue_tu_1) ile otlar iki kat toplanır
        const finalQty = herbDouble && (item.itemId === 'herb' || item.itemId === 'ginseng') ? qty * 2 : qty
        inventoryStore.addItem(item.itemId, finalQty, quality)
        achievementStore.discoverItem(item.itemId)
        useQuestStore().onItemObtained(item.itemId, finalQty)
        const itemDef = getItemById(item.itemId)
        const name = itemDef?.name ?? item.itemId
        gathered.push({ label: `${finalQty > 1 ? `${name}×${finalQty}` : name} elde edildi`, itemId: item.itemId, quantity: finalQty, quality })
        skillStore.addExp('foraging', Math.floor(item.expReward * forestXpBonus))
      }
    }

    if (skill.perk10 === 'forester') {
      inventoryStore.addItem('wood')
      gathered.push({ label: 'Odun elde edildi', itemId: 'wood', quantity: 1 })
    } else if (skill.perk5 === 'lumberjack' && Math.random() < 0.25) {
      inventoryStore.addItem('wood')
      gathered.push({ label: 'Odun elde edildi', itemId: 'wood', quantity: 1 })
    }

    if (skill.perk10 === 'tracker' && items.length > 0) {
      const randomItem = items[Math.floor(Math.random() * items.length)]!
      const trackerAllSkillsBuff = cookingStore.activeBuff?.type === 'all_skills' ? cookingStore.activeBuff.value : 0
      const quality = skillStore.rollForageQuality(trackerAllSkillsBuff)
      inventoryStore.addItem(randomItem.itemId, 1, quality)
      achievementStore.discoverItem(randomItem.itemId)
      const itemDef = getItemById(randomItem.itemId)
      const name = itemDef?.name ?? randomItem.itemId
      gathered.push({ label: `${name} elde edildi`, itemId: randomItem.itemId, quantity: 1, quality })
    }

    // Ruhsal yetenek: Ay Işığı (yue_tu_3) ile %8 ihtimalle ay otu elde edilir
    if (moonHerbChance && Math.random() < 0.08) {
      inventoryStore.addItem('moon_herb', 1)
      achievementStore.discoverItem('moon_herb')
      gathered.push({ label: 'Ay otu elde edildi', itemId: 'moon_herb', quantity: 1 })
      skillStore.addExp('foraging', 15)
    }

    if (gathered.length === 0) {
      gathered.push({ label: 'Hiçbir şey bulunamadı…', quantity: 0 })
    }

    lastResults.value = gathered
    const { leveledUp, newLevel } = skillStore.addExp('foraging', 0)
    const names = gathered
      .filter(g => g.itemId)
      .map(g => {
        const def = getItemById(g.itemId!)
        const name = def?.name ?? g.itemId!
        return g.quantity > 1 ? `${name}×${g.quantity}` : name
      })
    let msg = `Bambu ormanında toplama yaptın ve ${names.join('、') || 'sadece hava'} elde ettin. (-${cost} enerji)`
    if (leveledUp) msg += ` Toplayıcılık seviyesi ${newLevel} oldu!`
    addLog(msg)

    const tr = gameStore.advanceTime(forageTime.value)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  }
</script>