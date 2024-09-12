class BagelBasket {
  constructor(capacity = 7) {
    this.capacity = capacity
    this.items = []
  }

  addItem(item) {
    if (this.items.length < this.capacity) {
      this.items.push(item)
    } else {
      console.log('Cannot add item, basket is full')
      return 'Cannot add item, basket is full'
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

  findBagel(sku) {
    return (
      this.items.find((item) => item.sku === sku) ||
      "Item doesn't exist in basket"
    )
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + Number(item.price), 0)
  }
}

module.exports = { BagelBasket }
