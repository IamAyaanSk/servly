import getServiceHistory from '@/controllers/getServiceHistory.js'
import updateServiceHistory from '@/controllers/updateServiceHistory.js'
import express, { Router } from 'express'
const router: Router = express.Router()

router.get('/', getServiceHistory)
router.post('/:id', updateServiceHistory)

export default router
