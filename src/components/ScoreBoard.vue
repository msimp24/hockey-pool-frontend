<script setup>
const props = defineProps(['poolData'])

// Extract the pool name from the first item in poolData
const poolName = props.poolData.length > 0 ? props.poolData[0].poolName : ''

// Sort the teams by their lives in descending order
const sortedTeams = [...props.poolData].sort((a, b) => b.lives - a.lives)
</script>

<template>
  <div class="wrapper">
    <h1>Leaderboard</h1>
    <!-- Display pool name at the top -->
    <h2 class="pool-title">{{ poolName }}</h2>

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
h1 {
  margin: 20px 0;
}
.wrapper {
  background-color: #f7f9fc;
  max-width: 700px;
  margin: 0 auto;
}

.pool-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.leaderboard {
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 10px;
}

.leaderboard-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 5px;
}

.team-name {
  font-size: 24px;
}

.team-lives {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
