import { ElButton } from "element-plus";
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'ZButton',
  props: {
    circle: Boolean as PropType<boolean>
  },
  setup(props, { slots, attrs }) {
    return <ElButton {...attrs}>
      {!props.circle && slots.default ? slots.default() : null}
    </ElButton>
  }
})
