# Edit Impression<Badge type="warning" text="PUT" />

地址： `/user/:id/activity/:aid/impression`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称       | 类型     | 位置   | 必须 | 描述                               |
| ---------- | -------- | ------ | ---- | ---------------------------------- |
| id         | `string` | 路径   | 是   | The user id (number)               |
| aid        | `string` | 路径   | 是   | The activity id (Object Id)        |
| impression | `string` | 请求体 | 是   | The new impression of the activity |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/user/20231116/activity/6534bb9eb52882bb804e98b0/impression', {
  method: 'PUT',
  body: {
    impression:
      'Viscus cum provident comis. Dapifer cursus canto abstergo incidunt capillus earum studio. Cur delibero excepturi iste vulariter thermae.',
  },
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
name: Edit Impression
path: /user/:id/activity/:aid/impression
method: PUT
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
  - name: impression
    in: body
    type: string
    required: true
    description: The new impression of the activity
response: null
permission: 1
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
