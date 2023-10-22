# Read All Impressions<Badge type="info" text="GET" />

地址： `/activity/:aid/impression`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称 | 类型     | 位置 | 必须 | 描述            |
| ---- | -------- | ---- | ---- | --------------- |
| aid  | `string` | 路径 | 是   | The activity id |

## 响应体

ActivityMember[]

## 权限

| --- | --- |
| in-class | 2 |
| campus | 4 |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/activity/6534bb9eb52882bb804e98b1/impression', {
  method: 'GET',
  params: {},
})
```

## 成功案例

````json
{
  "code": 200,
  "status": "success",
  "data": "undefined // 请自行查阅 ActivityMember[] 类型"
}
```## 失败案例

```json
{
  "code": 404,
  "status": "error",
  "message": "Not Found"
}
````

## 定义

```yaml
name: Read All Impressions
path: /activity/:aid/impression
method: GET
params:
  - name: aid
    in: path
    type: string
    required: true
    description: The activity id
response: ActivityMember[]
permissions:
  in-class: 2
  campus: 4
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
