import { apiHelper } from './../utils/helpers'

export default {
  getCurrentStaff() {
    return apiHelper.get('/api/get_current_staff')
  },
  changPassword({ password, newPassword, email }) {
    return apiHelper.post('/api/staffs/new_password', {
      password,
      newPassword,
      email
    })
  }
}
