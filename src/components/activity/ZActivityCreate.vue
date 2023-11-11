<script lang="ts" setup>
import type { ActivityInstance, ActivityType, PrizeClassify, PrizeLevel, PrizeType, Registration, SpecialActivityClassification } from '@/../@types/activity';
import { reactive } from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps<{
  type: ActivityType
}>()

const activity = reactive<ActivityInstance>({
  _id: '',
  type: props.type,
  name: '',
  description: '',
  members: [],
  duration: undefined as unknown as number,
  date: '',
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
})

const registration = reactive<Registration>({
  deadline: '',
  place: '',
  classes: []
})

const special = reactive({
  classify: '' as unknown as SpecialActivityClassification,
  prize: {
    level: '' as unknown as PrizeLevel,
    type: '' as unknown as PrizeType,
    classify: '' as unknown as PrizeClassify,
  }
})

const prize = {
  level: ['district', 'city', 'province', 'national', 'international'],
  type: ['personal', 'team'],
  classify: ['sports', 'academic', 'art', 'other']
}

const mode = ['on-campus', 'off-campus', 'large-scale']

const classifyOfSpecial = ['prize', 'import', 'club', 'deduction', 'other']
</script>

<template>
  <div class="px-4">
    <p class="pl-4 text-2xl">{{ t('activity.form.title', {
      type: t('activity.type.' + props.type + '.name')
    }) }}</p>

  </div>
</template>
