<script lang="ts" setup>
import type { Activity, ActivityMember } from '@/../types/v2'
import { toRefs, ref, watch } from 'vue'
import {
  ElButton,
  ElInput,
  ElRow,
  ElCol,
  ElPopconfirm,
  ElButtonGroup,
  ElStatistic,
  ElSegmented
} from 'element-plus'
import categories from './categories.json'
import { useWindowSize } from '@vueuse/core'
import { Calendar, ArrowRight, Delete, Plus } from '@element-plus/icons-vue'
import dayjs from '@/plugins/dayjs'
import { useUserStore } from '@/stores/user'
import {
  ZActivityDuration,
  ZActivityMember,
  ZActivityType,
  ZButtonOrCard,
  ZActivityMemberList
} from '@/components'
import { useI18n } from 'vue-i18n'
import api from '@/api'
import { StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite } from '@/icons'
import UilStatistics from '@/icons/UilStatistics.vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Colors
} from 'chart.js'

ChartJS.register(Colors, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const { width, height } = useWindowSize()

const props = withDefaults(
  defineProps<{
    activity: Activity
    memberDetails?: ActivityMember
    membersCount?: number
    mode?: 'mine' | 'class' | 'campus' | 'register'
    perspective?: string // `mine` with other's user ObjectId
    showDetails?: boolean
    local?: boolean
  }>(),
  {
    mode: 'mine',
    perspective: 'mine',
    showDetails: false,
    local: false,
    membersCount: 0,
  }
)
const emits = defineEmits<{
  refresh: []
}>()

const user = useUserStore()
const { t, locale } = useI18n()
const { activity, mode, membersCount, showDetails, local, memberDetails } = toRefs(props)

const hovered = ref(false)
const openStatistics = ref(false)

function getDateStatusColor(date: string) {
  const now = dayjs()
  const target = dayjs(date)
  if (target.isAfter(now, 'date')) return 'success'
  if (target.isBefore(now, 'date')) return 'warning'
  return 'primary'
}

const editName = ref(false)
const name = ref(activity.value.name)
const editDescription = ref(false)
const description = ref(activity.value.description)

async function submitInfo() {
  editDescription.value = false
  editName.value = false
  activity.value.description = description.value
  activity.value.name = name.value
  await api.activity.update.info(activity.value._id, name.value, description.value)
  emits('refresh')
}

async function deleteActivity(id: string) {
  await api.activity.deleteOne(id, user._id)
  emits('refresh')
}

const refresh = () => emits('refresh')

const statistics = ref<{
  description: Record<string, number>
  layers: Array<{ value: number; count: number }>
  layersChart: {
    labels: string[]
    datasets: {
      label?: string
      data: number[]
      backgroundColor?: string[]
    }[]
  }
}>({
  description: {},
  layers: [],
  layersChart: {
    labels: [],
    datasets: []
  }
})

async function fetchStatistics() {
  if (activity.value._id) {
    try {
      const description = await api.activity.stats.description(activity.value._id)
      const layers = await api.activity.stats.layers(activity.value._id)
      // @ts-ignore
      statistics.value.description = description
      statistics.value.layers = layers
      console.log(statistics.value)
      if (layers && layers.length > 0) {
        statistics.value.layersChart.labels = layers.map(
          (layer) =>
            `${layer.value.toFixed(1)} Hours (${((layer.count / description.total) * 100).toFixed(1)}%)`
        )
        statistics.value.layersChart.datasets = [
          {
            data: layers.map((layer) => layer.count)
          }
        ]
      }

      console.log(statistics.value)
    } catch (error) {
      console.error('Failed to fetch statistics:', error)
    }
  }
}

watch(openStatistics, () => {
  if (openStatistics.value) {
    fetchStatistics()
  }
})

const statTable = ['Description', 'Layers']
const activeStatistic = ref(statTable[0])
</script>

<template>
  <ZButtonOrCard
    mode="card"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
    style="width: 100%"
  >
    <p class="text-xl pl-4" style="width: 100%">
      <span v-if="!editName" @dblclick="editName = true">{{ activity.name }}</span>
      <ElInput v-else v-model="name" style="width: 328px" required @keydown.enter="submitInfo">
        <template #append>
          <ElButton class="px-2" type="success" :icon="ArrowRight" @click="submitInfo" />
        </template>
      </ElInput>
      <ElButtonGroup>
        <ZActivityType
          class="px-2"
          :type="activity.type"
          mode="full"
          show-special
          force="full"
          :status="activity.status"
        />
      </ElButtonGroup>
    </p>
    <div
      v-if="!editDescription"
      class="text-sm text-gray-500 pl-4"
      @dblclick="editDescription = true"
    >
      <p style="white-space: pre-wrap">{{ activity.description }}</p>
    </div>
    <div v-else class="pt-2 pl-4">
      <ElInput v-model="description" type="textarea" :autosize="{ minRows: 2 }" />
      <div style="text-align: right" class="py-2">
        <ElButton
          text
          bg
          circle
          class="px-2"
          type="success"
          :icon="ArrowRight"
          @click="submitInfo"
        />
      </div>
    </div>
    <div class="py-2 pl-4">
      <ElButton
        size="small"
        text
        bg
        round
        :type="getDateStatusColor(activity.date)"
        class="py-2"
        :icon="Calendar"
      >
        {{ dayjs(activity.date).format('YYYY-MM-DD HH:mm:ss') }}
      </ElButton>
      <ZActivityDuration
        class="px-2"
        v-if="memberDetails"
        :mode="memberDetails?.mode"
        :duration="memberDetails?.duration"
        force="full"
      />
      <ZActivityMemberList
        :members-count="membersCount"
        class="px-2"
        :activity="activity"
        @refresh="refresh"
      />
      <ZButtonOrCard
        class="px-2"
        v-model:open="openStatistics"
        mode="button"
        pop-type="dialog"
        :width="width < height ? '60%' : '30%'"
        type="warning"
        :icon="UilStatistics"
      >
        <template #default>
          <div style="text-align: center">
            <ElSegmented v-model="activeStatistic" :options="statTable" />
          </div>
          <ElRow v-if="activeStatistic === 'Description'">
            <ElCol :span="4" :sm="6" :xs="8">
              <ElStatistic title="Mean" :value="statistics.description.mean" :precision="1" />
            </ElCol>
            <ElCol :span="4" :sm="6" :xs="8">
              <ElStatistic title="Median" :value="statistics.description.median" :precision="1" />
            </ElCol>
            <ElCol :span="4" :sm="6" :xs="8">
              <ElStatistic title="Mode" :value="statistics.description.mode" :precision="1" />
            </ElCol>
            <ElCol :span="4" :sm="6" :xs="8">
              <ElStatistic title="Min" :value="statistics.description.min" :precision="1" />
            </ElCol>
            <ElCol :span="4" :sm="6" :xs="8">
              <ElStatistic title="Max" :value="statistics.description.max" :precision="1" />
            </ElCol>
            <ElCol :span="4" :sm="6" :xs="8">
              <ElStatistic
                title="Standard variance"
                :value="statistics.description.std"
                :precision="1"
              />
            </ElCol>
            <ElCol :span="4" :sm="6" :xs="8">
              <ElStatistic title="Variance" :value="statistics.description.var" :precision="1" />
            </ElCol>
            <ElCol :span="4" :sm="6" :xs="8">
              <ElStatistic
                title="25% Percentile"
                :value="statistics.description['25_percentile']"
                :precision="1"
              />
            </ElCol>
            <ElCol :span="4" :sm="6" :xs="8">
              <ElStatistic
                title="75% Percentile"
                :value="statistics.description['75_percentile']"
                :precision="1"
              />
            </ElCol>
          </ElRow>
          <Doughnut
            v-else-if="activeStatistic === 'Layers'"
            :data="statistics.layersChart"
            :options="{ responsive: true }"
          />
        </template>
        <template #text> Statistics </template>
      </ZButtonOrCard>
    </div>
    <ElRow>
      <ElCol :span="6">
        <div class="pl-4 py-2">
          <ZActivityMember
            :id="activity.creator"
            :icon="
              StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite
            "
          />
        </div>
      </ElCol>
      <ElCol :span="18">
        <div class="pl-4 py-2" style="text-align: right">
          <ElButton
            v-if="showDetails"
            type="info"
            :icon="Plus"
            text
            bg
            round
            size="small"
            @click="$router.push('/activity/details/' + activity._id)"
          >
            {{ t('activity.form.detail') }}
          </ElButton>
          <ElPopconfirm
            v-if="
              mode !== 'mine' &&
              !local &&
              (user._id === activity.creator || user.position.includes('admin'))
            "
            :title="t('activity.form.actions.delete.confirm')"
            width="328px"
            @confirm="deleteActivity(activity._id)"
          >
            <template #reference>
              <ElButton :icon="Delete" type="danger" size="small" text bg round>
                {{ t('activity.form.actions.delete.name') }}
              </ElButton>
            </template>
          </ElPopconfirm>
        </div>
      </ElCol>
    </ElRow>
  </ZButtonOrCard>
</template>
