<script setup>
import { computed } from 'vue'

const props = defineProps(['poolData'])

// Extract the pool name from the first item in poolData
const poolName = props.poolData.length > 0 ? props.poolData[0].poolName : ''

// Sort the teams by their lives in descending order

const sortedTeams = computed(() => {
  let sortedTeams = [...props.poolData].sort((a, b) => b.lives - a.lives)
  return sortedTeams
})
console.log(poolName)
</script>

<template>
  <div class="wrapper">
    <h1>Leaderboard</h1>
    <!-- Display pool name at the top -->
    <h1 class="pool-title">{{ poolName }}</h1>

    <!-- Leaderboard -->
    <div class="leaderboard">
      <div class="leaderboard-item" v-for="item in sortedTeams" :key="item._id">
        <span class="team-name">{{ item.teamName }} </span>
        <span class="team-lives">{{ item.lives }} lives</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* General Wrapper Styling */
h1 {
  margin: 20px 0;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: var(--secondary-dark);
  font-weight: bold;
}

.wrapper {
  background-color: #f3f6fb;
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.wrapper:hover {
  transform: scale(1.02);
}

/* Pool Name Styling */
.pool-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: var(--secondary-dark);
  letter-spacing: 1px;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;
}

.pool-title::after {
  width: 80px;
  height: 3px;
  background-color: var(--primary-dark);
  display: block;
  margin: 10px auto 0;
  border-radius: 2px;
}

/* Leaderboard Section */
.leaderboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
}

/* Leaderboard Items */
.leaderboard-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background: linear-gradient(135deg, var(--primary-dark), var(--secondary-dark));
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition:
    background 0.3s,
    box-shadow 0.3s;
  color: #fff;
}

.leaderboard-item:hover {
  filter: brightness(1.2);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.team-name {
  font-size: 1.5rem;
  font-weight: 600;
}

.team-lives {
  font-size: 1.2rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 5px;
}

/* Media Query for Responsive Design */
@media (max-width: 600px) {
  .wrapper {
    width: 90%;
  }

  .leaderboard-item {
    flex-direction: column;
    text-align: center;
  }

  .team-name,
  .team-lives {
    font-size: 1.2rem;
  }
}
</style>
