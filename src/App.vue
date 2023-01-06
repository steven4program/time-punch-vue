<template>
  <header>
    <nav class="navbar navbar-dark bg-primary justify-content-between py-2 px-4" >
      <a class="navbar-brand" href="/">Time Punch</a>
      <a class="btn btn-outline-light" @click="logout">Logout</a>
    </nav>
  </header>
<router-view />
</template>

<script setup>
  import { useStaffStore } from './stores/staff'
  import { useRouter } from 'vue-router'

  const staffStore = useStaffStore()
  const router = useRouter()

  const logout = () => {
    staffStore.revokeAuth()
    router.push('/staffs/login')
  }
</script>

<style>
</style>
