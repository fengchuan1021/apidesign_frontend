<template>
<div>
  <div v-show="dialogVisible">
    <div style="position:fixed;z-index:9999;height:100%;background-color:rgba(0, 0, 0, .5);top:0;bottom:0;left:0;right: 0;">
      <div style="position:fixed;z-index:9999;height:500px;background-color:white;top:0;bottom:0;left:0;right: 0;margin:auto;width:800px;border-radius: 5px;padding:5px;">
        <div id="editor" style="width: 800px;height:490px;">
          <div id="container" style="width:400px;height:490px"></div>
        </div>
        <div id="chosebox" style="width: 400px"></div>
        <div>
          <el-button @click="savejson">确定</el-button><el-button @click="dialogVisible=false">取消</el-button>
        </div>
      </div>
    </div>
  </div>

  <div id="left">

  </div>

  <div id="right">
    <el-input v-model="module.name"></el-input>
    <el-input v-model="module.url"></el-input>
    <div>
      <div v-for="(item,key) in module.actions" :key="key">
        <el-input v-model="item.name" width="100px"></el-input>
        <el-input v-model="item.url"></el-input>
        <el-input v-model="item.mark"></el-input>

        <div>
          <div>传入参数：</div>
          <div>
          {{item.input}}
          </div>
          <div><el-button @click="editjson(item,'input')">编辑</el-button></div>
        </div>

        <div>
          <div>传出参数：</div>
          <div>{{item.output}}</div>
          <div><el-button @click="editjson(item,'output')">编辑</el-button></div>
        </div>

      </div>
    </div>


    <el-button @click="module.actions.push({url:'','name':'','mark':''})">添加函数</el-button>
  </div>
</div>
</template>

<script setup>
import * as monaco from 'monaco-editor'
import {onMounted, reactive, ref} from "vue";
const dialogVisible=ref(false);
//let json=reactive({})
// eslint-disable-next-line no-unused-vars
let currentitem=null
// eslint-disable-next-line no-unused-vars
let currentdirect=null
// eslint-disable-next-line no-unused-vars
let editor=null

onMounted(()=>{
  monaco.languages.register({ id: 'myjson' });
  monaco.languages.setMonarchTokensProvider('myjson', {
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: 'invalid',

    keywords: ["optional"],

    typeKeywords: [
      'int', 'str', 'datetime','float'
    ],

    operators: [],

    // we include these common regular expressions
    // eslint-disable-next-line
    symbols:  /[=><!~?:&|+\-*\/\^%]+/,

    // C# style strings
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    // The main tokenizer for our languages
    tokenizer: {
      root: [
        // identifiers and keywords
        [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'keyword',
            '@keywords': 'keyword',
            '@default': 'identifier' } }],
        // eslint-disable-next-line
        [/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely

        // whitespace
        { include: '@whitespace' },

        // delimiters and operators
        // eslint-disable-next-line
        [/[{}()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, { cases: { '@operators': 'operator',
            '@default'  : '' } } ],

        // @ annotations.
        // As an example, we emit a debugging log message on these tokens.
        // Note: message are supressed during the first load -- change some lines to see them.
        // eslint-disable-next-line
        [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],

        // numbers
        // eslint-disable-next-line
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],

        // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'],

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
        [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],

        // characters
        [/'[^\\']'/, 'string'],
        [/(')(@escapes)(')/, ['string','string.escape','string']],
        [/'/, 'string.invalid']
      ],

      comment: [
        // eslint-disable-next-line
        [/[\/\/]+/, 'comment' ],

      ],

      string: [
        [/[^\\"]+/,  'string'],
        [/@escapes/, 'string.escape'],
        [/\\./,      'string.escape.invalid'],
        [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
      ],

      whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/\/\*/,       'comment', '@comment' ],
        [/\/\/.*$/,    'comment'],
      ],
    },
  });

  editor=monaco.editor.create(document.getElementById('container'), {
    value: 'console.log("Hello, world")',
    language: 'myjson',
    automaticLayout: true
  });
})


const module=reactive({'name':'demon','baseurl':'/api/demon','description':'',actions:[{url:'/setfoo','name':'setfoo','mark':'设置foo的值','input':'','output':''}]})
const editjson=(item,direct)=>{
  dialogVisible.value=true
  currentitem=item
  currentdirect=direct
  // json=reactive({})
  // Object.assign(json,item[direct])
  editor.getModel().setValue(item[direct]);
}
const savejson=()=>{
  let value=editor.getModel().getValue()
  console.log(value)
  console.log(currentdirect)
  console.log(currentitem)

  currentitem[currentdirect]=value



}
</script>

<style>

</style>
