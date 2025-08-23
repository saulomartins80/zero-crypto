import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MarketTrend {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  volume: number
}

interface MarketTrendsProps { trends: MarketTrend[] }

const MarketTrends: React.FC<MarketTrendsProps> = ({ trends }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Market Trends</h2>
      <div className="space-y-4">
        {trends.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{t.symbol.substring(0,2)}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-white">${t.price.toLocaleString()}</p>
              <div className={`flex items-center space-x-1 text-sm ${t.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {t.change >= 0 ? <TrendingUp className="w-4 h-4"/> : <TrendingDown className="w-4 h-4"/>}
                <span>{Math.abs(t.change)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarketTrends
