<script setup>
import LoginForm from './../components/LoginForm.vue'
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authentication'
import router from '../router/index'

const authStore = useAuthStore()
const hasToken = ref(authStore.isAuthenticated)

onMounted(() => {
  watch(() => {
    if (hasToken.value) {
      router.push({ name: 'overview', params: { week: 1 } })
    }
  })
})
</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Start your online elimination pool today.</h1>
          <p>
            Choose a weekly matchup to try and survive each week, lose that matchup and you lose a
            life. Lose too many lives, and you are out!
          </p>
        </div>
        <div class="col">
          <img src="/images/nhl-logo.png" alt="" />
        </div>
      </div>
      <div class="row">
        <LoginForm />
      </div>
    </div>
  </main>
</template>

<style scoped>
h1 {
  color: var(--primary-white);
}
p {
  color: var(--primary-white);
  margin: 10px 0;
}
img {
  height: 200px;
  width: 200px;
}
.col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  margin: 50px 0;
  align-items: center;
  justify-content: center;
}
</style>
