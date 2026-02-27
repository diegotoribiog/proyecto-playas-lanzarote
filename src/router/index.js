import { createRouter, createWebHistory } from 'vue-router'
import Playas from '../views/Playas.vue'
import Mapa from '../views/Mapa.vue'
import Estadisticas from '../views/Estadisticas.vue'

const routes = [
  { path: '/', component: Playas },
  { path: '/playas', component: Playas },
  { path: '/playas/:slug', component: Playas },
  { path: '/mapa', component: Mapa },
  { path: '/estadisticas', component: Estadisticas }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router