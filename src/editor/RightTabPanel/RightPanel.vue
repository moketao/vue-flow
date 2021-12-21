<template>
  <div :class="['PanelWrap',{show}]" :style="{zIndex}">
    <div class="tabs">
      <RightTab :titleNow="titleNow" @click="onTabClick(title)" v-for="title in titles" :title="title" v-model:show="show"/>
    </div>
      <div class="panel">
<!--        <div>{{titleNow}}</div>-->
        <div class="inputs" v-show="titleNow==='常规设置'">
          <CompRender v-if="selElement" :element="el" v-for="el in comList" :key="Math.random()+''"></CompRender>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import CompRender from '../comp-render.tsx'
import RightTab from "./RightTab.vue";
import { selElement } from "~/editor/EditorTypes";
import { Edge } from "~/types";
import { ComputedRef } from 'vue'
let comList = ref<ComputedRef[]>([]);
watch(()=>selElement.value,(v, oldValue, onInvalidate)=>{
  let data = (v as Edge)!.data;
  if(!data) return;
  comList.value.splice(0,comList.value.length);
  for(let k in data){
    bind(k,data[k]);
  }
})
function bind(k: string, val: any) {
  let labelValue = computed({get:()=> {
      return selElement.value!.data[k]
    },set:(v)=>{
      onChange(v)
    }});
  let onChange = (v)=>{
    selElement.value!.data![k] = v;
  }
  let prop = computed(()=>{
    return {value:labelValue.value,onChange:onChange};
  })
  let el = computed(()=>{
    return {uiKey:'Input',props:prop};
  })
  labelValue.value = val
  comList.value.push(el);
}





let zIndex = ref(333);
let props = defineProps({
  titles:{
    type:Array
  },
  show:{
    type:Boolean
  }
})
let titleNow = ref('')
function onTabClick(t){
  titleNow.value = t;
}
watch(()=>props.show,(v)=> {
  let tmp = props.show?1333:333;
  zIndex.value = tmp;
});
</script>

<style scoped>
.PanelWrap{
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 100%;
  align-items: flex-start;
  top: -1px;
  right: -242px;
  transition: right 0.2s ease-out;
}
.tabs{
  display: flex;
  flex-direction: column;
  position: relative;
  right: -1px;
  align-items: flex-end;
  z-index: 2;
}
.panel{
  background-color: #fcfcfc;
  color: #8a9aa9;
  height: 100%;
  border: 1px solid #d0d9e1;
  border-bottom-left-radius: 3px;
  position: relative;
  padding: 10px;
  width: 220px;
  box-shadow: -1px 0px 1px 1px rgba(23, 40, 58, 0.02);
}
.PanelWrap.show{
  right: 0;
  border-color: #d0d9e1;
}
.move-enter-to,
.move-leave-from{
  right: 0;
  border-color: #d0d9e1;
}
.move-enter-from,
.move-leave-to{
  border-color: rgba(208, 217, 225, 0.38);

}
.move-enter-active,
.move-leave-active{
  transition: right 0.3s ease-out;
}
.inputs{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
