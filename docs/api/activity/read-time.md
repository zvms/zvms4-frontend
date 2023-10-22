# Get User Time<Badge type="info" text="GET" />

地址： `/user/:id/time`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称 | 类型     | 位置 | 必须 | 描述                 |
| ---- | -------- | ---- | ---- | -------------------- |
| id   | `string` | 路径 | 是   | The user id (number) |

## 响应体

| 名称       | 类型     | 描述                                     |
| ---------- | -------- | ---------------------------------------- |
| onCampus   | `number` | The time spent on campus activities      |
| offCampus  | `number` | The time spent off campus activities     |
| largeScale | `number` | The time spent on large scale activities |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/user/20220852/time', {
  method: 'GET',
  params: {},
})
```

## 成功案例

````json
{
  "code": 200,
  "status": "success",
  "data": {
    "onCampus": 2844949869494272,
    "offCampus": 7749801680568320,
    "largeScale": 902334490083328
  }
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
name: Get User Time
path: /user/:id/time
method: GET
params:
  - name: id
    in: path
    type: string
    required: true
    description: The user id (number)
response:
  - name: onCampus
    type: number
    description: The time spent on campus activities
  - name: offCampus
    type: number
    description: The time spent off campus activities
  - name: largeScale
    type: number
    description: The time spent on large scale activities
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
