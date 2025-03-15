<script setup lang="ts">
import type { Log } from '../../../types/log'
import { toRefs } from 'vue'
import { ElCard, ElForm, ElFormItem, ElPagination } from 'element-plus'
import { ZActivityMember } from '@/components'
import dayjs from 'dayjs'

const props = defineProps<{
  log: Log
}>()

const { log } = toRefs(props)
</script>

<template>
  <div class="py-1">
    <ElCard shadow="hover">
      <ElForm>
        <ElFormItem label="Performer">
          <ZActivityMember :id="log.user" />
        </ElFormItem>
        <ElFormItem label="Performer ID">
          {{ log.user }}
        </ElFormItem>
        <ElFormItem label="Date">
          {{ dayjs.unix(log.timestamp).format('YYYY-MM-DD HH:mm:ss') }}
        </ElFormItem>
        <ElFormItem label="Data" style="overflow-wrap: break-word; white-space: pre-wrap">
          {{ log.data }}
        </ElFormItem>
        <ElFormItem label="IP">
          {{ log.ip }}
        </ElFormItem>
        <ElFormItem label="Clarity" v-if="log.clarity">
          {{ log.clarity }}
        </ElFormItem>
        <ElFormItem label="URL" style="overflow-wrap: break-word">
          {{ log.url }}
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>

<style scoped></style>
