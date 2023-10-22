# Export Activity With Items<Badge type="tip" text="POST" />

Export Activity

地址： `/activity/export/item`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 响应体

string

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/activity/export/item', {
  method: 'POST',
  body: {},
})
```

## 成功案例

````json
{
  "code": 201,
  "status": "success",
  "data": "(MroRH/T%@"
}
```## 失败案例

```json
{
  "code": 401,
  "status": "error",
  "message": "Unauthorized"
}
````

## 定义

```yaml
name: Export Activity With Items
description: Export Activity
path: /activity/export/item
method: POST
body:
  - name: type
    in: body
    type: "'all' | 'range'"
    required: true
    description: The type of export
  - name: format
    in: body
    type: "'csv' | 'json'"
    required: true
    description: The format of export
  - name: range
    in: body
    type: Array<string>
    required: false
    description: The range of export ([start, end] ISO 8601)
response: string
permission: 8
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
