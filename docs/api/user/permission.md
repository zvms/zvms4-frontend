# Alter User's Permission<Badge type="danger" text="短效 Token" /><Badge type="tip" text="POST" />

地址： `/user/:id/permission`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称 | 类型     | 位置 | 必须 | 描述                 |
| ---- | -------- | ---- | ---- | -------------------- |
| id   | `string` | 路径 | 是   | The user id (number) |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/user/20201048/permission', {
  method: 'POST',
  body: {},
})
```

## 成功案例

```json
{ "status": "success", "code": 201 }
```

## 失败案例

```json
{
  "code": 404,
  "status": "error",
  "message": "Not Found"
}
```

## 定义

```yaml
name: Alter User's Permission
path: /user/:id/permission
method: POST
params:
  - name: id
    in: path
    type: string
    required: true
    description: The user id (number)
body:
  - name: permission
    in: body
    type: number
    required: true
    description: The user permission
response: null
permission: 16
short: true
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
