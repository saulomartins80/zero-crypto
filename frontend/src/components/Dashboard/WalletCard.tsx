'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Eye, EyeOff, Copy, Send } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import toast from 'react-hot-toast'

interface WalletCardProps {
  userId: string
}

export default function WalletCard({ userId }: WalletCardProps) {
  const [balance, setBalance] = useState<number>(0)
  const [address, setAddress] = useState<string>('')
  const [showBalance, setShowBalance] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const supabase = createClient()

  useEffect(() => {
    fetchWalletData()
  }, [userId])

  const fetchWalletData = async () => {
    try {
      const { data: wallet, error } = await supabase
        .from('wallets')
        .select('address, balance')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Erro ao buscar carteira:', error)
        return
      }

      setAddress(wallet.address)
      setBalance(wallet.balance)
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address)
      toast.success('Endereço copiado!')
    } catch (error) {
      toast.error('Erro ao copiar endereço')
    }
  }

  const formatAddress = (addr: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (bal: number) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(bal)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-8 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-xl p-6 text-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Carteira Principal</h3>
            <p className="text-primary-100 text-sm">Finacash Wallet</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Saldo */}
      <div className="mb-6">
        <p className="text-primary-100 text-sm mb-1">Saldo Disponível</p>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold">
            {showBalance ? formatBalance(balance) : '••••••'}
          </span>
          <span className="text-primary-200 text-lg font-medium">FINA</span>
        </div>
        <p className="text-primary-200 text-sm mt-1">
          ≈ ${showBalance ? (balance * 0.1).toFixed(2) : '••••'} USD
        </p>
      </div>

      {/* Endereço */}
      <div className="mb-6">
        <p className="text-primary-100 text-sm mb-2">Endereço da Carteira</p>
        <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <span className="font-mono text-sm">{formatAddress(address)}</span>
          <button
            onClick={copyAddress}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ações */}
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-white text-primary-600 py-3 px-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Enviar</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-white/20 backdrop-blur-sm py-3 px-4 rounded-lg font-semibold hover:bg-white/30 transition-colors"
        >
          Receber
        </motion.button>
      </div>
    </motion.div>
  )
}
