const { bagelsInventory } = require('../inventory.json')

class Basket {
  constructor() {
    this.basketList = []
    this.maxCapacity = 6
    // this.maxCapacity = 20
    this.currentCapacity = 0
    this.updatedBasket = []
  }

  getBasket() {
    if (this.basketList.length === 0) {
      return []
    } else {
      return this.basketList
    }
  }

  addBagel(bagelType) {
    if (this.currentCapacity === this.maxCapacity) {
      return 'basket is full of bagels!'
    } else {
      const bagelToAdd = bagelsInventory.find(
        (bagel) => bagel.sku === bagelType
      )
      if (!bagelToAdd) {
        return 'bagel does not exist in our bakery'
      } else {
        const isBagelInBasket = this.basketList.find(
          (bagel) => bagel === bagelToAdd
        )
        if (!isBagelInBasket) {
          bagelToAdd.quantity = 1
          this.currentCapacity++
          this.basketList.push(bagelToAdd)
        } else {
          bagelToAdd.quantity++
          this.currentCapacity++
        }
      }
      return bagelToAdd
    }
  }

  removeBagel(bagelType) {
    const removeBagel = this.basketList.find((bagel) => bagel.sku === bagelType)
    if (!removeBagel) {
      return 'bagel does not exist in basket'
    } else {
      const index = this.basketList.indexOf(removeBagel)
      this.basketList.splice(index, 1)
      return removeBagel
    }
  }

  largerBasket(newCapacity) {
    if (typeof newCapacity === 'number' && newCapacity <= this.maxCapacity) {
      return 'new capacity must be greater than current maximum capacity'
    } else if (typeof newCapacity !== 'number') {
      return 'enter a valid number to increase basket capacity'
    } else this.maxCapacity = newCapacity
    return `basket capacity is now ${newCapacity}`
  }

  checkPrice(bagelType) {
    const bagelToCheck = bagelsInventory.find(
      (bagel) => bagel.sku === bagelType
    )
    if (!bagelToCheck) return 'bagel does not exist'
    else
      return `the price of the ${bagelToCheck.variant} ${bagelToCheck.name} is £${bagelToCheck.price}`
  }

  basketHasSpecialOffers() {
    const offerPriceBGLO = '2.49'
    const updatedBasket = this.basketList.map((bagel) => {
      if (bagel.sku === 'BGLO' && bagel.quantity === 6) {
        bagel.price = offerPriceBGLO
        bagel.quantity = 'offerApplied'
        return bagel
      } else if (bagel.sku === 'BGLO' && bagel.quantity > 5) {
        const remainder = bagel.quantity % 6
        if (remainder === 0) {
          bagel.price = `${(bagel.quantity / 6) * 2.49}`
          bagel.quantity = 'offerApplied'
          return bagel
        } else {
          const numOfx6Bagels = (bagel.quantity - remainder) / 6
          bagel.price = `${remainder * 0.49 + numOfx6Bagels * 2.49}`
          bagel.quantity = 'offerApplied'
          return bagel
        }
      } else return bagel
    })
    this.updatedBasket = updatedBasket
    return updatedBasket
  }

  calcBasketVal() {
    if (this.updatedBasket.length === 0) {
      return 'there are no bagels in your basket'
    }
    const basketPrices = this.updatedBasket.map((bagel) => {
      if (bagel.quantity === 'offerApplied') {
        return Number(bagel.price)
      } else {
        return Number(bagel.price * bagel.quantity)
      }
    })
    const sum = basketPrices.reduce((acc, curr) => acc + curr).toFixed(2)
    return `the price of your basket is £${sum}`
  }
}

// CONSOLE.LOG TESTS
// INITIAL
const b = new Basket()

// ADD BAGEL
b.addBagel('BGLO')
b.addBagel('BGLO')
b.addBagel('BGLO')
b.addBagel('BGLO')
b.addBagel('BGLP')
// b.addBagel('BGLS')
// console.log(b.addBagel('BGLO'))
// console.log(b.addBagel('BGLO'))

// REMOVE BAGEL
// b.removeBagel('BGSS')
// console.log(b.removeBagel(undefined))

// GET BASKET
// console.log(b.getBasket())

// INCREASE BASKET CAPACITY
// console.log(b.largerBasket(5))
// console.log(b.maxCapacity)

// CHECK BAGEL PRICE
// console.log(b.checkPrice('BGLO'))
// b.checkPrice('BGLO')

// SPECIAL OFFERS
// console.log(b.basketHasSpecialOffers())
// b.basketHasSpecialOffers()
// console.log(b.updatedBasket)

// CALC BASKET TOTAL
// console.log(b.calcBasketVal())

module.exports = { Basket }
