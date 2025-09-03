import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

export class ManejoController {
  // Listar atividades de manejo
  async getActivities(req: Request, res: Response) {
    try {
      const { tipo, status, data_inicio, data_fim } = req.query;
      
      let query = supabaseAdmin.from('manejo').select('*');
      
      if (tipo) query = query.eq('tipo', tipo);
      if (status) query = query.eq('status', status);
      if (data_inicio) query = query.gte('data', data_inicio);
      if (data_fim) query = query.lte('data', data_fim);
      
      const { data: activities, error } = await query.order('data', { ascending: false });
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Criar nova atividade
  async createActivity(req: Request, res: Response) {
    try {
      const activityData = req.body;
      
      const { data: activity, error } = await supabaseAdmin
        .from('manejo')
        .insert(activityData)
        .select()
        .single();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(201).json(activity);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Obter atividade específica
  async getActivity(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const { data: activity, error } = await supabaseAdmin
        .from('manejo')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        return res.status(404).json({ error: 'Atividade não encontrada' });
      }
      
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atualizar atividade
  async updateActivity(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const { data: activity, error } = await supabaseAdmin
        .from('manejo')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Deletar atividade
  async deleteActivity(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const { error } = await supabaseAdmin
        .from('manejo')
        .delete()
        .eq('id', id);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json({ message: 'Atividade removida com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atividades por data
  async getActivitiesByDate(req: Request, res: Response) {
    try {
      const { date } = req.params;
      
      const { data: activities, error } = await supabaseAdmin
        .from('manejo')
        .select('*')
        .eq('data', date);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Histórico de manejo de um animal
  async getAnimalHistory(req: Request, res: Response) {
    try {
      const { animalId } = req.params;
      
      const { data: activities, error } = await supabaseAdmin
        .from('manejo')
        .select('*')
        .contains('animais', [animalId])
        .order('data', { ascending: false });
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Estatísticas de manejo
  async getOverviewStats(req: Request, res: Response) {
    try {
      const { data: activities, error } = await supabaseAdmin
        .from('manejo')
        .select('tipo, status, custo, data');
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      const stats = {
        totalAtividades: activities?.length || 0,
        custoTotal: activities?.reduce((sum, activity) => sum + (activity.custo || 0), 0) || 0,
        pendentes: activities?.filter(a => a.status === 'PENDENTE').length || 0,
        concluidas: activities?.filter(a => a.status === 'CONCLUIDO').length || 0,
        atrasadas: activities?.filter(a => a.status === 'ATRASADO').length || 0,
        porTipo: activities?.reduce((acc, activity) => {
          acc[activity.tipo] = (acc[activity.tipo] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {},
        custoPorMes: activities?.reduce((acc, activity) => {
          const mes = new Date(activity.data).toISOString().substring(0, 7);
          acc[mes] = (acc[mes] || 0) + (activity.custo || 0);
          return acc;
        }, {} as Record<string, number>) || {}
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Agendar atividade
  async scheduleActivity(req: Request, res: Response) {
    try {
      const { tipo, animais, data, produto, responsavel } = req.body;
      
      const activityData = {
        tipo,
        animais,
        data,
        produto,
        responsavel,
        status: 'PENDENTE',
        custo: 0
      };
      
      const { data: activity, error } = await supabaseAdmin
        .from('manejo')
        .insert(activityData)
        .select()
        .single();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(201).json(activity);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}