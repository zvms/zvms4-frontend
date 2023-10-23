# Read User Activity<Badge type="info" text="GET" />

地址： `/user/:id/activity`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称 | 类型     | 位置 | 必须 | 描述                 |
| ---- | -------- | ---- | ---- | -------------------- |
| id   | `string` | 路径 | 是   | The user id (number) |

## 响应体

ActivityInstance[]

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/user/20200314/activity', {
  method: 'GET',
  params: {},
})
```

## 成功案例

````json
{
  "code": 200,
  "status": "success",
  "data": "undefined // 请自行查阅 ActivityInstance[] 类型"
}
```## 失败案例

```json
{
  "code": 403,
  "status": "error",
  "message": "Forbidden"
}
````

## 定义

```yaml
name: Read User Activity
path: /user/:id/activity
method: GET
params:
  - name: id
    in: path
    type: string
    required: true
    description: The user id (number)
response: ActivityInstance[]
permission: 1
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`