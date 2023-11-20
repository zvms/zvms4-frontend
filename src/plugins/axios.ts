import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// Create a Axios Instance

const axiosInstance = axios.create({
  baseURL: '/api/',
  withCredentials: true,
  timeout: 12000,
  headers: {
    'Content-type': 'application/json'
  }
})

axiosInstance.defaults.withCredentials = true

// Request Interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    nprogress.start()
    return config
  },
  (error) => {
    nprogress.done()
    return Promise.reject(error)
  }
)

// Response Interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    nprogress.done()
    return response
  },
  (error) => {
    nprogress.done()
    return Promise.reject(error)
  }
)

export default axiosInstance
