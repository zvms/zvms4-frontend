<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElSwitch,
  ElOption,
  ElSelect
} from 'element-plus'

const { t } = useI18n()
const props = defineProps<{}>()

const user = useUserStore()

const broadcast = reactive({
  global: false,
  title: '',
  content: '',
  time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  publisher: user._id,
  recievers: [],
  anonymous: false
})
</script>

<template>
  <div>
    <p class="text-2xl">
      {{ $t('broadcast.create.title') }}
    </p>
    <ElForm>
      <ElFormItem label="标题">
        <ElInput v-model="user.name" />
      </ElFormItem>
    </ElForm>
  </div>
</template>
