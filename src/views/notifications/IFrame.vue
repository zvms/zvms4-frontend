<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { ElResult, ElEmpty } from 'element-plus'

const route = useRoute()
const user = useUserStore()

const availablePorts = [5246, 5000, 5173]
const availableTime = [
  // From 6:30 to 7:00
  { start: '6:30', end: '7:00' },
  // From 12:00 to 12:40
  { start: '12:00', end: '12:40' },
  // From 17:15 to 17:45
  { start: '16:15', end: '17:45' },
  // From 21:30 to 22:00
  { start: '21:30', end: '22:00' }
]

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
  src.value = `http://localhost:${port}`
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
</script>

<template>
  <div>
    <ElEmpty v-if="!user.position.includes('admin') || !isAvailableTime" />
    <ElResult v-else-if="!src" status="error" :subTitle="`Port ${port} is not available now.`" />
    <iframe
      v-else
      :src="src"
      allow="camera;microphone;midi;encrypted-media"
      class="w-full h-full border-0"
    ></iframe>
  </div>
</template>
