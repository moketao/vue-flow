<script lang="ts" setup>
import { ref } from 'vue'
import {
  addEdge,
  ArrowHeadType,
  Connection,
  Edge,
  Elements,
  FlowInstance,
  isNode,
  Position,
  removeElements,
  VueFlow,
  MiniMap,
  Controls,
  FlowElement,
  Background,
} from '~/index'
import './editor.css'


const onNodeDragStop = (e) => console.log('drag stop', e)
const onElementClick = (e) => console.log('click', e)
const elements = ref<Elements>([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 50, y: 155 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 350, y: 50 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 350, y: 100 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 350, y: 150 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { strokeWidth: 3 } },
  { id: 'e1-3', source: '1', target: '3', arrowHeadType: ArrowHeadType.ArrowClosed },
])

window['elements'] = elements

const vfInstance = ref<FlowInstance>()
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value))
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView({ padding: 0.1 })
  vfInstance.value = flowInstance
}

const updatePos = () => {
  elements.value = elements.value.map((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 200,
        y: Math.random() * 200,
      }
    }
    return el
  })
}

const logToObject = () => console.log(vfInstance.value?.toObject())
const resetTransform = () => vfInstance.value?.setTransform({ x: 0, y: 0, zoom: 1 })

const toggleclasss = () => {
  elements.value = elements.value.map((el) => {
    if (isNode(el)) el.class = el.class === 'light' ? 'dark' : 'light'
    return el
  })
}
</script>
<template>
  <VueFlow
    v-model="elements"
    class="vue-flow-basic-example"
    :default-zoom="1"
    :min-zoom="0.2"
    :max-zoom="4"
    @elements-remove="onElementsRemove"
    @connect="onConnect"
    @node-drag-stop="onNodeDragStop"
    @node-click="onElementClick"
    @load="onLoad"
  >
    <MiniMap />
    <Controls />
    <Background color="#aaa" :gap="8" />
    <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
      <button style="margin-right: 5px" @click="resetTransform">reset transform</button>
      <button style="margin-right: 5px" @click="updatePos">change pos</button>
      <button style="margin-right: 5px" @click="toggleclasss">toggle classs</button>
      <button @click="logToObject">toObject</button>
    </div>
  </VueFlow>
</template>
