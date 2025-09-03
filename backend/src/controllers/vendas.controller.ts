import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

export class VendasController {
  // Listar vendas
  async getVendas(req: Request, res: Response) {
    try {
      const { status, tipo_venda, data_inicio, data_fim } = req.query;
      
      let query = supabaseAdmin.from('vendas').select('*');
      
      if (status) query = query.eq('status', status);
      if (tipo_venda) query = query.eq('tipo_venda', tipo_venda);
      if (data_inicio) query = query.gte('data_venda', data_inicio);
      if (data_fim) query = query.lte('data_venda', data_fim);
      
      const { data: vendas, error } = await query.order('data_venda', { ascending: false });
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(vendas);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Criar nova venda
  async createVenda(req: Request, res: Response) {
    try {
      const vendaData = req.body;
      
      const { data: venda, error } = await supabaseAdmin
        .from('vendas')
        .insert(vendaData)
        .select()
        .single();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(201).json(venda);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Obter venda específica
  async getVenda(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const { data: venda, error } = await supabaseAdmin
        .from('vendas')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
      
      res.json(venda);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atualizar venda
  async updateVenda(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const { data: venda, error } = await supabaseAdmin
        .from('vendas')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(venda);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Deletar venda
  async deleteVenda(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const { error } = await supabaseAdmin
        .from('vendas')
        .delete()
        .eq('id', id);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json({ message: 'Venda removida com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Animais prontos para venda
  async getAnimaisProntos(req: Request, res: Response) {
    try {
      const { data: animals, error } = await supabaseAdmin
        .from('animais')
        .select('*')
        .eq('status', 'ATIVO')
        .gte('peso', 450); // Peso mínimo para venda
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(animals);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Simular venda
  async simularVenda(req: Request, res: Response) {
    try {
      const { animais, preco_arroba } = req.body;
      
      // Buscar dados dos animais
      const { data: animalsData, error } = await supabaseAdmin
        .from('animais')
        .select('peso, valor_compra, custo_acumulado')
        .in('id', animais);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      const pesoTotal = animalsData?.reduce((sum, animal) => sum + animal.peso, 0) || 0;
      const arrobas = pesoTotal / 15; // 1 arroba = 15kg
      const valorBruto = arrobas * preco_arroba;
      
      // Cálculo de impostos
      const funrural = valorBruto * 0.023; // 2.3%
      const icms = valorBruto * 0.10; // 10%
      const outros = valorBruto * 0.01; // 1%
      const impostoTotal = funrural + icms + outros;
      
      const valorLiquido = valorBruto - impostoTotal;
      const custoTotal = animalsData?.reduce((sum, animal) => sum + (animal.valor_compra || 0) + animal.custo_acumulado, 0) || 0;
      const lucroLiquido = valorLiquido - custoTotal;
      const margemLucro = custoTotal > 0 ? (lucroLiquido / custoTotal) * 100 : 0;
      
      const simulacao = {
        pesoTotal,
        arrobas: Math.round(arrobas * 100) / 100,
        valorBruto,
        impostos: {
          funrural,
          icms,
          outros,
          total: impostoTotal
        },
        valorLiquido,
        custoTotal,
        lucroLiquido,
        margemLucro
      };
      
      res.json(simulacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Estatísticas de vendas
  async getOverviewStats(req: Request, res: Response) {
    try {
      const { data: vendas, error } = await supabaseAdmin
        .from('vendas')
        .select('valor_total, lucro_liquido, status, data_venda');
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      const stats = {
        totalVendas: vendas?.reduce((sum, venda) => sum + venda.valor_total, 0) || 0,
        totalLucro: vendas?.reduce((sum, venda) => sum + venda.lucro_liquido, 0) || 0,
        vendasConcluidas: vendas?.filter(v => v.status === 'CONCLUIDA').length || 0,
        vendasAgendadas: vendas?.filter(v => v.status === 'AGENDADA').length || 0,
        vendasPorMes: vendas?.reduce((acc, venda) => {
          const mes = new Date(venda.data_venda).toISOString().substring(0, 7);
          acc[mes] = (acc[mes] || 0) + venda.valor_total;
          return acc;
        }, {} as Record<string, number>) || {}
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Cotação frigorífico
  async getCotacaoFrigorifico(req: Request, res: Response) {
    try {
      const { frigorifico, categoria } = req.body;
      
      // Simulação de cotação - depois integrar com APIs reais
      const cotacoes = {
        'JBS': { BOI: 285.50, VACA: 245.80 },
        'MARFRIG': { BOI: 283.20, VACA: 243.50 },
        'MINERVA': { BOI: 287.10, VACA: 247.20 }
      };
      
      const preco = cotacoes[frigorifico as keyof typeof cotacoes]?.[categoria as keyof typeof cotacoes['JBS']] || 0;
      
      res.json({
        frigorifico,
        categoria,
        preco,
        data_cotacao: new Date().toISOString(),
        validade: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}