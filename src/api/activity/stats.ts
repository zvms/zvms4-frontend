import axios from '@/plugins/axios'

async function getActivityStats(aid: string) {
  const response = await axios({
    url: `/v2/statistics/activities/${aid}/description`,
    method: 'get'
  })

  return response.data as Record<string, number>
}

async function getActivityDistributionLayers(aid: string) {
  const response = await axios({
    url: `/v2/statistics/activities/${aid}/layers`,
    method: 'get'
  })

  return response.data as Array<{ value: number; count: number }>
}

export { getActivityStats as description, getActivityDistributionLayers as layers }
