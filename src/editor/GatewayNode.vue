<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { Handle, Position, Connection, Edge, NodeProps } from '~/index'
import {ParallelGateway} from '@icon-park/vue-next'
interface GatewayNodeProps extends NodeProps {
  data: {
    onChange: (event: any) => void
  }
  type: string
  selected?: boolean
  connectable?: boolean
  xPos?: number
  yPos?: number
  targetPosition?: Position
  sourcePosition?: Position
  dragging?: boolean
}
const props = defineProps<GatewayNodeProps>()

const targetHandleStyle: CSSProperties = { background: '#555' }
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: '-5px' }
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: '-5px', top: 'auto' }
const sourceHandleStyleC: CSSProperties = { ...targetHandleStyle }
const size = 66;
const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params)
</script>
<template>
  <div class="vue-flow__node-color-selector">
    <Handle type="target" :position="Position.Left" :style="targetHandleStyle" :on-connect="onConnect" />
    <div>
      <ParallelGateway theme="multi-color" size="66" :fill="['#333' ,'#d0d9e2' ,'#FFF' ,'#43CCF8']" :strokeWidth="2"/>
    </div>
    <Handle id="a" type="source" :position="Position.Top" :style="sourceHandleStyleA" />
    <Handle id="b" type="source" :position="Position.Bottom" :style="sourceHandleStyleB" />
    <Handle id="c" type="source" :position="Position.Right" :style="sourceHandleStyleC" />
  </div>
</template>
<style>
.vue-flow__node-gateway{
  border: 0;
}
</style>
