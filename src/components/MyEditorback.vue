<template>
  <div ref="myeditor" style="width:500px;height:500px;"></div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import * as monaco from "monaco-editor";

const myeditor = ref(null);
// eslint-disable-next-line no-unused-vars
let editor =null;
const initeditor=()=>{
  monaco.languages.register({ id: 'apijson' });
  monaco.languages.setMonarchTokensProvider('apijson', {
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

  monaco.languages.registerDocumentFormattingEditProvider('apijson', {
    provideDocumentFormattingEdits: function (model, options, token) {
      console.log('model',model)
      console.log('options',options)
      console.log('token:',token)
      
      console.log("here") // which is well printed
      // should return a value of type TextEdit[], but I don't know how to construct one
    }
  })

  editor=monaco.editor.create(myeditor.value, {
    value: '{\n\t\n}',
    language: 'apijson',
    tabSize: 2,
    automaticLayout: true,
    autoIndent: true,
    formatOnType: true
  });

  editor.trigger('any', 'editor.action.formatDocument');
}
onMounted(() => {
  initeditor();
});
// eslint-disable-next-line no-unused-vars
const insert=(data)=>{
  let str='\n'+data.label+' : '
  if (data.type=='table'){
    str+='{\n'
  }else{
    //if(data.dattype=="BIGINT")

    if (data.datatype.indexOf('VARCHAR')!=-1){
      str+='str('+/\d+/.exec(data.datatype)[0]+')'
    }else if(data.datatype=='BIGINT'){
      str+='int'
    }else if (data.datatype=='FLOAT'){
      str+='float'
    }
  }

  editor.trigger('keyboard', 'type', {text: str});
}
// eslint-disable-next-line no-undef
defineExpose({insert})
</script>
