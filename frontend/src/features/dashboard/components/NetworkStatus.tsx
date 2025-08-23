import React from 'react'

const NetworkStatus: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Network Status</h2>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <p className="font-medium">Latency</p>
          <p>32 ms</p>
        </div>
        <div>
          <p className="font-medium">Throughput</p>
          <p>1,200 tx/s</p>
        </div>
        <div>
          <p className="font-medium">Peers</p>
          <p>89</p>
        </div>
        <div>
          <p className="font-medium">Sync</p>
          <p>100%</p>
        </div>
      </div>
    </div>
  )
}

export default NetworkStatus
