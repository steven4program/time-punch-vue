<template>
  <header>
    <nav class="navbar navbar-dark bg-primary justify-content-between py-2 px-4">
      <a class="navbar-brand" href="/">Time Punch</a>
      <a v-if="store.isAuthenticated" class="btn btn-outline-light" @click="logout">Logout</a>
    </nav>
  </header>
</template>

<script setup>
import { useStaffStore } from './../stores/staff'
import { useRouter } from 'vue-router'

const store = useStaffStore()
const router = useRouter()

const logout = () => {
  store.revokeAuth()
  router.push('/staffs/login')
}
</script>