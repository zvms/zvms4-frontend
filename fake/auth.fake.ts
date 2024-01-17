const pubkeyeg = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHcxQEyZbfrWTzOBvahQsg404jJY
d24wexXHj3VZgWyw+m2yzRjclroNLyV1uck10bVJoibn9CFseVtHyN6eOGHGuC50
QTsbcy4gtxzxNm7YRJpe56X28EgR9vX5gawEq8GAPVOyodBBSqC7YRzOoC7t9r9Q
Pkt0nCrMJON9b+xDAgMBAAE=
-----END PUBLIC KEY-----`
export default [
  {
    url: '/api/cert',
    method: 'get',
    response() {
      return {
        status: 'success',
        code: 200,
        data: pubkeyeg
      }
    }
  }
]
