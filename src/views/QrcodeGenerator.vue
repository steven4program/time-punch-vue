<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1>Your Punch QRcode is below:</h1>
        <div class="m-auto mt-3">
          <qrcode-vue :value="staffData" /> 
        </div>
        <div class="mt-3 m-auto">
          <router-link to="/homepage" class="btn btn-primary btn-lg">Back</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue'
import { useStaffStore } from '../stores/staff'

const store = useStaffStore()

const rawData = {
  staffId: '',
  email: '',
  token: ''
}

rawData.staffId = store.staff.id
rawData.email = store.staff.email
rawData.token = localStorage.getItem('token')

const staffData = JSON.stringify(rawData)

</script>