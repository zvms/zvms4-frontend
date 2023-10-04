import { UAParser } from "ua-parser-js";

const parser = new UAParser(navigator.userAgent);

const result = parser.getResult();

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
