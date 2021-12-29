<script lang="ts" setup>
import Controls from './Controls.vue'
import CustomEdge from './CustomEdge.vue'
import CustomEdge2 from './CustomEdge2.vue'
import CustomLabel from './CustomLabel.vue'
import GatewayNode from './GatewayNode.vue'
import {selElement} from './EditorTypes'
import EditorToolbar from "~/editor/EditorToolbar.vue";
import { flowKeyServer, nodeType } from "~/editor/const_var";
import {
  VueFlow,
  addEdge,
  Edge,
  Elements,
  FlowInstance,
  Node,
  Position,
  useElementsState,
  useZoomPanHelper,
  useVueFlow,
  FlowExportObject,
  FlowExportObjectServer,
  getConnectedEdges,
  NodeChange,
  EdgeChange,
  FlowEvents, isNode, applyEdgeChanges
} from "~/index";
import RightPanel from "./RightTabPanel/RightPanel.vue"
import './editor.css'
import { useKeyPress } from "~/composables";
const flowInstance = ref<FlowInstance>()

const state = useStorage(flowKeyServer, {
  nodes: [],
  lines: [],
  position: [NaN, NaN],
  zoom: 1,
  maxID:0,
} as FlowExportObjectServer)

const { setTransform } = useZoomPanHelper()
const { instance, dimensions,onPaneReady,addSelectedNodes,nodesSelectionActive,getNodes, onConnect, onNodeDragStart,store} = useVueFlow()
const { nodes, edges, addNodes, setNodes, setEdges,addEdges } = useElementsState()
onPaneReady((instance) => (flowInstance.value = instance))
onNodeDragStart((e)=>{
  selElement.value = e.node;
})
const onEdgeClick = (e) => {
  selElement.value = e.edge;
  applyEdgeChanges([{id:e.edge.id,type:'select',selected:true}],store.edges)
}
const doDel = (keyPressed) => {
  const selectedNodes = store.getSelectedNodes
  const selectedEdges = store.getSelectedEdges
  if (keyPressed && (selectedNodes || selectedEdges)) {
    const connectedEdges = (selectedNodes && getConnectedEdges(selectedNodes, store.edges)) ?? []

    const nodeChanges: NodeChange[] = selectedNodes.map((n) => ({ id: n.id, type: 'remove' }))
    const edgeChanges: EdgeChange[] = [...selectedEdges, ...connectedEdges].map((e) => ({
      id: e.id,
      type: 'remove',
    }))

    store.hooks.nodesChange.trigger(nodeChanges)
    store.hooks.edgesChange.trigger(edgeChanges)
    store.nodesSelectionActive = false

    store.resetSelectedElements()
  }
}
const selectAll = () => {
  addSelectedNodes(getNodes.value)
  nodesSelectionActive.value = true
}
onMounted(()=>{
  store.elementsSelectable = true;
  useKeyPress(store.deleteKeyCode, doDel)
  useKeyPress(store.multiSelectionKeyCode, (keyPressed) => {
    store.multiSelectionActive = keyPressed
  })

  useKeyPress(store.selectionKeyCode, (keyPressed) => {
    store.selectionActive = store.selectionActive === true && keyPressed ? true : keyPressed && (store.selectionActive || store.elementsSelectable)
  })
})
onConnect((params) => {
  if(!params.data)params.data = {label:'tilte'}
  params.type = node_type.line;
  params.selectable = true;
  return addEdges([params])
});
const onRestore = (f:any) => {
  console.log('来了',f);
  let maxID = f.maxID||1;
  id=maxID;

  f.position = [0, 0];
  setNodes(f.nodes)
  setEdges(f.edges)
  setTransform({ x:0, y:0, zoom: f.zoom || 0 })
}
let id = 1
const getId = (): string => `${id++}`;
const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
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
  if (!flowInstance.value) return;
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
  let data = { label: `${getCn(type)}`, }
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
  addNodes([newNode])
}
let node_type = nodeType;
const elements = []
</script>
<template>
  <div class="EditorWrap" @drop="onDrop">
    <EditorToolbar class="aside" />
    <VueFlow
      v-model="elements"
      @edgeClick="onEdgeClick"
      storage-key="example-flow-1233"
      :node-types="['gateway']"
      :edge-types="[node_type.line, 'custom2']"
      @dragover="onDragOver"
    >
      <template #node-gateway="props">
        <GatewayNode v-bind="props" />
      </template>
      <template #edge-line="props">
        <CustomEdge v-bind="props" />
      </template>
      <template #edge-custom2="props">
        <CustomEdge2 v-bind="props" />
      </template>
    </VueFlow>
    <Controls @restore="onRestore" @del="doDel(true)" @selAll="selectAll" />
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
