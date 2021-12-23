<script lang="ts" setup>
import Handle from '../Handle/Handle.vue'
import { Position } from '../../types'
import type { NodeProps } from '../../types/node'

const props = withDefaults(defineProps<NodeProps>(), {
  data: () => {},
  connectable: false,
  sourcePosition: 'bottom' as Position,
  targetPosition: 'top' as Position,
})
</script>
<script lang="ts">
export default {
  name: 'DefaultNode',
  inheritAttrs: false,
}
</script>
<template>
  <Handle
    type="target"
    :position="props.targetPosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidTargetPos"
  />
  <slot v-bind="props">
    <component :is="props.data?.label" v-if="typeof props.data?.label !== 'string'" />
    <span v-else v-html="props.data?.label"></span>
  </slot>
  <Handle
    type="source"
    :position="props.sourcePosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidSourcePos"
  />
</template>
