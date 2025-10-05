<script lang="ts" setup>
import { ElLoading } from 'element-plus'
import { ref, onMounted, toRefs, watch } from 'vue'
import api from '@/api'
import type { User } from '@/../types'

const props = withDefaults(
  defineProps<{
    id: string
  }>(),
  {
    id: ''
  }
)

const { id } = toRefs(props)
const userGroups = ref<string[]>([])
const classGroupID = ref<string>()
const permissionsID = ref<string[]>([])
const person = ref<User>()

function refresh() {
  const loading = ElLoading.service({ fullscreen: true })
  if (id.value)
    api.user
      .readOne(id.value)
      .then((res) => {
        person.value = res as User
        loading.close()
        if (res) {
          userGroups.value = res.group
          return Promise.all(res.group.map((groupId) => api.group.readOne(groupId)))
        }
      })
      .then((groups) => {
        if (!groups) return
        const classGroup = groups.find((group) => group?.type === 'class')
        if (classGroup) classGroupID.value = classGroup?._id
        const permissionsGroup = groups.filter((group) => group?.type === 'permission')
        if (permissionsGroup.length)
          permissionsID.value = permissionsGroup
            .map((group) => group?._id)
            .filter(Boolean) as string[]
      })
      .catch(() => {
        loading.close()
      })
  else loading.close()
}

onMounted(refresh)

watch(id, refresh)
</script>
