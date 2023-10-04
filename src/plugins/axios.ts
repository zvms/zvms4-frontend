import axios from 'axios'
import nprogress from 'nprogress'

// Create a Axios Instance

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 3000
})

// Request Interceptor

axiosInstance.interceptors.request.use(
  config => {
    nprogress.start()
    return config
  },
  error => {
    nprogress.done()
    return Promise.reject(error)
  }
)

// Response Interceptor

axiosInstance.interceptors.response.use(
  response => {
    nprogress.done()
    return response
  },
  error => {
    nprogress.done()
    return Promise.reject(error)
  }
)

export default axiosInstance
