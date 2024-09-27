require('./../inventory.json')

class BasketList {
  constructor(capacity = 3) {
    this.basket = []
    this.maxcapacity = capacity
  }

  addToBasket(item) {
    if (!this.isBasketFull()) {
      this.basket.push(item)
    } else {
      console.log('Basket is full!')
    }
  }

  compareItems(item) {
    if (this.basket.sku === item.sku) {
      console.log('bagelllll', item.sku)
    }
  }

  RemoveFromBasket(item) {
    if (this.itemCheck(item)) {
      const filteredBasket = this.basket.filter(
        (basketItems) => basketItems.sku !== item.sku
      )
      this.basket = filteredBasket
    } else {
      console.log('Item is not in the basket!')
    }
  }

  isBasketFull() {
    if (this.basket.length >= this.maxcapacity) {
      return true
    } else {
      return false
    }
  }

  itemCheck(item) {
    for (const basketItem of this.basket) {
      if (basketItem.sku === item.sku) {
        return true
      }
    }
    return false
  }

  itemPrice(item) {
    return item.price
  }

  calculateSum() {
    let total = 0
    for (const item of this.basket) {
      total += Number(item.price)
    }
    return total
  }
}

module.exports = BasketList
