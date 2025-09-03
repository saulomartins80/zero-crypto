'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'

interface ProducaoData {
  id: string
  tipo: 'NASCIMENTO' | 'DESMAME' | 'ENGORDA' | 'REPRODUCAO'
  animal: string
  data: string
  peso?: number
  ganhoMedio?: number
  custoProducao: number
  receita?: number
  margemLucro?: number
  observacoes?: string
}

export default function ProducaoManager() {
  const [producaoData, setProducaoData] = useState<ProducaoData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  useEffect(() => {
    fetchProducaoData()
  }, [])

  const fetchProducaoData = async () => {
    try {
      // Simulação de dados - depois integrar com Supabase
      const mockData: ProducaoData[] = [
        {
          id: '1',
          tipo: 'NASCIMENTO',
          animal: 'BR001',
          data: '2024-01-15',
          peso: 35,
          custoProducao: 0,
          receita: 0,
          observacoes: 'Nascimento sem complicações'
        },
        {
          id: '2',
          tipo: 'ENGORDA',
          animal: 'BR002',
          data: '2024-01-10',
          peso: 520,
          ganhoMedio: 1.2,
          custoProducao: 2800,
          receita: 4200,
          margemLucro: 1400
        },
        {
          id: '3',
          tipo: 'DESMAME',
          animal: 'BR003',
          data: '2024-01-05',
          peso: 180,
          custoProducao: 450,
          receita: 800,
          margemLucro: 350
        }
      ]
      
      setProducaoData(mockData)
    } catch (error) {
      console.error('Erro ao buscar dados de produção:', error)
    } finally {
      setLoading(false)
    }
  }

  // Dados simulados para gráficos
  const ganhoMedioData = [
    { mes: 'Jan', ganho: 1.2 },
    { mes: 'Fev', ganho: 1.1 },
    { mes: 'Mar', ganho: 1.3 },
    { mes: 'Abr', ganho: 1.0 },
    { mes: 'Mai', ganho: 1.4 },
    { mes: 'Jun', ganho: 1.2 }
  ]

  const custoReceitaData = [
    { mes: 'Jan', custo: 15000, receita: 22000 },
    { mes: 'Fev', custo: 18000, receita: 25000 },
    { mes: 'Mar', custo: 16000, receita: 28000 },
    { mes: 'Abr', custo: 19000, receita: 24000 },
    { mes: 'Mai', custo: 17000, receita: 30000 },
    { mes: 'Jun', custo: 20000, receita: 32000 }
  ]

  const totalReceita = producaoData.reduce((sum, item) => sum + (item.receita || 0), 0)
  const totalCusto = producaoData.reduce((sum, item) => sum + item.custoProducao, 0)
  const margemTotal = totalReceita - totalCusto
  const ganhoMedioGeral = producaoData
    .filter(item => item.ganhoMedio)
    .reduce((sum, item) => sum + (item.ganhoMedio || 0), 0) / 
    producaoData.filter(item => item.ganhoMedio).length || 0

  const getTypeIcon = (tipo: string) => {
    const icons = {
      'NASCIMENTO': '🐣',
      'DESMAME': '🍼',
      'ENGORDA': '📈',
      'REPRODUCAO': '💕'
    }
    return icons[tipo as keyof typeof icons] || '📊'
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
              <h1 className="text-3xl font-bold text-gray-900">📈 Análise de Produção</h1>
              <p className="text-gray-600 mt-1">Indicadores produtivos e análise de performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
                <option value="1y">Último ano</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900">R$ {totalReceita.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12.5% vs mês anterior</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-100">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Custo Total</p>
                <p className="text-2xl font-bold text-gray-900">R$ {totalCusto.toLocaleString()}</p>
                <p className="text-sm text-red-600">+5.2% vs mês anterior</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Margem Líquida</p>
                <p className="text-2xl font-bold text-gray-900">R$ {margemTotal.toLocaleString()}</p>
                <p className="text-sm text-blue-600">+18.3% vs mês anterior</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <PieChart className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">GMD Médio</p>
                <p className="text-2xl font-bold text-gray-900">{ganhoMedioGeral.toFixed(2)} kg/dia</p>
                <p className="text-sm text-yellow-600">+8.1% vs mês anterior</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ganho Médio Diário */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Ganho Médio Diário (GMD)</h2>
              <div className="text-sm text-gray-500">kg/dia</div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ganhoMedioData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.95)', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: 8 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ganho" 
                    stroke="#2D5016" 
                    strokeWidth={3}
                    dot={{ fill: '#2D5016', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Custo vs Receita */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Custo vs Receita</h2>
              <div className="text-sm text-gray-500">R$ (milhares)</div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={custoReceitaData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.95)', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: 8 
                    }}
                    formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, '']}
                  />
                  <Bar dataKey="custo" fill="#EF4444" name="Custo" />
                  <Bar dataKey="receita" fill="#2D5016" name="Receita" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Production Events */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Eventos de Produção</h2>
          </div>
          
          <div className="divide-y">
            {producaoData.map((evento) => (
              <motion.div
                key={evento.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getTypeIcon(evento.tipo)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{evento.tipo}</h3>
                        <span className="text-sm text-gray-500">Animal: {evento.animal}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Data:</span> {new Date(evento.data).toLocaleDateString()}
                        </div>
                        {evento.peso && (
                          <div>
                            <span className="font-medium">Peso:</span> {evento.peso} kg
                          </div>
                        )}
                        {evento.ganhoMedio && (
                          <div>
                            <span className="font-medium">GMD:</span> {evento.ganhoMedio} kg/dia
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Custo:</span> R$ {evento.custoProducao.toLocaleString()}
                        </div>
                      </div>

                      {evento.receita && (
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div className="text-green-600">
                            <span className="font-medium">Receita:</span> R$ {evento.receita.toLocaleString()}
                          </div>
                          {evento.margemLucro && (
                            <div className={`font-medium ${evento.margemLucro > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              <span>Margem:</span> R$ {evento.margemLucro.toLocaleString()}
                            </div>
                          )}
                        </div>
                      )}

                      {evento.observacoes && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Observações:</span> {evento.observacoes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}