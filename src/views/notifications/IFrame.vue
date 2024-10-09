<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { ElResult, ElEmpty } from 'element-plus'
import { temporaryToken } from '@/plugins/short-token'
import VConsole from 'vconsole'
import IFrameBrowser from './IFrameBrowser.vue'

const route = useRoute()
const user = useUserStore()

const availablePorts = [5246, 5000]
const availableTime = [] as { start: string; end: string }[]

const port = parseInt(route.params.port.toString())
const available = availablePorts.includes(port)

const isAvailableTime = availableTime.some(({ start, end }) => {
  const now = dayjs()
  const startTime = dayjs(now)
    .set('hour', Number(start.split(':')[0]))
    .set('minute', Number(start.split(':')[1]))
  const endTime = dayjs(now)
    .set('hour', Number(end.split(':')[0]))
    .set('minute', Number(end.split(':')[1]))
  return now.isAfter(startTime) && now.isBefore(endTime)
})

const src = ref('')

if (available && isAvailableTime) {
  src.value = `http://172.28.1.199:${port}`
} else {
  src.value = ''
}

const limit = 8 // Refresh every 8 minutes

setInterval(
  () => {
    const now = dayjs()
    const next = dayjs(now).add(limit, 'minute')
    if (now.isAfter(next)) {
      location.reload()
    }
  },
  limit * 60 * 1000
)

async function open() {
  const token = await temporaryToken(user._id)
  if (token) {
    new VConsole()
  }
}
</script>

<template>
  <div class="h-full">
    <ElEmpty v-if="!user.position.includes('admin')" />
    <!-- <ElResult v-else-if="!src" status="error" :subTitle="`Port ${port} is not available now.`" />
    <div v-else class="h-full">
      <div>
        <ElButton text bg @click="open"> Open VConsole </ElButton>
      </div>
      <iframe
        :src="src"
        allow="camera;microphone;midi;encrypted-media"
        class="w-full h-full border-0"
      ></iframe>
    </div> -->
    <IFrameBrowser class="h-full" />
  </div>
</template>
