<script lang="ts" setup>
import type {
  ActivityInstance,
  Activity,
} from '@/../types'
import { reactive } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import {
  ElFormItem,
  ElForm,
  ElInput,
  ElScrollbar,
  ElCard,
  ElUpload, ElNotification
} from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { watch, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { baseURL } from '@/plugins/axios'

const { t } = useI18n()
const { height } = useWindowSize()
const router = useRouter()
const userStore = useUserStore()

const activity = reactive<ActivityInstance | Activity>({
  _id: '',
  type: 'special',
  name: '',
  description: '',
  members: [],
  date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  creator: userStore._id,
  status: 'effective',
  approver: ''
})

const token = localStorage.getItem('token')

const scrollableCardHeight = ref((height.value - 64) * 0.6)

watch(height, () => {
  scrollableCardHeight.value = (height.value - 64) * 0.6
})

async function jump() {
  await router.push('/activities/campus')
}

async function handleError(err: Error) {
  ElNotification(err.message)
}
</script>

<template>
  <div class="px-6 py-3">
    <div class="p-4">
      <ElCard shadow="hover" class="full">
        <ElForm label-position="right" label-width="108px" :model="activity">
          <ElScrollbar :height="scrollableCardHeight + 'px'">
            <ElFormItem
              prop="name"
              :label="t('activity.form.name')"
              required
              :rules="[{ required: true, message: t('validation.create.name.required') }]"
            >
              <ElInput v-model="activity.name" />
            </ElFormItem>
            <ElFormItem :label="t('activity.form.description')">
              <ElInput v-model="activity.description" type="textarea" :autosize="{ minRows: 2 }" />
            </ElFormItem>
            <ElFormItem label="Upload" required class="w-full">
              <ElUpload
                class="w-full"
                drag
                :disabled="activity.name === ''"
                :action="baseURL + `activity/upload?name=${activity.name}&desc=${activity.description}`"
                multiple
                :headers="{
                  Authorization: `Bearer ${token}`
                }"
                with-credentials
                name="payload"
                :data="{
                  name: activity.name,
                  desc: activity.description
                }"
                :limit="1"
                :on-success="jump"
                :on-error="handleError"
              >
                <ElIcon class="el-icon--upload">
                  <UploadFilled />
                </ElIcon>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                <template #tip>
                  <div class="el-upload__tip">xls/xlsx files with a size less than 2 MB.</div>
                </template>
              </ElUpload>
            </ElFormItem>
          </ElScrollbar>
        </ElForm>
      </ElCard>
    </div>
  </div>
</template>

<style scoped>
.full {
  width: 100%;
}

.actions {
  text-align: right;
  right: 0;
}
</style>
