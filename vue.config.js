const { defineConfig } = require('@vue/cli-service')
const monacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  configureWebpack: {
    plugins: [new monacoWebpackPlugin({languages: ['javascript', 'typescript', 'json']})],
  },
  devServer: {
    port: 8080,

    host: "127.0.0.1",
    open: true,
    hot: true,//自动保存
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'

        }
      }
    }
  },
  transpileDependencies: true
})
