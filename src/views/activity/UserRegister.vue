<script lang="ts" setup>
import ZActivityCard from '@/components/activity/ZActivityCard.vue';
import type { SpecifiedActivity } from '@/../@types/activity';
import { ref } from 'vue';
import dayjs from 'dayjs';
import { ElCol, ElRow } from 'element-plus';

const registrations = ref<SpecifiedActivity[]>([
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a5',
    type: 'specified',
    description: '这是一条活动描述',
    name: '义工 C',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'first-instance-approved',
        impression: '丁真'
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
    time: dayjs('2023-12-13 00:00:00').toJSON()
  },
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a5',
    type: 'specified',
    description: '这是一条活动描述',
    name: '义工 C',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b2b0b0b0',
        status: 'first-instance-approved',
        impression: '丁真'
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
    time: dayjs('2023-11-13 00:00:00').toJSON()
  },
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a3',
    type: 'specified',
    description: '这是一条活动描述',
    name: '义工 C',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b3',
        status: 'first-instance-approved',
        impression: '丁真'
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
    time: dayjs().toJSON()
  }
]);
</script>

<template>
  <ElRow>
    <ElCol :span="8" v-for="registration in registrations" :key="registration._id">
      <ZActivityCard :activity="registration" />
    </ElCol>
  </ElRow>
</template>
