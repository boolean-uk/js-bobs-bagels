import { basketsData, findBasketById, createBasket } from './basketsData.js'
import { bagelsData, findBagelById } from './bagelsData.js'
import { throwNotFoundError, throwBasketFullError } from './errorHandling.js'

const increaseCapacity = (basketId, capacity) => {
  const basket = findBasketById(basketId)
  basket.capacity = capacity
  return basket
}

const getBasketsData = () => {
  return basketsData
}

const isBasketFull = (basketId) => {
  const basket = findBasketById(basketId)
  return basket.items.length >= basket.capacity
}

const getBasket = (basketId) => {
  const basket = findBasketById(basketId)

  if (!basket) {
    throwNotFoundError('Basket not found')
  }

  const total = getTotal(basketId)

  return {
    code: 200,
    status: 'success',
    message: 'Basket details and total fetched successfully',
    data: {
      basket,
      total
    }
  }
}

const removeFromBasket = (basketId, bagelId) => {
  const basket = findBasketById(basketId)
  const index = basket.items.findIndex((item) => item.sku === bagelId)

  if (index === -1) {
    throwNotFoundError('Bagel not found in the basket')
  }

  basket.items.splice(index, 1)

  return {
    code: 200,
    status: 'success',
    message: 'Bagel removed from the basket successfully'
  }
}

const addToBasket = (basketId, bagelId) => {
  const basket = findBasketById(basketId)
  const bagel = findBagelById(bagelId)

  if (!basket) {
    throwNotFoundError('Basket not found')
  }

  if (!bagel) {
    throwNotFoundError('Bagel not found')
  }

  if (isBasketFull(basketId)) {
    throwBasketFullError()
  }

  basket.items.push(bagel)

  return {
    code: 200,
    status: 'success',
    message: 'Bagel added to the basket successfully'
  }
}

const getTotal = (basketId) => {
  const basket = findBasketById(basketId)

  return basket.items
    .reduce((acc, item) => acc + parseFloat(item.price), 0)
    .toFixed(2)
}

const getBasketSize = (basketId) => {
  const basket = findBasketById(basketId)
  return basket.items.length
}

const getBasketCapacity = (basketId) => {
  const basket = findBasketById(basketId)
  return basket.capacity
}

export {
  increaseCapacity,
  getBasketsData,
  isBasketFull,
  createBasket,
  getBasket,
  removeFromBasket,
  addToBasket,
  getTotal,
  getBasketSize,
  getBasketCapacity
}
