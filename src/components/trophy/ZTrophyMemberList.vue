<script setup lang="ts">
import type { Trophy } from '@zvms/zvms4-types'
import { useUserStore } from '@/stores/user'
import { ref, toRefs } from 'vue'
import { ElButtonGroup, ElPopconfirm, ElPopover, ElTable, ElTableColumn } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { Remove, User } from '@element-plus/icons-vue'
import { watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { ZActivityMember, ZActivityMode, ZButton, ZActivityStatus, ZTrophyAddMember } from '..'
import { CircleClose } from '@element-plus/icons-vue'

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
</script>

<template>
  <ElPopover :title="t('activity.member.dialog.title', { name: trophy.name })" width="512px">
    <template #reference>
      <ZButton type="danger" text bg round size="small" :icon="User">
        {{ members.length }} {{ useUnits ? t('activity.units.person', members.length) : '' }}
      </ZButton>
    </template>
    <p class="text-right text-sm">
      {{ awardName }} - {{ members.length }} / {{ trophy.members.length }} ({{
        Math.floor((members.length / trophy.members.length) * 100)
      }}%)
    </p>
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
          />
          {{ t('activity.form.name') }}
        </template>
        <template #default="{ row }">
          <ElButtonGroup>
            <ElPopconfirm
              class="px-1"
              :title="t('activity.member.dialog.actions.confirm')"
              @confirm="() => true"
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
  </ElPopover>
</template>
