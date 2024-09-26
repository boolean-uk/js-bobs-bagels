import basketsJSON from '../data/baskets.json' assert { type: 'json' }

const basketsData = basketsJSON.baskets

const findBasketById = (basketId) => {
  return basketsData.find((basket) => basket.id === Number(basketId))
}

const createBasket = (capacity) => {
  const newBasket = {
    id: basketsData.length + 1,
    capacity,
    items: []
  }
  basketsData.push(newBasket)
  return newBasket
}

export { basketsData, findBasketById, createBasket }
