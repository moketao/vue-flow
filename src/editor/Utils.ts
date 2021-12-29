import { isEdge, isNode } from "~/utils";
import { applyEdgeChanges, applyNodeChanges } from "~/composables";
import { selElement } from "~/editor/EditorTypes";
import { useStore } from "~/store";
export const clearOldSel = (oldValue,store)=>{
  if(!oldValue){
    oldValue = selElement.value;
  }
  if(oldValue){
    let is_edge = isEdge(oldValue);
    let is_node = isNode(oldValue);
    if(is_edge){
      applyEdgeChanges([{id:oldValue.id,type:'select',selected:false}],store.edges)
    }
    if(is_node){
      applyNodeChanges([{id:oldValue.id,type:'select',selected:false}],store.nodes)
    }
  }
}
