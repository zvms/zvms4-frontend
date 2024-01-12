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
  ElSelect,
  ElPageHeader
} from 'element-plus'
import type { Broadcast } from '@/../@types/broadcast'
import { ArrowLeft } from '@element-plus/icons-vue'

const { t } = useI18n()

const user = useUserStore()

const broadcast = reactive<Broadcast>({
  global: false,
  title: '',
  content: '',
  time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  publisher: user._id,
  receivers: [] as string[],
  anonymous: false,
  expire: dayjs().add(5, 'day').format('YYYY-MM-DD HH:mm:ss'),
  type: 'normal',
  _id: ''
})

const types = ['pinned', 'important', 'normal']
</script>

<template>
  <div>
    <ElPageHeader class="text-2xl px-12 py-6" @back="$router.push('/notifications/')" :icon="ArrowLeft">
      <template #content>
        {{ $t('broadcast.create.header') }}
      </template>
    </ElPageHeader>
    <p></p>
    <ElForm label-position="right" label-width="128px">
      <ElFormItem :label="t('broadcast.create.elements.title')">
        <ElInput v-model="broadcast.title" />
      </ElFormItem>
      <ElFormItem :label="t('broadcast.create.elements.content')">
        <ElInput type="textarea" :auto-size="{ minRows: 2 }" v-model="broadcast.content" />
      </ElFormItem>
      <ElFormItem :label="t('broadcast.create.elements.type')">
        <ElSelect v-model="broadcast.type" class="full">
          <ElOption
            v-for="mode in types"
            :key="mode"
            :label="t(`broadcast.create.elements.types.${mode}`)"
            :value="mode"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem :label="t('broadcast.create.elements.expire')" class="full">
        <ElDatePicker v-model="broadcast.expire" type="datetime" class="full" style="width: 100%" />
      </ElFormItem>
      <ElFormItem :label="t('broadcast.create.elements.global')">
        <ElSwitch v-model="broadcast.global" />
      </ElFormItem>
      <ElFormItem v-if="!broadcast.global" :label="t('broadcast.create.elements.receivers')">
      </ElFormItem>
      <ElFormItem :label="t('broadcast.create.elements.anonymous')">
        <ElSwitch v-model="broadcast.anonymous" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped>
.full {
  width: 100% !important;
}
</style>
