<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mt-3">Login</h1>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="mb-2">Email</label>
            <input id="email" v-model="email" name="email" type="email" class="form-control" placeholder="email" autocomplete="username" required autofocus>
          </div>
          <div class="mb-3">
            <label for="password" class="mb-2">Password</label>
            <input id="password" v-model="password" name="password" type="password" class="form-control" placeholder="Password" autocomplete="current-password" required>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      authorizationAPI.staffLogin({
        email: this.email,
        password: this.password
      }).then(response => {
        const { data } = response
        localStorage.setItem('token', data.token)
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>