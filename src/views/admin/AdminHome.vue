<script lang="ts" setup>
import { ElTabs, ElTabPane } from 'element-plus'
import ModifyPassword from '@/views/preferences/ModifyPassword.vue'
import UserPermission from '@/views/preferences/UserPermission.vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const tabs = [
  {
    label: '重置密码',
    component: ModifyPassword,
    value: 'reset',
    disabled: !user
  },
  {
    label: '修改权限',
    component: UserPermission,
    value: 'modify'
  },
  {
    label: '编辑测试',
    component: ModifyPassword,
    value: 'test'
  }
]
</script>
