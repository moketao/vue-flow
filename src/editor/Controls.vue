<script lang="ts" setup>
import { useZoomPanHelper, FlowExportObject, Node, useVueFlow, Position, ArrowHeadType } from "../index";
import { NIcon, NSpace, NCard, NButton, NTooltip} from 'naive-ui'
import { SaveTwotone, BarcodeOutlined } from '@vicons/antd'
import { RestoreTwotone } from '@vicons/material'
import { Add16Filled } from '@vicons/fluent'
import { Clean } from '@vicons/carbon'
import ControlBtn from './ControlBtn.vue'
import CompRender from './comp-render.tsx'
import './controls.css'

const flowKey = 'example-flow2'
const state = useStorage(flowKey, {
  elements: [],
  position: [NaN, NaN],
  zoom: 1,
} as FlowExportObject)

import {selElement} from "~/editor/EditorTypes";

watch(()=>selElement.value,(v, oldValue, onInvalidate)=>{
  modelValue.value = v!.data.label
})

const getNodeId = () => `randomnode_${+new Date()}`

const { transform } = useZoomPanHelper()

const flow = useVueFlow()
const emit = defineEmits(['restore', 'add','lineWidth'])

const onSave = () => {
  console.log('save');
  if (flow.instance) {
    let inst = flow.instance;
    let ob = inst.toObject();
    state.value = ob;
  }
}

const onRestore = () => {
  const flow: FlowExportObject | null = state.value
  console.log('onRestore');
  if (flow) {
    const [x = 0, y = 0] = flow.position
    emit('restore', flow.elements ?? [])
    transform({ x, y, zoom: flow.zoom || 0 })
  }
}

const onAdd = () => {
  const newNode = {
    id: `random_node-${getNodeId()}`,
    data: { label: 'Added node' },
    position: { x: Math.random() * (window.innerWidth - 200)+100, y: Math.random() * (window.innerHeight - 200)+100 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  } as Node
  flow.addElements([newNode])
}

function onClean(){
  if (flow) {
    flow.setElements([],true);
  }
}
const iconSave = ()=>h(SaveTwotone);
const iconRestoreTwotone = ()=>h(RestoreTwotone);
const iconAdd16Filled = ()=>h(Add16Filled);
const iconClean = ()=>h(Clean);
const iconBarcodeOutlined = ()=>h(BarcodeOutlined);

let onChange = (v)=>{
  selElement.value!.data!.label = v;
}
let modelValue = computed({get:()=> {
  return selElement.value!.data.label
},set:(v)=>{
  onChange(v)
}});
let prop = computed({
  get:()=>{
    return {modelValue:modelValue.value,onChange:onChange};
  }
})
let el = computed({
  get:()=>{
    return {componentKey:'Input',props:prop};
  }
})
</script>
<template>
  <div class="EditorControls">
    <ControlBtn tip='保存' :icon="iconSave" @click="onSave" />
    <ControlBtn tip='恢复' :icon="iconRestoreTwotone" @click="onRestore" />
    <ControlBtn tip='添加' :icon="iconAdd16Filled" @click="onAdd" />
    <ControlBtn tip='清空' :icon="iconClean" @click="onClean" />
    <ControlBtn tip='粗细' :icon="iconBarcodeOutlined" @click="emit('lineWidth')" />
    <CompRender v-if="selElement" :element="el"></CompRender>
  </div>
</template>
