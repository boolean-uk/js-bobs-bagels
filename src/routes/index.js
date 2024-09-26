import express from 'express'
import { bagelRoutes } from './bagelRoutes.js'

const router = express.Router()
router.use('/api', bagelRoutes)

export default router
