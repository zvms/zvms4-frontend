<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ElCard, ElCol, ElRow, ElButton, ElDivider } from 'element-plus'
import { Appointment, Star, Association } from '@icon-park/vue-next'
import { reactive } from 'vue';

const emits = defineEmits(['move'])

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
    <p class="text-2xl py-2 px-4">创建义工</p>
    <ElRow>
      <ElCol :span="8">
        <div class="px-4">
          <ElCard shadow="hover" @mouseover="useHover('specified').enter" @mouseleave="useHover('specified').leave">
            <p class="text-xl py-2 px-2">
              <ElButton type="info" :icon="Appointment" text bg circle />
              <ElDivider direction="vertical" />指定义工
            </p>
            <p class="py-2 px-2">
              指定义工是管理员创建的义工，以招募的形式发布，需指定每个班可报名的最大人数。
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
              ><span v-if="hovers.specified">创建</span></ElButton>
            </div>
          </ElCard>
        </div>
      </ElCol>
      <ElCol :span="8">
        <div class="px-4">
          <ElCard shadow="hover" @mouseover="useHover('special').enter" @mouseleave="useHover('special').leave">
            <p class="text-xl py-2 px-2">
              <ElButton type="info" :icon="Star" text bg circle />
              <ElDivider direction="vertical" />特殊义工
            </p>
            <p class="py-2 px-2">
              特殊义工是管理员创建的义工，用于竞赛获奖，大型实践等场合。参与者无需填写感想。
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
              ><span v-if="hovers.special">创建</span></ElButton>
            </div>
          </ElCard>
        </div>
      </ElCol>
      <ElCol :span="8">
        <div class="px-4">
          <ElCard shadow="hover" @mouseover="useHover('offCampus').enter" @mouseleave="useHover('offCampus').leave">
            <p class="text-xl py-2 px-2">
              <ElButton type="info" :icon="Association" text bg circle />
              <ElDivider direction="vertical" />校外义工
            </p>
            <p class="py-2 px-2">校外义工是任何人都可以创建的义工，创建时必须指定所有参加者。</p>
            <div style="text-align: right">
              <ElButton
                type="primary"
                :icon="ArrowRight"
                @click="move('off-campus')"
                text
                :bg="hovers.offCampus"
                :circle="!hovers.offCampus"
                :round="hovers.offCampus"
              ><span v-if="hovers.offCampus">创建</span></ElButton>
            </div>
          </ElCard>
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>
