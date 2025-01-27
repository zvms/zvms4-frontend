<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const router = useRouter()

const goToGroupList = () => {
  router.push('/group')
}

const goToClass = () => {
  router.push(`/group/${user.class_id}`)
}

if (
  user.position.includes('admin') ||
  user.position.includes('department') ||
  user.position.includes('auditor')
  ) {
  goToGroupList()
} else {
  if ( user.position.includes('secretary') ) {
    goToClass()
  } else {
    router.push('/not-found')
  }
}
</script>

<template>
</template>
