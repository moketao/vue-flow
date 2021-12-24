import type { VisualEditorComponent } from '../../EditorTypes'
import { useGlobalProperties , createFieldProps} from '../../EditorTypes'
import {NFormItem , NInput} from "naive-ui";

export default {
  key: 'Input',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 输入框',
  preview: () => (
    // @ts-ignore
    <NInput placeholder="" />
  ),
  render: ({ styles, block, props }) => {
    const { registerRef } = useGlobalProperties()
    return () => (
    // @ts-ignore
      <div><label>{props.value.valueKey}</label><NInput
            ref={(el) => registerRef(el, block._vid)}
            {...props.value}
            type="text"
            v-model:value={props.value.value}
            // rules={rules}
            on-update:value={props.value.onChange}
          />
      </div>
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


