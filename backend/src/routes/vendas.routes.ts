import { Router } from 'express';
import { VendasController } from '../controllers/vendas.controller';

const router = Router();
const vendasController = new VendasController();

// Rotas de vendas
router.get('/', (req, res) => vendasController.getVendas(req, res));
router.post('/', (req, res) => vendasController.createVenda(req, res));
router.get('/:id', (req, res) => vendasController.getVenda(req, res));
router.put('/:id', (req, res) => vendasController.updateVenda(req, res));
router.delete('/:id', (req, res) => vendasController.deleteVenda(req, res));

// Rotas específicas
router.get('/animais/prontos', (req, res) => vendasController.getAnimaisProntos(req, res));
router.post('/simular', (req, res) => vendasController.simularVenda(req, res));
router.get('/stats/overview', (req, res) => vendasController.getOverviewStats(req, res));
router.post('/frigorifico/cotacao', (req, res) => vendasController.getCotacaoFrigorifico(req, res));

export default router;