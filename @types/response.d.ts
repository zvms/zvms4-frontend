export interface UserLoginRequest {
  user: number
  password: string
  mode: 'validate' | 'token'
}

export interface SuccessResponse<T> {
  status: 'success'
  code: number
  data?: T
}

export interface ErrorResponse {
  status: 'error'
  code: number
  message: string
}
