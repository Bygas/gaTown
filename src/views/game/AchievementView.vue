<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <div class="flex items-center space-x-1.5 text-sm text-accent">
        <BookOpen :size="14" />
        <span>Ansiklopedi ve Başarılar</span>
      </div>
      <span class="text-xs text-muted">{{ achievementStore.perfectionPercent }}%</span>
    </div>

    <!-- Beş sekme arasında geçiş -->
    <div class="flex space-x-1 mb-3">
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'collection' }" @click="tab = 'collection'">
        Ansiklopedi
      </Button>
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'achievements' }" @click="tab = 'achievements'">
        Başarılar
      </Button>
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'bundles' }" @click="tab = 'bundles'">Tapınak</Button>
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'shipping' }" @click="tab = 'shipping'">Sevkiyat</Button>
      <Button class="flex-1 justify-center" :class="{ '!bg-accent !text-bg': tab === 'notes' }" @click="tab = 'notes'">Notlar</Button>
    </div>

    <!-- Eşya ansiklopedisi -->
    <template v-if="tab === 'collection'">
      <p class="text-xs text-muted mb-2">Keşfedilen {{ achievementStore.discoveredCount }}/{{ allItems.length }}</p>
      <div ref="collectionRef" class="max-h-72 overflow-y-auto" @scroll="onCollectionScroll">
        <div :style="{ paddingTop: topPad + 'px', paddingBottom: bottomPad + 'px' }">
          <div class="grid grid-cols-3 md:grid-cols-5 gap-1">
            <div
              v-for="item in visibleItems"
              :key="item.id"
              class="border rounded-xs p-1.5 text-xs text-center truncate mr-1"
              :class="
                achievementStore.isDiscovered(item.id)
                  ? 'border-accent/20 cursor-pointer hover:bg-accent/5 ' + getCategoryColor(item.category)
                  : 'border-accent/10 text-muted/30'
              "
              @click="achievementStore.isDiscovered(item.id) && (activeCollectionId = item.id)"
            >
              <template v-if="achievementStore.isDiscovered(item.id)">{{ item.name }}</template>
              <Lock v-else :size="12" class="mx-auto text-muted/30" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Ansiklopedi detay penceresi -->
    <Transition name="panel-fade">
      <div
        v-if="activeCollectionItem"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeCollectionId = null"
      >
        <div class="game-panel max-w-xs w-full relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text" @click="activeCollectionId = null">
            <X :size="14" />
          </button>

          <p class="text-sm mb-2" :class="getCategoryColor(activeCollectionItem.category)">{{ activeCollectionItem.name }}</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeCollectionItem.description }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Kategori</span>
              <span class="text-xs">{{ CATEGORY_NAMES[activeCollectionItem.category] ?? activeCollectionItem.category }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Satış Fiyatı</span>
              <span class="text-xs text-accent">{{ activeCollectionItem.sellPrice }} akçe</span>
            </div>
            <div v-if="activeCollectionItem.edible && activeCollectionItem.staminaRestore" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">İyileştirme</span>
              <span class="text-xs text-success">
                +{{ activeCollectionItem.staminaRestore }} dayanıklılık
                <template v-if="activeCollectionItem.healthRestore">/ +{{ activeCollectionItem.healthRestore }} HP</template>
              </span>
            </div>
            <!-- Silah özellikleri -->
            <template v-if="activeWeaponDef">
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-muted">Tür</span>
                <span class="text-xs">{{ WEAPON_TYPE_NAMES[activeWeaponDef.type] }}</span>
              </div>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-muted">Saldırı Gücü</span>
                <span class="text-xs text-danger">{{ activeWeaponDef.attack }}</span>
              </div>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-muted">Kritik Oranı</span>
                <span class="text-xs">{{ Math.round(activeWeaponDef.critRate * 100) }}%</span>
              </div>
              <div v-if="activeWeaponDef.fixedEnchantment" class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-muted">Sabit Büyü</span>
                <span class="text-xs text-quality-supreme">{{ ENCHANTMENTS[activeWeaponDef.fixedEnchantment]?.name }}</span>
              </div>
            </template>
            <!-- Yüzük / şapka / ayakkabı etkileri -->
            <template v-if="activeEquipEffects.length > 0">
              <div v-for="(eff, i) in activeEquipEffects" :key="i" class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-muted">{{ EFFECT_NAMES[eff.type] ?? eff.type }}</span>
                <span class="text-xs text-success">{{ formatEffectValue(eff) }}</span>
              </div>
            </template>
            <div v-if="achievementStore.getDiscoveryTime(activeCollectionItem.id)" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Keşif Tarihi</span>
              <span class="text-xs text-muted">{{ achievementStore.getDiscoveryTime(activeCollectionItem.id) }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Başarı listesi -->
    <template v-if="tab === 'achievements'">
      <p class="text-xs text-muted mb-2">Tamamlanan {{ achievementStore.completedAchievements.length }}/{{ ACHIEVEMENTS.length }}</p>
      <div class="grid grid-cols-3 md:grid-cols-5 gap-1 max-h-72 overflow-y-auto">
        <div
          v-for="a in ACHIEVEMENTS"
          :key="a.id"
          class="border rounded-xs p-1.5 text-xs text-center transition-colors truncate mr-1"
          :class="isCompleted(a.id) ? 'border-accent/20 cursor-pointer hover:bg-accent/5 text-success' : 'border-accent/10 text-muted/30'"
          @click="isCompleted(a.id) && (activeAchievement = a)"
        >
          <template v-if="isCompleted(a.id)">{{ a.name }}</template>
          <Lock v-else :size="12" class="mx-auto text-muted/30" />
        </div>
      </div>
    </template>

    <!-- Başarı detay penceresi -->
    <Transition name="panel-fade">
      <div
        v-if="activeAchievement"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeAchievement = null"
      >
        <div class="game-panel max-w-xs w-full relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text" @click="activeAchievement = null">
            <X :size="14" />
          </button>

          <!-- Başlık + tamamlama durumu -->
          <div class="flex items-center space-x-1.5 mb-2">
            <CircleCheck v-if="isCompleted(activeAchievement.id)" :size="14" class="text-success shrink-0" />
            <Circle v-else :size="14" class="text-muted/40 shrink-0" />
            <span class="text-sm" :class="isCompleted(activeAchievement.id) ? 'text-success' : 'text-text'">
              {{ activeAchievement.name }}
            </span>
          </div>

          <!-- Açıklama -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeAchievement.description }}</p>
          </div>

          <!-- İlerleme çubuğu -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-muted">İlerleme</span>
              <span class="text-xs" :class="isCompleted(activeAchievement.id) ? 'text-success' : 'text-text'">
                {{ getProgressText(activeAchievement) }}
              </span>
            </div>
            <div class="h-1.5 bg-bg rounded-xs border border-accent/10">
              <div
                class="h-full rounded-xs transition-all"
                :class="isCompleted(activeAchievement.id) ? 'bg-success' : 'bg-accent'"
                :style="{ width: getProgressPercent(activeAchievement) + '%' }"
              />
            </div>
          </div>

          <!-- Ödül -->
          <div class="border border-accent/10 rounded-xs p-2">
            <p class="text-xs text-muted mb-1">Ödül</p>
            <div class="flex flex-wrap space-x-3">
              <span v-if="activeAchievement.reward.money" class="text-xs text-accent">{{ activeAchievement.reward.money }} akçe</span>
              <span v-for="ri in activeAchievement.reward.items ?? []" :key="ri.itemId" class="text-xs text-text">
                {{ getItemName(ri.itemId) }}×{{ ri.quantity }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Tapınak görev panosu -->
    <template v-if="tab === 'bundles'">
      <div class="flex flex-col space-y-1.5 max-h-72 overflow-y-auto">
        <div
          v-for="bundle in COMMUNITY_BUNDLES"
          :key="bundle.id"
          class="border rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5 mr-1"
          :class="achievementStore.isBundleComplete(bundle.id) ? 'border-success/30' : 'border-accent/20'"
          @click="activeBundle = bundle"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-1.5">
              <CircleCheck v-if="achievementStore.isBundleComplete(bundle.id)" :size="12" class="text-success shrink-0" />
              <Circle v-else :size="12" class="text-muted shrink-0" />
              <span class="text-xs" :class="achievementStore.isBundleComplete(bundle.id) ? 'text-success' : 'text-accent'">
                {{ bundle.name }}
              </span>
            </div>
            <span class="text-xs text-muted whitespace-nowrap ml-2">
              {{ getBundleProgress(bundle) }}
            </span>
          </div>
          <p class="text-xs text-muted mt-0.5 pl-4.5">{{ bundle.description }}</p>
        </div>
      </div>
    </template>

    <!-- Tapınak görev detay penceresi -->
    <Transition name="panel-fade">
      <div
        v-if="activeBundle"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeBundle = null"
      >
        <div class="game-panel max-w-xs w-full relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text" @click="activeBundle = null">
            <X :size="14" />
          </button>

          <p class="text-sm mb-2" :class="achievementStore.isBundleComplete(activeBundle.id) ? 'text-success' : 'text-accent'">
            {{ activeBundle.name }}
          </p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeBundle.description }}</p>
          </div>

          <!-- Gerekli eşyalar -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted mb-1">Gerekli Eşyalar</p>
            <div v-for="req in activeBundle.requiredItems" :key="req.itemId" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">{{ getItemName(req.itemId) }}</span>
              <span class="text-xs" :class="getSubmittedCount(activeBundle.id, req.itemId) >= req.quantity ? 'text-success' : ''">
                {{ getSubmittedCount(activeBundle.id, req.itemId) }}/{{ req.quantity }}
              </span>
            </div>
          </div>

          <!-- Ödül -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted mb-1">Ödül</p>
            <p class="text-xs text-accent">{{ activeBundle.reward.description }}</p>
          </div>

          <!-- Teslim etme butonu -->
          <div v-if="!achievementStore.isBundleComplete(activeBundle.id)" class="flex flex-col space-y-1">
            <Button
              v-for="req in activeBundle.requiredItems.filter(r => getSubmittedCount(activeBundle!.id, r.itemId) < r.quantity)"
              :key="'submit_' + req.itemId"
              class="w-full justify-center"
              :icon="Send"
              :icon-size="12"
              :disabled="!inventoryStore.hasItem(req.itemId)"
              @click="handleSubmit(activeBundle!.id, req.itemId)"
            >
              {{ getItemName(req.itemId) }} Teslim Et
            </Button>
          </div>

          <!-- Tamamlandı -->
          <div v-else class="border border-success/30 rounded-xs p-2">
            <div class="flex items-center space-x-1">
              <CircleCheck :size="12" class="text-success" />
              <span class="text-xs text-success">Tamamlandı</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Sevkiyat koleksiyonu -->
    <template v-if="tab === 'shipping'">
      <p class="text-xs text-muted mb-2">Sevkiyat kaydı {{ shopStore.shippedItems.length }}/{{ shippableItems.length }}</p>
      <div class="flex flex-col space-y-2 max-h-72 overflow-y-auto">
        <div v-for="(items, category) in itemsByCategory" :key="category" class="border border-accent/20 rounded-xs p-2">
          <p class="text-xs text-muted mb-1">{{ CATEGORY_NAMES[category] ?? category }}</p>
          <div class="grid grid-cols-3 md:grid-cols-5 gap-1">
            <div
              v-for="item in items"
              :key="item.id"
              class="border rounded-xs p-1 text-xs text-center truncate"
              :class="
                shopStore.shippedItems.includes(item.id)
                  ? 'border-accent/20 cursor-pointer hover:bg-accent/5 ' + getCategoryColor(item.category)
                  : 'border-accent/10 text-muted/30'
              "
              @click="shopStore.shippedItems.includes(item.id) && (activeShippingId = item.id)"
            >
              <template v-if="shopStore.shippedItems.includes(item.id)">{{ item.name }}</template>
              <Lock v-else :size="12" class="mx-auto text-muted/30" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Sevkiyat detay penceresi -->
    <Transition name="panel-fade">
      <div
        v-if="activeShippingItem"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="activeShippingId = null"
      >
        <div class="game-panel max-w-xs w-full relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text" @click="activeShippingId = null">
            <X :size="14" />
          </button>

          <p class="text-sm mb-2" :class="getCategoryColor(activeShippingItem.category)">{{ activeShippingItem.name }}</p>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs text-muted">{{ activeShippingItem.description }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Kategori</span>
              <span class="text-xs">{{ CATEGORY_NAMES[activeShippingItem.category] ?? activeShippingItem.category }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Satış Fiyatı</span>
              <span class="text-xs text-accent">{{ activeShippingItem.sellPrice }} akçe</span>
            </div>
            <div v-if="activeShippingItem.edible && activeShippingItem.staminaRestore" class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">İyileştirme</span>
              <span class="text-xs text-success">
                +{{ activeShippingItem.staminaRestore }} dayanıklılık
                <template v-if="activeShippingItem.healthRestore">/ +{{ activeShippingItem.healthRestore }} HP</template>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Gizli notlar -->
    <template v-if="tab === 'notes'">
      <div v-if="secretNoteStore.collectedCount === 0" class="flex flex-col items-center justify-center py-10 space-y-3">
        <ScrollText :size="48" class="text-accent/30" />
        <p class="text-sm text-muted">Henüz gizli not toplanmadı</p>
        <p class="text-xs text-muted/60 text-center max-w-60">Madencilik, balıkçılık ve toplama sırasında gizli not bulma şansın vardır</p>
      </div>
      <template v-else>
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-muted">Toplama İlerlemesi</span>
          <span class="text-xs text-accent">{{ secretNoteStore.collectedCount }}/{{ secretNoteStore.totalNotes }}</span>
        </div>
        <div class="grid grid-cols-3 md:grid-cols-5 gap-1 max-h-72 overflow-y-auto mb-3">
          <div
            v-for="note in SECRET_NOTES"
            :key="note.id"
            class="border rounded-xs p-1.5 text-center text-xs transition-colors truncate mr-1"
            :class="
              secretNoteStore.isCollected(note.id)
                ? 'border-accent/20 cursor-pointer hover:bg-accent/5 ' + noteTypeColor(note.type)
                : 'border-accent/10 text-muted/30'
            "
            @click="secretNoteStore.isCollected(note.id) ? (activeNote = note) : null"
          >
            <template v-if="secretNoteStore.isCollected(note.id)">#{{ note.id }} {{ note.title }}</template>
            <template v-else>
              #{{ note.id }}
              <Lock :size="10" class="inline text-muted/30" />
            </template>
          </div>
        </div>
      </template>
    </template>

    <!-- Gizli not detay penceresi -->
    <Transition name="panel-fade">
      <div v-if="activeNote" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" @click.self="activeNote = null">
        <div class="game-panel max-w-xs w-full relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text" @click="activeNote = null">
            <X :size="14" />
          </button>

          <div class="flex items-center space-x-1.5 mb-2">
            <ScrollText :size="14" class="text-accent" />
            <p class="text-sm text-accent">#{{ activeNote.id }} {{ activeNote.title }}</p>
          </div>

          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <p class="text-xs mb-1" :class="noteTypeColor(activeNote.type)">{{ NOTE_TYPE_LABELS[activeNote.type] ?? activeNote.type }}</p>
            <p class="text-xs">{{ activeNote.content }}</p>
          </div>

          <div v-if="activeNote.usable && !secretNoteStore.isUsed(activeNote.id)" class="mt-2">
            <Button class="w-full justify-center !bg-accent !text-bg" @click="handleUseNote(activeNote.id)">Notu Kullan</Button>
          </div>
          <div v-else-if="activeNote.usable && secretNoteStore.isUsed(activeNote.id)" class="border border-success/30 rounded-xs p-2">
            <div class="flex items-center space-x-1">
              <CircleCheck :size="12" class="text-success" />
              <span class="text-xs text-success">Kullanıldı</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Tamamlanma oranı -->
    <div class="mt-3 border border-accent/20 rounded-xs p-2">
      <div class="flex items-center space-x-2 text-xs mb-1.5">
        <span class="text-xs text-muted shrink-0">Tamamlanma</span>
        <div class="flex-1 h-1 bg-bg rounded-xs border border-accent/10">
          <div class="h-full bg-accent rounded-xs transition-all" :style="{ width: achievementStore.perfectionPercent + '%' }" />
        </div>
        <span class="text-xs text-accent whitespace-nowrap">{{ achievementStore.perfectionPercent }}%</span>
      </div>
      <div class="grid grid-cols-2 gap-x-3 gap-y-0.5">
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Hasat Edilen Ürün</span>
          <span class="text-xs">{{ achievementStore.stats.totalCropsHarvested }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Balıkçılık</span>
          <span class="text-xs">{{ achievementStore.stats.totalFishCaught }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Yemek Pişirme</span>
          <span class="text-xs">{{ achievementStore.stats.totalRecipesCooked }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Toplam Gelir</span>
          <span class="text-xs">{{ achievementStore.stats.totalMoneyEarned }} akçe</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Madende En Derin Kat</span>
          <span class="text-xs">{{ achievementStore.stats.highestMineFloor }}. kat</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Öldürülen Canavar</span>
          <span class="text-xs">{{ achievementStore.stats.totalMonstersKilled }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Yetiştirme Sayısı</span>
          <span class="text-xs">{{ achievementStore.stats.totalBreedingsDone }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Keşfedilen Hibrit</span>
          <span class="text-xs">{{ achievementStore.stats.totalHybridsDiscovered }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">En Yüksek Nesil</span>
          <span class="text-xs">
            {{ achievementStore.stats.highestHybridTier > 0 ? achievementStore.stats.highestHybridTier + '. nesil' : '-' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { BookOpen, CircleCheck, Circle, Send, X, ScrollText, Lock } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
  import { useAchievementStore } from '@/stores/useAchievementStore'
  import { useAnimalStore } from '@/stores/useAnimalStore'
  import { useGuildStore } from '@/stores/useGuildStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { useMuseumStore } from '@/stores/useMuseumStore'
  import { useNpcStore } from '@/stores/useNpcStore'
  import { useQuestStore } from '@/stores/useQuestStore'
  import { useSecretNoteStore } from '@/stores/useSecretNoteStore'
  import { useShopStore } from '@/stores/useShopStore'
  import { useSkillStore } from '@/stores/useSkillStore'
  import { ACHIEVEMENTS, COMMUNITY_BUNDLES } from '@/data/achievements'
  import { ITEMS, getItemById } from '@/data/items'
  import { HYBRID_DEFS } from '@/data/breeding'
  import { SECRET_NOTES } from '@/data/secretNotes'
  import { WEAPONS, ENCHANTMENTS, WEAPON_TYPE_NAMES } from '@/data/weapons'
  import { getRingById } from '@/data/rings'
  import { getHatById } from '@/data/hats'
  import { getShoeById } from '@/data/shoes'
  import { sfxClick } from '@/composables/useAudio'
  import { addLog } from '@/composables/useGameLog'
  import type { ItemCategory, AchievementDef, CommunityBundleDef, SecretNoteDef } from '@/types'

  const achievementStore = useAchievementStore()
  const inventoryStore = useInventoryStore()
  const shopStore = useShopStore()
  const animalStore = useAnimalStore()
  const secretNoteStore = useSecretNoteStore()
  const skillStore = useSkillStore()
  const npcStore = useNpcStore()
  const questStore = useQuestStore()
  const museumStore = useMuseumStore()
  const guildStore = useGuildStore()

  type Tab = 'collection' | 'achievements' | 'bundles' | 'shipping' | 'notes'
  const tab = ref<Tab>('collection')

  const allItems = ITEMS

  // === Ansiklopedi sanal kaydırma ===
  const collectionRef = ref<HTMLElement | null>(null)
  const collectionScrollTop = ref(0)
  const ROW_H = 34
  const VBUFFER = 5

  const collectionCols = ref(window.innerWidth >= 768 ? 5 : 3)
  const updateCols = () => {
    collectionCols.value = window.innerWidth >= 768 ? 5 : 3
  }
  onMounted(() => window.addEventListener('resize', updateCols))
  onUnmounted(() => window.removeEventListener('resize', updateCols))

  let rafId = 0
  const onCollectionScroll = (e: Event) => {
    if (rafId) return
    rafId = requestAnimationFrame(() => {
      collectionScrollTop.value = (e.target as HTMLElement).scrollTop
      rafId = 0
    })
  }

  const containerH = ref(288)
  onMounted(() => {
    if (collectionRef.value) containerH.value = collectionRef.value.clientHeight
  })

  const totalRows = computed(() => Math.ceil(allItems.length / collectionCols.value))

  const visibleRange = computed(() => {
    const start = Math.max(0, Math.floor(collectionScrollTop.value / ROW_H) - VBUFFER)
    const end = Math.min(totalRows.value, Math.ceil((collectionScrollTop.value + containerH.value) / ROW_H) + VBUFFER)
    return { start, end }
  })

  const visibleItems = computed(() => {
    const { start, end } = visibleRange.value
    return allItems.slice(start * collectionCols.value, end * collectionCols.value)
  })

  const topPad = computed(() => visibleRange.value.start * ROW_H)
  const bottomPad = computed(() => Math.max(0, (totalRows.value - visibleRange.value.end) * ROW_H))

  watch(tab, () => {
    collectionScrollTop.value = 0
  })

  /** Başarı detay penceresi */
  const activeAchievement = ref<AchievementDef | null>(null)

  /** Tapınak görev penceresi */
  const activeBundle = ref<CommunityBundleDef | null>(null)

  /** Tapınak görev tamamlama metni */
  const getBundleProgress = (bundle: CommunityBundleDef): string => {
    const done = bundle.requiredItems.filter(r => getSubmittedCount(bundle.id, r.itemId) >= r.quantity).length
    return `${done}/${bundle.requiredItems.length}`
  }

  /** Gizli not penceresi */
  const activeNote = ref<SecretNoteDef | null>(null)

  /** Sevkiyat detay penceresi */
  const activeShippingId = ref<string | null>(null)
  const activeShippingItem = computed(() => {
    if (!activeShippingId.value) return null
    return getItemById(activeShippingId.value) ?? null
  })

  const NOTE_TYPE_COLORS: Record<string, string> = {
    tip: 'text-accent',
    treasure: 'text-success',
    npc: 'text-water',
    story: 'text-muted'
  }

  const NOTE_TYPE_LABELS: Record<string, string> = {
    tip: 'İpucu',
    treasure: 'Hazine',
    npc: 'Karakter',
    story: 'Hikâye'
  }

  const noteTypeColor = (type: string): string => NOTE_TYPE_COLORS[type] ?? 'text-accent'

  const handleUseNote = (noteId: number) => {
    const result = secretNoteStore.useNote(noteId)
    if (result.success) {
      addLog(result.message)
    }
  }

  /** Ansiklopedi detay penceresi */
  const activeCollectionId = ref<string | null>(null)
  const activeCollectionItem = computed(() => {
    if (!activeCollectionId.value) return null
    return getItemById(activeCollectionId.value) ?? null
  })

  /** Mevcut detaydaki silah tanımı (silahsa) */
  const activeWeaponDef = computed(() => {
    if (!activeCollectionItem.value || activeCollectionItem.value.category !== 'weapon') return null
    return WEAPONS[activeCollectionItem.value.id] ?? null
  })

  /** Mevcut detaydaki ekipman etkileri listesi (yüzük / şapka / ayakkabı) */
  const activeEquipEffects = computed(() => {
    if (!activeCollectionItem.value) return []
    const id = activeCollectionItem.value.id
    const cat = activeCollectionItem.value.category
    if (cat === 'ring') return getRingById(id)?.effects ?? []
    if (cat === 'hat') return getHatById(id)?.effects ?? []
    if (cat === 'shoe') return getShoeById(id)?.effects ?? []
    return []
  })

  /** Ekipman etkisi isim eşleştirmesi */
  const EFFECT_NAMES: Record<string, string> = {
    attack_bonus: 'Saldırı Gücü',
    crit_rate_bonus: 'Kritik Oranı',
    defense_bonus: 'Hasar Azaltma',
    vampiric: 'Can Çalma',
    max_hp_bonus: 'Maksimum HP',
    stamina_reduction: 'Dayanıklılık Tüketimi Azaltma',
    mining_stamina: 'Madencilik Dayanıklılığı Azaltma',
    farming_stamina: 'Tarım Dayanıklılığı Azaltma',
    fishing_stamina: 'Balıkçılık Dayanıklılığı Azaltma',
    crop_quality_bonus: 'Ürün Kalitesi',
    crop_growth_bonus: 'Ürün Büyüme Hızı',
    fish_quality_bonus: 'Balık Kalitesi',
    fishing_calm: 'Balık Uysallığı',
    sell_price_bonus: 'Satış Fiyatı Bonusu',
    shop_discount: 'Mağaza İndirimi',
    gift_friendship: 'Hediye Dostluğu',
    monster_drop_bonus: 'Canavar Düşürme Bonusu',
    exp_bonus: 'Deneyim Bonusu',
    treasure_find: 'Sandık Bulma Şansı',
    ore_bonus: 'Ekstra Maden',
    luck: 'Şans',
    travel_speed: 'Seyahat Hızı'
  }

  /** Etki değerini biçimlendir */
  const FLAT_VALUE_EFFECTS = new Set(['attack_bonus', 'max_hp_bonus', 'ore_bonus'])
  const formatEffectValue = (eff: { type: string; value: number }): string => {
    if (FLAT_VALUE_EFFECTS.has(eff.type)) return `+${eff.value}`
    return `+${Math.round(eff.value * 100)}%`
  }

  /** Eşya isimlerini kategoriye göre renklendir */
  const CATEGORY_COLOR_MAP: Partial<Record<ItemCategory, string>> = {
    crop: 'text-success',
    fish: 'text-water',
    ore: 'text-earth',
    gem: 'text-quality-supreme',
    food: 'text-quality-fine',
    fruit: 'text-success',
    animal_product: 'text-quality-fine',
    processed: 'text-accent',
    material: 'text-muted',
    misc: 'text-muted',
    gift: 'text-quality-excellent',
    seed: 'text-success/60',
    machine: 'text-muted',
    sprinkler: 'text-water',
    fertilizer: 'text-success/60',
    sapling: 'text-success/60',
    bait: 'text-water',
    tackle: 'text-water',
    bomb: 'text-danger',
    fossil: 'text-earth',
    artifact: 'text-quality-fine',
    weapon: 'text-danger',
    ring: 'text-quality-supreme',
    hat: 'text-accent',
    shoe: 'text-quality-excellent'
  }

  const getCategoryColor = (category: ItemCategory): string => {
    return CATEGORY_COLOR_MAP[category] ?? 'text-accent'
  }

  // === Sevkiyat koleksiyonu ===

  const CATEGORY_NAMES: Record<string, string> = {
    seed: 'Tohum',
    crop: 'Ürün',
    hybrid: 'Hibrit Ürün',
    fish: 'Balık',
    animal_product: 'Hayvansal Ürün',
    processed: 'İşlenmiş Ürün',
    fruit: 'Meyve',
    ore: 'Maden',
    gem: 'Mücevher',
    material: 'Malzeme',
    misc: 'Çeşitli',
    food: 'Yemek',
    gift: 'Hediye',
    machine: 'Makine',
    sprinkler: 'Fıskiye',
    fertilizer: 'Gübre',
    sapling: 'Fidan',
    bait: 'Yem',
    tackle: 'Şamandıra',
    bomb: 'Bomba',
    fossil: 'Fosil',
    artifact: 'Antika',
    weapon: 'Silah',
    ring: 'Yüzük',
    hat: 'Şapka',
    shoe: 'Ayakkabı'
  }

  /** Sevk edilebilir kategoriler (tohum, makine, aletler hariç) */
  const SHIPPABLE_CATEGORIES = ['crop', 'fish', 'animal_product', 'processed', 'fruit', 'ore', 'gem', 'material', 'misc', 'food', 'gift']

  const shippableItems = computed(() => ITEMS.filter(i => SHIPPABLE_CATEGORIES.includes(i.category)))

  const hybridItemIds = new Set(HYBRID_DEFS.map(h => h.resultCropId))

  const itemsByCategory = computed(() => {
    const groups: Record<string, typeof ITEMS> = {}
    for (const item of shippableItems.value) {
      const cat = item.category === 'crop' && hybridItemIds.has(item.id) ? 'hybrid' : item.category
      if (!groups[cat]) groups[cat] = []
      groups[cat]!.push(item)
    }
    return groups
  })

  const isCompleted = (id: string): boolean => {
    return achievementStore.completedAchievements.includes(id)
  }

  const getItemName = (id: string): string => {
    return getItemById(id)?.name ?? id
  }

  const getSubmittedCount = (bundleId: string, itemId: string): number => {
    return achievementStore.getBundleProgress(bundleId)[itemId] ?? 0
  }

  /** Başarı ilerleme yüzdesi (ilerleme çubuğu için) */
  const getProgressPercent = (a: (typeof ACHIEVEMENTS)[number]): number => {
    if (isCompleted(a.id)) return 100
    const c = a.condition
    const s = achievementStore.stats
    let current = 0
    let target = 1
    switch (c.type) {
      case 'itemCount':
        current = achievementStore.discoveredCount
        target = c.count
        break
      case 'cropHarvest':
        current = s.totalCropsHarvested
        target = c.count
        break
      case 'fishCaught':
        current = s.totalFishCaught
        target = c.count
        break
      case 'moneyEarned':
        current = s.totalMoneyEarned
        target = c.amount
        break
      case 'mineFloor':
        current = s.highestMineFloor
        target = c.floor
        break
      case 'skullCavernFloor':
        current = s.skullCavernBestFloor
        target = c.floor
        break
      case 'recipesCooked':
        current = s.totalRecipesCooked
        target = c.count
        break
      case 'monstersKilled':
        current = s.totalMonstersKilled
        target = c.count
        break
      case 'shippedCount':
        current = shopStore.shippedItems.length
        target = c.count
        break
      case 'fullShipment':
        current = shopStore.shippedItems.length
        target = shippableItems.value.length
        break
      case 'animalCount':
        current = animalStore.animals.length
        target = c.count
        break
      case 'questsCompleted':
        current = questStore.completedQuestCount
        target = c.count
        break
      case 'hybridsDiscovered':
        current = s.totalHybridsDiscovered
        target = c.count
        break
      case 'breedingsDone':
        current = s.totalBreedingsDone
        target = c.count
        break
      case 'hybridTier':
        current = s.highestHybridTier
        target = c.tier
        break
      case 'hybridsShipped': {
        const hIds = new Set(HYBRID_DEFS.map(h => h.resultCropId))
        current = shopStore.shippedItems.filter(id => hIds.has(id)).length
        target = c.count
        break
      }
      case 'skillLevel': {
        const skill = skillStore.skills.find(sk => sk.type === c.skillType)
        current = skill?.level ?? 0
        target = c.level
        break
      }
      case 'allSkillsMax':
        current = skillStore.skills.filter(sk => sk.level === 10).length
        target = skillStore.skills.length
        break
      case 'npcFriendship': {
        const LEVEL_RANK: Record<string, number> = { stranger: 0, acquaintance: 1, friendly: 2, bestFriend: 3 }
        const requiredRank = LEVEL_RANK[c.level] ?? 0
        current = npcStore.npcStates.filter(n => (LEVEL_RANK[npcStore.getFriendshipLevel(n.npcId)] ?? 0) >= requiredRank).length
        target = npcStore.npcStates.length
        break
      }
      case 'npcBestFriend':
        current = npcStore.npcStates.filter(n => npcStore.getFriendshipLevel(n.npcId) === 'bestFriend').length
        target = c.count
        break
      case 'npcAllFriendly':
        current = npcStore.npcStates.filter(n => {
          const l = npcStore.getFriendshipLevel(n.npcId)
          return l === 'friendly' || l === 'bestFriend'
        }).length
        target = npcStore.npcStates.length
        break
      case 'married':
        return npcStore.getSpouse() ? 100 : 0
      case 'hasChild':
        return npcStore.children.length > 0 ? 100 : 0
      case 'allBundlesComplete':
        current = achievementStore.completedBundles.length
        target = COMMUNITY_BUNDLES.length
        break
      case 'museumDonations':
        current = museumStore.donatedCount
        target = c.count
        break
      case 'guildGoalsCompleted':
        current = guildStore.completedGoalCount
        target = c.count
        break
      default:
        return 0
    }
    return target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0
  }

  const getProgressText = (a: (typeof ACHIEVEMENTS)[number]): string => {
    const c = a.condition
    const s = achievementStore.stats
    switch (c.type) {
      case 'itemCount':
        return `${achievementStore.discoveredCount}/${c.count}`
      case 'cropHarvest':
        return `${s.totalCropsHarvested}/${c.count}`
      case 'fishCaught':
        return `${s.totalFishCaught}/${c.count}`
      case 'moneyEarned':
        return `${s.totalMoneyEarned}/${c.amount}`
      case 'mineFloor':
        return `${s.highestMineFloor}/${c.floor}`
      case 'skullCavernFloor':
        return `${s.skullCavernBestFloor}/${c.floor}`
      case 'recipesCooked':
        return `${s.totalRecipesCooked}/${c.count}`
      case 'monstersKilled':
        return `${s.totalMonstersKilled}/${c.count}`
      case 'shippedCount':
        return `${shopStore.shippedItems.length}/${c.count}`
      case 'fullShipment':
        return `${shopStore.shippedItems.length}/${shippableItems.value.length}`
      case 'animalCount':
        return `${animalStore.animals.length}/${c.count}`
      case 'questsCompleted':
        return `${questStore.completedQuestCount}/${c.count}`
      case 'hybridsDiscovered':
        return `${s.totalHybridsDiscovered}/${c.count}`
      case 'breedingsDone':
        return `${s.totalBreedingsDone}/${c.count}`
      case 'hybridTier':
        return `${s.highestHybridTier}/${c.tier}`
      case 'hybridsShipped': {
        const hIds = new Set(HYBRID_DEFS.map(h => h.resultCropId))
        return `${shopStore.shippedItems.filter(id => hIds.has(id)).length}/${c.count}`
      }
      case 'skillLevel': {
        const skill = skillStore.skills.find(sk => sk.type === c.skillType)
        return `${skill?.level ?? 0}/${c.level}`
      }
      case 'allSkillsMax': {
        const maxCount = skillStore.skills.filter(sk => sk.level === 10).length
        return `${maxCount}/${skillStore.skills.length}`
      }
      case 'npcFriendship': {
        const LEVEL_RANK: Record<string, number> = { stranger: 0, acquaintance: 1, friendly: 2, bestFriend: 3 }
        const requiredRank = LEVEL_RANK[c.level] ?? 0
        const metCount = npcStore.npcStates.filter(n => (LEVEL_RANK[npcStore.getFriendshipLevel(n.npcId)] ?? 0) >= requiredRank).length
        return `${metCount}/${npcStore.npcStates.length}`
      }
      case 'npcBestFriend': {
        const bestCount = npcStore.npcStates.filter(n => npcStore.getFriendshipLevel(n.npcId) === 'bestFriend').length
        return `${bestCount}/${c.count}`
      }
      case 'npcAllFriendly': {
        const friendlyCount = npcStore.npcStates.filter(n => {
          const level = npcStore.getFriendshipLevel(n.npcId)
          return level === 'friendly' || level === 'bestFriend'
        }).length
        return `${friendlyCount}/${npcStore.npcStates.length}`
      }
      case 'married':
        return npcStore.getSpouse() ? 'Tamamlandı' : 'Tamamlanmadı'
      case 'hasChild':
        return npcStore.children.length > 0 ? 'Tamamlandı' : 'Tamamlanmadı'
      case 'allBundlesComplete':
        return `${achievementStore.completedBundles.length}/${COMMUNITY_BUNDLES.length}`
      case 'museumDonations':
        return `${museumStore.donatedCount}/${c.count}`
      case 'guildGoalsCompleted':
        return `${guildStore.completedGoalCount}/${c.count}`
      default:
        return ''
    }
  }

  const handleSubmit = (bundleId: string, itemId: string) => {
    const bundle = COMMUNITY_BUNDLES.find(b => b.id === bundleId)
    const req = bundle?.requiredItems.find(r => r.itemId === itemId)
    if (!req) return

    const submitted = getSubmittedCount(bundleId, itemId)
    const needed = req.quantity - submitted
    const available = inventoryStore.getItemCount(itemId)
    const toSubmit = Math.min(needed, available)
    if (toSubmit <= 0) return

    if (achievementStore.submitToBundle(bundleId, itemId, toSubmit)) {
      sfxClick()
      addLog(`"${bundle?.name}" için ${getItemName(itemId)}×${toSubmit} teslim edildi.`)
      if (achievementStore.isBundleComplete(bundleId)) {
        addLog(`"${bundle?.name}" tamamlandı! Ödül kazanıldı!`)
      }
    } else {
      addLog('Teslim başarısız.')
    }
  }
</script>
