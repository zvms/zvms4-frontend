import type { ClassType } from '@/../@types/user'
import dayjs from 'dayjs'

interface Class {
  type: 'Z' | 'J'
  grade: number
  class: number
  year: number
}

/*
 * Code:
 * yy = year % 100
 * 1 - 09yy01
 * 2 - 09yy02
 * ...
 * 6 - 09yy06
 * 7 - 09yy07
 * 8 - 09yy08
 * J1 - 09yy09
 * J2 - 09yy10
 * 9 - 39yy01
 * 10 - 39yy02
 * J3 - 39yy03
 * ...
 * J7 - 39yy07
 */

export function getUserGrade(year: number) {
  const y = dayjs().year()
  console.log(y, year)
  if (dayjs().month() < 8) {
    return y - year
  } else {
    return y - year + 1
  }
}

export function getUserClass(id: number, code?: number) {
  // code > id
  const classinfo = code ? getUserClassByCode(code) : getUserClassByNumber(id)
  const grade = getUserGrade(classinfo.year)
  return {
    type: classinfo.type,
    grade,
    class: classinfo.class,
    year: classinfo.year
  } as ClassType
}

export function getUserClassByNumber(id: number) {
  const classid = Math.floor((id % 10000) / 100)
  const type = classid > 10 ? 'J' : 'Z'
  const classord = classid % 10
  const year = Math.floor(id / 10000)
  const grade = getUserGrade(year)
  return {
    type,
    year,
    grade,
    class: classord
  } as Class
}

export function getUserClassByCode(code: number) {
  const year = Math.floor(code / 10000)
  const grade = getUserGrade(year)
  const classid = Math.floor((code % 10000) / 100)
  if (code.toString().startsWith('09')) {
    return {
      type: classid <= 8 ? 'Z' : 'J',
      year,
      grade,
      class: classid <= 8 ? classid : classid - 8
    }
  } else if (code.toString().startsWith('39')) {
    return {
      type: classid <= 2 ? 'Z' : 'J',
      year,
      grade,
      class: classid <= 2 ? classid : classid - 2
    }
  } else {
    return {
      type: 'Z',
      year,
      grade: 0,
      class: classid
    }
  }
}

export function getClassName(classType: Class) {
  const title = classType.type === 'J' ? '蛟' : '高'
  const grades = ['一', '二', '三']
  if (classType.grade === 0) return '未知班级'
  if (classType.class === 0) return `${classType.year} 级`
  if (classType.grade >= 3)
    return `${classType.year} 级 ${
      classType.class > 10 ? `蛟 ${classType.class - 10}` : `${classType.class}`
    } 班`
  const grade = grades[classType.grade - 1]
  return `${title}${grade}（${classType.class % 10}）班`
}

export function getUserClassName(id: number, code?: number) {
  return getClassName(getUserClass(id, code))
}
