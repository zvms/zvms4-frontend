<script lang="ts" setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'
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
  ElPageHeader,
  ElCard
} from 'element-plus'
import type { Notification } from '@/../@types/notification'
import { ArrowLeft } from '@element-plus/icons-vue'

const { t } = useI18n()

const user = useUserStore()

const notification = reactive<Notification>({
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

const submit = () => {
  api.notification.create(broadcast)
  console.log(broadcast)
}
</script>

<template>
  <div class="px-4">
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      appear
    >
      <ElPageHeader
        class="text-2xl px-12 py-6"
        @back="$router.push('/notifications/')"
        :icon="ArrowLeft"
      >
        <template #content>
          {{ $t('notification.create.header') }}
        </template>
      </ElPageHeader>
    </Transition>
    <div class="px-8">
      <Transition
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOutLeft"
        appear
      >
        <ElCard shadow="hover">
          <ElForm label-position="right" label-width="108px">
            <ElFormItem :label="t('notification.create.elements.title')">
              <ElInput v-model="notification.title" />
            </ElFormItem>
            <ElFormItem :label="t('notification.create.elements.content')">
              <ElInput type="textarea" :auto-size="{ minRows: 2 }" v-model="notification.content" />
            </ElFormItem>
            <ElFormItem :label="t('notification.create.elements.type')">
              <ElSelect v-model="notification.type" class="full">
                <ElOption
                  v-for="mode in types"
                  :key="mode"
                  :label="t(`notification.create.elements.types.${mode}`)"
                  :value="mode"
                />
              </ElSelect>
            </ElFormItem>
            <ElFormItem :label="t('notification.create.elements.expire')" class="full">
              <ElDatePicker
                v-model="notification.expire"
                type="datetime"
                class="full"
                style="width: 100%"
              />
            </ElFormItem>
            <ElFormItem :label="t('notification.create.elements.global')">
              <ElSwitch v-model="notification.global" />
            </ElFormItem>
            <ElFormItem
              v-if="!notification.global"
              :label="t('notification.create.elements.receivers')"
            >
            </ElFormItem>
            <ElFormItem :label="t('notification.create.elements.anonymous')">
              <ElSwitch v-model="notification.anonymous" />
            </ElFormItem>
          </ElForm>
        </ElCard>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.full {
  width: 100% !important;
}
</style>
