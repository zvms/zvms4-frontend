export const api_target =
  new URL(location.href).protocol === 'https'
    ? 'https://api.zvms.site/api/'
    : 'http://localhost:8000/api/'
