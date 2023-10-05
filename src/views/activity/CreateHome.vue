<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ElCard, ElCol, ElRow, ElButton } from 'element-plus'

const emits = defineEmits(['move'])

function move(panel: string) {
  emits('move', panel)
}
</script>

<template>
  <div class="p-4" style="width: 100%">
    <p class="text-2xl py-6 px-4">创建义工</p>
    <ElRow>
      <ElCol :span="8">
        <div class="px-4">
          <ElCard shadow="hover">
            <p class="text-xl py-2 px-2">指定义工</p>
            <p class="py-2 px-2">
              指定义工是管理员创建的义工，以招募的形式发布，需要指定每个班可报名的最大人数。
            </p>
            <div style="text-align: right">
              <ElButton
                type="primary"
                :icon="ArrowRight"
                @click="move('specified')"
                text
                bg
                circle
              />
            </div>
          </ElCard>
        </div>
      </ElCol>
      <ElCol :span="8">
        <div class="px-4">
          <ElCard shadow="hover">
            <p class="text-xl py-2 px-2">特殊义工</p>
            <p class="py-2 px-2">
              特殊义工是管理员创建的义工，用于竞赛获奖，大型实践等场合。它的参与者无需填写感想。
            </p>
            <div style="text-align: right">
              <ElButton type="primary" :icon="ArrowRight" @click="move('special')" text bg circle />
            </div>
          </ElCard>
        </div>
      </ElCol>
      <ElCol :span="8">
        <div class="px-4">
          <ElCard shadow="hover">
            <p class="text-xl py-2 px-2">校外义工</p>
            <p class="py-2 px-2">校外义工是任何人都可以创建的义工，创建时必须指定所有参加者。</p>
            <div style="text-align: right">
              <ElButton
                type="primary"
                :icon="ArrowRight"
                @click="move('off-campus')"
                text
                bg
                circle
              />
            </div>
          </ElCard>
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>
