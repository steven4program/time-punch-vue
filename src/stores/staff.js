import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import staffsAPI from './../apis/staffs'

export const useStaffStore = defineStore('staff', () => {
  const staff = reactive({
    id: -1,
    email: ''
  })

  const isAuthenticated = ref(false)

  const setCurrentStaff = (staff, currentStaff) => {
    staff.id = currentStaff.id
    staff.name = currentStaff.name
    staff.email = currentStaff.email

    isAuthenticated.value = true
  }

  const fetchCurrentStaff = async () => {
    try {
      const { data } = await staffsAPI.getCurrentStaff()
      if (data.status === 'error') {
        throw new Error(data.message)
      }
      setCurrentStaff(staff, data)
      console.log('data', data)
    } catch (error) {
      console.log(error)
    }
  }

  return { staff, isAuthenticated, setCurrentStaff, fetchCurrentStaff }
})
