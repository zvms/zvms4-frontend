<script lang="ts" setup>
import { positions } from '@/icons/positions'
import type { UserPosition } from '@/../@types/user'
import { toRefs, type Component as VueComponent } from 'vue'
import { ElButton, ElButtonGroup } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ position: UserPosition[]; group?: boolean }>()

const { position, group } = toRefs(props)
const { t } = useI18n()

const positionList = Object.entries(positions).map(([key, value]) => ({ name: key, ...value })) as {
  name: UserPosition
  icon: VueComponent
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}[]
</script>

<template>
  <ElButtonGroup v-if="group">
    <ElButton
      v-for="item in positionList.filter((item) => position.includes(item.name))"
      :key="item.name"
      :type="item.color"
      :icon="item.icon"
      text
      round
      bg
      size="small"
    >
      {{ t('home.positions.' + item.name) }}
    </ElButton>
  </ElButtonGroup>
  <div v-else>
    <ElButton
      v-for="item in positionList.filter((item) => position.includes(item.name))"
      :key="item.name"
      :type="item.color"
      class="px-2"
      :icon="item.icon"
      text
      round
      bg
      size="small"
    >
      {{ t('home.positions.' + item.name) }}
    </ElButton>
  </div>
</template>
