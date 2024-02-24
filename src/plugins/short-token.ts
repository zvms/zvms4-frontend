import { ElMessageBox } from 'element-plus'
import api from '@/api'

export function temporaryToken(userid: string): Promise<string> {
  return new Promise((resolve, reject) => {
    ElMessageBox.prompt('Please enter your password to continue', 'Password', {
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputType: 'password',
      type: 'warning'
    }).then(({ value }) => {
      api.user.auth.useLongTermAuth(userid, value, 'short').then((result) => {
        if (result) {
          resolve(result.token)
        } else {
          reject('Login failed')
        }
      }).catch((err) => {
        reject(err)
      })
    })
  })
}
