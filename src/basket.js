const { inventory } = require('../inventory.json')

class Basket {
  constructor(capacity) {
    this.shoppingList = []
    this.capacity = capacity
  }

  add(sku, amount = 1) {
    if (this.capacity > this.shoppingList.length + amount) {
      const itemToAdd = inventory.find((item) => item.sku === sku)
      if (itemToAdd) {
        const inShoppingList = this.shoppingList.find(
          (item) => item.sku === sku
        )
        if (inShoppingList) {
          inShoppingList.quantity += amount
        } else this.shoppingList.push({ ...itemToAdd, quantity: amount })
      }
    }
    return this.shoppingList
  }

  remove(sku) {
    const itemToRemove = this.shoppingList.find((item) => item.sku === sku)
    if (!itemToRemove) return 'item doesnt exist in basket'
    else if (itemToRemove.quantity > 1) itemToRemove.quantity--
    else {
      this.shoppingList.splice(this.shoppingList.indexOf(itemToRemove), 1)
    }
    return this.shoppingList
  }

  changeCapacity(newCapacity) {
    if (newCapacity > this.shoppingList.length) this.capacity = newCapacity
    else return 'cannot change capacity'
    return this.capacity
  }

  checkPrice(sku) {
    const item = inventory.find((item) => item.sku === sku)
    if (item) return item.price
    else return 'item not found in inv'
  }

  totalPrice() {
    let totalprice = 0
    this.shoppingList.forEach((element) => {
      totalprice += element.price * element.quantity
    })
    return totalprice.toFixed(2)
  }
}

module.exports = { Basket }
