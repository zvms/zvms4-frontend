# Read User Broadcasts<Badge type="info" text="GET" />

地址： `/user/:id/broadcast`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称 | 类型     | 位置 | 必须 | 描述                 |
| ---- | -------- | ---- | ---- | -------------------- |
| id   | `string` | 路径 | 是   | The user id (number) |

## 响应体

Broadcast[]

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/user/20210420/broadcast', {
  method: 'GET',
  params: {},
})
```

## 成功案例

````json
{
  "code": 200,
  "status": "success",
  "data": "undefined // 请自行查阅 Broadcast[] 类型"
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
name: Read User Broadcasts
path: /user/:id/broadcast
params:
  - name: id
    in: path
    type: string
    required: true
    description: The user id (number)
method: GET
response: Broadcast[]
permission: 1
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
