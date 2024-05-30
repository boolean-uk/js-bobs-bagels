class Basket {
  constructor(arrayOfItems, capacity) {
    this.list = arrayOfItems
    this.capacity = capacity
  }

  addToBasket(item) {
    if (this.list.find((i) => i.sku === item.sku)) {
      return 'this item is already in your basket!'
    }
    this.list.push(item)
    return this.list
  }

  removeItem(item) {
    if (this.list.length < 1) {
      return 'nothing to remove, your basket is empty'
    }
    const indexOfItemToRemove = this.list.indexOf(item)
    this.list.splice(indexOfItemToRemove, 1)
    return this.list
  }

  isBasketFull() {
    if (this.capacity === this.list.length) {
      return `the basket is full! (${this.list.length}/${this.capacity})`
    }
    return `the basket is not full yet (${this.list.length}/${this.capacity})`
  }

  setCapacity(num) {
    if (!num || typeof num !== 'number' || num < 1) {
      return `invalid number - capacity remains ${this.capacity}`
    }
    this.capacity = num
    return { list: this.list, capacity: this.capacity }
  }

  checkForItemToRemove(item) {
    const searchResult = this.list.find((i) => i.sku === item.sku)

    if (!searchResult || searchResult.length < 1) {
      return 'no such item in the basket!'
    }
    return item
  }

  increaseQuantity(item) {
    const searchResult = this.list.find((i) => i.sku === item.sku)
    if (!searchResult || searchResult.length < 1) {
      return 'this item is not in you basket yet - add it?'
    }
    const updatedQuantity = searchResult.quantity + 1
    const updatedItem = { ...searchResult, quantity: updatedQuantity }
    return updatedItem
  }

  total() {
    if (this.list.length < 1) {
      return 'the basket is empty - add some bagels?'
    }
    const stringsToIntegers = this.list.map(
      (i) => parseFloat(i.price) * 100 * i.quantity
    )
    const integersSum = stringsToIntegers.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    )
    const total = `${integersSum / 100}`
    return total
  }
}

class BasketItem {
  constructor(inventoryItem) {
    this.sku = inventoryItem.sku
    this.price = inventoryItem.price
    this.name = inventoryItem.name
    this.variant = inventoryItem.variant
    this.quantity = 1
  }

  displayItemPrice() {
    if (!this.price) {
      return 'price unknown - please message the seller'
    }
    return this.price
  }
}

class Inventory {
  constructor(arrayOfItems) {
    this.list = arrayOfItems
  }

  getSpecialOffers() {
    const itemsWithSpecialOffers = this.list.filter((i) => i.specialOffer)

    if (!itemsWithSpecialOffers || itemsWithSpecialOffers.length < 1) {
      return 'no offers found'
    }

    const specialOffers = itemsWithSpecialOffers.map((i) => i.specialOffer)

    return specialOffers
  }
}

class InventoryItem {
  constructor(inventoryItem, specialOffer) {
    this.sku = inventoryItem.sku
    this.price = inventoryItem.price
    this.name = inventoryItem.name
    this.variant = inventoryItem.variant
    this.specialOffer = specialOffer
  }
}

class SpecialOffer {
  constructor(active, requiredQuantity, discountedPrice, itemSku, combo) {
    this.active = active
    this.itemSku = itemSku
    this.requiredQuantity = requiredQuantity
    this.discountedPrice = discountedPrice
    this.combo = combo
  }
}

module.exports = {
  Basket,
  BasketItem,
  Inventory,
  InventoryItem,
  SpecialOffer
}
