import type { Api } from './.d'
import { createParamsDocumentContent } from './params'
import { createResponseDocumentContent } from './response'

export function createApiDocumentContent(api: Api, language: 'zh-CN' | 'en-US' = 'zh-CN') {
  const isChinese = language === 'zh-CN'
  const name = api.name
  const description = api.description || ''
  const method = api.method
  const path = api.path
  const data = api.data
  const params = api.params
  const response = api.response
  const permissions = api.permissions
  const short = api.short
  const response_header = api.response_header

  const methods = {
    GET: 'info',
    POST: 'tip',
    PUT: 'warning',
    DELETE: 'danger'
  }

  const nameContent = `## ${name}${
    short ? '<Badge type="danger" text="短效 Token" />' : ''
  }<Badge type="${methods[method]}" text="${method}" />\n\n`
  const descriptionContent = description ? `${description}\n\n` : ''
  const pathContent = `${isChinese ? '地址：' : '**Path: **'} \`${path}\`\n\n`
  const dataContent = data
    ? `### ${isChinese ? '请求体' : 'Response Body'}\n\n${createParamsDocumentContent(
        data,
        language
      )}\n\n`
    : ''
  const paramsContent = params
    ? `### ${isChinese ? '参数' : 'Params'}\n\n${createParamsDocumentContent(params, language)}\n\n`
    : ''
  const responseContent = response
    ? `### ${isChinese ? '响应体' : 'Response'}\n\n${createResponseDocumentContent(
        response,
        language
      )}\n\n`
    : ''
  const permissionsContent = permissions
    ? `### ${isChinese ? '权限' : 'Permissions'}\n\n${Object.keys(permissions).reduce(
        (prev, curr) => {
          return prev + `| ${curr} | ${permissions[curr]} |\n`
        },
        '| --- | --- |\n'
      )}\n\n`
    : ''
  const responseHeaderContent = response_header
    ? `### ${isChinese ? '响应头' : 'Response Header'}\n\n${Object.keys(response_header).reduce(
        (prev, curr) => {
          return prev + `| \`${curr}\` | \`${response_header[curr]}\` |\n`
        },
        '| --- | --- |\n'
      )}\n\n`
    : ''
  const content = `${nameContent}${descriptionContent}${pathContent}${dataContent}${paramsContent}${responseContent}${permissionsContent}${responseHeaderContent}`
  return content
}
