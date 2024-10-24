<script setup>
const props = defineProps(['matchup', 'week', 'isLoading', 'isCompleted'])
</script>

<template>
  <div v-if="matchup" class="wrapper">
    <p v-if="isLoading">Loading...</p>

    <div v-if="props.matchup && props.matchup.pick" class="matchup-wrapper">
      <div class="location-box">
        <h3>Away</h3>
        <h3>Home</h3>
      </div>
      <div class="match-box">
        <h3>{{ props.matchup.matchup.visitingTeam.name }}</h3>
        <p>vs</p>
        <h3>{{ props.matchup.matchup.homeTeam.name }}</h3>
      </div>
      <div class="score-box">
        <div class="score">{{ props.matchup.matchup.visitingTeam.score }}</div>
        <div class="score">{{ props.matchup.matchup.homeTeam.score }}</div>
      </div>
      <h1>Pick:</h1>
      <h1>{{ props.matchup.pick.selectedTeam }}</h1>
    </div>
    <h1 v-else>Please select a matchup for week {{ week }}</h1>
  </div>
</template>

<style scoped>
.wrapperError {
  border: red solid 4px;
}
.wrapperCorrect {
  border: green solid 4px;
}
.idiot {
  color: red;
  text-align: center;
}

h1 {
  color: var(--secondary-dark);
  margin: 10px 0;
}

.line {
  width: 80%;
  border: 1px solid var(--secondary-dark);
  margin: 10px 0;
}

select {
  border-radius: 10px;
  padding: 4px;
  text-align: center;
  font-weight: 600;
}
.select-btn {
  background-color: var(--primary-dark);
  border: none;
  border-radius: 50px;
  padding: 8px 14px;
  font-size: 16px;
  color: var(--primary-white);
  cursor: pointer;
  margin: 10px 0;
}

.select-btn:hover {
  color: var(--primary-dark);
  outline: 2px solid var(--primary-dark);
  background: var(--primary-white);
}
</style>
