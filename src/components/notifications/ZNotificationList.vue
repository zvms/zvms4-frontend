<script setup lang="ts">
import { ElCard, ElTable, ElTableColumn } from 'element-plus';
import { useWindowSize } from '@vueuse/core';
import {ref, watch} from 'vue'
import {getMyNotifications} from '@/api/notifications/read'
import type { Broadcast } from '@/../@types/broadcast';
import type { Ref } from 'vue';

const loading = ref(true)

// Deal with window size
const { width, height } = useWindowSize()
const tableMaxHeight = ref(height.value * 0.56)
watch(width, () => {
  tableMaxHeight.value = height.value * 0.56
})

const notifications: Ref<Broadcast[]> = ref([])

getMyNotifications('0').then((res: Broadcast[])=>{
    loading.value = false
    notifications.value = res ?? []
})
</script>

<template>
    <div :class="['card', 'pr-8', width < height ? 'pl-6' : '']" v-loading="loading">
        <ElCard shadow="never" :data="notifications">
            <ElTable>
                <ElTableColumn type="expand" label="Title">
                    <template #default="{row}">
                        <strong>{{ row.title }}</strong>
                    </template>
                </ElTableColumn>
            </ElTable>
        </ElCard>
    </div>
</template> 