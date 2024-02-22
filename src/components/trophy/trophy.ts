import type { TrophyLevel, TrophyType } from '@zvms/zvms4-types'
import {
  Bookmark,
  Basketball,
  Performance,
  More,
  Soccer,
  Volleyball,
  Badminton,
  Tabletennis,
  SwimmingPool,
  Whistling,
  Sport
} from '@icon-park/vue-next'
import type { Component } from 'vue'
import icons from '@/icons/trophy'

export const trophyTypeMap: Array<{
  icon: (name?: string) => Component
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  value: TrophyType
}> = [
  {
    icon: (name?: string) => getAcademyIcon(name ?? ''),
    color: 'primary',
    value: 'academic'
  },
  {
    icon: (name?: string) => getSportsIcon(name ?? ''),
    color: 'danger',
    value: 'sports'
  },
  {
    icon: () => Performance,
    color: 'warning',
    value: 'art'
  },
  {
    icon: () => More,
    color: 'info',
    value: 'others'
  }
]

export const trophyLevelMap: Array<{
  icon: Component
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  value: TrophyLevel
}> = [
  {
    icon: icons.CarbonArea,
    color: 'primary',
    value: 'district'
  },
  {
    icon: icons.MdiCity,
    color: 'success',
    value: 'city'
  },
  {
    icon: icons.MdiSignRealEstate,
    color: 'warning',
    value: 'province'
  },
  {
    icon: icons.MaterialSymbolsFlag,
    color: 'danger',
    value: 'national'
  },
  {
    icon: icons.MaterialSymbolsGlobe,
    color: 'info',
    value: 'international'
  }
]

export const subjectsOfAcademic: Array<{
  name: string
  icon: Component
  keyword: string[]
}> = [
  {
    name: 'math',
    icon: icons.TablerMathFunction,
    keyword: ['数学']
  },
  {
    name: 'physics',
    icon: icons.MdiMagnet,
    keyword: ['物理']
  },
  {
    name: 'chemistry',
    icon: icons.CarbonChemistry,
    keyword: ['化学']
  },
  {
    name: 'biology',
    icon: icons.SolarDnaOutline,
    keyword: ['生物']
  },
  {
    name: 'computer',
    icon: icons.MdiLanguageCpp,
    keyword: ['信息学', 'NOI', 'OI', 'CSP']
  },
  {
    name: 'universe',
    icon: icons.TablerUniverse,
    keyword: ['天文学']
  },
  {
    name: 'literature',
    icon: icons.UilLetterChineseA,
    keyword: ['语文', '作文', '阅读']
  },
  {
    name: 'english',
    icon: icons.IconParkOutlineEnglish,
    keyword: ['英语', '外研']
  },
  {
    name: 'politics',
    icon: icons.StreamlinePoliticsVote2,
    keyword: ['政治', '政协', '领导力']
  },
  {
    name: 'history',
    icon: icons.IcBaselineHistory,
    keyword: ['历史', '联合国', '模联']
  },
  {
    name: 'geography',
    icon: icons.MaterialSymbolsGlobe,
    keyword: ['地理', '海亮杯']
  }
]

export const subjectsOfSports: Array<{
  name: string
  icon: Component
  keyword: string[]
}> = [
  {
    name: 'basketball',
    icon: Basketball,
    keyword: ['篮球']
  },
  {
    name: 'soccer',
    icon: Soccer,
    keyword: ['足球']
  },
  {
    name: 'volleyball',
    icon: Volleyball,
    keyword: ['排球']
  },
  {
    name: 'badminton',
    icon: Badminton,
    keyword: ['羽毛球']
  },
  {
    name: 'table tennis',
    icon: Tabletennis,
    keyword: ['乒乓球']
  },
  {
    name: 'swimming',
    icon: SwimmingPool,
    keyword: ['游泳']
  },
  {
    name: 'field',
    icon: Whistling,
    keyword: ['田径']
  }
]

export function getAcademyIcon(name: string): Component {
  const result = subjectsOfAcademic
    .map((subject) => {
      function isInclude(keywords: string[], origin: string) {
        return keywords.some((keyword) => origin.includes(keyword))
      }
      if (isInclude(subject.keyword, name)) {
        return subject.icon
      }
    })
    .filter(Boolean)
  return result[0] || Bookmark
}

export function getSportsIcon(name: string): Component {
  const result = subjectsOfSports
    .map((subject) => {
      function isInclude(keywords: string[], origin: string) {
        return keywords.some((keyword) => origin.includes(keyword))
      }
      if (isInclude(subject.keyword, name)) {
        return subject.icon
      }
    })
    .filter(Boolean)
  return result[0] || Sport
}
