<script setup lang="ts">
import {
  ZButtonOrCard,
  ZActivityMember,
  ZActivityDuration,
  ZInputDuration,
  ZSelectActivityMode,
  ZSelectPerson
} from '@/components'
import type { ActivityMember, Activity } from '@/../types/v2'
import type { User } from '@/../types'
import { toRefs, watch } from 'vue'
import { User as IconUser, Minus, Plus, ArrowRight, Close } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElPopconfirm,
  ElPagination,
  ElPopover,
  ElDivider,
  ElMessage,
  ElLoading,
  type TableInstance
} from 'element-plus'
import { useWindowSize, useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import { Merge } from '@icon-park/vue-next'
import api from '@/api'
import ZGroupUserList from '@/components/group/ZGroupUserList.vue'
import ZSelectClass from '@/components/form/ZSelectClass.vue'
import { pad } from '@/plugins/ua'
import { users } from '@/api/group/reads'

const user = useUserStore()
const { t } = useI18n()
const { height } = useWindowSize()
const open = ref(false)
const max = ref(height.value * 0.5)
const showAddPopover = ref(false)
const clipboard = useClipboard({ read: true })
const activitySearch = ref('')
const activitySelected = ref<Activity | null>(null)
const activitySelectedMembersCount = ref(0)
const activitySearchResult = ref<
  {
    label: string
    value: string
  }[]
>([])

watch(activitySearch, async (newVal) => {
  if (newVal) {
    const result = await api.activity.read.single(newVal)
    if (result) {
      activitySelected.value = result.activity
      activitySelectedMembersCount.value = result.members_count
    }
  }
})

watch(height, () => {
  max.value = height.value * 0.5
})

const props = withDefaults(
  defineProps<{
    activity: Activity
    membersCount?: number
    mode?: 'button' | 'card'
    wholesale?: boolean
    modelValue?: ActivityMember[]
    selectable?: boolean
  }>(),
  {
    mode: 'button',
    wholesale: false,
    membersCount: 0,
    selectable: false
  }
)
const emits = defineEmits<{
  refresh: []
  'update:modelValue': [ActivityMember[]]
}>()

const { activity, mode, wholesale, membersCount, modelValue, selectable } = toRefs(props)
const modified = ref(false)
const members = ref<ActivityMember[]>([])
const addedUsers = ref<User[]>([])
const page = ref(1)
const perpage = ref(10)
const search = ref('')
const size = ref(membersCount.value)
const pageLoading = ref(false)

const batchOriginTags = ['从列表选择', '手动粘贴或输入名单 / 学号']
const batchOrigin = ref(batchOriginTags[0])
const pastedContent = ref(typeof clipboard.copied.value === 'string' ? clipboard.copied.value : '')
const contentParsed = ref<boolean>(false)
const batchWindowLoading = ref(false)
const searchActivityLoading = ref(false)
const selectedActivity = ref<Activity | null>(null)
const usersSelected = ref<ActivityMember[]>(modelValue.value ?? [])

function handleSelectionChange(val: ActivityMember[]) {
  emits('update:modelValue', val)
}

watch(
  usersSelected,
  (newVal) => {
    emits('update:modelValue', newVal)
  },
  { deep: true, immediate: true }
)

async function parsePastedContent() {
  const loading = ElLoading.service({ fullscreen: true })
  const lines = pastedContent.value.split('\n').map((x) => x.trim())
  const usersToAdd = await Promise.all(
    lines.map(async (line) => {
      const trimmedLine = line
      try {
        if (trimmedLine) {
          const user = await api.user.read(trimmedLine, 1, 1)
          if (user && user.users.length > 0) {
            return {
              status: 'success',
              content: user.users[0]
            }
          } else {
            return {
              status: 'error',
              content: trimmedLine
            }
          }
        } else {
          return {
            status: 'error',
            content: trimmedLine
          }
        }
      } catch (_) {
        return {
          status: 'error',
          content: trimmedLine
        }
      }
    })
  )
  const successful = usersToAdd.filter((item) => item.status === 'success')
  const failed = usersToAdd.filter((item) => item.status === 'error')
  loading.close()
  if (failed.length > 0) {
    // pastedContent.value = failed.map((item) => item.content).join('\n')
    ElMessage({
      message: 'There are ' + failed.length + ' errors in the pasted content.',
      type: 'error',
      duration: 5000,
      plain: true
    })
  } else {
    contentParsed.value = true
  }
  // @ts-ignore
  addedUsers.value = successful.map((item) => item.content)
}

async function refreshMembers() {
  pageLoading.value = true
  const { members: membersResult, total } = await api.activity.member.reads(
    activity.value._id,
    page.value,
    perpage.value,
    search.value
  )
  members.value = membersResult
  size.value = total
  pageLoading.value = false
}

refreshMembers()

const appendingDuration = ref(0)
const appendingMode = ref(activity.value.type === 'hybrid' ? '' : activity.value.type)

function getAllowed(): Activity['type'][] {
  if (activity.value.type.toString() === '') return []
  if (activity.value.type !== 'hybrid') return [appendingMode.value as Activity['type']]
  if (activity.value.origin === 'prize') return ['on-campus', 'off-campus']
  return ['on-campus', 'off-campus', 'social-practice']
}

const appending = ref<ActivityMember>({
  _id: '',
  member: '',
  activity: activity.value._id,
  duration: undefined as unknown as number,
  mode: appendingMode.value as unknown as ActivityMember['mode'],
  status: 'effective'
})

const loading = ref<string | 'add'>('')
const openBatchImportWindow = ref(false)

const isOnlyMonitor = ref(false)

const selectedClassID = ref(isOnlyMonitor.value ? user.class_id : '')

const memberFunctions = {
  async add() {
    await api.activity.member.insert(activity.value._id, appending.value)
    appending.value.member = ''
    appending.value._id = ''
    appending.value.duration = undefined as unknown as number
    await refreshMembers()
  },
  async remove(id: string) {
    modified.value = true
    loading.value = id
    await api.activity.member.remove(id, activity.value._id, user._id).catch(() => {
      loading.value = ''
    })
    loading.value = ''
    await refreshMembers()
  }
}

watch(open, () => {
  refreshMembers()
  if (open.value) {
    modified.value = false
  }
  if (!open.value && modified.value) emits('refresh')
  if (!open.value) showAddPopover.value = false
})

async function searchActivity(search: string) {
  searchActivityLoading.value = true
  if (!search) {
    activitySelected.value = null
    return
  }
  const { activities } = await api.activity.read.campus('', 1, 20, search)
  activitySearchResult.value = activities.map((x) => {
    return {
      label: x.name,
      value: x._id
    }
  })
  searchActivityLoading.value = false
}

const show = ref(false)

show.value = true

async function addMembers() {
  modified.value = true
  loading.value = 'add'
  const target = addedUsers.value.map((x) => x._id)
  target.push(...usersSelected.value.map((x) => x.member))
  const pipeline = target.map(async (mem) => {
    const adding = {
      _id: '',
      member: mem.toString(),
      activity: activity.value._id,
      status: 'effective',
      duration: appendingDuration.value,
      mode: appendingMode.value
    } as ActivityMember
    return await api.activity.member.insert(activity.value._id, adding)
  })

  const results = Promise.allSettled
    ? await Promise.allSettled(pipeline)
    : await (async () => {
        const results = []
        for (const promise of pipeline) {
          try {
            results.push({ status: 'fulfilled', value: await promise })
          } catch (error) {
            results.push({ status: 'rejected', reason: error })
          }
        }
        return results
      })()

  const successCount = results.filter((r) => r.status === 'fulfilled').length
  const failureCount = results.length - successCount
  ElMessage({
    message:
      'Handled ' +
      results.length +
      ' members, ' +
      successCount +
      ' succeeded, ' +
      failureCount +
      ' failed',
    type:
      successCount > results.length * 0.6
        ? 'success'
        : successCount < results.length * 0.3
          ? 'error'
          : 'warning',
    plain: true
  })
  showAddPopover.value = false
  openBatchImportWindow.value = false
  loading.value = ''
  await refreshMembers()
}

function selectorCallback(row: User) {
  return (
    (user.position.includes('admin') || user.position.includes('department')
      ? true
      : row.group.filter((x) => x == user.class_id).length > 0) &&
    members.value.filter((x) => x._id == row._id).length == 0
  )
}

watch(page, refreshMembers)
watch(perpage, refreshMembers)
watch(search, refreshMembers)
</script>

<template>
  <ZButtonOrCard
    v-model:open="open"
    :mode="mode"
    pop-type="dialog"
    width="80%"
    size="small"
    :icon="IconUser"
    round
    type="danger"
    :button-loading="pageLoading"
    @click="refreshMembers"
    :title="t('activity.member.dialog.title', { name: activity.name })"
  >
    <template #text> {{ size }} {{ t('activity.units.person', membersCount) }} </template>
    <template #default>
      <div v-if="show">
        <ElTable
          :data="members"
          stripe
          :height="max"
          v-loading="pageLoading"
          row-key="member"
          @selection-change="handleSelectionChange"
        >
          <ElTableColumn v-if="selectable" type="selection" width="55" reserve-selection />
          <ElTableColumn prop="_id" :label="t('activity.member.name')">
            <template #default="scope">
              <ZActivityMember :id="scope.row.member" />
            </template>
          </ElTableColumn>
          <ElTableColumn prop="duration" :label="t('activity.form.duration')">
            <template #default="scope">
              <ZActivityDuration
                v-model:duration="scope.row.duration"
                :mode="scope.row.mode"
                :id="activity._id"
                :uid="scope.row.member"
                :record="scope.row._id"
              />
            </template>
          </ElTableColumn>
          <ElTableColumn
            fixed="right"
            v-if="
              (user.position.includes('admin') ||
                user.position.includes('department')) &&
              !wholesale &&
              !selectable
            "
            class="no-print"
          >
            <template #header>
              <ElPopover
                width="384px"
                placement="right"
                trigger="click"
                v-if="
                  (user._id === activity.creator ||
                    user.position.includes('admin') ||
                    user.position.includes('department')) &&
                  !wholesale
                "
                :title="t('activity.member.dialog.actions.title', { activity: activity.name })"
                class="no-print"
              >
                <template #reference>
                  <ElButton
                    mode="button"
                    pop-type="dialog"
                    size="small"
                    :icon="Plus"
                    round
                    text
                    bg
                    type="success"
                    @click="openBatchImportWindow = true"
                  >
                    {{ t('activity.member.dialog.actions.add') }}
                  </ElButton>
                </template>
                <ZButtonOrCard
                  mode="button"
                  pop-type="drawer"
                  fullscreen
                  v-model:open="openBatchImportWindow"
                  width="100%"
                  size="default"
                  class="w-full"
                  :icon="Merge"
                  :round="false"
                  v-loading="batchWindowLoading"
                  type="warning"
                  :title="
                    t('activity.member.dialog.actions.title', {
                      activity: activity.name || t('activity.form.unnamed')
                    })
                  "
                >
                  <template #text>
                    {{ t('activity.batch.batch_import') }}
                  </template>
                  <ElForm>
                    <ElFormItem :label="t('activity.batch.batch.classid')" v-if="!isOnlyMonitor">
                      <ElSegmented v-model="batchOrigin" :options="batchOriginTags" />
                    </ElFormItem>
                    <ElFormItem
                      :label="t('activity.batch.batch.classid')"
                      v-if="!isOnlyMonitor && batchOrigin === '从列表选择'"
                    >
                      <ZSelectClass v-model="selectedClassID" clearable />
                    </ElFormItem>
                    <ElFormItem
                      :label="t('activity.batch.batch.members')"
                      class="w-full"
                      v-if="batchOrigin === '手动粘贴或输入名单 / 学号'"
                    >
                      <ElInput
                        v-model="pastedContent"
                        type="textarea"
                        autosize
                        @blur="parsePastedContent"
                      />
                    </ElFormItem>
                    <ElFormItem
                      label="Activity Name"
                      v-if="!isOnlyMonitor && batchOrigin === 'From Past Activities'"
                    >
                      <ElSelect
                        :remote-method="searchActivity"
                        class="w-full"
                        filterable
                        remote
                        reserve-keyword
                        v-model="activitySearch"
                        :loading="searchActivityLoading"
                      >
                        <ElOption
                          v-for="activity in activitySearchResult"
                          :key="activity.value"
                          :label="activity.label"
                          :value="activity.value"
                        />
                      </ElSelect>
                    </ElFormItem>
                    <ElFormItem
                      label="Activity Members"
                      v-if="!isOnlyMonitor && batchOrigin === 'From Past Activities'"
                    >
                      <ZActivityMemberList
                        v-if="activitySelected"
                        :activity="activitySelected"
                        :members-count="activitySelectedMembersCount"
                        selectable
                        class="w-full"
                        v-model="usersSelected"
                        mode="card"
                      />
                      {{ usersSelected.length }} students selected.
                    </ElFormItem>
                    <ElFormItem
                      :label="t('activity.batch.batch.members')"
                      class="w-full"
                      v-if=" batchOrigin === '从列表选择'"
                    >
                      <!-- @vue-ignore -->
                      <ZGroupUserList
                        class="w-full"
                        :id="selectedClassID"
                        selectable
                        :selector-callback="selectorCallback"
                        v-model="addedUsers"
                      />
                      <p class="py-0.5">
                        {{ t('activity.batch.batch.selected', { count: addedUsers.length }) }}
                      </p>
                    </ElFormItem>
                    <p class="py-0.5" v-else>
                        {{ t('activity.batch.batch.selected', { count: addedUsers.length }) }}
                    </p>
                    <ElFormItem :label="t('activity.batch.batch.mode')">
                      <!-- @vue-ignore -->
                      <ZSelectActivityMode
                        v-model="appendingMode"
                        :allow="getAllowed()"
                        class="w-full"
                      />
                    </ElFormItem>
                    <ElFormItem :label="t('activity.batch.batch.duration')">
                      <ZInputDuration v-model="appendingDuration" class="w-full" />
                    </ElFormItem>
                  </ElForm>
                  <div style="text-align: right">
                    <ElButton
                      text
                      bg
                      type="success"
                      :icon="ArrowRight"
                      @click="addMembers"
                      :loading="loading === 'add'"
                      :disabled="
                        (!addedUsers.length && !usersSelected.length) ||
                        !appendingMode ||
                        appendingDuration <= 0 ||
                        appendingDuration > 30
                      "
                    >
                      {{ t('activity.member.dialog.actions.add') }}
                    </ElButton>
                  </div>
                </ZButtonOrCard>
                <ElDivider>{{ t('activity.batch.or') }}</ElDivider>
                <ElForm>
                  <ElFormItem :label="t('activity.batch.manual.member')">
                    <ZSelectPerson
                      full-width
                      v-model="appending.member"
                      :filter-start="6"
                    ></ZSelectPerson>
                  </ElFormItem>
                  <ElFormItem :label="t('activity.batch.manual.mode')">
                    <!-- @vue-ignore -->
                    <ZSelectActivityMode
                      v-model="appending.mode"
                      :allow="getAllowed()"
                      class="w-full"
                    />
                  </ElFormItem>
                  <ElFormItem :label="t('activity.batch.manual.duration')">
                    <ZInputDuration v-model="appending.duration" class="w-full" />
                  </ElFormItem>
                  <div style="text-align: right">
                    <ElButton
                      :disabled="
                        appending?.member === '' ||
                        appending?.duration <= 0 ||
                        appending?.duration > 30 ||
                        members?.find(
                          (x) => x._id === appending.member && x.mode === appending.mode
                        ) !== undefined
                      "
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
      <div class="py-2 text-center" v-if="size !== 0">
        <ElPagination
          v-model:current-page="page"
          v-model:page-size="perpage"
          :pager-count="3"
          :total="size"
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
