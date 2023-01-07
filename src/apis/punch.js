import { apiHelper } from './../utils/helpers'

export default {
  punch() {
    return apiHelper.post('/api/punch')
  }
}
