<script lang="ts" setup>
import Handle from '../Handle/Handle.vue'
import { Position } from '../../types'
import type { NodeProps } from '../../types/node'
import { NProgress } from "naive-ui";
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
    <span class="span" v-else v-html="props.data?.label"></span>
    <div class="body" style="padding: 5px">
      <NProgress
        type="line"
        v-if="props.data?.progress"
        :percentage="props.data?.progress"
        :indicator-placement="'inside'"
        processing
      />
      <div class="man" v-html="m" v-for="m in props.data?.man"></div>
    </div>
  </slot>
  <Handle
    type="source"
    :position="props.sourcePosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidSourcePos"
  />
</template>
<style scoped>
.wrap{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.span{
  display: flex;
  background-color: #13599b;
  width: 100%;
  height: 22px;
  color: white;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-top: 2px solid #1c80c0;
  justify-content: center;
}
.body{
  display: flex;
  flex-direction: column;
}
.man{
  border: 1px solid #ececec;
  border-top: 0;
  margin-bottom: 2px;
}
</style>
