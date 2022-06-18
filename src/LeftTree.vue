<template>
  <el-tree-v2 ref="tree"  :height="208" />
</template>
<script setup>
import request from "./request"
// eslint-disable-next-line no-unused-vars
import {onMounted, reactive, ref} from "vue";
const tree=ref()
// tree.push({"id":"BASE_DIRmodules",'label':243333333333323,children:[]})
// tree.push({"id":"BASE_DIRmodules",'label':1111111,children:[]})
onMounted(()=>{
  request.request({'url':"/apidesign/getfoldtree",method:"post"}).then(ret=>{
    //console.log("why??")
    tree.value.setData([ret.data])
    //tree.push({"id":"BASE_DIRmodules",'label':333,children:[]})
    // console.log(tree)
    // console.log(tree.length)
    // console.log('tree,',ret.data)
  })
})
</script>
