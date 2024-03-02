import axios, { AxiosError } from 'axios'
import { ElMessageBox, ElNotification } from 'element-plus'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const axiosInstance = axios.create({
  baseURL:
    new URL(location.href).protocol === 'https:'
      ? 'https://api.zvms.site/api/'
      : 'http://localhost:8001/api/',
  // If using `http`, it must be testing or the `window.crypto.subtle` will not work.
  withCredentials: false,
  timeout: 12000,
  headers: {
    'Content-type': 'application/json',
    Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
  }
})

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
  (error: Error | AxiosError) => {
    nprogress.done()
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        ElNotification({
          title: 'Error',
          message: 'Your session has expired, or you are not authorized. Please login again.',
          type: 'error'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/user/login'
        console.log(error)
      } else {
        ElMessageBox({
          title: 'Error',
          message: error.response?.data,
          type: 'error'
        }).then(() => Promise.reject(error))
      }
    } else {
      ElMessageBox({
        title: 'Error',
        message: error.message,
        type: 'error'
      }).then(() => Promise.reject(error))
    }
  }
)

export default axiosInstance
