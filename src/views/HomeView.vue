<template>
    <div class="row mt-5">
      <div class="col-md-6 m-auto">
        <div class="card card-body">
          <h1 class="text-center mt-3">Punch in to TitanSoft</h1>
          <div class="mt-3 m-auto">
            <button type="button" class="btn btn-info btn-lg" @click="punch">Punch</button>
          </div>
          <div class="mt-3 m-auto">
            <button type="button" class="btn btn-info btn-lg">QRCode</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import punchAPI from './../apis/punch'
import { ref } from 'vue'

const isProcessing = ref(false)

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
    console.log(response)
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