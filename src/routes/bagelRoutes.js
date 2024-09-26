import { Router } from 'express'
import {
  getAll,
  addItemToBasket,
  removeItemFromBasket,
  getBaskets,
  getbasket,
  getBagel,
  createBasket
} from '../controllers/bagelController.js'

const router = Router()

router.get('/bagels', getAll)
router.get('/bagels/:bagelId', getBagel)

router.post('/basket/:basketId/bagels/:bagelId', addItemToBasket)
router.delete('/basket/:basketId/bagels/:bagelId', removeItemFromBasket)

router.get('/basket', getBaskets)
router.post('/basket', createBasket)
router.get('/basket/:basketId', getbasket)

export { router as bagelRoutes }
