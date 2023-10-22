# Create Feedback<Badge type="tip" text="POST" />

地址： `/feedback`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 响应体

string

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/feedback', {
  method: 'POST',
  body: {},
})
```

## 成功案例

````json
{
  "code": 201,
  "status": "success",
  "data": "sV^Q_*_%1+"
}
```## 失败案例

```json
{
  "code": 500,
  "status": "error",
  "message": "Internal Server Error"
}
````

## 定义

```yaml
name: Create Feedback
path: /feedback
method: POST
body: Feedback
response: string
permission: 1
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
