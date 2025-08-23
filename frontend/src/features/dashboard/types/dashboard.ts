export type Trend = { id: string; name: string; symbol: string; price: number; change: number; volume: number }
export type Tx = { id: string; type: 'send' | 'receive'; amount: number; currency: string; address: string; status: 'pending' | 'completed' | 'failed'; timestamp: string }
