import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

export class RebanhoController {
  // Listar todos os animais
  async getAnimals(req: Request, res: Response) {
    try {
      const { categoria, lote, status } = req.query;
      
      let query = supabaseAdmin.from('animais').select('*');
      
      if (categoria) query = query.eq('categoria', categoria);
      if (lote) query = query.eq('lote', lote);
      if (status) query = query.eq('status', status);
      
      const { data: animals, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(animals);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Criar novo animal
  async createAnimal(req: Request, res: Response) {
    try {
      const animalData = req.body;
      
      const { data: animal, error } = await supabaseAdmin
        .from('animais')
        .insert(animalData)
        .select()
        .single();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(201).json(animal);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Obter animal específico
  async getAnimal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const { data: animal, error } = await supabaseAdmin
        .from('animais')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        return res.status(404).json({ error: 'Animal não encontrado' });
      }
      
      res.json(animal);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atualizar animal
  async updateAnimal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const { data: animal, error } = await supabaseAdmin
        .from('animais')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(animal);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Deletar animal
  async deleteAnimal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const { error } = await supabaseAdmin
        .from('animais')
        .delete()
        .eq('id', id);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json({ message: 'Animal removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Estatísticas gerais
  async getOverviewStats(req: Request, res: Response) {
    try {
      const { data: animals, error } = await supabaseAdmin
        .from('animais')
        .select('categoria, peso, valor_compra, custo_acumulado, status');
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      const stats = {
        totalAnimais: animals?.length || 0,
        pesoTotal: animals?.reduce((sum, animal) => sum + (animal.peso || 0), 0) || 0,
        valorInvestido: animals?.reduce((sum, animal) => sum + (animal.valor_compra || 0), 0) || 0,
        custoAcumulado: animals?.reduce((sum, animal) => sum + (animal.custo_acumulado || 0), 0) || 0,
        pesoMedio: animals?.length ? (animals.reduce((sum, animal) => sum + (animal.peso || 0), 0) / animals.length) : 0,
        porCategoria: animals?.reduce((acc, animal) => {
          acc[animal.categoria] = (acc[animal.categoria] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {},
        porStatus: animals?.reduce((acc, animal) => {
          acc[animal.status] = (acc[animal.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {}
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Animais por categoria
  async getAnimalsByCategory(req: Request, res: Response) {
    try {
      const { categoria } = req.params;
      
      const { data: animals, error } = await supabaseAdmin
        .from('animais')
        .select('*')
        .eq('categoria', categoria.toUpperCase())
        .eq('status', 'ATIVO');
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(animals);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Animais por lote
  async getAnimalsByLote(req: Request, res: Response) {
    try {
      const { lote } = req.params;
      
      const { data: animals, error } = await supabaseAdmin
        .from('animais')
        .select('*')
        .eq('lote', lote)
        .eq('status', 'ATIVO');
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      res.json(animals);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}