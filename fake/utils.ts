// public utilities for fake files

import { faker } from '@faker-js/faker/locale/zh_CN'

export function generateNumber() {
  return (
    faker.number.int({
      min: 2021,
      max: 2023
    }) *
      10000 +
    faker.number.int({
      min: 1,
      max: 20
    }) *
      100 +
    faker.number.int({
      min: 1,
      max: 60
    })
  )
}
