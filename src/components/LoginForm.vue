<script>
import BaseInput from './../components/BaseInput.vue'
import { useAuthStore } from '../stores/authentication'

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      emailError: '',
      passwordError: '',
      store: useAuthStore()
    }
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()

      if (!this.isValidEmail(this.loginForm.email)) {
        this.emailError = 'The email you have entered is invalid'
      } else {
        this.emailError = ''
      }

      if (!this.isPasswordInput(this.loginForm.password)) {
        this.passwordError = 'Password is a required field'
      } else {
        this.passwordError = ''
      }

      if (!this.emailError && !this.passwordError) {
        this.store.login(this.loginForm)
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      const result = emailRegex.test(email)
      return result
    },
    isValidPassword(password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{10,}$/

      const result = passwordRegex.test(password)
      return result
    },

    isPasswordInput(password) {
      if (password.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    BaseInput
  }
}
</script>

<template>
  <form @submit="handleSubmit" novalidate>
    <h1>Login</h1>
    <BaseInput v-model="loginForm.email" label="Email" type="email" :error="emailError" />
    <BaseInput
      v-model="loginForm.password"
      label="Password"
      type="password"
      :error="passwordError"
    />
    <p class="errorMessage" v-if="store.errorMessage">{{ store.errorMessage }}</p>
    <p v-if="store.isLoading">Please wait, logging you in..</p>

    <div class="center">
      <button>Submit</button>
    </div>
    <RouterLink class="register-link" to="/register">New User? Register here</RouterLink>
  </form>
</template>

<style scoped>
form {
  background: var(--primary-white);
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
}

.errorMessage {
  color: red;
  margin: 5px 0;
}

label {
  color: var(--secondary-dark);
  font-size: 24px;
  margin: 10px 0;
}
input {
  height: 40px;
  padding: 10px;
  font-size: 24px;
}
h1 {
  color: var(--secondary-dark);
  text-align: center;
  font-weight: 400;
}

.center {
  text-align: center;
}

button {
  margin: 20px 0;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  background-color: var(--primary-dark);
  border: none;
  color: var(--primary-white);
}
button:hover {
  outline: 2px solid var(--primary-dark);
  color: var(--primary-dark);
  background: var(--primary-white);
}
.register-link {
  color: var(--secondary-dark);
}
.register-link:hover {
  color: var(--primary-dark);
}
</style>
