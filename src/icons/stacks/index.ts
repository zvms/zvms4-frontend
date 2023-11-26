import type { Component } from 'vue'
import Axios from './Axios.vue'
import Babel from './Babel.vue'
import Bootstrap from './Bootstrap.vue'
import Electron from './Electron.vue'
import { ElementPlus } from '@element-plus/icons-vue'
import ESBuild from './ESBuild.vue'
import ESLint from './ESLint.vue'
import Express from './Express.vue'
import FastAPI from './FastAPI.vue'
import Flask from './Flask.vue'
import Gitee from './Gitee.vue'
import GitHub from './GitHub.vue'
import Gravatar from './Gravatar.vue'
import JavaScript from './JavaScript.vue'
import JWT from './JWT.vue'
import Koa from './Koa.vue'
import MongoDB from './MongoDB.vue'
import MySQL from './MySQL.vue'
import Nginx from './Nginx.vue'
import Node from './Node.vue'
import Pinia from './Pinia.vue'
import Python from './Python.vue'
import PNpm from './PNpm.vue'
import Prettier from './Prettier.vue'
import Quasar from './Quasar.vue'
import Rollup from './Rollup.vue'
import SocketIO from './SocketIO.vue'
import Stylus from './Stylus.vue'
import SQLite from './SQLite.vue'
import TailwindCSS from './TailwindCSS.vue'
import Tornado from './Tornado.vue'
import TypeScript from './TypeScript.vue'
import Vite from './Vite.vue'
import Vitest from './Vitest.vue'
import Vue from './Vue.vue'
import Vuetify from './Vuetify.vue'
import Webpack from './Webpack.vue'
import Yarn from './Yarn.vue'

export const TeckStackV0: Array<{ icon: Component; name: string; classify: string }> = [
  { icon: Axios, name: 'Axios', classify: 'server' },
  { icon: Babel, name: 'Babel', classify: 'code-tool' },
  { icon: ESLint, name: 'ESLint', classify: 'code-tool' },
  { icon: Express, name: 'Express', classify: 'server' },
  { icon: GitHub, name: 'GitHub', classify: 'git' },
  { icon: Gravatar, name: 'Gravatar', classify: 'avatar' },
  { icon: JavaScript, name: 'JavaScript', classify: 'language' },
  { icon: JWT, name: 'JWT', classify: 'server' },
  { icon: MySQL, name: 'MySQL', classify: 'database' },
  { icon: Node, name: 'Node', classify: 'language' },
  { icon: Stylus, name: 'Stylus', classify: 'ui' },
  { icon: TypeScript, name: 'TypeScript', classify: 'language' },
  { icon: Vue, name: 'Vue', classify: 'framework' },
  { icon: Vue, name: 'Vue CLI', classify: 'dev-tool' },
  { icon: Vue, name: 'Vue-Router', classify: 'router' },
  { icon: Vue, name: 'Vuex', classify: 'state-management' },
  { icon: Vuetify, name: 'Vuetify', classify: 'ui' },
  { icon: Webpack, name: 'Webpack', classify: 'dev-tool'},
  { icon: Yarn, name: 'Yarn', classify: 'package-manager' }
]

export const TeckStackV1: Array<{ icon: Component; name: string; classify: string }> = [
  { icon: Axios, name: 'Axios', classify: 'server' },
  { icon: Babel, name: 'Babel', classify: 'code-tool' },
  { icon: Electron, name: 'Electron', classify: 'framework' },
  { icon: ESLint, name: 'ESLint', classify: 'code-tool' },
  { icon: Flask, name: 'Flask', classify: 'server' },
  { icon: Gitee, name: 'Gitee', classify: 'git' },
  { icon: JavaScript, name: 'JavaScript', classify: 'language' },
  { icon: JWT, name: 'JWT', classify: 'server' },
  { icon: MySQL, name: 'MySQL', classify: 'database' },
  { icon: Python, name: 'Python', classify: 'language' },
  { icon: Tornado, name: 'Tornado', classify: 'server' },
  { icon: Vue, name: 'Vue', classify: 'framework' },
  { icon: Vue, name: 'Vue-Router', classify: 'router' },
  { icon: Vue, name: 'Vuex', classify: 'state-management' },
  { icon: Vuetify, name: 'Vuetify', classify: 'ui' },
  { icon: Yarn, name: 'Yarn', classify: 'package-manager' }
]

export const TeckStackV2: Array<{ icon: Component; name: string; classify: string }> = [
  { icon: Axios, name: 'Axios', classify: 'server' },
  { icon: ESLint, name: 'ESLint', classify: 'code-tool' },
  { icon: Flask, name: 'Flask', classify: 'server' },
  { icon: Gitee, name: 'Gitee', classify: 'git' },
  { icon: GitHub, name: 'GitHub', classify: 'git' },
  { icon: JavaScript, name: 'JavaScript', classify: 'language' },
  { icon: JWT, name: 'JWT', classify: 'server' },
  { icon: Nginx, name: 'Nginx', classify: 'server' },
  { icon: Pinia, name: 'Pinia', classify: 'state-management' },
  { icon: PNpm, name: 'PNpm', classify: 'package-manager' },
  { icon: Prettier, name: 'Prettier', classify: 'code-tool' },
  { icon: Python, name: 'Python', classify: 'language' },
  { icon: SQLite, name: 'SqliteVue', classify: 'database' },
  { icon: TailwindCSS, name: 'TailwindCSS', classify: 'ui' },
  { icon: Tornado, name: 'Tornado', classify: 'server' },
  { icon: TypeScript, name: 'TypeScript', classify: 'language' },
  { icon: Vite, name: 'Vite', classify: 'dev-tool' },
  { icon: Vue, name: 'Vue', classify: 'framework' },
  { icon: Vuetify, name: 'Vuetify', classify: 'ui' }
]

export const TeckStackV3: Array<{ icon: Component; name: string; classify: string }> = [
  { icon: Bootstrap, name: 'Bootstrap', classify: 'ui' },
  { icon: Flask, name: 'Flask', classify: 'server' },
  { icon: GitHub, name: 'GitHub', classify: 'git' },
  { icon: Python, name: 'Python', classify: 'language' },
  { icon: SQLite, name: 'SqliteVue', classify: 'database' }
]

export const TeckStackV4: Array<{ icon: Component; name: string; classify: string }> = [
  { icon: Axios, name: 'Axios', classify: 'server' },
  { icon: ElementPlus, name: 'ElementPlus', classify: 'ui' },
  { icon: ESLint, name: 'ESLint', classify: 'code-tool' },
  { icon: FastAPI, name: 'FastAPI', classify: 'server' },
  { icon: GitHub, name: 'GitHub', classify: 'git' },
  { icon: JavaScript, name: 'JavaScript', classify: 'language' },
  { icon: JWT, name: 'JWT', classify: 'server' },
  { icon: MongoDB, name: 'MongoDB', classify: 'database' },
  { icon: Pinia, name: 'Pinia', classify: 'state-management' },
  { icon: Python, name: 'Python', classify: 'language' },
  { icon: PNpm, name: 'PNpm', classify: 'package-manager' },
  { icon: Prettier, name: 'Prettier', classify: 'code-tool' },
  { icon: TailwindCSS, name: 'TailwindCSS', classify: 'ui' },
  { icon: TypeScript, name: 'TypeScript', classify: 'language' },
  { icon: Vite, name: 'Vite', classify: 'dev-tool' },
  { icon: Vitest, name: 'Vitest', classify: 'test' },
  { icon: Vue, name: 'Vue', classify: 'framework' },
  { icon: Vue, name: 'Vue-Router', classify: 'router' },
]

export const TeckStackMagV0: Array<{ icon: Component; name: string; classify: string }> = [
  { icon: Koa, name: 'Koa', classify: 'server' },
  { icon: Node, name: 'Node', classify: 'language' },
  { icon: Quasar, name: 'Quasar', classify: 'ui' },
  { icon: SocketIO, name: 'SocketIO', classify: 'server' },
  { icon: Vue, name: 'Vue', classify: 'framework' },
]

export const TeckStackMagV1: Array<{ icon: Component; name: string; classify: string }> = [
  { icon: Babel, name: 'Babel', classify: 'code-tool' },
  { icon: Electron, name: 'Electron', classify: 'framework' },
  { icon: ElementPlus, name: 'ElementPlus', classify: 'ui' },
  { icon: ESBuild, name: 'ESBuild', classify: 'dev-tool' },
  { icon: Koa, name: 'Koa', classify: 'server' },
  { icon: Node, name: 'Node', classify: 'language' },
  { icon: Rollup, name: 'Rollup', classify: 'dev-tool' },
  { icon: TypeScript, name: 'TypeScript', classify: 'language' },
  { icon: Vite, name: 'Vite', classify: 'dev-tool' },
  { icon: Vue, name: 'Vue', classify: 'framework' },
]
