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
import type { ActivityMember, ActivityInstance, ActivityMode } from '@/../@types/activity'
import { toRefs, watch } from 'vue'
import { User, Minus, Plus, ArrowRight } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElScrollbar,
  ElPopover,
  ElPopconfirm,
  ElForm,
  ElFormItem
} from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import api from '@/api'

const user = useUserStore()
const { t } = useI18n()
const { height } = useWindowSize()
const open = ref(false)

const max = ref(height.value * 0.6)

const props = defineProps<{
  activity: ActivityInstance
}>()
const emits = defineEmits<{
  refresh: []
}>()

const { activity } = toRefs(props)
const modified = ref(false)

function getMode(): ActivityMode {
  if (activity.value.type === 'specified') return 'on-campus'
  if (activity.value.type === 'social') return 'off-campus'
  if (activity.value.type === 'scale') return 'large-scale'
  return activity.value.mode
}

function getAllow(): ActivityMode[] {
  if (activity.value.type !== 'special') return [getMode()]
  if (activity.value.special.classify === 'prize' || activity.value.special.classify === 'club')
    return ['on-campus', 'off-campus']
  return ['on-campus', 'off-campus', 'large-scale']
}

const appending = ref<ActivityMember>({
  _id: '',
  duration: activity.value.duration,
  mode: getMode(),
  impression: '',
  status: activity.value.type === 'special' ? 'effective' : 'draft',
  images: [],
  history: []
})

const loading = ref<string | 'add'>('')

const memberFunctions = {
  async add() {
    modified.value = true
    loading.value = 'add'
    await api.activity.member.insert(activity.value._id, appending.value)
    activity.value.members.push(appending.value)
    console.log(appending.value)
    loading.value = ''
  },
  async remove(id: string) {
    modified.value = true
    loading.value = id
    if (activity.value.members.length === 1) {
      await api.activity.deleteOne(activity.value._id)
      emits('refresh')
      return
    }
    await api.activity.member.remove(activity.value._id, id)
    activity.value.members = activity.value.members.filter((member) => member._id !== id)
    loading.value = ''
  }
}

watch(open, () => {
  if (open.value) modified.value = false
  if (!open.value && modified.value) emits('refresh')
})
</script>

<template>
  <ZButtonOrCard
    v-model:open="open"
    mode="button"
    pop-type="dialog"
    width="80%"
    size="small"
    :icon="User"
    round
    type="danger"
    :title="t('activity.member.dialog.title', { name: activity.name })"
  >
    <template #text>
      {{ activity.members.length }} {{ t('activity.units.person', activity.members.length) }}
    </template>
    <template #default>
      <ElScrollbar :height="max" v-if="activity.members.length !== 0">
        <ElTable :data="activity.members" stripe>
          <ElTableColumn prop="_id" :label="t('activity.member.name')">
            <template #default="scope">
              <ZActivityMember :id="scope.row._id" with-user-class-name />
            </template>
          </ElTableColumn>
          <ElTableColumn prop="status" :label="t('activity.member.status')">
            <template #default="scope">
              <ZActivityStatus :type="scope.row.status" force="full" />
            </template>
          </ElTableColumn>
          <ElTableColumn prop="duration" :label="t('activity.form.duration')">
            <template #default="scope">
              <ZActivityDuration
                :duration="scope.row.duration"
                :mode="scope.row.mode"
                force="full"
              />
            </template>
          </ElTableColumn>
          <ElTableColumn
            fixed="right"
            v-if="
              user._id === activity.creator ||
              user.position.includes('admin') ||
              user.position.includes('department')
            "
          >
            <template #header>
              <ElPopover
                placement="left"
                trigger="click"
                :title="t('activity.member.dialog.actions.title', { activity: activity.name })"
                width="328px"
              >
                <template #reference>
                  <ElButton
                    text
                    bg
                    round
                    size="small"
                    type="success"
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
                    <ZSelectActivityMode v-model="appending.mode" :allow="getAllow()" />
                  </ElFormItem>
                  <ElFormItem :label="t('activity.form.duration')">
                    <ZInputDuration v-model="appending.duration" />
                  </ElFormItem>
                  <div style="text-align: right">
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
      </ElScrollbar>
    </template>
  </ZButtonOrCard>
</template>
