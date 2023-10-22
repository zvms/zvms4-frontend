# User Authorization<Badge type="tip" text="POST" />

地址： `/user/auth`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称     | 类型     | 位置   | 必须 | 描述                                   |
| -------- | -------- | ------ | ---- | -------------------------------------- |
| id       | `number` | 请求体 | 是   | The user id (number)                   |
| password | `string` | 请求体 | 是   | The user password (after aes-128)      |
| role     | `string` | 请求体 | 是   | The user auth role ('short' or 'long') |

## 响应体

| 名称  | 类型     | 描述                   |
| ----- | -------- | ---------------------- |
| token | `string` | The user token (jwt)   |
| id    | `string` | The user id (ObjectId) |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/user/auth', {
  method: 'POST',
  body: { id: 8731857927536640, password: '-<gT+fpl;}', role: '$iGv)8,Lc`' },
})
```

## 成功案例

````json
{
  "code": 201,
  "status": "success",
  "data": {
    "token": "uD=dE%:H}k",
    "id": "20231726"
  }
}
```## 失败案例

```json
{
  "code": 404,
  "status": "error",
  "message": "Not Found"
}
````

## 定义

```yaml
name: User Authorization
path: /user/auth
method: POST
params:
  - name: id
    in: body
    type: number
    required: true
    description: The user id (number)
  - name: password
    in: body
    type: string
    required: true
    description: The user password (after aes-128)
  - name: role
    in: body
    type: string
    required: true
    description: The user auth role ('short' or 'long')
response:
  - name: token
    type: string
    description: The user token (jwt)
  - name: id
    type: string
    description: The user id (ObjectId)
permission: 0
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
