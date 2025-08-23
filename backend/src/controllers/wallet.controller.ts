import { Request, Response } from 'express';
import supabaseAdmin from '../config/supabase';
import { blockchainService } from '../services/blockchain.service';

export class WalletController {
  // Obter saldo da carteira
  async getBalance(req: Request, res: Response) {
    try {
      const { address } = req.params;
      
      // Buscar saldo no Supabase
      const { data: wallet, error } = await supabaseAdmin
        .from('wallets')
        .select('balance')
        .eq('address', address)
        .single();

      if (error) {
        return res.status(404).json({ error: 'Carteira não encontrada' });
      }

      // Sincronizar com blockchain se necessário
      const onChainBalance = await blockchainService.getBalance(address);
      
      const dbBalance = (wallet as any)?.balance ?? 0;
      if (dbBalance !== onChainBalance) {
        // Atualizar saldo no Supabase
        await supabaseAdmin
          .from('wallets')
          .update({ balance: onChainBalance } as any)
          .eq('address', address);
      }

      res.json({
        address,
        balance: onChainBalance,
        currency: 'FINA'
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Criar nova carteira
  async createWallet(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      
      // Gerar nova carteira na blockchain
      const newWallet = await blockchainService.createWallet();
      
      // Salvar no Supabase
      const { data, error } = await supabaseAdmin
        .from('wallets')
        .insert({
          address: newWallet.address,
          user_id: userId,
          balance: 0,
          nonce: 0
        } as any)
        .select()
        .single();

      if (error) {
        return res.status(400).json({ error: 'Erro ao criar carteira' });
      }

      res.status(201).json({
        address: (data as any)?.address,
        privateKey: newWallet.privateKey, // CUIDADO: Apenas para desenvolvimento
        balance: 0
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Transferir tokens
  async transfer(req: Request, res: Response) {
    try {
      const { fromAddress, toAddress, amount, privateKey } = req.body;
      
      // Validar saldo
      const { data: fromWallet } = await supabaseAdmin
        .from('wallets')
        .select('balance')
        .eq('address', fromAddress)
        .single();

      const currentBalance = (fromWallet as any)?.balance ?? 0;
      if (!fromWallet || currentBalance < amount) {
        return res.status(400).json({ error: 'Saldo insuficiente' });
      }

      // Executar transação na blockchain
      const txHash = await blockchainService.transfer(
        fromAddress,
        toAddress,
        amount,
        privateKey
      );

      // Registrar transação no Supabase
      const { data: transaction } = await supabaseAdmin
        .from('transactions')
        .insert({
          hash: txHash,
          from_address: fromAddress,
          to_address: toAddress,
          amount: amount,
          fee: amount * 0.0025, // Taxa de 0.25%
          status: 'pending',
          type: 'transfer'
        } as any)
        .select()
        .single();

      res.json({
        transactionHash: txHash,
        status: 'pending',
        fee: amount * 0.0025
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro na transferência' });
    }
  }

  // Histórico de transações
  async getTransactions(req: Request, res: Response) {
    try {
      const { address } = req.params;
      const { page = 1, limit = 10 } = req.query;
      
      const { data: transactions, error } = await supabaseAdmin
        .from('transactions')
        .select('*')
        .or(`from_address.eq.${address},to_address.eq.${address}`)
        .order('created_at', { ascending: false })
        .range((Number(page) - 1) * Number(limit), Number(page) * Number(limit) - 1);

      if (error) {
        return res.status(400).json({ error: 'Erro ao buscar transações' });
      }

      res.json({
        transactions,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: transactions?.length || 0
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export const walletController = new WalletController();