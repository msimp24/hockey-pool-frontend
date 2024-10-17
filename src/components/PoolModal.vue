<script setup>
import { onMounted, watch, ref } from 'vue'

const props = defineProps([
  'invalidPick',
  'showModal',
  'matchupId',
  'selectedTeam',
  'week',
  'userPoodId'
])

const modal = ref(props.showModal)
const pick = ref(props.invalidPick)

onMounted(() => {
  watch(() => {
    modal.value = props.showModal
    pick.value = props.invalidPick
  })
})
</script>

<template>
  <div v-if="modal" class="modal">
    <div v-if="!invalidPick" class="wrapper">
      <p class="valid">Are you sure you want to select?</p>
      <div class="btn-container">
        <button class="select-btn" @click="modal = !modal">Cancel</button>
        <button class="select-btn" @click="modal = !modal">Submit Pick</button>
      </div>
    </div>
    <div v-else class="wrapper">
      <p class="invalid">
        You have already selected this team. Please select a different team for this week
      </p>
      <button class="select-btn" @click="modal = !modal">OK</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 300px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.wrapper {
  max-width: 400px;
  margin: 0 auto;
}

.invalid {
  margin: 20px 0;
}

.valid {
  margin: 20px 0;
}

.btn-container {
  display: flex;
  gap: 20px;
}

/* The Close Button */

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
</style>
