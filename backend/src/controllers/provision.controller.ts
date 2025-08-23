import { Request, Response } from 'express'
import { supabaseAdmin, supabaseClient } from '../config/supabase'
import { blockchainService } from '../services/blockchain.service'
import { Database } from '../types/supabase'

export class ProvisionController {
  // POST /api/provision
  // Validates Supabase JWT from Authorization: Bearer <token>
  // Idempotently ensures public.users and wallets have entries for this user
  async provision(req: Request, res: Response) {
    try {
      const auth = req.headers.authorization || ''
      const token = auth.startsWith('Bearer ') ? auth.substring('Bearer '.length) : null
      if (!token) return res.status(401).json({ error: 'Missing bearer token' })

      const { data: userData, error: userErr } = await supabaseClient.auth.getUser(token)
      if (userErr || !userData?.user) return res.status(401).json({ error: 'Invalid token' })

      const userId = userData.user.id
      // Ensure email is a string to satisfy DB types (email is required on Insert)
      const email = userData.user.email ?? ''

      // 1) Ensure user exists in public.users (id references auth.users)
      const { data: existingUser, error: userSelectErr } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('id', userId)
        .maybeSingle()

      if (userSelectErr) return res.status(500).json({ error: 'Failed to check user' })

      let createdUser = false
      if (!existingUser) {
        const { error: userInsertErr } = await supabaseAdmin
          .from('users')
          .insert({ id: userId, email } as Database['public']['Tables']['users']['Insert'])
        if (userInsertErr) return res.status(500).json({ error: 'Failed to create user' })
        createdUser = true
      }

      // 2) Ensure wallet exists
      const { data: existingWallet, error: walletSelErr } = await supabaseAdmin
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()
      if (walletSelErr) return res.status(500).json({ error: 'Failed to check wallet' })

      let createdWallet = false
      let walletAddress = existingWallet?.address || null

      if (!existingWallet) {
        // Generate new wallet from blockchain service
        const newWallet = await blockchainService.createWallet()
        const { error: walletInsertErr } = await supabaseAdmin
          .from('wallets')
          .insert({
            address: newWallet.address,
            user_id: userId,
            balance: 0,
            nonce: 0
          } as Database['public']['Tables']['wallets']['Insert'])
        if (walletInsertErr) return res.status(500).json({ error: 'Failed to create wallet' })
        createdWallet = true
        walletAddress = newWallet.address
      }

      return res.json({
        userId,
        email,
        walletAddress,
        created: { user: createdUser, wallet: createdWallet }
      })
    } catch (e: any) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const provisionController = new ProvisionController()
