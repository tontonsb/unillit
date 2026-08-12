import './assets/fonts'
import './assets/main.css'
import './assets/reading-tips.css'
import './assets/prose.css'
import './assets/sheet.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { reloadOnStaleChunks } from './lib/staleBuild'

console.log(`Unillit v${__APP_VERSION__}`)

const app = createApp(App)

app.use(router)

reloadOnStaleChunks(router)

app.mount('#app')
