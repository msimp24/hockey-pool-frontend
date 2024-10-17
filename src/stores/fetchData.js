import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router/index'

export const useFetchData = defineStore('getData', () => {
  const matchups = ref([])
  const isLoading = ref([])
  const error = ref(null)
  const matchup = ref(null)
  const userPoolId = ref(null)
  const userPoolError = ref(null)
  const weekDate = ref(null)
  const userWeeklyPicks = ref(null)
  const userPoolData = ref([])

  const getMatchupById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/matchup/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      matchup.value = data.match
    } catch (err) {
      console.log(err)
    }
  }

  const getWeeklyMatchups = async (year, week) => {
    try {
      isLoading.value = true
      const response = await fetch(`http://localhost:8080/matchup/weekly/${year}/${week}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      matchups.value = data.match[0].saturdayMatchups
      weekDate.value = data.match[0].saturdayMatchups[0].date
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  const getUserPoolId = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user-pool`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        userWeeklyPicks.value = data.userPool[0].weeklyPicks
        userWeeklyPicks.value.shift()
        userPoolId.value = data.userPool[0]._id
      } else {
        error.value = await response.json()
      }
    } catch (err) {
      userPoolError.value = err.message
    }
  }

  const getUserPoolData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user-pool/get-pool-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        userPoolData.value = data.data
      } else {
        error.value = await response.json()
      }
    } catch (err) {
      userPoolError.value = err.message
    }
  }

  return {
    matchups,
    getWeeklyMatchups,
    isLoading,
    error,
    matchup,
    getMatchupById,
    getUserPoolId,
    userPoolId,
    weekDate,
    userWeeklyPicks,
    getUserPoolData,
    userPoolData
  }
})

export const useFetchPicks = defineStore('getpicks', () => {
  const pick = ref(null)
  const error = ref(null)
  const isLoading = ref([])
  const weeklyPick = ref(null)

  const makeWeeklyPick = async (userPoolId, matchupId, selectedTeam, weekNumber) => {
    try {
      isLoading.value = true
      const response = await fetch(`http://localhost:8080/picks/${userPoolId}/pick`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          matchupId: matchupId,
          selectedTeam: selectedTeam,
          weekNumber: weekNumber
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        pick.value = data
        error.value = null
      } else {
        error.value = await response.json()
      }
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const getWeeklyPick = async (week) => {
    try {
      isLoading.value = true
      const response = await fetch(`http://localhost:8080/picks/get-pick/${week}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      weeklyPick.value = data
      console.log(weeklyPick.value)
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }
  return { pick, error, isLoading, makeWeeklyPick, getWeeklyPick, weeklyPick }
})

export const usePoolStore = defineStore('poolStore', () => {
  const isLoading = ref(false)
  const userPool = ref(null)
  const error = ref(null)
  const createPoolError = ref(null)
  const pool = ref(null)

  const joinPool = async (teamName, entryCode) => {
    try {
      isLoading.value = true
      const response = await fetch(`http://localhost:8080/user-pool/join`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          teamName: teamName,
          entryCode: entryCode
        })
      })
      if (response.ok) {
        const data = await response.json()
        userPool.value = data.userPool
        router.push('/dashboard/2')
        error.value = null
      } else {
        if (response && response.status === 404) {
          error.value = 'Pool not found'
          router.push({ name: 'home' })
        }

        if (response && response.status === 400) {
          error.value = 'You are already in this pool'
          router.push({ name: 'home' })
        }
      }
    } catch (err) {
      error.value = 'Something went wrong'
      router.push({ name: 'home' })
    }
  }

  const createNewPool = async (formData) => {
    console.log(formData.name)
    try {
      isLoading.value = true
      const response = await fetch(`http://localhost:8080/pool/create-pool`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          sport: formData.sport,
          teamName: formData.teamName,
          startingLives: formData.startingLives,
          entryCode: formData.entryCode
        })
      })
      if (response.ok) {
        const data = await response.json()
        pool.value = data
        router.push('/dashboard/1')
        createPoolError.value = null
      } else {
        if (response && response.status === 404) {
          createPoolError.value = 'Unable to create pool'
          router.push({ name: 'home' })
        }
      }
    } catch (err) {
      error.value = 'Something went wrong'
      router.push({ name: 'home' })
    }
  }

  return { joinPool, userPool, error, createNewPool, createPoolError }
})
