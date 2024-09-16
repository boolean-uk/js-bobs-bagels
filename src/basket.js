require('./../inventory.json')

class Basket {
  constructor(basket = [], capacity = 3) {
    this.basket = basket
    this.capacity = capacity
  }

  addToBasket(bagel) {
    // console.log('LENGTH: ', this.basket.length)
    if (this.basket.length === this.capacity) {
      return 'full'
    } else {
      this.basket.push(bagel)
    }

    if (this.basket.includes(bagel)) {
      return true
    } else if (!this.basket.includes(bagel)) {
      return false
    }
  }

  removeFromBasket(sku) {
    let isTrue = null
    const filteredList = this.basket.filter(
      (bagelItem) => bagelItem.sku !== sku
    )
    const findItem = this.basket.findIndex((bagel) => bagel.sku === sku)
    if (findItem === -1) {
      // Item doesn't exist
      isTrue = false
    } else {
      // Item exists
      this.basket = filteredList
      isTrue = true
    }
    return isTrue
  }

  increaseCapacity(newCapacity) {
    this.capacity += newCapacity
    return this.capacity
  }
}

module.exports = Basket
