<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Data, Other } from '@icon-park/vue-next'
import { ref, toRefs, type Component as VueComponent } from 'vue'
import type { SpecialActivityClassification } from '@/../@types/activity'
import { ZButtonTag } from '@/components'
import { Minus, Trophy, User } from '@element-plus/icons-vue'

const { t } = useI18n()

const props = defineProps<{
  classify: SpecialActivityClassification
  size?: 'large' | 'default' | 'small'
  color?: boolean
  mode?: 'auto' | 'full' | 'icon'
}>()

const { classify, size } = toRefs(props)

const classifies = ref<
  Record<SpecialActivityClassification, {
    color: 'primary' | 'warning' | 'success' | 'danger' | 'info';
    icon: VueComponent
  }>
>({
  prize: {
    color: 'success',
    icon: Trophy
  },
  import: {
    color: 'warning',
    icon: Data
  },
  club: {
    color: 'primary',
    icon: User
  },
  deduction: {
    color: 'danger',
    icon: Minus
  },
  other: {
    color: 'info',
    icon: Other
  }
})

const effective = classify?.value! in classifies.value
</script>

<template>
  <ZButtonTag
    :size="size ?? 'small'"
    :type="classifies[classify as SpecialActivityClassification].color"
    :icon="classifies[classify as SpecialActivityClassification].icon"
    :unknown="!effective"
  >
    {{ t(`activity.special.classify.${classify}`) }}
  </ZButtonTag>
</template>
