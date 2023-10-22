import { resolve } from 'path'
import type { Api } from './.d'
import { createParamsDocumentContent } from './params'
import { createResponseDocumentContent } from './response'
import { readFileSync } from 'fs'
import { dump, load } from 'js-yaml'
import { generateErrorResponse, generateRequestExample, generateSuccessResponse } from './example'
import { format } from 'prettier'

const dir_path = resolve('api', 'activity', 'export', 'time.yaml')

const file = readFileSync(dir_path).toString()

const api = load(file) as Api

export async function createApiDocumentContent(api: Api, language: 'zh-CN' | 'en-US' = 'zh-CN') {
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

  const nameContent = `# ${name}${
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
    ? `## ${isChinese ? '参数' : 'Params'}\n\n${createParamsDocumentContent(params, language)}\n\n`
    : ''
  const responseContent = response
    ? `## ${isChinese ? '响应体' : 'Response'}\n\n${createResponseDocumentContent(
        response,
        language
      )}\n\n`
    : ''
  const permissionsContent = permissions
    ? `## ${isChinese ? '权限' : 'Permissions'}\n\n${Object.keys(permissions).reduce(
        (prev, curr) => {
          return prev + `| ${curr} | ${permissions[curr]} |\n`
        },
        '| --- | --- |\n'
      )}\n\n`
    : ''
  const responseHeaderContent = response_header
    ? `## ${isChinese ? '响应头' : 'Response Header'}\n\n${Object.keys(response_header).reduce(
        (prev, curr) => {
          return prev + `| \`${curr}\` | \`${response_header[curr]}\` |\n`
        },
        '| --- | --- |\n'
      )}\n\n`
    : ''
  const dir = dir_path.replace(resolve(), '').replace(/\//g, '/')
  const definition = `
## ${isChinese ? '定义' : 'Definition'}

\`\`\`yaml
${dump(api)}
\`\`\`

> 该 \`API\` 定义文件位于 \`${dir}[https://github.com/zvms/zvms4-frontend/tree/dev${dir}]\`
`
  const requestExample = await generateRequestExample(api)
  const successResponseExample = generateSuccessResponse(api)
  const errorResponseExample = generateErrorResponse()
  const content = `${nameContent}${descriptionContent}${pathContent}

::: tip ${isChinese ? '提示' : 'TIP'}
该版本 ZVMS 的所有 \`API\` 前缀均为 \`/api\`，版本均为 \`v1\`，不在 \`URL\` 中显示版本。
:::

${dataContent}${paramsContent}${responseContent}${permissionsContent}${responseHeaderContent}${requestExample}${successResponseExample}${errorResponseExample}${definition}`
  return await format(content, {
    semi: false,
    singleQuote: true,
    parser: 'markdown'
  })
}

createApiDocumentContent(api).then(console.log)
