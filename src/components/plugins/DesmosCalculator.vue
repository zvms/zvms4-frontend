<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { ElDialog, ElButton, ElLoading } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { width, height } = useWindowSize()
const { t, locale } = useI18n()

function integrateDesmos() {
  // 1. Load the Desmos library
  return new Promise((resolve, reject) =>
    document.head.appendChild(
      Object.assign(document.createElement('script'), {
        src: `https://www.desmos.com/api/v1.6/calculator.js?apiKey=${
          import.meta.env.VITE_DESMOS_API_KEY
        }&lang=all`,
        onload: resolve
      })
    )
  )
}

const calculatorWidth = ref(Math.floor(width.value * 0.9) + 'px')
const calculatorHeight = ref(Math.floor(height.value * 0.6) + 'px')

watch(width, () => (calculatorWidth.value = Math.floor(width.value * 0.9) + 'px'))
watch(height, () => (calculatorHeight.value = Math.floor(height.value * 0.6) + 'px'))

const calculator = ref<Desmos.Calculator>()

onMounted(async () => {
  const loading = ElLoading.service({ fullscreen: true, text: 'Loading Desmos Calculator...' })
  await integrateDesmos()
  loading.close()
  // 2. Initialize the Desmos calculator
  const element = document.getElementById('calculator')
  if (!element) return
  calculator.value = Desmos.GraphingCalculator(element)
  calculator.value.updateSettings({
    language: locale.value.startsWith('zh') ? locale.value : locale.value.split('-')[0]
  })
})

watch(locale, () => {
  calculator.value?.updateSettings({
    language: locale.value.startsWith('zh') ? locale.value : locale.value.split('-')[0]
  })
})

const image = ref('')

const screenshotOpen = ref(false)

function screenshot() {
  // 3. Take a screenshot of the Desmos calculator
  image.value = calculator.value?.screenshot() ?? ''
  screenshotOpen.value = true
}
</script>

<template>
  <div>
    <div style="text-align: right">
      <ElButton text bg type="primary" @click="screenshot"> Screenshot </ElButton>
    </div>
    <div
      id="calculator"
      class="my-2"
      :style="{ width: calculatorWidth, height: calculatorHeight }"
    ></div>
    <ElDialog v-model="screenshotOpen" title="Screenshot" width="80%">
      <img :src="image" alt="Desmos calculator screenshot" />
    </ElDialog>
    <p class="text-gray-500 text-center pt-6 text-sm">
      Desmos is not open source, but has given me permission to use it in this project. To use
      Desmos in your own project, please reach out to partnerships@desmos.com.
    </p>
  </div>
</template>

<style scoped></style>
