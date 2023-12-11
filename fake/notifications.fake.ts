import { faker } from '@faker-js/faker/locale/zh_CN'
import { generateNumber } from './utils'

function generateNotification(_id: string) {
  return {
    _id,
    global: true,
    title: 'Notification',
    content: 'Hello! ID: ' + _id,
    time: faker.date.recent().toISOString(),
    expire: faker.date.recent().toISOString(),
    publisher: generateNumber(),
    receivers: [], // TODO: ?
    anonymous: false, // TODO: ?
    type: 'normal'
  }
}

export default [
  {
    url: '/api/user/:id/broadcast',
    method: 'get',
    response({ params }) {
      return {
        code: 200,
        data: new Array(20).fill(generateNotification(params.id))
      }
    }
  }
]
