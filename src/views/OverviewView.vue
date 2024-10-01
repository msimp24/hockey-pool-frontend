<script setup>
import { useFetchData } from './../stores/fetchData'
import { useFetchPicks } from './../stores/fetchData'
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import Matchups from './../components/Matchups.vue'
import ChosenMatchup from './../components/ChosenMatchup.vue'

const fetchDataStore = useFetchData()
const fetchPicksStore = useFetchPicks()
const router = useRouter()

const props = defineProps(['week'])
const currWeek = ref(Number(props.week))
const paramsWeek = ref(1)
const paramsYear = ref(2024)

const userPoolId = ref('')

const decrementWeek = () => {
  currWeek.value = currWeek.value - 1
  if (currWeek.value == 0) {
    currWeek.value = 1
  }
  if (currWeek.value < 13) {
    paramsYear.value = 2024
  }

  router.push({ name: 'overview', params: { week: currWeek.value } })
}
const incrementWeek = () => {
  currWeek.value = currWeek.value + 1
  if (currWeek.value > 27) {
    currWeek.value = 27
  }
  if (currWeek.value == 13) {
    paramsYear.value = 2025
  }
  router.push({ name: 'overview', params: { week: currWeek.value } })
}

onMounted(() => {
  watch(() => {
    if (paramsYear.value == 2024) {
      paramsWeek.value = currWeek.value + 39
    } else {
      paramsWeek.value = currWeek.value - 13
    }

    fetchDataStore.getUserPoolId()
    userPoolId.value = fetchDataStore.userPoolId
    fetchDataStore.getWeeklyMatchups(paramsYear.value, paramsWeek.value)
    fetchPicksStore.getWeeklyPick(currWeek.value)
  })
})

const weeklyMatchups = computed(() => {
  return fetchDataStore.matchups
})

const chosenMatchup = computed(() => {
  return fetchPicksStore.weeklyPick || null
})
</script>

<template>
  <div class="header">
    <img @click="decrementWeek" class="icon left" src="/icons/left-arrow.svg" alt="" />
    <h1>Week {{ currWeek }}</h1>
    <img @click="incrementWeek" class="icon right" src="/icons/right-arrow.svg" alt="" />
  </div>

  <div class="container">
    <div class="row">
      <ChosenMatchup :matchup="chosenMatchup" :week="week" />
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <Matchups
          :matchups="weeklyMatchups"
          :week="currWeek"
          :isLoading="fetchDataStore.isLoading"
          :userPoolId="userPoolId"
        />
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<style scoped>
.pick {
  text-align: center;
  color: var(--primary-white);
}
h1 {
  margin: 10px;
}
.icon {
  height: 40px;
  width: 40px;
  cursor: pointer;
}
.left:hover {
  transform: translateX(-2px);
}
.right:hover {
  transform: translateX(2px);
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-white);
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
</style>
