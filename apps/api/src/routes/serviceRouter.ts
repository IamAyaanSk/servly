import getServiceHistory from '@/controllers/getServiceHistory'
import updateServiceHistory from '@/controllers/updateServiceHistory'
import express, { Router } from 'express'
const router: Router = express.Router()

router.get('/', getServiceHistory)
router.post('/:id', updateServiceHistory)

export default router
