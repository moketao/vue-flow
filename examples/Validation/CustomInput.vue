<script lang="ts" setup>
import { Position, Handle, ValidConnectionFunc } from '~/index'

interface CustomInputProps {
  isValidTargetPos: ValidConnectionFunc
}
const props = defineProps<CustomInputProps>()
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <div>Only connectable with B</div>
  <Handle type="source" :position="Position.Right" :is-valid-connection="props.isValidTargetPos" />
</template>
