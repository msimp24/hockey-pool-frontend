import { defineStore } from 'pinia'
import { ref } from 'vue'

import axios from 'axios'
import router from '../router/index'

export const useRegistrationStore = defineStore('registration', () => {
  const errorMessage = ref('')
  const register = async (formData) => {
    try {
      await axios.post('http://localhost:8080/user/register', formData)
    } catch (err) {
      if (err.response.status === 400) {
        errorMessage.value = 'Already a user registed under this email. Please start over'
        router.push({ name: 'register' })
      }
      router.push({ name: 'register' })
    }
  }
  return { errorMessage, register }
})
