<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import {
  ElCol,
  ElDescriptions,
  ElDescriptionsItem,
  ElRow,
  ElTag,
  ElButton,
  ElDivider,
  ElCard,
  ElSwitch
} from 'element-plus'
import MaterialSymbolsDescriptionOutline from '@/icons/MaterialSymbolsDescriptionOutline.vue'
import { Refresh } from '@element-plus/icons-vue'
import TablerSum from '@/icons/TablerSum.vue'
import dayjs from 'dayjs'
import { ref } from 'vue'
import ZTimeJudge from '@/components/activity/ZTimeJudge.vue'
import { useHeaderStore } from '@/stores/header';

const header = useHeaderStore()
const user = useUserStore()

header.setHeader('主页')

const positionList = {
  student: '学生',
  secretary: '书记',
  auditor: '审核员',
  inspector: '督导员',
  admin: '管理员'
}

const nowTime = dayjs().hour()
const greeting = ref(nowTime < 12 ? '早上好' : nowTime < 18 ? '下午好' : '晚上好')

const useTransform = ref(true)

console.log(user)

function transform() {
  if (user.volTime.onCampus <= 30) return 0
  const result = Math.floor((user.volTime.onCampus - 30) / 3)
  return result > 6 ? 6 : result
}
</script>

<template>
  <div class="px-20 fill" style="width: 100%">
    <p class="text-2xl py-8">{{ greeting }}，{{ user.name }}。</p>
    <div class="py-4">
      <ElCard shadow="hover">
        <ElDescriptions class="fill" border>
          <template #title>
            <p class="text-xl">个人信息详情</p>
          </template>
          <template #extra>
            <ElButton type="success" :icon="Refresh" text bg circle @click="user.refreshUser" />
            <ElDivider direction="vertical" />
            <ElButton type="info" :icon="MaterialSymbolsDescriptionOutline" text bg circle />
          </template>
          <ElDescriptionsItem label="姓名">{{ user.name }}</ElDescriptionsItem>
          <ElDescriptionsItem label="学号">{{ user.id }}</ElDescriptionsItem>
          <ElDescriptionsItem label="班级">{{ user.class }}</ElDescriptionsItem>
          <ElDescriptionsItem label="身份">
            <ElTag v-for="tag in user.position" :key="tag">{{ positionList[tag] }}</ElTag>
          </ElDescriptionsItem>
        </ElDescriptions>
      </ElCard>
    </div>
    <div class="py-4">
      <ElCard shadow="hover">
        <ElRow>
          <ElCol :span="12">
            <p class="text-xl">义工时间统计</p>
          </ElCol>
          <ElCol :span="12" style="text-align: right">
            <ElButton
              type="success"
              :icon="Refresh"
              text
              bg
              circle
              @click="user.getUserActivityTime"
            />
            <ElDivider direction="vertical" />
            <ElButton type="info" :icon="TablerSum" text bg circle />
          </ElCol>
        </ElRow>
        <ElRow class="fill py-4 statistic">
          <ElCol :span="2" />
          <ElCol :span="4">
            <ZTimeJudge type="largeScale" :realTime="user.volTime.largeScale" />
          </ElCol>
          <ElCol :span="2"><ElDivider direction="vertical" class="height-full" /></ElCol>
          <ElCol :span="4">
            <ZTimeJudge type="onCampus" :realTime="user.volTime.onCampus" />
          </ElCol>
          <ElCol :span="1"><ElDivider direction="vertical" class="height-full" /></ElCol>
          <ElCol :span="4">
            <ZTimeJudge
              type="offCampus"
              :realTime="user.volTime.offCampus + (useTransform ? transform() : 0)"
            />
          </ElCol>
          <ElCol :span="1"><ElDivider direction="vertical" class="height-full" /></ElCol>
          <ElCol :span="4">
            超出折算<br />
            <ElSwitch v-model="useTransform" />
          </ElCol>
          <ElCol :span="2" />
        </ElRow>
      </ElCard>
    </div>
  </div>
</template>

<style scoped>
.fill {
  width: 100%;
}

.height-full {
  height: 100%;
}

.subtitle {
  position: relative;
  top: 0;
  transform: translateY(-10%);
}

.statistic {
  text-align: center;
}
</style>
