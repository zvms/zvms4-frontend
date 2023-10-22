export { TeckStackMagV0, TeckStackMagV1, TeckStackV2, TeckStackV4 } from '../stacks'
import Axios from '../stacks/Axios.vue'
import Cypress from '../stacks/Cypress.vue'
import Electron from '../stacks/Electron.vue'
import { ElementPlus } from '@element-plus/icons-vue'
import ESLint from '../stacks/ESLint.vue'
import GitHub from '../stacks/GitHub.vue'
import JetBrains from '../stacks/JetBrains.vue'
import JWT from '../stacks/JWT.vue'
import Koa from '../stacks/Koa.vue'
import MongoDB from '../stacks/MongoDB.vue'
import Node from '../stacks/Node.vue'
import Pinia from '../stacks/Pinia.vue'
import PNpm from '../stacks/PNpm.vue'
import Prettier from '../stacks/Prettier.vue'
import PyTorch from '../stacks/PyTorch.vue'
import Rollup from '../stacks/Rollup.vue'
import Rust from '../stacks/Rust.vue'
import Sass from '../stacks/Sass.vue'
import SocketIO from '../stacks/SocketIO.vue'
import TailwindCSS from '../stacks/TailwindCSS.vue'
import Tauri from '../stacks/Tauri.vue'
import TensorFlow from '../stacks/TensorFlow.vue'
import TypeScript from '../stacks/TypeScript.vue'
import Vite from '../stacks/Vite.vue'
import Vitest from '../stacks/Vitest.vue'
import Vue from '../stacks/Vue.vue'
import VSCode from '../stacks/VSCode.vue'
import XCode from '../stacks/XCode.vue'
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
import Google from './Google.vue'
import Microsoft from './Microsoft.vue'
import macOS from './macOS.vue'
import Ubuntu from './Ubuntu.vue'
import Windows from './Windows.vue'
import YouTube from './YouTube.vue'
import BiliBili from './BiliBili.vue'
import AppleMusic from './AppleMusic.vue'
import NetEase from './NetEase.vue'

export const PersonalStacks: Array<{ icon: Component; name: string; classify: string }> = [
  { icon: Axios, name: 'Axios', classify: 'server' },
  { icon: Cypress, name: 'Cypress', classify: 'test' },
  { icon: Electron, name: 'Electron', classify: 'framework' },
  { icon: ElementPlus, name: 'ElementPlus', classify: 'ui' },
  { icon: ESLint, name: 'ESLint', classify: 'code-tool' },
  { icon: GitHub, name: 'GitHub', classify: 'git' },
  { icon: JetBrains, name: 'JetBrains', classify: 'dev-tool' },
  { icon: JWT, name: 'JWT', classify: 'server' },
  { icon: Koa, name: 'Koa', classify: 'server' },
  { icon: MongoDB, name: 'MongoDB', classify: 'database' },
  { icon: Node, name: 'Node', classify: 'server' },
  { icon: Pinia, name: 'Pinia', classify: 'framework' },
  { icon: PNpm, name: 'PNpm', classify: 'dev-tool' },
  { icon: Prettier, name: 'Prettier', classify: 'code-tool' },
  { icon: PyTorch, name: 'PyTorch', classify: 'ai' },
  { icon: Rollup, name: 'Rollup', classify: 'dev-tool' },
  { icon: Rust, name: 'Rust', classify: 'language' },
  { icon: Sass, name: 'Sass', classify: 'ui' },
  { icon: SocketIO, name: 'SocketIO', classify: 'server' },
  { icon: TailwindCSS, name: 'TailwindCSS', classify: 'ui' },
  { icon: Tauri, name: 'Tauri', classify: 'framework' },
  { icon: TensorFlow, name: 'TensorFlow', classify: 'ai' },
  { icon: TypeScript, name: 'TypeScript', classify: 'language' },
  { icon: Vite, name: 'Vite', classify: 'dev-tool' },
  { icon: Vitest, name: 'Vitest', classify: 'test' },
  { icon: Vue, name: 'Vue', classify: 'framework' },
  { icon: VSCode, name: 'VSCode', classify: 'dev-tool' },
  { icon: XCode, name: 'XCode', classify: 'dev-tool' }
]

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
  { icon: Microsoft, name: 'Microsoft', classify: 'brand' },
  { icon: Google, name: 'Google', classify: 'brand' },
  { icon: macOS, name: 'macOS', classify: 'os' },
  { icon: Ubuntu, name: 'Ubuntu', classify: 'os' },
  { icon: Windows, name: 'Windows', classify: 'os' },
  { icon: YouTube, name: 'YouTube', classify: 'video' },
  { icon: BiliBili, name: 'BiliBili', classify: 'video' },
  { icon: Edge, name: 'Edge', classify: 'browser' },
  { icon: Keynote, name: 'Keynote', classify: 'tool' },
  { icon: NetEase, name: 'NetEase', classify: 'music' },
  { icon: AppleMusic, name: 'Apple Music', classify: 'music' }
]
