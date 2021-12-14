import type { VisualEditorComponent } from '../../EditorTypes'
import { useGlobalProperties , createFieldProps} from '../../EditorTypes'
import {defineEmits} from 'vue'
import {NFormItem , NInput} from "naive-ui";

export default {
  key: 'Input',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 输入框',
  preview: () => (
    // @ts-ignore
    <NFormItem><NInput placeholder="" /></NFormItem>
  ),
  render: ({ styles, block, props }) => {
    // const { registerRef } = useGlobalProperties()
    let rules = []
    try {
      rules = JSON.parse(props.value.rules)
    } catch (e) {}

    return () => (
    // @ts-ignore
      <NFormItem><div style={styles}><NInput
            // ref={(el) => registerRef(el, block._vid)}
            {...props.value}
            type="text"
            v-model:value={props.value.modelValue}
            // rules={rules}
            on-update:value={props.value.onChange}
          />
      </div></NFormItem>
    )
  },
  events: [],
  props: createFieldProps(),
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent


