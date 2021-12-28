<script lang="ts" setup>
import { useZoomPanHelper,FlowExportObject,Node,useVueFlow,Position,Edge,FlowExportObjectServer } from "../index";
import { NIcon, NSpace, NCard, NButton, NTooltip} from 'naive-ui'
import { SaveTwotone, BarcodeOutlined } from '@vicons/antd'
import { RestoreTwotone } from '@vicons/material'
import { Add16Filled } from '@vicons/fluent'
import { Clean } from '@vicons/carbon'
import ControlBtn from './ControlBtn.vue'
import './controls.css'
import { flowKeyServer, nodeType } from "~/editor/const_var";

const flowKey = 'example-flow2'

const state = useStorage(flowKey, {
  nodes: [],
  edges: [],
  position: [NaN, NaN],
  zoom: 1,
  maxID:0,
} as FlowExportObject)

const stateServer = useStorage(flowKeyServer, {
  nodes: [],
  lines: [],
  position: [NaN, NaN],
} as FlowExportObjectServer)


const getNodeId = () => `randomnode_${+new Date()}`

const { setTransform } = useZoomPanHelper()

const flow = useVueFlow()
const emit = defineEmits(['restore', 'add','lineWidth'])

const onSave = () => {
  console.log('save');
  if (flow.instance) {
    let inst = flow.instance;
    let ob = flow.instance.value.toObject();
    // state.value = ob;
    stateServer.value = toServerFormat(ob);
    console.log(stateServer);
  }
}
function toServerFormat(_ob) {
  // let ob = JSON.parse( JSON.stringify(toRaw(unref(_ob))) );
  let ob = JSON.parse( JSON.stringify(_ob) );
  delete ob.position;
  delete ob.zoom;
  let output = {nodes:[],lines:[]} as any;
  //todo: 结构变动，github 上的老外 增加 nodes / edges ，去掉了 elements，导致此处需要修改
  ob.nodes.forEach((o)=>{
    delete o.__vf;
    output.nodes.push(o);
  })
  ob.edges.forEach((o)=>{
    delete o.__vf;
    delete o.sourceNode;
    delete o.targetNode;
    output.lines.push(o);
  })
  console.log(output);
  return output;
}
function fromServerFormat() {
  // let ob = JSON.parse( JSON.stringify(toRaw(unref(stateServer.value))) );
  let ob = JSON.parse( JSON.stringify(stateServer.value) );
  let output:FlowExportObject = {nodes:[],edges:[],position:[0,0],zoom:1,maxID:0};
  console.log(ob);
  let dic = new Map<string,any>()
  ob.nodes.forEach((o)=>{
    if(parseInt(o.id)>=output.maxID)output.maxID=parseInt(o.id);
    dic.set(o.id,o)
    output.nodes.push(o);
  })
  ob.lines.forEach((o)=>{
    if(parseInt(o.id)>=output.maxID)output.maxID=parseInt(o.id);
    o.sourceNode = dic.get(o.source)
    o.targetNode = dic.get(o.target)
    output.edges.push(o);
  })
  console.log(output);
  return output;
}
const onRestore = () => {
  // const flow: FlowExportObject | null = state.value
  const flow: FlowExportObject | null = fromServerFormat();
  console.log('onRestore',flow);
  if (flow) {
    flow.position = [0,0];
    const [x = 0, y = 0] = flow.position
    emit('restore', flow)
    setTransform({ x, y, zoom: flow.zoom || 0 })
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
  </div>
</template>
<style scoped>
.EditorControls{
  position: absolute;
  z-index: 99;
  display: flex;
  left: 20%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
}
</style>
<style>
.EditorControls .n-button{
  margin: 5px;
}
.EditorControls .n-form-item{
  --label-height:5px !important;
  --feedback-height:6px !important;
}
</style>
