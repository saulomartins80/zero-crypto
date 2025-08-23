import axios from 'axios'
import { API_BASE_URL } from '../config'

const client = axios.create({ baseURL: `${API_BASE_URL}/dashboard`, timeout: 10000 })

export const dashboardService = {
  getOverview: async () => (await client.get('/overview')).data,
  getPortfolioHistory: async (period: '24h' | '7d' | '30d' | 'all') => (await client.get(`/portfolio/history?period=${period}`)).data,
  getMarketData: async () => (await client.get('/market')).data,
  provision: async (accessToken: string) => {
    const res = await fetch(`${API_BASE_URL}/api/provision`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (!res.ok) throw new Error('Provision failed')
    return res.json()
  },
}

export default dashboardService
