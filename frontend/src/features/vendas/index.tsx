'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Calculator, Users } from 'lucide-react'
import toast from 'react-hot-toast'

interface Venda {
  id: string
  animais: string[]
  comprador: string
  tipoVenda: 'FRIGORIFICO' | 'LEILAO' | 'DIRETO'
  pesoTotal: number
  precoArroba: number
  valorTotal: number
  dataVenda: string
  dataEntrega?: string
  impostos: {
    funrural: number
    icms: number
    outros: number
  }
  lucroLiquido: number
  status: 'AGENDADA' | 'CONCLUIDA' | 'CANCELADA'
  observacoes?: string
}

interface AnimalVenda {
  id: string
  brinco: string
  peso: number
  categoria: string
  custoTotal: number
  prontoVenda: boolean
}

export default function VendasManager() {
  const [vendas, setVendas] = useState<Venda[]>([])
  const [animaisProntos, setAnimaisProntos] = useState<AnimalVenda[]>([])
  const [loading, setLoading] = useState(true)
  const [precoAtualArroba, setPrecoAtualArroba] = useState(285.50)
  const [showSimulador, setShowSimulador] = useState(false)

  useEffect(() => {
    fetchVendas()
    fetchAnimaisProntos()
  }, [])

  const fetchVendas = async () => {
    try {
      // Simulação de dados - depois integrar com Supabase
      const mockVendas: Venda[] = [
        {
          id: '1',
          animais: ['BR001', 'BR002'],
          comprador: 'Frigorífico JBS',
          tipoVenda: 'FRIGORIFICO',
          pesoTotal: 1040,
          precoArroba: 280.00,
          valorTotal: 19552,
          dataVenda: '2024-01-20',
          dataEntrega: '2024-01-22',
          impostos: {
            funrural: 450,
            icms: 1955,
            outros: 200
          },
          lucroLiquido: 16947,
          status: 'AGENDADA'
        },
        {
          id: '2',
          animais: ['BR003', 'BR004', 'BR005'],
          comprador: 'Leilão Regional',
          tipoVenda: 'LEILAO',
          pesoTotal: 1560,
          precoArroba: 275.00,
          valorTotal: 28600,
          dataVenda: '2024-01-15',
          impostos: {
            funrural: 658,
            icms: 2860,
            outros: 150
          },
          lucroLiquido: 24932,
          status: 'CONCLUIDA'
        }
      ]
      
      setVendas(mockVendas)
    } catch (error) {
      console.error('Erro ao buscar vendas:', error)
      toast.error('Erro ao carregar vendas')
    }
  }

  const fetchAnimaisProntos = async () => {
    try {
      // Simulação de dados - depois integrar com Supabase
      const mockAnimais: AnimalVenda[] = [
        {
          id: '1',
          brinco: 'BR006',
          peso: 520,
          categoria: 'BOI',
          custoTotal: 3200,
          prontoVenda: true
        },
        {
          id: '2',
          brinco: 'BR007',
          peso: 480,
          categoria: 'BOI',
          custoTotal: 2950,
          prontoVenda: true
        },
        {
          id: '3',
          brinco: 'BR008',
          peso: 510,
          categoria: 'BOI',
          custoTotal: 3100,
          prontoVenda: true
        }
      ]
      
      setAnimaisProntos(mockAnimais)
    } catch (error) {
      console.error('Erro ao buscar animais prontos:', error)
    } finally {
      setLoading(false)
    }
  }

  const calcularSimulacao = (animais: AnimalVenda[], precoArroba: number) => {
    const pesoTotal = animais.reduce((sum, animal) => sum + animal.peso, 0)
    const arrobas = pesoTotal / 15 // 1 arroba = 15kg
    const valorBruto = arrobas * precoArroba
    const funrural = valorBruto * 0.023 // 2.3%
    const icms = valorBruto * 0.10 // 10% (varia por estado)
    const outros = valorBruto * 0.01 // 1% outros impostos
    const impostoTotal = funrural + icms + outros
    const valorLiquido = valorBruto - impostoTotal
    const custoTotal = animais.reduce((sum, animal) => sum + animal.custoTotal, 0)
    const lucroLiquido = valorLiquido - custoTotal
    const margemLucro = (lucroLiquido / custoTotal) * 100

    return {
      pesoTotal,
      arrobas: Math.round(arrobas * 100) / 100,
      valorBruto,
      impostos: { funrural, icms, outros, total: impostoTotal },
      valorLiquido,
      custoTotal,
      lucroLiquido,
      margemLucro
    }
  }

  const simulacao = calcularSimulacao(animaisProntos, precoAtualArroba)

  const totalVendas = vendas.reduce((sum, venda) => sum + venda.valorTotal, 0)
  const totalLucro = vendas.reduce((sum, venda) => sum + venda.lucroLiquido, 0)
  const vendasConcluidas = vendas.filter(v => v.status === 'CONCLUIDA').length
  const vendasAgendadas = vendas.filter(v => v.status === 'AGENDADA').length

  const getStatusColor = (status: string) => {
    const colors = {
      'AGENDADA': 'bg-yellow-100 text-yellow-800',
      'CONCLUIDA': 'bg-green-100 text-green-800',
      'CANCELADA': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTipoVendaColor = (tipo: string) => {
    const colors = {
      'FRIGORIFICO': 'bg-blue-100 text-blue-800',
      'LEILAO': 'bg-purple-100 text-purple-800',
      'DIRETO': 'bg-green-100 text-green-800'
    }
    return colors[tipo as keyof typeof colors] || 'bg-gray-100 text-gray-800'
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
              <h1 className="text-3xl font-bold text-gray-900">💰 Gestão de Vendas</h1>
              <p className="text-gray-600 mt-1">Controle de vendas e análise de lucratividade</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Preço Atual da Arroba</p>
                <p className="text-2xl font-bold text-green-600">R$ {precoAtualArroba.toFixed(2)}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSimulador(!showSimulador)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Simulador</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vendas</p>
                <p className="text-2xl font-bold text-gray-900">R$ {totalVendas.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
                <p className="text-2xl font-bold text-gray-900">R$ {totalLucro.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-gray-900">{vendasConcluidas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <span className="text-2xl">🐂</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Prontos p/ Venda</p>
                <p className="text-2xl font-bold text-gray-900">{animaisProntos.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulador */}
        {showSimulador && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🧮 Simulador de Vendas</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Animais Selecionados */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Animais Prontos para Venda</h3>
                <div className="space-y-3">
                  {animaisProntos.map((animal) => (
                    <div key={animal.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{animal.brinco}</span>
                        <span className="text-gray-500 ml-2">({animal.categoria})</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{animal.peso} kg</div>
                        <div className="text-sm text-gray-500">Custo: R$ {animal.custoTotal.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulação */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Simulação de Venda</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Peso Total:</span>
                      <div className="font-semibold">{simulacao.pesoTotal} kg</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Arrobas:</span>
                      <div className="font-semibold">{simulacao.arrobas} @</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Preço/Arroba:</span>
                      <div className="font-semibold">R$ {precoAtualArroba.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Valor Bruto:</span>
                      <div className="font-semibold text-green-600">R$ {simulacao.valorBruto.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Impostos e Taxas</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Funrural (2.3%): R$ {simulacao.impostos.funrural.toLocaleString()}</div>
                      <div>ICMS (10%): R$ {simulacao.impostos.icms.toLocaleString()}</div>
                      <div>Outros (1%): R$ {simulacao.impostos.outros.toLocaleString()}</div>
                      <div className="font-semibold">Total: R$ {simulacao.impostos.total.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-600">Valor Líquido:</span>
                        <div className="text-xl font-bold text-blue-600">R$ {simulacao.valorLiquido.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Custo Total:</span>
                        <div className="text-xl font-bold text-red-600">R$ {simulacao.custoTotal.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Lucro Líquido</div>
                        <div className="text-2xl font-bold text-green-600">R$ {simulacao.lucroLiquido.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Margem: {simulacao.margemLucro.toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Vendas List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Histórico de Vendas</h2>
          </div>
          
          <div className="divide-y">
            {vendas.map((venda) => (
              <motion.div
                key={venda.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{venda.comprador}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoVendaColor(venda.tipoVenda)}`}>
                        {venda.tipoVenda}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(venda.status)}`}>
                        {venda.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Animais:</span> {venda.animais.length}
                      </div>
                      <div>
                        <span className="font-medium">Peso Total:</span> {venda.pesoTotal} kg
                      </div>
                      <div>
                        <span className="font-medium">Preço/Arroba:</span> R$ {venda.precoArroba.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">Data Venda:</span> {new Date(venda.dataVenda).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div className="text-green-600">
                        <span className="font-medium">Valor Total:</span> R$ {venda.valorTotal.toLocaleString()}
                      </div>
                      <div className="text-red-600">
                        <span className="font-medium">Impostos:</span> R$ {(venda.impostos.funrural + venda.impostos.icms + venda.impostos.outros).toLocaleString()}
                      </div>
                      <div className="text-blue-600">
                        <span className="font-medium">Lucro Líquido:</span> R$ {venda.lucroLiquido.toLocaleString()}
                      </div>
                      {venda.dataEntrega && (
                        <div>
                          <span className="font-medium">Entrega:</span> {new Date(venda.dataEntrega).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Animais:</span> {venda.animais.join(', ')}
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