const pubkeyeg = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHjW3q+L5hJ8Vw5cIJJG2G801GPw
D38oKME7Cb3PG8SlL+WfaWVotHC8j3i9AG6m9L47DQ9m6cxsG3LRoFExVCIsEWEc
E7VteO34n5BqFjujOb+thHUh+6yZETUTqbIX68g55Tt2A+qpQ9CprqvwTO6oZKux
f3lGEiRtBn7H37ShAgMBAAE=
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
