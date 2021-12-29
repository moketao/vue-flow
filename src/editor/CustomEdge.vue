<script lang="ts" setup>
import { getBezierPath, Position, EdgeProps, useVueFlow, applyEdgeChanges } from "~/index";
import { getMarkerEnd } from "~/components/Edges/utils";
import { applyChanges } from "~/utils";
import { selElement } from "~/editor/EditorTypes";
const { addSelectedNodes,nodesSelectionActive,store} = useVueFlow()
interface CustomEdgeProps<T = { text: string }> extends EdgeProps<T> {
  source: string
  target: string
  sourceHandleId?: string
  targetHandleId?: string
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  markerEnd?: string
  data?: T
}

const props = defineProps<CustomEdgeProps>()
const edgePath = computed(() =>
  getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  }),
)
const markerEnd = computed(() => getMarkerEnd(props.arrowHeadType, props.markerEndId))
const onClick = () => {
  selElement.value = props;
  applyEdgeChanges([{id:props.id,type:'select',selected:true}],store.edges)
}
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <path :id="props.id" class="vue-flow__edge-path" :d="edgePath" :marker-end="markerEnd" />
  <text>
    <textPath @click="onClick" :href="`#${props.id}`" :style="{ fontSize: '12px' }" startOffset="50%" text-anchor="middle">
      {{ props.data.label }}
    </textPath>
  </text>
</template>
<style scoped>
.vue-flow__edge-path{
  stroke-width: 3;
  stroke:#000;
}
</style>
