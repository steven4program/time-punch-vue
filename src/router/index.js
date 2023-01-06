import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StaffsLogin from '../views/StaffsLogin.vue'
import NotFound from '../views/NotFound.vue'
import { useStaffStore } from './../stores/staff'

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

router.beforeEach((to, from, next) => {
  const staffStore = useStaffStore()
  console.log('beforeEach')
  console.log(staffStore.fetchCurrentStaff())
  next()
})

export default router
