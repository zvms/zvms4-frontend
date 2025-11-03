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
      title: '修改密码',
      message: '请输入新密码',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputErrorMessage: '密码至少8位，至多14位，且至少包含大/小写字母，数字和特殊字符中的3种'
    },
    password_confirm: {
      title: '修改密码',
      message: '请再次输入新密码',
      inputErrorMessage: '密码不匹配'
    }
  },
  'en-US': {
    password: {
      title: '',
      message: '',
      confirmButtonText: '',
      cancelButtonText: '',
      inputErrorMessage: ''
    },
    password_confirm: {
      title: '',
      message: '',
      inputErrorMessage: ''
    }
  }
}

export async function modifyPasswordDialogs(
  user: string,
  locale: string,
  caller: (a: string, b: string) => Promise<void>,
  token_?: string
) {
    function validatePasswordStrength(pwd: string): boolean {
      let strength = 0
    if (!/^[ -\x7e]{8,14}$/.test(pwd)) {
      return false
    }
    if (/^(?=.*[a-z])/.test(pwd)) {
      strength += 1
    }
    if (/^(?=.*[A-Z])/.test(pwd)) {
      strength += 1
    }
    if (/^(?=.*[0-9])/.test(pwd)) {
      strength += 1
    }
    if (/^(?=.*[^a-zA-Z0-9])/.test(pwd)) {
      strength += 1
    }
    return strength >= 3
  }
  const token = token_ || (await temporaryToken(user))
  if (!token) {
    throw new Error('Authorization canceled')
  }
  const input = await ElMessageBox.prompt(
    locales['zh-CN'].password.message,
    locales['zh-CN'].password.title,
    {
      confirmButtonText: locales['zh-CN'].password.confirmButtonText,
      cancelButtonText: locales['zh-CN'].password.cancelButtonText,
      inputValidator: validatePasswordStrength,
      inputType: 'password',
      inputErrorMessage: locales['zh-CN'].password.inputErrorMessage,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
    }
  ).catch(() => {
    throw new Error('Password input canceled')
  })
  const confirm = await ElMessageBox.prompt(
    locales['zh-CN'].password_confirm.message,
    locales['zh-CN'].password_confirm.title,
    {
      confirmButtonText: locales['zh-CN'].password.confirmButtonText,
      cancelButtonText: locales['zh-CN'].password.cancelButtonText,
      inputValidator: (ipt: string) => input.value === ipt,
      inputType: 'password',
      inputErrorMessage: locales['zh-CN'].password_confirm.inputErrorMessage,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
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
