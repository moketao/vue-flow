<template>
  <div :class="['tab',{on}]" @click="onClick"><span>{{title}}</span></div>
</template>

<script setup lang="ts">
let props = defineProps({
  title:{
    type:String
  },
  titleNow:{
    type:String
  },
  show:{
    type:Boolean
  }
})
let emit = defineEmits(['update:show'])
let isShow = computed(()=>props.show);
let on = computed(()=> props.titleNow == props.title)
function onClick(){
  if(
    (isShow.value && on.value)||
    !isShow.value
  ){
    emit('update:show',!isShow.value)
  }
}
</script>

<style scoped>
.tab{
  writing-mode: vertical-lr;
  user-select: none;
  font-size: 12px;
  letter-spacing: 3px;
  padding: 8px 3px 8px 3px;
  background-color: white;
  border:1px solid #c6cdd5;
  border-right-color: #dee2ea;
  border-radius: 2px;
  cursor: pointer;
  color: #b3bec9;
  display: flex;
  flex-shrink: 1;
  border-bottom-width: 0;
  transition: width 0.15s;
  width: 20px;
}
.tab span{
  transition: color 0.2s;
}
.tab.on{
  width: 22px;
  color: #055fbd;
  border-color: #b8c0cb;
  border-right-color: #f9fbfc;
  border-bottom-width: 1px;
  border-bottom-color: rgba(12, 38, 51, 0.24);
  box-shadow: -1px 1px 1px 1px #eff2f5;
}
.tab:last-child{
  border-bottom-width: 1px;
}
.tab:hover{
  background-color: #ffffff;
  color: #2f6298;
}
.tab:active{
  background-color: #ffffff;
  color: #1a192b;
}
</style>
