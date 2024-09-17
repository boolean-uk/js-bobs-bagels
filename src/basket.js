const inventoryData = require('../inventory.json')
const inventory = JSON.parse(JSON.stringify(inventoryData.inventory))

// class Item{
//     constructor(name, price, variant) {
//         this.sku = inventory[0].sku
//         this.name = name
//         this.price = price
//         this.variant = variant
//     }
// }

class Basket {
  constructor() {
    this.items = []
    this.capacity = 5
  }

  addItem(sku) {
    const itemExists = this.items.find((item) => item.sku === sku)
    if (itemExists) {
      itemExists.quantity++
      return this.items
    }

    const newItem = inventory.find((item) => item.sku === sku)

    if (!newItem) return false

    newItem.quantity = 1
    this.items.push(newItem)
    return this.items
  }

  removeItem(sku) {
    const itemIndex = this.items.findIndex((item) => item.sku === sku)
    if (itemIndex === -1) {
      return false
    }

    this.items[itemIndex].quantity--

    if (itemIndex <= 0) {
      this.items.splice(itemIndex, 1)
    }
    return this.items
  }

  isBasketFull() {
    let count = 0

    this.items.forEach((item) => (count += item.quantity))

    return count === this.capacity
  }

  changeCapacity(newCapacity) {
    let itemCount
    this.items.forEach((item) => (itemCount += item.quantity))

    if (this.capacity < itemCount) return false

    this.capacity = 6
    return this.capacity
  }

  getItemPrice(sku) {
    const findItem = inventory.find((item) => item.sku === sku)
    return Number(findItem.price)
  }

  getTotalCost() {
    let totalCost = 0

    this.items.forEach((item) => {
      totalCost += Number(item.price) * item.quantity
    })

    return totalCost
  }

  getDiscount() {
    let discountFor6 = 0
    this.items.forEach(item => {
      if (item.sku === 'BGLO' || item.sku === 'BGLE') {
        var discountPrice = 2.49
      }
      discountFor6 = discountPrice + item.price * 0
    })

    return discountFor6
  }
}


module.exports = {
  Basket
}
