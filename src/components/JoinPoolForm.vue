<script>
import BaseInput from './BaseInput.vue'
import { usePoolStore } from './../stores/fetchData'

export default {
  data() {
    return {
      teamName: '',
      entryCode: '',
      nameError: '',
      codeError: '',
      store: usePoolStore()
    }
  },
  methods: {
    submitForm(event) {
      event.preventDefault()

      if (this.teamName.length == 0) {
        this.nameError = 'Team name is a required field'
      } else {
        this.nameError = ''
      }

      if (this.entryCode.length == 0) {
        this.codeError = 'Entry code is a required field'
      } else {
        this.codeError = ''
      }

      if (!this.codeError && !this.nameError) {
        this.store.joinPool(this.teamName, this.entryCode)
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
    BaseInput
  }
}
</script>

<template>
  <form @submit="submitForm">
    <BaseInput v-model="teamName" label="Team Name" type="text" :error="nameError" />
    <BaseInput v-model="entryCode" label="Pool Entry Code" type="text" :error="codeError" />
    <p class="errorMessage" v-if="store.error">{{ store.error }}</p>

    <div class="center">
      <button>Join Pool</button>
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
