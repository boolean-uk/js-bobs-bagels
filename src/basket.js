import inventory from '../inventory.js'

class Basket {
  constructor() {
    this._list = []
    this._inventory = inventory
    this.capacity = 12
  }

  get list() {
    return this._list
  }

  get inventory() {
    return this._inventory
  }

  add(sku) {
    const basketQuantity = this.checkBasketQuantity()

    if (basketQuantity >= this.capacity) return 'basket full'

    if (
      typeof sku !== 'string' ||
      (typeof sku === 'string' && sku.length === 0)
    ) {
      return 'item sku required'
    }

    const basketItem = this.findBasketItem(sku)

    if (typeof basketItem === 'object') {
      basketItem.quantity++
      return 'item quantity increased'
    }

    const inventoryItem = this.findInventoryItem(sku)
    if (inventoryItem !== 'item not found') {
      inventoryItem.quantity = 1
      this.list.push(inventoryItem)
      return 'item added'
    }

    return 'item sku not found'
  }

  remove(sku) {
    if (
      typeof sku !== 'string' ||
      (typeof sku === 'string' && sku.length === 0)
    ) {
      return 'item sku required'
    }

    const indexToRemove = this._list.findIndex((item) => item.sku === sku)

    if (indexToRemove === -1) {
      const stockedItem = this.findInventoryItem(sku)

      if (stockedItem === 'item not found') return 'item is not stocked'
      return 'item not found'
    }

    this._list.splice(indexToRemove, 1)

    return 'item removed'
  }

  findInventoryItem(sku) {
    const foundItem = this.findSku(this.inventory, sku)

    if (typeof foundItem === 'object') return foundItem
    return 'item not found'
  }

  findBasketItem(sku) {
    const foundItem = this.findSku(this.list, sku)

    if (typeof foundItem === 'object') return foundItem

    const stockedItem = this.findInventoryItem(sku)

    if (stockedItem === 'item not found') return 'item is not stocked'
    return 'item not found'
  }

  findSku(array, sku) {
    return array.find((item) => item.sku === sku)
  }

  checkBasketQuantity() {
    if (Array.isArray(this._list)) {
      return this._list.reduce((a, b) => a + b.quantity, 0)
    }
    return 'misconfigured basket'
  }

  setBasketCapacity(newCapacity) {
    if (
      typeof newCapacity === 'number' &&
      newCapacity > 0 &&
      newCapacity % 1 === 0
    ) {
      return (this.capacity = newCapacity)
    }
    return 'please enter positive integer value'
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
}

export default Basket
