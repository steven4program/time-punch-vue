import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import staffsAPI from './../apis/staffs'

export const useStaffStore = defineStore('staff', () => {
  const staff = reactive({
    id: -1,
    name: '',
    email: '',
    isAdmin: false
  })

  const isAuthenticated = ref(false)

  const token = ref('')

  const setCurrentStaff = (staff, currentStaff) => {
    Object.assign(staff, currentStaff)

    isAuthenticated.value = true
  }

  const fetchCurrentStaff = async () => {
    try {
      const { data } = await staffsAPI.getCurrentStaff()
      if (data.status === 'error') {
        throw new Error(data.message)
      }
      setCurrentStaff(staff, data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const revokeAuth = () => {
    staff.id = -1
    staff.name = ''
    staff.email = ''
    isAuthenticated.value = false
    localStorage.removeItem('token')
    token.value = ''
  }

  return {
    staff,
    isAuthenticated,
    token,
    setCurrentStaff,
    fetchCurrentStaff,
    revokeAuth
  }
})
