<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1>Your Punch QRcode is below:</h1>
        <div class="m-auto mt-3">
          <qrcode-vue :value="staffData" /> 
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
  token: ''
}

rawData.staffId = store.staff.id
rawData.token = localStorage.getItem('token')

const staffData = JSON.stringify(rawData)

</script>