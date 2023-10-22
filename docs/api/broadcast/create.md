# Create Broadcast<Badge type="tip" text="POST" />

地址： `/broadcast`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 响应体

string

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/broadcast', {
  method: 'POST',
  body: {},
})
```

## 成功案例

````json
{
  "code": 201,
  "status": "success",
  "data": "]J\")'.^/vi"
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
name: Create Broadcast
path: /broadcast
method: POST
body: Broadcast
response: string
permission: 4
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
