<script lang="ts" setup>
import { useHeaderStore } from '@/stores/header'
import { useUserStore } from '@/stores/user'
import { CreditCard } from '@element-plus/icons-vue'
import { ElButton, ElIcon } from 'element-plus'
import { ref } from 'vue'

const header = useHeaderStore()
const user = useUserStore()

header.setHeader('镇海中学漂流伞管理平台')

const status = ref(
  (
    [
      { type: 'Unborrowed', color: 'primary', label: '未借用' },
      { type: 'Borrowed', color: 'warning', label: '正在借用' },
      { type: 'Broken', color: 'danger', label: '已损坏' },
      { type: 'Lost', color: 'danger', label: '已丢失' },
      { type: 'Unknown', color: 'info', label: '未知状态' }
    ] as Array<{ type: string; color: 'primary' | 'warning' | 'danger' | 'info'; label: string }>
  )[Math.floor(Math.random() * 5)]
)
</script>

<template>
  <div class="p-12">
    <p class="text-2xl">{{ user.name }}，欢迎使用由校园卡加持下的镇海中学漂流伞管理系统。</p>
    <p class="pt-2">卡号：<ElButton :icon="CreditCard" text bg type="info">114514</ElButton></p>
    <p class="pt-2">
      您的漂流伞借用状态：<ElButton :type="status.color" text bg>{{ status.label }}</ElButton>
    </p>
    <p class="pt-2">您借用的伞的 Id：<ElButton type="warning" text bg>1919810</ElButton></p>
    <p class="pt-2 text-xl">您可以前往校园卡加持下的镇海中学漂流伞借用平台，进行相关操作，注意携带校园卡。</p>
  </div>
</template>
