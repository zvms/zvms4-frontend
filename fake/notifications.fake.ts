import { faker } from '@faker-js/faker/locale/zh_CN'
import { generateNumber } from './utils'

function generateNotification(_id: string) {
  return {
    _id,
    global: true,
    title: 'Notification',
    content: `Hello! ID: ${_id}`,
    time: faker.date.recent().toISOString(),
    expire: faker.date.recent().toISOString(),
    publisher: new String(generateNumber()),
    receivers: [], // TODO: ?
    anonymous: false, // TODO: ?
    type: 'normal'
  }
}

export default [
  {
    url: '/api/user/:id/notification',
    method: 'get',
    response({ params }) {
      const res = [generateNotification(params.id)]
      for (let i = 0; i < 85; i++) res.push(generateNotification(params.id))
      return {
        code: 200,
        data: res
      }
    }
  },
  {
    url: '/api/notification',
    method: 'post',
    reponse() {
      return { code: 200, data: 'success' }
    }
  }
]
