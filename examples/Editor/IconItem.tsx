import { defineComponent,h } from "vue";
import { NIcon } from "naive-ui";
// 此控件用来支持从父级传入动态的 Icon Class
// 下面的 item.icon 是 Class 类型的参数，比如从阿里库中 import 的 Icon Class：
// import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@vicons/antd';
// 用法：
// <IconItem :icon="item.icon"/>
// // 或：
// <IconItem :keep-space="true" :icon="item.icon"/>

// <script lang="ts" setup>
//    let item = {icon: EyeOutlined}
// </script>
export default defineComponent({
  name:'IconItem',
  props:{
    icon:{
      type:Function,
    },
    keepSpace:{
      type:Boolean
    }
  },
  render(){
    console.log(this.icon)
    if(this.icon!==undefined){
      // @ts-ignore
      return h(NIcon,null,{default:()=>this.icon()});
    }else{
      return this.keepSpace?h(NIcon):null; // 如果 :keep-space="true" ，则渲染一个空的 NIcon 用于占位，否则全空
    }
  }
})
