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
  caller: (a: string, b: string) => Promise<void>
) {
  const token = await temporaryToken(user)
  if (!token) {
    throw new Error('Authorization canceled')
  }
  const strongPasswordValidator = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$'
  )
  const input = await ElMessageBox.prompt(
    locales['zh-CN'].password.message,
    locales['zh-CN'].password.title,
    {
      confirmButtonText: locales['zh-CN'].password.confirmButtonText,
      cancelButtonText: locales['zh-CN'].password.cancelButtonText,
      inputValidator: (ipt: string) => strongPasswordValidator.test(ipt),
      inputType: 'password',
      inputErrorMessage: locales['zh-CN'].password.inputErrorMessage
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
      inputType: ''zh-CN'',
      inputErrorMessage: locales['zh-CN'].password_confirm.inputErrorMessage
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
