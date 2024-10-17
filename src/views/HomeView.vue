<script setup>
import { useRouter } from 'vue-router'
import JoinPoolForm from './../components/JoinPoolForm.vue'
import CreatePoolForm from './../components/CreatePoolForm.vue'
import ScoreBoard from './../components/ScoreBoard.vue'
import { useFetchData } from './../stores/fetchData'
import { onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authentication'
import { computed } from 'vue'

const authStore = useAuthStore()

const router = useRouter()
const fetchDataStore = useFetchData()

onMounted(() => {
  authStore.checkTokenAndRedirect()
  fetchDataStore.getUserPoolData()

  watch(() => {
    fetchDataStore.getUserPoolId()
  })
})

const poolData = computed(() => {
  return fetchDataStore.userPoolData
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="/images/nhl-logo.png" alt="" />
      </div>
      <div class="col">
        <h1>Welcome to the NHL elimination hockey pool website.</h1>
        <p v-if="fetchDataStore.userPoolId">
          If you are already in a pool, click below to view your pool's dashboard
        </p>
        <button
          v-if="fetchDataStore.userPoolId"
          @click="router.push({ name: 'dashboard', params: { week: 2 } })"
          class="select-btn"
        >
          Dashboard
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-if="poolData && fetchDataStore.userPoolId">
          <ScoreBoard :poolData="poolData" />
        </div>
      </div>
    </div>
  </div>

  <div v-if="!fetchDataStore.userPoolId" class="container">
    <div class="row">
      <div class="col">
        <h1>Have a pool access code? Join a pool here</h1>
        <button class="select-btn">Join Pool</button>
      </div>
      <div class="col">
        <JoinPoolForm />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <CreatePoolForm />
      </div>
      <div class="col">
        <h1>If you are looking to create a new elimination pool, create a pool here.</h1>
        <button class="select-btn">Create Pool</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: var(--primary-white);
}
p {
  color: var(--primary-white);
  margin: 10px 0;
}

.select-btn {
  background-color: var(--primary-white);
  border: none;
  border-radius: 50px;
  padding: 8px 14px;
  font-size: 16px;
  color: var(--primary-dark);
  cursor: pointer;
  margin: 10px 0;
}

.select-btn:hover {
  color: var(--primary-white);
  outline: 2px solid var(--primary-white);
  background: var(--primary-dark);
}
img {
  width: 100%;
  max-width: 250px;
  align-self: center;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}
.col {
}

@media (width < 800px) {
  .row {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
  }
}
</style>
