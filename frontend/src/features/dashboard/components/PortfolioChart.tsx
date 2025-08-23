import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface PortfolioChartProps {
  data: Array<{
    date: string
    value: number
    volume?: number
  }>
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio Performance</h2>
        <div className="flex space-x-4">
          <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg">24H</button>
          <button className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600">7D</button>
          <button className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600">30D</button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
            <YAxis tick={{ fontSize: 12 }} tickMargin={10} tickFormatter={(v) => `$${v.toLocaleString()}`} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #e5e7eb', borderRadius: 8 }} />
            <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#colorValue)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PortfolioChart
