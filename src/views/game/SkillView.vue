<template>
  <div>
    <h3 class="text-accent text-sm mb-3">
      <Star :size="14" class="inline" />
      Yetenekler
    </h3>
    <div class="space-y-3">
      <div v-for="skill in skillStore.skills" :key="skill.type" class="game-panel">
        <!-- Başlık satırı: ikon + isim/seviye + deneyim -->
        <div class="flex justify-between items-center mb-1.5">
          <div class="flex items-center space-x-1.5">
            <component :is="SKILL_ICONS[skill.type]" :size="14" class="text-accent" />
            <span class="text-sm">{{ SKILL_NAMES[skill.type] }}</span>
            <span class="text-xs text-accent">Sv.{{ skill.level }}</span>
          </div>
          <p v-if="expInfo(skill.type)" class="text-[10px] text-muted">
            {{ expInfo(skill.type)!.current }}/{{ expInfo(skill.type)!.required }}
          </p>
          <span v-else class="text-[10px] text-accent border border-accent/30 rounded-xs px-1">MAKS</span>
        </div>

        <!-- Deneyim çubuğu -->
        <div class="bg-bg rounded-xs h-1.5 mb-2">
          <div class="h-full bg-accent rounded-xs transition-all" :style="{ width: expPercent(skill.type) + '%' }" />
        </div>

        <!-- Açıklama + seviye başı bonus -->
        <div class="border border-accent/20 rounded-xs px-2 py-1.5 mb-2">
          <p class="text-[10px] text-muted leading-relaxed">{{ SKILL_DESCS[skill.type] }}</p>
          <p class="text-[10px] text-muted mt-0.5">Her seviye: enerji tüketimi %1 azalır, {{ SKILL_LEVEL_BONUS[skill.type] }}</p>
        </div>

        <!-- Uzmanlıklar -->
        <div v-if="skill.perk5 || skill.perk10" class="flex flex-col space-y-1">
          <div v-if="skill.perk5" class="flex items-center space-x-1.5 border border-water rounded-xs px-2 py-1">
            <span class="text-[10px] text-water shrink-0">Sv.5</span>
            <span class="text-xs text-water shrink-0">{{ PERK_NAMES[skill.perk5] }}</span>
            <span class="text-[10px] text-muted">{{ PERK_DESCS[skill.perk5] }}</span>
          </div>
          <div v-if="skill.perk10" class="flex items-center space-x-1.5 border border-water rounded-xs px-2 py-1">
            <span class="text-[10px] text-water shrink-0">Sv.10</span>
            <span class="text-xs text-water shrink-0">{{ PERK_NAMES[skill.perk10] }}</span>
            <span class="text-[10px] text-muted">{{ PERK_DESCS[skill.perk10] }}</span>
          </div>
        </div>
        <p v-else-if="skill.level < 5" class="text-[10px] text-muted">Sv.5 ve Sv.10 olduğunda uzmanlık seçebilirsin</p>
        <p v-else class="text-[10px] text-muted">Sv.{{ !skill.perk5 ? 5 : 10 }} olduğunda yeni uzmanlık seçebilirsin</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type Component } from 'vue'
  import { Star, Wheat, TreePine, Fish, Pickaxe, Sword } from 'lucide-vue-next'
  import { useSkillStore } from '@/stores/useSkillStore'
  import type { SkillType, SkillPerk5, SkillPerk10 } from '@/types'

  const skillStore = useSkillStore()

  const SKILL_ICONS: Record<SkillType, Component> = {
    farming: Wheat,
    foraging: TreePine,
    fishing: Fish,
    mining: Pickaxe,
    combat: Sword
  }

  const SKILL_NAMES: Record<SkillType, string> = {
    farming: 'Tarım',
    foraging: 'Toplayıcılık',
    fishing: 'Balıkçılık',
    mining: 'Madencilik',
    combat: 'Savaş'
  }

  const SKILL_DESCS: Record<SkillType, string> = {
    farming: 'Ürün eker, yetiştirir ve hasat edersin. Seviye yükseldikçe ürün kalitesi artar.',
    foraging: 'Doğadan kaynak toplar ve ağaç kesersin. Seviye yükseldikçe topladığın kaynakların kalitesi artar.',
    fishing: 'Farklı sularda balık tutarsın. Seviye yükseldikçe balık tutma başarın artar.',
    mining: 'Madenlerde kazı yapar ve savaşlara girersin. Seviye yükseldikçe daha fazla maden elde edersin.',
    combat: 'Madenlerdeki yaratıklarla savaşırsın. Seviye yükseldikçe maksimum canın artar.'
  }

  const SKILL_LEVEL_BONUS: Record<SkillType, string> = {
    farming: 'ürün kalitesi ihtimali artar',
    foraging: 'toplama kalitesi ihtimali artar',
    fishing: 'balık tutma başarısı artar',
    mining: 'maden verimi artar',
    combat: 'maksimum can +5'
  }

  const PERK_DESCS: Record<SkillPerk5 | SkillPerk10, string> = {
    harvester: 'Ürün satış fiyatı %10 artar',
    rancher: 'Hayvansal ürünlerin satış fiyatı %20 artar',
    lumberjack: 'Toplama sırasında %25 ihtimalle fazladan odun kazanırsın',
    herbalist: 'Toplama ürünleri bulma ihtimali %20 artar',
    fisher: 'Balık satış fiyatı %25 artar',
    trapper: 'Balık yakalama başarısı %15 artar',
    miner: 'Maden çıkarırken %50 ihtimalle +1 fazladan cevher kazanırsın',
    geologist: 'Nadir maden bulma ihtimali büyük ölçüde artar',
    fighter: 'Alınan hasar %15 azalır, maksimum can +25 artar',
    defender: 'Savunma yaparken 5 can yenilersin',
    intensive: '%20 ihtimalle çift hasat alırsın',
    artisan: 'İşlenmiş ürünlerin satış fiyatı %25 artar',
    coopmaster: 'Hayvanlarla yakınlık kazanımı %50 artar',
    shepherd: 'Hayvansal ürün kalitesi 1 seviye yükselir',
    forester: 'Toplama sırasında her zaman fazladan odun kazanırsın',
    tracker: 'Her toplamada +1 fazladan eşya alırsın',
    botanist: 'Toplama ürünleri her zaman kaliteli olur',
    alchemist: 'Yiyeceklerin iyileştirme etkisi %50 artar',
    angler: 'Efsane balıkların çıkma ihtimali büyük ölçüde artar',
    aquaculture: 'Balık satış fiyatı %50 artar',
    mariner: 'Tuttuğun balıkların kalitesi en az iyi olur',
    luremaster: 'Yem etkisi iki katına çıkar',
    prospector: '%15 ihtimalle iki kat maden kazanırsın',
    blacksmith: 'Metal cevher satış fiyatı %50 artar',
    excavator: 'Bomba kullanırken %30 ihtimalle tüketilmez',
    mineralogist: 'Canavarları yendiğinde fazladan maden düşer',
    warrior: 'Maksimum can +40 artar',
    brute: 'Saldırı hasarı %25 artar',
    acrobat: '%25 ihtimalle saldırıdan kaçınır ve karşılık verirsin',
    tank: 'Savunma yaparken alınan hasar %70 azalır'
  }

  const PERK_NAMES: Record<SkillPerk5 | SkillPerk10, string> = {
    harvester: 'Hasat Ustası',
    rancher: 'Çiftlik Sahibi',
    lumberjack: 'Oduncu',
    herbalist: 'Şifacı',
    fisher: 'Balıkçı',
    trapper: 'Avcı',
    miner: 'Madenci',
    geologist: 'Jeolog',
    fighter: 'Savaşçı',
    defender: 'Koruyucu',
    intensive: 'Yoğun Tarım',
    artisan: 'Zanaatkâr',
    coopmaster: 'Ağıl Ustası',
    shepherd: 'Çoban',
    botanist: 'Botanikçi',
    alchemist: 'Simyacı',
    forester: 'Ormancı',
    tracker: 'İz Sürücü',
    angler: 'Olta Ustası',
    aquaculture: 'Su Ürünleri Ustası',
    mariner: 'Denizci',
    luremaster: 'Yem Ustası',
    prospector: 'Cevher Avcısı',
    blacksmith: 'Demirci',
    excavator: 'Kazıcı',
    mineralogist: 'Mineralog',
    warrior: 'Yiğit',
    brute: 'Yıkıcı Güç',
    acrobat: 'Akrobat',
    tank: 'Ağır Zırhlı'
  }

  const expInfo = (type: SkillType) => {
    return skillStore.getExpToNextLevel(type)
  }

  const expPercent = (type: SkillType): number => {
    const info = skillStore.getExpToNextLevel(type)
    if (!info) return 100
    return Math.round((info.current / info.required) * 100)
  }
</script>