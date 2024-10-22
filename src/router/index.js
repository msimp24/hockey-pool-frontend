import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import OverviewView from '../views/OverviewView.vue'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authentication'
import { useFetchData } from '@/stores/fetchData'

const router = createRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },

    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/dashboard/:week',
      name: 'dashboard',
      component: OverviewView,
      meta: { requiresAuth: true, requiresPool: true },
      props: true
    }
  ],
  history: createWebHistory('https://hockey-pool-whco.onrender.com')
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const fetchDataStore = useFetchData()

  try {
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return next({ name: 'login' })
    }

    if (to.meta.requiresPool && !fetchDataStore.userPoolId) {
      await fetchDataStore.getUserPoolId()

      if (!fetchDataStore.userPoolId) {
        return next({ name: 'home' }) // Redirect to home if userPoolId not found
      }
    }

    next() // Proceed if authentication or other checks pass
  } catch (error) {
    console.error('Error:', error)

    if (error.response && error.response.status === 404) {
      return next({ name: 'home' })
    }

    next({ name: 'error' }) // General error fallback
  }
})

export default router
