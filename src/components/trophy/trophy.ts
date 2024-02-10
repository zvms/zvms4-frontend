import type { TrophyLevel, TrophyType } from "@zvms/zvms4-types";
import { Bookmark, Basketball, Performance, More } from "@icon-park/vue-next";
import type { Component } from "vue";
import icons from "@/icons/trophy";

export const trophyTypeMap: Array<{
  icon: Component
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  value: TrophyType
}> = [
  {
    icon: Bookmark,
    color: 'primary',
    value: 'academic'
  },
  {
    icon: Basketball,
    color: 'danger',
    value: 'sports'
  },
  {
    icon: Performance,
    color: 'warning',
    value: 'art'
  },
  {
    icon: More,
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
