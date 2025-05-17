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
  }
}

export async function modifyPasswordDialogs(
  user: string,
  locale: string,
  caller: (a: string, b: string) => Promise<void>
) {
  const token = await temporaryToken(user)
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
