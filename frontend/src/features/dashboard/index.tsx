import React, { useState, useEffect, useMemo, useRef } from 'react'
import { createClient } from '../../lib/supabase-client'
import {
  TrendingUp, TrendingDown, DollarSign, PieChart, Activity,
  Plus, RefreshCw, Bell, Settings,
  Search, Filter, Shield, Globe, BarChart3, BarChart2,
  Menu, X, Crown, Bitcoin, Coins, Cpu, Microscope, Orbit, Brain, Atom, Gem,
  Grid3X3, ListChecks, Download, User, Sparkles, Lock, Database
} from 'lucide-react'

// =============================================================================
// QUÂNTUM STATE MANAGEMENT SYSTEM
// =============================================================================

interface QuantumState<T> {
  value: T
  history: T[]
  version: number
  timestamp: number
  observers: Set<(value: T) => void>
}

const createQuantumState = <T,>(initialValue: T): QuantumState<T> => ({
  value: initialValue,
  history: [initialValue],
  version: 0,
  timestamp: Date.now(),
  observers: new Set()
})

// =============================================================================
// AI-POWERED TYPES WITH PREDICTIVE ANALYTICS
// =============================================================================

interface AIPrediction {
  confidence: number
  predictedValue: number
  timeframe: '1h' | '24h' | '7d' | '30d'
  factors: string[]
  algorithm: 'neural_network' | 'random_forest' | 'gradient_boosting'
}

interface Transaction {
  id: string
  type: 'buy' | 'sell' | 'transfer' | 'dividend' | 'staking' | 'lending' | 'farming'
  asset: string
  amount: number
  price: number
  fee: number
  timestamp: Date
  status: 'completed' | 'pending' | 'failed' | 'confirming'
  exchange?: string
  network?: string
  gasUsed?: number
  blockNumber?: number
  hash?: string
}

interface Trend {
  asset: string
  symbol: string
  price: number
  change: number
  change7d: number
  change30d: number
  volume: string
  marketCap: string
  rank: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
  volatility: number
  liquidity: number
  predictions: AIPrediction[]
}

interface Asset {
  symbol: string
  name: string
  balance: number
  value: number
  allocation: number
  avgBuyPrice: number
  totalReturn: number
  totalReturnPercent: number
  dayChange: number
  dayChangePercent: number
  category: 'crypto' | 'stock' | 'nft' | 'defi' | 'stablecoin' | 'commodity'
  riskLevel: 'low' | 'medium' | 'high' | 'very_high'
  lastUpdated: Date
  performance: {
    hourly: number
    daily: number
    weekly: number
    monthly: number
    yearly: number
  }
}

interface Alert {
  id: string
  type: 'price' | 'portfolio' | 'news' | 'technical' | 'security' | 'system' | 'opportunity'
  title: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  read: boolean
  actionRequired?: boolean
  actions?: { label: string; action: () => void }[]
  expiry?: Date
}

interface PortfolioSnapshot {
  timestamp: Date
  value: number
  composition: Record<string, number>
  performance: number
  riskMetrics: {
    sharpeRatio: number
    sortinoRatio: number
    maxDrawdown: number
    volatility: number
    valueAtRisk: number
  }
}

interface DashboardData {
  portfolioValue: number
  dailyChange: number
  dailyChangePercent: number
  weeklyChange: number
  monthlyChange: number
  yearlyChange: number
  totalDeposits: number
  totalWithdrawals: number
  unrealizedPnL: number
  realizedPnL: number
  portfolioHistory: PortfolioSnapshot[]
  recentTransactions: Transaction[]
  marketTrends: Trend[]
  assets: Asset[]
  alerts: Alert[]
  riskScore: number
  diversificationScore: number
  performanceRank: string
  connectedWallets: number
  activeStrategies: number
  aiRecommendations: {
    rebalance: { from: string; to: string; amount: number; reason: string }[]
    opportunities: { asset: string; action: 'buy' | 'sell' | 'hold'; confidence: number }[]
    warnings: { asset: string; message: string; severity: 'medium' | 'high' }[]
  }
  systemStatus: {
    api: 'online' | 'offline' | 'degraded'
    blockchain: 'synced' | 'syncing' | 'offline'
    latency: number
    lastUpdate: Date
    version: string
  }
}

// =============================================================================
// Responsive layout hook (used across components)
// =============================================================================
const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      setIsMobile(w < 768)
      setIsTablet(w >= 768 && w < 1024)
      setIsDesktop(w >= 1024)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return { isMobile, isTablet, isDesktop }
}

// =============================================================================
// HOLOGRAPHIC INTERFACE SYSTEM
// =============================================================================

const useHolographicState = <T,>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue)
  const [hologram, setHologram] = useState<T>(initialValue)
  const [transition, setTransition] = useState(false)

  const setHolographicValue = (newValue: T) => {
    setHologram(newValue)
    setTransition(true)
    setTimeout(() => {
      setValue(newValue)
      setTransition(false)
    }, 300)
  }

  return [value, setHolographicValue, hologram, transition] as const
}

// =============================================================================
// NEUROMORPHIC GLASS CARD WITH QUANTUM EFFECTS
// =============================================================================

const QuantumGlassCard: React.FC<{
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  border?: boolean
  intensity?: number
  interactive?: boolean
  glow?: boolean
  onClick?: () => void
}> = ({ 
  children, 
  className = '', 
  hoverEffect = true, 
  border = true, 
  intensity = 0.3,
  interactive = true,
  glow = false,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div 
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-gray-900/70 to-gray-800/60 
        backdrop-blur-2xl rounded-4xl p-8
        ${border ? 'border border-gray-700/40' : ''}
        ${hoverEffect ? 'transition-all duration-500 ease-out-quantum' : ''}
        ${glow ? 'shadow-2xl shadow-cyan-500/10' : 'shadow-2xl shadow-black/30'}
        ${isHovered && interactive ? 'transform scale-[1.02] border-gray-600/50' : ''}
        ${isFocused && interactive ? 'ring-2 ring-cyan-500/30' : ''}
        ${className}
      `}
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(17, 24, 39, ${intensity}) 0%, 
            rgba(31, 41, 55, ${intensity * 0.8}) 50%, 
            rgba(55, 65, 81, ${intensity * 0.6}) 100%
          ),
          radial-gradient(
            circle at 20% 80%,
            rgba(6, 182, 212, 0.15) 0%,
            transparent 50%
          )
        `,
        transform: isHovered && interactive ? 'translateY(-2px) rotateX(2deg)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={onClick}
    >
      {/* Quantum particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Holographic border effect */}
      {border && (
        <div className="absolute inset-0 rounded-4xl pointer-events-none">
          <div className="absolute inset-0 rounded-4xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
      )}

      {children}
    </div>
  )
}

// =============================================================================
// QUANTUM LOADING SYSTEM WITH MULTIDIMENSIONAL ANIMATION
// =============================================================================

const QuantumLoadingSpinner = () => {
  const { isMobile } = useResponsiveLayout()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 4)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const phases = [
    { text: "Calibrando sensores quânticos", icon: Microscope },
    { text: "Sincronizando dimensões paralelas", icon: Orbit },
    { text: "Otimizando matriz de rendimento", icon: Cpu },
    { text: "Estabilizando campo de realidade", icon: Atom }
  ]

  const CurrentIcon = phases[phase].icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Multidimensional spinner */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Main sphere */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full animate-pulse" />
          
          {/* Orbiting elements */}
          <div className="absolute inset-0 animate-orbit-slow">
            <div className="w-4 h-4 bg-cyan-400 rounded-full absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2" />
          </div>
          
          <div className="absolute inset-0 animate-orbit-medium">
            <div className="w-3 h-3 bg-purple-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="absolute inset-0 animate-orbit-fast">
            <div className="w-2 h-2 bg-pink-400 rounded-full absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2" />
          </div>

          {/* Central core */}
          <div className="absolute inset-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <CurrentIcon className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-white text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {phases[phase].text}
          </div>
          
          <div className="text-gray-400 text-sm max-w-md mx-auto">
            Inicializando sistema neural para experiência multidimensional
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <Cpu className="w-4 h-4" />
            <span>Processando {isMobile ? 'mobile' : 'quantum'} reality</span>
          </div>
        </div>

        {/* Progress simulation */}
        <div className="w-80 max-w-full bg-gray-800 rounded-full h-2 mx-auto overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out-quantum"
            style={{ width: `${(phase + 1) * 25}%` }}
          />
        </div>

        {/* Technical details */}
        <div className="text-xs text-gray-600 space-y-1">
          <div>v2.4.1 • Quantum Engine • Neural Interface</div>
          <div>Secure Connection • Multi-chain Sync • AI Analytics</div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// HOLOGRAPHIC NAVIGATION WITH NEURAL INTERFACE
// =============================================================================

const HolographicNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')
  const { isMobile, isTablet, isDesktop } = useResponsiveLayout()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, premium: false },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart, premium: false },
    { id: 'markets', label: 'Markets', icon: Activity, premium: true },
    { id: 'analytics', label: 'Analytics', icon: ChartNetwork, premium: true },
    { id: 'nft', label: 'NFT Gallery', icon: Gem, premium: true },
    { id: 'defi', label: 'DeFi Hub', icon: Database, premium: true },
    { id: 'staking', label: 'Staking', icon: Lock, premium: false },
    { id: 'governance', label: 'Governance', icon: Shield, premium: true },
  ]

  return (
    <>
      {/* Mobile Neural Interface */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-black p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Atom className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-bold text-xl">ZeroCrypton</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id)
                      setIsMenuOpen(false)
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center space-x-3 group ${
                      activeView === item.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.premium && (
                      <Crown className="w-4 h-4 text-yellow-400 ml-auto" />
                    )}
                  </button>
                )
              })}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="border-t border-gray-800 pt-6">
                <div className="flex items-center space-x-3 text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Quantum Sync Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-xl bg-cyan-500/20 animate-ping" />
              <Atom className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ZeroCrypton
              </h1>
              <p className="text-gray-400 text-sm">Quantum Trading Interface</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Neural Search Interface */}
          {!isMobile && (
            <div className="relative group">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Neural search across dimensions..."
                className="pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 w-80 transition-all duration-300 group-hover:border-cyan-400/50"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Status Indicators */}
          <div className="flex items-center space-x-2">
            <button className="p-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse" />
            </button>

            <button className="p-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-105">
              <User className="w-5 h-5" />
            </button>

            {/* Quantum Connection Status */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Quantum Linked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      {isDesktop && (
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40">
          <div className="bg-gray-900/80 backdrop-blur-2xl border border-gray-700/30 rounded-2xl p-3 space-y-2">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`p-3 rounded-xl transition-all duration-300 group relative ${
                    activeView === item.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.premium && (
                    <Crown className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
                  )}
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.label}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

// =============================================================================
// QUANTUM OVERVIEW CARDS WITH HOLOGRAPHIC DISPLAY
// =============================================================================

const QuantumOverviewCards: React.FC<{ data: DashboardData }> = ({ data }) => {
  const { isMobile } = useResponsiveLayout()
  const [visibleCards, setVisibleCards] = useState(4)
  
  const cards = [
    {
      title: 'Quantum Portfolio Value',
      value: `$${data.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: data.dailyChangePercent,
      icon: DollarSign,
      color: 'from-cyan-500 to-blue-500',
      trend: data.dailyChangePercent >= 0 ? 'up' : 'down',
      subtitle: `${data.dailyChangePercent >= 0 ? '+' : ''}${data.dailyChangePercent.toFixed(2)}% today`,
      dimensions: ['value', 'growth', 'projection'],
      quantumState: 'stable'
    },
    {
      title: 'Temporal Performance',
      value: `${data.monthlyChange >= 0 ? '+' : ''}${((data.monthlyChange / data.portfolioValue) * 100).toFixed(2)}%`,
      icon: data.monthlyChange >= 0 ? TrendingUp : TrendingDown,
      color: data.monthlyChange >= 0 ? 'from-green-500 to-emerald-500' : 'from-red-500 to-rose-500',
      trend: data.monthlyChange >= 0 ? 'up' : 'down',
      subtitle: `Rank: ${data.performanceRank}`,
      dimensions: ['performance', 'ranking', 'analysis'],
      quantumState: data.monthlyChange >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Neural Strategies',
      value: data.activeStrategies.toString(),
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      trend: 'neutral',
      subtitle: `${data.connectedWallets} quantum wallets`,
      dimensions: ['strategies', 'automation', 'ai'],
      quantumState: 'active'
    },
    {
      title: 'Risk Matrix',
      value: `${data.riskScore.toFixed(1)}/10`,
      icon: Shield,
      color: data.riskScore > 7 ? 'from-orange-500 to-red-500' : data.riskScore > 4 ? 'from-yellow-500 to-orange-500' : 'from-green-500 to-emerald-500',
      trend: data.riskScore > 7 ? 'down' : 'up',
      subtitle: 'Quantum risk assessment',
      dimensions: ['risk', 'security', 'analysis'],
      quantumState: data.riskScore > 7 ? 'critical' : 'stable'
    },
    {
      title: 'Dimensional Diversity',
      value: `${data.diversificationScore.toFixed(1)}/10`,
      icon: Globe,
      color: 'from-indigo-500 to-purple-500',
      trend: 'up',
      subtitle: 'Multi-chain exposure',
      dimensions: ['diversity', 'allocation', 'balance'],
      quantumState: 'optimal'
    },
    {
      title: 'AI Predictions',
      value: `${data.aiRecommendations.opportunities.length}`,
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      trend: 'up',
      subtitle: 'Quantum opportunities',
      dimensions: ['predictions', 'ai', 'insights'],
      quantumState: 'active'
    }
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-2xl">Quantum Overview</h2>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span>Live Multi-dimensional Data</span>
          </div>
          <button 
            onClick={() => setVisibleCards(visibleCards === 4 ? 6 : 4)}
            className="p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live market tickers from backend */}
      {Array.isArray(data.marketTrends) && data.marketTrends.length > 0 && (
        <div className="mb-6 px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="flex gap-6 items-center whitespace-nowrap overflow-x-auto no-scrollbar">
            {data.marketTrends.map((t) => (
              <div key={t.symbol} className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 font-mono">{t.symbol}</span>
                <span className="text-white font-semibold">${t.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className={`${t.change >= 0 ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                  {t.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {t.change >= 0 ? '+' : ''}{t.change.toFixed(2)}%
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400">Vol {t.volume}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {cards.slice(0, visibleCards).map((card, index) => (
          <QuantumGlassCard 
            key={index} 
            intensity={0.4}
            glow={card.quantumState === 'active'}
            className="group relative overflow-hidden"
          >
            {/* Quantum state indicator */}
            <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
              card.quantumState === 'stable' ? 'bg-green-400' :
              card.quantumState === 'active' ? 'bg-cyan-400 animate-pulse' :
              card.quantumState === 'critical' ? 'bg-red-400 animate-pulse' :
              card.quantumState === 'positive' ? 'bg-emerald-400' : 'bg-rose-400'
            }`} />

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 bg-gradient-to-r ${card.color} rounded-xl relative overflow-hidden`}>
                    <card.icon className="w-6 h-6 text-white relative z-10" />
                    <div className="absolute inset-0 bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-500" />
                  </div>
                  <span className="text-gray-400 text-sm font-medium">{card.title}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">{card.value}</div>
                  <div className={`flex items-center space-x-2 text-sm ${
                    card.trend === 'up' ? 'text-green-400' : card.trend === 'down' ? 'text-red-400' : 'text-cyan-400'
                  }`}>
                    {card.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                    {card.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                    <span>{card.subtitle}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimensions indicator */}
            <div className="mt-4 pt-4 border-t border-gray-700/30">
              <div className="flex flex-wrap gap-1">
                {card.dimensions.map((dimension, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-lg"
                  >
                    {dimension}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover effect - quantum particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </QuantumGlassCard>
        ))}
      </div>

      {visibleCards < cards.length && (
        <div className="mt-6 text-center">
          <button 
            onClick={() => setVisibleCards(6)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 rounded-xl text-cyan-400 hover:text-white transition-all"
          >
            Expand Quantum View
          </button>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// TEMPORAL CHART WITH QUANTUM PROJECTIONS
// =============================================================================

const TemporalChart: React.FC<{ data: DashboardData['portfolioHistory'] }> = ({ data }) => {
  const [timeframe, setTimeframe] = useState('1M')
  const [viewMode, setViewMode] = useState('value')
  const [showPredictions, setShowPredictions] = useState(true)
  const { isMobile } = useResponsiveLayout()

  // This would be replaced with actual chart library integration
  return (
    <QuantumGlassCard intensity={0.35} glow={true} className="m-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-white font-semibold text-xl">Temporal Portfolio Analysis</h2>
          <p className="text-gray-400">Multi-dimensional performance tracking</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="1W">1 Week</option>
            <option value="1M">1 Month</option>
            <option value="3M">3 Months</option>
            <option value="1Y">1 Year</option>
            <option value="ALL">All Time</option>
          </select>

          <select 
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="value">Portfolio Value</option>
            <option value="performance">Performance</option>
            <option value="distribution">Asset Distribution</option>
            <option value="quantum">Quantum Analysis</option>
          </select>

          <button 
            onClick={() => setShowPredictions(!showPredictions)}
            className={`px-3 py-2 border rounded-lg text-sm transition-all ${
              showPredictions
                ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            AI Predictions
          </button>
        </div>
      </div>

      <div className="h-96 bg-gradient-to-b from-gray-800/30 to-gray-900/10 rounded-xl p-6 relative overflow-hidden">
        {/* Chart visualization would be implemented with a library like Recharts or Chart.js */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <ChartNetwork className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Advanced Quantum Chart Visualization</p>
            <p className="text-sm">Interactive multi-dimensional analytics</p>
            
            {/* Simulated chart grid */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" className="absolute inset-0">
                {/* Grid lines */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={`${(i + 1) * 10}%`}
                    x2="100%"
                    y2={`${(i + 1) * 10}%`}
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={`${(i + 1) * 8}%`}
                    y1="0"
                    x2={`${(i + 1) * 8}%`}
                    y2="100%"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                ))}
                
                {/* Simulated data line */}
                <path
                  d="M0,80% C20%,70% 40%,50% 60%,30% C80%,40% 100%,20%"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                />
                
                {/* Simulated prediction area */}
                {showPredictions && (
                  <path
                    d="M60%,30% C70%,20% 80%,10% 90%,5% C100%,0%"
                    fill="none"
                    stroke="url(#predictionGradient)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                )}
              </svg>
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="predictionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-500 rounded"></div>
            <span>Portfolio Value</span>
          </div>
          {showPredictions && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>AI Prediction</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
            <Share className="w-4 h-4" />
          </button>
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </QuantumGlassCard>
  )
}

// =============================================================================
// NEURAL ASSET MATRIX WITH QUANTUM ORGANIZATION
// =============================================================================

const NeuralAssetMatrix: React.FC<{ assets: Asset[] }> = ({ assets }) => {
  const [sortBy, setSortBy] = useState<'value' | 'performance' | 'allocation' | 'risk'>('value')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'analytics'>('grid')
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)

  const sortedAssets = useMemo(() => {
    return [...assets].sort((a, b) => {
      switch (sortBy) {
        case 'value': return b.value - a.value
        case 'performance': return b.totalReturnPercent - a.totalReturnPercent
        case 'allocation': return b.allocation - a.allocation
        case 'risk': return a.riskLevel === 'high' ? 1 : -1
        default: return 0
      }
    })
  }, [assets, sortBy])

  if (viewMode === 'analytics') {
    return (
      <QuantumGlassCard intensity={0.4} className="m-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-xl">Neural Asset Analytics</h2>
          <button 
            onClick={() => setViewMode('grid')}
            className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            Back to Grid
          </button>
        </div>
        <div className="h-96 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Advanced Neural Analytics Interface</p>
            <p className="text-sm">Real-time asset correlation and risk analysis</p>
          </div>
        </div>
      </QuantumGlassCard>
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-white font-semibold text-xl">Neural Asset Matrix</h2>
          <p className="text-gray-400">Quantum-organized portfolio composition</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="value">By Value</option>
            <option value="performance">By Performance</option>
            <option value="allocation">By Allocation</option>
            <option value="risk">By Risk</option>
          </select>

          <div className="flex bg-gray-800/50 border border-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded text-sm ${
                viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded text-sm ${
                viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <ListChecks className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`p-2 rounded text-sm ${
                (viewMode !== 'grid' && viewMode !== 'list') ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          </div>

          <button className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {sortedAssets.map((asset, index) => (
          <QuantumGlassCard 
            key={asset.symbol} 
            intensity={0.3}
            className="group hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedAsset(asset.symbol)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center relative">
                  {asset.symbol === 'BTC' ? (
                    <Bitcoin className="w-6 h-6 text-white" />
                  ) : asset.symbol === 'ETH' ? (
                    <Coins className="w-6 h-6 text-white" />
                  ) : (
                    <Coins className="w-6 h-6 text-white" />
                  )}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 rounded-full text-xs text-white flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{asset.symbol}</h3>
                  <p className="text-gray-400 text-sm">{asset.name}</p>
                </div>
              </div>
              
              <div className={`text-right ${
                asset.dayChangePercent >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                <div className="font-semibold">
                  {asset.dayChangePercent >= 0 ? '+' : ''}{asset.dayChangePercent.toFixed(2)}%
                </div>
                <div className="text-xs text-gray-400">24h</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Balance</span>
                <span className="text-white">{asset.balance.toLocaleString()} {asset.symbol}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Value</span>
                <span className="text-white">${asset.value.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Allocation</span>
                <span className="text-white">{asset.allocation.toFixed(1)}%</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Risk</span>
                <span className={`${
                  asset.riskLevel === 'low' ? 'text-green-400' :
                  asset.riskLevel === 'medium' ? 'text-yellow-400' :
                  asset.riskLevel === 'high' ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {asset.riskLevel.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="mt-4 bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${asset.allocation}%` }}
              />
            </div>

            {/* Performance indicators */}
            <div className="mt-3 flex justify-between text-xs text-gray-500">
              <span>1W: {asset.performance.weekly >= 0 ? '+' : ''}{asset.performance.weekly.toFixed(1)}%</span>
              <span>1M: {asset.performance.monthly >= 0 ? '+' : ''}{asset.performance.monthly.toFixed(1)}%</span>
              <span>1Y: {asset.performance.yearly >= 0 ? '+' : ''}{asset.performance.yearly.toFixed(1)}%</span>
            </div>
          </QuantumGlassCard>
        ))}
      </div>

      {selectedAsset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-50 flex items-center justify-center p-6">
          <QuantumGlassCard intensity={0.5} className="max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-xl">
                {selectedAsset} Quantum Analysis
              </h3>
              <button 
                onClick={() => setSelectedAsset(null)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96 flex items-center justify-center text-gray-500">
              Advanced asset analytics and predictions would appear here
            </div>
          </QuantumGlassCard>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// QUANTUM DASHBOARD MAIN COMPONENT
// =============================================================================

const QuantumDashboard = () => {
  const { isMobile } = useResponsiveLayout()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  // Ensure backend provisioning after user login
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provision`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          }
        })
        if (!res.ok) {
          const msg = await res.text()
          console.error('Provision failed:', msg)
        }
      } catch (e) {
        if (!cancelled) console.error('Provision error:', e)
      }
    }
    run()
    return () => { cancelled = true }
  }, [])
  const [dimension, setDimension] = useState('prime') // 'prime' or 'quantum'

  // Load live market data from backend (Binance proxy)
  useEffect(() => {
    let cancelled = false
    const loadMarkets = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/markets/prices?symbols=BTCUSDT,ETHUSDT,SOLUSDT`)
        if (!res.ok) return
        const tickers: any[] = await res.json()
        const trends = tickers.map((t) => ({
          asset: t.symbol.replace('USDT',''),
          symbol: t.symbol,
          price: parseFloat(t.lastPrice),
          change: parseFloat(t.priceChangePercent),
          change7d: 0,
          change30d: 0,
          volume: t.volume,
          marketCap: '-',
          rank: 0,
          sentiment: parseFloat(t.priceChangePercent) >= 0 ? 'bullish' : 'bearish',
          volatility: 0,
          liquidity: 0,
          predictions: []
        }))
        if (!cancelled) {
          setData(prev => prev ? { ...prev, marketTrends: trends } as DashboardData : prev)
        }
      } catch (e) {
        if (!cancelled) console.warn('Markets load error', e)
      }
    }
    loadMarkets()
    const id = setInterval(loadMarkets, 30000)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  // Load user's wallet and recent transactions from Supabase (RLS)
  useEffect(() => {
    let cancelled = false
    const loadUserData = async () => {
      try {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        const { data: wallets, error: wErr } = await supabase.from('wallets').select('*').limit(1)
        if (wErr) throw wErr
        const wallet = wallets?.[0]

        const { data: txs, error: tErr } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)
        if (tErr) throw tErr

        // Minimal mapping to the UI Transaction type
        const mappedTxs = (txs || []).map((tx) => ({
          id: tx.id,
          type: tx.type === 'transfer' ? 'transfer' : tx.type === 'stake' || tx.type === 'unstake' ? 'staking' : 'dividend',
          asset: 'CRYPTO',
          amount: tx.amount,
          price: 0,
          fee: tx.fee,
          timestamp: new Date(tx.created_at),
          status: tx.status === 'confirmed' ? 'completed' : tx.status === 'pending' ? 'pending' : 'failed',
          network: 'Binance',
          hash: tx.hash,
          blockNumber: tx.block_number || undefined,
        }))

        if (!cancelled) {
          setData(prev => prev ? {
            ...prev,
            connectedWallets: wallet ? 1 : 0,
            recentTransactions: mappedTxs,
          } as DashboardData : prev)
        }
      } catch (e) {
        if (!cancelled) console.warn('User data load error', e)
      }
    }
    loadUserData()
    const id = setInterval(loadUserData, 60000)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  useEffect(() => {
    // Simulate quantum data loading
    setTimeout(() => {
      const mockData: DashboardData = {
        portfolioValue: 487234.67,
        dailyChange: 5467.23,
        dailyChangePercent: 1.13,
        weeklyChange: 12834.67,
        monthlyChange: -8234.56,
        yearlyChange: 156743.89,
        totalDeposits: 320000.00,
        totalWithdrawals: 25000.00,
        unrealizedPnL: 145287.34,
        realizedPnL: 23456.78,
        portfolioHistory: Array.from({ length: 30 }, (_, i) => ({
          timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
          value: 450000 + Math.random() * 100000,
          composition: { BTC: 45, ETH: 35, SOL: 20 },
          performance: Math.random() * 10 - 5,
          riskMetrics: {
            sharpeRatio: 1.2 + Math.random() * 0.5,
            sortinoRatio: 1.5 + Math.random() * 0.5,
            maxDrawdown: 15 + Math.random() * 10,
            volatility: 12 + Math.random() * 8,
            valueAtRisk: 25000 + Math.random() * 15000
          }
        })),
        recentTransactions: [],
        marketTrends: [],
        assets: [
          { 
            symbol: 'BTC', name: 'Bitcoin', balance: 8.5, value: 320458.75, allocation: 45.2, 
            avgBuyPrice: 35680.50, totalReturn: 87432.25, totalReturnPercent: 37.5, 
            dayChange: 8234.56, dayChangePercent: 2.6, category: 'crypto',
            riskLevel: 'high', lastUpdated: new Date(),
            performance: { hourly: 0.2, daily: 2.6, weekly: 5.8, monthly: -3.2, yearly: 45.3 }
          },
          { 
            symbol: 'ETH', name: 'Ethereum', balance: 85.3, value: 156847.22, allocation: 32.8, 
            avgBuyPrice: 1650.80, totalReturn: 45632.12, totalReturnPercent: 41.0, 
            dayChange: -3421.88, dayChangePercent: -2.1, category: 'crypto',
            riskLevel: 'high', lastUpdated: new Date(),
            performance: { hourly: -0.5, daily: -2.1, weekly: 3.4, monthly: 8.7, yearly: 62.1 }
          },
          { 
            symbol: 'SOL', name: 'Solana', balance: 120, value: 15600.00, allocation: 12.0, 
            avgBuyPrice: 120.50, totalReturn: 3600.00, totalReturnPercent: 30.0, 
            dayChange: 450.00, dayChangePercent: 3.0, category: 'crypto',
            riskLevel: 'very_high', lastUpdated: new Date(),
            performance: { hourly: 1.2, daily: 3.0, weekly: -2.1, monthly: 15.6, yearly: 85.4 }
          },
          { 
            symbol: 'USDC', name: 'USD Coin', balance: 5000, value: 5000.00, allocation: 5.0, 
            avgBuyPrice: 1.00, totalReturn: 0, totalReturnPercent: 0, 
            dayChange: 0, dayChangePercent: 0, category: 'stablecoin',
            riskLevel: 'low', lastUpdated: new Date(),
            performance: { hourly: 0, daily: 0, weekly: 0, monthly: 0.1, yearly: 0.5 }
          },
          { 
            symbol: 'DOT', name: 'Polkadot', balance: 200, value: 1200.00, allocation: 2.5, 
            avgBuyPrice: 6.00, totalReturn: 0, totalReturnPercent: 0, 
            dayChange: 24.00, dayChangePercent: 2.0, category: 'crypto',
            riskLevel: 'high', lastUpdated: new Date(),
            performance: { hourly: 0.3, daily: 2.0, weekly: 4.2, monthly: -5.8, yearly: 12.3 }
          },
          { 
            symbol: 'LINK', name: 'Chainlink', balance: 150, value: 1800.00, allocation: 2.5, 
            avgBuyPrice: 12.00, totalReturn: 600.00, totalReturnPercent: 50.0, 
            dayChange: 36.00, dayChangePercent: 2.0, category: 'crypto',
            riskLevel: 'high', lastUpdated: new Date(),
            performance: { hourly: 0.4, daily: 2.0, weekly: -1.2, monthly: 12.5, yearly: 34.7 }
          }
        ],
        alerts: [],
        riskScore: 7.2,
        diversificationScore: 8.4,
        performanceRank: 'Top 5%',
        connectedWallets: 3,
        activeStrategies: 5,
        aiRecommendations: {
          rebalance: [
            { from: 'BTC', to: 'ETH', amount: 0.5, reason: 'Optimizing risk/return ratio' },
            { from: 'SOL', to: 'USDC', amount: 10, reason: 'Reducing high volatility exposure' }
          ],
          opportunities: [
            { asset: 'AVAX', action: 'buy', confidence: 0.76 },
            { asset: 'MATIC', action: 'buy', confidence: 0.68 },
            { asset: 'BTC', action: 'hold', confidence: 0.82 }
          ],
          warnings: [
            { asset: 'SOL', message: 'High volatility detected', severity: 'high' },
            { asset: 'DOT', message: 'Network upgrade incoming', severity: 'medium' }
          ]
        },
        systemStatus: {
          api: 'online',
          blockchain: 'synced',
          latency: 42,
          lastUpdate: new Date(),
          version: '2.4.1-quantum'
        }
      }
      setData(prev => {
        // If we already have live pieces (e.g., marketTrends, connectedWallets, txs), merge them in
        const merged = prev ? { ...mockData, ...prev } : mockData
        return merged
      })
      setLoading(false)
    }, 800)
  }, [])

  if (loading) return <QuantumLoadingSpinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <HolographicNavigation />
      
      {/* Dimension Selector */}
      <div className="flex justify-center mt-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-1 flex">
          <button
            onClick={() => setDimension('prime')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              dimension === 'prime'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Prime Reality
          </button>
          <button
            onClick={() => setDimension('quantum')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              dimension === 'quantum'
                ? 'bg-purple-500/20 text-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Quantum View
          </button>
        </div>
      </div>

      {data && (
        <>
          <QuantumOverviewCards data={data} />
          <TemporalChart data={data.portfolioHistory} />
          <NeuralAssetMatrix assets={data.assets} />
        </>
      )}

      {/* Quantum Footer */}
      <div className="p-6 border-t border-gray-800/50 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Quantum System Online</span>
            </div>
            <span>v2.4.1</span>
            <span>Last update: {new Date().toLocaleTimeString()}</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <span>ZeroCrypton Quantum</span>
            <span>Multi-dimensional Analytics</span>
            <span>© 2024 Neural Finance</span>
          </div>
        </div>
      </div>

      {/* Mobile Quantum Interface */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-800 backdrop-blur-xl p-4">
          <div className="flex items-center justify-around">
            {[
              { icon: BarChart3, label: 'Dashboard', dimension: 'prime' },
              { icon: PieChart, label: 'Assets', dimension: 'prime' },
              { icon: Plus, label: 'Quantum', dimension: 'quantum', primary: true },
              { icon: Brain, label: 'AI', dimension: 'quantum' },
              { icon: Settings, label: 'Reality', dimension: 'prime' }
            ].map((item, index) => (
              <button
                key={index}
                className={`flex flex-col items-center space-y-1 ${
                  item.primary 
                    ? 'text-cyan-400' 
                    : dimension === item.dimension 
                    ? 'text-purple-400' 
                    : 'text-gray-400'
                }`}
                onClick={() => item.primary && setDimension(dimension === 'prime' ? 'quantum' : 'prime')}
              >
                <div className={`p-2 rounded-lg transition-all ${
                  item.primary 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600' 
                    : dimension === item.dimension
                    ? 'bg-gray-800' 
                    : 'hover:bg-gray-800'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Add the missing Share icon component
const Share = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
)

// Add the missing ChartNetwork icon component
const ChartNetwork = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 10l-4 4m0 0l-4-4m4 4V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-4z" />
  </svg>
)

export default QuantumDashboard