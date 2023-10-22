# Download Exported Activity<Badge type="info" text="GET" />

Download Exported Activity

地址： `/activity/export/download/:id`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称 | 类型     | 位置 | 必须 | 描述                  |
| ---- | -------- | ---- | ---- | --------------------- |
| id   | `string` | 路径 | 是   | The Task Id (UUID v4) |

## 响应体

File

## 响应头

| --- | --- |
| `Content-Type` | `'text/csv' | 'application/json'` |
| `Content-Disposition` | `'attachment; filename=export.csv' | 'attachment; filename=export.json'` |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/activity/export/download/20231256', {
  method: 'GET',
  params: {},
})
```

## 成功案例

````json
{
  "code": 200,
  "status": "success",
  "data": "undefined // 请自行查阅 File 类型"
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
name: Download Exported Activity
description: Download Exported Activity
path: /activity/export/download/:id
method: GET
params:
  - name: id
    in: path
    type: string
    required: true
    description: The Task Id (UUID v4)
response_header:
  Content-Type: "'text/csv' | 'application/json'"
  Content-Disposition: "'attachment; filename=export.csv' | 'attachment; filename=export.json'"
response: File
permission: 0
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
