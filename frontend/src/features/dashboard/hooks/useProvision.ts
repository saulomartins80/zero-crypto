import { useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase-client'
import dashboardService from '@/services/api/dashboard'

// Call backend provisioning once after user logs in
export const useProvision = () => {
  const supabase = createClient()
  const called = useRef(false)

  useEffect(() => {
    const run = async () => {
      if (called.current) return
      const { data } = await supabase.auth.getSession()
      const accessToken = data.session?.access_token
      if (!accessToken) return
      called.current = true
      try {
        await dashboardService.provision(accessToken)
        // Optionally: set a localStorage flag to avoid re-calling between reloads
        // localStorage.setItem('provisioned', '1')
      } catch (e) {
        // Swallow error to not block UI; could show toast/log if desired
        called.current = false // allow retry on next mount if desired
      }
    }
    run()
  }, [supabase])
}
