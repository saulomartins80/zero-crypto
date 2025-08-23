import { useEffect } from 'react'

// Placeholder hook for real-time updates (e.g., WebSocket or Supabase Realtime)
export const useRealTimeUpdates = (onMessage: (payload: any) => void) => {
  useEffect(() => {
    // TODO: plug in real websocket or Supabase Realtime channel
    const interval = setInterval(() => {
      onMessage({ ts: Date.now(), type: 'heartbeat' })
    }, 10000)
    return () => clearInterval(interval)
  }, [onMessage])
}
