export interface SuccessResponse<T> {
  status: 'ok'
  data: T
  code: number
}

export interface ErrorResponse {
  status: 'error'
  message: string
  code: number
}

export interface BadRequestResponse extends ErrorResponse {
  code: 400
}

export interface UnauthorizedResponse extends ErrorResponse {
  code: 401
}

export interface ForbiddenResponse extends ErrorResponse {
  code: 403
  permission: number
}

export interface NotFoundResponse extends ErrorResponse {
  code: 404
}

export interface ConflictResponse extends ErrorResponse {
  code: 409
}

export interface InternalErrorResponse extends ErrorResponse {
  code: 500
}

export interface NotImplementedResponse extends ErrorResponse {
  code: 501
}

export interface BadGatewayResponse extends ErrorResponse {
  code: 502
}

export interface ServiceUnavailableResponse extends ErrorResponse {
  code: 503
}

export interface GatewayTimeoutResponse extends ErrorResponse {
  code: 504
}

export interface UnknownResponse extends ErrorResponse {
  code: 0
}

export type ErrorResponseInstance =
  | BadRequestResponse
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse
  | ConflictResponse
  | InternalErrorResponse
  | NotImplementedResponse
  | BadGatewayResponse
  | ServiceUnavailableResponse
  | GatewayTimeoutResponse
  | UnknownResponse

export type Response<T> = SuccessResponse<T> | ErrorResponseInstance
