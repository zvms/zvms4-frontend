import type { ResponseItem, Response } from './.d'

export function createResponseDocumentContent(
  response: Response,
  language: 'zh-CN' | 'en-US' = 'zh-CN'
) {
  const isChinese = language === 'zh-CN'
  const keys = isChinese ? ['名称', '类型', '描述'] : ['Name', 'Type', 'Description']
  const content = keys.reduce((prev, curr) => {
    return prev + `| ${curr} `
  }, '| --- | --- | --- |\n')
  const responseContent = (response as ResponseItem[]).reduce((prev, curr) => {
    return prev + `| ${curr.name} | ${curr.type} | ${curr.description || ''} |\n`
  }, '')
  return content + responseContent
}
