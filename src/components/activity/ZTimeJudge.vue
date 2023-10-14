<script setup lang="ts">
import { ElButton, ElIcon, ElStatistic, ElTooltip } from 'element-plus'
import { toRefs } from 'vue'
import { ref } from 'vue'
import { CaretTop, CaretBottom, Warning } from '@element-plus/icons-vue'

const props = defineProps<{
  type: 'largeScale' | 'onCampus' | 'offCampus'
  standardTime?: number
  realTime: number
}>()

const { type, realTime: real } = toRefs(props)

const standard = ref(0)

if (!standard?.value || isNaN(standard?.value)) {
  if (type.value === 'largeScale') {
    standard.value = 18
  } else if (type.value === 'onCampus') {
    standard.value = 30
  } else {
    standard.value = 15
  }
} else {
  standard.value = props.standardTime as number
}

const titles = {
  largeScale: '大型实践时间',
  onCampus: '校内义工时间',
  offCampus: '校外义工时间'
}

function calculateLoss() {
  const loss = standard.value - real.value
  if (loss > 0) {
    return {
      icon: CaretBottom,
      class: 'lower',
      text: `距离标准还差`,
      loss: loss
    }
  } else {
    return {
      icon: CaretTop,
      class: 'upper',
      text: `超出标准`,
      loss: -loss
    }
  }
}
</script>

<template>
  <ElStatistic :value="real">
    <template #title>
      <span style="display: inline-flex; align-items: center">
        {{ titles[type] }}
        <ElTooltip effect="light" :content="`${titles[type]}时长至少为 ${standard} 小时`"
          ><ElButton text bg circle size="small" :icon="Warning"
        /></ElTooltip>
      </span>
    </template>
    <template #suffix>
      <div class="footer-item">
        <span style="font-family: 12px">小时</span>&nbsp;
        <span :class="calculateLoss().class">
          <span>{{ calculateLoss().loss }}</span>
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