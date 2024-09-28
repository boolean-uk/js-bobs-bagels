const Basket = require('./basket.js')
const Price = require('./price.js')
const Receipt = require('./receipt.js')

class BobsBagel {
  constructor () {
    this.basket = new Basket()
    this.price = new Price()
    this.receipt = new Receipt()
  }

  // add items (either single / multiple quantity) in basket
  add (item, num = 1) {
    return this.basket.add(item, num)
  }

  // remove items from basket
  remove (item) {
    return this.basket.remove(item)
  }

  // check if basket is over/under capacity
  isFull () {
    return this.basket.isFull()
  }

  // create basket with bigger capacity
  createBigBasket () {
    return this.basket.createBigBasket()
  }

  // check the single item's price
  checkPrice (item) {
    return this.basket.checkPrice(item)
  }

  // returns an object with SKU and its quantity
  skuQuantity () {
    return this.price.skuQuantity(this.basket.basket)
  }

  // returns an object with SKU and its quantity, including the BGLP x COF deal
  cofDeal () {
    return this.price.cofDeal(this.skuQuantity())
  }

  // returns an object with SKU and its sub price
  subPrice () {
    return this.price.subPrice(this.cofDeal())
  }

  // convert SKU to item names
  convertSKU () {
    return this.price.convertSKU(this.subPrice())
  }

  // returns an object with SKU and its original price (no discount)
  noDiscountPrice () {
    return this.price.noDiscountPrice(this.skuQuantity())
  }

  // returns an object with SKU and how much you saved
  savedPrice () {
    return this.price.savedPrice(this.subPrice(), this.noDiscountPrice())
  }

  // returns the total price of items in basket
  totalPrice () {
    return this.price.totalPrice(this.subPrice())
  }

  // returns the total price of how much you saved
  totalSavedPrice () {
    return this.price.totalSavedPrice(this.savedPrice())
  }

  // prints the content of receipt
  receiptLine () {
    return this.receipt.receiptLine(this.cofDeal(), this.subPrice(), this.savedPrice())
  }

  // prints the entire receipt in SKU format
  printSKUReceipt () {
    return this.receipt.printSKUReceipt(this.receiptLine(), this.totalPrice())
  }
}

const bobsBagel = new BobsBagel()

// bobsBagel.add('BGLO', 6)
// bobsBagel.add('BGLE', 2)
// bobsBagel.add('BGLP')

// bobsBagel.skuQuantity()
// bobsBagel.cofDeal()
// bobsBagel.subPrice()
// bobsBagel.noDiscountPrice()
// bobsBagel.savedPrice()
// bobsBagel.convertSKU()
// // bobsBagel.totalPrice()
// // bobsBagel.printSKUReceipt()

// console.log(bobsBagel.receiptLine())
