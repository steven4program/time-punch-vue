<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mt-3">Login</h1>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="mb-2">Email</label>
            <input id="email" v-model="email" name="email" type="email" class="form-control" placeholder="email" autocomplete="username" autofocus>
          </div>
          <div class="mb-3">
            <label for="password" class="mb-2">Password</label>
            <input id="password" v-model="password" name="password" type="password" class="form-control" placeholder="Password" autocomplete="current-password">
          </div>
          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from '../utils/helpers'

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
      if (!this.email || !this.password) {
        Toast.fire({
          icon: 'warning',
          title: 'Email and Password are both required'
        })
        return
      }

      authorizationAPI.staffLogin({
        email: this.email,
        password: this.password
      }).then(response => {
        const { data } = response

        if(data.status !== 'success') {
          throw new Error(data.message)
        }

        localStorage.setItem('token', data.token)
        this.$router.push('/')
      }).catch(error => {
        this.password = ''
        Toast.fire({
          icon: 'warning',
          title: 'Email or Password incorrect'
        })
        console.log('error', error)
      })
    }
  }
}
</script>

<style>
</style>