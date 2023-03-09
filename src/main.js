import './assets/css/main.less'
import router from './router'

import App from './App.vue'

import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())

Object.values(import.meta.globEager('/src/plugins/*.js')).forEach((plugin) => {
    plugin.default?.(app)
})

app.mount('#app')
