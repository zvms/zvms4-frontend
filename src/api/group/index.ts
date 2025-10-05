import axios from '@/plugins/axios.ts'

export {
  getGroup as readOne,
  getGroups as read,
  updateMethods as update,
} from './crud'
export * as reads from './reads'
export async function template(id: string, name: string) {
  const result = await axios(`/groups/${id}/template?export_format=excel`, {
    method: 'get',
    responseType: 'blob'
  })
  const mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  // Use `blob` style to download it
  const file = new Blob([result.data], { type: mime })
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  const extension = 'xlsx'
  a.download = `${name}.${extension}`
  a.click()
  URL.revokeObjectURL(url)
}
