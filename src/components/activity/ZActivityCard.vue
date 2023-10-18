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
  ElPopover,
} from 'element-plus'
import { useUserStore } from '@/stores/user'
import { ref, toRefs } from 'vue'

const user = useUserStore()

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
        <ElButton
          v-if="registered"
          :icon="CircleCheck"
          type="success"
          text
          round
          >已报名</ElButton
        >
        <ElButton v-else-if="passedToRegister" :icon="CircleClose" type="danger" text round
          >报名已经截止</ElButton
        >
        <ElButton v-else :icon="Warning" type="warning" text round>未报名</ElButton>
      </p>
      <ElForm>
        <ElFormItem label="解释">
          <p>{{ activity.description }}</p>
        </ElFormItem>
        <ElFormItem label="时间">
          <ElPopover placement="right" trigger="hover" :width="384">
            <template #reference>
              <ElButton text bg size="small" :icon="Time">{{
                dayjs(activity.time).format('YYYY-MM-DD HH:mm:ss')
              }}</ElButton>
            </template>
            <ElCountdown
              :value="dayjs(activity.time)"
              :title="
                '距离义工开始（' + dayjs(activity.time).format('YYYY-MM-DD HH:mm:ss') + '）还有'
              "
              format="DD 天 HH 小时 mm 分钟"
            />
          </ElPopover>
        </ElFormItem>
        <ElFormItem label="地点" v-if="activity.type === 'specified'">
          <ElButton text bg size="small" :icon="Location">{{ activity.registration.place }}</ElButton>
        </ElFormItem>
        <ElFormItem label="时长">
          <span class="text-xl">{{ activity.duration }}</span
          >&nbsp;
          <span style="font-size: 12px; color: --el-text-color-secondary">小时</span>
        </ElFormItem>
      </ElForm>
      <div v-if="activity.type === 'specified'">
        <p>
          已有 <span class="text-xl">{{ activity.members.length }}</span> 人报名
        </p>
        <ElDivider />
        <ElCountdown
          :value="dayjs(activity.registration.deadline)"
          :title="'剩余报名时间'"
          format="DD 天 HH 小时 mm 分钟"
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
          <span v-if="hovered">取消报名</span>
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
          <span v-if="hovered">报名</span>
        </ElButton>
      </div>
    </ElCard>
  </div>
</template>
