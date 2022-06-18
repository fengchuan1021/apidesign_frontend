<template>
<div style="display:flex;">


  <div id="left" style="width:20%">
    <LeftTree></LeftTree>
  </div>

  <div id="right" style="width:50%">
  </div>


  <div id="left" style="width:30%">
  </div>

</div>
</template>

<script setup>
import * as monaco from 'monaco-editor'
import LeftTree from './LeftTree'
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

// eslint-disable-next-line no-unused-vars
const module=reactive({'name':'demon','baseurl':'/api/demon','description':'',actions:[{url:'/setfoo','name':'setfoo','mark':'设置foo的值','input':'','output':''}]})
// eslint-disable-next-line no-unused-vars
const editjson=(item,direct)=>{
  dialogVisible.value=true
  currentitem=item
  currentdirect=direct
  // json=reactive({})
  // Object.assign(json,item[direct])
  editor.getModel().setValue(item[direct]);
}
// eslint-disable-next-line no-unused-vars
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
