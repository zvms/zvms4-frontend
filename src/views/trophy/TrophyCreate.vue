<script setup lang="ts">
import { ZTrophyCreate } from '@/components'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElPageHeader, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElSwitch, ElFormItem } from 'element-plus'
import { ref } from 'vue'

const { t } = useI18n()
const router = useRouter()

const autoCreate = ref(true)
</script>

<template>
  <div>
    <Transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__aninmated animate__fadeOutUp"
      appear
    >
      <ElPageHeader :icon="ArrowLeft" class="text-xl px-12 py-4" @back="router.push('/trophy')">
        <template #content>
          {{ t(`nav.breadcrumbs.view.trophy.create`) }}
        </template>
        <template #extra>
          <div style="text-align: right">
            <ElFormItem :label="t('activity.trophy.auto')">
              <ElSwitch v-model="autoCreate" :label="t('activity.trophy.auto')" />
            </ElFormItem>
          </div>
        </template>
        <template #breadcrumb>
          <Transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__aninmated animate__fadeOutRight"
            appear
          >
            <ElBreadcrumb :separator-icon="ArrowRight">
              <ElBreadcrumbItem>
                <ElButton text size="small" @click="router.push('/activity/')">
                  {{ t('nav.breadcrumbs.view.home') }}
                </ElButton>
              </ElBreadcrumbItem>
              <ElBreadcrumbItem>
                <ElButton text size="small" @click="router.push('/trophy')">
                  {{ t('nav.breadcrumbs.view.trophy.home') }}
                </ElButton>
              </ElBreadcrumbItem>
              <ElBreadcrumbItem>
                <ElButton text size="small">
                  {{ t('nav.breadcrumbs.view.trophy.create') }}
                </ElButton>
              </ElBreadcrumbItem>
            </ElBreadcrumb>
          </Transition>
        </template>
      </ElPageHeader>
    </Transition>
    <ZTrophyCreate class="px-24" :auto-create="autoCreate" />
  </div>
</template>
