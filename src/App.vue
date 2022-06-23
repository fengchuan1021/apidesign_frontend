<template>

  <el-dialog id="myjsondialog"  v-model="editflag">
    <div style="width:90%;" id="myjsondialogdiv">
      <el-form :model="form" label-width="120px" style="width:90% !important;">
        <el-form-item label="namespace:">

          <el-input v-model="form.namespace" label-width="">

          </el-input>
        </el-form-item>

        <el-form-item label="url:">
          <div style="display:flex">
          <el-button style="margin-right:10px">POST</el-button>
          <el-input v-model="form.url" >
            <template #prepend>{{form.prefixurl}}</template>
          </el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <div style="display:flex;width:100%">
<!--            <MyEditor ref="myeditor"></MyEditor>-->
            <el-tree ref='objtree' :data="objdata" :expand-on-click-node="false"

              show-checkbox :height="208" @node-click="inserttreedata" style="width:85%">
              <template #default="{ node }">

                <div v-if="node.data.type=='obj'" class="formdiv">
                  <span>{{ node.label }}</span>
                  <el-tooltip placement="top">
                    <template #content> 添加子节点 </template>

                    <el-icon color="blue" class="no-inherit" @click="addobjsubtree(node)">
                      <Plus />
                    </el-icon>
                  </el-tooltip>

                </div>

                <div v-if="node.data.type=='empty'" class="formdiv" style="display:flex">
                  <span><el-input v-model="node.data.padding" :style="`width:${191-(node.data.padding)}px;color:red`"></el-input></span>


                  <span style="margin-left:5px;margin-right:5px">
                                   <el-tooltip placement="top">
                    <template #content> reqiured</template>

                    <el-checkbox v-model="node.data.required"></el-checkbox>
                  </el-tooltip>

                  </span>
                  <span>

                      <el-select v-model="node.data.fieldtype" class="m-2" placeholder="Select" style="margin-right:5px;">
                        <el-option
                            v-for="item in selectoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                      </el-select>

                  </span>

                  <span>
                    <el-input v-model="node.data.mark"></el-input>
                  </span>

                  <el-tooltip placement="top">
                    <template #content> 添加子节点 </template>

                    <el-icon color="blue" class="no-inherit" @click="addobjsubtree(node)">
                      <Plus />
                    </el-icon>
                  </el-tooltip>

                </div>


                <div v-if="node.data.type=='controller'">
                  <span>{{ node.label }}</span> <span><el-button @click="addendpoint(node)">添加api</el-button></span>
                </div>

                <div v-if="node.data.type=='endpoint'">
                  <span>{{ node.label }}</span>
                </div>

              </template>
            </el-tree>

            <div style="flex:1">
              <el-tree-v2 ref='dbtree'  show-checkbox :height="208" @node-click="inserttreedata"/>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
  <div style="display:flex;">

    <div id="left" style="width:20%;">
      <el-tree-v2 ref="tree"  :height="208" @node-click="ontreeclick">

        <template #default="{ node }">

            <div v-if="node.data.type=='dir'">
              <span>{{ node.label }}</span>
            </div>

            <div v-if="node.data.type=='controller'">
              <span>{{ node.label }}</span> <span><el-button @click="addendpoint(node)">添加api</el-button></span>
            </div>

          <div v-if="node.data.type=='endpoint'">
            <span>{{ node.label }}</span>
          </div>

        </template>
      </el-tree-v2>
    </div>

    <div id="center" style="width:50%;">
      <div><label>getuser</label><el-button>修改</el-button></div>
      <div>
        <div style="display:flex;">
          <el-button style="width:10%;">POST</el-button><el-input style="flex:1">/api/getuser</el-input>
        </div>
        <el-row>
          函数说明
        </el-row>

        <el-row>
          Request
        </el-row>

        <el-row>
          Responses
        </el-row>
      </div>
    </div>

    <div id="right" style="width:30%;">

    </div>

  </div>
</template>
<style>
#myjsondialog .el-dialog{
  width:80% !important;
}
#myjsondialogdiv .el-tree-node__content{
  height:43px;
}
#myjsondialogdiv .el-input__wrapper{
  padding-left:5px;
  padding-right:0px;
}
.formdiv{
  display:flex;
}

</style>
<script setup>
import request from "./request"
// import MyEditor from '@/components/MyEditor'
// eslint-disable-next-line no-unused-vars
import {onMounted, reactive, ref} from "vue";


// eslint-disable-next-line no-unused-vars
let editor;
const ontreeclick=(data,node,e)=>{
  console.log(data)
  console.log(node)
  console.log(e)
}

// eslint-disable-next-line no-unused-vars
const inserttreedata=(data,node,e)=>{
  // console.log('insertdata:',data)
  // myeditor.value.insert(data)
}
const editflag=ref(true)
const tree=ref()
const dbtree=ref()
const objtree=ref()

const selectoptions = [
  {
    value: 'string',
    label: 'string',
  },
  {
    value: 'number',
    label: 'number',
  },
  {
    value: 'integer',
    label: 'integer',
  },
  {
    value: 'array',
    label: 'array',
  },
  {
    value: 'object',
    label: 'object',
  },
  {
    value: 'boolean',
    label: 'boolean',
  },
]
let idcount=0
let objdata=ref([ {id:idcount++,label:'root',type:'obj',children:[] }]);
let form= reactive({namespace:'hello.world',prefixurl:"/hello/world",url:'/testhi'})
// eslint-disable-next-line no-unused-vars
const addobjsubtree=(node,nodedata)=>{
  // console.log(node);
  // console.log('1111')
  // console.log(nodedata)
  //objdefaultExpandedKeys.value=[]

  //console.log('nodekey',node)
  //objtree.value.store.nodesMap[node.data.id].expanded = true;
  //console.log(objtree.value.isExpanded)
 // console.log(objtree.value.store)
 //  node.expand((e)=>{console.log(e)},true)
  console.log(node.data);
  let tmp=document.querySelector(`[data-key="${node.id}"]> .el-tree-node__content`)
  let padding=0;
  if(tmp.style && tmp.style['padding-left']){
    padding=parseInt(tmp.style['padding-left'])
    console.log('padding:',padding)
  }

  node.expanded=true;
  //console.log(objtree.value.setc)
  // console.log('what a fuck?',objtree.value.isExpanded(node))

  node.data.children.push({id:idcount++,label:"rootsub",type:'empty',children:[],padding:padding})
  //objdata.value=[...objdata.value]
}

onMounted(()=>{

  request.request({'url':"/apidesign/getfoldtree",method:"post"}).then(ret=>{

    tree.value.setData([ret.data])

  })
  request.request({'url':'/apidesign/getdbtree',method:"post"}).then(ret=>{
    console.log('dbtree',ret.data)
    dbtree.value.setData(ret.data)
  })
})
const addendpoint=(node,nodedata)=>{
 console.log(node.data.type)
  console.log(1111111111)
  console.log(nodedata)
}

</script>
