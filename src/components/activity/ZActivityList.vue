<script setup lang="ts">
import { ActivityDisplayInstance } from '@/../@types/activity'
import { ElDrawer, ElDialog } from 'element-plus'
import { toRefs } from 'vue'

const props = defineProps<{
  activities: ActivityDisplayInstance[]
  role: 'admin' | 'user'
}>()

const { activities, role } = toRefs(props)
</script>
