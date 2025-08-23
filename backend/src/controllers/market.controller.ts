import { Request, Response } from 'express';
import { fetchPrices, fetchKlines } from '../services/market.service';

class MarketController {
  async prices(req: Request, res: Response) {
    try {
      const symbolsParam = (req.query.symbols as string) || 'BTCUSDT,ETHUSDT';
      const symbols = symbolsParam.split(',').filter(Boolean);
      const data = await fetchPrices(symbols);
      return res.json(data);
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to fetch prices' });
    }
  }

  async klines(req: Request, res: Response) {
    try {
      const symbol = (req.query.symbol as string) || 'BTCUSDT';
      const interval = (req.query.interval as string) || '1h';
      const limit = Number(req.query.limit || 100);
      const data = await fetchKlines(symbol, interval, limit);
      return res.json(data);
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to fetch klines' });
    }
  }
}

export default new MarketController();
