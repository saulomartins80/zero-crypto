import { Request, Response } from 'express';

export class MercadoController {
  // Preços atuais do mercado
  async getPrecos(req: Request, res: Response) {
    try {
      // Simulação de dados - depois integrar com APIs reais (Cepea, B3)
      const precos = [
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
      ];
      
      res.json(precos);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Histórico de preços
  async getHistorico(req: Request, res: Response) {
    try {
      const { symbol } = req.params;
      const { periodo = '30' } = req.query;
      
      // Simulação de histórico - depois integrar com APIs reais
      const historico = Array.from({ length: Number(periodo) }, (_, i) => ({
        date: new Date(Date.now() - (Number(periodo) - 1 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: 280 + Math.random() * 20 - 10,
        volume: 10000 + Math.random() * 5000
      }));
      
      res.json(historico);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Análise de mercado
  async getAnalise(req: Request, res: Response) {
    try {
      const analise = {
        tendencia: 'ALTA',
        volatilidade: 'MEDIA',
        volume: 'ALTO',
        recomendacao: 'COMPRAR',
        confianca: 0.85,
        fatores: [
          'Demanda frigoríficos em alta',
          'Oferta de animais reduzida',
          'Dólar favorável para exportação',
          'Clima favorável para pastagem'
        ],
        riscos: [
          'Possível alta nos custos de ração',
          'Incerteza política',
          'Variação cambial'
        ]
      };
      
      res.json(analise);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Previsão de preços
  async getPrevisao(req: Request, res: Response) {
    try {
      const { symbol } = req.params;
      
      const previsao = {
        symbol,
        precoAtual: 285.50,
        previsao30d: {
          min: 290.00,
          max: 295.00,
          media: 292.50,
          confianca: 0.78
        },
        previsao60d: {
          min: 285.00,
          max: 300.00,
          media: 292.50,
          confianca: 0.65
        },
        previsao90d: {
          min: 280.00,
          max: 305.00,
          media: 292.50,
          confianca: 0.52
        },
        fatores: [
          'Sazonalidade histórica',
          'Tendências de consumo',
          'Projeções climáticas',
          'Cenário econômico'
        ]
      };
      
      res.json(previsao);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Preço boi gordo Cepea
  async getBoiGordo(req: Request, res: Response) {
    try {
      const boiGordo = {
        preco: 285.50,
        variacao: 2.30,
        percentual: 0.81,
        data: new Date().toISOString(),
        historico: Array.from({ length: 30 }, (_, i) => ({
          data: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          preco: 280 + Math.random() * 10
        }))
      };
      
      res.json(boiGordo);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Preço bezerro Cepea
  async getBezerro(req: Request, res: Response) {
    try {
      const bezerro = {
        preco: 1850.00,
        variacao: -15.00,
        percentual: -0.80,
        data: new Date().toISOString(),
        historico: Array.from({ length: 30 }, (_, i) => ({
          data: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          preco: 1800 + Math.random() * 100
        }))
      };
      
      res.json(bezerro);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Índices B3
  async getIndicesB3(req: Request, res: Response) {
    try {
      const indices = {
        boiGordo: {
          valor: 285.50,
          variacao: 2.30,
          percentual: 0.81
        },
        milho: {
          valor: 65.80,
          variacao: -0.50,
          percentual: -0.75
        },
        soja: {
          valor: 145.20,
          variacao: 3.80,
          percentual: 2.69
        }
      };
      
      res.json(indices);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Sazonalidade
  async getSazonalidade(req: Request, res: Response) {
    try {
      const { produto } = req.params;
      
      const sazonalidade = {
        produto,
        padrao: [
          { mes: 'Jan', tendencia: 'ALTA', fator: 1.05 },
          { mes: 'Fev', tendencia: 'ALTA', fator: 1.08 },
          { mes: 'Mar', tendencia: 'ALTA', fator: 1.12 },
          { mes: 'Abr', tendencia: 'ESTAVEL', fator: 1.02 },
          { mes: 'Mai', tendencia: 'BAIXA', fator: 0.98 },
          { mes: 'Jun', tendencia: 'BAIXA', fator: 0.95 },
          { mes: 'Jul', tendencia: 'ALTA', fator: 1.15 },
          { mes: 'Ago', tendencia: 'ALTA', fator: 1.18 },
          { mes: 'Set', tendencia: 'ALTA', fator: 1.20 },
          { mes: 'Out', tendencia: 'ESTAVEL', fator: 1.05 },
          { mes: 'Nov', tendencia: 'BAIXA', fator: 0.92 },
          { mes: 'Dez', tendencia: 'BAIXA', fator: 0.88 }
        ],
        observacoes: [
          'Período seco (Jul-Set) apresenta maiores preços',
          'Período chuvoso (Nov-Mar) com menores preços',
          'Demanda frigoríficos maior no 1º trimestre'
        ]
      };
      
      res.json(sazonalidade);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}