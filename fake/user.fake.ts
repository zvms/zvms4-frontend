import { faker as faker } from '@faker-js/faker/locale/zh_CN'
import ObjectID from 'bson-objectid'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

function generateNumber() {
  return faker.number.int({
    min: 2021,
    max: 2023
  }) *
    1000 +
    faker.number.int({
      min: 1,
      max: 20
    }) *
      100 +
    faker.number.int({
      min: 1,
      max: 60
    })
}

function generateCode() {
  const school = ([0, 3])[faker.number.int({ min: 0, max: 1 })] * 10 + 9
  const grade = faker.number.int({ min: 21, max: 23 })
  const class_ = faker.number.int({ min: 1, max: 10 })
  const number = faker.number.int({ min: 1, max: 60 })
  return (school * 100000 + grade * 10000 + class_ * 100 + number)
}

function createPerson(id?: string) {
  return {
    _id: id ? id : new ObjectID().toHexString(),
    id: generateNumber(),
    name: faker.person.fullName(),
    sex: faker.person.sex(),
    position: ['system', 'admin', 'auditor', 'department', 'secretary', 'student'][
      faker.number.int({ min: 0, max: 5 })
    ],
    code: generateCode()
  }
}

export default defineFakeRoute([
  {
    url: '/user/:id',
    method: 'GET',
    response({ params }) {
      return {
        code: 200,
        data: createPerson(params.id)
      }
    }
  },
  {
    url: '/user/:id/time',
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
  }
])
