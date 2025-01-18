import type { UserPosition } from '@zvms/zvms4-types'

export function parseJwt(token: string): {
  header: {
    alg: string
    typ: string
  }
  payload: {
    iat: number
    exp: number
    sub: string
    scope: 'access_token' | 'temporary_token'
    per: UserPosition[]
    jti: string
  }
} {
  const header = token.split('.')[0]
  const payload = token.split('.')[1]
  function base64UrlDecode(input: string) {
    return decodeURIComponent(
      atob(input.replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
  }
  return {
    header: JSON.parse(base64UrlDecode(header)),
    payload: JSON.parse(base64UrlDecode(payload))
  }
}
