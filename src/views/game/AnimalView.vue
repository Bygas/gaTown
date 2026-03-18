<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-accent text-sm">
        <Home :size="14" class="inline" />
        Ahır
      </h3>
      <Button v-if="unpettedCount > 0" :icon="Hand" @click="handlePetAll">Hepsini Sev ({{ unpettedCount }} hayvan)</Button>
    </div>

    <p v-if="tutorialHint" class="text-[10px] text-muted/50 mb-2">{{ tutorialHint }}</p>

    <!-- Evcil hayvan bölümü -->
    <div class="mb-4 border border-accent/20 rounded-xs p-3">
      <p class="text-xs text-muted mb-2">Evcil Hayvan</p>
      <template v-if="animalStore.pet">
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center space-x-1">
            <template v-if="renamingId === 'pet'">
              <input
                v-model="renameInput"
                class="bg-bg border border-accent/30 rounded-xs px-1 py-0.5 text-xs text-text w-20 outline-none"
                maxlength="8"
                @keyup.enter="confirmRename"
                @keyup.escape="cancelRename"
              />
              <Button class="py-0 px-1" @click="confirmRename">Onayla</Button>
              <Button class="py-0 px-1" @click="cancelRename">İptal</Button>
            </template>
            <template v-else>
              <span class="text-xs text-accent">{{ animalStore.pet.type === 'cat' ? 'Kedi' : 'Köpek' }} — {{ animalStore.pet.name }}</span>
              <button class="text-muted hover:text-accent" @click="startRename('pet', animalStore.pet!.name)">
                <Pencil :size="10" />
              </button>
            </template>
          </div>
          <Button class="py-0 px-1" :icon="Hand" :disabled="animalStore.pet.wasPetted" @click="handlePetThePet">
            {{ animalStore.pet.wasPetted ? 'Sevildi' : 'Sev' }}
          </Button>
        </div>
        <div class="flex items-center space-x-1">
          <span class="text-[10px] text-muted w-6">Bağ</span>
          <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
            <div class="h-full rounded-xs bg-danger transition-all" :style="{ width: Math.floor(animalStore.pet.friendship / 10) + '%' }" />
          </div>
          <span class="text-[10px] text-muted">{{ animalStore.pet.friendship }}/1000</span>
        </div>
        <p v-if="animalStore.pet.friendship >= 800" class="text-xs text-success mt-1">Bağ seviyesi çok yüksek, her gün toplanabilir eşya getirme şansı var!</p>
      </template>
      <div v-else class="flex flex-col items-center justify-center py-6 text-muted">
        <Home :size="32" class="mb-2" />
        <p class="text-xs">Henüz evcil hayvan yok</p>
        <p class="text-[10px] mt-1">Yerleştikten sonraki 7. günde küçük bir hayvan ziyarete gelir.</p>
      </div>
    </div>

    <!-- Ahır listesi (kümes ve büyük ahır) -->
    <div v-for="bDef in mainBuildings" :key="bDef.type" class="mb-4 border border-accent/20 rounded-xs p-3">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-accent">{{ getBuildingDisplayName(bDef.type) }}</span>
        <div v-if="isBuildingBuilt(bDef.type)" class="flex items-center space-x-2">
          <span class="text-xs text-muted">{{ getAnimalsInBuilding(bDef.type).length }}/{{ getBuildingCapacity(bDef.type) }}</span>
          <Button v-if="getBuildingLevel(bDef.type) < 3" :icon="ArrowUp" @click="openUpgradeModal(bDef.type)">Yükselt</Button>
        </div>
        <Button v-else :icon="Hammer" @click="handleBuildBuilding(bDef.type)">İnşa Et ({{ bDef.cost }} akçe)</Button>
      </div>

      <template v-if="isBuildingBuilt(bDef.type)">
        <p v-if="animalStore.hasAutoPetter(bDef.type)" class="text-[10px] text-success mb-2">Otomatik sevme makinesi çalışıyor — her gün tüm hayvanları otomatik olarak sever</p>
        <!-- Kümes kuluçka makinesi (kümes seviye 2 ve üzeri) -->
        <div v-if="bDef.type === 'coop' && getBuildingLevel('coop') >= 2" class="mb-3 p-2 border border-accent/10 rounded-xs">
          <p class="text-xs text-accent mb-1">
            <Egg :size="14" class="inline" />
            Kuluçka Makinesi
          </p>
          <div v-if="animalStore.incubating">
            <p class="text-xs text-muted">
              Kuluçkada: {{ getAnimalName(animalStore.incubating.animalType) }} ({{ animalStore.incubating.daysLeft }} gün kaldı)
            </p>
          </div>
          <div v-else-if="coopIncubatableEggs.length > 0" class="flex flex-col space-y-1">
            <div
              v-for="eggItem in coopIncubatableEggs"
              :key="eggItem.itemId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
              @click="handleStartIncubation(eggItem.itemId)"
            >
              <span class="text-xs">{{ eggItem.name }}</span>
              <span class="text-xs text-muted">&times;{{ eggItem.count }}</span>
            </div>
          </div>
          <p v-else class="text-xs text-muted">Çantada kuluçkaya konabilecek yumurta yok.</p>
        </div>

        <!-- Büyük ahır kuluçka makinesi (büyük ahır seviye 2 ve üzeri) -->
        <div v-if="bDef.type === 'barn' && getBuildingLevel('barn') >= 2" class="mb-3 p-2 border border-accent/10 rounded-xs">
          <p class="text-xs text-accent mb-1">
            <Egg :size="14" class="inline" />
            Kuluçka Makinesi
          </p>
          <div v-if="animalStore.barnIncubating">
            <p class="text-xs text-muted">
              Kuluçkada: {{ getAnimalName(animalStore.barnIncubating.animalType) }} ({{ animalStore.barnIncubating.daysLeft }} gün kaldı)
            </p>
          </div>
          <div v-else-if="barnIncubatableEggs.length > 0" class="flex flex-col space-y-1">
            <div
              v-for="eggItem in barnIncubatableEggs"
              :key="eggItem.itemId"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
              @click="handleStartBarnIncubation(eggItem.itemId)"
            >
              <span class="text-xs">{{ eggItem.name }}</span>
              <span class="text-xs text-muted">&times;{{ eggItem.count }}</span>
            </div>
          </div>
          <p v-else class="text-xs text-muted">Çantada büyük ahırda kuluçkaya konabilecek yumurta yok.</p>
        </div>

        <!-- Hayvan satın alma butonu -->
        <Button class="w-full md:w-auto mb-3" :icon="ShoppingCart" @click="buyListBuilding = bDef.type">Hayvan Satın Al</Button>

        <!-- Hayvan listesi -->
        <div v-if="getAnimalsInBuilding(bDef.type).length > 0" class="flex flex-col space-y-1 max-h-60 overflow-y-auto">
          <div v-for="animal in getAnimalsInBuilding(bDef.type)" :key="animal.id" class="border border-accent/10 rounded-xs p-2 mr-1">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center space-x-1">
                <template v-if="renamingId === animal.id">
                  <input
                    v-model="renameInput"
                    class="bg-bg border border-accent/30 rounded-xs px-1 py-0.5 text-xs text-text w-20 outline-none"
                    maxlength="8"
                    @keyup.enter="confirmRename"
                    @keyup.escape="cancelRename"
                  />
                  <Button class="py-0 px-1" @click="confirmRename">Onayla</Button>
                  <Button class="py-0 px-1" @click="cancelRename">İptal</Button>
                </template>
                <template v-else>
                  <span class="text-xs text-accent">{{ animal.name }}</span>
                  <button class="text-muted hover:text-accent" @click="startRename(animal.id, animal.name)">
                    <Pencil :size="10" />
                  </button>
                </template>
              </div>
              <div class="flex items-center space-x-1">
                <Button class="py-0 px-1" :icon="Hand" :disabled="animal.wasPetted" @click="handlePetAnimal(animal.id)">
                  {{ animal.wasPetted ? 'Sevildi' : 'Sev' }}
                </Button>
                <Button class="py-0 px-1" :icon="Coins" @click="sellTarget = { id: animal.id, name: animal.name, type: animal.type }">
                  Sat
                </Button>
              </div>
            </div>
            <div class="space-y-0.5">
              <div class="flex items-center space-x-1">
                <span class="text-[10px] text-muted w-6">Bağ</span>
                <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                  <div class="h-full rounded-xs bg-danger transition-all" :style="{ width: Math.floor(animal.friendship / 10) + '%' }" />
                </div>
              </div>
              <div class="flex items-center space-x-1">
                <span class="text-[10px] text-muted w-6">Ruh Hali</span>
                <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                  <div
                    class="h-full rounded-xs transition-all"
                    :class="getMoodBarColor(animal.mood)"
                    :style="{ width: Math.floor((animal.mood / 255) * 100) + '%' }"
                  />
                </div>
                <span class="text-[10px] text-muted w-6">{{ getMoodText(animal.mood) }}</span>
              </div>
              <div v-if="animal.hunger > 0" class="flex items-center space-x-1">
                <span class="text-[10px] text-muted w-6">Açlık</span>
                <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                  <div class="h-full rounded-xs bg-danger transition-all" :style="{ width: Math.floor((animal.hunger / 7) * 100) + '%' }" />
                </div>
                <span class="text-[10px] text-danger w-6">{{ animal.hunger }} gün</span>
              </div>
            </div>
            <div v-if="animal.sick" class="flex items-center justify-between mt-0.5">
              <p class="text-[10px] text-danger">Hasta ({{ animal.sickDays }}/5 gün)</p>
              <Button class="py-0 px-1" :icon="Syringe" :disabled="medicineCount <= 0" @click="handleHealAnimal(animal.id, animal.name)">
                Tedavi Et
              </Button>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-6">
          <Home :size="36" class="text-accent/20 mb-2" />
          <p class="text-xs text-muted">Henüz hayvan yok</p>
          <p class="text-[10px] text-muted/50 mt-0.5">Dükkândan yavru satın alıp beslemeye başla</p>
        </div>
      </template>
      <template v-else>
        <p class="text-xs text-muted">Gerekli: {{ bDef.materialCost.map(m => `${getItemName(m.itemId)}×${m.quantity}`).join('、') }}</p>
      </template>
    </div>

    <!-- Ahır (atlık) -->
    <div class="mb-4 border border-accent/20 rounded-xs p-3">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-accent">At Ahırı</span>
        <div v-if="animalStore.stableBuilt" class="flex items-center space-x-2">
          <span class="text-xs text-muted">{{ animalStore.getHorse ? '1/1' : '0/1' }}</span>
        </div>
        <Button v-else :icon="Hammer" @click="handleBuildBuilding('stable')">İnşa Et ({{ stableDef?.cost ?? 10000 }} akçe)</Button>
      </div>

      <template v-if="animalStore.stableBuilt">
        <div v-if="animalStore.getHorse" class="border border-accent/10 rounded-xs p-2">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center space-x-1">
              <template v-if="renamingId === animalStore.getHorse.id">
                <input
                  v-model="renameInput"
                  class="bg-bg border border-accent/30 rounded-xs px-1 py-0.5 text-xs text-text w-20 outline-none"
                  maxlength="8"
                  @keyup.enter="confirmRename"
                  @keyup.escape="cancelRename"
                />
                <Button class="py-0 px-1" @click="confirmRename">Onayla</Button>
                <Button class="py-0 px-1" @click="cancelRename">İptal</Button>
              </template>
              <template v-else>
                <span class="text-xs text-accent">{{ animalStore.getHorse.name }}</span>
                <button class="text-muted hover:text-accent" @click="startRename(animalStore.getHorse!.id, animalStore.getHorse!.name)">
                  <Pencil :size="10" />
                </button>
              </template>
            </div>
            <div class="flex items-center space-x-1">
              <Button
                class="py-0 px-1"
                :icon="Hand"
                :disabled="animalStore.getHorse.wasPetted"
                @click="handlePetAnimal(animalStore.getHorse.id)"
              >
                {{ animalStore.getHorse.wasPetted ? 'Sevildi' : 'Sev' }}
              </Button>
              <Button
                class="py-0 px-1"
                :icon="Coins"
                @click="sellTarget = { id: animalStore.getHorse!.id, name: animalStore.getHorse!.name, type: animalStore.getHorse!.type }"
              >
                Sat
              </Button>
            </div>
          </div>
          <div class="space-y-0.5">
            <div class="flex items-center space-x-1">
              <span class="text-[10px] text-muted w-6">Bağ</span>
              <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                <div
                  class="h-full rounded-xs bg-danger transition-all"
                  :style="{ width: Math.floor(animalStore.getHorse.friendship / 10) + '%' }"
                />
              </div>
            </div>
            <div class="flex items-center space-x-1">
              <span class="text-[10px] text-muted w-6">Ruh Hali</span>
              <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                <div
                  class="h-full rounded-xs transition-all"
                  :class="getMoodBarColor(animalStore.getHorse.mood)"
                  :style="{ width: Math.floor((animalStore.getHorse.mood / 255) * 100) + '%' }"
                />
              </div>
              <span class="text-[10px] text-muted w-6">{{ getMoodText(animalStore.getHorse.mood) }}</span>
            </div>
            <div v-if="animalStore.getHorse.hunger > 0" class="flex items-center space-x-1">
              <span class="text-[10px] text-muted w-6">Açlık</span>
              <div class="flex-1 h-1.5 bg-bg rounded-xs border border-accent/10">
                <div
                  class="h-full rounded-xs bg-danger transition-all"
                  :style="{ width: Math.floor((animalStore.getHorse.hunger / 7) * 100) + '%' }"
                />
              </div>
              <span class="text-[10px] text-danger w-6">{{ animalStore.getHorse.hunger }} gün</span>
            </div>
          </div>
          <div v-if="animalStore.getHorse.sick" class="flex items-center justify-between mt-0.5">
            <p class="text-[10px] text-danger">Hasta ({{ animalStore.getHorse.sickDays }}/5 gün)</p>
            <Button
              class="py-0 px-1"
              :icon="Syringe"
              :disabled="medicineCount <= 0"
              @click="handleHealAnimal(animalStore.getHorse!.id, animalStore.getHorse!.name)"
            >
              Tedavi Et
            </Button>
          </div>
          <p class="text-xs text-success mt-1">Atla yolculuk yapınca seyahat süresi %30 azalır.</p>
        </div>
        <div v-else>
          <div
            class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
            @click="
              openBuyModal(
                {
                  type: 'horse' as AnimalType,
                  name: 'At',
                  building: 'stable' as AnimalBuildingType,
                  cost: 5000,
                  productId: '',
                  productName: 'Yok',
                  produceDays: 0,
                  friendship: { min: 0, max: 1000 }
                },
                'stable'
              )
            "
          >
            <span class="text-xs">At</span>
            <span class="text-xs text-accent whitespace-nowrap">5000 akçe</span>
          </div>
          <p class="text-xs text-muted mt-1">At sahibi olmak seyahat süresini %30 azaltır.</p>
        </div>
      </template>
      <template v-else>
        <p class="text-xs text-muted">
          Gerekli: {{ stableDef?.materialCost.map(m => `${getItemName(m.itemId)}×${m.quantity}`).join('、') ?? '' }}
        </p>
        <p class="text-xs text-muted mt-1">At sahibi olmak seyahat süresini %30 azaltır.</p>
      </template>
    </div>

    <!-- Besleme yönetimi -->
    <div class="border border-accent/20 rounded-xs p-3">
      <h3 class="text-accent text-sm mb-3">
        <Apple :size="14" class="inline" />
        Besleme Yönetimi
      </h3>

      <!-- Yem seçimi -->
      <div class="mb-3">
        <p class="text-xs text-muted mb-1">Yem Seçimi</p>
        <div class="flex flex-col space-y-1">
          <div
            v-for="feed in feedCounts"
            :key="feed.id"
            class="flex items-center justify-between border rounded-xs px-3 py-1.5 cursor-pointer"
            :class="selectedFeed === feed.id ? 'border-accent bg-accent/10' : 'border-accent/20 hover:bg-accent/5'"
            @click="selectedFeed = feed.id"
          >
            <div class="flex items-center space-x-2">
              <span class="text-xs" :class="selectedFeed === feed.id ? 'text-accent' : ''">{{ feed.name }}</span>
              <span class="text-[10px] text-muted">{{ feed.description }}</span>
            </div>
            <span class="text-xs text-muted">{{ feed.count }}</span>
          </div>
        </div>
      </div>

      <!-- Besleme -->
      <div class="mb-3">
        <div class="flex items-center justify-between mb-1">
          <p class="text-xs text-muted">Besleme</p>
          <span class="text-xs text-muted">{{ selectedFeedName }} stoğu: {{ selectedFeedCount }}</span>
        </div>
        <div class="flex flex-col space-y-1">
          <div
            class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5"
            :class="unfedCount > 0 ? 'cursor-pointer hover:bg-accent/5' : 'opacity-50'"
            @click="unfedCount > 0 && handleFeedAll()"
          >
            <span class="text-xs">Hepsini Besle</span>
            <span class="text-xs text-muted">{{ selectedFeedName }} gerekir &times;{{ unfedCount }}</span>
          </div>
          <div
            class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5"
            :class="playerStore.money >= selectedFeedPrice ? 'cursor-pointer hover:bg-accent/5' : 'opacity-50'"
            @click="playerStore.money >= selectedFeedPrice && handleBuyFeed()"
          >
            <span class="text-xs">{{ selectedFeedName }} Satın Al</span>
            <span class="text-xs text-accent">{{ selectedFeedPrice }} akçe</span>
          </div>
        </div>
      </div>

      <!-- Otlatma -->
      <div>
        <p class="text-xs text-muted mb-1">Otlatma</p>
        <div
          class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5"
          :class="canGraze ? 'cursor-pointer hover:bg-accent/5' : 'opacity-50'"
          @click="canGraze && handleGraze()"
        >
          <span class="text-xs">Tüm Hayvanları Otlat</span>
          <span v-if="grazeDisabledReason" class="text-xs text-muted">{{ grazeDisabledReason }}</span>
        </div>
      </div>

      <!-- Tedavi -->
      <div v-if="sickCount > 0" class="mt-3">
        <div class="flex items-center justify-between mb-1">
          <p class="text-xs text-muted">Tedavi</p>
          <span class="text-xs text-muted">Hayvan ilacı stoğu: {{ medicineCount }}</span>
        </div>
        <div
          class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5"
          :class="medicineCount > 0 ? 'cursor-pointer hover:bg-accent/5' : 'opacity-50'"
          @click="medicineCount > 0 && handleHealAll()"
        >
          <span class="text-xs">Tüm Hasta Hayvanları Tedavi Et</span>
          <span class="text-xs text-muted">Hayvan ilacı gerekir ×{{ sickCount }}</span>
        </div>
      </div>
    </div>

    <!-- Hayvan satın alma listesi penceresi -->
    <Transition name="panel-fade">
      <div
        v-if="buyListBuilding"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="buyListBuilding = null"
      >
        <div class="game-panel max-w-xs w-full">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-accent">Hayvan Satın Al</p>
            <Button class="py-0 px-1" :icon="X" :icon-size="12" @click="buyListBuilding = null" />
          </div>
          <div class="flex flex-col space-y-1">
            <div
              v-for="aDef in getAnimalDefsForBuilding(buyListBuilding)"
              :key="aDef.type"
              class="flex items-center justify-between border border-accent/20 rounded-xs px-3 py-1.5 cursor-pointer hover:bg-accent/5"
              @click="handleSelectAnimalToBuy(aDef)"
            >
              <span class="text-xs">{{ aDef.name }}</span>
              <span class="text-xs text-accent whitespace-nowrap">{{ aDef.cost }} akçe</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Hayvan satın alma detay penceresi -->
    <Transition name="panel-fade">
      <div v-if="buyModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4" @click.self="buyModal = null">
        <div class="game-panel max-w-xs w-full">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-accent">{{ buyModal.name }}</p>
            <Button class="py-0 px-1" :icon="X" :icon-size="12" @click="buyModal = null" />
          </div>
          <div class="text-xs space-y-1 mb-3 border-b border-accent/20 pb-2">
            <p v-if="buyModal.productName && buyModal.productName !== 'Yok'" class="text-muted">
              Ürün: {{ buyModal.productName }} (her {{ buyModal.produceDays }} günde)
            </p>
            <p v-else class="text-muted">Seyahat süresi %30 azalır</p>
            <p>Fiyat: {{ buyModal.cost }} akçe</p>
          </div>
          <Button class="w-full" :icon="ShoppingCart" :disabled="!buyModal.canBuy()" @click="handleBuyFromModal">Satın Al</Button>
        </div>
      </div>
    </Transition>

    <!-- Hayvan satma onay penceresi -->
    <Transition name="panel-fade">
      <div v-if="sellTarget" class="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4" @click.self="sellTarget = null">
        <div class="game-panel max-w-xs w-full relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text" @click="sellTarget = null">
            <X :size="14" />
          </button>
          <p class="text-accent text-sm mb-2">Hayvan Sat</p>
          <p class="text-xs text-text mb-1">
            <span class="text-accent">{{ sellTarget.name }}</span>
            adlı hayvanı satmak istediğine emin misin?
          </p>
          <p class="text-xs text-muted mb-3">
            Satıştan sonra geri alınamaz; karşılığında
            <span class="text-accent">{{ sellTargetRefund }} akçe</span>
            kazanırsın (orijinal fiyatın yarısı).
          </p>
          <div class="flex space-x-2">
            <Button class="flex-1" @click="sellTarget = null">İptal</Button>
            <Button class="flex-1 !bg-danger !text-text" :icon="Coins" :icon-size="12" @click="confirmSellAnimal">Satışı Onayla</Button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Ahır yükseltme penceresi -->
    <Transition name="panel-fade">
      <div
        v-if="upgradeModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="upgradeModal = null"
      >
        <div class="game-panel max-w-xs w-full relative">
          <button class="absolute top-2 right-2 text-muted hover:text-text" @click="upgradeModal = null">
            <X :size="14" />
          </button>

          <p class="text-sm text-accent mb-2">Ahırı Yükselt</p>

          <!-- Mevcut seviye bilgisi -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Mevcut</span>
              <span class="text-xs">{{ upgradeModal.currentName }} (Sv.{{ upgradeModal.currentLevel }})</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Kapasite</span>
              <span class="text-xs">{{ upgradeModal.currentCapacity }} hayvan</span>
            </div>
          </div>

          <!-- Yükseltme hedefi -->
          <div class="border border-accent/10 rounded-xs p-2 mb-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Şuna yükselt</span>
              <span class="text-xs text-accent">{{ upgradeModal.targetName }} (Sv.{{ upgradeModal.targetLevel }})</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs text-muted">Kapasite</span>
              <span class="text-xs text-accent">{{ upgradeModal.targetCapacity }} hayvan</span>
            </div>
          </div>

          <!-- Gerekli kaynaklar -->
          <div class="border border-accent/10 rounded-xs p-2 mb-3">
            <p class="text-xs text-muted mb-1">Gerekli Kaynaklar</p>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs">Para</span>
              <span class="text-xs" :class="playerStore.money >= upgradeModal.cost ? 'text-success' : 'text-danger'">
                {{ playerStore.money }} / {{ upgradeModal.cost }} akçe
              </span>
            </div>
            <div v-for="mat in upgradeModal.materials" :key="mat.itemId" class="flex items-center justify-between mt-0.5">
              <span class="text-xs">{{ mat.name }}</span>
              <span class="text-xs" :class="mat.have >= mat.need ? 'text-success' : 'text-danger'">{{ mat.have }} / {{ mat.need }}</span>
            </div>
          </div>

          <Button
            class="w-full justify-center"
            :class="canConfirmUpgrade ? '!bg-accent !text-bg' : 'opacity-50'"
            :icon="ArrowUp"
            :icon-size="12"
            :disabled="!canConfirmUpgrade"
            @click="confirmUpgradeBuilding"
          >
            Yükseltmeyi Onayla
          </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { Hammer, ShoppingCart, Hand, Apple, Home, ArrowUp, Egg, X, Coins, Syringe, Pencil } from 'lucide-vue-next'
  import Button from '@/components/game/Button.vue'
  import { useAnimalStore } from '@/stores/useAnimalStore'
  import { useGameStore } from '@/stores/useGameStore'
  import { useInventoryStore } from '@/stores/useInventoryStore'
  import { usePlayerStore } from '@/stores/usePlayerStore'
  import { ANIMAL_BUILDINGS, ANIMAL_DEFS, HAY_ITEM_ID, getItemById, getBuildingUpgrade, INCUBATION_MAP, FEED_DEFS } from '@/data'
  import { ACTION_TIME_COSTS } from '@/data/timeConstants'
  import type { AnimalBuildingType, AnimalType, AnimalDef } from '@/types'
  import { addLog } from '@/composables/useGameLog'
  import { handleEndDay } from '@/composables/useEndDay'
  import { useTutorialStore } from '@/stores/useTutorialStore'

  const animalStore = useAnimalStore()
  const inventoryStore = useInventoryStore()
  const playerStore = usePlayerStore()
  const gameStore = useGameStore()
  const tutorialStore = useTutorialStore()

  const tutorialHint = computed(() => {
    if (!tutorialStore.enabled || gameStore.year > 1) return null
    const coopBuilt = animalStore.buildings.find(b => b.type === 'coop')?.built ?? false
    const barnBuilt = animalStore.buildings.find(b => b.type === 'barn')?.built ?? false
    if (!coopBuilt && !barnBuilt) return null
    if (animalStore.animals.length > 0 && animalStore.animals.every(a => !a.wasPetted))
      return 'Hayvanları her gün sevmek dostluğu artırır; “Hepsini Sev” ile toplu işlem yapabilirsin.'
    return null
  })

  // === Satın alma penceresi ===

  interface BuyAnimalModalData {
    name: string
    productName: string
    produceDays: number
    cost: number
    onBuy: () => void
    canBuy: () => boolean
  }

  const buyModal = ref<BuyAnimalModalData | null>(null)
  const buyListBuilding = ref<AnimalBuildingType | null>(null)

  const handleSelectAnimalToBuy = (aDef: AnimalDef) => {
    if (!buyListBuilding.value) return
    openBuyModal(aDef, buyListBuilding.value)
    buyListBuilding.value = null
  }

  const openBuyModal = (aDef: AnimalDef, buildingType: AnimalBuildingType) => {
    buyModal.value = {
      name: aDef.name,
      productName: aDef.productName,
      produceDays: aDef.produceDays,
      cost: aDef.cost,
      onBuy: () => handleBuyAnimal(aDef.type),
      canBuy: () => {
        if (buildingType === 'stable') return !animalStore.getHorse && playerStore.money >= aDef.cost
        return getAnimalsInBuilding(buildingType).length < getBuildingCapacity(buildingType) && playerStore.money >= aDef.cost
      }
    }
  }

  const handleBuyFromModal = () => {
    if (!buyModal.value) return
    buyModal.value.onBuy()
    buyModal.value = null
  }

  // === Satış onay penceresi ===

  const sellTarget = ref<{ id: string; name: string; type: AnimalType } | null>(null)

  const sellTargetRefund = computed(() => {
    if (!sellTarget.value) return 0
    const def = ANIMAL_DEFS.find(d => d.type === sellTarget.value!.type)
    return Math.floor((def?.cost ?? 0) / 2)
  })

  const confirmSellAnimal = () => {
    if (!sellTarget.value) return
    const result = animalStore.sellAnimal(sellTarget.value.id)
    sellTarget.value = null
    if (result.success) {
      addLog(`${result.name} satıldı, ${result.refund} akçe kazanıldı.`)
    }
  }

  // === Veri hesaplamaları ===

  /** Sadece kümes ve büyük ahırı göster (at ahırı ayrı çizilir) */
  const mainBuildings = computed(() => ANIMAL_BUILDINGS.filter(b => b.type !== 'stable'))

  /** At ahırı bina tanımı */
  const stableDef = computed(() => ANIMAL_BUILDINGS.find(b => b.type === 'stable'))

  /** Şu an seçili yem türü */
  const selectedFeed = ref<string>(HAY_ITEM_ID)

  /** Yem türlerinin stok miktarları */
  const feedCounts = computed(() =>
    FEED_DEFS.map(f => ({
      ...f,
      count: inventoryStore.getItemCount(f.id)
    }))
  )

  /** Şu an seçili yemin adı */
  const selectedFeedName = computed(() => FEED_DEFS.find(f => f.id === selectedFeed.value)?.name ?? 'Saman')

  /** Şu an seçili yemin stoğu */
  const selectedFeedCount = computed(() => inventoryStore.getItemCount(selectedFeed.value))

  /** Şu an seçili yemin fiyatı */
  const selectedFeedPrice = computed(() => FEED_DEFS.find(f => f.id === selectedFeed.value)?.price ?? 50)

  /** Beslenmemiş hayvan sayısı */
  const unfedCount = computed(() => animalStore.animals.filter(a => !a.wasFed).length)

  /** Hayvan ilacı stoğu */
  const medicineCount = computed(() => inventoryStore.getItemCount('animal_medicine'))

  /** Hasta hayvan sayısı */
  const sickCount = computed(() => animalStore.animals.filter(a => a.sick).length)

  /** Kümes içinde kuluçkaya konabilecek yumurtalar listesi */
  const coopIncubatableEggs = computed(() => {
    const result: { itemId: string; name: string; count: number }[] = []
    for (const [itemId, mapping] of Object.entries(INCUBATION_MAP)) {
      if (mapping.building !== 'coop') continue
      const count = inventoryStore.getItemCount(itemId)
      if (count > 0) {
        const itemDef = getItemById(itemId)
        result.push({ itemId, name: itemDef?.name ?? itemId, count })
      }
    }
    return result
  })

  /** Büyük ahır içinde kuluçkaya konabilecek yumurtalar listesi */
  const barnIncubatableEggs = computed(() => {
    const result: { itemId: string; name: string; count: number }[] = []
    for (const [itemId, mapping] of Object.entries(INCUBATION_MAP)) {
      if (mapping.building !== 'barn') continue
      const count = inventoryStore.getItemCount(itemId)
      if (count > 0) {
        const itemDef = getItemById(itemId)
        result.push({ itemId, name: itemDef?.name ?? itemId, count })
      }
    }
    return result
  })

  // === Yardımcı fonksiyonlar ===

  const getAnimalName = (type: AnimalType): string => {
    return ANIMAL_DEFS.find(d => d.type === type)?.name ?? type
  }

  const getItemName = (itemId: string): string => {
    return getItemById(itemId)?.name ?? itemId
  }

  const isBuildingBuilt = (type: AnimalBuildingType): boolean => {
    return animalStore.buildings.find(b => b.type === type)?.built ?? false
  }

  const getAnimalsInBuilding = (type: AnimalBuildingType) => {
    return animalStore.animals.filter(a => {
      const def = ANIMAL_DEFS.find(d => d.type === a.type)
      return def?.building === type
    })
  }

  const getAnimalDefsForBuilding = (type: AnimalBuildingType) => {
    return ANIMAL_DEFS.filter(d => d.building === type)
  }

  const getBuildingLevel = (type: AnimalBuildingType): number => {
    return animalStore.buildings.find(b => b.type === type)?.level ?? 0
  }

  const getBuildingDisplayName = (type: AnimalBuildingType): string => {
    const level = getBuildingLevel(type)
    if (level >= 2) {
      const upgrade = getBuildingUpgrade(type, level)
      if (upgrade) return upgrade.name
    }
    return ANIMAL_BUILDINGS.find(b => b.type === type)?.name ?? type
  }

  const getBuildingCapacity = (type: AnimalBuildingType): number => {
    const level = getBuildingLevel(type)
    if (type === 'stable') return 1
    return level * 4
  }

  const getMoodText = (mood: number): string => {
    if (mood > 200) return 'Mutlu'
    if (mood > 100) return 'Normal'
    return 'Moral Bozuk'
  }

  const getMoodBarColor = (mood: number): string => {
    if (mood > 200) return 'bg-success'
    if (mood > 100) return 'bg-accent'
    return 'bg-danger'
  }

  // === Otlatma ===

  const canGraze = computed(() => {
    if (animalStore.grazedToday) return false
    if (gameStore.isRainy) return false
    if (gameStore.season === 'winter') {
      return animalStore.animals.some(a => a.wasFed && a.type === 'yak')
    }
    const hasGrazeableAnimals = animalStore.animals.some(a => a.wasFed && a.type !== 'horse')
    return hasGrazeableAnimals
  })

  const grazeDisabledReason = computed(() => {
    if (animalStore.animals.filter(a => a.type !== 'horse').length === 0) return 'Hayvan yok'
    if (animalStore.grazedToday) return 'Bugün zaten otlatıldı'
    if (gameStore.isRainy) return 'Yağmurlu havada otlatılamaz'
    if (gameStore.season === 'winter') {
      const hasYak = animalStore.animals.some(a => a.wasFed && a.type === 'yak')
      return hasYak ? '' : 'Kışın sadece yaklar otlatılabilir'
    }
    if (!animalStore.animals.some(a => a.wasFed && a.type !== 'horse')) return 'Önce besle, sonra otlat'
    return ''
  })

  // === Yükseltme penceresi ===

  interface UpgradeModalData {
    buildingType: AnimalBuildingType
    currentName: string
    currentLevel: number
    currentCapacity: number
    targetName: string
    targetLevel: number
    targetCapacity: number
    cost: number
    materials: { itemId: string; name: string; need: number; have: number }[]
  }

  const upgradeModal = ref<UpgradeModalData | null>(null)

  const openUpgradeModal = (type: AnimalBuildingType) => {
    const level = getBuildingLevel(type)
    const upgrade = getBuildingUpgrade(type, level + 1)
    if (!upgrade) return
    upgradeModal.value = {
      buildingType: type,
      currentName: getBuildingDisplayName(type),
      currentLevel: level,
      currentCapacity: level * 4,
      targetName: upgrade.name,
      targetLevel: upgrade.level,
      targetCapacity: upgrade.capacity,
      cost: upgrade.cost,
      materials: upgrade.materialCost.map(m => ({
        itemId: m.itemId,
        name: getItemName(m.itemId),
        need: m.quantity,
        have: inventoryStore.getItemCount(m.itemId)
      }))
    }
  }

  const canConfirmUpgrade = computed(() => {
    if (!upgradeModal.value) return false
    if (playerStore.money < upgradeModal.value.cost) return false
    return upgradeModal.value.materials.every(m => inventoryStore.getItemCount(m.itemId) >= m.need)
  })

  const confirmUpgradeBuilding = () => {
    if (!upgradeModal.value) return
    const type = upgradeModal.value.buildingType
    const targetName = upgradeModal.value.targetName
    const targetCapacity = upgradeModal.value.targetCapacity
    upgradeModal.value = null
    const success = animalStore.upgradeBuilding(type)
    if (success) {
      addLog(`${targetName} başarıyla inşa edildi! Kapasite ${targetCapacity} oldu.`)
      const tr = gameStore.advanceTime(2)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog('Yükseltme başarısız, akçe ve malzemelerin yeterli olup olmadığını kontrol et.')
    }
  }

  // === İşlem fonksiyonları ===

  const handleBuildBuilding = (type: AnimalBuildingType) => {
    const success = animalStore.buildBuilding(type)
    const bDef = ANIMAL_BUILDINGS.find(b => b.type === type)
    if (success) {
      addLog(`${bDef?.name ?? 'Ahır'} başarıyla inşa edildi!`)
      const tr = gameStore.advanceTime(2)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog(`${bDef?.name ?? 'Ahır'} inşa edilemedi, akçe ve malzemelerin yeterli olup olmadığını kontrol et.`)
    }
  }

  const handleBuyAnimal = (type: AnimalType) => {
    const aDef = ANIMAL_DEFS.find(d => d.type === type)
    if (!aDef) return
    const count = animalStore.animals.filter(a => a.type === type).length
    const defaultName = `${aDef.name}${count + 1}`
    const success = animalStore.buyAnimal(type, defaultName)
    if (success) {
      addLog(`Bir ${aDef.name} satın alındı, adı da “${defaultName}” oldu.`)
    } else {
      addLog(`${aDef.name} satın alınamadı, akçe ve ahır kapasitesini kontrol et.`)
    }
  }

  const handlePetAnimal = (id: string) => {
    const success = animalStore.petAnimal(id)
    if (success) {
      const animal = animalStore.animals.find(a => a.id === id)
      addLog(`${animal?.name ?? 'Hayvan'} sevildi, dostluk arttı.`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.petAnimal)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog('Bugün zaten sevildi.')
    }
  }

  const handlePetThePet = () => {
    const success = animalStore.petThePet()
    if (success) {
      addLog(`${animalStore.pet?.name ?? 'Evcil hayvan'} sevildi, bağ +5.`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.petAnimal)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog('Bugün zaten sevildi.')
    }
  }

  const unpettedCount = computed(() => {
    let count = animalStore.animals.filter(a => !a.wasPetted).length
    if (animalStore.pet && !animalStore.pet.wasPetted) count++
    return count
  })

  const handlePetAll = () => {
    const STAMINA_COST = 2
    if (!playerStore.consumeStamina(STAMINA_COST)) {
      addLog('Dayanıklılık yetersiz, hepsini sevemezsin.')
      return
    }
    const count = animalStore.petAllAnimals()
    if (count > 0) {
      addLog(`Bir kerede ${count} hayvan sevildi, herkes çok mutlu!`)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.batchPet)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    } else {
      addLog('Bugün hepsi zaten sevildi.')
    }
  }

  const handleStartIncubation = (itemId: string) => {
    const result = animalStore.startIncubation(itemId)
    addLog(result.message)
  }

  const handleStartBarnIncubation = (itemId: string) => {
    const result = animalStore.startBarnIncubation(itemId)
    addLog(result.message)
  }

  const handleFeedAll = () => {
    const result = animalStore.feedAll(selectedFeed.value)
    const feedName = selectedFeedName.value
    if (result.fedCount > 0) {
      addLog(`${result.fedCount} hayvan ${feedName} ile beslendi.`)
    }
    if (result.noFeedCount > 0) {
      addLog(`${feedName} yetersiz, ${result.noFeedCount} hayvan beslenemedi.`)
    }
    if (result.fedCount === 0 && result.noFeedCount === 0) {
      addLog('Bugün tüm hayvanlar zaten beslendi.')
    }
    if (result.fedCount > 0) {
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.feedAnimals)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    }
  }

  const handleBuyFeed = () => {
    const feed = FEED_DEFS.find(f => f.id === selectedFeed.value)
    if (!feed) return
    // Ana çantada yer olup olmadığını kontrol et (aynı yığından varsa ya da boş yer varsa), geçici çantaya taşmasın
    const hasStack = inventoryStore.items.some(s => s.itemId === feed.id && s.quality === 'normal' && s.quantity < 99)
    if (!hasStack && inventoryStore.isFull) {
      addLog('Çanta dolu, satın alınamaz.')
      return
    }
    if (!playerStore.spendMoney(feed.price)) {
      addLog(`${feed.name} satın almak için yeterli akçe yok.`)
      return
    }
    if (!inventoryStore.addItem(feed.id)) {
      // addItem beklenmedik şekilde başarısız olduysa parayı geri ver
      playerStore.earnMoney(feed.price)
      addLog('Satın alma başarısız oldu, para iade edildi.')
      return
    }
    addLog(`1 adet ${feed.name} satın alındı, ${feed.price} akçe harcandı.`)
  }

  const handleGraze = () => {
    const result = animalStore.grazeAnimals()
    addLog(result.message)
    if (result.success) {
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.graze)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) handleEndDay()
    }
  }

  const handleHealAnimal = (animalId: string, animalName: string) => {
    const success = animalStore.healAnimal(animalId)
    if (success) addLog(`${animalName}, hayvan ilacı ile iyileştirildi.`)
    else addLog('Tedavi başarısız, hayvan ilacı olup olmadığını kontrol et.')
  }

  const handleHealAll = () => {
    const result = animalStore.healAllSick()
    if (result.healedCount > 0) addLog(`${result.healedCount} hayvan hayvan ilacı ile tedavi edildi.`)
    if (result.noMedicineCount > 0) addLog(`Hayvan ilacı yetersiz, ${result.noMedicineCount} hayvan tedavi edilemedi.`)
  }

  // === Yeniden adlandırma ===

  const renamingId = ref<string | null>(null)
  const renameInput = ref('')

  const startRename = (id: string, currentName: string) => {
    renamingId.value = id
    renameInput.value = currentName
  }

  const confirmRename = () => {
    if (!renamingId.value) return
    const success = animalStore.renameAnimal(renamingId.value, renameInput.value)
    if (success) {
      addLog(`Adı “${renameInput.value.trim()}” olarak değiştirildi.`)
    } else {
      addLog('Yeniden adlandırma başarısız, isim 1-8 karakter arasında olmalı.')
    }
    renamingId.value = null
  }

  const cancelRename = () => {
    renamingId.value = null
  }
</script>
