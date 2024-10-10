<script setup lang="ts">
import { ZActivityList } from '.'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCard,
  ElRadio,
  ElRadioGroup,
  ElAlert,
  ElSwitch,
  ElScrollbar
} from 'element-plus'
import { ref, reactive, watch } from 'vue'
import type { ActivityType, ActivityInstance } from '@zvms/zvms4-types'
import { useI18n } from 'vue-i18n'
import api from '@/api'
import { useWindowSize } from '@vueuse/core'
import { useUserStore } from '@/stores/user.ts'

const { t } = useI18n()
const user = useUserStore()
const { height } = useWindowSize()

const typesOfActivity = ref<ActivityType[]>(['specified', 'social', 'scale'])


const tableMaxHeight = ref(height.value * 0.56)

watch(height, () => {
  tableMaxHeight.value = height.value * 0.56
})

const mergeForm = reactive({
  name: '',
  type: '' as unknown as ActivityType,
  list: [] as ActivityInstance[]
})

const overwriteTime = ref(false)

function updateStatus(percent: number, message: string) {
  // WHO KNOWS WHAT AM I DOING?
  void percent
  void message.length
}

async function mergeActivity() {
  await api.activity.merge(mergeForm.list, mergeForm.name, {
      duplicateUser: overwriteTime.value ? 'overwrite' : 'add'
    },
    user._id, updateStatus
  )
}
</script>

<template>
  <div class="p-12">
    <ElCard shadow="never">
      <p class="text-xl">Merge Activity</p>
      <ElForm class="px-2">

        <ElScrollbar ElScrollbar :height="tableMaxHeight + 'px'">
          <ElFormItem label="Name">
            <ElInput v-model="mergeForm.name" class="w-full" />
          </ElFormItem>
          <ElFormItem label="Type">
            <ElRadioGroup v-model="mergeForm.type">
              <ElRadio v-for="type in typesOfActivity" border :key="type" :value="type"
                       :label="t('activity.type.' + type + '.short')"></ElRadio>
            </ElRadioGroup>
          </ElFormItem>
          <ElFormItem label="List">
            <ElAlert title="NOTE: Only activities that is the same type and is effective can be merged. You also need to ensure them in a same page,
            otherwise the system will only merge the activities in the same page." show-icon type="info" class="mb-4"
                     :closable="false" />
            <ZActivityList :select-target="mergeForm.type" v-model="mergeForm.list" class="w-full" role="campus" />
          </ElFormItem>
          <ElFormItem label="Overwrite">
            <ElSwitch v-model="overwriteTime" active-text="Yes" inactive-text="No" />
          </ElFormItem>
        </ElScrollbar>
        <ElFormItem>
          <div style="text-align: right">
            <ElButton text bg type="primary" @click="mergeActivity">Merge</ElButton>
          </div>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>

<style scoped>

</style>
