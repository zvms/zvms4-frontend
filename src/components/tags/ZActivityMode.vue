<script lang="ts" setup>
import type { Activity, ActivityMember } from '@/../types/v2'
import { Vacation, School, CityGate, Star } from '@icon-park/vue-next'
import type { Component as VueComponent } from 'vue'
import { ZButtonTag } from '@/components'
import { useI18n } from 'vue-i18n'
import { onMounted, ref, toRefs, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElPopover, ElProgress, ElRow, ElCol } from 'element-plus'
import api from '@/api'

const { t } = useI18n()
const user = useUserStore()

const targetsOfDuration = {
  'on-campus': 25,
  'off-campus': 15,
  'social-practice': 18
}

const props = withDefaults(
  defineProps<{
    mode?: Activity['type']
    size?: 'large' | 'default' | 'small'
    force?: 'full' | 'short'
    bg?: boolean
    showMyDuration?: boolean
    showProperties?: boolean
  }>(),
  {
    size: 'small',
    bg: true,
    showMyDuration: false,
    showProperties: false
  }
)

const timeOfMine = ref({
  'on-campus': user.time.onCampus,
  'off-campus': user.time.offCampus,
  'social-practice': user.time.socialPractice
})
const loading = ref(false)

async function getTimeOfMine() {
  loading.value = true
  const response = await api.user.time.read(user._id)
  const percentage = await api.user.time.percentile(user._id)
  timeOfMine.value = response
  loading.value = false
}

onMounted(() => {
  getTimeOfMine()
})

const { mode, size, force, bg, showMyDuration, showProperties } = toRefs(props)

const percentOfMine = ref(
  mode?.value
    ? mode.value !== 'hybrid'
      ? Math.floor((timeOfMine.value[mode?.value] / targetsOfDuration[mode?.value]) * 100)
      : 0
    : 0
)

watch(timeOfMine, (newVal) => {
  percentOfMine.value = mode?.value
    ? mode.value !== 'hybrid'
      ? Math.floor((newVal[mode?.value] / targetsOfDuration[mode?.value]) * 100)
      : 0
    : 0

  if (percentOfMine.value > 100) {
    percentOfMine.value = 100
  }
})

watch(mode, (newVal) => {
  percentOfMine.value = newVal !== 'hybrid'
    ? Math.floor((timeOfMine.value[newVal] / targetsOfDuration[newVal]) * 100)
    : 0

  if (percentOfMine.value > 100) {
    percentOfMine.value = 100
  }
})

const modes: Record<
  Activity['type'],
  {
    icon: VueComponent
    color: 'primary' | 'warning' | 'success' | 'danger'
  }
> = {
  'on-campus': {
    icon: School,
    color: 'primary'
  },
  'off-campus': {
    icon: CityGate,
    color: 'success'
  },
  'social-practice': {
    icon: Vacation,
    color: 'warning'
  },
  hybrid: {
    icon: Star,
    color: 'danger'
  }
}
</script>

<template>
  <ElPopover
    :title="t(`activity.mode.${mode}.name`)"
    :width="160"
    :trigger="showMyDuration || showProperties ? 'hover' : 'contextmenu'"
    v-if="mode !== 'hybrid'"
  >
    <template #reference>
      <ZButtonTag
        :size="size ?? 'small'"
        :type="modes[mode].color"
        :icon="modes[mode].icon"
        :unknown="!mode || !(mode in modes)"
        :force="force"
        :bg="bg"
      >
        {{ t(`activity.mode.${mode}.short`) }}
      </ZButtonTag>
    </template>
    <ElRow>
      <ElCol :span="24" class="py-1" v-if="showMyDuration && mode">
        <ElProgress
          type="dashboard"
          :percentage="percentOfMine"
          :status="percentOfMine >= 100 ? 'success' : ''"
        >
          <p class="text-2xl">{{ percentOfMine }}%</p>
          <p v-if="timeOfMine[mode] < targetsOfDuration[mode]" class="text-sm">
            {{ timeOfMine[mode] }} h / {{ targetsOfDuration[mode] }} h
          </p>
          <p v-else>{{ timeOfMine[mode] }} h</p>
        </ElProgress>
      </ElCol>
    </ElRow>
  </ElPopover>
  <ZButtonTag v-else :size="size ?? 'small'" type="danger" :icon="Star" :force="force" :bg="bg">
    {{ t(`activity.mode.hybrid.short`) }}
  </ZButtonTag>
</template>
