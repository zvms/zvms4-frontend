# Modify User Password<Badge type="danger" text="短效 Token" /><Badge type="tip" text="POST" />

地址： `/user/:id/password`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称     | 类型     | 位置   | 必须 | 描述                              |
| -------- | -------- | ------ | ---- | --------------------------------- |
| id       | `string` | 路径   | 是   | The user id (number)              |
| password | `string` | 请求体 | 是   | The user password (after aes-128) |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/user/20230706/password', {
  method: 'POST',
  body: { password: 'H_F07^]]76' },
})
```

## 成功案例

```json
{ "status": "success", "code": 201 }
```

## 失败案例

```json
{
  "code": 403,
  "status": "error",
  "message": "Forbidden"
}
```

## 定义

```yaml
name: Modify User Password
path: /user/:id/password
method: POST
params:
  - name: id
    in: path
    type: string
    required: true
    description: The user id (number)
  - name: password
    in: body
    type: string
    required: true
    description: The user password (after aes-128)
response: null
permission: 1
short: true
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
