const inventory = require('./inventory.js')

class Basket {
  constructor(basket = [], capacity = 5, total = 0, offers = 0) {
    this.basket = basket
    this.capacity = capacity
    this.total = total
    this.offers = offers
  }

  addToBasket(sku) {
    const item = inventory.find((obj) => obj.sku === sku)
    if (this.basket.length < this.capacity) {
      this.basket.push(item)
      return this.basket
    } else {
      return 'reached capacity, would you like to increase capacity?'
    }
  }

  removeFromBasket(sku) {
    const filterdList = this.basket.filter((obj) => obj.sku !== sku)
    const item = this.basket.findIndex((obj) => obj.sku === sku)
    if (item === -1) {
      return 'item does not exist in your basket'
    } else {
      this.basket = filterdList
      return filterdList
    }
  }

  increaseCapacity() {
    return this.capacity + 3
  }

  viewPrice(sku) {
    const item = this.basket.find((obj) => obj.sku === sku)
    return item.price
  }

  totalCost() {
    let total = 0
    // const COFfilter = this.basket.filter(
    //   (obj) => obj.sku === 'COF' && obj.sku === 'BGLP'
    // )
    this.basket.forEach((obj) => {
      const price = obj.price
      const priceAsNum = +price
      total = total + priceAsNum
    })
    this.total = total
    this.applyOffers()
    this.total = this.total.toFixed(2)
    console.log("this is the expected", this.total)
    return this.total
  }

  applyOffers() {
    const BGLO = []
    const BGLP = []
    const BGLE = []
    const COF = []
    this.basket.forEach((obj) => {
      if (obj.sku === 'BGLO') {
        BGLO.push(obj)
        if (BGLO.length % 6 === 0) {
          this.total = this.total - (obj.price * 6 - 2.49)
        }
      }
      if (obj.sku === 'BGLP') {
        BGLP.push(obj)
        if (BGLP.length % 12 === 0) {
          this.total = this.total - (obj.price * 12 - 3.99)
        }
      }
      if (obj.sku === 'BGLE') {
        BGLE.push(obj)
        if (BGLE.length % 6 === 0) {
          this.total = this.total - (obj.price * 6 - 2.49)
        }
      }
      if (obj.sku === 'COF') {
        console.log("1")
        COF.push(obj)
      }

    })
    if (COF.length <= BGLP.length) {
      const Csaving = COF.length * (0.99 + 0.39 - 1.25)
      this.total = this.total - Csaving
    } else {
      const Csaving = BGLP.length * (0.99 + 0.39 - 1.25)
      this.total = this.total - Csaving
    }
    return this.offers
  }
}

module.exports = Basket
