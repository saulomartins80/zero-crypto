import { Router } from 'express'
import { provisionController } from '../controllers/provision.controller'

const router = Router()

router.post('/provision', (req, res) => provisionController.provision(req, res))

export default router
