<script setup lang="ts">
import type { Log } from '../../../types/log'
import { toRefs, ref } from 'vue'
import { ElCard, ElForm, ElFormItem, ElButton, ElPopover } from 'element-plus'
import { ZActivityMember } from '@/components'
import dayjs from 'dayjs'
import { pad } from '@/plugins/ua.ts'
import axios from 'axios'

const props = defineProps<{
  log: Log
}>()

const { log } = toRefs(props)
const loadingLookup = ref(false)

const lookupResult = ref({
  country: '',
  region: '',
  city: '',
  isp: '',
  longitude: 0,
  latitude: 0,
  timezone: ''
})

async function ipLookup() {
  loadingLookup.value = true
  const result = await axios.get('https://api.ip.sb/geoip/' + log.value.ip)
  lookupResult.value = result.data
  loadingLookup.value = false
}
</script>

<template>
  <div class="py-1 z-wrap">
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
          <ElPopover
            v-if="!pad() && log.ip !== '127.0.0.1'"
            @before-enter="ipLookup"
            v-loading="loadingLookup"
            width="384px"
          >
            <template #reference>
              <ElButton text bg round size="small" class="px-2">Lookup</ElButton>
            </template>
            <ElForm>
              <ElFormItem label="Country">
                {{ lookupResult.country }}
              </ElFormItem>
              <ElFormItem label="Region">
                {{ lookupResult.region }}
              </ElFormItem>
              <ElFormItem label="City">
                {{ lookupResult.city }}
              </ElFormItem>
              <ElFormItem label="ISP">
                {{ lookupResult.isp }}
              </ElFormItem>
              <ElFormItem label="Geo">
                {{ lookupResult.longitude }}, {{ lookupResult.latitude }}
              </ElFormItem>
              <ElFormItem label="Timezone">
                {{ lookupResult.timezone }}
              </ElFormItem>
            </ElForm>
          </ElPopover>
        </ElFormItem>
        <ElFormItem label="Clarity" v-if="log.clarity">
          {{ log.clarity }}
          <ElButton
            v-if="!pad()"
            text
            bg
            round
            size="small"
            class="px-2"
            tag="a"
            target="_blank"
            :href="`https://clarity.microsoft.com/projects/view/jwc2tctpr3/impressions?UserId=is%3B${log.clarity}&date=Last%203%20days`"
          >
            Track
          </ElButton>
        </ElFormItem>
        <ElFormItem label="URL">
          {{ log.url }}
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>

<style scoped></style>
