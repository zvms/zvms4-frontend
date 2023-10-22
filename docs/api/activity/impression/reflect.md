# Reflect Impression<Badge type="warning" text="PUT" />

地址： `/activity/:aid/impression/:id`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称   | 类型     | 位置   | 必须 | 描述                           |
| ------ | -------- | ------ | ---- | ------------------------------ |
| aid    | `string` | 路径   | 是   | The activity id                |
| id     | `string` | 路径   | 是   | The user id                    |
| status | `string` | 请求体 | 是   | The new status of the activity |

## 权限

| --- | --- |
| in-class(first) | 2 |
| campus(final) | 4 |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/activity/6534bb9eb52882bb804e98b2/impression/20231506', {
  method: 'PUT',
  body: { status: ';g1Bj[mn(c' },
})
```

## 成功案例

```json
{ "status": "success", "code": 200 }
```

## 失败案例

```json
{
  "code": 401,
  "status": "error",
  "message": "Unauthorized"
}
```

## 定义

```yaml
name: Reflect Impression
path: /activity/:aid/impression/:id
method: PUT
params:
  - name: aid
    in: path
    type: string
    required: true
    description: The activity id
  - name: id
    in: path
    type: string
    required: true
    description: The user id
  - name: status
    in: body
    type: string
    required: true
    description: The new status of the activity
response: null
permissions:
  in-class(first): 2
  campus(final): 4
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
