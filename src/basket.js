class ShoppingBasket {
  constructor(capacity = 7) {
    this.capacity = capacity
    this.items = []
  }
  addItem(item) {
    if (this.isBasketFull()) {
      console.log('Cannot add item, basket is full')
    } else {
      this.items.push(item)
    }
  }
  removeItem(itemToRemove) {
    const index = this.items.findIndex(
      (item) => item.name === itemToRemove.name
    )
    if (index !== -1) {
      this.items.splice(index, 1)
    } else {
      return 'Item not found'
    }
  }
  getItemPrice(item) {
    return Number(item.price)
  }

  findItem(sku) {
    return (
      this.items.find((item) => item.sku === sku) ||
      "Item doesn't exist in basket"
    )
  }
  getTotalPrice() {
    return this.items.reduce((total, item) => total + Number(item.price), 0)
  }
  containsItem(item) {
    return this.items.includes(item)
  }
  isBasketFull() {
    return this.items.length >= this.capacity
  }

  getItemsCount() {
    return this.items.length
  }

  getItemsCountByName(name) {
    return this.items.filter((item) => item.name === name).length
  }
}

module.exports = { ShoppingBasket }
