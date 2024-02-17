<script setup lang="ts">
import { toRefs, ref } from 'vue'
import { ElForm, ElFormItem, ElPopover, ElButton, ElSelect, ElOption, ElNotification } from 'element-plus'
import { ZSelectPerson, ZSelectActivityMode } from '..'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import type { TrophyMember, Trophy } from '@zvms/zvms4-types'
import api from '@/api'
import type { Component as VueComponent } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import { watch } from 'vue'
import { ZButton } from '..'

const user = useUserStore()
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    _id?: string // ObjectID
    award?: string
    mode?: TrophyMember['mode']
    trophy: Trophy
    size?: 'small' | 'default' | 'large'
    text?: boolean
    bg?: boolean
    icon?: VueComponent
    round?: boolean
    circle?: boolean
    color?: 'primary' | 'success'
    placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  }>(),
  {
    _id: '',
    mode: 'on-campus',
    award: '',
    text: true,
    bg: true,
    icon: CirclePlus,
    round: true,
    circle: false,
    size: 'default',
    color: 'primary',
    placement: 'bottom'
  }
)

const emits = defineEmits<{
  'update:_id': [string]
  'update:award': [string]
  'update:mode': [TrophyMember['mode']]
  submit: [TrophyMember | undefined]
}>()

const { _id, award, mode, trophy } = toRefs(props)

const member = ref<TrophyMember>({
  _id: _id.value ?? user._id,
  award: award.value ?? '',
  mode: mode.value,
  status:
    user.position.includes('department') || user.position.includes('admin')
      ? 'effective'
      : 'pending'
})

async function submit() {
  const result = await api.trophy.member.insert(trophy.value._id, member.value)
  if (result) {
    ElNotification({
      title: 'Successfully registered',
      type: 'success'
    })
  }
  emits('submit', member.value)
}

watch(() => member.value._id, () => (member.value._id = _id.value))
watch(() => member.value.award, () => (member.value.award = award.value))
watch(() => member.value.mode, () => (member.value.mode = mode.value))
</script>

<template>
  <ElPopover :title="t('activity.member.dialog.actions.title', { activity: trophy.name })" width="384px" :placement="placement">
    <ElForm label-position="right" label-width="72px">
      <ElFormItem :label="t('activity.form.name')">
        <ZSelectPerson :filter-start="4" v-model="member._id" full-width />
      </ElFormItem>
      <ElFormItem :label="t('activity.form.type')">
        <ElSelect v-model="member.award" class="w-full">
          <ElOption v-for="award in trophy.awards" :key="award.name" :label="award.name" :value="award.name">
            {{ award.name }}
            <span class="text-xs text-gray-400">{{ award.duration }} {{ t('activity.units.hour', Math.ceil(award.duration)) }}</span>
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem :label="t('activity.form.mode')">
        <ZSelectActivityMode v-model="member.mode" class="w-full" :allow="['on-campus', 'off-campus']" />
      </ElFormItem>
      <div class="flex justify-end">
        <ElButton text bg :icon="icon" type="primary" @click="submit">{{ t('activity.form.actions.submit') }}</ElButton>
      </div>
    </ElForm>
    <template #reference>
      <ZButton v-if="!circle" :text="text" :bg="bg" :size="size" :icon="icon" :round="round" :circle="circle" :type="color">
        <slot />
      </ZButton>
      <ZButton v-else :text="text" :bg="bg" :size="size" :icon="icon" :round="round" :circle="circle" :type="color" />
    </template>
  </ElPopover>
</template>
