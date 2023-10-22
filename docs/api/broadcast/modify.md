# Modify Broadcast<Badge type="warning" text="PUT" />

地址： `/broadcast/:id`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称 | 类型     | 位置 | 必须 | 描述                         |
| ---- | -------- | ---- | ---- | ---------------------------- |
| id   | `string` | 路径 | 是   | The broadcast id (Object Id) |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/broadcast/20231532', {
  method: 'PUT',
  body: {},
})
```

## 成功案例

```json
{ "status": "success", "code": 200 }
```

## 失败案例

```json
{
  "code": 500,
  "status": "error",
  "message": "Internal Server Error"
}
```

## 定义

```yaml
name: Modify Broadcast
path: /broadcast/:id
method: PUT
params:
  - name: id
    in: path
    type: string
    required: true
    description: The broadcast id (Object Id)
body: Broadcast
response: null
permission: 4
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
