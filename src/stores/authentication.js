import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import axios from 'axios'
import router from '../router/index'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)

  const errorMessage = ref('')

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8080/user/login', credentials)
      token.value = response.data.token
      localStorage.setItem('token', token.value)
      router.go({ name: 'overview', params: { week: 1 } })
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log('Login error: Invalid Username or Password')
        errorMessage.value = 'Login error: Invalid Username or Password'
        router.push({ name: 'login' })
      } else {
        console.log('Login failed:', err)
        router.push({ name: 'login' })
      }
    }
  }

  const isAuthenticated = computed(() => !!localStorage.getItem('token'))

  const logout = () => {
    token.value = null
    localStorage.removeItem('token')
    router.push({ name: 'login' })
    location.reload()
  }
  return {
    token,
    isAuthenticated,
    errorMessage,
    login,
    logout
  }
})
