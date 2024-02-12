import { faker } from '@faker-js/faker/locale/zh_CN'
import ObjectID from 'bson-objectid'
import type {
  Trophy,
  TrophyAward,
  TrophyLevel,
  TrophyMember,
  TrophyStatus,
  TrophyType
} from '@zvms/zvms4-types'

function generateTrophy(id?: string): Trophy {
  const awards = new Array(Math.floor(Math.random() * 5)).fill(0).map(() => generateTrophyAward())
  return {
    _id: id ? id : new ObjectID().toHexString(),
    name: faker.lorem.words(),
    type: ['academic', 'art', 'sports', 'others'][Math.floor(Math.random() * 4)] as TrophyType,
    level: ['district', 'city', 'province', 'national', 'international'][
      Math.floor(Math.random() * 5)
    ] as TrophyLevel,
    awards,
    team: [true, false][Math.floor(Math.random() * 2)],
    members: new Array(Math.floor(Math.random() * 12))
      .fill(0)
      .map((_, idx) =>
        generateTrophyMember(awards, idx === 0 ? '65577f940238690a167beb5e' : undefined)
      ),
    creator: new ObjectID().toHexString(),
    instructor: faker.person.fullName(),
    status: ['pending', 'effective', 'refused'][Math.floor(Math.random() * 3)] as TrophyStatus
  }
}

function generateTrophyMember(awards: TrophyAward[], id?: string): TrophyMember {
  return {
    _id: id ? id : new ObjectID().toHexString(),
    award: awards.map((x) => x.name)[Math.floor(Math.random() * awards.length)],
    mode: ['on-campus', 'off-campus'][Math.floor(Math.random() * 2)] as TrophyMember['mode'],
    status: ['pending', 'effective', 'refused'][Math.floor(Math.random() * 3)] as TrophyStatus
  }
}

function generateTrophyAward(): TrophyAward {
  return {
    name: faker.lorem.word(),
    duration:
      faker.number.int({
        min: 0,
        max: 8
      }) / 2
  }
}

export default [
  {
    url: '/api/trophy',
    method: 'get',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: new Array(Math.floor(Math.random() * 20)).fill(0).map(() => generateTrophy())
      }
    },
    timeout: 1000
  },
  {
    url: '/api/trophy/:id',
    method: 'get',
    response({ params }) {
      return {
        status: 'ok',
        code: 200,
        data: generateTrophy(params.id)
      }
    },
    timeout: 1000
  },
  {
    url: '/api/trophy',
    method: 'post',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: new ObjectID().toHexString()
      }
    },
    timeout: 1000
  },
  {
    url: '/api/trophy/:id',
    method: 'delete',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: null
      }
    }
  },
  {
    url: '/api/trophy/:id/name',
    method: 'put',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: null
      }
    }
  },
  {
    url: '/api/trophy/:id/award',
    method: 'post',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: null
      }
    }
  },
  {
    url: '/api/trophy/:id/award/:award',
    method: 'delete',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: null
      }
    }
  },
  {
    url: '/api/trophy/:id/award/:award/duration',
    method: 'put',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: null
      }
    }
  },
  {
    url: '/api/trophy/:id/member',
    method: 'post',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: null
      }
    }
  },
  {
    url: '/api/trophy/:id/member/:uid',
    method: 'delete',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: null
      }
    }
  },
  {
    url: '/api/trophy/:id/member/:uid/duration',
    method: 'put',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: null
      }
    }
  },
  {
    url: '/api/trophy/:id/member/:uid/mode',
    method: 'put',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: null
      }
    }
  },
  {
    url: '/api/trophy/:id/member/:uid/status',
    method: 'put',
    response() {
      return {
        status: 'ok',
        code: 200,
        data: null
      }
    }
  }
]
