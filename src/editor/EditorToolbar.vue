<script lang="ts" setup>
import {ParallelGateway} from '@icon-park/vue-next'
const onDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}
</script>
<template>
  <div class="aside">
    <div title="开始" class="vue-flow__node-input" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'input')">
      开始
    </div>
    <div title="任务" class="vue-flow__node-default" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'default')">
      任务
    </div>
    <div title="结束" class="vue-flow__node-output" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'output')">
      结束
    </div>
    <div title="网关" class="vue-flow__node-gateway" style="padding-left: 2px" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'gateway')">
      <ParallelGateway theme="multi-color" size="62" :fill="['#333' ,'#d0d9e2' ,'#FFF' ,'#43CCF8']" :strokeWidth="2"/>
    </div>
  </div>
</template>
<style scoped>
.aside {
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: #fcfcfc;
}

.aside > * {
  margin-bottom: 10px;
  cursor: grab;
}

.aside .description {
  margin-bottom: 10px;
}
.vue-flow__node-input, .vue-flow__node-default, .vue-flow__node-output, .vue-flow__node-gateway{
  width: 50px;
  height: 50px;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding-bottom: 1px;
}
</style>
