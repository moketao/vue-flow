<template>
  <div :class="['PanelWrap',{show}]" :style="{zIndex}">
    <div class="tabs">
      <RightTab :titleNow="titleNow" @click="onTabClick(title)" v-for="title in titles" :title="title" v-model:show="show"/>
    </div>
      <div class="panel">{{titleNow}}</div>
  </div>
</template>

<script setup lang="ts">
import RightTab from "./RightTab.vue";
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

</style>
