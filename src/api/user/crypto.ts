// Function to convert PEM formatted public key to a CryptoKey object
async function importPublicKey(pemKey: string) {
  const withoutNewlines = pemKey
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .split('\n')
    .filter((line) => line.trim() !== '')
    .join('')
  // Base64 decode the string to get the binary data
  const binaryDerString = window.atob(withoutNewlines)
  // Convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString)

  return window.crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256' // Specify the hash algorithm
    },
    true,
    ['encrypt']
  )
}

// Utility function to convert a binary string to an ArrayBuffer
function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

// Function to encrypt data using RSA-OAEP
async function encryptData(publicKey: CryptoKey, data: string) {
  const encoder = new TextEncoder()
  const encodedData = encoder.encode(data)

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP'
    },
    publicKey,
    encodedData
  )

  return encryptedData
}

export { importPublicKey, encryptData }

// // Example usage
// (async () => {
//   const publicKeyPem = 'YOUR PUBLIC KEY PEM HERE';
//   const dataToEncrypt = "Hello, World!";

//   try {
//       const publicKey = await importPublicKey(publicKeyPem);
//       const encryptedData = await encryptData(publicKey, dataToEncrypt);
//       console.log("Encrypted Data:", new Uint8Array(encryptedData));
//   } catch (e) {
//       console.error("Encryption error", e);
//   }
// })();
