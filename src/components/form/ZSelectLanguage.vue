<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import MdiTranslate from '@/icons/MdiTranslate.vue'
import { Chinese, English } from '@icon-park/vue-next'
import { type Component as VueComponent, ref } from 'vue'
import { ElButton, ElButtonGroup, ElPopover } from 'element-plus'
import { useUserStore } from '@/stores/user'

const { locale } = useI18n({
  useScope: 'global'
})
const user = useUserStore()

const props = defineProps<{
  placement: 'bottom' | 'right'
}>()

function setLanguage(language: string) {
  user.setLanguage(language)
  locale.value = language
}

const languages = ref<
  Array<{
    icon?: VueComponent
    display: string
    value: string
  }>
>([
  {
    icon: Chinese,
    display: '简体中文',
    value: 'zh-CN'
  },
  {
    icon: English,
    display: 'English',
    value: 'en-US'
  },
  {
    display: '繁體中文',
    value: 'zh-TW',
  },
  {
    display: '日本語',
    value: 'ja-JP',
  },
  {
    display: '한국어',
    value: 'ko-KR',
  },
  {
    display: 'Français',
    value: 'fr-FR'
  },
  {
    display: 'Русский',
    value: 'ru-RU',
  }
])
</script>

<template>
  <ElPopover :placement="props.placement" width="192px">
    <template #reference>
      <ElButton
        :icon="MdiTranslate"
        :size="props.placement === 'bottom' ? '' : 'large'"
        text
        circle
      />
    </template>
    <ElButtonGroup class="full">
      <div v-for="language in languages" :key="language.value">
        <ElButton
          :icon="language.icon"
          class="full"
          text
          :bg="user.language === language.value"
          @click="setLanguage(language.value)"
          :type="user.language === language.value ? 'primary' : ''"
        >
          {{ language.display }}
        </ElButton>
        <br />
      </div>
    </ElButtonGroup>
  </ElPopover>
</template>

<style scoped>
.full {
  width: 100%;
}
</style>
