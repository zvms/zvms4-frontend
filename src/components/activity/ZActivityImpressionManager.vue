<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import { ArrowRight, Close, Check, Delete } from '@element-plus/icons-vue'
import { Save } from '@icon-park/vue-next'
import type { ActivityInstance } from '@/../@types/activity'
import {
  ElCollapse,
  ElCollapseItem,
  ElInput,
  ElButton,
  ElCard,
  ElRow,
  ElCol,
  ElPagination,
  ElPopconfirm
} from 'element-plus'
import { userModifyImpression } from '@/api/activity/put-impression'
import { getUser } from '@/api/user/crud'
import { useI18n } from 'vue-i18n'
import ZActivityDetails from './ZActivityDetails.vue'
import ZActivityMember from './ZActivityMember.vue'

const props = defineProps<{
  activity: ActivityInstance
  role: 'student' | 'auditor' | 'secretary'
  submitable?: boolean
}>()

const user = useUserStore()
const { t } = useI18n()

const emits = defineEmits(['update:modelValue', 'finish'])

const { activity, role, submitable } = toRefs(props)

const impression = ref(
  role.value === 'student' && activity.value.members.map((x) => x._id).includes(user._id)
    ? (activity.value.members.find((x) => x._id === user._id)?.impression as string)
    : ''
)

const activeNames = ref<string[]>(['1'])

function submit() {
  emits('update:modelValue', impression.value)
  emits('finish')
  if (!submitable?.value) return
  userModifyImpression(user.id, activity.value._id, impression.value)
}

interface ImpressionCursor {
  index: number
  id: number
  name: string
  impression: string
  _id: string
}

const current = ref<ImpressionCursor>({
  index: 0,
  id: 0,
  name: '',
  impression: '',
  _id: ''
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
    _id: activity.value.members[index - 1]._id
  }
  loading.value = false
  console.log(current.value)
}

curserTo(1)

// console.log(activity.value.members)

const serif = ref(false)
</script>

<template>
  <div>
    <ElCollapse v-model="activeNames" accordion class="py-4">
      <ElCollapseItem :title="t('activity.form.details')" name="1">
        <ZActivityDetails :activity="activity" :mode="role" />
      </ElCollapseItem>
    </ElCollapse>
    <div>
      <ElCard v-if="role === 'student'" shadow="hover">
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
          <ElButton type="primary" @click="submit" text bg :icon="Save">
            {{ t('activity.impression.page.write.actions.save') }}
          </ElButton>
          <ElButton
            type="success"
            @click="submit"
            :disabled="impression.length < 30"
            text
            bg
            :icon="ArrowRight"
          >
            {{ t('activity.impression.page.write.actions.submit') }}
          </ElButton>
        </div>
      </ElCard>
      <ElCard shadow="hover" v-loading="loading" v-else>
        <p class="text-xl py-4">
          <ElRow>
            <ElCol :span="12">
              {{ t('activity.impression.page.reflect.prompt', { name: current?.name }) }}
            </ElCol>
            <ElCol :span="12" style="text-align: right">
              <ZActivityMember :id="current?._id" />
            </ElCol>
          </ElRow>
        </p>
        <p class="px-4">{{ current?.impression }}</p>
        <ElRow class="py-4">
          <ElCol :span="6">
            <ElPagination
              layout="prev, pager, next, jumper"
              :page-count="activity.members.length"
              :pager-count="3"
              background
              hide-on-single-page
              :default-page-size="1"
              :page-size="1"
              @current-change="curserTo"
            />
          </ElCol>
          <ElCol :span="2"></ElCol>
          <ElCol :span="16">
            <div style="text-align: right">
              <ElPopconfirm
                :title="t('activity.impression.page.reflect.actions.check')"
                width="368"
              >
                <template #reference>
                  <ElButton v-if="role === 'auditor'" type="danger" :icon="Delete" text bg>
                    {{ t('activity.impression.page.reflect.actions.refuse') }}
                  </ElButton>
                </template>
              </ElPopconfirm>
              <ElButton type="warning" :icon="Close" text bg>{{
                t('activity.impression.page.reflect.actions.reject')
              }}</ElButton>
              <ElButton type="success" :icon="Check" text bg>{{
                t('activity.impression.page.reflect.actions.approve')
              }}</ElButton>
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
</style>
