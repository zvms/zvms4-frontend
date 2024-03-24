<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import {
  ArrowRight,
  Close,
  Check,
  Delete,
  ZoomIn,
  Download,
  Plus,
  User
} from '@element-plus/icons-vue'
import { ImageFiles, Save } from '@icon-park/vue-next'
import type {
  ActivityMember,
  ActivityInstance,
  MemberActivityStatus,
  Response
} from '@zvms/zvms4-types'
import {
  ElCollapse,
  ElCollapseItem,
  ElInput,
  ElButton,
  ElCard,
  ElRow,
  ElCol,
  ElPagination,
  ElPopconfirm,
  ElForm,
  ElFormItem,
  ElDivider,
  ElUpload,
  ElImage,
  ElEmpty,
  ElIcon,
  ElNotification,
  type UploadUserFile,
  ElDialog,
  ElScrollbar
} from 'element-plus'
import { useI18n } from 'vue-i18n'
import { ZActivityMember, ZActivityDetails, ZActivityStatus } from '@/components'
import api from '@/api'
import { baseURL } from '@/plugins/axios'
import { useWindowSize } from '@vueuse/core'

const props = defineProps<{
  activity: ActivityInstance
  role: 'mine' | 'campus' | 'class'
}>()

const user = useUserStore()
const { t } = useI18n()
const { height } = useWindowSize()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'finish'): void
}>()

const { activity, role } = toRefs(props)

const impression = ref('')
const myimages = ref<UploadUserFile[]>([])
const present = ref<ActivityMember>()
const preview = ref(false)
const previewUrl = ref('')
const activeNames = ref<string[]>(['1', '2'])
const submitable = ref<boolean>(role.value !== 'class')

const load = ref<'draft' | 'pending' | 'refused' | 'rejected' | 'effective' | false>(false)

async function submit(submit: boolean) {
  try {
    emits('update:modelValue', impression.value)
    load.value = submit ? 'pending' : 'draft'
    if (
      !submitable.value ||
      (present.value?.status !== 'draft' && present.value?.status !== 'rejected')
    ) {
      load.value = false
      return
    }
    await api.activity.impression.modify(user._id, activity.value._id, impression.value, submit)
    emits('finish')
    load.value = false
  } catch (e) {
    ElNotification({
      title: t('activity.impression.page.write.error'),
      message: (e as Error).message,
      type: 'error'
    })
  }
}

async function reflect(status: 'effective' | 'rejected' | 'refused') {
  try {
    load.value = status
    await api.activity.status.modify(current.value._id, activity.value._id, status)
    load.value = false
    if (current.value && current.value.index < activity.value.members.length) {
      curserTo(current.value.index + 1)
    } else {
      emits('finish')
    }
  } catch (e) {
    ElNotification({
      title: t('activity.impression.page.reflect.error'),
      message: (e as Error).message,
      type: 'error'
    })
  }
}

interface ImpressionCursor {
  index: number
  id: number
  name: string
  impression: string
  _id: string
  duration: number
  status: MemberActivityStatus
  images: UploadUserFile[]
}

const current = ref<ImpressionCursor>({
  index: 0,
  id: 0,
  name: '',
  impression: '',
  _id: '',
  duration: 0,
  status: 'pending',
  images: []
})
const loading = ref(false)

async function getMemberActivity(id: string = user._id) {
  loading.value = true
  try {
    present.value = await api.activity.member.read(activity.value._id, id)
    console.log('[DEBUG] present')
    console.log(present.value)
    if (!present.value) {
      throw new Error('No such member')
    }
    if (role.value === 'mine') {
      impression.value = present.value?.impression
      let imglist = present.value?.images.map((x) => `${baseURL}image/${x}/data`) ?? []
      myimages.value.push(...imglist.map((image) => ({ name: image, url: image })))
      current.value.images = myimages.value
      console.log('[DEBUG] myimages')
      console.log(myimages.value)
    }
  } catch (e) {
    ElNotification({
      title: t('activity.impression.page.reflect.error'),
      message: (e as Error).message,
      type: 'error'
    })
  }
  loading.value = false
}

async function curserTo(index: number) {
  loading.value = true
  try {
    present.value =
      (await api.activity.member.read(activity.value._id, activity.value.members[index - 1]._id)) ??
      activity.value.members[index - 1]
    const result = await api.user.readOne(present.value._id)
    const images =
      present.value?.images.map((x) => ({ name: x, url: `${baseURL}image/${x}/data` })) ?? []
    console.log('[DEBUG] images')
    console.log(images)
    current.value = {
      index,
      id: result?.id ?? 0,
      name: result?.name ? result?.name : 'Unknown',
      impression: present.value.impression,
      _id: present.value._id,
      duration: present.value.duration ?? 0,
      status: present.value.status,
      images: images
    }
  } catch (e) {
    ElNotification({
      title: t('activity.impression.page.reflect.error'),
      message: (e as Error).message,
      type: 'error'
    })
  }
  loading.value = false
}

if (role.value !== 'mine') {
  curserTo(1)
} else {
  getMemberActivity()
}

const serif = ref(false)

function handleSuccess(resp: Response<string>) {
  if ('data' in resp) {
    console.log(resp)
    api.activity.image.insert(activity.value._id, present.value?._id ?? user._id, resp.data)
  } else {
    console.error('Unexpected response structure:', resp)
  }
}

function getUserToken() {
  return localStorage.getItem('token')
}
</script>

<template>
  <div class="dialog">
    <ElCollapse v-model="activeNames" class="py-4">
      <ElCollapseItem :title="t('activity.form.details')" name="1">
        <ZActivityDetails
          :activity="activity"
          :mode="activity.members.map((x) => x._id).includes(current._id) ? 'mine' : 'campus'"
          :perspective="role === 'mine' ? user._id : current._id ?? user._id"
          :show-details="false"
        />
      </ElCollapseItem>
      <ElCollapseItem :title="t('activity.form.impression')" name="2">
        <ElCard v-if="role === 'mine'" shadow="hover">
          <p class="text-xl py-2">{{ t('activity.impression.page.write.mine') }}</p>
          <ElInput
            type="textarea"
            v-if="present?.status === 'draft' || present?.status === 'rejected'"
            v-model="impression"
            :autosize="{ minRows: 2 }"
            minlength="30"
            maxlength="1024"
            show-word-limit
          />
          <p v-else :class="['px-4', `font-${serif ? 'serif' : 'sans'}`, 'py-4', 'text-lg']">
            {{ impression }}
          </p>
          <div
            v-if="present?.status === 'draft' || present?.status === 'rejected'"
            style="text-align: right"
            class="py-4"
          >
            <ElButton
              type="info"
              @click="submit(false)"
              text
              bg
              :icon="Save"
              :loading="load === 'draft'"
            >
              {{ t('activity.impression.page.write.actions.save') }}
            </ElButton>
            <ElButton
              type="primary"
              @click="submit(true)"
              :disabled="impression.length < 30"
              text
              bg
              :icon="ArrowRight"
              :loading="load === 'pending'"
            >
              {{ t('activity.impression.page.write.actions.submit') }}
            </ElButton>
          </div>
        </ElCard>
        <ElCard shadow="hover" v-loading="loading" v-else>
          <p class="text-xl py-2">
            <ElRow>
              <ElCol :span="18">
                {{ t('activity.impression.page.reflect.prompt', { name: current?.name }) }}
                <ZActivityStatus force="full" class="px-1" :type="current?.status" />
              </ElCol>
              <ElCol :span="6" style="text-align: right">
                <ZActivityMember v-if="!loading" :id="current?._id" :icon="User" />
              </ElCol>
            </ElRow>
          </p>
          <p :class="['px-4', `font-${serif ? 'serif' : 'sans'}`, 'py-4']" style="font-size: 16px">
            {{ current?.impression }}
          </p>
          <ElPagination
            class="px-2 py-2"
            v-model:current-page="current.index"
            layout="total, prev, pager, next, jumper"
            :pager-count="3"
            :total="activity.members.length"
            background
            hide-on-single-page
            :default-page-size="1"
            :page-size="1"
            @current-change="curserTo"
          />
          <ElRow
            class="py-2 px-2"
            v-if="
              (role === 'campus' &&
                current.status === 'pending' &&
                (user.position.includes('auditor') || user.position.includes('admin'))) ||
              user.position.includes('system')
            "
          >
            <ElDivider />
            <ElCol :span="12">
              <ElForm label-position="right" label-width="64px">
                <ElFormItem :label="t('activity.form.duration')">
                  <ElInput v-model="current.duration">
                    <template #append>
                      {{ t('activity.units.hour', Math.ceil(current.duration ?? 0)) }}
                    </template>
                  </ElInput>
                </ElFormItem>
              </ElForm>
            </ElCol>
            <ElCol :span="12">
              <div style="text-align: right">
                <ElPopconfirm
                  :title="t('activity.impression.page.reflect.actions.check')"
                  width="368"
                  @confirm="reflect('refused')"
                >
                  <template #reference>
                    <ElButton type="danger" :icon="Delete" text bg :loading="load === 'refused'">
                      {{ t('activity.impression.page.reflect.actions.refuse') }}
                    </ElButton>
                  </template>
                </ElPopconfirm>
                <ElButton
                  type="warning"
                  :icon="Close"
                  text
                  bg
                  :loading="load === 'rejected'"
                  @click="reflect('rejected')"
                >
                  {{ t('activity.impression.page.reflect.actions.reject') }}
                </ElButton>
                <ElButton
                  type="success"
                  :icon="Check"
                  text
                  bg
                  :loading="load === 'effective'"
                  @click="reflect('effective')"
                >
                  {{ t('activity.impression.page.reflect.actions.approve') }}
                </ElButton>
              </div>
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCollapseItem>
      <ElCollapseItem
        :title="t('activity.form.image')"
        :disabled="activity.type !== 'social'"
        name="3"
      >
        <ElCard shadow="hover" class="w-full" v-if="role === 'mine'">
          <ElUpload
            class="w-full"
            list-type="picture-card"
            :action="baseURL + 'image'"
            method="put"
            accept="image/png, image/jpg, image/jpeg, image/webp"
            :headers="{
              Authorization: 'Bearer ' + getUserToken()
            }"
            :limit="3"
            :on-success="handleSuccess"
            :on-preview="
              (file) => {
                preview = true
                previewUrl = file.url ?? ''
              }
            "
            :file-list="myimages"
          >
            <ElIcon><Plus /></ElIcon>
          </ElUpload>
        </ElCard>
        <ElCard shadow="hover" class="w-full" v-else>
          <ElEmpty
            v-if="current.images.length === 0"
            :description="t('activity.image.empty.name')"
          />
          <ElUpload
            class="w-full"
            list-type="picture-card"
            disabled
            :file-list="current.images"
            :on-preview="
              (file) => {
                preview = true
                previewUrl = file.url ?? ''
              }
            "
            :on-remove="() => false"
          >
            <ElIcon><ImageFiles /></ElIcon>
          </ElUpload>
        </ElCard>
      </ElCollapseItem>
    </ElCollapse>
    <ElDialog v-model="preview">
      <ElScrollbar :max-height="height * 0.6">
        <ElImage :src="previewUrl" />
      </ElScrollbar>
    </ElDialog>
  </div>
</template>

<style scoped>
.bottom {
  position: relative;
  bottom: 0;
  transform: translateY(80%);
}
</style>
