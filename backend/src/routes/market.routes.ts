import { Router } from 'express';
import marketController from '../controllers/market.controller';

const router = Router();

router.get('/prices', marketController.prices);
router.get('/klines', marketController.klines);

export default router;
