import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFetchData = defineStore('getData', () => {
  const matchups = ref([])
  const isLoading = ref([])
  const error = ref(null)
  const matchup = ref(null)
  const userPoolId = ref(null)

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
      const data = await response.json()
      userPoolId.value = data.userPool[0]._id
    } catch (err) {
      console.log(err)
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
    userPoolId
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
