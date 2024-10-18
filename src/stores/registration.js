import { defineStore } from 'pinia'
import { ref } from 'vue'

import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

export const useRegistrationStore = defineStore('registration', () => {
  const errorMessage = ref('')
  const apiUrl = import.meta.env.VITE_API_URL

  const register = async (formData) => {
    try {
      await axios.post(`${apiUrl}/user/register`, formData)
    } catch (err) {
      if (err.response.status === 400) {
        errorMessage.value = 'Already a user registed under this email. Please start over'
        router.push({ name: 'register' })
      }
    }
  }
  return { errorMessage, register }
})
