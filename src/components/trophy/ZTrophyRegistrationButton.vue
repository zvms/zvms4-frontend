<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { CircleCheck, Warning, CircleClose, Remove, CirclePlus } from '@element-plus/icons-vue'
import type { Trophy } from '@zvms/zvms4-types'
import { toRefs, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import api from '@/api'
import { ZButton, ZTrophyAddMember } from '..'

const user = useUserStore()
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    type: 'action' | 'status'
    size?: 'small' | 'default' | 'large'
    trophy: Trophy
    award: string
    targetUser: string // ObjectId
    showText: boolean
  }>(),
  {
    size: 'default',
    showText: true
  }
)

const emits = defineEmits<{
  refresh: []
}>()

const { type, size, trophy, award, targetUser } = toRefs(props)

if (!size.value) {
  size.value = type.value === 'action' ? 'default' : 'small'
}

const lated = ref(dayjs().isAfter(dayjs(trophy.value.deadline)))

const registered = ref(trophy.value.members.find((member) => member._id === user._id))

const registeredToAward = ref(
  registered.value
    ? trophy.value.members.find((member) => member._id === user._id && member.award === award.value)
    : false
)

const status = ref<'danger' | 'success' | 'warning'>(lated.value ? 'danger' : registeredToAward.value ? 'success' : 'warning')

const action = ref(registered.value ? (registeredToAward.value ? 'warning' : 'danger') : 'primary')

const icons = {
  status: {
    success: CircleCheck,
    warning: Warning,
    danger: CircleClose
  },
  action: {
    primary: CirclePlus,
    danger: Remove,
    warning: CircleClose
  }
}

async function unregister() {
  const result = await api.trophy.member.remove(trophy.value._id, targetUser.value)
  if (result) {
    ElNotification({
      title: 'Successfully removed user',
      type: 'success'
    })
  }
  refresh()
}

const refresh = () => emits('refresh')
</script>

<template>
  <ZTrophyAddMember
    v-if="type === 'action' && action === 'primary'"
    :trophy="trophy"
    v-bind="$attrs"
    :_id="targetUser"
    :award="award"
    @submit="refresh"
  />
  <ZButton
    v-else-if="type === 'action' && action === 'warning'"
    :icon="Remove"
    text
    bg
    @click="unregister"
    :size="size"
    type="warning"
    v-bind="$attrs"
  >
    {{ t('action.registration.actions.unregister') }}
  </ZButton>
  <ZButton
    v-else-if="type === 'action'"
    :icon="CircleClose"
    v-bind="$attrs"
    type="danger"
    text
    bg
    disabled
  ></ZButton>
  <ZButton v-else-if="type === 'status'" text bg :size="size" :type="status" v-bind="$attrs" :icon="icons.status[status]">
    {{
      t(
        `activity.registration.status.${
          status === 'success'
            ? 'registered'
            : status === 'warning'
            ? 'unregistered'
            : 'unregisterable'
        }`
      )
    }}
  </ZButton>
</template>
