import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import OverviewView from '../views/OverviewView.vue'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authentication'
import { useFetchData } from '@/stores/fetchData'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
  const fetchDataStore = useFetchData()

  try {
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next({ name: 'login' }) // Redirect to login if not authenticated
    } else {
      // Check if the route requires a pool and the userPoolId is not available
      if (to.meta.requiresPool && !fetchDataStore.userPoolId) {
        // Fetch the userPoolId asynchronously
        await fetchDataStore.getUserPoolId()

        // Check if the userPoolId was fetched successfully
        if (fetchDataStore.userPoolId) {
          next() // Proceed to the route if userPoolId is available
        } else {
          // Handle the case where userPoolId could not be fetched
          // You might want to redirect to an error page or display a message
          next({ name: '/' })
        }
      } else {
        // Allow navigation if authenticated or route doesn't require auth
        next()
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle 403 Forbidden error
      next({ name: '/' }) // Redirect to an unauthorized page
    } else {
      // Handle other errors
      console.error('Error:', error)
      next({ name: 'error' }) // Redirect to a general error page
    }
  }
  // Check if the route requires authentication and the user is not authenticated
})

export default router
