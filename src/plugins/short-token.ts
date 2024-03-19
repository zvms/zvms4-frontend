import { ElMessageBox } from 'element-plus'
import api from '@/api'

export function temporaryToken(
  userid: string,
  validate: boolean = true,
  locale: 'zh-CN' | 'en-US' | 'zh-TW' | 'ja-JP' | 'fr-FR' = 'en-US'
): Promise<string> {
  const locales = {
    'zh-CN': {
      title: '请输入密码',
      message: '危险操作，您必须输入密码才能继续。',
      confirm: '确认',
      cancel: '取消',
      validation:
        '密码必须包含大小写字母和数字，且长度不小于8位。如果您尚未重置密码，您应该先重置密码。'
    },
    'en-US': {
      title: 'Please enter your password',
      message: 'Dangerous operation, you must enter your password to continue.',
      confirm: 'Confirm',
      cancel: 'Cancel',
      validation:
        'The password must contain uppercase and lowercase letters and numbers, and the length must be at least 8 characters. You should reset your password first if you have not done so.'
    },
    'zh-TW': {
      title: '請輸入密碼',
      message: '危險操作，您必須輸入密碼才能繼續。',
      confirm: '確認',
      cancel: '取消',
      validation:
        '密碼必須包含大小寫字母和數字，且長度不小於8位。如果您尚未重置密碼，您應該先重置密碼。'
    },
    'ja-JP': {
      title: 'パスワードを入力してください',
      message: '危険な操作です。続行するにはパスワードを入力する必要があります。',
      confirm: '確認',
      cancel: 'キャンセル',
      validation:
        'パスワードには大文字と小文字の英字、数字が含まれ、長さは8文字以上である必要があります。まだパスワードをリセットしていない場合は、まずパスワードをリセットする必要があります。'
    },
    'fr-FR': {
      title: 'Veuillez entrer votre mot de passe',
      message: 'Opération dangereuse, vous devez entrer votre mot de passe pour continuer.',
      confirm: 'Confirmer',
      cancel: 'Annuler',
      validation:
        "Le mot de passe doit contenir des lettres majuscules et minuscules et des chiffres, et sa longueur doit être d'au moins 8 caractères. Vous devriez d'abord réinitialiser votre mot de passe si vous ne l'avez pas déjà fait."
    }
  }
  return new Promise((resolve, reject) => {
    ElMessageBox.prompt(locales[locale].message, locales[locale].title, {
      confirmButtonText: locales[locale].confirm,
      cancelButtonText: locales[locale].cancel,
      inputType: 'password',
      type: 'warning'
    }).then(({ value }) => {
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
  })
}
