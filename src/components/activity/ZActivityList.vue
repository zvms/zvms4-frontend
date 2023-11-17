<script setup lang="ts">
import type { ActivityInstance, ActivityMember } from '@/../@types/activity'
import { ElDialog, ElTable, ElTableColumn, ElButton } from 'element-plus'
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import { Box } from '@element-plus/icons-vue'
import MaterialSymbolsAppRegistration from '@/icons/MaterialSymbolsAppRegistration.vue'
import ZActivityImpressionDrawer from './ZActivityImpressionDrawer.vue'
import UserResgister from '@/views/activity/UserRegister.vue'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import ZActivityType from '@/components/tags/ZActivityType.vue'
import ZActivityStatus from '@/components/tags/ZActivityStatus.vue'
import ZActivityDetails from './ZActivityDetails.vue'

const { t } = useI18n()
const { width, height } = useWindowSize()

const user = useUserStore()

const props = defineProps<{
  activities: ActivityInstance[]
  role: 'auditor' | 'secretary' | 'student'
}>()

const titleFilter = ref('')

const { role } = toRefs(props)

const reflect = ref(
  role.value === 'student' ? '' : role.value === 'auditor' ? 'first-instance-approved' : 'attended'
)

const registerForSpecified = ref(false)
</script>

<template>
  <div :class="['card', 'pr-8', width < height ? 'pl-6' : '']">
    <ElDialog
      :title="t('activity.registration.title')"
      fullscreen
      center
      v-model="registerForSpecified"
    >
      <UserResgister />
    </ElDialog>
    <ElCard shadow="never">
      <ElTable :data="activities.filter((x) => x.name.includes(titleFilter))" table-layout="auto">
        <ElTableColumn type="expand">
          <template #header>
            <ElButton
              v-if="role !== 'student'"
              :icon="Box"
              type="success"
              text
              bg
              circle
              size="small"
            />
            <ElButton
              v-else
              :icon="MaterialSymbolsAppRegistration"
              type="success"
              text
              bg
              circle
              size="small"
              @click="registerForSpecified = true"
            />
          </template>
          <template #default="{ row }">
            <ZActivityDetails :activity="row" :mode="role" />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="t('activity.form.name')" />
        <ElTableColumn prop="time" :label="t('activity.form.date')">
          <template #default="{ row }">
            {{ dayjs(row.time).format('YYYY-MM-DD') }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="type" :label="t('activity.form.type')">
          <template #default="{ row }">
            <ZActivityType :type="row.type" size="small" />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="duration" :label="t('activity.form.duration')">
          <template #default="{ row }">
            {{ row.duration }}
            <span style="font-size: 12px; color: --el-text-color-secondary">{{
              t('activity.units.hour', row.duration)
            }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="role === 'student'" :label="t('activity.status.title')">
          <template #default="{ row }">
            <ZActivityStatus
              :type="
                (row as ActivityInstance).members.find((x: ActivityMember) => x._id === user._id)
                  ?.status
              "
            />
          </template>
        </ElTableColumn>
        <ElTableColumn v-else :label="t('activity.form.pending')">
          <template #default="{ row }">
            {{
              (row as ActivityInstance).members.filter(
                (x: ActivityMember) => x.status === reflect && row.type === 'specified'
              ).length
            }}
            <span style="font-size: 12px; color: --el-text-color-secondary">{{
              t(
                'activity.units.item',
                (row as ActivityInstance).members.filter(
                  (x: ActivityMember) => x.status === reflect && row.type === 'specified'
                ).length
              )
            }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" :label="t('activity.impression.name')">
          <template #default="props">
            <ZActivityImpressionDrawer :activity="props.row" :role="role" />
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
}

.code {
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'Courier', 'monospace';
}
</style>
