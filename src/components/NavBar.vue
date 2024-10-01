<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authentication'
import router from '../router/index'

const authStore = useAuthStore()

const signOutUser = () => {
  authStore.logout()
  router.push({ name: 'login' })
}

const links = ref([
  {
    name: 'Overview',
    link: '/overview/1'
  },
  {
    name: 'Profile',
    link: '/profile'
  }
])
</script>

<template>
  <div class="hero">
    <div class="container">
      <h1>NHL Elimination Pool</h1>
      <h3>"Don't get eliminated!"</h3>
    </div>
  </div>

  <nav v-if="authStore.isAuthenticated" class="nav">
    <RouterLink class="logo" to="/">
      <img src="/icons/sticks.svg" />
    </RouterLink>
    <ul class="nav-list nav-list-primary">
      <li class="nav-item" v-for="item in links" :key="item.name">
        <RouterLink class="nav-link" :to="item.link">{{ item.name }} </RouterLink>
      </li>
    </ul>

    <ul v-if="authStore.isAuthenticated" class="nav-list nav-list-secondary">
      <li class="nav-item"><button class="nav-button" @click="signOutUser()">SIGN OUT</button></li>
    </ul>
  </nav>
</template>

<style scoped>
.hero {
  width: 100%;
  height: 150px;
  background: var(--primary-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--secondary-dark);
}

.container > h1 {
  font-size: 48px;
  text-align: center;
}
.container > h3 {
  font-size: 22px;
  margin: 10px 0;
  text-align: center;
}

.logo {
  color: var(--white);
}
img {
  height: 50px;
}
.nav {
  width: 100%;
  background-color: var(--primary-dark);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid var(--primary-white);
}
.nav-list {
  display: flex;
  gap: 30px;
  padding: 1.5rem 0;
  height: auto;
}
.nav-list-primary {
}
.nav-list-secondary {
}
.nav-item {
  list-style: none;
}
.nav-link {
  color: var(--primary-white);
  text-decoration: none;
  text-transform: uppercase;
}
.nav-button {
  background-color: var(--primary-dark);
  border: 2px solid var(--primary-white);
  border-radius: 50px;
  padding: 8px 14px;
  font-size: 16px;
  color: var(--primary-white);
}
.nav-button:hover {
  color: var(--primary-dark);
  background: var(--primary-white);
  outline: 2px solid var(--primary-white);
  cursor: pointer;
}
.router-link-active {
  border-bottom-width: 3px;
  border-bottom-style: solid;
}

.nav-link:hover {
  border-bottom-width: 3px;
  border-bottom-style: solid;
}

@media (width < 700px) {
  .nav {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nav-list {
    align-self: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .nav-list-primary {
    margin-right: 0px;
  }
  .nav-list-secondary {
    margin-right: 0px;
  }
  .logo {
    display: none;
  }
  .nav-item {
    margin: 0px;
  }
}
</style>
