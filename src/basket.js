const { inventory } = require('../inventory.json')

class Basket {
  constructor() {
    this.basketList = []
    this.maxCapacity = 3
  }

  addItemToBasket(bagelType) {
    if (this.basketList.length >= this.maxCapacity) {
      return 'Basket is Full!! Cannot add more bagels!'
    }

    const bagelToAdd = inventory.find((bagel) => bagel.sku === bagelType)

    if (!bagelToAdd) {
      return 'No bagels found'
    }

    const existingBagel = this.basketList.find(
      (newBagel) => newBagel === bagelToAdd
    )

    if (!existingBagel) {
      bagelToAdd.quantity = 1
      this.basketList.push(bagelToAdd)
    } else {
      bagelToAdd.quantity++
    }

    return bagelToAdd
  }

  getBasket() {
    return this.basketList.length === 0 ? [] : this.basketList
  }

  removeItemFromBasket(bagelType) {
    const bagelToRemove = this.basketList.find(
      (bagel) => bagel.sku === bagelType
    )

    if (!bagelToRemove) {
      return 'First add a bagel to the basket'
    }

    const index = this.basketList.indexOf(bagelToRemove)
    this.basketList.splice(index, 1)

    return bagelToRemove
  }

  increaseBasket(maxNumber) {
    if (typeof maxNumber !== 'number' || maxNumber <= this.maxCapacity) {
      return 'Enter a number greater than the current max capacity'
    }

    this.maxCapacity = maxNumber
    return `Now, the max capacity is ${maxNumber}`
  }

  checkPrice(bagelType) {
    const bagelToCheck = this.basketList.find(
      (bagel) => bagel.sku === bagelType
    )

    if (!bagelToCheck) {
      return 'Invalid bagel'
    }

    return `The price of this bagel is ${bagelToCheck.price}`
  }

  totalSum() {
    if (this.basketList.length === 0) {
      return 'Basket is empty'
    }

    const prices = this.basketList.map((bagel) => bagel.price * bagel.quantity)
    const sum = prices.reduce((acc, curr) => acc + curr).toFixed(2)

    return `The total price in the basket is ${sum}`
  }
}

const basket = new Basket()

console.log(basket.increaseBasket(10))

console.log('Basket:', basket.addItemToBasket('BGLO'))
console.log('Basket:', basket.addItemToBasket('BGLO'))
console.log('Basket:', basket.addItemToBasket('BGLO'))

console.log(basket.totalSum())

module.exports = {
  Basket
}
