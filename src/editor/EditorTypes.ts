import { CSSProperties, getCurrentInstance } from "vue";
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { Edge, Node } from "~/types";
export let selElement = ref<any>(null);
export interface GlobalProperties {
  $$refs: any
  $route: RouteLocationNormalizedLoaded
  $router: Router
}
// 组件模块
export interface ComponentModules {
  baseWidgets: VisualEditorComponent[] // 基础组件
  containerComponents: VisualEditorComponent[] // 容器组件
}
/**
 * @description 创建编辑器配置
 * @returns {} 返回编辑器注册组件的方法等
 */
export function createVisualEditorConfig() {
  const componentModules: ComponentModules = {
    baseWidgets: [],
    containerComponents: []
  }
  // const componentList: VisualEditorComponent[] = []
  const componentMap: Record<string, VisualEditorComponent> = {}
  return {
    componentModules,
    componentMap,
    registry: <
      _,
      Props extends Record<string, VisualEditorProps> = {},
      Model extends Record<string, string> = {}
      >(
      moduleName: keyof ComponentModules,
      key: string,
      component: {
        label: string
        preview: () => JSX.Element
        render: (data: {
          props: { [k in keyof Props]: any }
          model: Partial<{ [k in keyof Model]: any }>
          styles: CSSProperties
          block: VisualEditorBlockData
          custom: Record<string, any>
        }) => () => JSX.Element
        props?: Props
        model?: Model
        styles?: CSSProperties
      }
    ) => {
      const comp = { ...component, key, moduleName }
      componentModules[moduleName].push(comp)
      componentMap[key] = comp
    }
  }
}

export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>

let hasInitGlobal = false;
function initGlobalProp(){
  hasInitGlobal = true;
  const globalProperties = getCurrentInstance()!.appContext.config.globalProperties
  globalProperties.$$refs = {}
  window.$$refs = globalProperties.$$refs
}
export const useGlobalProperties = ()=>{
  if(!hasInitGlobal){
    initGlobalProp();
  }
  const globalProperties = getCurrentInstance()!.appContext.config
    .globalProperties as GlobalProperties

  const registerRef = (el, _vid: string) => el && (globalProperties.$$refs[_vid] = el)

  return {
    globalProperties,
    registerRef
  }
}
// 组件模块
export interface ComponentModules {
  baseWidgets: VisualEditorComponent[] // 基础组件
  containerComponents: VisualEditorComponent[] // 容器组件
}
export interface VisualEditorComponent {
  /** 组件name */
  key: string
  /** 组件所属模块名称 */
  moduleName: keyof ComponentModules
  /** 组件唯一id */
  _vid?: string
  /** 组件中文名称 */
  label: string
  /** 组件预览函数 */
  preview: () => JSX.Element
  /** 组件渲染函数 */
  render: (data: {
    props: any
    model: any
    styles: CSSProperties
    block: VisualEditorBlockData
    custom: Record<string, any>
  }) => () => JSX.Element
  /** 组件是否可以被拖拽 */
  draggable?: boolean
  /** 是否显示组件的样式配置项 */
  showStyleConfig?: boolean
  /** 组件属性 */
  props?: Record<string, VisualEditorProps>
  /** 动画集 */
  animations?: Animation[]
  /** 组件事件集合 */
  events?: { label: string; value: string }[]
  /** 组件样式 */
  styles?: CSSProperties
}
/**
 * @description 组件属性
 */
export interface VisualEditorBlockData {
  /** 组件id 时间戳, 组件唯一标识 */
  _vid: string
  /** 组件所属的模块（基础组件、容器组件） */
  moduleName: keyof ComponentModules
  /** 映射 VisualEditorConfig 中 componentMap 的 component对象 */
  uiKey: string
  /** 组件标签名称 */
  label: string
  /** 是否需要调整位置 */
  adjustPosition: boolean
  /** 当前是否为选中状态 */
  focus: boolean
  /** 当前组件的样式 */
  styles: CSSProperties
  /** 是否调整过宽度或者高度 */
  hasResize: boolean
  /** 组件的设计属性 */
  props: Record<string, any>
  /** 绑定的字段 */
  model: Record<string, string>
  /** 组件是否可以被拖拽 */
  draggable: boolean
  /** 是否显示组件样式配置项 */
  showStyleConfig?: boolean
  /** 动画集 */
  animations?: Animation[]
  /** 组件动作集合 */
  actions: Action[]
  /** 组件事件集合 */
  events: { label: string; value: string }[]
  [prop: string]: any
}
/**
 * @description 组件动作
 */
export interface Action {
  key: string
  name: string
  event: string
  handle: ActionHandle[]
}
/**
 * @description 组件动作事件处理
 */
export interface ActionHandle {
  key: string
  name: string
  link: string[]
  data?: {
    bind?: string
    recv?: string
  }
}
export enum VisualEditorPropsType {
  /** 输入框 */
  input = 'input',
  /** 数字输入框 */
  inputNumber = 'InputNumber',
  /** 颜色选择器 */
  color = 'color',
  /** 下拉选择器 */
  select = 'select',
  /** 表格 */
  table = 'table',
  /** 开关 */
  switch = 'switch',
  /** 模型绑定选择器 */
  modelBind = 'ModelBind',
  /** 可拖拽项 */
  crossSortable = 'CrossSortable'
}

export type VisualEditorProps = {
  type: VisualEditorPropsType
  /** 表单项标签名称 */
  label: string
  /** 表单项提示说明 */
  tips?: string
  /** 表单域标签的位置 */
  labelPosition?: string
  /** 表单项默认值 */
  defaultValue?: any
} & {
  /** 可选项 */
  options?: VisualEditorSelectOptions
  /** 是否可以多选 */
  multiple?: boolean
  /** 项属性配置 */
  showItemPropsConfig?: boolean
} & {
  max?: number
  min?: number
} & {
  table?: VisualEditorTableOption
}

/*---------------------------------------modelBind-------------------------------------------*/
interface EditorModelBindProp {
  label: string
  defaultValue?: any
  tips?: string
}

export function createEditorModelBindProp({
                                            label = '字段绑定',
                                            defaultValue,
                                            tips
                                          }: EditorModelBindProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.modelBind,
    label,
    tips,
    defaultValue
  }
}

/*---------------------------------------switch-------------------------------------------*/
interface EditorSwitchProp {
  label: string
  defaultValue?: boolean
  tips?: string
}

export function createEditorSwitchProp({
                                         label,
                                         defaultValue,
                                         tips
                                       }: EditorSwitchProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.switch,
    label,
    tips,
    defaultValue
  }
}

/*---------------------------------------input-------------------------------------------*/

interface EditorInputProp {
  label: string
  defaultValue?: any
  tips?: string
}

export function createEditorInputProp({
                                        label,
                                        defaultValue,
                                        tips
                                      }: EditorInputProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.input,
    label,
    tips,
    defaultValue
  }
}
/*---------------------------------------InputNumber -------------------------------------------*/

interface EditorInputNumberProp {
  label: string
  defaultValue?: any
  tips?: string
  max?: number
  min?: number
}

export function createEditorInputNumberProp({
                                              label,
                                              defaultValue,
                                              max,
                                              min,
                                              tips
                                            }: EditorInputNumberProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.inputNumber,
    label,
    tips,
    max,
    min,
    defaultValue
  }
}

/*---------------------------------------color-------------------------------------------*/

interface EditorColorProp {
  label: string
  defaultValue?: string
}

export function createEditorColorProp({ label, defaultValue }: EditorColorProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.color,
    label,
    defaultValue
  }
}

/*---------------------------------------select-------------------------------------------*/

export type VisualEditorSelectOptions = {
  label: string
  value: string | number | boolean | object
  [prop: string]: any
}[]

interface EditorSelectProp {
  label: string
  options: VisualEditorSelectOptions
  defaultValue?: any
  multiple?: boolean
  tips?: string
}

export function createEditorSelectProp({
                                         label,
                                         options,
                                         defaultValue,
                                         tips,
                                         multiple
                                       }: EditorSelectProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.select,
    label,
    defaultValue,
    tips,
    options,
    multiple
  }
}

/*---------------------------------------table-------------------------------------------*/

export type VisualEditorTableOption = {
  options: {
    label: string // 列显示文本
    field: string // 列绑定的字段
  }[]
  showKey: string
}

interface EditorTableProp {
  label: string
  option: VisualEditorTableOption
  defaultValue?: { label: string; value: string }[]
}

export function createEditorTableProp({
                                        label,
                                        option,
                                        defaultValue
                                      }: EditorTableProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.table,
    label,
    table: option,
    defaultValue
  }
}

/*---------------------------------------CrossSortableOptions-------------------------------------------*/

interface EditorCrossSortableProp {
  label: string
  labelPosition: 'top' | ''
  multiple?: boolean
  showItemPropsConfig?: boolean
  defaultValue?: string[] | VisualEditorSelectOptions
}

export function createEditorCrossSortableProp({
                                                label,
                                                labelPosition,
                                                multiple,
                                                showItemPropsConfig,
                                                defaultValue
                                              }: EditorCrossSortableProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.crossSortable,
    label,
    multiple,
    showItemPropsConfig,
    labelPosition,
    defaultValue
  }
}


//---------------------
export const createFieldProps = () => ({
  modelValue: createEditorInputProp({
    label: '默认值',
    defaultValue: ''
  }),
  name: createEditorModelBindProp({ label: '字段绑定', defaultValue: '' }),
  label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '输入框' }),
  type: createEditorSelectProp({
    label: '输入框类型',
    options: [
      { label: '文本', value: 'text' },
      { label: '数字', value: 'number' },
      { label: '文本域', value: 'textarea' },
      { label: '密码', value: 'password' },
      { label: '电话', value: 'tel' },
      { label: '小数点', value: 'digit' }
    ],
    defaultValue: 'text'
  }),
  placeholder: createEditorInputProp({ label: '占位提示文字', defaultValue: '请输入' }),
  colon: createEditorSwitchProp({ label: '是否在 label 后面添加冒号' }),
  disabled: createEditorSwitchProp({ label: '是否禁用输入框' }),
  error: createEditorSwitchProp({ label: '是否将输入内容标红' }),
  'error-message': createEditorInputProp({ label: '底部错误提示文案' }),
  'error-message-align': createEditorSelectProp({
    label: '错误提示文案对齐方式',
    options: [
      {
        label: '左对齐',
        value: 'left'
      },
      {
        label: '居中',
        value: 'center'
      },
      {
        label: '右对齐',
        value: 'right'
      }
    ],
    defaultValue: 'left'
  }),
  readonly: createEditorSwitchProp({ label: '是否为只读状态' }),
  required: createEditorSwitchProp({ label: '是否显示表单必填星号' }),
  'right-icon': createEditorInputProp({ label: '右侧图标名称或图片链接' }),
  rules: createEditorInputProp({ label: '表单校验规则' }),
  'left-icon': createEditorInputProp({ label: '左侧图标名称或图片链接' }),
  'arrow-direction': createEditorInputProp({
    label: '箭头方向',
    defaultValue: '',
    tips: '箭头方向，可选值为 left up down'
  }),
  autosize: createEditorSwitchProp({
    label: '自适应内容高度',
    defaultValue: false,
    tips: '是否自适应内容高度，只对 textarea 有效，可传入对象,如 { maxHeight: 100, minHeight: 50 }，单位为px'
  }),
  border: createEditorSwitchProp({ label: '是否显示内边框', defaultValue: true }),
  center: createEditorSwitchProp({ label: '内容垂直居中' }),
  'clear-icon': createEditorInputProp({
    label: '清除图标',
    tips: '清除图标名称或图片链接'
  }),
  'clear-trigger': createEditorSelectProp({
    label: '清除图标显示时机',
    options: [
      { label: '输入框不为空时展示', value: 'always' },
      { label: '输入框聚焦且不为空时展示', value: 'focus' }
    ],
    defaultValue: 'always',
    tips: '显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示'
  }),
  clearable: createEditorSwitchProp({
    label: '是否启用清除图标',
    defaultValue: false,
    tips: '是否启用清除图标，点击清除图标后会清空输入框'
  }),
  clickable: createEditorSwitchProp({ label: '是否开启点击反馈' }),
  'format-trigger': createEditorInputProp({ label: '格式化函数触发的时机' }),
  formatter: createEditorInputProp({ label: '输入内容格式化函数' }),
  'icon-prefix': createEditorInputProp({
    label: '图标类名前缀',
    tips: '图标类名前缀，同 Icon 组件的 class-prefix 属性'
  }),
  'input-align': createEditorSelectProp({
    label: '输入框对齐方式',
    options: [
      {
        label: '左对齐',
        value: 'left'
      },
      {
        label: '居中',
        value: 'center'
      },
      {
        label: '右对齐',
        value: 'right'
      }
    ],
    defaultValue: 'left'
  }),
  'label-align': createEditorSelectProp({
    label: '左侧文本对齐方式',
    options: [
      {
        label: '左对齐',
        value: 'left'
      },
      {
        label: '居中',
        value: 'center'
      },
      {
        label: '右对齐',
        value: 'right'
      }
    ],
    defaultValue: 'left'
  }),
  'label-width': createEditorInputProp({ label: '左侧文本宽度' }),
  maxlength: createEditorInputProp({ label: '输入的最大字符数', defaultValue: 500 }),
  'show-word-limit': createEditorSwitchProp({
    label: '是否显示字数统计',
    tips: '需要设置 maxlength 属性'
  })
})
