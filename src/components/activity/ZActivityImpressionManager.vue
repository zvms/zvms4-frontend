<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import { ArrowRight, Close, Check, Delete } from '@element-plus/icons-vue'
import { Save } from '@icon-park/vue-next'
import ZActivityDescriptions from './ZActivityDescriptions.vue'
import type { ActivityInstance } from '@/../@types/activity'
import {
  ElCollapse,
  ElCollapseItem,
  ElInput,
  ElButton,
  ElCard,
  ElSkeleton,
  ElRow,
  ElCol,
  ElPagination,
  ElPopconfirm
} from 'element-plus'
import { userModifyImpression } from '@/api/activity/put-impression'
import { getUser } from '@/api/user/crud'
import { useI18n } from 'vue-i18n'

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
  id: 20230616,
  name: '吴承宇',
  impression:
    '114514, 1919810. 114514, 1919810. 114514, 1919810. 114514, 1919810. 114514, 1919810.',
  _id: '60c9b1b0e6b3a3b4b8b0b0b0'
})
const loading = ref(false)

async function curserTo(index: number) {
  loading.value = true
  const result = await getUser(activity.value.members[index]._id)
  console.log(index, result)
  current.value = {
    index,
    id: result?.id ?? 0,
    name: result?.name ?? '未知',
    impression: activity.value.members[index - 1].impression,
    _id: activity.value.members[index - 1]._id
  }
  loading.value = false
}

// curserTo(0)
</script>

<template>
  <div>
    <ElCollapse v-model="activeNames" accordion class="py-4">
      <ElCollapseItem :title="t('activity.columns.impression-page.general.detail')" name="1">
        <ZActivityDescriptions :activity="activity" :role="role" />
      </ElCollapseItem>
    </ElCollapse>
    <div>
      <ElCard v-if="role === 'student'" shadow="hover">
        <p class="text-xl py-4">{{ t('activity.columns.impression-page.write.title') }}</p>
        <ElInput
          type="textarea"
          v-model="impression"
          :placeholder="
            t('placeholder', {
              action: 'input',
              target: t('activity.columns.impression')
            })
          "
          :autosize="{ minRows: 2 }"
          minlength="30"
          maxlength="1024"
          show-word-limit
        />
        <div style="text-align: right" class="py-4">
          <ElButton
            type="primary"
            @click="submit"
            :disabled="impression.length < 30"
            text
            bg
            :icon="Save"
          >
            {{ t('activity.columns.impression-page.write.action.save') }}
          </ElButton>
          <ElButton
            type="success"
            @click="submit"
            :disabled="impression.length < 30"
            text
            bg
            :icon="ArrowRight"
          >
            {{ t('activity.columns.impression-page.write.action.submit') }}
          </ElButton>
        </div>
      </ElCard>
      <ElCard shadow="hover" v-else>
        <p class="text-xl py-4">
          {{ t('activity.columns.impression') }}<span v-if="!loading"> By {{ current?.name }}</span>
        </p>
        <ElSkeleton v-if="loading" :rows="3" animated :throttle="500" />
        <p v-else class="px-4">{{ current?.impression }}</p>
        <ElRow class="py-4">
          <ElCol :span="6">
            <ElPagination
              layout="prev, pager, next, jumper"
              :page-count="activity.members.length"
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
                :title="t('activity.columns.impression-page.reflect.buttons.ensure')"
                width="368"
              >
                <template #reference>
                  <ElButton v-if="role === 'auditor'" type="danger" :icon="Delete" text bg>
                    {{ t('activity.columns.impression-page.reflect.buttons.refuse') }}
                  </ElButton>
                </template>
              </ElPopconfirm>
              <ElButton type="warning" :icon="Close" text bg>{{
                t('activity.columns.impression-page.reflect.buttons.reject')
              }}</ElButton>
              <ElButton type="success" :icon="Check" text bg>{{
                t('activity.columns.impression-page.reflect.buttons.approve')
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
