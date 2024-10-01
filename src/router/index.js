import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import OverviewView from '../views/OverviewView.vue'
import { useAuthStore } from '@/stores/authentication'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },

    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/overview/:week',
      name: 'overview',
      component: OverviewView,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' }) // Redirect to login if not authenticated
  } else {
    next() // Allow navigation if authenticated or route doesn't require auth
  }
})

export default router
