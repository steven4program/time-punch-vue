import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StaffsLogin from '../views/StaffsLogin.vue'
import NotFound from '../views/NotFound.vue'
import { useStaffStore } from './../stores/staff'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/staffs/login'
    },
    {
      path: '/homepage',
      name: 'HomePage',
      component: HomeView
    },
    {
      path: '/staffs/login',
      name: 'StaffsLogin',
      component: StaffsLogin
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const staffStore = useStaffStore()
  const tokenInLocal = localStorage.getItem('token')
  const tokenInStore = staffStore.staff.token
  let isAuthenticated = staffStore.isAuthenticated

  if (tokenInLocal && tokenInLocal !== tokenInStore) {
    isAuthenticated = await staffStore.fetchCurrentStaff()
  }

  if (!isAuthenticated && to.name !== 'StaffsLogin') {
    next('/staffs/login')
    return
  }

  if (isAuthenticated && to.name !== 'HomePage') {
    next('/homepage')
    return
  }

  next()
})

export default router
