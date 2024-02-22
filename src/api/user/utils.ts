function base64ToByteArray(base64String: string) {
  const raw = atob(base64String)
  const byteArray = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) {
    byteArray[i] = raw.charCodeAt(i)
  }
  return byteArray
}

function byteArrayToHex(byteArray: Uint8Array) {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2)
  }).join('')
}

export { base64ToByteArray, byteArrayToHex }
