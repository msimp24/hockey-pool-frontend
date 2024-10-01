<script setup>
import { onMounted } from 'vue'
import RegisterForm from './../components/RegisterForm.vue'
import { useRegistrationStore } from '@/stores/registration'

const registrationStore = useRegistrationStore()

onMounted(() => {
  registrationStore.errorMessage = ''
})
</script>

<template>
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
</style>
