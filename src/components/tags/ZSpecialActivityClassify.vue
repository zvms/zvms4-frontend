<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { toRefs } from 'vue'
import type { SpecialActivityClassification } from '@zvms/zvms4-types'
import { ZButtonTag } from '@/components'
import classifications from './classifications'

const { t } = useI18n()

const props = defineProps<{
  classify: SpecialActivityClassification
  size?: 'large' | 'default' | 'small'
  color?: boolean
  mode?: 'auto' | 'full' | 'icon'
  force?: 'full' | 'short'
}>()

const { classify, size } = toRefs(props)

const classifies = classifications.specials

const effective = classify?.value! in classifies
</script>

<template>
  <ZButtonTag
    :size="size ?? 'small'"
    :type="classifies[classify as SpecialActivityClassification].color"
    :icon="classifies[classify as SpecialActivityClassification].icon"
    :unknown="!effective"
    :force="force"
  >
    {{ t(`activity.special.classify.${classify}`) }}
  </ZButtonTag>
</template>
