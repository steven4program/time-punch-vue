import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const getCurrentStaff = defineStore('staff', () => {
  const staff = reactive({
    id: -1,
    email: ''
  })

  const isAuthenticated = ref(false)

  const setCurrentStaff = (staff, currentStaff) => {
    staff.id = currentStaff.id
    staff.email = currentStaff.email
    isAuthenticated.value = true
  }

  return { staff, isAuthenticated, setCurrentStaff }
})
