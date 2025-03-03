import { temporaryToken } from '@/plugins/short-token.ts'
import { ElMessageBox } from 'element-plus'

export { default as UserActivity } from './UserActivity.vue'
export { default as UserHome } from './UserHome.vue'
export { default as UserLogin } from './UserLogin.vue'
export { default as UserNav } from './UserNav.vue'

const locales: Record<
  string,
  {
    password: {
      title: string
      message: string
      confirmButtonText: string
      cancelButtonText: string
      inputErrorMessage: string
    }
    password_confirm: {
      title: string
      message: string
      inputErrorMessage: string
    }
  }
> = {
  'zh-CN': {
    password: {
      title: '重置密码',
      message: '请输入新密码',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputErrorMessage: '密码至少8位，且至少包含一个大写字母，一个小写字母，一个数字和一个特殊字符'
    },
    password_confirm: {
      title: '重置密码',
      message: '请再次输入新密码',
      inputErrorMessage: '密码不匹配'
    }
  },
  'en-US': {
    password: {
      title: 'Reset Password',
      message: 'Please input the new password',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputErrorMessage:
        'Password must be at least 8 characters long, and must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    },
    password_confirm: {
      title: 'Reset Password',
      message: 'Please input the new password again',
      inputErrorMessage: 'Password not match'
    }
  },
  'zh-TW': {
    password: {
      title: '重置密碼',
      message: '請輸入新密碼',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      inputErrorMessage: '密碼至少8位，且至少包含一個大寫字母，一個小寫字母，一個數字和一個特殊字符'
    },
    password_confirm: {
      title: '重置密碼',
      message: '請再次輸入新密碼',
      inputErrorMessage: '密碼不匹配'
    }
  },
  'ja-JP': {
    password: {
      title: 'パスワードをリセット',
      message: '新しいパスワードを入力してください',
      confirmButtonText: 'OK',
      cancelButtonText: 'キャンセル',
      inputErrorMessage:
        'パスワードは少なくとも8文字で、大文字、小文字、数字、特殊文字がそれぞれ1つ以上含まれている必要があります'
    },
    password_confirm: {
      title: 'パスワードをリセット',
      message: '新しいパスワードをもう一度入力してください',
      inputErrorMessage: 'パスワードが一致しません'
    }
  },
  'fr-FR': {
    password: {
      title: 'Réinitialiser le mot de passe',
      message: 'Veuillez entrer le nouveau mot de passe',
      confirmButtonText: "D'accord",
      cancelButtonText: 'Annuler',
      inputErrorMessage:
        'Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'
    },
    password_confirm: {
      title: 'Réinitialiser le mot de passe',
      message: 'Veuillez entrer le nouveau mot de passe à nouveau',
      inputErrorMessage: 'Le mot de passe ne correspond pas'
    }
  }
}

export async function modifyPasswordDialogs(
  user: string,
  locale: string,
  caller: (a: string, b: string) => Promise<void>
) {
  const token = await temporaryToken(user, false)
  if (!token) {
    throw new Error('Token is not available')
  }
  const strongPasswordValidator = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$'
  )
  const input = await ElMessageBox.prompt(
    locales[locale].password.message,
    locales[locale].password.title,
    {
      confirmButtonText: locales[locale].password.confirmButtonText,
      cancelButtonText: locales[locale].password.cancelButtonText,
      inputValidator: (ipt: string) => strongPasswordValidator.test(ipt),
      inputType: 'password',
      inputErrorMessage: locales[locale].password.inputErrorMessage
    }
  ).catch(() => {
    throw new Error('Password input canceled')
  })
  const confirm = await ElMessageBox.prompt(
    locales[locale].password_confirm.message,
    locales[locale].password_confirm.title,
    {
      confirmButtonText: locales[locale].password.confirmButtonText,
      cancelButtonText: locales[locale].password.cancelButtonText,
      inputValidator: (ipt: string) => input.value === ipt,
      inputType: 'password',
      inputErrorMessage: locales[locale].password_confirm.inputErrorMessage
    }
  ).catch(() => {
    throw new Error('Password confirm canceled')
  })
  if (input.value === confirm.value) {
    await caller(token, input.value)
  } else {
    throw new Error('Password not match')
  }
}
