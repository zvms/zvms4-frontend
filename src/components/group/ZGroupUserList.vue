<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  ElFormItem,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElCard,
  ElPagination,
  ElInput,
  ElButton,
  ElCol,
  ElRow,
  ElPopover
} from 'element-plus'
import { ref, onMounted, toRefs, watch } from 'vue'
import api from '@/api'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import type { User, Group } from '@/../types'
import { ZUserGroup } from '@/components'
import { useWindowSize } from '@vueuse/core'
import { Box, Search } from '@element-plus/icons-vue'
import { pad } from '@/plugins/ua.ts'
import ZDataExport from '@/components/utils/ZDataExport.vue'

const router = useRouter()
const { height } = useWindowSize()
const { t, locale } = useI18n()
const userStore = useUserStore()

const props = withDefaults(
  defineProps<{
    id: string
    selectable?: boolean
    selectorCallback?: Function
    modelValue?: User[]
  }>(),
  {
    id: '',
    selectable: false
  }
)
const emits = defineEmits(['update:modelValue'])
const group = ref<Group>()
const users = ref<User[]>([])
const page = ref(1)
const perpage = ref(10)
const loading = ref(false)
const search = ref('')
const total = ref(0)

const { id, selectable, modelValue, selectorCallback } = toRefs(props)

const tableHeight = ref(height.value * 0.6)

watch(height, () => {
  tableHeight.value = height.value * 0.6
})

onMounted(() => {
  api.group.readOne(id.value).then((res) => {
    group.value = res
  })
})

watch(id, () => {
  api.group.readOne(id.value).then((res) => {
    group.value = res
  })
})

const refresh = () => {
  loading.value = true
  if (id.value) {
    api.group.reads
      .users(id.value, page.value, perpage.value, search.value, pwdm.value)
      .then((res) => {
        users.value = []
        users.value.push(...res.users)
        total.value = res.size
        loading.value = false
      }).catch(() => {
        loading.value = false
      })
  } else {
    api.user.read(search.value, page.value, perpage.value).then((res) => {
      if (res) {
        users.value = []
        users.value.push(...res.users)
        total.value = res.size
      }
      loading.value = false
    }).catch(() => {
      loading.value = false
    })
  }
}
onMounted(refresh)
watch(id, refresh)
watch(page, refresh)
watch(perpage, () => {
  page.value = 1
  refresh()
})

function handleSearch() {
  page.value = 1
  refresh()
}

const pwdm = ref(false)
watch(pwdm, refresh)

async function exportUserList() {
  const name =
    id.value === ''
      ? locale.value === 'zh-CN'
        ? `全校学生名单`
        : `Student List`
      : locale.value === 'zh-CN'
        ? `${group?.value?.name}学生名单`
        : `Student List of ${group?.value?.name}`
  if (id.value) {
    await api.group.template(id.value, name)
  }
}

function handleSelectionChange(val: string[]) {
  emits('update:modelValue', val)
}
</script>

<template>
  <div
    v-if="
      userStore.position.includes('admin') ||
      userStore.position.includes('department') ||
      userStore.groups.includes(id) ||
      selectable
    "
  >
    <ElCard shadow="never" v-loading="loading">
      <ElFormItem
        v-if="id && !selectable"
        :label="t('manage.groupDetails.userList.checkPasswordPrompt')"
        class="mb-4"
      >
        <ElSwitch v-model="pwdm" />
      </ElFormItem>
      <ElTable
        :data="users"
        stripe
        row-key="_id"
        @selection-change="handleSelectionChange"
        :max-height="tableHeight"
      >
        <ElTableColumn v-if="selectable" type="selection" reserve-selection />
        <ElTableColumn prop="name" :label="t('manage.groupDetails.userList.columns.name')" />
        <ElTableColumn prop="id" :label="t('manage.groupDetails.userList.columns.id')" />
        <ElTableColumn prop="group" :label="t('manage.groupDetails.userList.columns.group')">
          <template #default="{ row }">
            <ZUserGroup v-for="group in row.group" :key="group" :group="group" class="px-1" />
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="pwdm && !selectable"
          prop="password"
          :label="t('manage.groupDetails.userList.columns.pwdm')"
        >
          <template #default="{ row }">
            <span v-if="row.password" class="color-green">{{
              t('manage.groupDetails.userList.columns.pwdmStatus.true')
            }}</span>
            <span v-else class="color-red">{{
              t('manage.groupDetails.userList.columns.pwdmStatus.false')
            }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right">
          <template #header>
            <div>
              <ElInput
                v-if="pad() || (group?.type !== 'class' && id) || selectable"
                v-model="search"
                size="small"
                :placeholder="t('manage.groupList.columns.search')"
                :prefix-icon="Search"
                @blur="handleSearch"
                @keyup.enter="handleSearch"
              />
              <ElRow class="w-full" v-else>
                <ElCol :span="16">
                  <ElInput
                    class="mx-1"
                    v-model="search"
                    size="small"
                    :placeholder="t('manage.groupList.columns.search')"
                    :prefix-icon="Search"
                    @blur="handleSearch"
                    @keyup.enter="handleSearch"
                  />
                </ElCol>
                <ElCol :span="8">
                  <ElButton
                    v-if="id"
                    :icon="Box"
                    class="w-full mx-1"
                    @click="exportUserList"
                    text
                    bf
                    round
                    size="small"
                    type="warning"
                  >
                    {{ t('manage.exports.actions.export') }}
                  </ElButton>
                  <ElPopover v-else>
                    <template #reference>
                      <ElButton
                        :icon="Box"
                        class="w-full mx-1"
                        @click="exportUserList"
                        text
                        bf
                        round
                        size="small"
                        type="warning"
                      >
                        {{ t('manage.exports.actions.export') }}
                      </ElButton>
                    </template>
                    <ZDataExport type="users" :model-value="true" />
                  </ElPopover>
                </ElCol>
              </ElRow>
            </div>
          </template>
          <template #default="{ row }">
            <ElButton
              v-if="!selectable"
              type="primary"
              text
              bg
              size="small"
              @click="router.push(`/user/${row._id}`)"
            >
              {{ t('manage.groupList.columns.details') }}
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
      <ElPagination
        class="py-1 pt-4"
        v-model:current-page="page"
        v-model:page-size="perpage"
        :total="total"
        :pager-count="3"
        layout="total, prev, pager, next, sizes, jumper"
        background
        :page-sizes="[3, 5, 8, 10, 15, 20]"
      />
    </ElCard>
  </div>
</template>
