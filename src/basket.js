class Basket {
  constructor() {
    this.orders = []
    this.id = 1
    this.maxCapacity = 10
    this.items = {
      "plain bagel": 0.25,
      "blueberry bagel": 0.3,
      "garlic bagel": 0.35,
      "sesame bagel": 0.2,
      "oat bagel": 0.4,
      "cheddar bagel": 0.45,
      "egg bagel": 0.25,
      "asiago bagel": 0.5,
      "multigrain bagel": 0.25,
      "chocolate bagel": 0.2,
      "rainbow bagel": 0.35
    }
  }

  normalizeItemName(item) {
    return item.split(' ').join('').toLowerCase()
  }

  capitalizeWords(string) {
    return string.replace(/\b[a-z]/g, character => character.toUpperCase())
  }

  getTotalQuantity() {
    let totalQuantity = 0

    this.orders.forEach((order) => {
      totalQuantity += order.quantity
    })

    return totalQuantity
  }

  add(item, quantity = 1) {
    if (typeof item !== 'string') {
      throw new Error('order not string provided')
    }

    const normalizedItem = this.normalizeItemName(item)

    const orderFoundInItems = Object.keys(this.items).find(
      (order) => this.normalizeItemName(order) === normalizedItem
    ) 

    if (!orderFoundInItems) {
      throw new Error('item not found')
    }

    const orderFoundInBasket = this.orders.find(
      (order) => this.normalizeItemName(order.item) === normalizedItem
    )

    const totalQuantity = this.getTotalQuantity()

    if (totalQuantity >= this.maxCapacity) {
      throw new Error('The basket is full')
    }

    if (orderFoundInBasket) {
      orderFoundInBasket.quantity += quantity
      orderFoundInBasket.price = this.items[orderFoundInItems] * orderFoundInBasket.quantity

      return this.orders
    } 
    
    const newOrder = new Order(this.id++, item, this.items[orderFoundInItems] * quantity, quantity)
    this.orders.push(newOrder)

    return this.orders
  }

  remove(id) {
    const orderId = this.orders.findIndex((order) => order.id === id)

    if (orderId === -1) {
      throw new Error('order not found')
    }

    this.orders.splice(orderId, 1)
    return this.orders
  }

  checkPrice(item) {
    const normalizedItem = this.normalizeItemName(item)

    const orderFoundInItems = Object.keys(this.items).find(
      (order) => this.normalizeItemName(order) === normalizedItem
    ) 
    
    if (orderFoundInItems) {
      return this.items[orderFoundInItems]
    }

    throw new Error('item not found')
  }

  totalPrice() {
    let total = 0

    this.orders.forEach((order) => {
      total += order.price
    })

    return total
  }

  getReceipt() {
    let receipt = ''

    this.orders.forEach((order) => {
      receipt += `${this.capitalizeWords(order.item)} ${order.quantity} £${order.price} | `
    })
    
    receipt += `Total £${this.totalPrice()}`

    return receipt
  }
}

class Order {
  constructor(id, item, price, quantity) {
    this.id = id
    this.item = item
    this.price = price
    this.quantity = quantity
  }
}

export { Order }
export default Basket
