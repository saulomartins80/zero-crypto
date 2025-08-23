import React from 'react'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

interface OverviewCard {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  color: string
}

const OverviewCards: React.FC = () => {
  const cards: OverviewCard[] = [
    {
      title: 'Total Portfolio',
      value: '$45,231.89',
      change: +12.5,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-green-500'
    },
    {
      title: 'Active Users',
      value: '12,234',
      change: +18.2,
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-500'
    },
    {
      title: 'Transactions',
      value: '1,234',
      change: -2.1,
      icon: <Activity className="w-5 h-5" />,
      color: 'text-red-500'
    },
    {
      title: 'ROI',
      value: '+28.4%',
      change: +28.4,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-purple-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-${card.color.split('-')[1]}-100 dark:bg-${card.color.split('-')[1]}-900/20`}>
              {React.cloneElement(card.icon as React.ReactElement, { 
                className: `w-6 h-6 ${card.color}`
              })}
            </div>
            <span className={`text-sm font-medium ${card.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {card.value}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {card.title}
          </p>
        </div>
      ))}
    </div>
  )
}

export default OverviewCards
