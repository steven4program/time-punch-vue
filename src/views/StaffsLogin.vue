<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mt-3">Login</h1>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="mb-2">Email</label>
            <input id="email" v-model="inputData.email" name="email" type="email" class="form-control" placeholder="email" autocomplete="username" autofocus>
          </div>
          <div class="mb-3">
            <label for="password" class="mb-2">Password</label>
            <input id="password" v-model="inputData.password" name="password" type="password" class="form-control" placeholder="Password" autocomplete="current-password">
          </div>
          <button type="submit" :disabled="isProcessing" class="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import authorizationAPI from './../apis/authorization'
import { Toast } from '../utils/helpers'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStaffStore } from '../stores/staff'

const staffStore = useStaffStore()

const router = useRouter()

const inputData = reactive({
  email: '',
  password: ''
})
const isProcessing = ref(false)

const handleSubmit = async function () {
  try {

    if (!inputData.email || !inputData.password) {
      Toast.fire({
        icon: 'warning',
        title: 'Email and Password are both required'
      })
      return
    }
    isProcessing.value = true

    const response = await authorizationAPI.staffLogin({
      email: inputData.email,
      password: inputData.password
    })

    const { data } = response

    if (data.status !== 'success') {
      throw new Error(data.message)
    }

    localStorage.setItem('token', data.token)

    staffStore.token = data.token
    staffStore.setCurrentStaff(staffStore.staff, data.staff)

    router.push('/homepage')
  } catch (error) {
    
    inputData.password = ''
    isProcessing.value = false
    
    Toast.fire({
      icon: 'warning',
      title: `${error.response.data.message}`
    })
  }
}
</script>

<style>
</style>