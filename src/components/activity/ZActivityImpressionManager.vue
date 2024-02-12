<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import { ArrowRight, Close, Check, Delete, ZoomIn, Download, Plus } from '@element-plus/icons-vue'
import { Save } from '@icon-park/vue-next'
import type { ActivityInstance, MemberActivityStatus } from '@zvms/zvms4-types'
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
  ElCarousel,
  ElCarouselItem,
  ElImage,
  ElEmpty,
  ElIcon
} from 'element-plus'
import { useI18n } from 'vue-i18n'
import { ZActivityMember, ZActivityDetails, ZActivityStatus } from '@/components'
import { getImage } from '@/api/activity/image'
import api from '@/api'

const props = defineProps<{
  activity: ActivityInstance
  role: 'mine' | 'campus' | 'class'
  submitable?: boolean
}>()

const user = useUserStore()
const { t } = useI18n()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'finish'): void
}>()

const { activity, role, submitable } = toRefs(props)

const impression = ref(
  role.value === 'mine' && activity.value.members.map((x) => x._id).includes(user._id)
    ? (activity.value.members.find((x) => x._id === user._id)?.impression as string)
    : ''
)

const activeNames = ref<string[]>(['1', '2'])

const load = ref<'draft' | 'pending' | 'refused' | 'rejected' | 'effective' | false>(false)

async function submit(submit: boolean) {
  emits('update:modelValue', impression.value)
  load.value = submit ? 'pending' : 'draft'
  if (!submitable?.value) return
  await api.activity.impression.modify(user._id, activity.value._id, impression.value, submit)
  emits('finish')
  load.value = false
}

async function reflect(status: 'effective' | 'rejected' | 'refused') {
  load.value = status
  await api.activity.status.modify(user._id, activity.value._id, status)
  load.value = false
  if (current.value && current.value.index < activity.value.members.length) {
    curserTo(current.value.index + 1)
  } else {
    emits('finish')
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
  images: string[]
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

async function curserTo(index: number) {
  loading.value = true
  const result = await api.user.readOne(activity.value.members[index - 1]._id)
  const images = await Promise.all(activity.value.members[index - 1].images.map((x) => getImage(x)))
  current.value = {
    index,
    id: result?.id ?? 0,
    name: result?.name ?? '未知',
    impression: activity.value.members[index - 1].impression,
    _id: activity.value.members[index - 1]._id,
    duration: activity.value.members[index - 1].duration,
    status: activity.value.members[index - 1].status,
    images
  }
  loading.value = false
}

curserTo(1)

// console.log(activity.value.members)

const serif = ref(false)
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
            v-if="submitable"
            v-model="impression"
            :autosize="{ minRows: 2 }"
            minlength="30"
            maxlength="1024"
            show-word-limit
          />
          <p v-else :class="['px-4', `font-${serif ? 'serif' : 'sans'}`, 'py-4']">
            {{ impression }}
          </p>
          <div v-if="submitable" style="text-align: right" class="py-4">
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
                <ZActivityMember :id="current?._id" />
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
                      {{ t('activity.units.hour', current.duration) }}
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
            accept="image/png, image/jpg, image/jpeg, image/webp"
          >
            <ElIcon><Plus /></ElIcon>
            <template #file="{ file }">
              <div>
                <ElImage class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview">
                    <ElIcon><zoom-in /></ElIcon>
                  </span>
                  <span class="el-upload-list__item-delete">
                    <ElIcon><Download /></ElIcon>
                  </span>
                  <span class="el-upload-list__item-delete">
                    <ElIcon><Delete /></ElIcon>
                  </span>
                </span>
              </div>
            </template>
          </ElUpload>
        </ElCard>
        <ElCard shadow="hover" class="w-full" v-else>
          <ElEmpty
            v-if="current.images.length === 0"
            :description="t('activity.image.empty.name')"
          />
          <ElCarousel v-else :autoplay="false" class="w-full">
            <ElCarouselItem v-for="(item, index) in current.images" :key="index">
              <ElImage :src="item" />
            </ElCarouselItem>
          </ElCarousel>
        </ElCard>
      </ElCollapseItem>
    </ElCollapse>
  </div>
</template>

<style scoped>
.bottom {
  position: relative;
  bottom: 0;
  transform: translateY(80%);
}
</style>
