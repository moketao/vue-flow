import { defineComponent, PropType } from 'vue'
import type { VisualEditorBlockData } from './EditorTypes'
import { visualConfig } from './visual.config'
import { unref,toRaw } from "vue";

export default defineComponent({
  name: 'CompRender',
  props: {
    element: {
      type: Object as PropType<VisualEditorBlockData>,
      default: () => ({})
    }
  },
  setup(props) {
    let el = props.element.value;
    let uiKey = el.uiKey;
    console.log(uiKey)
    return visualConfig.componentMap[uiKey].render({
      styles: el.styles || {},
      props: el.props || {},
      model: {},
      block: el,
      custom: {}
    })
  }
})
