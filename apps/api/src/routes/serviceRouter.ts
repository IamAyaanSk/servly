import getServiceHistory from '@/controllers/getServiceHistory.js'
import express, { Router } from 'express'
const router: Router = express.Router()

router.get('/', getServiceHistory)

export default router
