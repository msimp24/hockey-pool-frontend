<script>
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import { usePoolStore } from './../stores/fetchData'

export default {
  data() {
    return {
      formData: {
        name: '',
        sport: '',
        teamName: '',
        startingLives: 0,
        entryCode: ''
      },
      sportOptions: ['Hockey'],
      startingLivesOptions: [1, 2, 3, 4, 5],
      nameError: '',
      sportError: '',
      teamNameError: '',
      livesError: '',
      entryCodeError: '',
      store: usePoolStore()
    }
  },
  methods: {
    submitForm(event) {
      event.preventDefault()

      if (this.formData.name.length == 0) {
        this.nameError = 'Pool Name is a required field'
      } else {
        this.nameError = ''
      }

      if (this.formData.sport.length == 0) {
        this.sportError = 'Sport is a required field'
      } else {
        this.sportError = ''
      }

      if (this.formData.teamName.length == 0) {
        this.teamNameError = 'Team name is a required field'
      } else {
        this.teamNameError = ''
      }
      if (this.formData.startingLives == 0) {
        this.livesError = 'Starting lives is a required field'
      } else {
        this.livesError = ''
      }

      if (this.formData.entryCode.length == 0) {
        this.entryCodeError = 'Entry Code is a required field'
      } else {
        this.entryCodeError = ''
      }

      if (
        !this.nameError &&
        !this.sportError &&
        !this.teamNameError &&
        !this.livesError &&
        !this.entryCodeError
      ) {
        this.store.createNewPool(this.formData)
      }
    },
    inputLength(text) {
      if (text.length > 30) {
        return false
      } else {
        return true
      }
    }
  },
  components: {
    BaseInput,
    BaseSelect
  }
}
</script>

<template>
  <form @submit="submitForm">
    <BaseInput v-model="formData.name" label="Pool Name" type="text" :error="nameError" />
    <BaseSelect
      :options="sportOptions"
      v-model="formData.sport"
      :error="sportError"
      label="Select a Sport"
    />
    <BaseInput v-model="formData.teamName" label="Team Name" type="text" :error="teamNameError" />
    <BaseSelect
      :options="startingLivesOptions"
      v-model="formData.startingLives"
      label="Select how many lives"
      :error="livesError"
    />
    <BaseInput
      v-model="formData.entryCode"
      label="Entry Code"
      type="text"
      :error="entryCodeError"
    />
    <p class="errorMessage" v-if="store.createPoolError">{{ store.createPoolError }}</p>

    <div class="center">
      <button>Create Pool</button>
    </div>
  </form>
</template>

<style scoped>
form {
  background: var(--primary-white);
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
}

.errorMessage {
  color: red;
  margin: 5px 0;
}

label {
  color: var(--secondary-dark);
  font-size: 24px;
  margin: 10px 0;
}
input {
  height: 40px;
  padding: 10px;
  font-size: 24px;
}
h1 {
  color: var(--secondary-dark);
  text-align: center;
  font-weight: 400;
}

.center {
  text-align: center;
}

button {
  margin: 20px 0;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  background-color: var(--primary-dark);
  border: none;
  color: var(--primary-white);
}
button:hover {
  outline: 2px solid var(--primary-dark);
  color: var(--primary-dark);
  background: var(--primary-white);
}
.register-link {
  color: var(--secondary-dark);
}
.register-link:hover {
  color: var(--primary-dark);
}
</style>
