/* eslint-disable no-unused-vars */
const data = require('../inventory.json')
const inventory = JSON.parse(JSON.stringify(data.inventory))

class Basket {
  constructor(capacity) {
    this.items = []
    this.totalPrice = 0
    this.capacity = capacity
  }

  addItem(newSku, quantity) {
    if (this.wouldItBeFull(quantity)) {
      return 'basket is full'
    }
    const item = this.items.find(({ sku }) => sku === newSku)
    if (item) {
      item.quantity += quantity
      item.price = (
        Math.round(Number(item.price) * item.quantity * 100) / 100
      ).toString()

      return this.items
    }

    const newItem = inventory.find(({ sku }) => sku === newSku)
    if (!newItem) {
      return 'not in stock'
    }
    newItem.quantity = quantity

    this.items.push({ ...newItem })
    return this.items
  }

  getTotal() {
    let count = 0
    this.items.forEach((item) => {
      count += item.quantity
    })
    return count
  }

  isFull() {
    return this.getTotal() === this.capacity
  }

  wouldItBeFull(extraQuantity) {
    return this.getTotal() + extraQuantity > this.capacity
  }

  searchItem(serchedSku) {
    const item = this.items.find(({ sku }) => sku === serchedSku)
    return item || 'item not found'
  }

  calculateDiscount() {
    let countCof = 0
    let reminderBglp = 0
    let lefOverCoffee = 0
    this.items.forEach((item) => {
      if (item.sku === 'COF') {
        countCof = item.quantity
      }
      if (item.sku === 'BGLP') {
        reminderBglp = item.quantity % 6
      }
    })
    this.items.forEach((item) => {
      if (item.sku === 'BGLO' || item.sku === 'BGLE') {
        const discount = Math.floor(item.quantity / 6) * 2.49
        const reminder = (item.quantity % 6) * 0.49
        item.price = (discount + reminder).toFixed(2).toString()
      }
      if (item.sku === 'BGLP') {
        const discount = Math.floor(item.quantity / 12) * 3.99

        let reminder = 0
        if (reminderBglp) {
          const lefOverPlain =
            countCof > reminderBglp
              ? countCof - reminderBglp
              : reminderBglp - countCof
          reminder = lefOverPlain * 0.39
        }
        item.price = (discount + reminder).toFixed(2).toString()
      }
      if (item.sku === 'COF') {
        const coffeePriceDiscount =
          reminderBglp % countCof > 0
            ? (reminderBglp % countCof) * 1.25
            : reminderBglp === 1 && countCof === 1
            ? 1.25
            : 0
        if (countCof - reminderBglp > 0) {
          lefOverCoffee = (countCof - reminderBglp) * 0.99
        }

        item.price = (coffeePriceDiscount + lefOverCoffee).toFixed(2).toString()
      }
    })
    return this.items
  }

  calculateTotalPrice() {
    this.items.forEach((item) => {
      this.totalPrice += Number(item.price)
    })
    return this.totalPrice.toString()
  }

  removeItem(newSku, quantity) {
    const selectedItem = this.items.find(({ sku }) => sku === newSku)
    if (!selectedItem) {
      return 'not in the basket'
    }
    selectedItem.quantity -= quantity
    if (selectedItem.quantity <= 0) {
      this.items.splice(this.items.indexOf(selectedItem), 1)
    }

    return this.items
  }
}

module.exports = Basket
