export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          wallet_address: string | null
          created_at: string
          updated_at: string
          kyc_status: 'pending' | 'approved' | 'rejected'
          tier: number
          total_balance: number
          staked_balance: number
        }
        Insert: {
          id?: string
          email: string
          wallet_address?: string | null
          created_at?: string
          updated_at?: string
          kyc_status?: 'pending' | 'approved' | 'rejected'
          tier?: number
          total_balance?: number
          staked_balance?: number
        }
        Update: {
          id?: string
          email?: string
          wallet_address?: string | null
          created_at?: string
          updated_at?: string
          kyc_status?: 'pending' | 'approved' | 'rejected'
          tier?: number
          total_balance?: number
          staked_balance?: number
        }
      }
      transactions: {
        Row: {
          id: string
          hash: string
          from_address: string
          to_address: string
          amount: number
          fee: number
          status: 'pending' | 'confirmed' | 'failed'
          block_number: number | null
          created_at: string
          type: 'transfer' | 'stake' | 'unstake' | 'reward'
        }
        Insert: {
          id?: string
          hash: string
          from_address: string
          to_address: string
          amount: number
          fee: number
          status?: 'pending' | 'confirmed' | 'failed'
          block_number?: number | null
          created_at?: string
          type: 'transfer' | 'stake' | 'unstake' | 'reward'
        }
        Update: {
          id?: string
          hash?: string
          from_address?: string
          to_address?: string
          amount?: number
          fee?: number
          status?: 'pending' | 'confirmed' | 'failed'
          block_number?: number | null
          created_at?: string
          type?: 'transfer' | 'stake' | 'unstake' | 'reward'
        }
      }
      wallets: {
        Row: {
          id: string
          address: string
          user_id: string
          balance: number
          nonce: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          address: string
          user_id: string
          balance?: number
          nonce?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          address?: string
          user_id?: string
          balance?: number
          nonce?: number
          created_at?: string
          updated_at?: string
        }
      }
      staking_pools: {
        Row: {
          id: string
          name: string
          apy: number
          min_stake: number
          total_staked: number
          max_capacity: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          apy: number
          min_stake: number
          total_staked?: number
          max_capacity: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          apy?: number
          min_stake?: number
          total_staked?: number
          max_capacity?: number
          is_active?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_balance: {
        Args: {
          user_wallet: string
        }
        Returns: number
      }
      calculate_staking_rewards: {
        Args: {
          user_id: string
          pool_id: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
