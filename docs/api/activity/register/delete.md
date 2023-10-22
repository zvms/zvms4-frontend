# User Cancel the Registeration of Activity<Badge type="danger" text="DELETE" />

地址： `/user/:id/activity/:aid/register`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称 | 类型     | 位置 | 必须 | 描述                        |
| ---- | -------- | ---- | ---- | --------------------------- |
| id   | `string` | 路径 | 是   | The user id (number)        |
| aid  | `string` | 路径 | 是   | The activity id (Object Id) |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/user/20220715/activity/6534bb9eb52882bb804e98b5/register', {
  method: 'DELETE',
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
  "code": 403,
  "status": "error",
  "message": "Forbidden"
}
```

## 定义

```yaml
name: User Cancel the Registeration of Activity
path: /user/:id/activity/:aid/register
method: DELETE
params:
  - name: id
    in: path
    type: string
    required: true
    description: The user id (number)
  - name: aid
    in: path
    type: string
    required: true
    description: The activity id (Object Id)
body: null
response: null
permission: 1
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
