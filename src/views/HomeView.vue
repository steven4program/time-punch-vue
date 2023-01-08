<template>
    <div class="row mt-5">
      <div class="col-md-6 m-auto">
        <div class="card card-body">
          <h1 class="text-center mt-3">Welcome <strong>{{ store.staff.name }}</strong></h1>
          <h1 class="text-center mt-1">You are using titanSoft Punch APP</h1>
          <h4 class="text-center text-info" v-if="punchData.status"><strong>{{ punchData.currentTime }}</strong> {{ punchData.message }}
          </h4>
          <div class="mt-3 m-auto">
            <button type="button" class="btn btn-primary btn-lg" @click="punch">Punch</button>
          </div>
          <div class="mt-3 m-auto">
            <button type="button" class="btn btn-primary btn-lg">QRCode</button>
          </div>
          <div class="mt-3 m-auto" >
            <router-link to="/staffs/change_password" class="btn btn-primary btn-lg">Change Password</router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import punchAPI from './../apis/punch'
import { reactive, ref } from 'vue'
import { useStaffStore } from './../stores/staff'

const store = useStaffStore()

const isProcessing = ref(false)

const punchData = reactive({
  status: false,
  message: '',
  currentTime: ''
})

const punch = async function () {
  const titanCrd = {
    lat: 25.047034391273005,
    long: 121.29228889334202
  }

  // wait for distance
  const distance = await getDistanceInMeters(titanCrd.lat, titanCrd.long)

  if (distance < 400) {
    isProcessing.value = true

    const response = await punchAPI.punch()
    punchData.message = response.data.message
    punchData.currentTime = response.data.formatCurrentTime
    punchData.status = true
    return
  }

  return console.log(`Distance is ${distance}, too far from company`)

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  function gatCoordinate() {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }

  async function getDistanceInMeters (corpLat, corpLong) {
    try {
      let pos = await gatCoordinate()
      const { latitude, longitude } = pos.coords
      let R = 6371 // Radius of the earth in km
      let dLat = deg2rad(latitude - corpLat) // deg2rad below
      let dLon = deg2rad(longitude - corpLong)
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(corpLat)) *
        Math.cos(deg2rad(latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      let d = R * c * 1000 // Distance in meters
      return Math.floor(d)
    } catch (err) {
      console.log(err)
    }
  }
}

</script>

<style>
</style>