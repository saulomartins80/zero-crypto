'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import toast from 'react-hot-toast'

interface Animal {
  id: string
  brinco: string
  categoria: 'BEZERRO' | 'NOVILHO' | 'BOI' | 'BEZERRA' | 'NOVILHA' | 'VACA'
  peso: number
  idade: number
  raca: string
  status: 'ATIVO' | 'VENDIDO' | 'MORTO' | 'TRANSFERIDO'
  lote: string
  pasto: string
  dataEntrada: string
  valorCompra?: number
  custoAcumulado: number
  observacoes?: string
}

export default function RebanhoManager() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS')
  const [showAddModal, setShowAddModal] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    fetchAnimals()
  }, [])

  const fetchAnimals = async () => {
    try {
      // Simulação de dados - depois integrar com Supabase
      const mockAnimals: Animal[] = [
        {
          id: '1',
          brinco: 'BR001',
          categoria: 'BOI',
          peso: 520,
          idade: 36,
          raca: 'Nelore',
          status: 'ATIVO',
          lote: 'L001',
          pasto: 'Pasto 1',
          dataEntrada: '2023-01-15',
          valorCompra: 2800,
          custoAcumulado: 450,
          observacoes: 'Animal em excelente estado'
        },
        {
          id: '2',
          brinco: 'BR002',
          categoria: 'VACA',
          peso: 480,
          idade: 48,
          raca: 'Angus',
          status: 'ATIVO',
          lote: 'L002',
          pasto: 'Pasto 2',
          dataEntrada: '2022-08-20',
          valorCompra: 3200,
          custoAcumulado: 680,
          observacoes: 'Matriz reprodutora'
        },
        {
          id: '3',
          brinco: 'BR003',
          categoria: 'NOVILHO',
          peso: 380,
          idade: 24,
          raca: 'Brahman',
          status: 'ATIVO',
          lote: 'L001',
          pasto: 'Pasto 1',
          dataEntrada: '2023-06-10',
          valorCompra: 2200,
          custoAcumulado: 320
        }
      ]
      
      setAnimals(mockAnimals)
    } catch (error) {
      console.error('Erro ao buscar animais:', error)
      toast.error('Erro ao carregar rebanho')
    } finally {
      setLoading(false)
    }
  }

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.brinco.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.raca.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'TODOS' || animal.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (categoria: string) => {
    const colors = {
      'BOI': 'bg-blue-100 text-blue-800',
      'VACA': 'bg-pink-100 text-pink-800',
      'NOVILHO': 'bg-green-100 text-green-800',
      'NOVILHA': 'bg-purple-100 text-purple-800',
      'BEZERRO': 'bg-yellow-100 text-yellow-800',
      'BEZERRA': 'bg-orange-100 text-orange-800'
    }
    return colors[categoria as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      'ATIVO': 'bg-green-100 text-green-800',
      'VENDIDO': 'bg-blue-100 text-blue-800',
      'MORTO': 'bg-red-100 text-red-800',
      'TRANSFERIDO': 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
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
              <h1 className="text-3xl font-bold text-gray-900">🐂 Gestão do Rebanho</h1>
              <p className="text-gray-600 mt-1">Controle completo dos seus animais</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar Animal</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-primary-100">
                <span className="text-2xl">🐂</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Animais</p>
                <p className="text-2xl font-bold text-gray-900">{animals.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <span className="text-2xl">⚖️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Peso Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {animals.reduce((sum, animal) => sum + animal.peso, 0).toLocaleString()} kg
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Valor Investido</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {animals.reduce((sum, animal) => sum + (animal.valorCompra || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Peso Médio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(animals.reduce((sum, animal) => sum + animal.peso, 0) / animals.length)} kg
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por brinco ou raça..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="TODOS">Todas Categorias</option>
                <option value="BOI">Boi</option>
                <option value="VACA">Vaca</option>
                <option value="NOVILHO">Novilho</option>
                <option value="NOVILHA">Novilha</option>
                <option value="BEZERRO">Bezerro</option>
                <option value="BEZERRA">Bezerra</option>
              </select>
            </div>
          </div>
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map((animal) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{animal.brinco}</h3>
                  <p className="text-gray-600">{animal.raca}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(animal.categoria)}`}>
                    {animal.categoria}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(animal.status)}`}>
                    {animal.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Peso:</span>
                  <span className="font-semibold">{animal.peso} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Idade:</span>
                  <span className="font-semibold">{animal.idade} meses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lote:</span>
                  <span className="font-semibold">{animal.lote}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pasto:</span>
                  <span className="font-semibold">{animal.pasto}</span>
                </div>
                {animal.valorCompra && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor Compra:</span>
                    <span className="font-semibold text-green-600">R$ {animal.valorCompra.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <div className="text-sm text-gray-500">
                  Custo Acumulado: R$ {animal.custoAcumulado.toLocaleString()}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAnimals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🐂</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum animal encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou adicione novos animais ao rebanho.</p>
          </div>
        )}
      </div>
    </div>
  )
}