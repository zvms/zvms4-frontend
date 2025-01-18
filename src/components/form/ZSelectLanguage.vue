<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import MdiTranslate from '@/icons/MdiTranslate.vue'
import { Chinese, English } from '@icon-park/vue-next'
import { type Component as VueComponent, ref, toRefs } from 'vue'
import { ElButton, ElButtonGroup, ElOption, ElPopover, ElSelect } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import { pad } from '@/plugins/ua'

const { locale } = useI18n({
  useScope: 'global'
})
const user = useUserStore()

const props = defineProps<{
  placement: 'bottom' | 'right'
  type: 'button' | 'select'
  withText?: boolean
}>()

const { placement, type, withText } = toRefs(props)

function setLanguage(language: string) {
  user.setLanguage(language)
  locale.value = language
}

const languages = ref<
  Array<{
    icon?: VueComponent
    display: string
    value: string
    disabled?: boolean
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
    display: '文言',
    value: 'zh-WY',
    disabled: true
  },
  {
    display: '繁體中文',
    value: 'zh-TW',
    disabled: pad() && !user.position.includes('admin')
  },
  {
    display: '日本語',
    value: 'ja-JP',
    disabled: pad() && !user.position.includes('admin')
  },
  {
    display: 'Français',
    value: 'fr-FR',
    disabled: pad() && !user.position.includes('admin')
  }
])

onMounted(() => {
  locale.value = user.language
})
</script>

<template>
  <ElPopover :placement="placement" width="192px" v-if="type === 'button'">
    <template #reference>
      <ElButton
        v-if="!withText"
        :icon="MdiTranslate"
        :size="props.placement === 'bottom' ? '' : 'large'"
        text
        circle
      />
      <ElButton
        v-if="!withText"
        type="primary"
        :icon="MdiTranslate"
        :size="props.placement === 'bottom' ? '' : 'large'"
        text
      >
        {{ locale }}
      </ElButton>
    </template>
    <ElButtonGroup class="full">
      <div v-for="language in languages" :key="language.value" class="m-1">
        <ElButton
          :icon="language.icon"
          class="full"
          text
          v-if="!language.disabled"
          :disabled="language.disabled"
          :bg="user.language === language.value"
          @click="setLanguage(language.value)"
          :type="user.language === language.value ? 'primary' : ''"
        >
          {{ language.display }}
        </ElButton>
      </div>
    </ElButtonGroup>
  </ElPopover>
  <ElSelect v-else-if="type === 'select'" v-model="user.language" @change="setLanguage">
    <ElOption
      v-for="language in languages"
      :disabled="language.disabled"
      :key="language.value"
      :label="language.display"
      :value="language.value"
    />
  </ElSelect>
</template>

<style scoped>
.full {
  width: 100%;
}
</style>
