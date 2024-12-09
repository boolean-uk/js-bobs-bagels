const inventory = require('../inventory.json').inventory

class Basket {
  constructor(size = 12) {
    this.basket = []
    this.receipt = ''
    this.size = size
    this.total = 0
  }

  inBasket() {
    let res = 0
    this.basket.forEach((item) => (res += item.quantity))
    return res
  }

  displayPrice(sku) {
    const item = inventory.find((item) => item.sku === sku)
    return item.price
  }

  addItem(sku) {
    if (this.inBasket() >= this.size) return 'Basket is full'

    const itemToAdd = inventory.find((item) => item.sku === sku)

    if (itemToAdd && this.basket.find((item) => item.sku === sku)) {
      this.basket.find((item) => item.sku === sku).quantity++
    } else if (itemToAdd) {
      itemToAdd.quantity = 1
      this.basket.push(itemToAdd)
    } else {
      return 'invalid selection'
    }
  }

  addMultipleItems(sku, amount) {
    if (this.size < this.inBasket() + amount) {
      return 'Not enough space in Basket'
    }

    const itemToAdd = inventory.find((item) => item.sku === sku)

    if (itemToAdd && this.basket.find((item) => item.sku === sku)) {
      this.basket.find((item) => item.sku === sku).quantity += amount
    } else if (itemToAdd) {
      itemToAdd.quantity = amount
      this.basket.push(itemToAdd)
    } else {
      return 'invalid selection'
    }
  }

  removeItem(sku) {
    const itemToRemove = this.basket.find((item) => item.sku === sku)

    if (itemToRemove !== undefined) {
      if (itemToRemove.quantity > 1) {
        itemToRemove.quantity--
      } else if (itemToRemove.quantity === 1) {
        const removeIndex = this.basket.findIndex((item) => item.sku === sku)
        this.basket.splice(removeIndex, 1)
      }
    } else {
      return 'Not in Basket'
    }
  }

  getTotal() {
    this.total = 0
    this.basket.forEach((item) => {
      if (item.sku === 'BGLP' && item.quantity >= 12) {
        const amount = Math.floor(item.quantity / 12)
        this.total += 3.99 * amount
        this.total += item.price * (item.quantity - 12 * amount)
      } else if (
        (item.sku === 'BGLO' && item.quantity >= 6) ||
        (item.sku === 'BGLE' && item.quantity >= 6)
      ) {
        const amount = Math.floor(item.quantity / 6)
        this.total += 2.49 * amount
        this.total += item.price * (item.quantity - 6 * amount)
      } else if (
        item.sku === 'COF' &&
        this.basket.find((item) => item.sku === 'BGLP')
      ) {
        const bglp = this.basket.find((item) => item.sku === 'BGLP')
        this.total += item.price * item.quantity
        if (bglp.quantity % 12 !== 0) {
          const amount = Math.floor(bglp.quantity / 12)
          const left = bglp.quantity - amount * 12
          if (left > item.quantity) {
            this.total -= 0.13 * item.quantity
          } else {
            this.total -= 0.13 * left
          }
        }
      } else {
        this.total += item.price * item.quantity
      }
    })

    return this.total.toFixed(2).toString()
  }
}

module.exports = {
  Basket
}
