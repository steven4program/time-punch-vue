<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <p>{{ error }}</p>
        <p>Results: {{ decodedString }}</p>
        <qrcode-stream @decode="onDecode" @init="onInit" ></qrcode-stream>
      </div>
      <div class="mt-3 m-auto">
        <router-link to="/homepage" class="btn btn-primary btn-lg">Back</router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { QrcodeStream } from 'vue3-qrcode-reader'
import punchAPI from '../apis/punch'
import { ref } from 'vue'

const error = ref('')
const decodedString = ref('')
const token = ref('')

function onDecode(result) {
  decodedString.value = result
  token.value = JSON.parse(result).token
  punchAPI.punch()
}

async function onInit(promise) {
  try {
    await promise
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      error.value = "user denied camera access permission"
    } else if (error.name === 'NotFoundError') {
      error.value = "no suitable camera device installed"
    } else if (error.name === 'NotSupportedError') {
      error.value = "page is not served over HTTPS (or localhost)"
    } else if (error.name === 'NotReadableError') {
      error.value = "maybe camera is already in use"
    } else if (error.name === 'OverconstrainedError') {
      error.value = " did you requested the front camera although there is none?"
    } else if (error.name === 'StreamApiNotSupportedError') {
      error.value = "browser seems to be lacking features"
    }
  }
}

</script>
