import axios, { AxiosError } from 'axios'
import { ElMessageBox, ElNotification } from 'element-plus'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// Create a Axios Instance

let url = 'http://localhost:8000/api/'

if (localStorage.getItem('api_url')) {
  url = localStorage.getItem('api_url') as string
} else {
  const uri = new URL(window.location.href)
  // if ip
  if (uri.port !== '80' && uri.port !== '443' && uri.hostname !== 'localhost') {
    url = `${uri.protocol}//api.${uri.hostname}/api/`
  } else {
    url = `${uri.protocol}//${uri.hostname}:${8000}/api/`
  }
}

axios({
  url: `${url}version`,
}).then(() => {}).catch(() => {
  localStorage.removeItem('api_url')
  ElMessageBox.prompt('API server not found. Please enter the correct API URL.', 'Error', {
    confirmButtonText: 'OK',
    type: 'error'
  }).then((target) => {
    new URL(url)
    localStorage.setItem('api_url', target.value)
    window.location.href = '/user/login'
  }).catch(() => {
    ElNotification({
      title: 'Error',
      message: 'API server not found. Please reload and enter the correct API URL.',
      type: 'error'
    })
  })
})

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
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
      if (error.response?.status === 401 && error.response?.data === 'Token expired') {
        localStorage.removeItem('token')
        return axiosInstance({
          method: 'post',
          url: 'auth/refresh',
          data: {
            token: localStorage.getItem('token')
          }
        })
      } else if (
        error.response?.status === 401 &&
        error.response?.data === 'Need short-term token'
      ) {
        ElMessageBox.prompt('Please enter your password to continue', 'Password', {
          confirmButtonText: 'Submit',
          cancelButtonText: 'Cancel',
          inputType: 'password',
          inputPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          inputErrorMessage:
            'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number'
        }).then(({ value }) => {
          axiosInstance({
            method: 'post',
            url: '/user/auth',
            data: {
              mode: 'short',
            }
          })
        })
      } else if (error.response?.status === 401) {
        ElNotification({
          title: 'Error',
          message: 'Your session has expired, or you are not authorized. Please login again.',
          type: 'error'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/user/login'
        console.log(error)
      } else return Promise.reject(error)
    } else return Promise.reject(error)
  }
)

export default axiosInstance
