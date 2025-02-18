<script lang="ts" setup>
import EdgeWrapper from '../../components/Edges/EdgeWrapper.vue'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import { useVueFlow } from '../../composables'
import { groupEdgesByZLevel } from '../../utils'
import MarkerDefinitions from './MarkerDefinitions.vue'

const { store } = useVueFlow()
const getType = (type?: string) => {
  const t = type ?? 'default'
  let edgeType = store.getEdgeTypes[t]
  if (!edgeType) {
    edgeType = store.getEdgeTypes.default
    console.warn(`Edge type "${type}" not found. Using fallback type "default".`)
  }
  return edgeType
}

const sourceNode = controlledComputed(
  () => store.connectionNodeId,
  () => {
    if (store.connectionNodeId) return store.getNodes[store.getNodes.map((n) => n.id).indexOf(store.connectionNodeId)]
  },
)
const connectionLineVisible = controlledComputed(
  () => store.connectionNodeId,
  () =>
    !!(
      sourceNode.value &&
      (typeof sourceNode.value.connectable === 'undefined' ? store.nodesConnectable : sourceNode.value.connectable) &&
      store.connectionNodeId &&
      store.connectionHandleType
    ),
)
const groups = controlledComputed(
  () => store.getEdges,
  () => groupEdgesByZLevel(store.getEdges, store.getNodes),
)
</script>
<script lang="ts">
export default {
  name: 'Edges',
}
</script>
<template>
  <svg
    v-for="group of groups"
    :key="group.level"
    :width="store.dimensions.width"
    :height="store.dimensions.height"
    class="vue-flow__edges vue-flow__container"
    :style="`z-index: ${group.level}`"
  >
    <MarkerDefinitions v-if="group.isMaxLevel" :default-color="store.defaultMarkerColor" />
    <g>
      <EdgeWrapper
        v-for="edge of group.edges"
        :key="edge.id"
        :edge="edge"
        :component="getType(edge.type)"
        :selectable="typeof edge.selectable === 'undefined' ? store.elementsSelectable : edge.selectable"
        :updatable="typeof edge.updatable === 'undefined' ? store.edgesUpdatable : edge.updatable"
      >
        <template #default="edgeProps">
          <slot :name="`edge-${edge.type}`" v-bind="edgeProps"></slot>
        </template>
      </EdgeWrapper>
      <ConnectionLine v-if="connectionLineVisible && sourceNode" :source-node="sourceNode">
        <template #default="customConnectionLineProps">
          <slot name="connection-line" v-bind="customConnectionLineProps"></slot>
        </template>
      </ConnectionLine>
    </g>
  </svg>
</template>
