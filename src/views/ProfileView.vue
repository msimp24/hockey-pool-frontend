<script setup>
import { ref } from 'vue'

const apiUrl = ref(import.meta.env.VITE_API_URL)
</script>

<template>
  {{ apiUrl }}
  <h1>Profile View</h1>
</template>
