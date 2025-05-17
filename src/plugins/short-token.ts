import { ElMessageBox } from 'element-plus'
import api from '@/api'
import i18n from '@/i18n'

export function temporaryToken(userid: string): Promise<string> {
  const locale = i18n.global.locale.value
  const locales = {
    'zh-CN': {
      title: '请输入密码',
      message: '危险操作，您必须输入密码才能继续。',
      confirm: '确认',
      cancel: '取消',
      validation:
        '密码必须包含大小写字母和数字，且长度不小于 8 位。如果您尚未重置密码，您应该先重置密码。'
    },
    'en-US': {
      title: 'Please enter your password',
      message: 'Dangerous operation, you must enter your password to continue.',
      confirm: 'Confirm',
      cancel: 'Cancel',
      validation:
        'The password must contain uppercase and lowercase letters and numbers, and the length must be at least 8 characters. You should reset your password first if you have not done so.'
    }
  }
  return new Promise((resolve, reject) => {
    ElMessageBox.prompt(locales[locale].message, locales[locale].title, {
      confirmButtonText: locales[locale].confirm,
      cancelButtonText: locales[locale].cancel,
      inputType: 'password',
      type: 'warning'
    })
      .then(({ value }) => {
        api.user.auth
          .useLongTermAuth(userid, value, 'short')
          .then((result) => {
            if (result) {
              resolve(result.token)
            } else {
              reject('Login failed')
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
      .catch((err) => {
        reject(err)
      })
  })
}
