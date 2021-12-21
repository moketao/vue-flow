<script lang="ts" setup>
import Controls from './Controls.vue'
import CustomEdge from './CustomEdge.vue'
import CustomEdge2 from './CustomEdge2.vue'
import CustomLabel from './CustomLabel.vue'
import GatewayNode from './GatewayNode.vue'
import {
  VueFlow,
  addEdge,
  Connection,
  Edge,
  Elements,
  removeElements,
  isEdge,
  ArrowHeadType,
  FlowInstance, Node, ElementId, Position
} from "~/index";
import RightPanel from "./RightTabPanel/RightPanel.vue"
import './editor.css'
const initialElements: Elements = []

const elements = ref(initialElements)

import {selElement} from './EditorTypes'
import { CSSProperties } from "vue";
import EditorToolbar from "~/editor/EditorToolbar.vue";
const onElementsSel = ({event: MouseEvent, element: el}) => {
  selElement.value = el;
}
const onRestore = (els: Elements) => {
  console.log('onRestore');
  elements.value = JSON.parse(
    JSON.stringify(els),
  )
}
const changeLineWidth = (e) => {
  elements.value = elements.value.map((el:Edge) => {
    if (isEdge(el)){
      if(!el.style) {
        el.style = {strokeWidth:1};
        return el;
      }else{
        let style = el!.style! as CSSProperties;
        let strokeWidth = (parseInt(style.strokeWidth+'')|1) + 1;
        strokeWidth = strokeWidth> 2 ?1:strokeWidth;
        style.strokeWidth = strokeWidth;
        return {
          ...el,
          style: {...style, strokeWidth},
        }
      }
    }else{
      return el
    }
  })
}
const flowInstance = ref<FlowInstance>()
let id = 0
const getId = (): ElementId => `dndnode_${id++}`
const onConnect = (params: Edge | Connection) =>{
  if(params.source === params.target) return;
  params.arrowHeadType = ArrowHeadType.ArrowClosed;
  params.data = {label:'title'};
  params.type = 'custom';
  console.log(params);
  addEdge(params, elements.value);
}
const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}
const onElementsRemove = (elementsToRemove: Elements) => {
  return(elements.value = removeElements(elementsToRemove, elements.value))
}
const onLoad = (instance: FlowInstance) => {
  return (flowInstance.value = instance)
}
function getCn(t){
  switch (t) {
    case 'input':
      return '开始'
    case 'default':
      return '任务'
    case 'output':
      return '结束'
    default:
      return t;
  }
}
const onDrop = (event: DragEvent) => {
  console.log('拖拽',event);
  let offX = 0;
  let offY = 0;
  const type = event.dataTransfer?.getData('application/vueflow')
  if(type=='default'){
    offX = 75;
    offY = 100;
  }else {
    offX = 33;
    offY = 33;
  }
  const position = flowInstance.value!.project({ x: event.offsetX-offX, y: event.offsetY-offY })
  let data = { label: `${getCn(type)}` };
  switch (type) {
    case 'default':{
      //@ts-ignore
      data.progress = 0;
      data.man = [];
      break
    }
    case 'input':{
      break
    }
    case 'output':{
      break
    }
    case 'gateway':{
      break
    }
    default:
      break
  }
  const newNode = {
    id: getId(),
    type,
    position,
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    data: data,
  } as Node
  elements.value.push(newNode)
}
</script>
<template>
  <div class="EditorWrap" @drop="onDrop">
    <EditorToolbar class="aside" />
    <VueFlow
      v-model="elements"
      storage-key="example-flow-1231"
      :node-types="['gateway']"
      :edge-types="['custom', 'custom2']"
      @connect="onConnect"
      @elements-remove="onElementsRemove"
      @elementClick="onElementsSel"
      @load="onLoad"
      @dragover="onDragOver"
    >
      <template #node-gateway="props">
        <GatewayNode v-bind="props" />
      </template>
      <template #edge-custom="props">
        <CustomEdge v-bind="props" />
      </template>
      <template #edge-custom2="props">
        <CustomEdge2 v-bind="props" />
      </template>
      <Controls @restore="onRestore" @lineWidth="changeLineWidth" />
    </VueFlow>
    <RightPanel :titles="['常规设置','参与人列表','执行策略','邮件通知','高级设置','事件','执行情况']"/>
  </div>
</template>

<style lang="less">
.EditorWrap {
  flex-direction: column;
  display: flex;
  height: 100%;
  position: relative;
}

.EditorWrap .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%;
}

@media screen and (min-width: 768px) {
  .EditorWrap {
    flex-direction: row;
  }

  .EditorWrap .aside {
    width: 80px;
    max-width: 180px;
  }
}
</style>
