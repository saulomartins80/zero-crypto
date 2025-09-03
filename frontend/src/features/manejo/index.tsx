'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Plus, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

interface ManejoActivity {
  id: string
  tipo: 'VACINACAO' | 'VERMIFUGACAO' | 'PESAGEM' | 'REPRODUCAO' | 'TRATAMENTO'
  animais: string[]
  data: string
  produto?: string
  dosagem?: string
  custo: number
  responsavel: string
  status: 'PENDENTE' | 'CONCLUIDO' | 'ATRASADO'
  observacoes?: string
  proximaAplicacao?: string
}

export default function ManejoManager() {
  const [activities, setActivities] = useState<ManejoActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      // Simulação de dados - depois integrar com Supabase
      const mockActivities: ManejoActivity[] = [
        {
          id: '1',
          tipo: 'VACINACAO',
          animais: ['BR001', 'BR002', 'BR003'],
          data: '2024-01-15',
          produto: 'Vacina Aftosa',
          dosagem: '5ml',
          custo: 450,
          responsavel: 'João Silva',
          status: 'CONCLUIDO',
          proximaAplicacao: '2024-07-15',
          observacoes: 'Aplicação realizada sem intercorrências'
        },
        {
          id: '2',
          tipo: 'VERMIFUGACAO',
          animais: ['BR004', 'BR005'],
          data: '2024-01-20',
          produto: 'Ivermectina',
          dosagem: '1ml/50kg',
          custo: 280,
          responsavel: 'Maria Santos',
          status: 'PENDENTE',
          proximaAplicacao: '2024-04-20'
        },
        {
          id: '3',
          tipo: 'PESAGEM',
          animais: ['BR001', 'BR002', 'BR003', 'BR004', 'BR005'],
          data: '2024-01-10',
          custo: 0,
          responsavel: 'João Silva',
          status: 'ATRASADO',
          observacoes: 'Pesagem mensal do rebanho'
        }
      ]
      
      setActivities(mockActivities)
    } catch (error) {
      console.error('Erro ao buscar atividades:', error)
      toast.error('Erro ao carregar atividades de manejo')
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (tipo: string) => {
    const icons = {
      'VACINACAO': '💉',
      'VERMIFUGACAO': '🐛',
      'PESAGEM': '⚖️',
      'REPRODUCAO': '🐄',
      'TRATAMENTO': '🏥'
    }
    return icons[tipo as keyof typeof icons] || '📋'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      'CONCLUIDO': 'bg-green-100 text-green-800',
      'PENDENTE': 'bg-yellow-100 text-yellow-800',
      'ATRASADO': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONCLUIDO':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'PENDENTE':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'ATRASADO':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const pendingActivities = activities.filter(a => a.status === 'PENDENTE').length
  const overdueActivities = activities.filter(a => a.status === 'ATRASADO').length
  const completedActivities = activities.filter(a => a.status === 'CONCLUIDO').length
  const totalCost = activities.reduce((sum, activity) => sum + activity.custo, 0)

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
              <h1 className="text-3xl font-bold text-gray-900">📋 Manejo do Rebanho</h1>
              <p className="text-gray-600 mt-1">Controle de atividades sanitárias e produtivas</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Nova Atividade</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{pendingActivities}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Atrasadas</p>
                <p className="text-2xl font-bold text-gray-900">{overdueActivities}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-gray-900">{completedActivities}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Custo Total</p>
                <p className="text-2xl font-bold text-gray-900">R$ {totalCost.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar and Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Calendário</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Próximas Atividades</h3>
              <div className="space-y-2">
                {activities.filter(a => a.status === 'PENDENTE').slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <span className="text-lg">{getActivityIcon(activity.tipo)}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.tipo}</p>
                      <p className="text-xs text-gray-500">{activity.animais.length} animais</p>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(activity.data).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activities List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Atividades de Manejo</h2>
              </div>
              
              <div className="divide-y">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="text-2xl">{getActivityIcon(activity.tipo)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{activity.tipo}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                              {activity.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Data:</span> {new Date(activity.data).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Animais:</span> {activity.animais.length}
                            </div>
                            <div>
                              <span className="font-medium">Responsável:</span> {activity.responsavel}
                            </div>
                            <div>
                              <span className="font-medium">Custo:</span> R$ {activity.custo.toLocaleString()}
                            </div>
                          </div>

                          {activity.produto && (
                            <div className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Produto:</span> {activity.produto}
                              {activity.dosagem && <span> - {activity.dosagem}</span>}
                            </div>
                          )}

                          {activity.proximaAplicacao && (
                            <div className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Próxima aplicação:</span> {new Date(activity.proximaAplicacao).toLocaleDateString()}
                            </div>
                          )}

                          {activity.observacoes && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Observações:</span> {activity.observacoes}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(activity.status)}
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}