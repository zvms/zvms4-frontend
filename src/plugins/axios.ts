import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { parseJwt } from './jwt'
import router from '@/router'
import { useUserStore } from '@/stores/user'

// Function to get the value of a specific cookie
function getCookieValue(cookieName: string) {
  const cookies = document.cookie.split('; ')
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=')
    if (name === cookieName) {
      return value
    }
  }
  return null
}

export const baseURL = import.meta.env.PROD
  ? 'https://api.zvms.site/api/'
  : 'http://localhost:8000/api/'
// export const baseURL = 'https://api.zvms.site/api/'

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 24000,
  headers: {
    'Content-type': 'application/json',
    'Clarity-ID': getCookieValue('_clck')?.split('%7C')[0] ?? ''
  }
})

// Request Interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    nprogress.start()
    const token = localStorage.getItem('token')
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
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
    let errorDisplayed = false
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        const token = parseJwt(localStorage.getItem('token') as string)
        if (token.payload.scope === 'access_token') {
          if (!errorDisplayed) {
            errorDisplayed = true
            ElMessage({
              message: 'Session expired',
              type: 'error',
              grouping: true,
              plain: true
            })
            localStorage.removeItem('token')
            useUserStore()
              .removeUser()
              .then(() => {
                router.push('/user/login')
              })
          }
        } else {
          ElMessage({
            message: 'Your password is wrong. Please operate again.',
            type: 'error',
            grouping: true,
            plain: true
          }).then((r) => Promise.reject(r))
        }
      } else {
        if (!errorDisplayed) {
          errorDisplayed = true
          ElMessage({
            message: error.response?.data?.detail
              ? 'Error: ' +
                (typeof error.response?.data?.detail === 'string'
                  ? error.response?.data?.detail
                  : JSON.stringify(error.response?.data?.detail))
              : 'Something went wrong',
            type: 'error',
            grouping: true,
            plain: true
          })
          if (!error.response?.data?.detail && navigator.onLine) {
            router.push('/sww')
          }
        }
      }
    } else {
      if (!errorDisplayed) {
        errorDisplayed = true
        ElMessage({
          message:
            'Error:' + error.message
              ? 'data: ' + JSON.stringify(error.message)
              : 'Something went wrong',
          type: 'error',
          grouping: true,
          plain: true
        })
        if (!error.message && navigator.onLine) {
          router.push('/sww')
        }
      }
    }
  }
)

export default axiosInstance
