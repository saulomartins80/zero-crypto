import React from 'react'
import { Send, PlusCircle, RefreshCcw } from 'lucide-react'

const QuickActions: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <button className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
        <Send className="w-4 h-4 mr-2"/> Send
      </button>
      <button className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary-600 text-white hover:bg-secondary-700">
        <PlusCircle className="w-4 h-4 mr-2"/> Deposit
      </button>
      <button className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">
        <RefreshCcw className="w-4 h-4 mr-2"/> Refresh
      </button>
    </div>
  )
}

export default QuickActions
