<script lang="ts" setup>
import type { SpecifiedActivity } from '@/../types'
import { ref } from 'vue'
import { ElCol, ElRow, ElPagination } from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { ZActivityDetails } from '@/components'

const { width, height } = useWindowSize()

const registrations = ref<SpecifiedActivity[]>([])

const page = ref(1)

const per = ref(width.value < height.value ? 2 : 3)
</script>

<template>
  <div>
    <ElRow class="py-3">
      <ElCol
        :span="24 / per"
        v-for="registration in registrations.filter(
          (_, id) => id < per * page && id >= per * (page - 1)
        )"
        :key="registration._id"
      >
        <ZActivityDetails :activity="registration" mode="register" />
      </ElCol>
    </ElRow>
    <ElPagination
      :total="registrations.length"
      layout="total, prev, pager, next, jumper"
      background
      :page-size="per"
      v-model:current-page="page"
    />
  </div>
</template>
