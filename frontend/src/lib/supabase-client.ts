'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../types/database'

// Client-side Supabase client
export const createClient = () => createClientComponentClient<Database>()
