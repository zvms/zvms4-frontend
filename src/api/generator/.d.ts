export interface Param {
  name: string
  description?: string
  type: string
  required?: boolean
  in: 'body' | 'query' | 'path'
}

export interface ResponseItem {
  name: string
  description?: string
  type: string
}

export type Response = ResponseItem[] | string

export interface Api {
  name: string
  description?: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: URL['pathname']
  data?: Array<Param>
  params?: Array<Param>
  response?: Response
  permissions?: Record<string, number>
  short?: boolean // Shot Term Token
  response_header: Record<string, string>
}
