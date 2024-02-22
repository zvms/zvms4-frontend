<script setup lang="ts">
import type { Trophy } from '@zvms/zvms4-types'
import { useUserStore } from '@/stores/user'
import { ref, toRefs } from 'vue'
import { ElButtonGroup, ElPopconfirm, ElSkeleton, ElTable, ElTableColumn } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { Remove, User } from '@element-plus/icons-vue'
import { watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import {
  ZActivityMember,
  ZActivityMode,
  ZButton,
  ZActivityStatus,
  ZTrophyAddMember,
  ZButtonOrCard
} from '..'
import type { TrophyMember } from '@zvms/zvms4-types'
import api from '@/api'

const user = useUserStore()
const { t } = useI18n()
const { width, height } = useWindowSize()

const useUnits = ref(width.value > height.value * 1.2)

watch(width, () => (useUnits.value = width.value > height.value * 1.2))
watch(height, () => (useUnits.value = width.value > height.value * 1.2))

const props = withDefaults(
  defineProps<{
    trophy: Trophy
    awardName: string
  }>(),
  {}
)

const emits = defineEmits<{
  refresh: []
}>()

const refresh = () => emits('refresh')

const modified = ref(false)

const { trophy, awardName } = toRefs(props)

const allowToEdit = ref(user.position.includes('admin') || user._id === trophy.value.creator)

const members = ref(trophy.value.members.filter((member) => member.award === awardName.value))

watch(
  () => trophy.value,
  () => {
    allowToEdit.value = user.position.includes('admin') || user._id === trophy.value.creator
    members.value = trophy.value.members.filter((member) => member.award === awardName.value)
  }
)

const open = ref(false)

const submit = (member?: TrophyMember) => {
  if (member) {
    trophy.value.members.push(member)
    modified.value = true
    open.value = false
    refresh()
  }
}

async function removeMember(id: string) {
  const origin = members.value.filter((member) => member._id !== id && member.award === awardName.value)
  members.value = []
  const result = await api.trophy.member.remove(trophy.value._id, id)
  if (result) {
    trophy.value.members = origin
    members.value = origin
  }
}

watch(
  open,
  () => {
    if (modified.value) {
      refresh()
    }
  }
)
</script>

<template>
  <ZButtonOrCard
    type="danger"
    text
    bg
    round
    v-model:open="open"
    size="small"
    :icon="User"
    :title="t('activity.member.dialog.title', { name: trophy.name })"
    width="60%"
    mode="button"
  >
    <template #text>
      {{ members.length }} {{ useUnits ? t('activity.units.person', members.length) : '' }}
    </template>
    <p class="text-right text-sm">
      {{ awardName }} - {{ members.length }} / {{ trophy.members.length }} ({{
        Math.floor((members.length / trophy.members.length) * 100)
      }}%)
    </p>
    <ElSkeleton v-if="members.length <= 0" :loading="members.length === 0" :rows="5" />
    <ElTable :data="members" v-if="members.length > 0">
      <ElTableColumn prop="_id" :label="t('activity.form.name')">
        <template #header>
          <ZTrophyAddMember
            class="px-1"
            :trophy="trophy"
            :award="awardName"
            size="small"
            circle
            placement="right"
            @submit="submit"
          />
          {{ t('activity.form.name') }}
        </template>
        <template #default="{ row }">
          <ElButtonGroup>
            <ElPopconfirm
              class="px-1"
              :title="t('activity.member.dialog.actions.confirm')"
              @confirm="removeMember(row._id)"
              width="96px"
            >
              <template #reference>
                <ZButton type="danger" text bg circle size="small" :icon="Remove" />
              </template>
            </ElPopconfirm>
            <ZActivityMember :id="row._id" />
          </ElButtonGroup>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="mode" :label="t('activity.form.mode')">
        <template #default="{ row }">
          <ZActivityMode :mode="row.mode" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="status" :label="t('activity.registration.status.title')">
        <template #default="{ row }">
          <ZActivityStatus :type="row.status" />
        </template>
      </ElTableColumn>
    </ElTable>
  </ZButtonOrCard>
</template>
