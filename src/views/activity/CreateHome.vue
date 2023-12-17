<!-- Warning: this component is useless!! Please look at CreateActivity.vue -->

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ElCard, ElCol, ElRow, ElButton, ElDivider } from 'element-plus'
import { Appointment, Star, Association } from '@icon-park/vue-next'
import { reactive, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const emits = defineEmits<{
  (e: 'move', value: string): void
}>()

const { width, height } = useWindowSize()
const { t } = useI18n()

const span = ref(width.value < height.value ? 24 : 8)

function move(panel: string) {
  emits('move', panel)
}

const hovers = reactive({
  special: false,
  specified: false,
  offCampus: false
})

function useHover(item: 'special' | 'specified' | 'offCampus') {
  return {
    enter: () => {
      hovers.special = item === 'special'
      hovers.specified = item === 'specified'
      hovers.offCampus = item === 'offCampus'
    },
    leave: () => {
      hovers.special = false
      hovers.specified = false
      hovers.offCampus = false
    }
  }
}
</script>

<template>
  <div class="px-8 py-2" style="width: 100%">
    <p class="text-2xl py-2 px-4">{{ t('nav.create') }}</p>
    <ElRow>
      <ElCol :span="span">
        <div class="px-4 py-2">
          <ElCard
            shadow="hover"
            @mouseover="useHover('specified').enter"
            @mouseleave="useHover('specified').leave"
          >
            <p class="text-xl py-2 px-2">
              <ElButton type="info" :icon="Appointment" text bg circle />
              <ElDivider direction="vertical" />{{ t('activity.columns.types.specified') }}
            </p>
            <p class="py-2 px-2">
              {{ t('activity.columns.explanations.specified') }}
            </p>
            <div style="text-align: right">
              <ElButton
                type="primary"
                :icon="ArrowRight"
                @click="move('specified')"
                text
                :bg="hovers.specified"
                :circle="!hovers.specified"
                :round="hovers.specified"
                ><span v-if="hovers.specified">{{
                  t('activity.columns.actions.create')
                }}</span></ElButton
              >
            </div>
          </ElCard>
        </div>
      </ElCol>
      <ElCol :span="span">
        <div class="px-4 py-2">
          <ElCard
            shadow="hover"
            @mouseover="useHover('special').enter"
            @mouseleave="useHover('special').leave"
          >
            <p class="text-xl py-2 px-2">
              <ElButton type="info" :icon="Star" text bg circle />
              <ElDivider direction="vertical" />{{ t('activity.columns.types.special') }}
            </p>
            <p class="py-2 px-2">
              {{ t('activity.columns.explanations.special') }}
            </p>
            <div style="text-align: right">
              <ElButton
                type="primary"
                :icon="ArrowRight"
                @click="move('special')"
                text
                :bg="hovers.special"
                :circle="!hovers.special"
                :round="hovers.special"
                ><span v-if="hovers.special">{{
                  t('activity.columns.actions.create')
                }}</span></ElButton
              >
            </div>
          </ElCard>
        </div>
      </ElCol>
      <ElCol :span="span">
        <div class="px-4 py-2">
          <ElCard
            shadow="hover"
            @mouseover="useHover('offCampus').enter"
            @mouseleave="useHover('offCampus').leave"
          >
            <p class="text-xl py-2 px-2">
              <ElButton type="info" :icon="Association" text bg circle />
              <ElDivider direction="vertical" />{{ t('activity.columns.types.off-campus') }}
            </p>
            <p class="py-2 px-2">{{ t('activity.columns.explanations.off-campus') }}</p>
            <div style="text-align: right">
              <ElButton
                type="primary"
                :icon="ArrowRight"
                @click="move('off-campus')"
                text
                :bg="hovers.offCampus"
                :circle="!hovers.offCampus"
                :round="hovers.offCampus"
                ><span v-if="hovers.offCampus">{{
                  t('activity.columns.actions.create')
                }}</span></ElButton
              >
            </div>
          </ElCard>
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>
