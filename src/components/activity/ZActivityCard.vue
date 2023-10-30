<script lang="ts" setup>
import type { SpecifiedActivity } from '@/../@types/activity'
import {
  CircleCheck,
  Close,
  Warning,
  ArrowRight,
  Location,
  CircleClose
} from '@element-plus/icons-vue'
import { Time } from '@icon-park/vue-next'
import dayjs from 'dayjs'
import {
  ElButton,
  ElCard,
  ElCountdown,
  ElDivider,
  ElForm,
  ElFormItem,
  ElPopover
} from 'element-plus'
import { useUserStore } from '@/stores/user'
import { ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

const user = useUserStore()
const { t } = useI18n()

const props = defineProps<{
  activity: SpecifiedActivity
}>()

console.log(props)

const { activity } = toRefs(props)

const emits = defineEmits(['register', 'unregister'])

const register = () => {
  emits('register')
}
const unregister = () => {
  emits('unregister')
}

const hovered = ref(false)

const passedToRegister = ref(dayjs(activity.value.registration.deadline).isBefore(dayjs()))
const registered = ref(activity.value.members.map((x) => x._id).includes(user._id))
</script>

<template>
  <div class="px-2">
    <ElCard shadow="hover" @mouseover="hovered = true" @mouseleave="hovered = false">
      <p class="text-xl py-4">
        {{ activity.name }}
        <ElButton v-if="registered" :icon="CircleCheck" type="success" text round>{{
          t('activity.columns.registration.registered')
        }}</ElButton>
        <ElButton v-else-if="passedToRegister" :icon="CircleClose" type="danger" text round>{{
          t('activity.columns.registration.unregisterable')
        }}</ElButton>
        <ElButton v-else :icon="Warning" type="warning" text round>{{
          t('activity.columns.registration.unregistered')
        }}</ElButton>
      </p>
      <ElForm label-position="right" label-width="96px">
        <ElFormItem :label="t('activity.columns.description')">
          <p>{{ activity.description }}</p>
        </ElFormItem>
        <ElFormItem :label="t('activity.columns.date')">
          <ElPopover placement="right" trigger="hover" :width="384">
            <template #reference>
              <ElButton text bg size="small" :icon="Time">{{
                dayjs(activity.date).format('YYYY-MM-DD HH:mm:ss')
              }}</ElButton>
            </template>
            <ElCountdown
              :value="dayjs(activity.date)"
              :title="
                t('activity.columns.registration.format', {
                  time: dayjs(activity.date).format('YYYY-MM-DD HH:mm:ss')
                })
              "
              format="MM-DD HH:mm:ss"
            />
          </ElPopover>
        </ElFormItem>
        <ElFormItem
          :label="t('activity.columns.registration.location')"
          v-if="activity.type === 'specified'"
        >
          <ElButton text bg size="small" :icon="Location">{{
            activity.registration.place
          }}</ElButton>
        </ElFormItem>
        <ElFormItem :label="t('activity.columns.reward')">
          <span class="text-xl">{{ activity.duration }}</span
          >&nbsp;
          <span style="font-size: 12px; color: --el-text-color-secondary">{{
            t('home.panels.time.unit', activity.duration)
          }}</span>
        </ElFormItem>
      </ElForm>
      <div v-if="activity.type === 'specified'">
        <p>
          <span class="text-xl pl-8">{{ activity.members.length }}</span>
          {{ t('activity.columns.registration.prompt-registered') }}
        </p>
        <ElDivider />
        <ElCountdown
          :value="dayjs(activity.registration.deadline)"
          :title="t('activity.columns.registration.remaining-time')"
          format="HH:mm:ss"
        />
      </div>
      <div style="text-align: right">
        <ElButton
          v-if="registered"
          :icon="Close"
          @click="unregister"
          type="danger"
          text
          :bg="hovered"
          :round="hovered"
          :circle="!hovered"
        >
          <span v-if="hovered">{{ t('activity.columns.registration.unregister') }}</span>
        </ElButton>
        <ElButton
          v-else
          :icon="ArrowRight"
          @click="register"
          type="primary"
          text
          :disabled="passedToRegister"
          :bg="hovered"
          :round="hovered"
          :circle="!hovered"
        >
          <span v-if="hovered">{{ t('activity.columns.registration.register') }}</span>
        </ElButton>
      </div>
    </ElCard>
  </div>
</template>
