import { apiHelper } from './../utils/helpers'

export default {
  staffLogin({ email, password }) {
    return apiHelper.post('/staffs/login', {
      email,
      password
    })
  }
}
