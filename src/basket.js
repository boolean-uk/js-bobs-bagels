const inventory = require("../inventory.json")

class Basket {
  #capacity
  #items
  #inventory

  constructor(capacity) {
    this.#capacity = capacity
    this.#items = new Map()
    this.#inventory = inventory.inventory
  }

  get capacity() {
    return this.#capacity
  }

  get items() {
    return this.#items
  }

  getItemBySku(sku) {
    return this.#inventory.filter((el) => el.sku === sku)[0]
  }

  addItem (sku) {
    this.checkIfBasketIsFull()
    const item = this.getItemBySku(sku)
    if (this.items.has(item)) {
      this.items.set(item, this.items.get(item) + 1)
    } else {
      this.items.set(item, 1)
    }
  }

  removeItem (sku) {
    const item = this.getItemBySku(sku)
    if (this.items.has(item)) {
      this.items.set(item, this.items.get(item) - 1)
      if (this.items.get(item) <= 0) {
        this.items.delete(item)
      }
    } else {
      throw 'No such item in basket!'
    }
  }

  checkIfBasketIsFull() {
    const numOfItemsInBasket = Array.from(this.items.values()).reduce((sum, el) => sum + el, 0)
    if (numOfItemsInBasket >= this.capacity) {
      throw 'Basket is full!'
    }
  }

  checkPrice(sku) {
    const item = this.getItemBySku(sku)
    return item.price / 100.0
  }

  getTotalPrice() {
    let totalPrice = 0
    const remainingBagels = []
    const coffees = []
    
    for (let [key, value] of this.items.entries()) {
      if (key.name === "Bagel" && value >= 6) {
        let numOfSix = value / 6
        totalPrice += (399 * (Math.floor(numOfSix / 2)) + 249 * (numOfSix % 2))
        for (let i = 0; i < value % 6; i ++){
          remainingBagels.push(key)    
        }
      }
      else if (key.name === "Bagel" && value < 6){
        for (let i = 0; i < value % 6; i ++){
          remainingBagels.push(key)    
        }
      }
      else if (key.name === "Bagel Sandwich") {    // fillings are included into price
        totalPrice += key.price * value
      }
      else if (key.name === "Coffee") {
        for (let i = 0; i < value; i ++){
          coffees.push(key)    
        }
      }
      
    }

    const numOfCoffeeBagelCombos = Math.min(remainingBagels.length, coffees.length)

    totalPrice += numOfCoffeeBagelCombos * 125

    if (remainingBagels.length > coffees.length) {
      for (let i = numOfCoffeeBagelCombos; i < remainingBagels.length; i++) {
        totalPrice += remainingBagels[i].price
      }
    }
    else {
      for (let i = numOfCoffeeBagelCombos; i < coffees.length; i++) {
        totalPrice += coffees[i].price
      }
    }

    return totalPrice / 100.0
  }
}

module.exports = {
  Basket
}
