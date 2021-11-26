<script lang="ts" setup>
import Marker from './Marker.vue'

interface MarkerDefinitionsProps {
  color: string
}

const props = withDefaults(defineProps<MarkerDefinitionsProps>(), {
  color: '',
})
</script>
<script lang="ts">
export default {
  name: 'MarkerDefinitions',
}
</script>
<template>
  <defs>
    <Marker id="vue-flow__arrowclosed">
      <polyline
        :stroke="props.color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        :fill="props.color"
        points="-11,-6 0,0 -11,6 -11,-6"
      />
    </Marker>
    <Marker id="vue-flow__arrow">
      <polyline
        :stroke="props.color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        fill="none"
        points="-11,-6 0,0 -11,6"
      />
    </Marker>
  </defs>
</template>
