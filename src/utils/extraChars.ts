export function extractNonHanCharacters(str: string) {
  return str.replace(/[\u4E00-\u9FA5]/g, '')
}

export function extractHanCharacters(str: string) {
  return str.replace(/[^\u4E00-\u9FA5]/g, '')
}
