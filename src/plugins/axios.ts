import axios, { AxiosError } from 'axios'
import { ElMessageBox, ElNotification } from 'element-plus'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { parseJwt } from './jwt'

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

// export const baseURL = 'https://api.zvms.site/api/'
export const baseURL = import.meta.env.PROD
  ? 'https://api.zvms.site/api/'
  : 'http://localhost:8000/api/'

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 24000,
  headers: {
    'Content-type': 'application/json',
    Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
    'Clarity-ID': getCookieValue('_clck')?.split('%7C')[0] ?? ''
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
    let errorDisplayed = false
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        const token = parseJwt(localStorage.getItem('token') as string)
        if (token.payload.scope === 'access_token') {
          ElNotification({
            title: 'Error',
            message: 'Your session has expired, or you are not authorized. Please login again.',
            type: 'error'
          })
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          // window.location.href = '/user/login'
        } else {
          ElNotification({
            title: 'Error',
            message: 'Your password is wrong. Please operate again.',
            type: 'error'
          })
        }
      } else {
        if (!errorDisplayed) {
          errorDisplayed = true
          ElMessageBox({
            title: 'Error',
            message: 'data: ' + JSON.stringify(error.response?.data),
            type: 'error'
          }).then(() => Promise.reject(error))
        }
      }
    } else {
      if (!errorDisplayed) {
        errorDisplayed = true
        ElMessageBox({
          title: 'Error',
          message: 'error message: ' + error.message,
          type: 'error'
        }).then(() => Promise.reject(error))
      }
    }
  }
)

export default axiosInstance
