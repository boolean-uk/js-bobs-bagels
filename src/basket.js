import inventory from '../inventory.js'

class Basket {
  constructor() {
    this.items = []
  }

  getItemFromBasket(whichItem) {
    const item = this.items.find((item) => item.sku === whichItem)
    return item
  }

  addToBasket(whichBagel) {
    const item = inventory.find((item) => item.sku === whichBagel)
    if (!item) {
      return
    }
    const existingItem = this.getItemFromBasket(whichBagel)
    if (existingItem) {
      existingItem.quantity++
      return existingItem
    }
    item.quantity = 1
    this.items.push(item)
    return item
  }

  removeFromBasket(sku) {
    const removeItem = this.items.find((item) => item.sku === sku)
    if (!removeItem) {
      return
    }
    const existingItem = this.getItemFromBasket(sku)
    if (existingItem) {
      existingItem.quantity--
      return existingItem
    }
    this.items.pop()
    return removeItem
  }
  
}

export default Basket
