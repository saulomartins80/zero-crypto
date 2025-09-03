import { Router } from 'express';
import { ProducaoController } from '../controllers/producao.controller';

const router = Router();
const producaoController = new ProducaoController();

// Rotas de produção
router.get('/', (req, res) => producaoController.getProducaoData(req, res));
router.post('/', (req, res) => producaoController.createProducaoEvent(req, res));
router.get('/:id', (req, res) => producaoController.getProducaoEvent(req, res));
router.put('/:id', (req, res) => producaoController.updateProducaoEvent(req, res));
router.delete('/:id', (req, res) => producaoController.deleteProducaoEvent(req, res));

// Rotas de análise
router.get('/stats/overview', (req, res) => producaoController.getOverviewStats(req, res));
router.get('/stats/gmd', (req, res) => producaoController.getGMDStats(req, res));
router.get('/stats/custos', (req, res) => producaoController.getCostAnalysis(req, res));
router.get('/stats/margem', (req, res) => producaoController.getMarginAnalysis(req, res));

export default router;