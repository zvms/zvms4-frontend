# Create Activity<Badge type="tip" text="POST" />

地址： `/activity`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 响应体

ObjectId

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/activity', {
  method: 'POST',
  body: {},
})
```

## 成功案例

````json
{
  "code": 201,
  "status": "success",
  "data": "undefined // 请自行查阅 ObjectId 类型"
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
name: Create Activity
path: /activity
method: POST
body: ActivityInstance
response: ObjectId
permission:
  special: 1
  specified: 4
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
