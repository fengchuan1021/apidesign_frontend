<template>
  <el-tree-v2 id='myroot' ref='tree'  style="width:75%;" show-checkbox :height="208" @node-click="onTreeclicked"/>
</template>
<script setup>
import {onMounted, ref} from "vue";

const tree = ref(null);
// eslint-disable-next-line no-unused-vars
let data=ref([ {id:"root",label:'root',children:[] }]);
// eslint-disable-next-line no-unused-vars
const onTreeclicked=(data,node,e)=>{

}
onMounted(()=>{

})
// eslint-disable-next-line no-unused-vars
const insert=(data)=>{
 tree.value.setData([ {id:"root",label:'root',children:[] }]);
}
// eslint-disable-next-line no-undef
defineExpose({insert})
</script>
