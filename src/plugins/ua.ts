import { UAParser } from 'ua-parser-js'

const parser = new UAParser(navigator.userAgent)

const result = parser.getResult()

export const getBrowser = () => result.browser

export const getDevice = () => result.device

export const getEngine = () => result.engine

export const getOS = () => result.os

export const getUA = () => result.ua

export const getCPU = () => result.cpu

export const pad = () => {
  if (result.device.vendor === 'Samsung' && result.os.name === 'Android') {
    return true
  } else {
    return false
  }
} // If is XueHai Pad on campus, return true, use `large`

export function getTabletType(): 'p615' | 'p620' | 'p200' | 'p355' | 'unknown' {
  const model = result.device.model
  if (!pad()) return 'p620'
  switch (model) {
    case 'SM-P620':
      return 'p620'
    case 'SM-P615C':
      return 'p615'
    case 'SM-P200':
      return 'p200'
    case 'SM-P355C':
      return 'p355'
    default:
      return 'unknown'
  }
}

export function getXuehaiId(): number {
  return window.xhBrowserJava && window.xhBrowserJava?.getUserId() || 0
}
