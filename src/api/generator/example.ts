import type { Api } from './.d'
import { faker } from '@faker-js/faker/locale/zh_CN'
import { ObjectId } from 'mongodb'
import { format } from 'prettier'

type Arrayable<T> = T | T[]

function generateNumber() {
  return (
    faker.number.int({
      min: 2020,
      max: 2023
    }) *
      10000 +
    faker.number.int({
      min: 1,
      max: 17
    }) *
      100 +
    faker.number.int({
      min: 1,
      max: 56
    })
  ).toString()
}

export function generateValue(type: string, name: string): Arrayable<string | number> {
  if (type === 'string') {
    if (name === 'name') {
      return faker.person.fullName()
    } else if (name === 'aid') {
      return new ObjectId().toString()
    } else if (name === 'id') {
      return generateNumber()
    } else if (name === 'sex') {
      return faker.person.sex()
    } else if (name === 'impression') {
      return faker.lorem.paragraph()
    } else {
      return faker.string.sample()
    }
  }
  if (type === 'number') {
    return faker.number.int()
  }
  // if (type.includes('|')) {
  //   const types = type.split('|').map((x) => x.trim())
  //   const counts = faker.number.int({ min: 1, max: types.length })
  //   return types[counts]
  //     .split('')
  //     .filter((x) => x !== "'")
  //     .join('')
  // }
  if (type.startsWith('Array')) {
    const types = type
      .slice(6, -1)
      .split('|')
      .map((x) => x.trim())
    const counts = faker.number.int({ min: 1, max: 5 })
    return Array.from({ length: counts }, () => generateValue(types[0], '')) as Array<
      string | number
    >
  }
  return `undefined // 请自行查阅 ${type} 类型`
}

export async function generateRequestExample(api: Api) {
  const body = {
    url: api.path,
    method: api.method,
    headers: api.response_header,
    params: {} as Record<string, unknown>,
    data: {} as Record<string, unknown>
  }
  if (api.data) {
    api.data
      .filter((x) => x.in !== 'path')
      .forEach((x) => {
        body.data[x.name] = generateValue(x.type, x.name)
      })
  }
  if (api.params) {
    api.params
      .filter((x) => x.in !== 'path')
      .forEach((x) => {
        body.params[x.name] = generateValue(x.type, x.name)
      })
  }
  const data = {
    ...body.params,
    ...body.data
  }
  let path = api.path
  api.params
    ?.filter((x) => x.in === 'path')
    .forEach((x) => {
      path = path.replace(`:${x.name}`, generateValue(x.type, x.name).toString())
    })
  return `## 请求示例
\`\`\`typescript
${await format(
  `import { axios } from 'axios'

  await axios('${path}', {
    method: '${api.method}',
    ${api.method === 'GET' ? 'params' : 'body'}: ${JSON.stringify(data)},
  })`,
  {
    semi: false,
    singleQuote: true,
    parser: 'babel-ts'
  }
)}
\`\`\`
`
}

export function generateSuccessResponse(api: Api) {
  if (api.response) {
    if (typeof api.response === 'string')
      return (
        '## 成功案例\n\n```json\n' +
        JSON.stringify(
          {
            code: api.method === 'POST' ? 201 : 200,
            status: 'success',
            data: generateValue(api.response, 'data')
          },
          null,
          2
        ) +
        '\n```'
      )
    else {
      return (
        '## 成功案例\n\n```json\n' +
        JSON.stringify(
          {
            code: api.method === 'POST' ? 201 : 200,
            status: 'success',
            data: api.response.reduce(
              (prev, curr) => {
                prev[curr.name] = generateValue(curr.type, curr.name)
                return prev
              },
              {} as Record<string, unknown>
            )
          },
          null,
          2
        ) +
        '\n```'
      )
    }
  }
  else return `## 成功案例\n\n\`\`\`json\n${JSON.stringify({
    status: 'success',
    code: api.method === 'POST' ? 201 : 200,
  })}\n\`\`\`\n\n`
}

export function generateErrorResponse() {
  const errors = [
    { text: 'Unauthorized', code: 401 },
    { text: 'Forbidden', code: 403 },
    { text: 'Not Found', code: 404 },
    { text: 'Internal Server Error', code: 500 }
  ]
  const error = faker.number.int({
    min: 0,
    max: errors.length - 1
  })
  return `## 失败案例\n\n\`\`\`json\n${JSON.stringify(
    {
      code: errors[error].code,
      status: 'error',
      message: errors[error].text
    },
    null,
    2
  )}\n\`\`\``
}
