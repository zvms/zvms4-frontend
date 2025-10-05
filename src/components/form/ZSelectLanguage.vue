<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import MdiTranslate from '@/icons/MdiTranslate.vue'
import { Chinese, English } from '@icon-park/vue-next'
import { type Component as VueComponent, ref, toRefs } from 'vue'
import { ElButton, ElButtonGroup, ElOption, ElPopover, ElSelect } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

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
        v-if="withText"
        type="primary"
        :icon="MdiTranslate"
        :size="props.placement === 'bottom' ? '' : ''"
        text
        bg
      >
        {{ languages.find(x => x.value === locale)?.display }}
      </ElButton>
    </template>
    <ElButtonGroup class="full">
      <div v-for="language in languages" :key="language.value" class="m-1">
        <ElButton
          :icon="language.icon"
          class="full"
          text
          v-if="!language.disabled"
          :bg="user.language === language.value"
          @click="setLanguage(language.value)"
          :type="user.language === language.value ? 'primary' : ''"
        >
          {{ language.display }}
        </ElButton>
      </div>
    </ElButtonGroup>
  </ElPopover>
  <ElSelect v-else-if="type === 'select'" v-model="user.language" @change="setLanguage" style="width: 128px">
    <ElOption
      v-for="language in languages.filter(x => !x.disabled)"
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
