<script lang="ts" setup>
import Controls from './Controls.vue'
import { VueFlow, addEdge, Connection, Edge, Elements, removeElements } from '~/index'
import './editor.css'
const initialElements: Elements = []

const elements = ref(initialElements)

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => {
  console.log(elementsToRemove);
  elements.value = removeElements(elementsToRemove, elements.value)
}
const onRestore = (els: Elements) => {
  console.log('onRestore');
  elements.value = JSON.parse(
    JSON.stringify(els),
  )
}
</script>
<template>
  <VueFlow v-model="elements" storage-key="example-flow-1231" @elements-remove="onElementsRemove" @connect="onConnect">
    <Controls @restore="onRestore" />
  </VueFlow>
</template>
