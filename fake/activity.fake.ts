import { faker } from '@faker-js/faker/locale/zh_CN'
import { generateNumber } from './utils'
import ObjectID from 'bson-objectid'

function generateActivity(_id?: string, serie: boolean = true) {
  return {
    _id: _id ? _id : new ObjectID().toHexString(),
    type: ['specified', 'special', 'social', 'scale'][Math.floor(Math.random() * 4)],
    name: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    members: new Array(Math.floor(Math.random() * 25) + 1)
      .fill(0)
      .map((_, idx) =>
        generateActivityMember(
          idx === 0 ? '65577f940238690a167beb5e' : new ObjectID().toHexString(),
          serie
        )
      ),
    duration: Math.floor(Math.random() * 10),
    registration: generateRegistration(),
    date: faker.date.recent().toISOString(),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    creator: new ObjectID().toHexString(),
    status: ['pending', 'effective', 'refused'][Math.floor(Math.random() * 3)],
    special: generateSpecial()
  }
}

function generateSpecial() {
  return {
    classify: ['prize', 'import', 'club', 'deduction', 'other'][Math.floor(Math.random() * 5)],
    mode: ['on-campus', 'off-campus', 'large-scale'][Math.floor(Math.random() * 3)],
    prize: {
      level: ['district', 'city', 'province', 'national', 'international'][
        Math.floor(Math.random() * 5)
      ],
      type: ['personal', 'team'][Math.floor(Math.random() * 2)],
      classify: ['sports', 'academy', 'art', 'other'][Math.floor(Math.random() * 4)]
    }
  }
}

function generateRegistration() {
  return {
    place: faker.location.city(),
    deadline: faker.date.recent().toISOString(),
    classes: new Array(Math.floor(Math.random() * 10)).fill(0).map(() => ({
      class:
        faker.number.int({ min: 2021, max: 2023 }) * 100 + faker.number.int({ min: 1, max: 20 }),
      max: faker.number.int({ min: 1, max: 30 })
    }))
  }
}

function generateActivityMember(_id: string, serie: boolean = true) {
  return {
    _id,
    status: ['draft', 'pending', 'effective', 'rejected', 'refused'][Math.floor(Math.random() * 5)],
    impression: serie ? '' : faker.lorem.paragraph(),
    duration: Math.floor(Math.random() * 10),
    history: serie
      ? []
      : new Array(Math.floor(Math.random() * 8))
          .fill(0)
          .map(() => generateActivityMemberHistory(new ObjectID().toHexString())),
    images: [],
    mode: ['on-campus', 'off-campus', 'large-scale'][Math.floor(Math.random() * 3)]
  }
}

function generateActivityMemberHistory(_id: string) {
  return {
    impression: faker.lorem.paragraph(),
    duration: Math.floor(Math.random() * 10),
    date: faker.date.recent().toISOString(),
    actioner: _id,
    action: ['draft', 'pending', 'effective', 'rejected', 'refused'][Math.floor(Math.random() * 5)]
  }
}

function generateCode() {
  const school = [0, 3][faker.number.int({ min: 0, max: 1 })] * 10 + 9
  const grade = faker.number.int({ min: 21, max: 23 })
  const class_ = faker.number.int({ min: 1, max: 10 })
  const number = faker.number.int({ min: 1, max: 60 })
  return school * 1000000 + grade * 10000 + class_ * 100 + number
}

function createPerson(id?: string) {
  return {
    _id: id ? id : new ObjectID().toHexString(),
    id: generateNumber(),
    name: faker.person.fullName(),
    sex: faker.person.sex(),
    position:
      faker.number.int({ min: 0, max: 3 }) === 0
        ? ['student', 'secretary', 'department', 'auditor', 'admin']
        : [
            ['teacher', 'secretary', 'department', 'auditor', 'admin'][
              Math.floor(Math.random() * 5)
            ]
          ],
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
        data: new Array(Math.floor(Math.random() * 400)).fill(0).map(() => generateActivity())
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
        data: generateActivity(params.id, false)
      }
    }
  },
  {
    url: '/api/activity',
    method: 'post',
    response() {
      return {
        status: 'success',
        code: 200,
        data: new ObjectID().toHexString()
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
    url: '/api/activity/:id/title',
    method: 'put',
    response() {
      return {
        status: 'success',
        code: 200,
      }
    }
  },
  {
    url: '/api/activity/:id/description',
    method: 'put',
    response() {
      return {
        status: 'success',
        code: 200,
      }
    }
  },
  {
    url: '/api/activity/:id/status',
    method: 'put',
    response() {
      return {
        status: 'success',
        code: 200,
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
    response() {
      return {
        code: 200,
        data: createPerson('65577f940238690a167beb5e')
      }
    }
  },
  {
    url: '/api/user',
    method: 'GET',
    response() {
      return {
        code: 200,
        data: [
          createPerson('65577f940238690a167beb5e'),
          ...new Array(
            faker.number.int({
              min: 4,
              max: 15
            })
          )
            .fill(0)
            .map(() => createPerson())
        ]
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
          onCampus: faker.number.int({ min: 0, max: 50 }),
          offCampus: faker.number.int({ min: 0, max: 50 }),
          largeScale: faker.number.int({ min: 0, max: 50 })
        }
      }
    }
  },
  {
    url: '/api/user/:id/activity',
    method: 'GET',
    response() {
      return {
        code: 200,
        status: 'success',
        data: new Array(Math.floor(Math.random() * 100)).fill(0).map(() => generateActivity())
      }
    }
  },
  {
    url: '/api/user/:id/activity/:aid/status',
    method: 'PUT',
    response() {
      return {
        code: 200,
        status: 'success'
      }
    }
  },
  {
    url: '/api/user/:id/activity/:aid/impression',
    method: 'PUT',
    response() {
      return {
        code: 200,
        status: 'success'
      }
    }
  },
  {
    url: '/api/activity/:aid/member',
    method: 'POST',
    response() {
      return {
        code: 200,
        status: 'success'
      }
    }
  },
  {
    url: '/api/activity/:aid/member/:mid',
    method: 'DELETE',
    response() {
      return {
        code: 200,
        status: 'success'
      }
    }
  },
  {
    url: '/api/user/auth',
    method: 'POST',
    response() {
      return {
        code: 200,
        status: 'success',
        data: {
          token:
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTc3Zjk0MDIzODY5MGExNjdiZWI1ZSIsIm5hbWUiOiJhZG1pbiIsInNleCI6IjIwMjEtMDQtMjZUMjA6MjA6MjYuMjY2WiIsInN1YiI6ImFkbWluIiwiaWF0IjoxNjE4NjY0NjI2LCJleHAiOjE2M',
          _id: '65577f940238690a167beb5e'
        }
      }
    }
  }
]
