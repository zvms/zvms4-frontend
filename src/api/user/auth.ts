import axios from "@/plugins/axios";

export async function UserLogin(user: number, password: string) {
  const result = await axios('/user/login', {
    method: 'POST',
    data: {
      user,
      password,
      mode: 'validate'
    }
  })
  return result.data
}

export async function GetToken(user: number, password: string) {
  const result = await axios('/user/login', {
    method: 'POST',
    data: {
      user,
      password,
      mode: 'token'
    }
  })
  return result.data
}
