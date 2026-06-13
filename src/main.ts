import './assets/main.css'
import './assets/reading-tips.css'
import './assets/prose.css'
import './assets/sheet.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
