const data = require('../inventory.json')

const { inventory } = data

const basket = []
let basketCapacity = 10

function add(sku) {
  if (basket.length >= basketCapacity) {
    return false
  }
  const findBagel = basket.find((bagel) => bagel.sku === sku)
  if (findBagel) {
    findBagel.quantity += 1
    return findBagel
  }

  const bagelAdd = inventory.find((bagel) => bagel.sku === sku)
  const copyBagel = { ...bagelAdd, quantity: 1 }
  basket.push(copyBagel)
  return copyBagel
}

function totalBagelPrice() {
  return basket.reduce((total, bagel) => {
    return total + Number(bagel.price) * bagel.quantity
  }, 0)
}

function remove(sku) {
  const findBagel = basket.find((bagel) => bagel.sku === sku)

  if (!findBagel) {
    return false
  }

  const index = basket.findIndex((bagel) => bagel.sku === sku)
  basket.splice(index, 1)
  return findBagel
}

function returnBasket() {
  return [...basket]
}

function basketReset() {
  basket.splice(0, basket.length)
}

function theCapacity(num) {
  basketCapacity = num
  basket.splice(0, basket.length)
}

module.exports = {
  add,
  basketReset,
  remove,
  returnBasket,
  totalBagelPrice,
  theCapacity
}
