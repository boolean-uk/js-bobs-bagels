const fs = require('fs')

class Item {
  constructor(itemData) {
    this.sku = itemData.sku
    this.price = itemData.price
    this.name = itemData.name
    this.variant = itemData.variant || ''
    this.quantity = 1
    this.fillings = itemData.fillings || []
  }
}

class Basket {
  constructor(capacity = 10) {
    this.items = []
    this.capacity = capacity
    this.inventory = this.loadInventoryData()
  }

  loadInventoryData() {
    try {
      const data = fs.readFileSync('./inventory.json')
      return JSON.parse(data).inventory
    } catch (error) {
      console.error('Error reading inventory data:', error.message)
      return []
    }
  }

  addItem(sku, quantity = 1) {
    console.log('Current basket capacity in addItem:', this.capacity) // checking

    if (this.items.length >= this.capacity) {
      console.warn('Basket is full. Cannot add more items.')
      return false
    }

    const itemData = this.inventory.find((item) => item.sku === sku)

    if (itemData) {
      const existingItem = this.items.find((item) => item.sku === sku)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        const newItem = new Item(itemData)
        newItem.quantity = quantity
        this.items.push(newItem)
      }
      return true
    } else {
      console.warn(`Item with SKU ${sku} not found in inventory.`)
      return false
    }
  }

  removeItem(sku, quantity = 1) {
    const itemIndex = this.items.findIndex((item) => item.sku === sku)

    if (itemIndex === -1) {
      return false
    }

    this.items[itemIndex].quantity -= quantity

    if (this.items[itemIndex].quantity <= 0) {
      this.items.splice(itemIndex, 1)
    }

    return true
  }
  
  displayItemPrice(sku) {
    if (typeof sku !== 'string' || sku.length < 1) return 'sku required'

    const item = this.findInventoryItem(sku)

    if (item === 'item not found') return 'item not found'

    return Number(item.price)
  }

  displayBasketSum() {
    return this._list.reduce((a, b) => a + b.price * b.quantity, 0)
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  setBasketCapacity(newCapacity) {
    this.capacity = newCapacity
    console.log(`Updated basket capacity: ${this.capacity}`)
  }
}

module.exports = { Basket, Item }
