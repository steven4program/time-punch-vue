import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StaffsLogin from '../views/StaffsLogin.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    // {
    //   path: '/',
    //   name: 'root',
    //   redirect: '/staffs/login'
    // },
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/staffs/login',
      component: StaffsLogin
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
