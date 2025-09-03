'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BarChart3, RefreshCw } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts'

interface MarketPrice {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  lastUpdate: string
}

interface PriceHistory {
  date: string
  price: number
  volume: number
}

export default function MercadoAnalyzer() {
  const [marketData, setMarketData] = useState<MarketPrice[]>([])
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    fetchMarketData()
    fetchPriceHistory()
    
    // Atualizar dados a cada 5 minutos
    const interval = setInterval(() => {
      fetchMarketData()
      setLastUpdate(new Date())
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const fetchMarketData = async () => {
    try {
      // Simulação de dados de mercado - depois integrar com APIs reais (Cepea, B3)
      const mockMarketData: MarketPrice[] = [
        {
          symbol: 'BOI_GORDO',
          name: 'Boi Gordo (Cepea)',
          price: 285.50,
          change: 2.30,
          changePercent: 0.81,
          volume: 12500,
          lastUpdate: new Date().toISOString()
        },
        {
          symbol: 'BEZERRO',
          name: 'Bezerro (Cepea)',
          price: 1850.00,
          change: -15.00,
          changePercent: -0.80,
          volume: 3200,
          lastUpdate: new Date().toISOString()
        },
        {
          symbol: 'VACA_GORDA',
          name: 'Vaca Gorda (Cepea)',
          price: 245.80,
          change: 1.20,
          changePercent: 0.49,
          volume: 8900,
          lastUpdate: new Date().toISOString()
        },
        {
          symbol: 'REPOSICAO',
          name: 'Reposição (Cepea)',
          price: 2150.00,
          change: 25.00,
          changePercent: 1.18,
          volume: 5600,
          lastUpdate: new Date().toISOString()
        },
        {
          symbol: 'MILHO',
          name: 'Milho (Cepea)',
          price: 65.80,
          change: -0.50,
          changePercent: -0.75,
          volume: 45000,
          lastUpdate: new Date().toISOString()
        },
        {
          symbol: 'SOJA',
          name: 'Soja (Cepea)',
          price: 145.20,
          change: 3.80,
          changePercent: 2.69,
          volume: 78000,
          lastUpdate: new Date().toISOString()
        }
      ]
      
      setMarketData(mockMarketData)
    } catch (error) {
      console.error('Erro ao buscar dados de mercado:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPriceHistory = async () => {
    try {
      // Simulação de histórico de preços - depois integrar com APIs reais
      const mockHistory: PriceHistory[] = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: 280 + Math.random() * 20 - 10,
        volume: 10000 + Math.random() * 5000
      }))
      
      setPriceHistory(mockHistory)
    } catch (error) {
      console.error('Erro ao buscar histórico de preços:', error)
    }
  }

  const boiGordo = marketData.find(item => item.symbol === 'BOI_GORDO')
  const bezerro = marketData.find(item => item.symbol === 'BEZERRO')
  const milho = marketData.find(item => item.symbol === 'MILHO')
  const soja = marketData.find(item => item.symbol === 'SOJA')

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📈 Análise de Mercado</h1>
              <p className="text-gray-600 mt-1">Cotações em tempo real e análise de tendências</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right text-sm text-gray-500">
                <p>Última atualização:</p>
                <p>{lastUpdate.toLocaleTimeString()}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  fetchMarketData()
                  setLastUpdate(new Date())
                }}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Atualizar</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {boiGordo && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Boi Gordo</h3>
                <span className="text-2xl">🐂</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">R$ {boiGordo.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">/@</span>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor(boiGordo.change)}`}>
                {getChangeIcon(boiGordo.change)}
                <span>R$ {Math.abs(boiGordo.change).toFixed(2)} ({Math.abs(boiGordo.changePercent).toFixed(2)}%)</span>
              </div>
            </div>
          )}

          {bezerro && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Bezerro</h3>
                <span className="text-2xl">🐄</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">R$ {bezerro.price.toFixed(0)}</span>
                <span className="text-sm text-gray-500">/cab</span>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor(bezerro.change)}`}>
                {getChangeIcon(bezerro.change)}
                <span>R$ {Math.abs(bezerro.change).toFixed(0)} ({Math.abs(bezerro.changePercent).toFixed(2)}%)</span>
              </div>
            </div>
          )}

          {milho && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Milho</h3>
                <span className="text-2xl">🌽</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">R$ {milho.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">/sc</span>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor(milho.change)}`}>
                {getChangeIcon(milho.change)}
                <span>R$ {Math.abs(milho.change).toFixed(2)} ({Math.abs(milho.changePercent).toFixed(2)}%)</span>
              </div>
            </div>
          )}

          {soja && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Soja</h3>
                <span className="text-2xl">🌱</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">R$ {soja.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">/sc</span>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor(soja.change)}`}>
                {getChangeIcon(soja.change)}
                <span>R$ {Math.abs(soja.change).toFixed(2)} ({Math.abs(soja.changePercent).toFixed(2)}%)</span>
              </div>
            </div>
          )}
        </div>

        {/* Price Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Histórico de Preços - Boi Gordo</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedPeriod('7d')}
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${selectedPeriod === '7d' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
                >
                  7D
                </button>
                <button 
                  onClick={() => setSelectedPeriod('30d')}
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${selectedPeriod === '30d' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
                >
                  30D
                </button>
                <button 
                  onClick={() => setSelectedPeriod('90d')}
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${selectedPeriod === '90d' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
                >
                  90D
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceHistory}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D5016" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2D5016" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
                    domain={['dataMin - 5', 'dataMax + 5']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.95)', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: 8 
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                    formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, 'Preço']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#2D5016" 
                    fill="url(#colorPrice)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market Analysis */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Análise de Mercado</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">🎯 Recomendações IA</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Momento Favorável</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Preços em alta. Considere vender animais prontos.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Atenção aos Custos</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">
                      Milho em queda. Bom momento para estocar ração.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">📊 Indicadores Técnicos</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tendência:</span>
                    <span className="text-green-600 font-medium">Alta</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volatilidade:</span>
                    <span className="text-yellow-600 font-medium">Média</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volume:</span>
                    <span className="text-blue-600 font-medium">Alto</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">🔮 Previsão 30 dias</h3>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-800">R$ 290 - R$ 295</div>
                    <div className="text-xs text-blue-600">Faixa de preço esperada</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">📅 Sazonalidade</h3>
                <div className="text-xs text-gray-600">
                  <p className="mb-2">• <strong>Jan-Mar:</strong> Alta demanda frigoríficos</p>
                  <p className="mb-2">• <strong>Abr-Jun:</strong> Período de engorda</p>
                  <p className="mb-2">• <strong>Jul-Set:</strong> Seca - preços altos</p>
                  <p>• <strong>Out-Dez:</strong> Chuvas - recuperação pasto</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Market Data */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Todas as Cotações</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atualização</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketData.map((item) => (
                  <motion.tr
                    key={item.symbol}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.symbol}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-gray-900">
                        R$ {item.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-1 ${getChangeColor(item.change)}`}>
                        {getChangeIcon(item.change)}
                        <span className="font-medium">
                          R$ {Math.abs(item.change).toFixed(2)} ({Math.abs(item.changePercent).toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.volume.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.lastUpdate).toLocaleTimeString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}