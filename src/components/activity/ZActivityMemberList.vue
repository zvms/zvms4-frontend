<script setup lang="ts">
import {
  ZButtonOrCard,
  ZActivityMember,
  ZActivityStatus,
  ZActivityDuration,
  ZInputDuration,
  ZSelectActivityMode,
  ZSelectPerson
} from '@/components'
import type { ActivityMember, ActivityInstance, ActivityMode } from '@/../types'
import { toRefs, watch } from 'vue'
import { User, Minus, Plus, ArrowRight, Close, EditPen, View } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElPopover,
  ElPopconfirm,
  ElForm,
  ElFormItem,
  ElPagination
} from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()
const { t } = useI18n()
const { height } = useWindowSize()
const open = ref(false)
const max = ref(height.value * 0.5)
const showAddPopover = ref(false)

watch(height, () => {
  max.value = height.value * 0.5
})

const props = withDefaults(
  defineProps<{
    activity: ActivityInstance
    mode?: 'button' | 'card'
    color?: 'primary' | 'success' | 'warning' | 'danger'
    wholesale: boolean
  }>(),
  {
    mode: 'button',
    color: 'danger',
    wholesale: false
  }
)
const emits = defineEmits<{
  refresh: []
}>()

const { activity, mode, wholesale } = toRefs(props)
const modified = ref(false)
const members = ref<ActivityMember[]>([])

// Add member of activity in first 5

members.value.push(...activity.value.members.slice(0, 5))

function scroll() {
  // Then add 2 members if available when touch bottom
  if (members.value.length < activity.value.members.length) {
    members.value.push(
      ...activity.value.members.slice(members.value.length, members.value.length + 2)
    )
  }
}

function getMode(): ActivityMode {
  if (activity.value.type === 'specified') return 'on-campus'
  if (activity.value.type === 'social') return 'off-campus'
  if (activity.value.type === 'scale') return 'social-practice'
  return 'on-campus'
}

function getAllow(): ActivityMode[] {
  if (activity.value.type !== 'special') return [getMode()]
  if (activity.value.special.classify === 'prize' || activity.value.special.classify === 'club')
    return ['on-campus', 'off-campus']
  return ['on-campus', 'off-campus', 'social-practice']
}

const appending = ref<ActivityMember>({
  _id: '',
  duration:
    activity.value.type === 'specified'
      ? activity.value.registration.duration
      : activity.value.members.map((x) => x.duration).some((x) => x)
      ? activity.value.members.map((x) => x.duration).reduce((a, b) => a + b)
      : 0,
  mode: getMode(),
  impression: '',
  status: 'effective',
  images: [],
  history: []
})

const loading = ref<string | 'add'>('')

const memberFunctions = {
  async add() {
    modified.value = true
    loading.value = 'add'
    await api.activity.member.insert(activity.value._id, appending.value)
    activity.value.members.push({
      _id: appending.value._id.toString(),
      status: 'effective',
      duration: appending.value.duration,
      mode: appending.value.mode,
      impression: '',
      images: [],
      history: []
    })
    loading.value = ''
    showAddPopover.value = false
  },
  async remove(id: string) {
    modified.value = true
    loading.value = id
    if (activity.value.members.length === 1) {
      await api.activity.deleteOne(activity.value._id, user._id).catch(() => {
        loading.value = ''
      })
      emits('refresh')
      return
    }
    await api.activity.member
      .remove(id, activity.value._id, user._id)
      .then(() => {
        activity.value.members = activity.value.members.filter((member) => member._id !== id)
      })
      .catch(() => {
        loading.value = ''
      })
    loading.value = ''
  }
}

watch(open, () => {
  if (open.value) modified.value = false
  if (!open.value && modified.value) emits('refresh')
  if (!open.value) showAddPopover.value = false
})

const active = ref(1)
const size = ref(5)
const show = ref(false)

show.value = true

watch(active, () => {
  const members = activity.value.members
  activity.value.members = []
  activity.value.members = members
})

function pushTo(url: string) {
  open.value = false
  router.push(url)
}
</script>

<template>
  <ZButtonOrCard
    v-model:open="open"
    :mode="mode"
    pop-type="dialog"
    width="80%"
    size="small"
    :icon="User"
    round
    :type="color"
    :title="t('activity.member.dialog.title', { name: activity.name })"
  >
    <template #text>
      {{ activity.members.length }} {{ t('activity.units.person', activity.members.length) }}
    </template>
    <template #default>
      <div v-if="activity.members.length !== 0 && show">
        <ElTable
          :data="
            activity.members.filter((x, idx) => idx < active * size && idx >= (active - 1) * size)
          "
          stripe
          :height="max"
        >
          <ElTableColumn v-infinite-scroll="scroll" prop="_id" :label="t('activity.member.name')">
            <template #default="scope">
              <ZActivityMember :id="scope.row._id" />
            </template>
          </ElTableColumn>
          <ElTableColumn prop="status" :label="t('activity.member.status')" class="w-full">
            <template #default="scope">
              <ZActivityStatus :type="scope.row.status" />
            </template>
          </ElTableColumn>
          <ElTableColumn prop="duration" :label="t('activity.form.duration')">
            <template #default="scope">
              <ZActivityDuration
                :duration="scope.row.duration"
                :mode="scope.row.mode"
                :id="activity._id"
                :uid="scope.row._id"
              />
            </template>
          </ElTableColumn>
          <ElTableColumn
            fixed="right"
            v-if="
              (user._id === activity.creator ||
                user.position.includes('admin') ||
                user.position.includes('department') ||
                user.position.includes('secretary')) &&
              !wholesale
            "
            class="no-print"
          >
            <template #header>
              <ElPopover
                placement="left"
                :visible="showAddPopover"
                :title="t('activity.member.dialog.actions.title', { activity: activity.name })"
                width="328px"
                class="no-print"
              >
                <template #reference>
                  <ElButton
                    text
                    bg
                    round
                    size="small"
                    type="success"
                    @click="showAddPopover = true"
                    :loading="loading === 'add'"
                    :icon="Plus"
                  >
                    {{ t('activity.member.dialog.actions.add') }}
                  </ElButton>
                </template>
                <ElForm label-position="right" label-width="96px" class="pt-2">
                  <ElFormItem :label="t('activity.member.name')">
                    <ZSelectPerson v-model="appending._id" :filter-start="6" full-width />
                  </ElFormItem>
                  <ElFormItem :label="t('activity.form.classify')">
                    <ZSelectActivityMode
                      v-model="appending.mode"
                      :allow="getAllow()"
                      class="w-full"
                    />
                  </ElFormItem>
                  <ElFormItem :label="t('activity.form.duration')">
                    <ZInputDuration v-model="appending.duration" class="w-full" />
                  </ElFormItem>
                  <div style="text-align: right">
                    <ElButton text bg type="danger" :icon="Close" @click="showAddPopover = false">
                      {{ t('activity.form.actions.cancel') }}
                    </ElButton>
                    <ElButton
                      text
                      bg
                      type="success"
                      @click="memberFunctions.add"
                      :icon="ArrowRight"
                      :loading="loading === 'add'"
                    >
                      {{ t('activity.member.dialog.actions.add') }}
                    </ElButton>
                  </div>
                </ElForm>
              </ElPopover>
            </template>
            <template #default="scope">
              <ElPopconfirm
                :title="t('activity.member.dialog.actions.confirm')"
                @confirm="memberFunctions.remove(scope.row._id)"
                width="216px"
                placement="left"
                class="no-print"
              >
                <template #reference>
                  <ElButton
                    text
                    bg
                    round
                    size="small"
                    type="danger"
                    @click="scope"
                    :loading="loading === scope.row._id"
                    :icon="Minus"
                  >
                    {{ t('activity.member.dialog.actions.remove') }}
                  </ElButton>
                </template>
              </ElPopconfirm>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
      <div class="py-2 text-center" v-if="activity.members.length !== 0">
        <ElPagination
          v-model:current-page="active"
          v-model:page-size="size"
          :pager-count="3"
          :total="activity.members.length"
          layout="total, prev, pager, next, sizes, jumper"
          background
          :page-sizes="[3, 5, 8, 10]"
        />
      </div>
    </template>
  </ZButtonOrCard>
</template>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
