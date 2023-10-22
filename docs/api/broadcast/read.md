# Read Broadcasts<Badge type="info" text="GET" />

地址： `/broadcast`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 响应体

Broadcast[]

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/broadcast', {
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
  "code": 401,
  "status": "error",
  "message": "Unauthorized"
}
````

## 定义

```yaml
name: Read Broadcasts
path: /broadcast
method: GET
response: Broadcast[]
permission: 4
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
