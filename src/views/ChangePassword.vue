<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="currentPassword">Current Password</label>
            <input type="password" class="form-control" name="currentPassword" id="currentPassword" placeholder="Current Password"
                   v-model.trim="inputData.currentPassword">
          </div>

          <div class="mb-3">
            <label for="newPassword">New Password</label>
            <input type="password" class="form-control" name="newPassword" id="newPassword" placeholder="New Password" v-model.trim="inputData.newPassword">
          </div>
        
          <div class="mb-3">
            <label for="confirmPassword" class="mb-2">Confirm New Password</label>
            <input type="password" class="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" v-model.trim="inputData.confirmPassword">
          </div>
          <button type="submit" class="btn btn-primary btn-block">Submit</button>
        </form>
        <div class="mt-3 m-auto">
          <router-link to="/homepage" class="btn btn-primary btn-lg">Back</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from '../utils/helpers'
import staffAPI  from '../apis/staffs'
import { useStaffStore } from '../stores/staff'

const router = useRouter()

const store = useStaffStore()

const inputData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

async function onSubmit () {
  try {
    if (!inputData.currentPassword || !inputData.newPassword || !inputData.confirmPassword) {
      Toast.fire({
        icon: 'warning',
        title: 'Three fields are all required'
      })
      return
    } else if (inputData.currentPassword === inputData.newPassword){
      inputData.newPassword = ''
      inputData.confirmPassword = ''
      Toast.fire({
        icon: 'warning',
        title: 'Current and New passwords are same'
      })
      return
    } else if (inputData.newPassword !== inputData.confirmPassword) {
      inputData.newPassword = ''
      inputData.confirmPassword = ''
      Toast.fire({
        icon: 'warning',
        title: 'Check again, passwords are different'
      })
      return
    }
    const response = await staffAPI.changPassword(
      { password: inputData.currentPassword, 
        newPassword: inputData.newPassword, 
        email: store.staff.email
      })

    const { data } = response

    console.log(data)

    if (data.status !== 'success') {
      throw new Error(data.message)
    }

    store.revokeAuth()

    router.push('/staffs/login')
  } catch (error) {
    inputData.newPassword = ''
    inputData.confirmPassword = ''

    Toast.fire({
      icon: 'warning',
      title: `${error.response.data.message}`
    })
  }
}
</script>