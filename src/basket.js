const inv = require('../inventory.json').inventory

class Basket {
  // Create a basket
  constructor(capacity) {
    this.items = []
    this.capacity = capacity
  }

  addItem(name) {
    const isFull = this.items.length + 1 > this.capacity
    if (isFull) {
      return 'You can not add an item'
    }
    // check if exists in inventory
    const invItem = inv.find((item) => item.sku === name)
    if (!invItem) {
      return 'Not in stock'
    }
    this.items.push(name)

    return this.items
  }

  removeItem(name) {
    // check if item exists
    const item = this.items.find((item) => item === name)
    if (!item) {
      return 'Item does not exist'
    }
    this.items.splice(this.items.indexOf(item), 1)
    return this.items
  }

  checkPrice(name) {
    const item = inv.find((item) => item.sku === name)
    return item.price
  }

  calculateTotalPrice() {
    let total = 0
    this.items.forEach((itemSku) => {
      const item = inv.find((invItem) => invItem.sku === itemSku)
      if (item) {
        total += Number(item.price)
      }
    })
    return total
  }

  generateReceipt() {
    const now = new Date().toLocaleString()
    let receipt = `     ~~~ Bob's Bagels ~~~\n\n    ${now}\n\n-----------------------------\n`

    const itemTotals = {}
    this.items.forEach((itemSku) => {
      const item = inv.find((invItem) => invItem.sku === itemSku)
      if (item) {
        itemTotals[itemSku] = itemTotals[itemSku] ? itemTotals[itemSku] + 1 : 1
      }
    })

    let maxItemLength = 0
    let maxVariantLength = 0
    Object.keys(itemTotals).forEach((itemSku) => {
      const item = inv.find((invItem) => invItem.sku === itemSku)
      if (item) {
        maxItemLength = Math.max(maxItemLength, item.name.length)
        maxVariantLength = Math.max(maxVariantLength, item.variant.length)
      }
    })

    Object.keys(itemTotals).forEach((itemSku) => {
      const item = inv.find((invItem) => invItem.sku === itemSku)
      if (item) {
        const itemTotalPrice = (item.price * itemTotals[itemSku]).toFixed(2)
        const quantity = itemTotals[itemSku].toString().padStart(4)
        const itemName = item.name.padEnd(maxItemLength + 1)
        const variant = item.variant.padEnd(maxVariantLength)
        receipt += `${itemName} ${variant} ${quantity}  £${itemTotalPrice}\n`
      }
    })

    receipt += '\n-----------------------------\n'

    const totalPrice = this.calculateTotalPrice().toFixed(2)
    receipt += `Total\t\t\t£${totalPrice}\n\n`
    receipt += '        Thank you\n     for your order!'

    return receipt
  }
}
module.exports = Basket
