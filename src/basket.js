const basket = []
let basketCapacity = 5

function addItem(obj) {
  if (basket.length < basketCapacity) {
    basket.push(obj)
    return true
  }
  return false
}

function removeItem(obj) {
  if (!basket.includes(obj)) {
    throw new Error('You cannot remove this item from basket')
  }
  basket.splice(basket.indexOf(obj), 1)
  return true
}

function isFull() {
  if (basket.length < basketCapacity) {
    return false
  }
  return true
}

function changeCapacity(newCapacity) {
  if (basketCapacity > newCapacity) {
    throw new Error('Capacity cannot be smaller than the old one')
  }
  basketCapacity = newCapacity
  return basketCapacity
}

function getPriceOfItem(obj) {
  return obj.price
}

function totalPrice() {
  let sum = 0
  basket.forEach((element) => {
    sum += element.price
  })
  return sum
}

module.exports = {
  addItem,
  removeItem,
  isFull,
  changeCapacity,
  getPriceOfItem,
  totalPrice
}
