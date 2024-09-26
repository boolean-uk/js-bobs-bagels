import {
  addToBasket as addToBasketService,
  removeFromBasket as removeFromBasketService,
  getBasketsData,
  getBasket as getBasketService
} from '../services/basketService.js'

import {
  findBasketById,
  createBasket as createBasketService
} from '../services/basketsData.js'

import { findBagelById as getBagelService } from '../services/bagelsData.js'

const getAll = (req, res) => {
  const bagels = getAllBagelsService()
  res.json(bagels)
}

const addItemToBasket = (req, res) => {
  const { bagelId, basketId } = req.params
  const result = addToBasketService(basketId, bagelId)
  res.status(result.code).json({
    status: result.status,
    message: result.message
  })
}

const removeItemFromBasket = (req, res) => {
  const { bagelId, basketId } = req.params
  const result = removeFromBasketService(basketId, bagelId)
  res.status(result.code).json({
    status: result.status,
    message: result.message
  })
}
const getBaskets = (req, res) => {
  const baskets = getBasketsData()
  res.json(baskets)
}

const getbasket = (req, res) => {
  const { basketId } = req.params
  const basket = getBasketService(basketId)
  if (!basket) {
    res.status(404).json({
      status: 'error',
      message: 'Basket not found'
    })
    return
  }

  res.json(basket)
}

const getBagel = (req, res) => {
  const { bagelId } = req.params
  const bagel = getBagelService(bagelId)
  res.json(bagel)
}

const createBasket = (req, res) => {
  const { capacity } = req.body
  if (!capacity || isNaN(capacity) || capacity <= 0) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid capacity value. Capacity must be a positive number.'
    })
    return
  }

  const newBasket = createBasketService(capacity)
  res.status(201).json({
    status: 'success',
    message: 'New basket created successfully',
    data: newBasket
  })
}

export {
  getAll,
  addItemToBasket,
  removeItemFromBasket,
  getBaskets,
  getbasket,
  getBagel,
  createBasket
}
