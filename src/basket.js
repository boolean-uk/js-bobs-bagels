class Basket {
  constructor(size=5) {
    this.contents = []
    this.size = size
  }

  currentQuantity() {
    let total = 0
    this.contents.forEach((element) => {
        total += element.quantity
    })
    return total
  }

  totalPrice() {
    let totalPrice = 0

    this.contents.forEach((element) => {
        totalPrice += element.quantity * element.price
    })

    return `£${totalPrice.toFixed(2)}`
  }

  addItem(item) {
    if(this.currentQuantity() === this.size) {
        throw new Error("Cannot add item, as basket is full")
    }


    const itemInBasket = this.contents.find((element) => {
      return element.name === item.name
    })

    if (itemInBasket) {
      itemInBasket.quantity++
      return this.contents
    }

    const newItem = { ...item, quantity: 1 }

    this.contents.push(newItem)

    return this.contents
  }

  removeItem(item) {
    const itemInBasket = this.contents.find((element) => {
        return element.name === item.name
      })
  
      if (!itemInBasket) {
        throw(new Error("The item does not exist in the basket"))
      }
    
    itemInBasket.quantity--
    
    this.contents = this.contents.filter((element) => {return element.quantity > 0})
    
    return this.contents
  }
}

class Bagel {
  constructor(sku, name, variant, price) {
    if (typeof name !== 'string' || typeof price !== 'number') {
      throw new Error('Invalid argument types')
    }

    this.sku = sku
    this.name = name
    this.variant = variant
    this.price = price
  }

  displayPrice() {
    return `£${this.price}`
  }
}

export { Bagel }

export default Basket
