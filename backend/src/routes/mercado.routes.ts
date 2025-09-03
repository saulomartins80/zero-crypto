import { Router } from 'express';
import { MercadoController } from '../controllers/mercado.controller';

const router = Router();
const mercadoController = new MercadoController();

// Rotas de mercado
router.get('/precos', (req, res) => mercadoController.getPrecos(req, res));
router.get('/historico/:symbol', (req, res) => mercadoController.getHistorico(req, res));
router.get('/analise', (req, res) => mercadoController.getAnalise(req, res));
router.get('/previsao/:symbol', (req, res) => mercadoController.getPrevisao(req, res));

// Rotas específicas
router.get('/cepea/boi-gordo', (req, res) => mercadoController.getBoiGordo(req, res));
router.get('/cepea/bezerro', (req, res) => mercadoController.getBezerro(req, res));
router.get('/b3/indices', (req, res) => mercadoController.getIndicesB3(req, res));
router.get('/sazonalidade/:produto', (req, res) => mercadoController.getSazonalidade(req, res));

export default router;