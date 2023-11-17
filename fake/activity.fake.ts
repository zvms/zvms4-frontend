import { faker as fakeCN } from '@faker-js/faker/locale/zh_CN'
import ObjectID from 'bson-objectid'

function generateActivity(_id?: string) {
  return {
    _id: _id ? _id : new ObjectID().toHexString(),
    type: ['specified', 'special', 'social', 'scale'][Math.floor(Math.random() * 4)],
    name: fakeCN.lorem.words(),
    description: fakeCN.lorem.paragraph(),
    members: new Array(Math.floor(Math.random() * 10))
      .fill(0)
      .map((_, idx) =>
        generateActivityMember(
          idx === 0 ? '65577f940238690a167beb5e' : new ObjectID().toHexString()
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

function generateNumber() {
  return (
    fakeCN.number.int({
      min: 2021,
      max: 2023
    }) *
      10000 +
    fakeCN.number.int({
      min: 1,
      max: 20
    }) *
      100 +
    fakeCN.number.int({
      min: 1,
      max: 60
    })
  )
}

function generateCode() {
  const school = [0, 3][fakeCN.number.int({ min: 0, max: 1 })] * 10 + 9
  const grade = fakeCN.number.int({ min: 21, max: 23 })
  const class_ = fakeCN.number.int({ min: 1, max: 10 })
  const number = fakeCN.number.int({ min: 1, max: 60 })
  return school * 100000 + grade * 10000 + class_ * 100 + number
}

function createPerson(id?: string) {
  return {
    _id: id ? id : new ObjectID().toHexString(),
    id: generateNumber(),
    name: fakeCN.person.fullName(),
    sex: fakeCN.person.sex(),
    position: new Array(fakeCN.number.int({ min: 1, max: 3 }))
      .fill(0)
      .map(
        () =>
          ['system', 'admin', 'auditor', 'department', 'secretary', 'student'][
            fakeCN.number.int({ min: 0, max: 5 })
          ]
      ),
    code: generateCode()
  }
}

export default [
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
  },
  {
    url: '/api/activity/:id',
    method: 'get',
    response({ params }) {
      return {
        status: 'success',
        code: 200,
        data: generateActivity(params.id)
      }
    }
  },
  {
    url: '/api/activity/:id',
    method: 'put',
    response({ params }) {
      return {
        status: 'success',
        code: 200,
        data: generateActivity(params.id)
      }
    }
  },
  {
    url: '/api/activity/:id',
    method: 'delete',
    response({ params }) {
      return {
        status: 'success',
        code: 200,
        data: generateActivity(params.id)
      }
    }
  },
  {
    url: '/api/activity/:id/member',
    method: 'get',
    response({ params }) {
      return {
        status: 'success',
        code: 200,
        data: generateActivityMember(params.id)
      }
    }
  },
  {
    url: '/api/activity/:id/member',
    method: 'put',
    response({ params }) {
      return {
        status: 'success',
        code: 200,
        data: generateActivityMember(params.id)
      }
    }
  },
  {
    url: '/api/activity/:id/member',
    method: 'delete',
    response({ params }) {
      return {
        status: 'success',
        code: 200,
        data: generateActivityMember(params.id)
      }
    }
  },
  {
    url: '/api/user/:id',
    method: 'GET',
    response({ params }) {
      return {
        code: 200,
        data: createPerson('65577f940238690a167beb5e')
      }
    }
  },
  {
    url: '/api/user/:id/time',
    method: 'GET',
    response() {
      return {
        code: 200,
        data: {
          onCampus: fakeCN.number.int({ min: 0, max: 50 }),
          offCampus: fakeCN.number.int({ min: 0, max: 50 }),
          largeScale: fakeCN.number.int({ min: 0, max: 50 })
        }
      }
    }
  }
]
