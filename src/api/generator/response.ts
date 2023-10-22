import type { Response } from './.d'

export function createResponseDocumentContent(
  response: Response,
  language: 'zh-CN' | 'en-US' = 'zh-CN'
) {
  if (typeof response === 'string') return response
  const isChinese = language === 'zh-CN'
  const keys = isChinese ? ['名称', '类型', '描述'] : ['Name', 'Type', 'Description']
  const generateLine = (items: string[]) => '| ' + items.join(' | ') + ' |\n'
  const content = generateLine(keys) + generateLine(keys.map(() => '---'))
  const responseContent = response
    .map((x) => generateLine([x.name, '`' + x.type + '`', x.description ?? '']))
    .join('')
  return content + responseContent
}
