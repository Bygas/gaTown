<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center space-y-8 px-4"
    @click.once="startBgm"
    :class="{ 'py-10': Capacitor.isNativePlatform() }"
    @click="slotMenuOpen = null"
  >
    <!-- Başlık -->
    <div class="flex items-center space-x-3">
      <div class="logo" />
      <h1 class="text-accent text-2xl md:text-4xl tracking-widest">{{ pkg.title }}</h1>
    </div>

    <!-- Ana menü -->
    <div class="flex flex-col space-y-3 w-full md:w-6/12">
      <Button class="text-center justify-center py-3" :icon="Play" @click="showPrivacy = true">Yeni Macera</Button>

      <!-- Kayıt listesi -->
      <div v-for="info in slots" :key="info.slot" class="w-full">
        <div v-if="info.exists" class="flex space-x-1 w-full">
          <button class="btn flex-1 !justify-between" @click="handleLoadGame(info.slot)">
            <span class="inline-flex items-center space-x-1">
              <FolderOpen :size="14" />
              <span>Kayıt {{ info.slot + 1 }}</span>
            </span>
            <span class="text-muted text-xs">
              {{ info.playerName ?? 'İsimsiz' }} · {{ info.year }}. Yıl {{ SEASON_NAMES[info.season as keyof typeof SEASON_NAMES] }} {{ info.day }}. Gün
            </span>
          </button>
          <div class="relative">
            <Button
              class="px-2 h-full"
              :icon="Settings"
              :icon-size="12"
              @click.stop="slotMenuOpen = slotMenuOpen === info.slot ? null : info.slot"
            />
            <div
              v-if="slotMenuOpen === info.slot"
              class="absolute right-0 top-full mt-1 z-10 flex flex-col border border-accent/30 rounded-xs overflow-hidden w-30"
            >
              <Button
                v-if="!Capacitor.isNativePlatform()"
                class="text-center !rounded-none justify-center !text-sm"
                :icon="Download"
                :icon-size="12"
                @click="handleExportSlot(info.slot)"
              >
                Dışa Aktar
              </Button>
              <Button
                class="btn-danger !rounded-none text-center justify-center !text-sm"
                :icon="Trash2"
                :icon-size="12"
                @click="handleDeleteSlot(info.slot)"
              >
                Sil
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Kayıt içe aktarma -->
      <template v-if="!Capacitor.isNativePlatform()">
        <Button class="text-center justify-center" :icon="Upload" @click="triggerImport">Kayıt İçe Aktar</Button>
        <input ref="fileInputRef" type="file" accept=".tyx" class="hidden" @change="handleImportFile" />
      </template>

      <!-- Hakkında -->
      <Button class="text-center justify-center text-muted" :icon="Info" @click="showAbout = true">Oyun Hakkında</Button>
    </div>

    <!-- Hakkında penceresi -->
    <Transition name="panel-fade">
      <div v-if="showAbout" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80" @click.self="showAbout = false">
        <div class="game-panel w-full max-w-md mx-4 text-center relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text" @click="showAbout = false">
            <X :size="14" />
          </button>
          <h2 class="text-accent text-lg mb-3">{{ pkg.title }} Hakkında</h2>

          <!-- Sekmeler -->
          <div class="flex space-x-1.5 mb-3">
            <Button
              class="flex-1 justify-center"
              :class="{ '!bg-accent !text-bg': aboutTab === 'about' }"
              :icon="Info"
              @click="aboutTab = 'about'"
            >
              Oyun
            </Button>
            <Button
              class="flex-1 justify-center"
              :class="{ '!bg-accent !text-bg': aboutTab === 'author' }"
              :icon="UserRound"
              @click="aboutTab = 'author'"
            >
              Geliştiriciye Destek
            </Button>
          </div>

          <!-- Oyun hakkında -->
          <div v-if="aboutTab === 'about'" class="flex flex-col space-y-3 text-sm">
            <p class="text-xs text-muted">Oyun, Stardew Valley'den ilham almıştır.</p>
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-muted text-xs mb-1">Sürüm</p>
              <p class="text-accent">v{{ pkg.version }}</p>
            </div>
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-muted text-xs mb-1">QQ Topluluğu</p>
              <a href="https://qm.qq.com/q/2BVaTTwDkI" target="_blank" class="text-accent underline break-all">
                {{ pkg.qq }}
              </a>
            </div>
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-muted text-xs mb-1">GitHub Deposu</p>
              <a :href="`https://github.com/${pkg.author}/${pkg.name}`" target="_blank" class="text-accent underline break-all">
                https://github.com/{{ pkg.author }}/{{ pkg.name }}
              </a>
            </div>
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-muted text-xs mb-1">TapTap</p>
              <a :href="`https://www.taptap.cn/app/${pkg.tapid}`" target="_blank" class="text-accent underline break-all">
                https://www.taptap.cn/app/{{ pkg.tapid }}
              </a>
            </div>
          </div>

          <!-- Geliştiriciye destek -->
          <div v-if="aboutTab === 'author'" class="flex flex-col space-y-3 text-sm">
            <p class="text-xs text-muted">
              Bu oyunu sevdiysen geliştiriciye bir kahve ısmarlayabilir ya da küçük bir destekte bulunabilirsin.
              Desteğin, oyunun gelişmeye devam etmesi için büyük önem taşıyor.
            </p>
            <div class="flex space-x-3">
              <div class="flex-1 border border-accent/20 rounded-xs p-3">
                <p class="text-muted text-xs mb-2">Alipay</p>
                <img
                  src="@/assets/alipay.png"
                  alt="Alipay"
                  class="mx-auto"
                  style="width: 120px; height: 120px; image-rendering: pixelated"
                />
              </div>
              <div class="flex-1 border border-accent/20 rounded-xs p-3">
                <p class="text-muted text-xs mb-2">WeChat</p>
                <img src="@/assets/wechat.png" alt="WeChat" class="mx-auto" style="width: 120px; height: 120px; image-rendering: pixelated" />
              </div>
            </div>
            <div class="border border-accent/20 rounded-xs p-3">
              <p class="text-muted text-xs mb-1">Afdian</p>
              <a :href="`https://afdian.com/a/${pkg.author}`" target="_blank" class="text-accent underline break-all">
                https://afdian.com/a/{{ pkg.author }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Karakter oluşturma penceresi -->
    <Transition name="panel-fade">
      <div v-if="showCharCreate && !showFarmSelect" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80">
        <div class="game-panel w-full max-w-xs mx-4 relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text" @click="handleBackToMenu">
            <X :size="14" />
          </button>
          <p class="text-accent text-sm mb-4 text-center">Karakterini Oluştur</p>
          <div class="flex flex-col space-y-4">
            <!-- İsim -->
            <div>
              <label class="text-xs text-muted mb-1 block">Adın</label>
              <input
                v-model="charName"
                type="text"
                maxlength="4"
                placeholder="Adını gir"
                class="w-full px-3 py-2 bg-bg border border-accent/30 rounded-xs text-sm focus:border-accent outline-none"
              />
            </div>

            <!-- Cinsiyet -->
            <div>
              <label class="text-xs text-muted mb-1 block">Cinsiyet</label>
              <div class="flex space-x-3">
                <Button
                  class="flex-1 justify-center py-2"
                  :class="charGender === 'male' ? '!border-accent !bg-accent/10' : ''"
                  @click="charGender = 'male'"
                >
                  Erkek
                </Button>
                <Button
                  class="flex-1 justify-center py-2"
                  :class="charGender === 'female' ? '!border-accent !bg-accent/10' : ''"
                  @click="charGender = 'female'"
                >
                  Kadın
                </Button>
              </div>
            </div>
          </div>
          <div class="flex space-x-3 justify-center mt-4">
            <Button :icon-size="12" :icon="ArrowLeft" @click="handleBackToMenu">Geri</Button>
            <Button class="px-6" :disabled="!charName.trim()" :icon-size="12" :icon="Play" @click="handleCharCreateNext">Devam Et</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Çiftlik seçimi -->
    <Transition name="panel-fade">
      <div v-if="showFarmSelect" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4">
        <div class="game-panel w-full max-w-xl max-h-[80vh] flex flex-col relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text z-10" @click="handleBackToCharCreate">
            <X :size="14" />
          </button>
          <p class="text-accent text-sm mb-3 text-center shrink-0">Çiftlik Türünü Seç</p>
          <div class="flex-1 overflow-y-auto min-h-0">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button
                v-for="farm in FARM_MAP_DEFS"
                :key="farm.type"
                class="border border-accent/20 rounded-xs p-3 text-left transition-all cursor-pointer hover:border-accent/50"
                @click="handleSelectFarm(farm.type)"
              >
                <div class="text-sm mb-0.5">{{ farm.name }}</div>
                <div class="text-muted text-xs mb-1">{{ farm.description }}</div>
                <div class="text-accent text-xs">{{ farm.bonus }}</div>
              </button>
            </div>
          </div>
          <div class="flex justify-center mt-3 shrink-0">
            <Button :icon-size="12" :icon="ArrowLeft" @click="handleBackToCharCreate">Geri</Button>
          </div>
        </div>

        <!-- Çiftlik onay penceresi -->
        <Transition name="panel-fade">
          <div
            v-if="showFarmConfirm"
            class="fixed inset-0 z-60 flex items-center justify-center bg-bg/80"
            @click.self="showFarmConfirm = false"
          >
            <div class="game-panel w-full max-w-xs mx-4 text-center relative">
              <button class="absolute top-2 right-2 text-muted hover:text-text" @click="showFarmConfirm = false">
                <X :size="14" />
              </button>
              <Divider title>{{ selectedFarmDef?.name }}</Divider>
              <p class="text-xs text-muted mb-2">{{ selectedFarmDef?.description }}</p>
              <p class="text-xs text-accent mb-4">{{ selectedFarmDef?.bonus }}</p>
              <div class="flex space-x-3 justify-center">
                <Button :icon-size="12" :icon="ArrowLeft" @click="showFarmConfirm = false">İptal</Button>
                <Button class="px-6" :icon-size="12" :icon="Play" @click="handleNewGame">Oyuna Başla</Button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Eski kayıt kimlik ayarı -->
    <Transition name="panel-fade">
      <div v-if="showIdentitySetup" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80">
        <div class="game-panel w-full max-w-xs mx-4 relative">
          <p class="text-accent text-sm mb-2 text-center">Karakter Bilgilerini Ayarla</p>
          <p class="text-xs text-muted mb-4 text-center">Karakter bilgileri eksik bulundu. Lütfen devam etmek için bilgilerini gir.</p>
          <div class="flex flex-col space-y-4">
            <div>
              <label class="text-xs text-muted mb-1 block">Adın</label>
              <input
                v-model="charName"
                type="text"
                maxlength="4"
                placeholder="Adını gir"
                class="w-full px-3 py-2 bg-bg border border-accent/30 rounded-xs text-sm focus:border-accent outline-none"
              />
            </div>
            <div>
              <label class="text-xs text-muted mb-1 block">Cinsiyet</label>
              <div class="flex space-x-3">
                <Button
                  class="flex-1 justify-center py-2"
                  :class="charGender === 'male' ? '!border-accent !bg-accent/10' : ''"
                  @click="charGender = 'male'"
                >
                  Erkek
                </Button>
                <Button
                  class="flex-1 justify-center py-2"
                  :class="charGender === 'female' ? '!border-accent !bg-accent/10' : ''"
                  @click="charGender = 'female'"
                >
                  Kadın
                </Button>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <Button class="px-6" :disabled="!charName.trim()" :icon-size="12" :icon="Play" @click="handleIdentityConfirm">
              Onayla ve Devam Et
            </Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Kayıt silme onayı -->
    <Transition name="panel-fade">
      <div
        v-if="deleteTargetSlot !== null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80"
        @click.self="deleteTargetSlot = null"
      >
        <div class="game-panel w-full max-w-xs mx-4 text-center">
          <p class="text-danger text-sm mb-3">Kayıt {{ deleteTargetSlot + 1 }} silinsin mi?</p>
          <p class="text-xs text-muted mb-4">Bu işlem geri alınamaz.</p>
          <div class="flex space-x-3 justify-center">
            <Button @click="deleteTargetSlot = null">İptal</Button>
            <Button class="btn-danger" @click="confirmDeleteSlot">Sil</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Gizlilik sözleşmesi -->
    <Transition name="panel-fade">
      <div v-if="showPrivacy" class="fixed inset-0 z-50 flex items-center justify-center bg-bg/80" @click.self="handlePrivacyDecline">
        <div class="game-panel w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
          <h2 class="text-accent text-lg mb-3 text-center">
            <ShieldCheck :size="14" class="inline" />
            Gizlilik Sözleşmesi
          </h2>
          <div class="flex-1 overflow-y-auto text-xs text-muted space-y-2 mb-4 pr-1">
            <p>{{ pkg.title }} oyununa hoş geldin! Oyuna başlamadan önce lütfen aşağıdaki gizlilik sözleşmesini oku:</p>
            <p class="text-text">1. Veri Saklama</p>
            <p>Oyun kayıtları ve ayarlar, tarayıcının yerel depolamasında (localStorage) saklanır. Kayıt verilerin herhangi bir sunucuya yüklenmez.</p>

            <p class="text-text">2. Trafik ve Kullanım Verileri</p>
            <p>
              Oyun, kullanım deneyimini geliştirmek amacıyla anonim ziyaret verileri toplayan üçüncü taraf analiz hizmetleri kullanabilir.
              Bu veriler sayfa görüntülemeleri, erişim saati, cihaz türü ve tarayıcı bilgileri gibi bilgileri içerebilir; kişisel kimlik bilgilerini içermez.
            </p>

            <p class="text-text">3. Ağ İletişimi</p>
            <p>İstatistik toplama dışında, oyunun ana işlevleri tamamen cihazında çalışır. Kayıtların veya oyun hareketlerin başka bir sunucuya gönderilmez.</p>

            <p class="text-text">4. Veri Güvenliği</p>
            <p>Tarayıcı verilerini silmek veya cihaz değiştirmek kayıtlarının kaybolmasına neden olabilir. Bu yüzden kayıtlarını düzenli olarak dışa aktarman önerilir.</p>

            <p class="text-text">5. Üçüncü Taraf Hizmetler</p>
            <p>
              Oyunda kullanılan üçüncü taraf servislerin kendi gizlilik politikaları vardır. Bu servislerin veri işleme yöntemlerinden oyun sorumlu değildir.
              Oyun içindeki dış bağlantılar da bu sözleşmenin kapsamı dışında kalır.
            </p>

            <p class="text-text">6. Sözleşme Güncellemeleri</p>
            <p>Bu sözleşme yeni sürümlerle birlikte güncellenebilir. Güncellendiğinde oyun içinde tekrar gösterilir. Oyunu kullanmaya devam etmen yeni sürümü kabul ettiğin anlamına gelir.</p>
          </div>
          <div class="flex space-x-3 justify-center">
            <Button class="!text-sm" :icon="ArrowLeft" @click="handlePrivacyDecline">Kabul Etmiyorum</Button>
            <Button class="!text-sm px-6" :icon="ShieldCheck" @click="handlePrivacyAgree">Kabul Et ve Devam Et</Button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Play, FolderOpen, ArrowLeft, Trash2, Download, Upload, Info, Settings, ShieldCheck, X, UserRound } from 'lucide-vue-next'
import Button from '@/components/game/Button.vue'
import Divider from '@/components/game/Divider.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore, SEASON_NAMES } from '@/stores/useGameStore'
import { useSaveStore } from '@/stores/useSaveStore'
import { useFarmStore } from '@/stores/useFarmStore'
import { useAnimalStore } from '@/stores/useAnimalStore'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useQuestStore } from '@/stores/useQuestStore'
import { useInventoryStore } from '@/stores/useInventoryStore'
import { FARM_MAP_DEFS } from '@/data/farmMaps'
import _pkg from '../../package.json'
import { useAudio } from '@/composables/useAudio'
import { showFloat, addLog } from '@/composables/useGameLog'
import { resetAllStoresForNewGame } from '@/composables/useResetGame'
import { useTutorialStore } from '@/stores/useTutorialStore'
import type { FarmMapType, Gender } from '@/types'
import { Capacitor } from '@capacitor/core'

const router = useRouter()
const { startBgm } = useAudio()
const pkg = _pkg as typeof _pkg & { title: string; qq: string; version: string; name: string; author: string }

const gameStore = useGameStore()
const saveStore = useSaveStore()
const farmStore = useFarmStore()
const animalStore = useAnimalStore()
const playerStore = usePlayerStore()
const questStore = useQuestStore()
const inventoryStore = useInventoryStore()

const slots = ref(saveStore.getSlots())
const showCharCreate = ref(false)
const showFarmSelect = ref(false)
const showIdentitySetup = ref(false)
const showAbout = ref(false)
const aboutTab = ref<'about' | 'author'>('about')
const slotMenuOpen = ref<number | null>(null)
const selectedMap = ref<FarmMapType>('standard')
const charName = ref('')
const charGender = ref<Gender>('male')
const showPrivacy = ref(false)
const showFarmConfirm = ref(false)

const deleteTargetSlot = ref<number | null>(null)

const selectedFarmDef = computed(() => FARM_MAP_DEFS.find(f => f.type === selectedMap.value))

const handleSelectFarm = (type: FarmMapType) => {
  selectedMap.value = type
  showFarmConfirm.value = true
}

const handlePrivacyAgree = () => {
  localStorage.setItem('taoyuan_privacy_agreed', '1')
  showPrivacy.value = false
  showCharCreate.value = true
}

const handlePrivacyDecline = () => {
  showPrivacy.value = false
}

const refreshSlots = () => {
  slots.value = saveStore.getSlots()
}

const handleBackToMenu = () => {
  showCharCreate.value = false
  showFarmSelect.value = false
  selectedMap.value = 'standard'
  charName.value = ''
  charGender.value = 'male'
}

const handleCharCreateNext = () => {
  showFarmSelect.value = true
}

const handleBackToCharCreate = () => {
  showFarmSelect.value = false
  showFarmConfirm.value = false
}

const handleNewGame = () => {
  // Boş kayıt yuvası ayır
  const slot = saveStore.assignNewSlot()
  if (slot < 0) {
    showFloat('Kayıt yuvaları dolu. Lütfen önce eski bir kaydı sil.')
    return
  }

  // Önceki kayıt verilerinin kalmaması için tüm store'ları sıfırla
  resetAllStoresForNewGame()
  playerStore.setIdentity((charName.value.trim() || 'İsimsiz').slice(0, 4), charGender.value)
  gameStore.startNewGame(selectedMap.value)

  // Standart çiftlik 6×6, diğerleri 4×4 başlar
  farmStore.resetFarm(selectedMap.value === 'standard' ? 6 : 4)

  // Başlangıç hediyesi: 10 lahana tohumu
  inventoryStore.addItem('seed_cabbage', 10)

  // Çayır çiftliği: ücretsiz kümes + 2 tavuk
  if (selectedMap.value === 'meadowlands') {
    const coop = animalStore.buildings.find(b => b.type === 'coop')
    if (coop) {
      coop.built = true
      coop.level = 1
    }
    animalStore.animals.push(
      {
        id: 'chicken_init_1',
        type: 'chicken',
        name: 'Pamuk',
        friendship: 100,
        mood: 200,
        daysOwned: 0,
        daysSinceProduct: 0,
        wasFed: false,
        fedWith: null,
        wasPetted: false,
        hunger: 0,
        sick: false,
        sickDays: 0
      },
      {
        id: 'chicken_init_2',
        type: 'chicken',
        name: 'Boncuk',
        friendship: 100,
        mood: 200,
        daysOwned: 0,
        daysSinceProduct: 0,
        wasFed: false,
        fedWith: null,
        wasPetted: false,
        hunger: 0,
        sick: false,
        sickDays: 0
      }
    )
  }

  questStore.initMainQuest()

  // Başlangıç rehberi: oyuna girer girmez hoş geldin mesajı göster
  const tutorialStore = useTutorialStore()
  if (tutorialStore.enabled) {
    addLog('Köy Muhtarı dedi ki: "ga Köy’e hoş geldin! Çantanda lahana tohumları var. Hadi çiftliğe gidip toprağı işle ve ekim yap."')
    tutorialStore.markTipShown('tip_welcome')
  }

  void router.push('/game')
}

const handleLoadGame = (slot: number) => {
  if (saveStore.loadFromSlot(slot)) {
    if (playerStore.needsIdentitySetup) {
      // Eski kayıtta isim/cinsiyet yoksa önce oyuncu bilgilerini tamamlat
      showIdentitySetup.value = true
    } else {
      void router.push('/game')
    }
  }
}

/** Eski kayıt için karakter bilgisi tamamlama */
const handleIdentityConfirm = () => {
  playerStore.setIdentity((charName.value.trim() || 'İsimsiz').slice(0, 4), charGender.value)
  showIdentitySetup.value = false
  void router.push('/game')
}

const handleDeleteSlot = (slot: number) => {
  deleteTargetSlot.value = slot
}

const confirmDeleteSlot = () => {
  if (deleteTargetSlot.value !== null) {
    saveStore.deleteSlot(deleteTargetSlot.value)
    refreshSlots()
    deleteTargetSlot.value = null
    slotMenuOpen.value = null
  }
}

const handleExportSlot = (slot: number) => {
  if (!saveStore.exportSave(slot)) {
    showFloat('Dışa aktarma başarısız oldu.', 'danger')
  }
}

const fileInputRef = ref<HTMLInputElement | null>(null)

const triggerImport = () => {
  fileInputRef.value?.click()
}

const handleImportFile = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const content = reader.result as string

    // İlk boş kayıt yuvasını bul, yoksa uyar
    const emptySlot = slots.value.find(s => !s.exists)
    if (!emptySlot) {
      showFloat('Kayıt yuvaları dolu. Lütfen önce eski bir kaydı sil.')
    } else if (saveStore.importSave(emptySlot.slot, content)) {
      refreshSlots()
      showFloat(`Kayıt ${emptySlot.slot + 1} yuvasına aktarıldı.`, 'success')
    } else {
      showFloat('Kayıt dosyası geçersiz ya da bozulmuş.', 'danger')
    }
    input.value = ''
  }
  reader.readAsText(file)
}
</script>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
  background: url(@/assets/logo.png) center / contain no-repeat;
  image-rendering: pixelated;
  flex-shrink: 0;
}
</style>