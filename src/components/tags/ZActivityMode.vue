<script lang="ts" setup>
import type { ActivityMode } from '@/../types'
import { Vacation, School, CityGate } from '@icon-park/vue-next'
import type { Component as VueComponent } from 'vue'
import { ZButtonTag } from '@/components'
import { useI18n } from 'vue-i18n'
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElPopover, ElProgress, ElRow, ElCol } from 'element-plus'

const { t } = useI18n()
const user = useUserStore()

const targetsOfDuration = {
  'on-campus': 30,
  'off-campus': 15,
  'social-practice': 18
}

const props = withDefaults(
  defineProps<{
    mode?: ActivityMode
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

const timeOfMine = {
  'on-campus': user.time.onCampus,
  'off-campus': user.time.offCampus,
  'social-practice': user.time.socialPractice
}

const { mode, size, force, bg, showMyDuration, showProperties } = toRefs(props)

const percentOfMine = ref(
  mode?.value ? Math.floor((timeOfMine[mode?.value] / targetsOfDuration[mode?.value]) * 100) : 0
)

if (percentOfMine.value > 100) {
  percentOfMine.value = 100
}

const modes: Record<
  ActivityMode,
  {
    icon: VueComponent
    color: 'primary' | 'warning' | 'success'
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
  }
}
</script>

<template>
  <ElPopover
    :title="t(`activity.mode.${mode}.name`)"
    :width="384"
    :trigger="showMyDuration || showProperties ? 'hover' : 'contextmenu'"
  >
    <template #reference>
      <ZButtonTag
        :size="size ?? 'small'"
        :type="modes[mode as ActivityMode].color"
        :icon="modes[mode as ActivityMode].icon"
        :unknown="!mode || !(mode in modes)"
        :force="force"
        :bg="bg"
      >
        {{ t(`activity.mode.${mode}.short`) }}
      </ZButtonTag>
    </template>
    <ElRow>
      <ElCol :span="14" class="py-4" v-if="showProperties">
        {{ t(`claim.activityMember.mode.${mode}`) }}
      </ElCol>
      <ElCol :span="10" class="py-1" v-if="showMyDuration && mode">
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
</template>
