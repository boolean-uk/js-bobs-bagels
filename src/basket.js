const Inventory = require('../inventory.json').inventory

class basket {
  constructor(limit) {
    this.limit = limit || 4
    this.basket = []
  }

  increaseBasketLimit(amount) {
    return (this.limit = this.limit + amount)
  }

  addBagel(sku) {
    const item = Inventory.find((bagel) => bagel.sku === sku)
    if (this.basket.length >= this.limit) return 'Basket limit reached.'
    else {
      this.basket.push(item)
      return this.basket
    }
  }

  removeBagel(sku) {
    const newList = this.basket.filter((bagel) => bagel.sku !== sku)
    const item = this.basket.findIndex((bagel) => bagel.sku === sku)
    if (item === -1) return 'This is not in your basket.'
    else {
      this.basket = newList
      return newList
    }
  }

  bagelPrice(sku) {
    return this.basket.find((bagel) => bagel.sku === sku).price
  }

  total() {
    let sum = 0
    this.basket.forEach((bagel) => {
      sum = sum + Number(bagel.price)
    })
    return sum.toString()
  }
}

module.exports = { basket }
