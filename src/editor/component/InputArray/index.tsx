import type { VisualEditorComponent } from '../../EditorTypes'
import { useGlobalProperties , createFieldProps} from '../../EditorTypes'
import {NFormItem , NDynamicTags} from "naive-ui";

export default {
  key: 'InputArray',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 输入框',
  preview: () => (
    // @ts-ignore
    <NFormItem><NDynamicTags placeholder="" /></NFormItem>
  ),
  render: ({ styles, block, props }) => {
    const { registerRef } = useGlobalProperties()

    const inputValueRef = ref('')

    const options = computed(() => {
      if (inputValueRef.value === null) {
        return []
      }
      const prefix = inputValueRef.value.split('@')[0]
      const inputSuffix = inputValueRef.value.split('@')[1]
      console.log(inputSuffix);
      if (inputSuffix) {
        return [
          {
            label: prefix + '@' + inputSuffix,
            value: prefix + '@' + inputSuffix
          }
        ]
      }
      return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
        return {
          label: prefix + suffix,
          value: prefix + suffix
        }
      })
    })



    // @ts-ignore
    return () => (
    // @ts-ignore
      <div><label>{props.value.valueKey}</label><NDynamicTags
            ref={(el) => registerRef(el, block._vid)}
            {...props.value}
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


