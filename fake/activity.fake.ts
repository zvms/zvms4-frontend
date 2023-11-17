import { faker as fakeCN } from '@faker-js/faker/locale/zh_CN'
import { faker as fakeEN } from '@faker-js/faker/locale/en'
import ObjectID from 'bson-objectid'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

function generateActivity() {
  return {
    _id: new ObjectID().toHexString(),
    type: ['specified', 'special', 'social', 'scale'][Math.floor(Math.random() * 4)],
    name: fakeCN.lorem.words(),
    description: fakeCN.lorem.paragraph(),
    members: new Array(Math.floor(Math.random() * 10))
      .fill(0)
      .map((_, idx) =>
        generateActivityMember(
          idx === 0 ? '60c9b1b0e6b3a3b4b8b0b0b0' : new ObjectID().toHexString()
        )
      ),
    duration: Math.floor(Math.random() * 10),
    date: fakeCN.date.recent().toISOString(),
    createdAt: fakeCN.date.recent().toISOString(),
    updatedAt: fakeCN.date.recent().toISOString()
  }
}

function generateActivityMember(_id: string) {
  return {
    _id,
    status: [
      'registered',
      'draft',
      'first-instance',
      'first-instance-rejected',
      'last-instance',
      'last-instance-rejected',
      'effective',
      'rejected'
    ][Math.floor(Math.random() * 8)],
    impression: fakeCN.lorem.paragraph(),
    duration: Math.floor(Math.random() * 10),
    history: new Array(Math.floor(Math.random() * 10))
      .fill(0)
      .map(() => generateActivityMemberHistory(new ObjectID().toHexString())),
    images: []
  }
}

function generateActivityMemberHistory(_id: string) {
  return {
    impression: fakeCN.lorem.paragraph(),
    duration: Math.floor(Math.random() * 10),
    date: fakeCN.date.recent().toISOString(),
    actioner: _id,
    action: [
      'registered',
      'draft',
      'first-instance',
      'first-instance-rejected',
      'last-instance',
      'last-instance-rejected',
      'effective',
      'rejected'
    ][Math.floor(Math.random() * 8)]
  }
}

export default defineFakeRoute([
  {
    url: '/api/activity',
    method: 'get',
    response() {
      return {
        status: 'success',
        code: 200,
        data: new Array(Math.floor(Math.random() * 12)).fill(0).map(() => generateActivity())
      }
    },
    timeout: 1000
  }
])
