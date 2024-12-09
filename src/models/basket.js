const { validateBagel } = require('./bagel')
const { v4 } = require('uuid')
const UUIDv4 = v4

class Basket {
  constructor(capacity = 10) {
    if (capacity <= 0) throw new Error('Capacity must be a positive number')
    
    this.uuid = UUIDv4()
    this.capacity = capacity
    this.bagels = []
  }

  addBagel(bagel) {
    validateBagel(bagel)
    if (this.bagelAmount() === this.capacity) {
      throw new Error('Cannot add bagel - basket is full')
    }
    this.bagels.push(bagel)
  }

  removeBagel(bagelUUID) {
    const filteredBagels = this.bagels.filter((b) => b.uuid !== bagelUUID)
    if (filteredBagels.length === this.bagels.length) {
      throw new Error(`Cannot remove ${bagel} - it's not in the basket`)
    }
    this.bagels = filteredBagels
  }

  bagelAmount() {
    return this.bagels.length
  }

  totalCost() {
    return this.bagels
      .map((b) => b.price)
      .reduce((p1, p2) => p1 + p2, 0)
  }
}

module.exports = { Basket }
