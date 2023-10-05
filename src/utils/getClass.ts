import type { ClassType } from '@/../@types/user'
import dayjs from 'dayjs'

export function getUserGrade(year: number) {
  const y = dayjs().year()
  console.log(y, year)
  if (dayjs().month() < 8) {
    return y - year
  } else {
    return y - year + 1
  }
}

export function getUserClass(id: number, classN?: number) {
  const year = Math.floor(id / 10000)
  console.log(id, year, classN, (classN as number) % 100)
  const classNum = classN ? classN % 100 : Math.floor((id % 10000) / 100)
  return {
    grade: getUserGrade(year),
    year,
    type: classNum > 10 ? 'J' : 'Z',
    class: classNum,
    number: Math.floor(id % 100)
  } as ClassType
}

export function getClassName(classType: ClassType) {
  const title = classType.type === 'J' ? '蛟' : '高'
  const grades = ['一', '二', '三']
  const grade = grades[classType.grade - 1]
  return `${title}${grade}（${classType.class}）班`
}
