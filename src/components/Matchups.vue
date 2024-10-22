<script setup>
defineProps(['matchups', 'week', 'isLoading', 'userPoolId', 'isCompleted'])

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useFetchPicks } from './../stores/fetchData'
import { useFetchData } from './../stores/fetchData'
const fetchPicksStore = useFetchPicks()
const fetchDataStore = useFetchData()
const router = useRouter()

const makePick = (userPoolId, matchupId, selectedTeam, week) => {
  let isValid = true

  fetchDataStore.userWeeklyPicks.forEach((el) => {
    if (el === selectedTeam) {
      isValid = false
    }
  })

  if (!isValid) {
    alert('You have already picked this team')
    //  modal.value = true
    //invalidPick.value = true
  } else {
    fetchPicksStore.makeWeeklyPick(userPoolId, matchupId, selectedTeam, week)
    router.go({ name: 'overview', params: { week: week } })
  }
}

// checks if the user has already selected this team in a past week
</script>

<template>
  <div v-if="matchups" class="wrapper" :class="{ disable: isCompleted }">
    <p v-if="isLoading">Loading...</p>
    <p v-if="week == 19">No games due to All-Star Break</p>

    <div v-else class="matchup-wrapper" v-for="item in matchups" :key="item">
      <h3>{{ item.date.slice(0, 10) }}</h3>
      <div class="location-box">
        <h3>Away</h3>
        <h3>Home</h3>
      </div>
      <div class="match-box">
        <h3>{{ item.visitingTeam.name }}</h3>
        <p>vs</p>
        <h3>{{ item.homeTeam.name }}</h3>
      </div>
      <div class="score-box">
        <div class="score">{{ item.visitingTeam.score }}</div>
        <div class="score">{{ item.homeTeam.score }}</div>
      </div>

      <div v-if="!isCompleted" class="btn-container">
        <button
          @click="makePick(userPoolId, item._id, item.visitingTeam.name, week)"
          class="select-btn"
        >
          Select Away
        </button>
        <button
          @click="makePick(userPoolId, item._id, item.homeTeam.name, week)"
          class="select-btn"
        >
          Select Home
        </button>
      </div>

      <br />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 28px;
  text-align: center;
  color: var(--secondary-dark);
}
h2 {
  color: var(--secondary-dark);
}
h3 {
  font-size: 16px;
  font-weight: 500;
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
}

.hide {
  display: none;
  margin-left: 10px;
}
.select-btn {
  background-color: var(--primary-dark);
  border: none;
  border-radius: 50px;
  padding: 8px 14px;
  font-size: 16px;
  color: var(--primary-white);
  cursor: pointer;
}

.select-btn:hover {
  color: var(--primary-dark);
  outline: 2px solid var(--primary-dark);
  background: var(--primary-white);
}
.btn-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
