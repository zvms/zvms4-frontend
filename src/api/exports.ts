import type { Dayjs } from 'dayjs'
import { axios } from '@/plugins'

async function createExportTask(
  type: 'time' | 'users' | 'activities',
  format: 'csv' | 'json' | 'excel' | 'html' | 'latex',
  start?: Dayjs,
  end?: Dayjs,
  allowCache: boolean = false
) {
  const body = {
    format,
    start: start?.toISOString(),
    end: end?.toISOString(),
    allowCache
  }
  const result = await axios(`/exports/${type}`, {
    data: body,
    method: 'post'
  })
  if (result.data) {
    return result.data.data
  }
}

async function queryTaskStatus(id: string) {
  const result = await axios(`/exports/${id}`, {
    method: 'get'
  })
  return result.data.data as {
    status: 'pending' | 'processing' | 'completed' | 'failed'
    percentage: number
  }
}

async function downloadTaskFile(
  id: string,
  name: string,
  format: 'csv' | 'excel' | 'json' | 'html' | 'latex'
) {
  const result = await axios(`/exports/${id}/file`, {
    method: 'get',
    responseType: 'blob'
  })
  const mime = (
    {
      csv: 'text/csv',
      excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      json: 'application/json',
      html: 'text/html',
      latex: 'application/octet-stream'
    } as { [key: string]: string }
  )[format]
  // Use `blob` style to download it
  const file = new Blob([result.data], { type: mime })
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  const extension = format === 'excel' ? 'xlsx' : format === 'latex' ? 'tex' : format
  a.download = `${name}.${extension}`
  a.click()
  URL.revokeObjectURL(url)
}

export { createExportTask as create, queryTaskStatus as query, downloadTaskFile as download }
