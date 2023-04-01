import { createApp } from 'vue'
import 'vue-loading-overlay/dist/css/index.css'
import './index.scss'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
