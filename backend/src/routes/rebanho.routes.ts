import { Router } from 'express';
import { RebanhoController } from '../controllers/rebanho.controller';

const router = Router();
const rebanhoController = new RebanhoController();

// Rotas do rebanho
router.get('/', (req, res) => rebanhoController.getAnimals(req, res));
router.post('/', (req, res) => rebanhoController.createAnimal(req, res));
router.get('/:id', (req, res) => rebanhoController.getAnimal(req, res));
router.put('/:id', (req, res) => rebanhoController.updateAnimal(req, res));
router.delete('/:id', (req, res) => rebanhoController.deleteAnimal(req, res));

// Rotas específicas
router.get('/stats/overview', (req, res) => rebanhoController.getOverviewStats(req, res));
router.get('/category/:categoria', (req, res) => rebanhoController.getAnimalsByCategory(req, res));
router.get('/lote/:lote', (req, res) => rebanhoController.getAnimalsByLote(req, res));

export default router;