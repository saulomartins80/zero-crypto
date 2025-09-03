import { Router } from 'express';
import { ManejoController } from '../controllers/manejo.controller';

const router = Router();
const manejoController = new ManejoController();

// Rotas de manejo
router.get('/', (req, res) => manejoController.getActivities(req, res));
router.post('/', (req, res) => manejoController.createActivity(req, res));
router.get('/:id', (req, res) => manejoController.getActivity(req, res));
router.put('/:id', (req, res) => manejoController.updateActivity(req, res));
router.delete('/:id', (req, res) => manejoController.deleteActivity(req, res));

// Rotas específicas
router.get('/calendar/:date', (req, res) => manejoController.getActivitiesByDate(req, res));
router.get('/animal/:animalId', (req, res) => manejoController.getAnimalHistory(req, res));
router.get('/stats/overview', (req, res) => manejoController.getOverviewStats(req, res));
router.post('/schedule', (req, res) => manejoController.scheduleActivity(req, res));

export default router;