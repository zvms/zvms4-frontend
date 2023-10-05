import axios from 'axios'
import nprogress from 'nprogress'

// Create a Axios Instance

const axiosInstance = axios.create({
  baseURL: 'http://172.31.2.4:4000/api/',
  withCredentials: true,
  timeout: 6000,
  headers: {
    "Content-type": "application/json",
  },
})

axiosInstance.defaults.withCredentials = true

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
