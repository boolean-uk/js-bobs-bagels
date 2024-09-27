import { inventory } from '../inventory.js'

export default class Basket {
  constructor() {
    this.basketList = []
    this.basketSize = 12
    this.basketisFull = false
    this.inventory = inventory
  }

  addItem(sku) {
    
    if (!sku || typeof sku !== 'string') return 'sku required!'

    const itemToAdd = this.inventory.find((item) => item.sku === sku)
    const foundInBasket = this.basketList.find((item) => item.sku === sku)

    if (!itemToAdd) return 'item not found'

    this.checkIfFull()
    if (this.basketisFull) return this.checkIfFull()

    if (foundInBasket) return foundInBasket.quantity++

    itemToAdd.quantity = 1
    this.basketList.push(itemToAdd)
    
    return
  }

  removeItem(sku) {
    if (!sku || typeof sku !== 'string') return 'sku required!'

    if (!this.basketList.find((item) => item.sku === sku))
      return 'item is not in basket'

    const newBasket = this.basketList.filter((item) => item.sku !== sku)
    return (this.basketList = newBasket)
  }

  checkIfFull() {
    let sum = 0
    this.basketList.forEach((item) => {
      sum += item.quantity
      return sum
    })

    if (sum === this.basketSize) 
    this.basketisFull = true
    return 'basket is full'
  }

  changeBasketSize(size) {
    if (!size || typeof size !== 'number') return 'error, set basket size.'
    this.basketSize = size
    return
  }

  findItemDetails(sku) {
    const foundItem = this.inventory.find((item) => sku === item.sku)

    if (!foundItem) return false

    return `Name: ${foundItem.name}, Price: £${foundItem.price}`
  }

  totalCost() {
    let total = 0
    this.basketList.forEach((item) => {
      const sum = item.price * item.quantity
      return (total += sum)
    })

    return `Total Cost: £${total.toFixed(2)}`
  }
}


// OUTSIDE OF TESTING SUITE TESTING (MOCK RUNNING INPUTS INTO FUNCTIONS)

// const basket = new Basket()
// basket.addItem('BGSE')
// basket.addItem('BGSE')
// basket.addItem('BGSS')
// console.log(basket.basketList)
// console.log(basket.findItemDetails('BGSE'))
// console.log(basket.totalCost())
// basket.removeItem('BGSE')

// // REMOVES ENTIRE ITEM CATEGORY. LEAVING AS IS A I BELIEVE IT SATISFIES THE REQUIREMENTS
// console.log(basket.basketList) 

// basket.changeBasketSize(13)
// console.log(basket.basketSize)
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// basket.addItem('BGSS')
// console.log(basket.addItem('BGSS'))
// console.log(basket.totalCost())




