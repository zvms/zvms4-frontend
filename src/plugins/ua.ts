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

export function getTabletType(): 'p615' | 'p200' | 'p335' | 'unknown' {
  /**
   * Because the platform runs on XueHai tablet, which includes (only) Samsung SM-P615, SM-P200, SM-P335
   * We can use the model to determine the type of tablet
   */
  const model = result.device.model
  if (!pad()) return 'p615'
  switch (model) {
    case 'SM-P615C':
      return 'p615'
    case 'SM-P200':
      return 'p200'
    case 'SM-P335':
      return 'p335'
    default:
      return 'unknown'
  }
}
