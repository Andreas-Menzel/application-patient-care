import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomeView from './components/pages/HomeView.vue'
import PatientsView from './components/pages/PatientsView.vue'
import PatientView from './components/pages/PatientView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/patients', component: PatientsView },
  { path: '/patient/:id', component: PatientView },
  { path: '/patient', redirect: '/patients' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(VueQueryPlugin)
  .use(router)
  .mount('#app')