export function extractNonHanCharacters(str: string) {
  return str.replace(/[\u4E00-\u9FA5]/g, '')
}

export function extractHanCharactersWithPunctuation(str: string) {
  return str.replace(/[^\u4E00-\u9FA5\uFF00-\uFFEF\u3000-\u303F]/g, '')
}

export function extractHanCharacters(str: string) {
  return str.replace(/[^\u4E00-\u9FA5]/g, '')
}
