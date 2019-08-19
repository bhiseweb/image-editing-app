import { create } from 'apisauce'

const api = create({
  baseURL: 'http://localhost:4000',
  headers: {
    Accept: 'multipart/form-data'
  },
})

export default api
