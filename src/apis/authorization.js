import { apiHelper } from './../utils/helpers'

export default {
  staffLogin({ email, password }) {
    return apiHelper.post('/api/staffs/login', {
      email,
      password
    })
  }
}
