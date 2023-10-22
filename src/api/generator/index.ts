import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { load } from 'js-yaml'
import { resolve } from 'path'
import type { Api } from "./.d";
import { createApiDocumentContent } from "./api";

const base = resolve('api')
const dirs = readdirSync(base)

interface ApiFile {
  path: string
  content: Api
}

function loadFolder(path: string) {
  const base: ApiFile[] = []
  const dirs = readdirSync(path, {
    recursive: true,
    withFileTypes: true
  })
  dirs.forEach(dir => {
    if (dir.isDirectory()) {
      const dirt = resolve(path, dir.name).replace(resolve(), '').replace('/', '')
      const dest = resolve('.', 'docs', dirt)
      console.log(dest, 'dest', dirt)
      if (!existsSync(dest)) mkdirSync(dest)
      base.push(...loadFolder(resolve(path, dir.name)))
    }
    else if (dir.isFile()) {
      const file = readFileSync(resolve(path, dir.name)).toString()
      base.push({
        path: resolve(path, dir.name).toString().replace(resolve(), ''),
        content: load(file) as Api
      })
    }
  })
  return base
}

const result = loadFolder(base)

Promise.all(result.map(async x => {
  console.log(x.path, 'Rendering')
  const result = await createApiDocumentContent(x.content)
  const path = resolve('docs', x.path.replace('.yaml', '.md').replace('/', ''))
  console.log(path)
  writeFileSync(path, result)
})).then(() => console.log('ok'))
