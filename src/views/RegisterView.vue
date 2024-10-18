<script setup>
import { onMounted } from 'vue'
import RegisterForm from './../components/RegisterForm.vue'
import { useRegistrationStore } from '@/stores/registration'

const registrationStore = useRegistrationStore()
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  registrationStore.errorMessage = ''
})
</script>

<template>
  <button class="select-btn" @click="router.push({ name: 'login' })">Back to Login</button>
  <h1>Welcome</h1>
  <div class="row">
    <RegisterForm />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

h1 {
  color: var(--primary-white);
  margin-top: 20px;
  font-size: 40px;
  text-align: center;
}

.select-btn {
  background-color: var(--primary-white);
  border: none;
  border-radius: 50px;
  padding: 8px 14px;
  font-size: 16px;
  color: var(--primary-dark);
  cursor: pointer;
  margin: 10px;
}

.select-btn:hover {
  color: var(--primary-white);
  outline: 2px solid var(--primary-white);
  background: var(--primary-dark);
}
</style>
