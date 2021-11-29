import { NInput,NFormItem } from 'naive-ui'
import type { VisualEditorComponent } from '../../EditorTypes'
import { useGlobalProperties , createFieldProps} from '../../EditorTypes'
import {defineEmits} from 'vue'
export default {
  key: 'Input',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 输入框',
  preview: () => (
    <NFormItem>
      <NInput placeholder="" />
    </NFormItem>
  ),
  render: ({ styles, block, props }) => {
    // const { registerRef } = useGlobalProperties()
    console.log('###',styles,block,props);
    let rules = []
    try {
      rules = JSON.parse(props.rules)
    } catch (e) {}

    // const modelValue = computed({
    //   get() {
    //     return props.modelValue
    //   },
    //   set: (val) => (props.modelValue = val)
    // })

    let onChange = (v)=>{
      props.modelValue = v;
      props.onChange(v);
    }

    return () => (
      <NFormItem>
        <div style={styles}>
          <NInput
            // ref={(el) => registerRef(el, block._vid)}
            {...props}
            type="text"
            v-model:value={props.modelValue}
            // rules={rules}
            on-update:value={onChange}
          />
        </div>
      </NFormItem>
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


