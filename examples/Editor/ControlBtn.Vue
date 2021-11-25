<script setup lang='ts'>
import { NIcon, NSpace, NCard, NButton, NTooltip} from 'naive-ui'
import IconItem from './IconItem';
// import IconItem from './IconItem.tsx';
let props = defineProps({
    tip:{type:String},
    onClick:{type:Function},
    icon:{type:Function},
})
</script>

<template>
    <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
            <n-button>
                <IconItem size="22" @click="onClick" :icon="icon" />
            </n-button>
        </template>
        <span>{{tip}}</span>
    </NTooltip>
</template>
