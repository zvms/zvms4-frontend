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
  const content = keys.reduce((prev, curr) => {
    return prev + `| ${curr} `
  }, '| --- | --- | --- | --- | --- |\n')
  const paramsContent = params.reduce((prev, curr) => {
    return (
      prev +
      `| ${curr.name} | ${curr.type} | ${ins[curr.in]} | ${curr.required ? '是' : '否'} | ${
        curr.description || ''
      } |\n`
    )
  }, '')
  return content + paramsContent
}
