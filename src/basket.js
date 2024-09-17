const { inventory } = require('../inventory.json')
class Basket {
  constructor() {
    this.basketList = []
    this.maxCapacity = 3
  }

  addItemToBasket(bagelType) {
    if (this.basketList.length >= this.maxCapacity) {
      return 'Basket is Full!!cannot add more bagels!'
    } else {
      const bagelToAdd = inventory.find((bagel) => bagel.sku === bagelType)
      if (!bagelToAdd) {
        return `No bagels found`
      } else {
        const bagelMultiple = this.basketList.find(
          (newBagel) => newBagel === bagelToAdd
        )
        if (!bagelMultiple) {
          bagelToAdd.quantity = 1
          this.basketList.push(bagelToAdd)
        } else {
          bagelToAdd.quantity++
        }
      }
      return bagelToAdd
    }
  }

  getBasket() {
    if (this.basketList === 0) {
      return []
    } else {
      return this.basketList
    }
  }

  removeItemFromBasket(bagelType) {
    const bagelToRemove = this.basketList.find(
      (bagel) => bagel.sku === bagelType
    )
    if (!bagelToRemove) {
      return 'first add bagel in the basket'
    } else {
      const index = this.basketList.indexOf(bagelToRemove)
      this.basketList.splice(index, 1)
      return bagelToRemove
    }
  }

  increaseBasket(maxNumber) {
    if (typeof maxNumber !== 'number' && maxNumber <= this.maxCapacity) {
      return 'Enter a bigger number than current max capacity'
    } else if (!maxNumber) {
      return 'Please enter a valid number'
    } else this.maxCapacity = maxNumber
    return `now max capacity is ${maxNumber}`
  }

  checkPrice(bagelType) {
    const bagelToCheck = b.basketList.find((bagel) => bagel.sku === bagelType)

    if (!bagelToCheck) {
      return 'Invalid bagel'
    } else if (!bagelType) {
      return 'Input some valid bagel'
    } else return `The price of this bagel is ${bagelToCheck.price}`
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
const b = new Basket()

console.log(b.increaseBasket(10))

console.log('basket', b.addItemToBasket('BGLO'))
console.log('basket', b.addItemToBasket('BGLO'))
console.log('basket', b.addItemToBasket('BGLO'))


console.log(b.totalSum())
// console.log(b.getBasket())
module.exports = {
  Basket
}
