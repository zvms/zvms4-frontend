export const api_target =
  new URL(location.href).protocol === 'https'
    ? 'https://api.zvms.site/api/'
    : 'https://api.zvms.site/api/'
