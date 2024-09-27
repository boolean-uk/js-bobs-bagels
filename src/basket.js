
const fs = require('fs')

class BagelStore {
  constructor() {
    this.baskets = {
      defaultBasket: {
        items: [],
        capacity: 10
      }
    }
    this.inventory = []
  }

  loadFiles() {
    const data = fs.readFileSync('./inventory.json', 'utf-8')
    const inventory = JSON.parse(data).inventory
    this.inventory = inventory
  }

  createBasket(basketName, capacity) {
    if (basketName && capacity) {
      if (typeof basketName !== 'string' || typeof capacity !== 'number') {
        return "Error: Please input a valid name & capacity e.g. ('John's', 5)."
      }

      this.baskets[basketName] = {}
      this.baskets[basketName].items = []
      this.baskets[basketName].capacity = capacity ? capacity : 10

      return `Success! Created "${basketName}" basket with a capacity of ${this.baskets[basketName].capacity}.`
    } else {
      return 'ERROR: Please input a valid name & capacity'
    }
  }

  addItemToBasket(bagelSku, basketName) {
    let basket
    !basketName
      ? (basket = this.baskets.defaultBasket.items)
      : (basket = this.baskets[basketName].items)
    let basketCapacity = !basketName
      ? this.baskets.defaultBasket.capacity
      : this.baskets[basketName].capacity

    const bagelSkusArr = []
    this.inventory.forEach((item) => bagelSkusArr.push(item.sku))

    if (bagelSkusArr.includes(bagelSku.toUpperCase())) {
      const bagel = this.inventory.find(
        (item) => item.sku === bagelSku.toUpperCase()
      )
      const bagelInBasket = basket.find((item) => item === bagel)

      let basketTotalQuantity = 0
      basket.forEach((item) => (basketTotalQuantity += item.quantity))

      if (basketTotalQuantity >= basketCapacity) {
        return `ERROR: "${
          basketName ? basketName : 'defaultBasket'
        }" has reached max capacity.`
      } else {
        if (bagelInBasket) {
          bagelInBasket.quantity++
        } else {
          basket.push(bagel)
          const bagelInBasket = basket.find((item) => item === bagel)
          bagelInBasket.quantity = 1
        }
      }

      return `Success! Added ${bagel.variant ? bagel.variant : ''} ${
        bagel.name
      } (${bagel.sku}) to '${
        basketName ? basketName : 'defaultBasket'
      }' basket.`
    } else {
      return 'ERROR: Please input a valid bagel sku :).'
    }
  }

  removeItemFromBasket(bagelSku, basketName) {
    let basket
    !basketName
      ? (basket = this.baskets.defaultBasket.items)
      : (basket = this.baskets[basketName].items)

    const bagelSkusArr = []
    basket.forEach((item) => bagelSkusArr.push(item.sku))

    if (bagelSkusArr.includes(bagelSku.toUpperCase())) {
      const filteredBasket = basket.filter(
        (item) => item.sku !== bagelSku.toUpperCase()
      )

      if (basketName) {
        this.baskets[basketName].items = filteredBasket
      } else {
        this.baskets.defaultBasket.items = filteredBasket
      }

      return `${bagelSku.toUpperCase()} was succesfully removed`
    } else {
      return 'ERROR: Please input a valid bagel sku.'
    }
  }

 
  viewBasket(basketName) {
    let basket = basketName
      ? this.baskets[basketName].items
      : this.baskets.defaultBasket.items

    const namesOfBaskets = Object.keys(this.baskets)

    if (!basketName) {
      return basket
    } else if (namesOfBaskets.includes(basketName)) {
      return basket
    } else {
      return 'ERROR: Please input a valid basket name'
    }
  }

  totalPrice(basketName) {
    let sum = 0
    let basket = basketName
      ? this.baskets[basketName].items
      : this.baskets.defaultBasket.items

    basket.forEach((item) => (sum += item.quantity * item.price))

    return `Total: $${sum}`
  }

  bagelPrices() {
    const priceArr = []

    this.inventory.forEach((item, idx) =>
      priceArr.push(
        `${item.variant ? `${idx}: ${item.variant}` : `${idx}:`} ${
          item.name
        } - $${item.price}\n`
      )
    )

    return `Prices:\n${priceArr.join('')}`
  }
}



module.exports = {
  BagelStore
}