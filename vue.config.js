const { defineConfig } = require('@vue/cli-service')
const monacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  configureWebpack: {
    plugins: [new monacoWebpackPlugin({languages: ['javascript', 'typescript', 'json']})],
  },
  transpileDependencies: true
})
