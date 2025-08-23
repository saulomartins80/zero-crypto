import React from 'react'
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle } from 'lucide-react'

type TxStatus = 'pending' | 'completed' | 'failed'

type Transaction = {
  id: string
  type: 'send' | 'receive'
  amount: number
  currency: string
  address: string
  status: TxStatus
  timestamp: string | Date
  fee?: number
}

interface Props { transactions: Transaction[] }

const RecentTransactions: React.FC<Props> = ({ transactions }) => {
  const getStatusIcon = (status: TxStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'failed': return <Clock className="w-4 h-4 text-red-500" />
      default: return null
    }
  }

  const formatAddress = (address: string) => `${address.substring(0,8)}...${address.substring(address.length-6)}`

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
      </div>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${tx.type === 'send' ? 'bg-red-100 dark:bg-red-900/20' : 'bg-green-100 dark:bg-green-900/20'}`}>
                {tx.type === 'send' ? (
                  <ArrowUpRight className={"w-5 h-5 text-red-600"} />
                ) : (
                  <ArrowDownLeft className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{tx.type === 'send' ? 'Sent' : 'Received'}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{formatAddress(tx.address)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${tx.type === 'send' ? 'text-red-600' : 'text-green-600'}`}>
                {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.currency}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(tx.timestamp).toLocaleTimeString()}</span>
                {getStatusIcon(tx.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentTransactions
