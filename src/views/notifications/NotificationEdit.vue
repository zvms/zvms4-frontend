<script setup lang="ts">
import NotificationForm from './NotificationForm.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import api from '@/api'
import type { NotificationInstance } from '@zvms/zvms4-types'

const route = useRoute()

const id = route.params.id as string

const notification = ref<NotificationInstance>()

onMounted(() => {
  api.notification.read.specific(id).then((res) => (notification.value = res))
})
</script>

<tempalte>
  <NotificationForm mode="edit" data="notification"></NotificationForm>
</tempalte>
