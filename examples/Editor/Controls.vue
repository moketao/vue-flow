<script lang="ts" setup>
import { useZoomPanHelper, FlowExportObject, Node, useVueFlow ,Position} from '../../src/index'
import { NIcon, NSpace, NCard, NButton, NTooltip} from 'naive-ui'
import { SaveTwotone } from '@vicons/antd'
import { RestoreTwotone } from '@vicons/material'
import { Add16Filled } from '@vicons/fluent'
import ControlBtn from './ControlBtn.vue'
import './controls.css'

const flowKey = 'example-flow'
const state = useStorage(flowKey, {
  elements: [],
  position: [NaN, NaN],
  zoom: 1,
} as FlowExportObject)

const getNodeId = () => `randomnode_${+new Date()}`

const { transform } = useZoomPanHelper()

const flow = useVueFlow()
const emit = defineEmits(['restore', 'add'])

const onSave = () => {
  let ob = flow.instance.toObject();
  console.log(ob);
  if (flow.instance) state.value = ob
}

const onRestore = () => {
  const flow: FlowExportObject | null = state.value

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
    position: { x: Math.random() * window.innerWidth - 100, y: Math.random() * window.innerHeight },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  } as Node
  flow.addElements([newNode])
}

const iconSave = ()=>h(SaveTwotone);
</script>
<template>
  <div class="EditorControls">
    <ControlBtn tip='保存' :icon="iconSave" />
    <n-button><n-icon size="22" @click="onRestore"><RestoreTwotone /></n-icon></n-button>
    <n-button><n-icon size="22" @click="onAdd"><Add16Filled /></n-icon></n-button>
  </div>
</template>
