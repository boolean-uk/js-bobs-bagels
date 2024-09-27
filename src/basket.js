const { inventory } = require('./inventory.js')
// console.log(inventory)
class Basket {
  constructor(capacity = 5) {
    this.basket = []
    this.capacity = capacity
  }

  addBagel(sku) {
    const addToBasket = inventory.find((bagel) => bagel.sku === sku)
    if (this.basket.length >= this.capacity) {
      return 'basket capacity is full'
    } else {
      this.basket.push(addToBasket)
      return this.basket
    }
  }

  removeBagel(sku) {
    const removed = this.basket.filter((bagel) => bagel.sku !== sku)
    const newRemoving = this.basket.findIndex((bagel) => bagel.sku === sku)
    if (newRemoving === -1) {
      return 'this bagel does not exist'
    } else {
      this.basket = removed
      return removed
    }
  }

  newBasketCapacity(quantity) {
    return (this.capacity = this.capacity + quantity)
  }

  bagelPrice(sku) {
    return this.basket.find((bagel) => bagel.sku === sku).price
  }

  totalBasket() {
    let sum = 0
    this.basket.forEach((bagel) => (sum = sum + Number(bagel.price)))
    return sum.toString()
  }
}
module.exports = {
  Basket
}
