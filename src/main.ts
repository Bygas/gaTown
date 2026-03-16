import { createApp, toRaw } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'
import './app.css'

const app = createApp(App)
const pinia = createPinia()

// setup store yapıları için $reset() desteği ekleniyor
// Pinia varsayılan olarak yalnızca option store türünde $reset desteği sunar
// structuredClone yerine JSON ile derin kopyalama kullanılıyor
// çünkü structuredClone, Vue'nun reactive Proxy yapısını doğrudan işleyemez
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(toRaw(store.$state)))
  store.$reset = () => {
    store.$patch(($state) => {
      Object.assign($state, JSON.parse(JSON.stringify(initialState)))
    })
  }
})

app.use(pinia)
app.use(router)
app.mount('#app')