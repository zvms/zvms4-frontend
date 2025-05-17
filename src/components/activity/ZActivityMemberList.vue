<script setup lang="ts">
import {
  ZButtonOrCard,
  ZActivityMember,
  ZActivityDuration,
  ZInputDuration,
  ZSelectActivityMode,
  ZSelectPerson
} from '@/components'
import type { ActivityMember, Activity, User } from '@/../types/v2'
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
  ElMessage
} from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import { Merge } from '@icon-park/vue-next'
import api from '@/api'
import ZGroupUserList from '@/components/group/ZGroupUserList.vue'
import ZSelectClass from '@/components/form/ZSelectClass.vue'

const user = useUserStore()
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
    activity: Activity
    membersCount: number
    mode?: 'button' | 'card'
    wholesale?: boolean
  }>(),
  {
    mode: 'button',
    wholesale: false
  }
)
const emits = defineEmits<{
  refresh: []
}>()

const { activity, mode, wholesale, membersCount } = toRefs(props)
const modified = ref(false)
const members = ref<ActivityMember[]>([])
const addedUsers = ref<User[]>([])
const page = ref(1)
const perpage = ref(10)
const search = ref('')
const size = ref(membersCount.value)
const pageLoading = ref(false)

async function refreshMembers() {
  pageLoading.value = true
  const { members: members_result, total } = await api.activity.member.reads(
    activity.value._id,
    page.value,
    perpage.value,
    search.value
  )
  console.log(members_result, total)
  members.value = members_result
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

const selectedClassID = ref('')

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

const show = ref(false)

show.value = true

async function addMembers() {
  modified.value = true
  loading.value = 'add'
  const pipeline = addedUsers.value.map(async (mem) => {
    const adding = {
      _id: '',
      member: mem._id.toString(),
      activity: activity.value._id,
      status: 'effective',
      duration: appendingDuration.value,
      mode: appendingMode.value
    } as ActivityMember
    return await api.activity.member.insert(activity.value._id, adding)
  })
  const results = await Promise.allSettled(pipeline)

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
    type: 'success',
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
      : row.groups.filter((x) => x == user.class_id).length > 0) &&
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
        <ElTable :data="members" stripe :height="max" v-loading="pageLoading">
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
              />
            </template>
          </ElTableColumn>
          <ElTableColumn
            fixed="right"
            v-if="
              (user.position.includes('admin') ||
                user.position.includes('department') ||
                user.position.includes('secretary')) &&
              !wholesale
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
                    user.position.includes('department') ||
                    user.position.includes('secretary')) &&
                  !wholesale
                "
                :visible="showAddPopover"
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
                    @click="showAddPopover = true"
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
                    <ElFormItem :label="t('activity.batch.batch.classid')">
                      <ZSelectClass v-model="selectedClassID" clearable />
                    </ElFormItem>
                    <ElFormItem :label="t('activity.batch.batch.members')" class="w-full">
                      <ZGroupUserList
                        class="w-full"
                        :id="selectedClassID"
                        selectable
                        :selector-callback="selectorCallback"
                        v-model="addedUsers"
                        :key="useless"
                      />
                      <p class="py-0.5">
                        {{ t('activity.batch.batch.selected', { count: addedUsers.length }) }}
                      </p>
                    </ElFormItem>
                    <ElFormItem :label="t('activity.batch.batch.mode')">
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
                      type="warning"
                      :icon="Close"
                      @click="() => (showAddPopover = false)"
                    >
                      {{ t('activity.form.actions.cancel') }}
                    </ElButton>
                    <ElButton
                      text
                      bg
                      type="success"
                      :icon="ArrowRight"
                      @click="addMembers"
                      :loading="loading === 'add'"
                      :disabled="!addedUsers.length || !appendingMode || !appendingDuration"
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
                    <ElButton text bg type="danger" :icon="Close" @click="showAddPopover = false">
                      {{ t('activity.form.actions.cancel') }}
                    </ElButton>
                    <ElButton
                      :disabled="
                        appending.member === '' ||
                        appending.duration <= 0 ||
                        appending.duration > 18 ||
                        members.find(
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
