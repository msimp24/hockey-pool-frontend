import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import axios from 'axios'
import router from '../router/index'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const errorMessage = ref('')

  const apiUrl = import.meta.env.VITE_API_URL

  const login = async (credentials) => {
    console.log(apiUrl)
    try {
      const response = await axios.post(`${apiUrl}/user/login`, credentials)
      token.value = response.data.token
      localStorage.setItem('token', token.value)
      router.push({ name: 'home' })
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
    router.go({ name: 'login' })
  }
  function decodeJWT(token) {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }

  // Check if token is valid (not expired)
  function isTokenValid(token) {
    if (!token) return false
    const decodedToken = decodeJWT(token)
    if (!decodedToken) return false

    const currentTime = Date.now() / 1000 // Convert current time to seconds
    return decodedToken.exp > currentTime // Check if token is expired
  }

  // This function will be used in views to check the token and redirect if necessary
  function checkTokenAndRedirect() {
    const storedToken = localStorage.getItem('token')

    if (!storedToken || !isTokenValid(storedToken)) {
      console.log('Token is invalid or expired. Redirecting to login...')
      logout() // Logout and redirect to login
    } else {
      console.log('Token is valid.')
    }
  }

  return {
    token,
    isAuthenticated,
    errorMessage,
    login,
    logout,
    checkTokenAndRedirect
  }
})
