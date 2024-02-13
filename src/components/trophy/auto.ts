import type { Trophy, TrophyAward } from '@zvms/zvms4-types'
import { ElMessageBox } from 'element-plus'

export function calculateLevelsOfArtAwards(
  level: Trophy['level'],
  team: boolean,
  locale: 'zh-CN' | 'en-US' = 'en-US'
): TrophyAward[] {
  const result = [
    {
      name: locale === 'zh-CN' ? '一等奖' : 'First Prize',
      duration: 0
    },
    {
      name: locale === 'zh-CN' ? '二等奖' : 'Second Prize',
      duration: 0
    },
    {
      name: locale === 'zh-CN' ? '三等奖' : 'Third Prize',
      duration: 0
    }
  ]
  if (level === 'district') {
    result[0].duration = team ? 1 : 2
    result[1].duration = team ? 0.5 : 1
    result[2].duration = team ? 0.5 : 1
  } else if (level === 'city') {
    result[0].duration = team ? 2 : 3
    result[1].duration = team ? 1 : 2
    result[2].duration = team ? 1 : 2
  } else {
    result[0].duration = team ? 2 : 3
    result[1].duration = team ? 2 : 3
    result[2].duration = team ? 2 : 3
  }
  return result
}

export function calculateLevelsOfAcademicSubjects(
  level: Trophy['level'],
  locale: 'zh-CN' | 'en-US' = 'en-US'
) {
  const result = [
    {
      name: locale === 'zh-CN' ? '一等奖' : 'First Prize',
      duration: 0
    },
    {
      name: locale === 'zh-CN' ? '二等奖' : 'Second Prize',
      duration: 0
    },
    {
      name: locale === 'zh-CN' ? '三等奖' : 'Third Prize',
      duration: 0
    }
  ]
  if (level === 'district') {
    result[0].duration = 2
    result[1].duration = 1
    result[2].duration = 1
  } else if (level === 'city') {
    result[0].duration = 3
    result[1].duration = 2
    result[2].duration = 2
  } else if (level === 'province') {
    result[0].duration = 4
    result[1].duration = 3
    result[2].duration = 3
  } else {
    result[0].duration = 4
    result[1].duration = 4
    result[2].duration = 4
  }
  return result
}

export function calculateLevelsOfSportsAwards(
  level: Trophy['level'],
  locale: 'zh-CN' | 'en-US' = 'en-US'
) {
  const result = [
    {
      name: locale === 'zh-CN' ? '第一名' : 'First Place',
      duration: 0
    },
    {
      name: locale === 'zh-CN' ? '第二名' : 'Second Place',
      duration: 0
    },
    {
      name: locale === 'zh-CN' ? '第三名' : 'Third Place',
      duration: 0
    }
  ] as TrophyAward[]
  ;[4, 5, 6, 7, 8, 9, 10].forEach((index) => {
    result.push({
      name: locale === 'zh-CN' ? `第 ${index} 名` : `No. ${index}`,
      duration: 0
    })
  })
  if (level === 'district') {
    return result
      .map((award, index) => {
        award.duration = index < 3 ? 2 : 1
        return award
      })
      .filter((_, index) => index < 8)
  } else if (level === 'city') {
    return result
      .map((award, index) => {
        award.duration = index < 3 ? 3 : 2
        return award
      })
      .filter((_, index) => index < 8)
  } else if (level === 'province') {
    return result.map((award, index) => {
      award.duration = index < 3 ? 4 : 3
      return award
    })
  } else {
    const title = locale === 'zh-CN' ? '大型比赛' : 'Large-scale Competition'
    const description =
      locale === 'zh-CN'
        ? '全国或国际比赛让获奖者自行填写, 你也可以顺便找其要个签名 :)'
        : 'The duration of national or international awards is up to the awardee, you can also ask for a signature :)'
    ElMessageBox.alert(description, title, {
      type: 'info'
    })
    return [{
      name: '',
      duration: undefined as unknown as number
    }]
  }
}
