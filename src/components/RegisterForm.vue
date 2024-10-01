<script>
import { useRegistrationStore } from './../stores/registration'
import BaseInput from './../components/BaseInput.vue'
import router from '../router/index'

export default {
  components: { BaseInput },
  data() {
    return {
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      registerError: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      store: useRegistrationStore()
    }
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()

      if (!this.isValidName(this.registerForm.firstName)) {
        this.registerError.firstName = 'First name is a required field'
      } else {
        this.registerError.firstName = ''
      }

      if (!this.isValidName(this.registerForm.lastName)) {
        this.registerError.lastName = 'Last name is a required field'
      } else {
        this.registerError.lastName = ''
      }

      if (!this.isValidEmail(this.registerForm.email)) {
        this.registerError.email = 'The email you have entered is invalid'
      } else {
        this.registerError.email = ''
      }
      if (!this.isValidPassword(this.registerForm.password)) {
        this.registerError.password =
          'The password you have entered is invalid. It must start with a capital letter, 10 characters long and contains a special character !@#$%^&*()_+'
      } else {
        this.registerError.password = ''
      }
      if (this.registerForm.confirmPassword !== this.registerForm.password) {
        this.registerError.confirmPassword = 'Passwords must match'
      } else {
        this.registerError.confirmPassword = ''
      }

      if (Object.values(this.registerError).every((error) => error === '')) {
        this.store.register(this.registerForm)
        router.push({ name: 'login' })
      }
    },

    isValidName(name) {
      if (name.length == 0) {
        return false
      } else {
        return true
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      const result = emailRegex.test(email)
      return result
    },
    isValidPassword(password) {
      if (password.length < 10) {
        return false
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{10,}$/

      const result = passwordRegex.test(password)
      return result
    }
  }
}
</script>

<template>
  <form @submit="handleSubmit" novalidate>
    <BaseInput
      label="First Name"
      v-model="registerForm.firstName"
      type="text"
      :error="registerError.firstName"
    />
    <BaseInput
      label="Last Name"
      v-model="registerForm.lastName"
      type="text"
      :error="registerError.lastName"
    />
    <BaseInput
      label="Email"
      v-model="registerForm.email"
      type="email"
      :error="registerError.email"
    />

    <BaseInput
      label="Password"
      v-model="registerForm.password"
      type="password"
      :error="registerError.password"
    />
    <BaseInput
      label="Confirm Password"
      v-model="registerForm.confirmPassword"
      type="password"
      :error="registerError.confirmPassword"
    />
    <div class="center">
      <button>Submit</button>
    </div>
    <p class="errorMessage" v-if="store.errorMessage">{{ store.errorMessage }}</p>
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
p {
}

.errorMessage {
  color: red;
  margin: 5px 0;
  text-align: center;
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
</style>
