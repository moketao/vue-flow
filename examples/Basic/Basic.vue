<script lang="ts" setup>
import { VueFlow, MiniMap, Controls, Background, isNode, useVueFlow, addEdge } from '~/index'

const elements = ref([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])
const { onPaneReady, onNodeDragStop, onConnect, instance } = useVueFlow()
onPaneReady(({ fitView }) => {
  fitView({ padding: 0.1 })
})
onNodeDragStop((e) => console.log('drag stop', e))
onConnect((params) => addEdge(params, elements.value))

const updatePos = () =>
  elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
  })

const logToObject = () => console.log(instance.value.toObject())
const resetTransform = () => elements.value.push({ id: '1234', position: { x: 50, y: 50 }, label: 'Foobar' })
const toggleclasss = () => elements.value.forEach((el) => (el.class = el.class === 'light' ? 'dark' : 'light'))
</script>
<template>
  <VueFlow
    v-model="elements"
    class="vue-flow-basic-example"
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
    :zoom-on-scroll="false"
  >
    <Background />
    <MiniMap />
    <Controls />
    <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
      <button style="margin-right: 5px" @click="resetTransform">reset transform</button>
      <button style="margin-right: 5px" @click="updatePos">change pos</button>
      <button style="margin-right: 5px" @click="toggleclasss">toggle classs</button>
      <button @click="logToObject">toObject</button>
    </div>
  </VueFlow>
</template>
