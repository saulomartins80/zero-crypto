import { useState, useEffect } from 'react'

export interface DashboardData {
  portfolioValue: number
  portfolioHistory: Array<{ date: string; value: number }>
  marketTrends: Array<{ id: string; name: string; symbol: string; price: number; change: number; volume: number }>
  recentTransactions: Array<{ id: string; type: 'send' | 'receive'; amount: number; currency: string; address: string; status: 'pending' | 'completed' | 'failed'; timestamp: string }>
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // TODO: replace with real API call
        setData({
          portfolioValue: 45231.89,
          portfolioHistory: Array.from({ length: 30 }).map((_, i) => ({ date: `Day ${i+1}`, value: Math.round(30000 + Math.random()*20000) })),
          marketTrends: [
            { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 65000, change: 2.4, volume: 123456 },
            { id: '2', name: 'Ethereum', symbol: 'ETH', price: 3400, change: -1.2, volume: 98765 },
          ],
          recentTransactions: [
            { id: 't1', type: 'send', amount: 0.12, currency: 'BTC', address: 'bc1qxyz...', status: 'completed', timestamp: new Date().toISOString() },
            { id: 't2', type: 'receive', amount: 1.5, currency: 'ETH', address: '0xabc...', status: 'pending', timestamp: new Date().toISOString() },
          ],
        })
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}
