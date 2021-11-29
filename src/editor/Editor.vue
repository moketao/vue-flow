<script lang="ts" setup>
import Controls from './Controls.vue'
import { VueFlow, addEdge, Connection, Edge, Elements, removeElements, isEdge, ArrowHeadType } from "~/index";
import './editor.css'
const initialElements: Elements = []

const elements = ref(initialElements)

const onElementsRemove = (elementsToRemove: Elements) => {
  console.log(elementsToRemove);
  elements.value = removeElements(elementsToRemove, elements.value)
}
import {selElement} from './EditorTypes'
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
  elements.value = elements.value.map((el) => {
    if (isEdge(el)){
      if(!el.style) {
        el.style = {strokeWidth:1};
        return el;
      }else{
        let strokeWidth = el.style.strokeWidth+1;
        strokeWidth = strokeWidth> 2 ?1:strokeWidth;
        el.style.strokeWidth = strokeWidth;
        return {
          ...el,
          style: {...el.style, strokeWidth},
        }
      }
    }else{
      return el
    }
  })
}
const onConnect = (params: Edge | Connection) =>{
  params.arrowHeadType = ArrowHeadType.ArrowClosed;
  addEdge(params, elements.value);
}
</script>
<template>
  <VueFlow v-model="elements" storage-key="example-flow-1231" @connect="onConnect" @elements-remove="onElementsRemove"
    @elementClick="onElementsSel"
  >
    <Controls @restore="onRestore" @lineWidth="changeLineWidth" />
  </VueFlow>
</template>
