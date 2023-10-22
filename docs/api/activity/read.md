# Read All Activities<Badge type="info" text="GET" />

地址： `/activity`

::: tip 提示
该版本 ZVMS 的所有 `API` 前缀均为 `/api`，版本均为 `v1`，不在 `URL` 中显示版本。
:::

## 参数

| 名称  | 类型            | 位置      | 必须         | 描述                              |
| ----- | --------------- | --------- | ------------ | --------------------------------- | -------------------------------- | --- | -------------------------------- |
| type  | `'in-class'     | 'campus'  | 'off-campus' | 'all'`                            | 查询                             | 否  | The type of activities to return |
| range | `Array<number>` | 查询      | 否           | The range of activities to return |
| query | `string`        | 查询      | 否           | The search query                  |
| mode  | `'in-class'     | 'campus'` | 查询         | 否                                | The mode of activities to return |

## 响应体

ActivityInstance[]

## 权限

| --- | --- |
| in-class | 2 |
| campus | 4 |

## 请求示例

```typescript
import { axios } from 'axios'

await axios('/activity', {
  method: 'GET',
  params: {
    type: "undefined // 请自行查阅 'in-class' | 'campus' | 'off-campus' | 'all' 类型",
    range: [2667930370179072, 7697275488829440, 2474083163832320],
    query: 'Fl4JPMNlIw',
    mode: "undefined // 请自行查阅 'in-class' | 'campus' 类型",
  },
})
```

## 成功案例

````json
{
  "code": 200,
  "status": "success",
  "data": "undefined // 请自行查阅 ActivityInstance[] 类型"
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
name: Read All Activities
path: /activity
method: GET
params:
  - name: type
    in: query
    type: "'in-class' | 'campus' | 'off-campus' | 'all'"
    required: false
    description: The type of activities to return
  - name: range
    in: query
    type: Array<number>
    required: false
    description: The range of activities to return
    default: '[0, -1]'
  - name: query
    in: query
    type: string
    required: false
    description: The search query
  - name: mode
    in: query
    type: "'in-class' | 'campus'"
    required: false
    description: The mode of activities to return
response: ActivityInstance[]
permissions:
  in-class: 2
  campus: 4
```

> 该 `API` 定义文件位于 `/api/activity/export/time.yaml[https://github.com/zvms/zvms4-frontend/tree/dev/api/activity/export/time.yaml]`
