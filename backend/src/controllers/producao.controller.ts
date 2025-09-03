import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

export class ProducaoController {
  // Listar dados de produção
  async getProducaoData(req: Request, res: Response) {
    try {
      const { tipo, periodo } = req.query;
      
      let query = supabaseAdmin.from('producao').select('*');
      
      if (tipo) query = query.eq('tipo', tipo);
      if (periodo) {
        const dataInicio = new Date();
        dataInicio.setDate(dataInicio.getDate() - Number(periodo));
        query = query.gte('data', dataInicio.toISOString());
      }
      
      const { data: producaoData, error } = await query.order('data', { ascending: false });
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(producaoData);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Criar evento de produção
  async createProducaoEvent(req: Request, res: Response) {
    try {
      const eventData = req.body;
      
      const { data: event, error } = await supabaseAdmin
        .from('producao')
        .insert(eventData)
        .select()
        .single();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Obter evento específico
  async getProducaoEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const { data: event, error } = await supabaseAdmin
        .from('producao')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atualizar evento
  async updateProducaoEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const { data: event, error } = await supabaseAdmin
        .from('producao')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Deletar evento
  async deleteProducaoEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const { error } = await supabaseAdmin
        .from('producao')
        .delete()
        .eq('id', id);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json({ message: 'Evento removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Estatísticas gerais
  async getOverviewStats(req: Request, res: Response) {
    try {
      const { data: events, error } = await supabaseAdmin
        .from('producao')
        .select('tipo, custo_producao, receita, margem_lucro, ganho_medio');
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      const stats = {
        totalEventos: events?.length || 0,
        receitaTotal: events?.reduce((sum, event) => sum + (event.receita || 0), 0) || 0,
        custoTotal: events?.reduce((sum, event) => sum + (event.custo_producao || 0), 0) || 0,
        margemTotal: events?.reduce((sum, event) => sum + (event.margem_lucro || 0), 0) || 0,
        gmdMedio: events?.filter(e => e.ganho_medio).reduce((sum, event) => sum + (event.ganho_medio || 0), 0) / events?.filter(e => e.ganho_medio).length || 0,
        porTipo: events?.reduce((acc, event) => {
          acc[event.tipo] = (acc[event.tipo] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {}
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Estatísticas de GMD
  async getGMDStats(req: Request, res: Response) {
    try {
      const { data: events, error } = await supabaseAdmin
        .from('producao')
        .select('animal, ganho_medio, data')
        .eq('tipo', 'ENGORDA')
        .not('ganho_medio', 'is', null);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      const gmdStats = {
        gmdMedio: events?.reduce((sum, event) => sum + (event.ganho_medio || 0), 0) / events?.length || 0,
        gmdMaximo: Math.max(...(events?.map(e => e.ganho_medio || 0) || [0])),
        gmdMinimo: Math.min(...(events?.map(e => e.ganho_medio || 0) || [0])),
        historico: events?.map(event => ({
          animal: event.animal,
          gmd: event.ganho_medio,
          data: event.data
        })) || []
      };
      
      res.json(gmdStats);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Análise de custos
  async getCostAnalysis(req: Request, res: Response) {
    try {
      const { data: events, error } = await supabaseAdmin
        .from('producao')
        .select('tipo, custo_producao, data');
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      const costAnalysis = {
        custoTotal: events?.reduce((sum, event) => sum + (event.custo_producao || 0), 0) || 0,
        custoPorTipo: events?.reduce((acc, event) => {
          acc[event.tipo] = (acc[event.tipo] || 0) + (event.custo_producao || 0);
          return acc;
        }, {} as Record<string, number>) || {},
        custoPorMes: events?.reduce((acc, event) => {
          const mes = new Date(event.data).toISOString().substring(0, 7);
          acc[mes] = (acc[mes] || 0) + (event.custo_producao || 0);
          return acc;
        }, {} as Record<string, number>) || {}
      };
      
      res.json(costAnalysis);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Análise de margem
  async getMarginAnalysis(req: Request, res: Response) {
    try {
      const { data: events, error } = await supabaseAdmin
        .from('producao')
        .select('tipo, receita, custo_producao, margem_lucro, data')
        .not('receita', 'is', null);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      const marginAnalysis = {
        margemTotal: events?.reduce((sum, event) => sum + (event.margem_lucro || 0), 0) || 0,
        margemMedia: events?.reduce((sum, event) => sum + (event.margem_lucro || 0), 0) / events?.length || 0,
        margemPorTipo: events?.reduce((acc, event) => {
          if (!acc[event.tipo]) acc[event.tipo] = { margem: 0, count: 0 };
          acc[event.tipo].margem += (event.margem_lucro || 0);
          acc[event.tipo].count += 1;
          return acc;
        }, {} as Record<string, { margem: number; count: number }>) || {},
        margemPorMes: events?.reduce((acc, event) => {
          const mes = new Date(event.data).toISOString().substring(0, 7);
          acc[mes] = (acc[mes] || 0) + (event.margem_lucro || 0);
          return acc;
        }, {} as Record<string, number>) || {}
      };
      
      res.json(marginAnalysis);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}