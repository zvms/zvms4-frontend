export { TeckStackMagV0, TeckStackMagV1, TeckStackV2, TeckStackV4 } from '../stacks'
import GitHub from '../stacks/GitHub.vue'
import VSCode from '../stacks/VSCode.vue'
import type { Component } from 'vue'
import GenshinImpact from './GenshinImpact.vue'
import HonkaiStarRail from './HonkaiStarRail.vue'
import Phigros from './Phigros.vue'
import Apple from './Apple.vue'
import Starbucks from './Starbucks.vue'
import KFC from './KFC.vue'
import Clash from './Clash.vue'
import Edge from './Edge.vue'
import Keynote from './Keynote.vue'
import macOS from './macOS.vue'

export const PersonalPreferences: Array<{ icon: Component; name: string; classify: string }> = [
  { icon: GenshinImpact, name: 'Genshin Impact', classify: 'game' },
  { icon: HonkaiStarRail, name: 'Honkai: Star Rail', classify: 'game' },
  { icon: Phigros, name: 'Phigros', classify: 'game' },
  { icon: Clash, name: 'Clash', classify: 'tool' },
  { icon: GitHub, name: 'GitHub', classify: 'git' },
  { icon: VSCode, name: 'VSCode', classify: 'dev-tool' },
  { icon: Apple, name: 'Apple', classify: 'brand' },
  { icon: Starbucks, name: 'Starbucks', classify: 'brand' },
  { icon: KFC, name: 'KFC', classify: 'brand' },
  { icon: macOS, name: 'macOS', classify: 'os' },
  { icon: Edge, name: 'Edge', classify: 'browser' },
  { icon: Keynote, name: 'Keynote', classify: 'tool' },
]
