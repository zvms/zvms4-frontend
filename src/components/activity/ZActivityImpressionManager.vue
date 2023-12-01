<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import { ArrowRight, Close, Check, Delete } from '@element-plus/icons-vue'
import { Save } from '@icon-park/vue-next'
import type { ActivityInstance, MemberActivityStatus } from '@/../@types/activity'
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
  ElDivider
} from 'element-plus'
import { userModifyImpression, userModifyStatus } from '@/api/activity/put-impression'
import { getUser } from '@/api/user/crud'
import { useI18n } from 'vue-i18n'
import { ZActivityMember, ZActivityDetails, ZActivityStatus } from '@/components'

const props = defineProps<{
  activity: ActivityInstance
  role: 'mine' | 'campus'
  submitable?: boolean
}>()

const user = useUserStore()
const { t } = useI18n()

const emits = defineEmits(['update:modelValue', 'finish'])

const { activity, role, submitable } = toRefs(props)

const impression = ref(
  role.value === 'mine' && activity.value.members.map((x) => x._id).includes(user._id)
    ? (activity.value.members.find((x) => x._id === user._id)?.impression as string)
    : ''
)

const activeNames = ref<string[]>(['1'])

const load = ref(false)

async function submit(submit: boolean) {
  emits('update:modelValue', impression.value)
  load.value = true
  if (!submitable?.value) return
  await userModifyImpression(user._id, activity.value._id, impression.value, submit)
  emits('finish')
  load.value = false
}

async function reflect(status: 'effective' | 'rejected' | 'refused') {
  load.value = true
  await userModifyStatus(user._id, activity.value._id, status)
  load.value = false
}

interface ImpressionCursor {
  index: number
  id: number
  name: string
  impression: string
  _id: string
  duration: number
  status: MemberActivityStatus
}

const current = ref<ImpressionCursor>({
  index: 0,
  id: 0,
  name: '',
  impression: '',
  _id: '',
  duration: 0,
  status: 'pending'
})
const loading = ref(false)

async function curserTo(index: number) {
  loading.value = true
  const result = await getUser(activity.value.members[index - 1]._id)
  current.value = {
    index,
    id: result?.id ?? 0,
    name: result?.name ?? '未知',
    impression: activity.value.members[index - 1].impression,
    _id: activity.value.members[index - 1]._id,
    duration: activity.value.members[index - 1].duration,
    status: activity.value.members[index - 1].status
  }
  loading.value = false
  console.log(current.value)
}

curserTo(1)

// console.log(activity.value.members)

const serif = ref(false)
</script>

<template>
  <div class="dialog">
    <ElCollapse v-model="activeNames" accordion class="py-4">
      <ElCollapseItem :title="t('activity.form.details')" name="1">
        <ZActivityDetails :activity="activity" :mode="role" />
      </ElCollapseItem>
    </ElCollapse>
    <div>
      <ElCard v-if="role === 'mine'" shadow="hover">
        <p class="text-xl py-4">{{ t('activity.form.impression') }}</p>
        <ElInput
          type="textarea"
          v-model="impression"
          :autosize="{ minRows: 2 }"
          minlength="30"
          maxlength="1024"
          show-word-limit
        />
        <div style="text-align: right" class="py-4">
          <ElButton type="primary" @click="submit(false)" text bg :icon="Save" :loading="load">
            {{ t('activity.impression.page.write.actions.save') }}
          </ElButton>
          <ElButton
            type="success"
            @click="submit(true)"
            :disabled="impression.length < 30"
            text
            bg
            :icon="ArrowRight"
            :loading="load"
          >
            {{ t('activity.impression.page.write.actions.submit') }}
          </ElButton>
        </div>
      </ElCard>
      <ElCard shadow="hover" v-loading="loading" v-else>
        <p class="text-xl py-2">
          <ElRow>
            <ElCol :span="12">
              {{ t('activity.impression.page.reflect.prompt', { name: current?.name }) }}
              <ZActivityStatus class="px-1" :type="current?.status" />
            </ElCol>
            <ElCol :span="12" style="text-align: right">
              <ZActivityMember :id="current?._id" />
            </ElCol>
          </ElRow>
        </p>
        <p :class="['px-4', `font-${serif ? 'serif' : 'sans'}`, 'py-4']" style="font-size: 16px">
          {{ current?.impression }}
        </p>
        <ElPagination
          class="px-2 py-2"
          layout="total, prev, pager, next, jumper"
          :pager-count="3"
          :total="activity.members.length"
          background
          hide-on-single-page
          :default-page-size="1"
          :page-size="1"
          @current-change="curserTo"
        />
        <ElDivider v-if="current.status === 'pending'" />
        <ElRow class="py-2 px-2" v-if="current.status === 'pending'">
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
                  <ElButton type="danger" :icon="Delete" text bg :loading="load">
                    {{ t('activity.impression.page.reflect.actions.refuse') }}
                  </ElButton>
                </template>
              </ElPopconfirm>
              <ElButton
                type="warning"
                :icon="Close"
                text
                bg
                :loading="load"
                @click="reflect('rejected')"
                >{{ t('activity.impression.page.reflect.actions.reject') }}</ElButton
              >
              <ElButton
                type="success"
                :icon="Check"
                text
                bg
                :loading="load"
                @click="reflect('effective')"
                >{{ t('activity.impression.page.reflect.actions.approve') }}</ElButton
              >
            </div>
          </ElCol>
        </ElRow>
      </ElCard>
    </div>
  </div>
</template>

<style scoped>
.bottom {
  position: relative;
  bottom: 0;
  transform: translateY(80%);
}

.dialog {
  overflow: hidden !important;
}
</style>
