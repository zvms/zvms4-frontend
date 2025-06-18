<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.ts'
import { reactive, ref, watch } from 'vue'
import type { Activity } from '../../types/activity.v2'
import dayjs from '@/plugins/dayjs'
import {
  ElForm,
  ElFormItem,
  ElAutocomplete,
  ElInputNumber,
  ElCard,
  ElScrollbar,
  ElButton,
  ElIcon
} from 'element-plus'
import { ZActivityList } from '@/components'
import { useWindowSize } from '@vueuse/core'
import api from '@/api'

const { t, locale } = useI18n()
const user = useUserStore()
const { height } = useWindowSize()

const tableMaxHeight = ref(height.value * 0.56)

watch(height, () => {
  tableMaxHeight.value = height.value * 0.56
})

const fields = reactive({
  school: '',
  classOf: new Date().getFullYear(),
  selectedActivities: [] as Activity[]
})

const suggestions = ['浙江省镇海中学', '宁波市镇海蛟川书院']

const cursor = ref('info')

function oxfordJoin(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

const times = reactive({
  onCampus: 0,
  offCampus: 0,
  total: 0
})

api.user.time.read(user._id).then((result) => {
  if (result) {
    times.onCampus = result['on-campus']
    times.offCampus = result['off-campus']
    times.total = result['on-campus'] + result['off-campus'] + result['social-practice']
  }
})

const print = () => {
  cursor.value = 'print'
  setTimeout(() => print())
}
</script>

<template>
  <div v-if="cursor === 'info'" class="px-12 py-6 w-full color-black">
    <ElCard shadow="never" class="w-full">
      <ElScrollbar ElScrollbar :height="tableMaxHeight + 'px'">
        <p class="text-2xl py-6 text-center">
          Fill in the information below to generate the certificate.
        </p>
        <ElForm class="py-2">
          <ElFormItem label="School">
            <ElAutocomplete
              v-model="fields.school"
              :fetch-suggestions="(_1, _2) => suggestions.map((x) => ({ value: x, label: x }))"
            ></ElAutocomplete>
          </ElFormItem>
          <ElFormItem label="YOG">
            <ElInputNumber
              v-model="fields.classOf"
              class="w-full"
              :min="new Date().getFullYear() - 1"
              :max="new Date().getFullYear() + 3"
            ></ElInputNumber>
          </ElFormItem>
          <ElFormItem label="Activities">
            <ZActivityList
              select-target="all"
              v-model="fields.selectedActivities"
              class="w-80% text-center"
              role="mine"
              embed
            />
          </ElFormItem>
          <div style="text-align: right">
            <ElButton text bg type="primary" @click="print">Generate the Certification</ElButton>
          </div>
        </ElForm>
      </ElScrollbar>
    </ElCard>
  </div>
  <div v-if="cursor === 'print'" id="print-area">
    <div v-if="locale === 'zh-CN'" class="px-12">
      <div class="flex font-serif only-print">镇海中学义工管理系统</div>
      <div style="right: 128px; top: 64px; position: fixed" class="only-print">
        <span class="lh-100% ml-2"
          ><ElIcon><img src="/favicon.ico" class="scale-50" alt="favicon" /></ElIcon
        ></span>
      </div>
      <p class="text-2xl py-6 font-serif text-center"><b>高中阶段义工服务证明</b></p>
      <p class="py-2 font-serif">
        兹证明{{ fields.school }} {{ fields.classOf }} 届学生{{
          user.name
        }}，在高中阶段积极参加各类志愿服务与社会实践活动，包括但不限于{{
          fields.selectedActivities.map((x) => x.name).join('、')
        }}等活动。其在高中阶段共完成：
      </p>
      <ul class="py-2 font-serif list-disc pl-5">
        <li>校内义工服务 {{ times.onCampus }} 小时，</li>
        <li>校外义工服务 {{ times.offCampus }} 小时，</li>
        <li>总社会实践活动 {{ times.total }} 小时。</li>
      </ul>
      <p class="py-2 font-serif">
        参加社会实践时，该同学表现良好，积极参与各项活动，志愿服务心强，展现了其极强的社会责任心。
      </p>
      <p class="py-1 font-serif text-right">签字或盖章：________________</p>
      <p class="py-1 font-serif text-right">{{ dayjs().format('YYYY 年 MM 月 DD 日') }}</p>
      <p class="py-1 font-serif text-right">{{ fields.school }}</p>
    </div>
    <div v-else-if="locale === 'en-US'" class="px-12">
      <div class="flex only-print">Zhenhai High School Volunteer Management System</div>
      <div style="right: 12px; top: 64px; position: fixed" class="only-print">
        <span class="lh-100% ml-2"
          ><ElIcon><img src="/favicon.ico" class="scale-50" alt="favicon" /></ElIcon
        ></span>
      </div>
      <p class="text-2xl py-6 font-sans text-center">Certificate of Volunteer Service</p>
      <p class="py-2 font-serif">
        This is to certify that {{ user.name }}, a student of {{ fields.school }}, Class of
        {{ fields.classOf }}, has actively participated in various volunteer and social practice
        activities during their high school years, including but not limited to
        {{ oxfordJoin(fields.selectedActivities.map((x) => x.name)) }}.
      </p>
      <ul class="py-2 font-serif list-disc pl-5">
        <li>{{ times.onCampus }} hours of on-campus volunteer service,</li>
        <li>{{ times.offCampus }} hours of off-campus volunteer service,</li>
        <li>{{ times.total }} hours of social practice.</li>
      </ul>
      <p class="py-2 font-serif">
        During these activities, the student demonstrated excellent performance, actively
        participated in all assigned tasks, and showed strong commitment to community service. Their
        actions reflected a high level of social responsibility and civic awareness.
      </p>
      <p class="py-1 font-serif">Signature or Stamp: ________________</p>
      <p class="py-1 font-serif">{{ dayjs().format('MMM DD, YYYY') }}</p>
      <p class="py-1 font-serif">{{ fields.school }}</p>
    </div>
  </div>
</template>

<style>
.only-print {
  display: none;
}

@media print {
  .only-print {
    display: block;
  }

  .no-print {
    display: none;
  }
}
</style>

<style>
@media print {
  html,
  body {
    width: 200mm !important;
    height: 297mm;
    margin: 0;
    padding: 0;
    overflow: visible;
  }

  p {
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  body * {
    visibility: hidden !important;
  }

  #print-area,
  #print-area * {
    visibility: visible !important;
  }

  #print-area {
    all: unset;
    padding: 0;
    margin: 0;
    width: 180mm;
    height: auto;
    font-size: 11pt;
    box-sizing: border-box;
    white-space: normal !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }
}
</style>
