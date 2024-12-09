const json = require('../inventory.json')
const inventory = json.inventory
class Basket {
  constructor(capacity = 5) {
    this.items = []
    this.capacity = capacity
    this.productsQuantity = 0
  }

  add(item, givenQuantity = 1) {
    if (givenQuantity + this.productsQuantity <= this.capacity) {
      const ifExistInInventory = inventory.find((obj) => {
        if (
          obj.sku === item.sku &&
          obj.price === item.price &&
          obj.variant === item.variant &&
          obj.name === item.name
        )
          return true
        else return false
      })

      if (ifExistInInventory) {
        const existedItem = this.items.find((obj) => {
          return obj.sku === item.sku
        })

        if (typeof existedItem === 'undefined') {
          this.items.push({
            sku: item.sku,
            item: item,
            quantity: givenQuantity
          })
          this.productsQuantity += givenQuantity
          return true
        } else {
          existedItem.quantity += givenQuantity
          this.productsQuantity += givenQuantity
          return true
        }
      }
      return false
    }

    return false
  }

  remove(item) {
    const existedItem = this.items.find((obj) => {
      return obj.sku === item.sku
    })

    if (typeof existedItem !== 'undefined') {
      this.items.splice(this.items.indexOf(existedItem), 1)
      this.productsQuantity--
      return true
    } else {
      return false
    }
  }

  changeCapacity(newCapacity) {
    if (newCapacity > this.capacity) this.capacity = newCapacity
  }

  totalCost() {
    let total = 0
    for (const position of this.items) {
      if (
        (position.sku === 'BGLO' || position.sku === 'BGLE') &&
        position.quantity >= 6
      ) {
        const quantityOfSpecialPrice = position.quantity / 6
        const rest = position.quantity % 6
        total += quantityOfSpecialPrice * 2.49
        total += rest * position.item.price
      } else if (position.sku === 'BGLP' && position.quantity >= 12) {
        const quantityOfSpecialPrice = position.quantity / 12
        const rest = position.quantity % 12
        total += quantityOfSpecialPrice * 3.99
        total += rest * position.item.price
      } else total += position.item.price * position.quantity
    }
    return total.toFixed(2)
  }

  checkPrice(item) {
    const objectFromInventory = inventory.find((obj) => {
      if (
        obj.sku === item.sku &&
        obj.price === item.price &&
        obj.variant === item.variant &&
        obj.name === item.name
      )
        return obj
      else return undefined
    })

    if (typeof objectFromInventory !== 'undefined') {
      return objectFromInventory.price
    } else return 0
  }
}

module.exports = {
  Basket
}
