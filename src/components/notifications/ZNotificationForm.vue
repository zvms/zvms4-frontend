<script lang="ts" setup>
import { ref, toRefs } from 'vue'
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
  ElCard,
  ElButton
} from 'element-plus'
import type { NotificationInstance } from '@zvms/zvms4-types'
import { ArrowLeft, Refresh, ArrowRight } from '@element-plus/icons-vue'
import api from '@/api'
import { ZSelectPerson } from '@/components'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const user = useUserStore()
const router = useRouter()

const defaultNotification: NotificationInstance = {
  global: false,
  title: '',
  content: '',
  time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  publisher: user._id,
  receivers: [],
  anonymous: false,
  expire: dayjs().add(5, 'day').format('YYYY-MM-DD HH:mm:ss'),
  type: 'normal',
  _id: ''
}

const notification = ref<NotificationInstance>(defaultNotification)
const loading = ref(false)

const types = ['pinned', 'important', 'normal']

const submit = () => {
  loading.value = true
  api.notification.create(notification.value)
  router.push('/notifications')
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
        @back="router.push('/notifications/')"
        :icon="ArrowLeft"
      >
        <template #content>
          {{ t('notification.create.header') }}
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
          <ElForm label-position="right" label-width="108px" :model="notification">
            <ElFormItem
              :label="t('notification.create.elements.title')"
              required
              prop="title"
              :rules="[{ required: true, message: t('validation.notification.title.required') }]"
            >
              <ElInput v-model="notification.title" />
            </ElFormItem>
            <ElFormItem :label="t('notification.create.elements.content')">
              <ElInput type="textarea" :auto-size="{ minRows: 2 }" v-model="notification.content" />
            </ElFormItem>
            <ElFormItem
              :label="t('notification.create.elements.type')"
              required
              prop="type"
              :rules="[{ required: true, message: t('validation.notification.type.required') }]"
            >
              <ElSelect v-model="notification.type" class="full">
                <ElOption
                  v-for="mode in types"
                  :key="mode"
                  :label="t(`notification.create.elements.types.${mode}`)"
                  :value="mode"
                />
              </ElSelect>
            </ElFormItem>
            <ElFormItem
              :label="t('notification.create.elements.expire')"
              class="full"
              required
              prop="expire"
              :rules="[
                { required: true, message: t('validation.notification.expire.required') },
                {
                  validator: (rule, value, callback) => {
                    try {
                      if (dayjs(value).isBefore(dayjs(notification.time))) {
                        callback(t('validation.notification.expire.future'))
                      } else {
                        callback()
                      }
                    } catch (_) {
                      callback(t('validation.notification.expire.format'))
                    }
                  }
                }
              ]"
            >
              <ElDatePicker
                v-model="notification.expire"
                type="datetime"
                class="full"
                style="width: 100%"
              />
            </ElFormItem>
            <ElFormItem
              :label="t('notification.create.elements.global')"
              required
              prop="global"
              :rules="[{ required: true, message: t('notification.create.elements.global') }]"
            >
              <ElSwitch
                v-model="notification.global"
                :disabled="notification.receivers && notification?.receivers?.length > 0"
              />
            </ElFormItem>
            <ElFormItem
              v-if="!notification.global"
              :label="t('notification.create.elements.receivers')"
              required
              :rules="[
                {
                  required: notification.global === false,
                  message: t('validation.notification.receivers.required')
                }
              ]"
            >
              <ZSelectPerson
                v-model="notification.receivers"
                class="full"
                multiple
                full-width
                :filter-start="4"
              >
              </ZSelectPerson>
            </ElFormItem>
            <ElFormItem
              :label="t('notification.create.elements.anonymous')"
              required
              prop="anonymous"
              :rules="[{ required: true, message: t('notification.create.elements.anonymous') }]"
            >
              <ElSwitch v-model="notification.anonymous" />
            </ElFormItem>
            <div class="flex justify-end py-1">
              <ElButton
                type="warning"
                text
                bg
                :icon="Refresh"
                @click="router.push('/notifications/')"
              >
                {{ t('activity.form.actions.reset') }}
              </ElButton>
              <ElButton
                type="primary"
                text
                bg
                :icon="ArrowRight"
                @click="submit"
                :loading="loading"
              >
                {{ t('activity.form.actions.submit') }}
              </ElButton>
            </div>
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
