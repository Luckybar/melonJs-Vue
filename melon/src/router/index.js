import { createRouter, createWebHistory } from 'vue-router'
import MelonView from '../views/MelonView.vue'
import BabylonView from '../views/BabylonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Melon',
      component: MelonView
    },
    {
      path: '/babylon',
      name: 'Babylon',
      component: BabylonView
    }
  ]
})

export default router
