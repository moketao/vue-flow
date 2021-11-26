<script setup lang='ts'>
import { NButton, NTooltip } from 'naive-ui';
import IconItem from './IconItem.tsx';
let props = defineProps({
    tip:{type:String},
    icon:{type:Function},
})
let emit = defineEmits(['click'])
function onBtnClick(){
  emit('click');
}
</script>

<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <NButton @click="onBtnClick">
                <IconItem size="22" :icon="icon" />
            </NButton>
        </template>
        <span>{{tip}}</span>
    </NTooltip>
</template>
