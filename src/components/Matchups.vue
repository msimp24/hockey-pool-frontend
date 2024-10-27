<script setup>
defineProps(['matchups', 'week', 'isLoading', 'userPoolId', 'isCompleted'])

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
  font-size: 18px;
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
/* Clean Button Styles */
.select-btn {
  background: linear-gradient(135deg, var(--primary-dark), var(--secondary-dark));
  border: none;
  border-radius: 30px;
  padding: 12px 18px;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.select-btn:hover {
  background: linear-gradient(135deg, var(--primary-dark), var(--secondary-dark));
  transform: scale(1.05);
}

.select-btn:active {
  transform: scale(0.98);
}

.btn-container {
  display: flex;
  justify-content: space-around;
  gap: 50px;
}
.score {
  border-radius: 10px;
  padding: 14px;
  font-weight: 600;
  font-size: 20px;
}

@media (width < 1000px) {
  .select-btn {
    background: linear-gradient(135deg, var(--primary-dark), var(--secondary-dark));
    border: none;
    border-radius: 30px;
    padding: 12px 18px;
    font-size: 0.75rem;
    color: #fff;
    cursor: pointer;
    transition:
      background-color 0.3s,
      transform 0.3s;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 10px 0;
  }

  .select-btn:hover {
    background: linear-gradient(135deg, var(--primary-dark), var(--secondary-dark));
    transform: scale(1.05);
  }

  .select-btn:active {
    transform: scale(0.98);
  }
}
</style>
