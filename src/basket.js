const Price = require('./price.js')

class Basket {
  // parameter the capacity for extension
  constructor () {
    this.basket = []
    this.capacity = 12
    this.price = new Price()
  }

  add (bagel, num = 1) {
    const bagelNameArr = Object.keys(this.price.list)
    // prevent adding bagels that are not in the list
    if (!bagelNameArr.includes(bagel)) return 'Please add bagels from the list'

    if (this.basket.length + num <= this.capacity) {
      for (let i = 0; i < num; i++) {
        this.basket.push(bagel)
      }
      return `Your Basket: ${this.basket} ${this.isFull()}`
    }
    return this.isFull()
  }

  remove (bagel) {
    if (this.basket.includes(bagel)) {
      this.basket.splice(this.basket.indexOf(bagel), 1)
      return `Your Basket: ${this.basket} ${this.isFull()}`
    }
    return 'You have not order this bagel'
  }

  isFull () {
    const bagelsLeft = this.capacity - this.basket.length
    if (this.basket.length === this.capacity) return 'Your basket is full'
    return `Continue to order; ${bagelsLeft} bagels left`
  }

  createBigBasket () {
    if (this.basket.length === this.capacity) this.capacity = 20
  }
}

module.exports = Basket
