import type { Param } from './.d'

export function createParamsDocumentContent(
  params: Param[],
  language: 'zh-CN' | 'en-US' = 'zh-CN'
) {
  const isChinese = language === 'zh-CN'
  const keys = isChinese
    ? ['名称', '类型', '位置', '必须', '描述']
    : ['Name', 'Type', 'In', 'Required', 'Description']
  const ins = {
    body: isChinese ? '请求体' : 'Body',
    query: isChinese ? '查询' : 'Query',
    path: isChinese ? '路径' : 'Path'
  }
  const generateLine = (items: string[]) => '| ' + items.join(' | ') + ' |\n'
  const content = generateLine(keys) + generateLine(keys.map(() => '---'))
  const paramsContent = params
    .map((x) =>
      generateLine([x.name, '`' + x.type + '`', ins[x.in], x.required ? '是' : '否', x.description as string])
    )
    .join('')
  return content + paramsContent
}
