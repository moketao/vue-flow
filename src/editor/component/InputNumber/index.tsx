import type { VisualEditorComponent } from '../../EditorTypes'
import { useGlobalProperties , createFieldProps} from '../../EditorTypes'
import {NFormItem , NInputNumber} from "naive-ui";

export default {
  key: 'InputNumber',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 输入框',
  preview: () => (
    // @ts-ignore
    <NFormItem><NInputNumber placeholder="" /></NFormItem>
  ),
  render: ({ styles, block, props }) => {
    const { registerRef } = useGlobalProperties()
    return () => (
    // @ts-ignore
      <div><label>{props.value.valueKey}</label><NInputNumber
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


