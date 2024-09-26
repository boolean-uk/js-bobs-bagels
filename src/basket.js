const baskets = [
  { id: 1, capacity: 5, items: [] },
  { id: 2, capacity: 10, items: [] },
  { id: 3, capacity: 15, items: [] }
  // Add more baskets as needed
]

const increaseCapacity = (basketId, capacity) => {
  const basket = baskets.find((b) => b.id === Number(basketId))
  basket.capacity = capacity
  return basket
}

const getBaskets = () => {
  return baskets
}

const isBasketFull = (basketId) => {
  const basket = baskets.find((b) => b.id === Number(basketId))
  return basket.items.length >= basket.capacity
}

const createBasket = (capacity) => {
  const basket = {
    id: baskets.length + 1,
    capacity,
    items: []
  }
  baskets.push(basket)
  return basket
}

const getBasket = (basketId) => {
  return baskets.find((b) => b.id === Number(basketId))
}

const removeItem = (basketId, bagelId) => {
  const basket = baskets.find((b) => b.id === Number(basketId))

  const index = basket.items.findIndex((item) => item.id === Number(bagelId))

  if (index === -1) throw new Error('Bagel not found in the basket')

  basket.items.splice(index, 1)
}

const addItem = (basketId, bagelId) => {
  const basket = baskets.find((b) => b.id === Number(basketId))
  const bagel = bagels.find((b) => b.id === Number(bagelId))

  if (!basket || !bagel) throw new Error('Basket or bagel not found')

  if (basket.items.length >= basket.capacity) throw new Error('Basket is full')

  basket.items.push(bagel)
}

const getTotal = (basketId) => {
  const basket = baskets.find((b) => b.id === Number(basketId))
  return basket.items.reduce((acc, item) => acc + item.price, 0)
}

module.exports = {
  getBaskets,
  isBasketFull,
  createBasket,
  getBasket,
  removeItem,
  addItem,
  getTotal,
  increaseCapacity
}
