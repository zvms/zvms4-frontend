<script lang="ts" setup>
import ZActivityRegisterCard from '@/components/activity/ZActivityRegisterCard.vue'
import type { SpecifiedActivity } from '@/../@types/activity'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { ElCol, ElRow, ElPagination } from 'element-plus'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

const registrations = ref<SpecifiedActivity[]>([
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a5',
    type: 'specified',
    description: '这是一条活动描述',
    name: '义工 C',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'first-instance',
        impression: '丁真',
        duration: 4,
        images: [],
        history: []
      }
    ],
    registration: {
      classes: [
        {
          class: 202306,
          max: 4
        },
        {
          class: 202302,
          max: 4
        }
      ],
      place: 'A101',
      deadline: dayjs('2023-11-15 00:00:00').toJSON()
    },
    duration: 4,
    date: dayjs('2023-12-13 00:00:00').toJSON(),
    createdAt: dayjs().toJSON(),
    updatedAt: dayjs().toJSON()
  },
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a5',
    type: 'specified',
    description: '这是一条活动描述',
    name: '义工 C',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'first-instance',
        impression: '丁真',
        duration: 4,
        images: [],
        history: []
      }
    ],
    registration: {
      classes: [
        {
          class: 202306,
          max: 4
        },
        {
          class: 202302,
          max: 4
        }
      ],
      place: 'A101',
      deadline: dayjs('2023-10-13 00:00:00').toJSON()
    },
    duration: 4,
    date: dayjs('2023-11-13 00:00:00').toJSON(),
    createdAt: dayjs().toJSON(),
    updatedAt: dayjs().toJSON()
  },
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a3',
    type: 'specified',
    description: '这是一条活动描述',
    name: '义工 C',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'first-instance',
        impression: '丁真',
        duration: 4,
        images: [],
        history: []
      }
    ],
    registration: {
      classes: [
        {
          class: 202306,
          max: 4
        },
        {
          class: 202302,
          max: 4
        }
      ],
      place: 'A101',
      deadline: dayjs('2023-11-13 00:00:00').toJSON()
    },
    duration: 4,
    date: dayjs().toJSON(),
    createdAt: dayjs().toJSON(),
    updatedAt: dayjs().toJSON()
  },
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a5',
    type: 'specified',
    description: '这是一条活动描述',
    name: '义工 C',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'first-instance',
        impression: '丁真',
        duration: 4,
        images: [],
        history: []
      }
    ],
    registration: {
      classes: [
        {
          class: 202306,
          max: 4
        },
        {
          class: 202302,
          max: 4
        }
      ],
      place: 'A101',
      deadline: dayjs('2023-10-13 00:00:00').toJSON()
    },
    duration: 4,
    date: dayjs('2023-11-13 00:00:00').toJSON(),
    createdAt: dayjs().toJSON(),
    updatedAt: dayjs().toJSON()
  },
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a5',
    type: 'specified',
    description: '这是一条活动描述',
    name: '义工 D',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'first-instance',
        impression: '丁真',
        duration: 4,
        images: [],
        history: []
      }
    ],
    registration: {
      classes: [
        {
          class: 202306,
          max: 4
        },
        {
          class: 202302,
          max: 4
        }
      ],
      place: 'A114',
      deadline: dayjs('2023-10-13 00:00:00').toJSON()
    },
    duration: 4,
    date: dayjs('2023-11-13 00:00:00').toJSON(),
    createdAt: dayjs().toJSON(),
    updatedAt: dayjs().toJSON()
  },
])

const page = ref(1)

const per = ref(width.value < height.value ? 2 : 3)
</script>

<template>
  <div>
    <ElRow class="py-3">
      <ElCol
        :span="24 / per"
        v-for="registration in registrations.filter(
          (_, id) => id < per * page && id >= per * (page - 1)
        )"
        :key="registration._id"
      >
        <ZActivityRegisterCard :activity="registration" />
      </ElCol>
    </ElRow>
    <ElPagination
      :total="registrations.length"
      layout="total, prev, pager, next, jumper"
      background
      :page-size="per"
      v-model:current-page="page"
    />
  </div>
</template>
