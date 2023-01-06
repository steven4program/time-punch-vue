import { apiHelper } from './../utils/helpers'

export default {
  getCurrentStaff() {
    return apiHelper.get('/api/get_current_staff')
  }
}
