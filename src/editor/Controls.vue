<script lang="ts" setup>
import {
  useZoomPanHelper,
  FlowExportObject,
  Node,
  useVueFlow,
  Position,
  ArrowHeadType,
  Edge,
  FlowExportObjectServer
} from "../index";
import { NIcon, NSpace, NCard, NButton, NTooltip} from 'naive-ui'
import { SaveTwotone, BarcodeOutlined } from '@vicons/antd'
import { RestoreTwotone } from '@vicons/material'
import { Add16Filled } from '@vicons/fluent'
import { Clean } from '@vicons/carbon'
import ControlBtn from './ControlBtn.vue'
import './controls.css'
import { nodeType } from "~/editor/const_var";

const flowKey = 'example-flow2'
const flowKeyServer = 'example-flow2-server'
const state = useStorage(flowKey, {
  elements: [],
  position: [NaN, NaN],
  zoom: 1,
} as FlowExportObject)

// const stateServer = useStorage(flowKeyServer, {
//   nodes: [],
//   lines: [],
//   position: [0, 0],
// } as FlowExportObjectServer)


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
    // stateServer.value = toServerFormat(ob);
    // console.log(stateServer);
  }
}
function toServerFormat(_ob) {
  let ob = JSON.parse( JSON.stringify(toRaw(unref(_ob))) );
  delete ob.position;
  delete ob.zoom;
  let output = {nodes:[],lines:[]};
  ob.elements.forEach((o)=>{
    delete o.__vf;
    if(o.type===nodeType.line){
      delete o.sourceNode;
      delete o.targetNode;
      output.lines.push(o);
    }else {
      output.nodes.push(o);
    }
  })
  console.log(output);

  return output;
}
function fromServerFormat() {
  let ob = JSON.parse( JSON.stringify(toRaw(unref(stateServer.value))) );
  let output:FlowExportObject = {elements:[],position:[0,0]};
  console.log(ob);
  let dic = new Map<string,any>()
  ob.nodes.forEach((o)=>{
    dic.set(o.id,o)
    output.elements.push(o);
  })
  ob.lines.forEach((o)=>{
    o.sourceNode = dic.get(o.source)
    o.targetNode = dic.get(o.target)
    output.elements.push(o);
  })
  console.log(output);
  return output;
}
const onRestore = () => {
  const flow: FlowExportObject | null = state.value
  // const flow: FlowExportObject | null = fromServerFormat();
  console.log('onRestore',flow);
  if (flow) {
    flow.position = [0,0];
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
</script>
<template>
  <div class="EditorControls">
    <ControlBtn tip='保存' :icon="iconSave" @click="onSave" />
    <ControlBtn tip='恢复' :icon="iconRestoreTwotone" @click="onRestore" />
    <ControlBtn tip='添加' :icon="iconAdd16Filled" @click="onAdd" />
    <ControlBtn tip='清空' :icon="iconClean" @click="onClean" />
    <ControlBtn tip='粗细' :icon="iconBarcodeOutlined" @click="emit('lineWidth')" />
  </div>
</template>
