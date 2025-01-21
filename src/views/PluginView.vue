<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'
import { ElSegmented, ElCard } from 'element-plus'
import { CalculatorPlugin, DictionaryPlugin, TranslatorPlugin } from '@/components/plugins'

const user = useUserStore()
const router = useRouter()
const route = useRoute()
const { locale, t } = useI18n()

if (!user.position.includes('admin')) {
  router.push('/not-found')
}

const activate = ref(
  typeof route.params.activate === 'string' ? route.params.activate : 'calculator'
)

const pages: Array<{ value: string; [key: string]: string }> = [
  {
    value: 'home',
    'zh-CN': '首页',
    'en-US': 'Home',
    'ja-JP': 'ホーム',
    'zh-TW': '首頁',
    'fr-FR': 'Accueil'
  },
  {
    value: 'calculator',
    'zh-CN': '计算器',
    'en-US': 'Calculator',
    'ja-JP': '電卓',
    'zh-TW': '計算機',
    'fr-FR': 'Calculatrice'
  },
  {
    value: 'dictionary',
    'zh-CN': '词典',
    'en-US': 'Dictionary',
    'ja-JP': '辞書',
    'zh-TW': '字典',
    'fr-FR': 'Dictionnaire'
  },
  {
    value: 'translator',
    'zh-CN': '翻译',
    'en-US': 'Translator',
    'ja-JP': '翻訳',
    'zh-TW': '翻譯',
    'fr-FR': 'Traducteur'
  },
  {
    value: 'weather',
    'zh-CN': '天气',
    'en-US': 'Weather',
    'ja-JP': '天気',
    'zh-TW': '天氣',
    'fr-FR': 'Météo'
  },
  {
    value: 'gpt',
    'zh-CN': 'GPT',
    'en-US': 'GPT',
    'ja-JP': 'GPT',
    'zh-TW': 'GPT',
    'fr-FR': 'GPT'
  },
  {
    value: 'news',
    'zh-CN': '新闻',
    'en-US': 'News',
    'ja-JP': 'ニュース',
    'zh-TW': '新聞',
    'fr-FR': 'Nouvelles'
  }
]

const options = ref(
  pages.map((page) => ({
    label: page[locale.value],
    value: page.value
  }))
)

watch(locale, () => {
  options.value = pages.map((page) => ({
    label: page[locale.value],
    value: page.value
  }))
})

watch(activate, () => {
  router.push({ params: { activate: activate.value } })
})
</script>

<template>
  <div>
    <div class="p-8">
      <ElSegmented v-model="activate" :options="options" style="margin-bottom: 20px"></ElSegmented>
      <CalculatorPlugin v-if="activate === 'calculator'" />
      <DictionaryPlugin v-else-if="activate === 'dictionary'" />
      <TranslatorPlugin v-else-if="activate === 'translator'" />
    </div>
  </div>
</template>

<style scoped></style>
