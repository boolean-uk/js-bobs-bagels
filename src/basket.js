const importJsonInventory = require('../inventory.json')
const inventory = importJsonInventory.inventory

class Basket {
  constructor(basketQuantity = 10) {
    this.basketQuantity = basketQuantity
    this.items = []
    this.inventory = JSON.parse(JSON.stringify(inventory))
  }

  addItem(sku) {
    const item = this.inventory.find((item) => item.sku === sku)
    if (item && this.items.length < this.basketQuantity) {
      if (this.items.includes(item)) {
        item.quantity++
        return item
      }
      item.quantity = 1
      this.items.push(item)
      return item
    }
    return false
  }

  deleteItem(sku) {
    const item = this.items.find((item) => item.sku === sku)
    if (item) {
      const itemIndex = this.items.indexOf(item)
      this.items.splice(itemIndex, 1)
      return item
    }
    return false
  }

  editItem(sku, obj) {
    const item = this.items.find((item) => item.sku === sku)
    const objKey = Object.keys(obj)[0]
    const objValue = Object.values(obj)[0]
    if (item) {
      const itemIndex = this.items.indexOf(item)
      this.items[itemIndex][objKey] = objValue
      if (this.items[itemIndex].quantity === 0) {
        return this.deleteItem(item.sku)
      }
      return this.items[itemIndex]
    }
    return false
  }

  isFull() {
    const quantityInBasket = this.items.reduce(
      (runningTotal, item) => item.quantity + runningTotal,
      0
    )
    const isBasketFull = quantityInBasket === this.basketQuantity
    if (isBasketFull) {
      return true
    }
    return false
  }

  searchBasket(sku) {
    const item = this.items.find((item) => item.sku === sku)
    if (item) {
      return item
    }
    return false
  }

  getTotalPrice() {
    let totalPrice = '0'
    if (this.items.find((item) => item.noOfDeals)) {
      const dealItems = this.items.filter((item) => item.noOfDeals)
      totalPrice = dealItems.reduce(
        (runningTotal, item) => item.dealPrice * item.noOfDeals + runningTotal,
        0
      )
    }

    totalPrice =
      totalPrice +
      this.items.reduce(
        (runningTotal, item) => item.price * item.quantity + runningTotal,
        0
      )

    return totalPrice
  }

  checkForDeal() {
    let hasDeal = false

    const deals = {
      BGLE: {
        quantity: 6,
        newPrice: '2.49'
      },
      BGLO: {
        quantity: 6,
        newPrice: '2.49'
      },
      BGLP: {
        quantity: 12,
        newPrice: '3.99'
      }
    }

    this.items.forEach((item) => {
      const noOfDeals = Math.floor(item.quantity / deals[item.sku].quantity)
      const itemRemainder = item.quantity % deals[item.sku].quantity
      if (item.quantity >= deals[item.sku].quantity) {
        hasDeal = true
        item.dealPrice = deals[item.sku].newPrice
        item.noOfDeals = noOfDeals
        item.quantity = itemRemainder
      }
    })
    return hasDeal
  }

  seeCurrentOrder() {
    return {}
  }
}

const testBasket = new Basket()
// for (let i = 0; i < 16; i++) {
//   testBasket.addItem('BGLE')
// }
// for (let i = 0; i < 16; i++) {
//   testBasket.addItem('BGLO')
// }
// testBasket.checkForDeal()
// console.log(testBasket.getTotalPrice())
// console.log(testBasket.items)

module.exports = Basket
