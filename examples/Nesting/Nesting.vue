<script lang="ts" setup>
import { ConnectionMode, useElementsState, useVueFlow, VueFlow, MiniMap, Background, Controls } from '~/index'

const { onConnect } = useVueFlow({
  fitViewOnInit: true,
  connectionMode: ConnectionMode.Loose,
})
const { nodes, edges, addEdges } = useElementsState({
  nodes: [
    { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
    {
      id: '2',
      label: 'Node 2',
      position: { x: 100, y: 100 },
      class: 'light',
      style: { backgroundColor: 'rgba(255, 0, 0, 0.8)', width: '200px', height: '200px' },
      children: [
        {
          id: '2a',
          label: 'Node 2a',
          position: { x: 10, y: 50 },
        },
      ],
    },
    { id: '3', label: 'Node 3', position: { x: 320, y: 100 }, class: 'light' },
    {
      id: '4',
      label: 'Node 4',
      position: { x: 320, y: 200 },
      class: 'light',
      style: { backgroundColor: 'rgba(255, 0, 0, 0.7)', width: '300px', height: '300px' },
      children: [
        {
          id: '4a',
          label: 'Node 4a',
          position: { x: 15, y: 65 },
          class: 'light',
          extent: 'parent',
        },
        {
          id: '4b',
          label: 'Node 4b',
          position: { x: 15, y: 120 },
          class: 'light',
          style: { backgroundColor: 'rgba(255, 0, 255, 0.7)', height: '150px', width: '270px' },
          children: [
            {
              id: '4b1',
              label: 'Node 4b1',
              position: { x: 20, y: 40 },
              class: 'light',
            },
            {
              id: '4b2',
              label: 'Node 4b2',
              position: { x: 100, y: 100 },
              class: 'light',
            },
          ],
        },
      ],
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2a-4a', source: '2a', target: '4a' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e3-4b', source: '3', target: '4b' },
    { id: 'e4a-4b1', source: '4a', target: '4b1' },
    { id: 'e4a-4b2', source: '4a', target: '4b2' },
    { id: 'e4b1-4b2', source: '4b1', target: '4b2' },
  ],
})

onConnect((params) => addEdges([params]))
</script>
<template>
  <VueFlow>
    <MiniMap />
    <Controls />
    <Background />
  </VueFlow>
</template>
