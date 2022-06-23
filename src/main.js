import { createApp } from 'vue'
import App from './App.vue'

const app=createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
import './mycss.scss'
app.mount('#app')
