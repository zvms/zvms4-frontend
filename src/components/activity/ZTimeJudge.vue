<script setup lang="ts">
import { ElButton, ElIcon, ElStatistic, ElTooltip } from 'element-plus'
import { toRefs } from 'vue'
import { ref, watch } from 'vue'
import { CaretTop, CaretBottom, Warning } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import type { ActivityMember } from 'types/activity.v2'

const props = defineProps<{
  type: ActivityMember['mode']
  standardTime?: number
  realTime: number
}>()

const { type, realTime: real } = toRefs(props)

const { t } = useI18n()

const standard = ref(0)

function refreshStandardTime() {
  if (type.value === 'social-practice') {
    standard.value = 18
  } else if (type.value === 'on-campus') {
    standard.value = 25
  } else {
    standard.value = 15
  }
}

watch(
  type,
  () => {
    refreshStandardTime()
  },
  { immediate: true }
)

refreshStandardTime()

function calculateLoss() {
  const loss = standard.value - real.value
  if (loss > 0) {
    return {
      icon: CaretBottom,
      class: 'lower',
      text: `还差`,
      loss: loss
    }
  } else {
    return {
      icon: CaretTop,
      class: 'upper',
      text: `超出`,
      loss: -loss
    }
  }
}
</script>

<template>
  <ElStatistic :value="real" :precision="1">
    <template #title>
      <span style="display: inline-flex; align-items: center">
        {{ t(`activity.mode.${type}.name`) }}
        <ElTooltip
          effect="light"
          :content="
            t('home.panels.time.least', {
              type: t(`activity.mode.${type}.name`),
              least: standard
            })
          "
          ><ElButton text bg circle size="small" :icon="Warning"
        /></ElTooltip>
      </span>
    </template>
    <template #suffix>
      <div class="footer-item">
        <span style="font-family: 12px">{{ t('home.panels.time.unit', real) }}</span
        >&nbsp;
        <span :class="calculateLoss().class">
          <span>{{ calculateLoss().loss.toFixed(1) }}</span>
          <ElIcon style="font-size: 9px"><Component :is="calculateLoss().icon" /></ElIcon>
        </span>
      </div>
    </template>
  </ElStatistic>
</template>

<style scoped>
.upper {
  color: var(--el-color-success);
}

.upper span:first-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.lower {
  color: var(--el-color-error);
}

.lower span:first-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.footer-item {
  font-size: 12px !important;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  color: var(--el-text-color-regular);
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:first-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}
</style>
